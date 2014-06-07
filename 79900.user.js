// ==UserScript==
// @name            ComedyCentral Global
// @author          Casey Jones (casey-jones.org)
// @description     Redirects video pages on ComedyCentral sites a URL that can be viewed outside the US
// @include         http://www.colbertnation.com/the-colbert-report-videos/*
// @include         http://www.colbertnation.com/full-episodes/*
// ==/UserScript==

String.prototype.startsWith = function(str)
{
    return (this.match("^"+str)==str)
}

var vid_url = document.getElementById('video_player').data;
var id = vid_url.slice(vid_url.length - 6, vid_url.length);

var nurl = "";
var url = document.location.href;

if(url.startsWith("http://www.colbertnation.com/the-colbert-report-videos/")) {
    nurl = "http://media.mtvnservices.com/player/loader/?CONFIG_URL=http%3A%2F%2Fmedia.mtvnservices.com%2Fplayer%2Fconfig.jhtml%3Furi%3Dmgid%253Acms%253Avideo%253Acomedycentral.com%253A${id}%26group%3Dentertainment%26type%3Dnetwork&uri=mgid%3Acms%3Avideo%3Acomedycentral.com%3A${id}&group=entertainment&type=network&ref=www.colbertnation.com&geo=US";
}
else if(url.startsWith("http://www.colbertnation.com/full-episodes/")) {
    nurl = "http://media.mtvnservices.com/player/loader/?CONFIG_URL=http%3A%2F%2Fmedia.mtvnservices.com%2Fplayer%2Fconfig.jhtml%3Furi%3Dmgid%253Acms%253Afullepisode%253Acomedycentral.com%253A${id}%26group%3Dentertainment%26type%3Derror&uri=mgid%3Acms%3Afullepisode%3Acomedycentral.com%3A${id}&group=entertainment&type=error&ref=None&geo=US"
}

var new_url = nurl.replace("${id}", id);
window.location = new_url;
