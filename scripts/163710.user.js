// ==UserScript==
// @name     Fishing
// @version  1.0
// @include  /^http:\/\/www\.jeuxvideo\.com\/forums\/.*/
// @author   Thiht
// ==/UserScript==

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== 'undefined'
                    ? args[number]
                    : match;
        });
    };
}

var fishing = {
    varGlob: {
        postList  : document.querySelectorAll('.post'),
        smileyURL : "http://image.jeuxvideo.com/smileys_img/{0}.gif",
        smilies   : {
            ":)" : "1",
            ":snif:" : "20",
            ":gba:" : "17",
            ":g)" : "3",
            ":-)" : "46",
            ":snif2:" : "13",
            ":bravo:" : "69",
            ":d)" : "4",
            ":hap:" : "18",
            ":ouch:" : "22",
            ":pacg:" : "9",
            ":cd:" : "5",
            ":-)))" : "23",
            ":ouch2:" : "57",
            ":pacd:" : "10",
            ":cute:" : "nyu",
            ":content:" : "24",
            ":p)" : "7",
            ":-p" : "31",
            ":noel:" : "11",
            ":oui:" : "37",
            ":(" : "45",
            ":peur:" : "47",
            ":question:" : "2",
            ":cool:" : "26",
            ":-(" : "14",
            ":coeur:" : "54",
            ":mort:" : "21",
            ":rire:" : "39",
            ":-((" : "15",
            ":fou:" : "50",
            ":sleep:" : "27",
            ":-D" : "40",
            ":nonnon:" : "25",
            ":fier:" : "53",
            ":honte:" : "30",
            ":rire2:" : "41",
            ":non2:" : "33",
            ":sarcastic:" : "43",
            ":monoeil:" : "34",
            ":o))" : "12",
            ":nah:" : "19",
            ":doute:" : "28",
            ":rouge:" : "55",
            ":ok:" : "36",
            ":non:" : "35",
            ":malade:" : "8",
            ":fete:" : "66",
            ":sournois:" : "67",
            ":hum:" : "68",
            ":ange:" : "60",
            ":diable:" : "61",
            ":gni:" : "62",
            ":play:" : "play",
            ":desole:" : "65",
            ":spoiler:" : "63",
            ":merci:" : "58",
            ":svp:" : "59",
            ":sors:" : "56",
            ":salut:" : "42",
            ":rechercher:" : "38",
            ":hello:" : "29",
            ":up:" : "44",
            ":bye:" : "48",
            ":gne:" : "51",
            ":lol:" : "32",
            ":dpdr:" : "49",
            ":dehors:" : "52",
            ":hs:" : "64",
            ":banzai:" : "70",
            ":bave:" : "71",
            ":pf:" : "pf",
            ":globe:": "6",
            ":mac:" : "16",
            ":loveyou:" : "loveyou"
        }
    },

    init: function() {
        this.exec();
    },

    exec: function() {
        if (fishing.varGlob.postList != null) {
            for (var i=0, c=fishing.varGlob.postList.length; i < c; i++) {
                var images = fishing.varGlob.postList[i].querySelectorAll('img');
                for (var j=images.length-1; j >= 0; j--) {
                    if (images[j].src == 'http://image.jeuxvideo.com/smileys_img/fish.png')
                        images[j].src = fishing.varGlob.smileyURL.format(fishing.varGlob.smilies[images[j].alt]);
                }
            }
        }
    }
};
fishing.init();