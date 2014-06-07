// ==UserScript==
// @name           Tweet Tags
// @author         EntranceJew
// @description    Tag your friends with an icon, be able to tell if it's someone's special day.
// @version        1.0.2
// @icon           http://i.imgur.com/mK9NOaN.gif
// @namespace      http://userscripts.org/users/171410
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
var mode = 'b64'; //'b64' | 'imgur'

var images = {
    'cake':	{
        'b64': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI2SURBVDjLhVPfa1JRHPepnnrrT/Al6KG/YG9RD0EPFXsJCkaMHjMKIamVNQhqQW3LFqtZq9Yg1KXVcBhdZ9ZDgyblT9y8Z1fdvXo3Ua9D1E/ne6c3bUIHPtxzPr++5164JgCmDsJ+0/FI2BTu5v6n9xgSEZNWLh0BN9r6FfTTewyx1f3QqsOIre5r9ZvY0aM/d/U9Be+WHiO4PIg5n70mCEIizgM0MRQ4W+Bn93PPOJY+n8H4G6vUU8BFM8fYtL8I17ctTH7IQ9M0GBP5s1AowP5WguOjjIsTSYUyRsFXweNkjOHJooL5oIoJrwJazve7E2c8o/r52ksJDxc2YZlKgzJGQVAINPjC6y8qN8jwr5T0wJ35LByfZNx4JelnhyuPq9MMroCMZWFxxygICb5WvV7Hv+v6rIRH3k1YXzCDazabkGUZye+2hlHAVizNRDwKeo3Oohs53DlYnzEsCEWdU1UV8dhv5NM+KOFDfwu2QgcatcxtpJJR/WPlcjkwcQ0bG0wHFSuKgvW1FEqZpyAvZYyC7MjhVmFmGJXUXShMQEmcRU0cNaCJ97HN5lAV70FL2UFeyhgFRe/BhvzgHCTLKSiTQ9j2XkLlh003E2hPHGnkIS9lul9hp5a5hVLgCpSpC8jaBiEOncD66aM6aE8caeQhL2W6C5zlXye5cLPn6n3BPeSlTHeBmWOMo1aOHEMlfh5a+jI3j+igPXGkkaftNe/5Fzg5wGHjcHMkOKptJNocaQPdmT/bXw90YXDpsgAAAABJRU5ErkJggg==',
        'imgur': 'http://i.imgur.com/zxoeTRC.png'
    },
    'ruby': {
        'b64': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHiSURBVDjLzZPdS5NRHMf3Fwy67yYqepnzrSgJetEyl8s0GqvYEHLDFiGr4VwQZTcOpzfeVgQiCIJ4IWJUN+WNUhQqqAVjpg0c4vY8p7l89uLzfDpbV0FE4Y0HPpff7znf3+97TIBpJ5h2h4HxoNMlSUlEET0YEHrAL7Y77orCndsi7/WIXGuryN64KbRrDrF1uTmZuXjJXTKQAqckw+tXMD0N8/MQjcLSEvq7tySHh1GGhkgPDqI+fUZ8YID44242z5zPpGtONxcNPvLiOUxMwOgoLC7C3ByMjaEHg8R9Pta8XhSPhw23m09NTXzp7SXqv4+oOhkvGlQYXYEPRiQM8jZWVymdqSl0h4M1u531xka+S5br6vjc08Oytx1RcSKhHqlylmYg8+6ReV/qT7phfBwSCZidxXC5SEqhKk1Um41YOMzXW15E+fGYcriy8rctFHzt5nxb2+R2KAQzM7CwgCGfLurryTQ0sNHXx4oUq2XHYsqhcusf15h1uc2a8/pkviv0y0DOIFNbS7a/n28dflRL9bpy0Gr9aw+2rrSYf9jsb3IPH2GMjFCIRFDuBZB5NeVAWcs/FWnz3IW96VNno7lAJ5oUy7xaar/F+V9NFNU1Fpn3vcy7ktp39Oou/ws74Sc149q/X6rjygAAAABJRU5ErkJggg==',
        'imgur': 'http://i.imgur.com/2QvsAki.png'
    }
};

var targets = {
    'lovebuttsuyo': 'cake',
    'Jewelots_':	'ruby'
};

function getEm(){
    for(var i in targets){
        $(".username:contains('" + i + "') s").html("<img src='" + images[targets[i]][mode] + "'>");
        $(".js-tweet-text > .twitter-atreply:contains('" + i + "') s").html("<img src='" + images[targets[i]][mode] + "'>");
        $(".js-retweet-text > a[href='/" + i + "'] > b:not('img ~*')").parent().prepend("<img src='" + images[targets[i]][mode] + "'>");
    }
	setTimeout(getEm, 1000);
}

getEm();