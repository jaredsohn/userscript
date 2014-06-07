// ==UserScript==
// @name        MusicBrainz: Change recordings using MBIDs
// @namespace   http://userscripts.org/users/266906
// @version     2012-01-10
// @author      Michael Wiencek
// @include     http://musicbrainz.org/release/*/edit*
// @include     http://musicbrainz.org/release/add*
// @include     http://test.musicbrainz.org/release/*/edit*
// @include     http://test.musicbrainz.org/release/add*
// @include     http://beta.musicbrainz.org/release/*/edit*
// @include     http://beta.musicbrainz.org/release/add*
// @match       http://musicbrainz.org/release/*/edit*
// @match       http://musicbrainz.org/release/add*
// @match       http://test.musicbrainz.org/release/*/edit*
// @match       http://test.musicbrainz.org/release/add*
// @match       http://beta.musicbrainz.org/release/*/edit*
// @match       http://beta.musicbrainz.org/release/add*
// ==/UserScript==
//**************************************************************************//

var current = getchild(document.getElementsByClassName("current")[0], "input").value;

if (current == "Recordings") {
    var fieldsets = document.getElementsByTagName("fieldset"),
        MBID_REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
        txt = function(x) {return x.childNodes[0].nodeValue};

    for (var i = 0; i < fieldsets.length; i++)
        main(fieldsets[i], i);
}

function request_recording(mbid, input, gid, matches, radio, addnew) {
    var url = "/ws/2/recording/" + mbid + "?inc=artists+releases",
        req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function() {
        input.disabled = false;
        if (req.readyState == 4 && req.status == 200) {
            gid.value = mbid;
            input.value = "Use MBID...";
            parse_recording(req.responseXML, mbid, matches);
            addnew.click();
            radio.click();
        }
    }
    req.send(null);
}

function get_artist_credit(node) {
    var artist = "", childNodes = node.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        var child = childNodes[i];
        if (child.nodeName != "name-credit")
            continue;
        var name = getchild(child, "name"),
            a = getchild(child, "artist"),
            a_name = getchild(a, "name"),
            join = child.getAttribute("joinphrase");
        if (name) artist += txt(name); else artist += txt(a_name);
        if (join) artist += join;
    }
    return artist;
}

function getchild(obj, name) {
    var nodes = obj.childNodes, result = [];
    for (var i = 0; i < nodes.length; i++)
        if (nodes[i].nodeName.toLowerCase() == name)
            return nodes[i];
    return null;
}

function parse_recording(doc, mbid, matches) {
    var recording = doc.getElementsByTagName("recording")[0],
        ac = getchild(recording, "artist-credit"),
        releases = doc.getElementsByTagName("release"),
        max = Math.min(releases.length, 3),
        title = txt(getchild(recording, "title")),
        length = getchild(recording, "length"),
        secs = length != null ? parseInt(txt(length)) / 1000 : 0,
        disambig = getchild(recording, "disambiguation"),
        a = matches[0].getElementsByClassName("recording")[0].getElementsByTagName("a")[0],
        artist = matches[0].getElementsByClassName("artist")[0],
        t = matches[0].getElementsByClassName("length")[0],
        appears = matches[1].getElementsByClassName("appears")[0],
        comment = matches[2].getElementsByClassName("comment")[0];

    a.href = "/recording/" + mbid;
    a.textContent = title;

    artist.textContent = get_artist_credit(ac);

    if (secs > 0) {
        var seconds = "" + Math.floor(secs % 60);
        if (seconds.length == 1)
            seconds = "0" + seconds;
        secs /= 60;
        var minutes = Math.floor(secs % 60);
        t.textContent = minutes + ":" + seconds;
    } else t.textContent = "?:??";
    matches[0].style.display = "table-row";

    if (disambig) {
        matches[2].style.display = "table-row";
        comment.textContent = txt(disambig);
    } else {
        matches[2].style.display = "none";
        comment.textContent = "";
    }

    if (max > 0) {
        html = "";
        for (var i = 0; i < max; i++) {
            var release = releases[i],
                mbid = release.getAttribute("id"),
                url = "/release/" + mbid,
                title = txt(getchild(release, "title"));
            html += '<a target="_blank" href="' + url + '">' + title + '</a>, ';
        }
        html = html.slice(0, -2);
        if (releases.length > max) html += "&hellip;";
        appears.innerHTML = html;
        matches[1].style.display = "table-row";
    } else {
        matches[1].style.display = "none";
    }
}

function change(input, gid, matches, radio, addnew) {
    return function() {
        var mbid = input.value.match(MBID_REGEX);
        if (mbid) {
            request_recording(mbid, input, gid, matches, radio, addnew);
            input.disabled = true;
        }
    }
}

function main(fieldset, n) {
    var tracks = fieldset.getElementsByClassName("track").length;
    if (tracks == 0) {
        var click_edit = fieldset.getElementsByClassName("clickedit buttons")[0];
        if (click_edit)
            click_edit.addEventListener("click", function() {setTimeout(function() {main(fieldset, n)}, 2000)}, false);
    } else {
        for (var i = 0; i < tracks; i++) {
            var id = ("select-recording-" + n + "-" + i),
                input_id = ("custom-recording-" + n + "-" + i),
                bubble = document.getElementById(id),
                tbody = getchild(bubble.getElementsByClassName("matches")[0], "tbody"),
                custom = document.createElement("tr"),
                addnew = tbody.getElementsByClassName("addnew")[0];
            custom.innerHTML = '<td></td><td><input type="text" id="' + input_id + '" style="width: 100%" value="Use MBID..." onfocus="if (this.value == \'Use MBID...\') this.value=\'\'"></td>';
            tbody.insertBefore(custom, addnew);
            var input = document.getElementById(input_id),
                matches = [
                    tbody.getElementsByClassName("servermatch recordingmatch")[0] || tbody.getElementsByClassName("clientmatch recordingmatch")[0],
                    tbody.getElementsByClassName("servermatch releaselist")[0] || tbody.getElementsByClassName("clientmatch releaselist")[0],
                    tbody.getElementsByClassName("servermatch comment")[0] || tbody.getElementsByClassName("clientmatch comment")[0]
                ],
                gid =  matches[0].getElementsByClassName("gid")[0],
                radio = getchild(matches[0].getElementsByClassName("select")[0], "input");
            input.addEventListener("input", change(input, gid, matches, radio, addnew.getElementsByClassName("newrecording recordingmatch")[0]), false);
        }
    }
}
