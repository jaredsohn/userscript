// ==UserScript==
// @name           Upload Helper
// @namespace      http://what.cd
// @description    Shows possible conversion formats for lossless torrents
// @author         sanguinepenguinx
// @version        1.14
// @include        http://what.cd/torrents.php*
// @include        http://what.cd/artist.php*
// @include        http://what.cd/collage.php*
// ==/UserScript==

/***** BEGIN CONFIG *****/

const HELPER_DEFAULT = 3; // default helper mode (0 is off)
const WH_BUTTON_COLOR = ""; // button text color
const WH_BUTTON_BG = ""; // button background color

const LIGHTEN_FACTOR = .15; // for mouseovers (default = .15)

// colors must be in "#xxxxxx" or "rgb(r, g, b)" format
const LOSSLESS_COLOR = ""; // lossless format text color
const CBR_COLOR = ""; // cbr format text color
const V0_COLOR = ""; // v0 format text color
const V2_COLOR = ""; // v2 format text color
const CBR_TAG_COLOR = "#481E6A";
const V0_TAG_COLOR = "#1E6A48";
const V2_TAG_COLOR = "#444444";
//const NEW_TORRENT = ""; // background for new torrents
//const NEW_SINGLE_TORRENT = ""; // background for new non-music torrents

function setup_variables() {
    helper_modes = new Array();

    // helper mode name, converted row visibility, tag visibility, nocue font weight, hascue font weight, nocuerow visibility
    new_helper_mode("Off","","none","","");
    new_helper_mode("Show All[N] Cueless[N]","none","inline","bold","bold","none");
    new_helper_mode("Show All[N] Cueless[Y]","none","inline","bold","bold","");
    new_helper_mode("Show All[Y] Cueless[Y]","","","bold","bold","");

    // tags to hide
    filter.push("staff.picks");
};

/***** END CONFIG *****/

var filter = new Array();

helper(document);

function helper(doc) {
    var grouping = true;
    if (pagetype() == "search") {
        if (document.getElementById("disablegrouping")) grouping = !(document.getElementById("disablegrouping").checked);
        if (document.getElementById("enablegrouping")) grouping = document.getElementById("enablegrouping").checked
    }
    if (grouping) {
        setup_variables();
        var database = new Database(doc);
        add_classes(database);
        add_styles();
        helper_setup();
    }
    else errornotify("Upload Helper: Please turn grouping on");
};

function helper_setup() {
    if (typeof GM_getValue != 'undefined') {
        if (pagetype() == "album") helper_mode = GM_getValue("helper_mode_album", HELPER_DEFAULT);
        else if (pagetype() == "search") helper_mode = GM_getValue("helper_mode_search", HELPER_DEFAULT);
        else if (pagetype() == "artist") helper_mode = GM_getValue("helper_mode_artist", HELPER_DEFAULT);
        else if (document.URL.match(/collage\.php\?id/)) helper_mode = GM_getValue("helper_mode_collage", HELPER_DEFAULT);
        if (helper_mode > helper_modes.length-1) helper_mode = 0;
    } else {
        helper_mode = HELPER_DEFAULT;
    }
    toggle_vis();
    window.addEventListener('load',function() { setup_pi_button(); },true);
};

function new_helper_mode(a1,c1,c2,c3,c4,c5) {
    var new_mode = new Array(6);
        new_mode[0] = a1; // mode name
        new_mode[1] = c1; // row
        new_mode[2] = c2; // bitrate tags
        new_mode[3] = c3; // cueless bold
        new_mode[4] = c4; // cue bold
        new_mode[5] = c5; // cueless display
    helper_modes.push(new_mode);
};

function toggle_vis() {
    helperStyleRules[0].style.display = helper_modes[helper_mode][1]; // row
    helperStyleRules[1].style.display = helper_modes[helper_mode][2]; // bitrate tags
    helperStyleRules[2].style.fontWeight = helper_modes[helper_mode][3]; // cue bold
    helperStyleRules[3].style.fontWeight = helper_modes[helper_mode][4]; // cueless bold
    helperStyleRules[4].style.display = helper_modes[helper_mode][5]; // cueless visible
};

function add_styles() {
    const HELPER_STYLE = document.styleSheets.length;
    const HELPER_TAG_STYLE = document.styleSheets.length+1;
    add_global_style('\
                .lossy, .nolossless, .single, .converted, .nolog, .nologcue, .dupereissue, .filtered { } \
                .bittag { \
                    float:none !important; \
                    padding:0; \
                    white-space:nowrap; \
                    display:none; \
                } \
                .logcuelink { } \
                .nocuelink { } \
                .nocue { } \
            ');
    add_global_style('\
                .cbrtag { color:'+CBR_TAG_COLOR+' } \
                .v0tag { color:'+V0_TAG_COLOR+' } \
                .v2tag { color:'+V2_TAG_COLOR+' } \
                .lossless { color:'+LOSSLESS_COLOR+' } \
                .cbr { color:'+CBR_COLOR+' } \
                .v0 { color:'+V0_COLOR+' } \
                .v2 { color:'+V2_COLOR+' } \
            ');
    helperStyle = document.styleSheets[HELPER_STYLE];
    helperStyleRules = helperStyle.cssRules? helperStyle.cssRules: helperStyle.rules;

    tagStyle = document.styleSheets[HELPER_TAG_STYLE];
    tagStyleRules = tagStyle.cssRules? tagStyle.cssRules: tagStyle.rules;

    add_global_style(' \
                .lossless:hover { color:'+hovercolor(tagStyleRules[3].style.color)+' } \
                .cbr:hover { color:'+hovercolor(tagStyleRules[4].style.color)+' } \
                .v0:hover { color:'+hovercolor(tagStyleRules[5].style.color)+' } \
                .v2:hover { color:'+hovercolor(tagStyleRules[6].style.color)+' } \
            ');
};

function add_classes(d) { // d = Database object
    var cbrtag = function() {
        var cbrtag = document.createElement("span");
        cbrtag.innerHTML = "[MP3 320]";
        cbrtag.style.color = CBR_TAG_COLOR;
        add_class(cbrtag,"bittag cbrtag");
        return cbrtag;
    }
    var v0tag = function() {
        var v0tag = document.createElement("span");
        v0tag.innerHTML = "[MP3 V0]";
        v0tag.style.color = V0_TAG_COLOR;
        add_class(v0tag,"bittag v0tag");
        return v0tag;
    }
    var v2tag = function() {
        var v2tag = document.createElement("span");
        v2tag.innerHTML = "[MP3 V2]";
        v2tag.style.color = V2_TAG_COLOR;
        add_class(v2tag,"bittag v2tag");
        return v2tag;
    }

    for (var i in d.single) {
        add_class(d.single[i].tablerow,"single");
    }
    for (var i in d.album) {
        var album = d.album[i];
        for (var j in album.tag) {
            for (var k in filter) {
                if (album.tag[j] == filter[k]) {
                    add_class(album.tablerow,"filtered");
                    for (var l in album.torrent) add_class(album.torrent[l].tablerow,"filtered");
                }
            }
        }
        var lossless = new Array();
        for (var j in album.torrent) {
            var bitrate = album.torrent[j].bitrate;
            if (bitrate == "lossless") lossless.push(album.torrent[j]);
            else add_class(album.torrent[j].tablerow,"lossy");
        }
        if (!album.lossless) {
            add_class(album.tablerow,"nolossless");
            for (var j in album.torrent) add_class(album.torrent[j].tablerow,"nolossless");
        }
        else if (album.lossless) {
            if (lossless.length > 2) {
                add_class(album.tablerow,"filtered");
                for (var j in album.torrent) add_class(album.torrent[j].tablerow,"filtered");
            }
            var m = 0;
            while (m < lossless.length) {
                var n = m + 1;
                while (n < lossless.length) {
                    if (!lossless[m].log) {
                        add_class(lossless[m].tablerow,"nolog");
                        lossless.splice(m,1);
                    }
                    else if (!lossless[n].log) {
                        add_class(lossless[n].tablerow,"nolog");
                        lossless.splice(n,1);
                    }
                    else if (lossless[m].reissue == lossless[n].reissue) {
                        if (lossless[n].cue) {
                            add_class(lossless[m].tablerow,"dupereissue");
                            lossless.splice(m,1);
                        }
                        else {
                            add_class(lossless[n].tablerow,"dupereissue");
                            lossless.splice(n,1);
                        }
                    }
                    else n++;
                }
                m++;
            }
            if (!album.losslesslog && !album.losslesscue) {
                add_class(album.tablerow,"nologcue");
                for (var j in album.torrent) add_class(album.torrent[j].tablerow,"nologcue");
            }
            var converted = true;
            var cue = false;
            var log = false;
            for (var j in lossless) {
                //if (lossless[j].snatches < 100) add_class(lossless[j].tablerow,"filtered"); // custom
                if (!lossless[j].log) {
                    add_class(lossless[j].tablerow,"nolog");
                    add_class(lossless[j].link,"nologlink");
                }
                else if (!lossless[j].cue) {
                    add_class(lossless[j].tablerow,"nocue");
                    add_class(lossless[j].link,"nocuelink");
                }
                else if (lossless[j].cue && lossless[j].log) {
                    add_class(lossless[j].tablerow,"logcue");
                    add_class(lossless[j].link,"logcuelink");
                }
                var cbr = false;
                var v0 = false;
                var v2 = false;
                for (var k in album.torrent) {
                    if (album.torrent[k].bitrate != "lossless") {
                        if (lossless[j].reissue == album.torrent[k].reissue && album.torrent[k].format == "mp3" && album.torrent[k].source == "cd") {
                            var bitrate = album.torrent[k].bitrate;
                            if (bitrate == "320") cbr = true;
                            if (bitrate == "v0 (vbr)") v0 = true;
                            if (bitrate == "v2 (vbr)") v2 = true;
                        }
                    }
                }
                if (!cbr || !v0 || !v2) converted = false;
                if (lossless[j].log) log = true;
                if (cbr && v0 && v2) add_class(lossless[j].tablerow,"converted");
                else if (lossless[j].cue) cue = true;
                var link = lossless[j].link;
                if (!cbr) {
                    lossless[j].link.innerHTML += " ";
                    link.appendChild(cbrtag());
                }
                if (!v0) {
                    lossless[j].link.innerHTML += " ";
                    link.appendChild(v0tag());
                }
                if (!v2) {
                    lossless[j].link.innerHTML += " ";
                    link.appendChild(v2tag());
                }
                link.addEventListener('mouseover',span_lighten,true);
                link.addEventListener('mouseout',span_unlighten,true);
            }
            if (converted) add_class(album.tablerow,"converted");
            if (!cue) add_class(album.tablerow,"nocue");
            if (!log) add_class(album.tablerow,"nolog");
        }
    }
};

function add_class(element,className) {
    if (element) {
        if(!(new RegExp('\\b'+className+'\\b').test(element.className))) {
            element.className+=element.className?' '+className:className;
        }
    }
};

function add_global_style(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};

function span_lighten() {
    oldspancolor = new Array(this.getElementsByTagName("span").length);
    for (var x = 0;x < this.getElementsByTagName("span").length; x++) {
        oldspancolor[x] = this.getElementsByTagName("span")[x].style.color;
        hsl = rgbToHsl(rgb(oldspancolor[x]));
        hsl[2] += LIGHTEN_FACTOR;
        rgbcolor = hslToRgb(hsl);
        this.getElementsByTagName("span")[x].style.color = "rgb("+rgbcolor[0]+", "+rgbcolor[1]+", "+rgbcolor[2]+")";
    }
};

function span_unlighten() {
    for (var x=0; x < this.getElementsByTagName("span").length; x++) {
        this.getElementsByTagName("span")[x].style.color = oldspancolor[x];
    }
};

function rgb(color) {
    var rgb = Array.prototype.slice.call( color.match(/(\d+), (\d+), (\d+)/) );
    rgb.shift();
    return rgb;
};

function rgbToHsl(rgb){
    r = rgb[0]/255, g = rgb[1]/255, b = rgb[2]/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0;
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
};

function hslToRgb(hsl) {
    var h = hsl[0];
    var s = hsl[1];
    var l = hsl[2];
    var r, g, b;

    if(s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

function hovercolor(oldcolor) {
    hsl = rgbToHsl(rgb(oldcolor));
    hsl[2] += LIGHTEN_FACTOR;
    rgbcolor = hslToRgb(hsl);
    return "rgb("+rgbcolor[0]+", "+rgbcolor[1]+", "+rgbcolor[2]+")";
};

// button set up

function setup_pi_button() {
    var pi = document.getElementById('__wh_toggle');
    if (!pi) {
        pi = new_node('p', '__wh_toggle');
        pi.appendChild(document.createTextNode(''));
        document.getElementsByTagName("body")[0].appendChild(pi);

        var pi_toggle_style = '\
            #__wh_toggle{ \
                            position:fixed; \
                            bottom:0; \
                            right:0; \
                            padding:2px; \
                            margin:0; \
                            font:caption; \
                            font-weight:bold; \
                            cursor:pointer; \
                            opacity:.75; \
                            z-index:1000 \
                        } \
            #__wh_toggle:hover{ \
                            border-width:2px 0 0 2px; \
                            border-style:solid none none solid; \
                            border-color:black \
                        }';
        add_style("__wh_toggle_style", pi_toggle_style);
        pi.addEventListener('click',
                            function() {toggle_intercept(helper_mode+1)},
                            false);
    }

    if (helper_mode == 0) {
        pi.firstChild.data = '[WH] ' + helper_modes[0][0];
        pi.setAttribute('title', 'Click to turn on What.CD Helper');
        pi.style.backgroundColor = WH_BUTTON_BG;
        pi.style.color = WH_BUTTON_COLOR;
    } else {
        pi.firstChild.data = '[WH] ' + helper_modes[helper_mode][0];
        pi.setAttribute('title', 'Click to change What.CD Helper Mode');
        pi.style.backgroundColor = WH_BUTTON_BG;
        pi.style.color = WH_BUTTON_COLOR;
    }
};

function toggle_intercept(flag) {
    helper_mode = flag;
    if (helper_mode == helper_modes.length) helper_mode = 0;
    if (typeof GM_setValue != 'undefined') {
        if (pagetype() == "album") GM_setValue("helper_mode_album", helper_mode);
        else if (pagetype() == "search") GM_setValue("helper_mode_search", helper_mode);
        else if (pagetype() == "artist") GM_setValue("helper_mode_artist", helper_mode);
        else if (pagetype() == "collage") GM_setValue("helper_mode_collage", helper_mode);
    }
    toggle_vis();
    setup_pi_button();
};

function new_node(type, id) {
    var node = document.createElement(type);
    if (id && id.length > 0)
        node.id = id;
    return node;
};

function add_style(style_id, style_rules) {
    if (document.getElementById(style_id))
        return;

    var style = new_node("style", style_id);
    style.type = "text/css";
    style.innerHTML = style_rules;
    document.getElementsByTagName('head')[0].appendChild(style);
};

/*****  BEGIN WHAT.CD API *****/

function Database(doc) {
    var table = doc.getElementsByClassName("torrent_table")[0];
    var albumrows = Array.prototype.slice.call( table.getElementsByClassName('group') );
    var singlerows = Array.prototype.slice.call( table.getElementsByClassName('torrent') );
    var torrentrows = Array.prototype.slice.call( table.getElementsByClassName('group_torrent') );
    this.torrent = new Array();
    this.album = new Array();
    for (var i in torrentrows) {
        this.torrent.push(new Torrent(torrentrows[i]));
    }
    if (pagetype() == "album") {
        this.album.push(new Album(new Array(),this.torrent));
    }
    if (pagetype() == "artist" || pagetype() == "search" || pagetype() == "collage") {
        for (var i in albumrows) {
            this.album.push(new Album(albumrows[i],this.torrent));
        }
    }
    if (pagetype() == "search") {
        this.single = new Array();
        for (var i in singlerows) {
            this.single.push(new Single(singlerows[i]));
        }
    }
};

function Album(album,torrents) {
    if (pagetype() == "album") {
        var albuminfo = document.getElementsByTagName("h2")[0];
        var artistlink = albuminfo.getElementsByTagName("a")[0];
        this.artistid = artistlink.href.match(/id=(\d+)/)[1];
        this.artist = artistlink.textContent;
        this.year = albuminfo.textContent.match(/\[(\d{4})\]/)[1];
        this.title = albuminfo.textContent.replace(this.artist+" - ","").replace(" ["+this.year+"]","");
        this.albumid = document.location.toString().match(/id=(\d+)/)[1];
        this.taglink = new Array();
        this.tag = new Array();
        for (var i in document.links) {
            var link = document.links[i];
            if (link.href.match(/searchtags=/)) {
                this.taglink.push(link);
                this.tag.push(link.textContent);
            }
        }
    }
    if (pagetype() == "artist") {
        this.tablerow = album;
        this.artistid = document.location.toString().match(/id=(\d+)/)[1];
        this.artist = document.getElementsByTagName("h2")[0].textContent;
        var albumlink = album.getElementsByTagName("a")[0];
        this.title = albumlink.textContent;
        this.albumid = albumlink.href.match(/id=(\d+)/)[1];
        this.year = album.textContent.match(/\d+/);
        if (album.getElementsByClassName('tags')[0]) this.taglink = Array.prototype.slice.call( album.getElementsByClassName('tags')[0].getElementsByTagName('a') );
        else this.taglink = new Array();
        this.tag = new Array();
        if (this.taglink.length > 0) {
            for (var i in this.taglink) this.tag.push(this.taglink[i].textContent);
        }
    }
    if (pagetype() == "search" || pagetype() == "collage") {
        this.tablerow = album;
        var column = this.tablerow.getElementsByTagName("td");
        var albuminfo = column[2];
        var links = albuminfo.getElementsByTagName("a");
        this.artistid = links[0].href.match(/id=(\d+)/)[1];
        this.artist = links[0].textContent;
        this.albumid = links[1].href.match(/id=(\d+)/)[1];
        this.title = links[1].textContent;
        this.year = albuminfo.textContent.match(/\[(\d{4})\]/)[1];
        if (albuminfo.getElementsByClassName('tags')[0]) this.taglinks = Array.prototype.slice.call( albuminfo.getElementsByClassName('tags')[0].getElementsByTagName('a') );
        else this.taglinks = new Array();
        this.tag = new Array();
        if (this.taglinks.length > 0) {
            for (var i in this.taglinks) this.tag.push(this.taglinks[i].textContent);
        }
        if (pagetype() == "search") {
            this.timeadded = column[3].textContent;
            this.size = column[4].textContent.match(/\d+\.\d+ \w+/);
            this.snatches = column[5].textContent;
            this.seeders = column[6].textContent;
            this.leechers = column[7].textContent;
        }
    }
    this.torrent = new Array();
    while (this.albumid == torrents[0].albumid) {
        this.torrent.push(torrents.shift());
        if (torrents.length == 0) break;
    }
    this.lossless = false;
    this.losslesslog = false;
    this.losslesslogcue = false;
    this.losslesscue = false;
    for (var i in this.torrent) {
        if (this.torrent[i].bitrate == "lossless") this.lossless = true;
        if (this.lossless && this.torrent[i].log && this.torrent[i].cue) this.losslesslogcue = true;
        if (this.lossless && this.torrent[i].cue) this.losslesscue = true;
        if (this.lossless && this.torrent[i].log) this.losslesslog = true;
    }
};

function Torrent(row) {
    this.tablerow = row;
    var column = this.tablerow.getElementsByTagName('td');
    var links = column[0].getElementsByTagName("a");
    if (links.length > 2) {
        if (links[2].title == "Edit") {
            if (links.length == 4) this.link = links[3];
            else if (links.length == 5) this.link = links[4];
        }
        else if (links[1].title == "Report") this.link = links[2];
    }
    else this.link = links[1];
    this.dllink = links[0];
    this.albumid = this.link.href.match(/id=(\d+)/)[1];
    if (pagetype() == "search") {
        this.torrentid = this.link.href.match(/torrentid=(\d+)/)[1];
    }
    var linktext = this.link.textContent.toLowerCase();
    this.format = linktext.match(/(\w+?) \/ /)[1];
    if (linktext.match(/\/ (.*?) \/ /)) this.bitrate = linktext.match(/\/ (.*?) \/ /)[1];
    if (this.bitrate == "lossless") {
        this.log = (linktext.match(/\/ log .*?\/ /i) != null);
        this.cue = (linktext.match(/\/ cue \/ /i) != null);
    }
    if (linktext.match(/(cd|dvd|vinyl|soundboard|sacd|dat)/) == null) {
        this.link.textContent = this.link.innerHTML + " / Error: no source media found";
        errornotify("Error: no source media for AlbumID: ",this.albumid);
        this.source = "";
    }
    else {
        this.source = linktext.match(/(cd|dvd|vinyl|soundboard|sacd|dat)/)[1];
    }
    if (linktext.match(/\/ ([^\/]*? - \d{4})/)) {
        var reissue = RegExp.$1;
    }
    if (reissue) {
        this.reissue = reissue;
        this.reissuename = reissue.toString().match(/(.*) -/)[1];
        this.reissueyear = reissue.toString().match(/- (.*)/)[1];
    }
    else this.reissue = "";
    this.scene = (linktext.match(/scene$/) != null);
    if (pagetype() == "artist" || pagetype() == "album") {
        this.size = column[1].textContent.match(/\d+\.\d+ \w+/);
        this.snatches = column[2].textContent;
        this.seeders = column[3].textContent;
        this.leechers = column[4].textContent;
    }
    else if (pagetype() == "search") {
        this.bookmarks = column[1].textContent;
        this.timeadded = column[2].textContent;
        this.size = column[3].textContent.match(/\d+\.\d+ \w+/);
        this.snatches = column[4].textContent;
        this.seeders = column[5].textContent;
        this.leechers = column[6].textContent;
    }

};

function Single(row) {
    this.tablerow = row;
    var column = this.tablerow.getElementsByTagName('td');
    var links = column[2].getElementsByTagName("a");
    if (links.length > 2) {
        if (links[2].title == "Edit") this.link = links[4];
        else if (links[1].title == "Report") this.link = links[2];
    }
    else this.link = links[1];
    this.title = this.link.textContent;
    if (column[2].getElementsByClassName('tags')[0]) this.taglinks = Array.prototype.slice.call( column[2].getElementsByClassName('tags')[0].getElementsByTagName('a') );
    else this.taglinks = new Array();
    this.tags = new Array();
    if (this.taglinks.length > 0) {
        for (var i in this.taglinks) this.tags.push(this.taglinks[i].textContent);
    }
    this.bookmarks = column[3].textContent;
    this.timeadded = column[4].textContent;
    this.size = column[5].textContent.match(/\d+\.\d+ \w+/);
    this.snatches = column[6].textContent;
    this.seeders = column[7].textContent;
    this.leechers = column[8].textContent;
};

function errornotify(msg,albumid) {
    var alerts = document.getElementById("alerts");
    var alertbar = document.createElement("div");
    alertbar.className = "alertbar";
    if (albumid) {
        if (!alertbar.textContent.match("Report errors here")) {
            var info = document.createElement("a");
            info.textContent = "Report errors here";
            info.href = "http://what.cd/forums.php?action=viewthread&threadid=12006";
            alertbar.appendChild(info);
            alertbar.innerHTML += "<br />";
        }
        var info = document.createElement("a");
        info.textContent = msg + albumid;
        info.href = "http://what.cd/torrents.php?id=" + albumid;
    }
    else {
        var info = document.createElement("span");
        info.textContent = msg;
    }
    alertbar.appendChild(info);
    alerts.appendChild(alertbar);
};

function pagetype() {
    var url = document.location.toString();
    if (url.match(/torrents\.php\?id=\d+/)) return "album";
    else if (url.match(/artist\.php/)) return "artist";
    else if (url.match(/torrents\.php/)) return "search";
    else if (url.match(/collage\.php/)) return "collage";
};

/***** END WHAT.CD API *****/