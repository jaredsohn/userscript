// ==UserScript==
// @name           YouTube Video Formats
// @author         Mick Koch
//@Uploaded again by         SemperVideo
// @description    Display a YouTube video's available formats.
// @version        0.4.4
// @namespace      http://userscripts.org/users/79579
// @include        http://*youtube.*/watch*
// @require        http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

// This script is free software. It comes without any warranty, to the extent
// permitted by applicable law. You can redistribute it and/or modify it under
// the terms of the Do What The Fuck You Want To Public License, Version 2, as
// published by Sam Hocevar. See http://sam.zoy.org/wtfpl/COPYING for more
// details.

Array.implement({
    fuse: function () {
        return this.join("");
    },

    find: function (func) {
        for (var i = 0, l = this.length; i < l; i++) {
            var result = func(this[i], i, this);

            if (result !== undefined) {
                return result;
            }
        }
    }
});

var CssStyle = new Class({
    initialize: function (selectors) {
        this.selectors = selectors;
    },

    text: function () {
        var stack = [];

        Hash.each(this.selectors, function (block, selector) {
            stack.push(selector, "{");

            Hash.each(block, function (value, key) {
                stack.push(key, ":", value, ";");
            });

            stack.push("}");
        });

        return stack.fuse();
    },

    style: function () {
        return new Element("style", {"type": "text/css",
                                     "text": this.text()});
    },

    container: function () {
        return $$("head");
    },

    add: function (container) {
        return (container || this.container()).adopt(this.style());
    }
});

var Uri = new Class({
    initialize: function (params, base) {
        this.params = params;
        this.base = base;
    },

    path: function () {
        return this.base || location.pathname;
    },

    query: function () {
        return Hash.toQueryString(this.params);
    },

    full: function () {
        if (this.params) {
            return [this.path(), this.query()].join("?");
        }

        return this.path();
    }
});

var YouTubeTab = new Class({
    selected: "watch-tab-sel",

    label: null,
    tip: null,

    contents: function () {},

    initialize: function () {
        this.name = this.label.toLowerCase();
        this.id = ["watch-tab-", this.name].fuse();

        this.selector = new Element("div", {"class": "watch-tab",
                                            "id": this.id,
                                            "title": this.tip});

        this.body = new Element("div", {"id": [this.id, "-body"].fuse(),
                                        "class": "watch-tab-body"});

        this.selector.adopt(this.link(), this.arrow());
    },

    link: function () {
        return new Element("a", {
            "class": "watch-action-link",
            "id": ["watch-action-", this.name, "-link"].fuse(),

            "href": "#",
            "events": {"click": this.select.bind(this)}
        }).adopt(this.text());
    },

    text: function () {
        return new Element("span", {"class": "watch-action-text",
                                    "text": this.label});
    },

    arrow: function () {
        return new Element("button", {"class": "master-sprite watch-tab-arrow",
                                      "title": "Hai there!"});
    },

    parts: function () {
        return $$(this.selector, this.body);
    },

    selectors: function () {
        return $$(".watch-tabs.master-sprite")[0];
    },

    bodies: function () {
        return $$(".watch-tab-contents")[0];
    },

    all: function () {
        return $$(this.selectors().getChildren(), this.bodies().getChildren());
    },

    container: function () {
        return this.selectors().getLast();
    },

    select: function () {
        this.all().removeClass(this.selected);
        this.parts().addClass(this.selected);

        this.body.empty().adopt(this.contents());

        // Disallow the default onclick event (scroll to the top of the page)
        return false;
    },

    clear: function () {
        return new Element("div", {"class": "clear"});
    },

    add: function () {
        this.selector.inject(this.container(), "before");
        this.bodies().adopt(this.body);
    }
});

var Media = new Class({
    display: function () {
        return this.name;
    },

    title: function () {
        return new Element("dt", {"text": [this.category, ":"].fuse()});
    },

    definition: function () {
        return new Element("dd", {"text": this.display()});
    },

    full: function () {
        return [this.title(), this.definition()];
    }
});

var Width = new Class({ Extends: Media,
    category: "width",
    range: " to ",

    initialize: function (min, max) {
        this.min = min;
        this.max = max;
    },

    width: function () {
        return [this.min, this.max].clean();
    },

    display: function () {
        return [this.width().join(this.range), "px"].fuse();
    }
});

var ContainerMedia = new Class({ Extends: Media,
    category: "container"
});

var FlvContainer = new Class({ Extends: ContainerMedia,
    name: "FLV"
});

var Mp4Container = new Class({ Extends: ContainerMedia,
    name: "MP4"
});

var AudioMedia = new Class({ Extends: Media,
    category: "audio"
});

var Mp3Audio = new Class({ Extends: AudioMedia,
    name: "MP3"
});

var AacAudio = new Class({ Extends: AudioMedia,
    name: "AAC"
});

var VideoMedia = new Class({ Extends: Media,
    category: "video"
});

var FlvVideo = new Class({ Extends: VideoMedia,
    name: "FLV (H.263)"
});

var H264Video = new Class({ Extends: VideoMedia,
    name: "H.264"
});

var Format = new Class({
    id : null,

    width: null,
    container: null,
    audio: null,
    video: null,

    always_show: false,

    help: function () {},

    initialize: function (group, uris) {
        this.group = group;
        this.uri = uris.for_format(this);

        this.attrs = [this.width, this.container, this.audio, this.video];
    },

    link: function () {
        return new Element("a", {"href": this.uri.full(),
                                 "text": ["Format", this.id].join(" ")});
    },

    title: function () {
        return new Element("h3").adopt(this.link());
    },

    list: function () {
        return new Element("dl").adopt(this.attrs.map(function (attr) {
            return attr.full();
        }));
    },

    full: function () {
        return new Element("li", {"title": this.help()}).adopt(this.title(),
                                                               this.list());
    }
});

var StandardDefFormat = new Class({ Extends: Format,
    qualities: ["High-quality (HQ) format", "Standard-quality format"],

    position: function () {
        return this.group.position_of(this);
    },

    help: function () {
        return this.qualities[this.position()];
    }
});

var Format5 = new Class({ Extends: StandardDefFormat,
    id: 5,

    width: new Width(300, 640),
    container: new FlvContainer(),
    audio: new Mp3Audio(),
    video: new FlvVideo()
});

var Format18 = new Class({ Extends: StandardDefFormat,
    id: 18,

    width: new Width(480),
    container: new Mp4Container(),
    audio: new AacAudio(),
    video: new H264Video(),

    always_show: true
});

var Format34 = new Class({ Extends: StandardDefFormat,
    id: 34,

    width: new Width(300, 640),
    container: new FlvContainer(),
    audio: new AacAudio(),
    video: new H264Video()
});

var Format35 = new Class({ Extends: StandardDefFormat,
    id: 35,

    width: new Width(450, 854),
    container: new FlvContainer(),
    audio: new AacAudio(),
    video: new H264Video()
});

var Format22 = new Class({ Extends: Format,
    id: 22,

    width: new Width(1280),
    container: new Mp4Container(),
    audio: new AacAudio(),
    video: new H264Video(),

    help: function () {
        return "720p high-definition (HD) format";
    }
});

var Format37 = new Class({ Extends: Format,
    id: 37,

    width: new Width(1920),
    container: new Mp4Container(),
    audio: new AacAudio(),
    video: new H264Video(),

    help: function () {
        return "1080p high-definition (HD) format";
    }
});

var FormatGroup = new Class({ Extends: Array,
    formats: [],

    initialize: function (fmt_map, uris) {
        this.parsed = this.parse(fmt_map);
        this.uris = uris;

        this.push.apply(this, this.available());
    },

    all: function () {
        return this.formats.map(function (format) {
            return new format(this, this.uris);
        }.bind(this));
    },

    available: function () {
        return this.all().filter(function (format) {
            return this.parsed.contains(format.id) || format.always_show;
        }.bind(this));
    },

    parse: function (fmt_map) {
        return unescape(fmt_map).split(",").map(function (raw) {
            return Number(raw.split("/")[0]);
        });
    },

    position_of: function (format) {
        return this.find(function (instance, position) {
            if (instance.id == format.id) {
                return position;
            }
        });
    }
});

var StandardDefGroup = new Class({ Extends: FormatGroup,
    formats: [Format35, Format34, Format18, Format5]
});

var HighDefGroup = new Class({ Extends: FormatGroup,
    formats: [Format37, Format22]
});

var Formats = new Class({ Extends: Array,
    groups: [HighDefGroup, StandardDefGroup],

    initialize: function (fmt_map, uris) {
        this.fmt_map = fmt_map;
        this.uris = uris;

        this.push.apply(this, this.instances().flatten());
    },

    instances: function () {
        return this.groups.map(function (group) {
            return new group(this.fmt_map, this.uris);
        }.bind(this));
    },

    full: function () {
        return this.map(function (format) {
            return format.full();
        });
    }
});

var VideoUris = new Class({
    initialize: function (id, hash) {
        this.id = unescape(id);
        this.hash = unescape(hash);
    },

    for_format: function (format) {
        return new Uri({video_id: this.id,
                        t: this.hash,
                        fmt: format.id}, "/get_video");
    }
});

var FormatsTab = new Class({ Extends: YouTubeTab,
    label: "Formats",
    tip: "Show the formats available for this video",

    initialize: function (params) {
        this.uris = new VideoUris(params.video_id, params.t);
        this.formats = new Formats(params.fmt_map, this.uris);

        this.parent();
    },

    full: function () {
        return new Element("ul", {"class": "formats"}).adopt(
            this.formats.full());
    },

    contents: function () {
        return [this.full(), this.clear()];
    }
});

window.addEvent("load", function () {
    var style = new CssStyle({
        "#watch-tab-formats-body li": {"float": "left",
                                       "margin": "5px 20px 10px 0"},

        "#watch-tab-formats-body .formats h3": {"margin": "0"},

        "#watch-tab-formats-body a:hover": {"border-bottom": "1px solid #03C",
                                            "text-decoration": "none"},

        "#watch-tab-formats-body dt": {"float": "left",
                                       "padding": "5px 0 0 0"},

        "#watch-tab-formats-body dd": {"padding": "5px 0 0 65px"}});

    var tab = new FormatsTab(this.yt.getConfig("SWF_ARGS"));

    style.add();
    tab.add();
}.bind(this.unsafeWindow || this));
