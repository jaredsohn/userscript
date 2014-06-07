// ==UserScript==
// @name            mGET
// @description     Fancy GET script. Requires 4chan-X.
// @author          mizzl
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include         http://boards.4chan.org/*
// @include         https://boards.4chan.org/*
// @grant           GM_xmlhttpRequest
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true); // bug fix

$(document).on('QRDialogCreation', bindMGET);
$(document).ready(findLatestPostNumber);

var board = location.pathname.match(/\/[^\/]+\//)[0];
var latestPostNumber = -1;
var targetPostNumber = -1;

var mGetSelect = $('<select title="mGET"></select>');

var targets = {
    dubs: function (postNumber) {
        var digits = postNumber % 100;
        if (digits == 99) {
            return postNumber + 1; // next dubs are 00
        } else {
            return postNumber + (11 - digits % 11);
        }
    },
    trips: function (postNumber) {
        var digits = postNumber % 1000;
        if (digits == 999) {
            return postNumber + 1; // next trips are 000
        } else {
            return postNumber + (111 - digits % 111);
        }
    },
    quads: function (postNumber) {
        var digits = postNumber % 10000;
        if (digits == 9999) {
            return postNumber + 1; // next quads are 0000
        } else {
            return postNumber + (1111 - digits % 1111);
        }
    },
    sixtynine: function (postNumber) {
        return postNumber + (69 - (postNumber % 100));
    }
};
populateMGETSelect(targets);

function bindMGET() {
    var qr = $('#qr');
    var submitButton = qr.find('form #file-n-submit-container #file-n-submit input:submit');
    var postNumberDisplay = $('<strong style="padding-left: 25px">#</strong><i id="mGETPostNumberDisplay">~</i>');

    $(document).on('MTargetPostNumberReached', function () {
        submitButton.trigger('click');
    });

    $(document).on('MTargetPostNumberMissed', function () {
        document.dispatchEvent(new CustomEvent('CreateNotification', {
            type: 'warning',
            content: 'Missed target post number '+targetPostNumber
        }));
        targetPostNumber = -1;
    });

    qr.find('div select')
        .after(postNumberDisplay)
        .after(mGetSelect)
        .after('<strong style="padding-left: 10px">mGET</strong>');

    document.dispatchEvent(new CustomEvent('QRAddPreSubmitHook', {detail: mGETSubmit}));

    console.log('mGET bound');
}

function mGETSubmit() {
    if (latestPostNumber + 1 == targetPostNumber) {
        targetPostNumber = -1;
        return null;
    }

    var selectedTarget = mGetSelect.find('option:selected').val();
    if (selectedTarget == 'none') {
        return null;
    }

    console.log('Target is ' + selectedTarget);
    targetPostNumber = targets[selectedTarget](latestPostNumber);

    return "Waiting for post number " + targetPostNumber;
}

function urlForPostNumber(postNumber) {
    return "http://sys.4chan.org" + board + "imgboard.php?res=" + postNumber;
}

function checkLatestPostNumber() {
    var url = urlForPostNumber(latestPostNumber + 1);
    GM_xmlhttpRequest({
        url: url,
        method: "HEAD",
        onload: function (res) {
            if (res.status == 200) {
                latestPostNumber++;
                checkLatestPostNumber();
            } else {
                var displayText = (targetPostNumber == -1) ?
                    latestPostNumber + '' :
                    latestPostNumber + ' +' + (targetPostNumber - latestPostNumber);
                $('#mGETPostNumberDisplay').text(displayText);
                if (latestPostNumber + 1 == targetPostNumber) {
                    $(document).trigger('MTargetPostNumberReached');
                } else if (targetPostNumber <= latestPostNumber) {
                    $(document).trigger('MTargetPostNumberMissed');
                }
                checkLatestPostNumber();
            }
        }
    });
}

function findLatestPostNumber() {
    function guessLatestPostNumber() {
        console.log('Guessing latest post number');
        var postNumLinks = $('span.postNum a:nth-child(2)');
        postNumLinks.each(function (index, postNumLink) {
            var postNumber = parseInt(postNumLink.text.match(/(\d+)/)[0]);
            latestPostNumber = postNumber > latestPostNumber ? postNumber : latestPostNumber;
        });
        console.log('Guessed post number: ' + latestPostNumber);
    }

    if (latestPostNumber == -1) { // we haven't taken a guess yet
        guessLatestPostNumber();
    }

    checkLatestPostNumber();
}

function populateMGETSelect(targets) {
    if (board == '/b/') {
        mGetSelect.prop('disabled', true);
        mGetSelect.append('<option value="none">disabled</option>');
    } else {
        mGetSelect.append('<option value="none">none</option>');
        for (var targetKey in targets) {
            mGetSelect.append('<option value="' + targetKey + '">' + targetKey + '</option>');
        }
    }
}

console.log('mGET loaded');