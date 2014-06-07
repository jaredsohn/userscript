// ==UserScript==
// @name           What.CD API
// @author         sanguinepenguinx
// @version        1.21
// @namespace      http://what.cd
// @description    Unofficial API for What.CD
// @include        http://www.last.fm/music/*
// ==/UserScript==

/**
 * Example of how to create and initialize the What.CD API.
 */
if (location.toString().match(/www\.last\.fm\/music\/([\w\+]+)/)) {
    artist = RegExp.$1;
}
var url = "artist.php?name="+artist;

init(false,url);

/**
 * End example
 */

/*****  BEGIN WHAT.CD API *****/

/**
 * @author sanguinepenguinx
 * @version 1.21
 * @fileoverview An unofficial JavaScript API for What.CD.
 *               My goal is to make it easy to integrate What.CD
 *               content into other web sites. Please PM me
 *               (sanguinepenguinx) with bugfixes, suggestions,
 *               or comments.
 */

/**
 * Initializes the variables required to create a What object: SSL and
 * WHATURL.
 * @param ssl Boolean: "true" if SSL is on, "false" if SSL is off
 * @param url String What.CD URL without the hostname
 */
function init(ssl,url) {
    // initialize the What.CD API
    SSL = ssl; // SSL on/off
    WHATURL = whathost(SSL)+url; // URL to load
    new What(); // create and initialize the database
};

/**
 * This function is passed the Database, whatbase, after the What
 * class has finished loading the page from What.CD. It is run
 * automatically, so it is not necessary to call it if you're using
 * the What class. If you're creating the Database from a site other
 * than What.CD, you must put all of your code in this function.
 * Because JavaScript runs asynchronously, any manipulation of
 * the whatbase variable outside this function may run before What.CD
 * has finished loading and result in errors.
 * @param whatbase Database object passed from the What class.
 */
function parser(whatbase) {
    // Outputs artist albums to the Firefox Error Console Messages tab
    for (var i in whatbase.album) {
        GM_log(whatbase.album[i].tablerow.textContent);
    }
};

/******* STOP EDITING HERE *******/

var PAGETYPE;

/**
 * Loads the What.CD page at WHATURL, creates a Database object, then
 * passes the Database object to parser as whatbase.
 * @param {String} WHATURL URL to load (must be globally defined before making a new What object).
 * @param {Boolean} SSL SSL on/off (must be globally defined before making a new What object).
 * @see Database
 */
function What() {
    if (WHATURL != "") {
        var what = new GM_xmlhttpRequest({
            method:"GET",
            url:WHATURL,
            headers: {
                "User-Agent":navigator.userAgent,
                "Accept":"text/xml"
            },
            onload:function(response) {
                WHATURL = response.finalUrl;
                // fix XML validation errors
                var page = response.responseText.replace(/&(?!(\w+;))/g,"amp;");
                // create document object
                var what = new DOMParser().parseFromString(page,"text/xml");
                // create Database
                var whatbase = new Database(what);
                parser(whatbase);
            }
        })
    }
};

/**
 * Creates a Database object from a DOM tree.
 * @param doc A DOM tree - can be the DOM document object or DOMParser
 *            object from the What class.
 * @see What
 */
function Database(doc) {
    setpagetype(WHATURL);
    var table = doc.getElementsByClassName("torrent_table")[0];
    var albumrows = Array.prototype.slice.call( table.getElementsByClassName('group') );
    var singlerows = Array.prototype.slice.call( table.getElementsByClassName('torrent') );
    var torrentrows = Array.prototype.slice.call( table.getElementsByClassName('group_torrent') );
    var links = Array.prototype.slice.call( table.getElementsByTagName('a') );
    var currenturl = location.toString().match(/.*\//);
    for (var i in links) links[i].href = links[i].href.replace(currenturl,whathost(SSL));
    /**
     * An Array of all Torrents at WHATURL.
     * @type Array
     */
    this.torrent = new Array();
    /**
     * An Array of all Albums at WHATURL.
     * @type Array
     */
    this.album = new Array();
    for (var i in torrentrows) {
        this.torrent.push(new Torrent(torrentrows[i]));
    }
    if (PAGETYPE == "album") {
        this.album.push(new Album(new Array(),this.torrent));
    }
    if (PAGETYPE == "artist" || PAGETYPE == "search" || PAGETYPE == "collage") {
        for (var i in albumrows) {
            this.album.push(new Album(albumrows[i],this.torrent));
        }
    }
    if (PAGETYPE == "search") {
        /**
         * An Array of all Single torrents at WHATURL. Single torrents
         * are torrents that are always ungrouped such as applications
         * and comics.
         * @type Array
         */
        this.single = new Array();
        for (var i in singlerows) {
            this.single.push(new Single(singlerows[i]));
        }
    }
};

/**
 * Represents an Album and all its properties and associated Torrents.
 * @requires Database
 */

function Album(album,torrents) {
    if (PAGETYPE == "album") {
        var albuminfo = document.getElementsByTagName("h2")[0];
        var artistlink = albuminfo.getElementsByTagName("a")[0];
        /**
         * What.CD ArtistID.
         * @type Integer
         */
        this.artistid = artistlink.href.match(/id=(\d+)/)[1] - 0;
        /**
         * Artist name.
         * @type String
         */
        this.artist = artistlink.textContent;
        /**
         * Album release year.
         * @type Integer
         */
        this.year = albuminfo.textContent.match(/\[(\d{4})\]/)[1] - 0;
        /**
         * Album title.
         * @type String
         */
        this.title = albuminfo.textContent.replace(this.artist+" - ","").replace(" ["+this.year+"]","");
        /**
         * What.CD AlbumID.
         * @type Integer
         */
        this.albumid = WHATURL.match(/id=(\d+)/)[1] - 0;
        /**
         * Array of <A> tags for an album's tags.
         * @type Array
         */
        this.taglink = new Array();
        /**
         * Array of String text tags for an album's tags.
         * @type Array
         */
        this.tag = new Array();
        for (var i in document.links) {
            var link = document.links[i];
            if (link.href.match(/searchtags=/)) {
                this.taglink.push(link);
                this.tag.push(link.textContent);
            }
        }
    }
    if (PAGETYPE == "artist") {
        /**
         * The HTML table row used to generate the object. This is useful
         * for CSS themeing.
         * @type HTMLTableRowElement
         */
        this.tablerow = album;
        this.artistid = WHATURL.match(/id=(\d+)/)[1] - 0;
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
    if (PAGETYPE == "search" || PAGETYPE == "collage") {
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
        if (PAGETYPE == "search") {
            /**
             * The amount of time the most recently added torrent.
             * in the album has been on What.CD.
             * @type String
             */
            this.timeadded = column[3].textContent;
            /**
             * The size of the largest torrent in the album.
             * @type String
             */
            this.size = column[4].textContent.match(/\d+\.\d+ \w+/);
            /**
             * Number of times the album has been fully downloaded.
             * @type Integer
             */
            this.snatches = column[5].textContent - 0;
            /**
             * Number of people currently uploading the album.
             * @type Integer
             */
            this.seeders = column[6].textContent - 0;
            /**
             * Current number of people downloading or partially.
             * seeding the album.
             * @type Integer
             */
            this.leechers = column[7].textContent - 0;
        }
    }
    /**
     * Array of Torrent objects associated with the Album.
     * @type Array
     */
    this.torrent = new Array();
    while (this.albumid == torrents[0].albumid) {
        this.torrent.push(torrents.shift());
        if (torrents.length == 0) break;
    }
    /**
     * Whether the album is available in a lossless format.
     * @type Boolean
     */
    this.lossless = false;
    /**
     * Whether the album is available in a lossless format with a log file.
     * @type Boolean
     */
    this.losslesslog = false;
    /**
     * Whether the album is available in a lossless format with both a log and a cue file.
     * @type Boolean
     */
    this.losslesslogcue = false;
    /**
     * Whether the album is available in a lossless format with a cue file.
     * @type Boolean
     */
    this.losslesscue = false;
    for (var i in this.torrent) {
        if (this.torrent[i].bitrate == "lossless") this.lossless = true;
        if (this.lossless && this.torrent[i].log && this.torrent[i].cue) this.losslesslogcue = true;
        if (this.lossless && this.torrent[i].cue) this.losslesscue = true;
        if (this.lossless && this.torrent[i].log) this.losslesslog = true;
    }
};

/**
 * Represents an Torrent and all its properties.
 * @requires Database
 */
function Torrent(row) {
    /**
     * The HTML table row used to generate the object. This is useful
     * for CSS themeing.
     * @type HTMLTableRowElement
     */
    this.tablerow = row;
    var column = this.tablerow.getElementsByTagName('td');
    var links = column[0].getElementsByTagName("a");
    /**
     * Link element for a specific bitrate and release.
     * @type HTMLLinkElement
     */
    this.link = null;
    if (links.length > 2) {
        if (links[2].title == "Edit") this.link = links[4];
        else if (links[1].title == "Report") this.link = links[2];
    }
    else this.link = links[1];
    /**
     * Link element for the direct download of the .torrent file.
     * @type HTMLLinkElement
     */
    this.dllink = links[0];
    /**
     * What.CD AlbumID.
     * @type Integer
     */
    this.albumid = this.link.href.match(/id=(\d+)/)[1] - 0;
    if (PAGETYPE == "search") {
        /**
         * What.CD TorrentID.
         * @type Integer
         */
        this.torrentid = this.link.href.match(/torrentid=(\d+)/)[1] - 0;
    }
    var linktext = this.link.textContent;
    /**
     * The music file format. For example, FLAC, MP3, Ogg.
     * @type String
     */
    this.format = linktext.match(/(\w+?) \/ /)[1];
    /**
     * The bitrate. For example, Lossless, V0 (VBR).
     * @type String
     */
    this.bitrate = null;
    if (linktext.match(/\/ (.*?) \/ /)) this.bitrate = linktext.match(/\/ (.*?) \/ /)[1];
    if (this.bitrate == "Lossless") {
        /**
         * If the bitrate is lossless, whether the torrent.
         * has a log file.
         * @type Boolean
         */
        this.log = (linktext.match(/\/ log .*?\/ /i) != null);
        /**
         * If the bitrate is lossless, whether the torrent.
         * has a cue file.
         * @type Boolean
         */
        this.cue = (linktext.match(/\/ cue \/ /i) != null);
    }
    if (linktext.match(/(cd|dvd|vinyl|soundboard|sacd|dat)/i) == null) {
        this.link.textContent = this.link.innerHTML + " / Error: no source media found";
        /**
         * The source of the rip. For example, CD, DVD, Vinyl.
         */
        this.source = "";
    }
    else {
        this.source = linktext.match(/(cd|dvd|vinyl|soundboard|sacd|dat)/i)[1];
    }
    if (linktext.match(/\/ ([^\/]*? - \d{4})/)) {
        var reissue = RegExp.$1;
    }
    /**
     * The torrent's reissue name and year.
     * @type String
     */
    this.reissuefull = "";
    if (reissue) {
        this.reissuefull = reissue;
        /**
         * The torrent's reissue name.
         * @type String
         */
        this.reissuename = reissue.toString().match(/(.*) -/)[1];
        /**
         * The torrent's reissue year.
         * @type String
         */
        this.reissueyear = reissue.toString().match(/- (.*)/)[1];
    }
    /**
     * Whether the torrent is a Scene release.
     * @type Boolean
     */
    this.scene = (linktext.match(/scene$/i) != null);
    if (PAGETYPE == "artist" || PAGETYPE == "album") {
        /**
         * File size of the torrent.
         * @type String
         */
        this.size = column[1].textContent.match(/\d+\.\d+ \w+/);
    /**
     * Number of times the torrent has been fully downloaded.
     * @type Integer
     */
        this.snatches = column[2].textContent - 0;
        /**
         * Number of people currently uploading the torrent.
         * @type Integer
         */
        this.seeders = column[3].textContent - 0;
        /**
         * Number of people currently downloading or partially
         * seeding the torrent.
         * @type Integer
         */
        this.leechers = column[4].textContent - 0;
    }
    else if (PAGETYPE == "search") {
        /**
         * Number of times the torrent has been bookmarked.
         * @type Integer
         */
        this.bookmarks = column[1].textContent - 0;
        /**
         * The amount of time the torrent has been on What.CD.
         * @type String
         */
        this.timeadded = column[2].textContent;
        this.size = column[3].textContent.match(/\d+\.\d+ \w+/) - 0;
        this.snatches = column[4].textContent - 0;
        this.seeders = column[5].textContent - 0;
        this.leechers = column[6].textContent - 0;
    }

};

/**
 * Represents a Single torrent and all its properties.
 * @requires Database
 */
function Single(row) {
    /**
     * The HTML table row used to generate the object. This is useful
     * for CSS themeing.
     * @type HTMLTableRowElement
     */
    this.tablerow = row;
    var column = this.tablerow.getElementsByTagName('td');
    /**
     * Link element for a specific bitrate and release.
     * @type HTMLLinkElement
     */
    this.link = null;
    var links = column[2].getElementsByTagName("a");
    if (links.length > 2) {
        if (links[2].title == "Edit") this.link = links[4];
        else if (links[1].title == "Report") this.link = links[2];
    }
    else this.link = links[1];
    /**
     * Link element for the direct download of the .torrent file.
     * @type HTMLLinkElement
     */
    this.dllink = links[0];
    /**
     * Name of the torrent.
     * @type String
     */
    this.title = this.link.textContent;
    /**
     * Array of <A> tags for an album's tags.
     * @type Array
     */
    this.taglink = null;
    if (column[2].getElementsByClassName('tags')[0]) this.taglink = Array.prototype.slice.call( column[2].getElementsByClassName('tags')[0].getElementsByTagName('a') );
    else this.taglink = new Array();
    /**
     * Array of String text tags for an album's tags.
     * @type Array
     */
    this.tag = new Array();
    if (this.taglink.length > 0) {
        for (var i in this.taglink) this.tag.push(this.taglink[i].textContent);
    }
    /**
     * Number of times the torrent has been bookmarked.
     * @type Integer
     */
    this.bookmarks = column[3].textContent - 0;
    /**
     * The amount of time the torrent has been on What.CD.
     * @type String
     */
    this.timeadded = column[4].textContent;
    /**
     * File size of the torrent.
     * @type String
     */
    this.size = column[5].textContent.match(/\d+\.\d+ \w+/);
    /**
     * Number of times the torrent has been fully downloaded.
     * @type Integer
     */
    this.snatches = column[6].textContent - 0;
    /**
     * Number of people currently uploading the torrent.
     * @type Integer
     */
    this.seeders = column[7].textContent - 0;
    /**
     * Number of people currently downloading or partially
     * seeding the torrent.
     * @type Integer
     */
    this.leechers = column[8].textContent - 0;
};

/**
 * Returns either the SSL or non-SSL version of the What.CD
 * URL.
 * @param ssl Boolean: "true" if SSL is on; "false" if SSL is off
 * @return String
 * @type String
 */
function whathost(ssl) {
    if (ssl) return "https://ssl.what.cd/";
    else if (!ssl) return "http://what.cd/";
};

/**
 * Detects and sets the PAGETYPE variable to be parsed by
 * the Database. Types: album, artist, search. collage.
 * @param WHATURL URL of the What.CD page
 */
function setpagetype(WHATURL) {
    if (WHATURL.match(/torrents\.php\?id=\d+/)) PAGETYPE = "album";
    else if (WHATURL.match(/artist\.php/)) PAGETYPE = "artist";
    else if (WHATURL.match(/torrents\.php/)) PAGETYPE = "search";
    else if (WHATURL.match(/collage\.php/)) PAGETYPE = "collage";
};

/***** END WHAT.CD API *****/