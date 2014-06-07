// ==UserScript==
// @name           Hypem Playlist
// @namespace      http://userscripts.org/users/useridnumber
// @include        http://hypem.com/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// @require        http://code.jquery.com/ui/1.7.3/jquery-ui.min.js
// @require        http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js
// @require        http://audioquarium.com/media/jquery.tinyscrollbar.js
// @grant          GM_addStyle
// ==/UserScript==

/* Shimmy shimmy yaaaa */
// object.watch
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			}
			;

			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}

// object.unwatch
if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}


/* SCRIPT START */
var FADE_TIME = 150;
var PLAYLIST_COLLAPSE_DUR = 100;

$(document).ready(function() {
    
    $('#player-controls').after("<div>"
        + "<div id='scroll_box'>"
        + "<div class='viewport'>"
        + "<ol class='overview' id='playlist_container'></ol>"
        + "</div><div class='scrollbar'>"
        + "<div class='track'><div class='thumb'><div class='end'></div></div></div></div>"
        + "</div>");
    $('#player-inner').after("<div class='bottom-bar'>"
        + "<div class='close-btn'></div></div>");

    $('#scroll_box').tinyscrollbar({ axis: 'x' });
    $('#player-container').mouseenter(function() {
        $('#scroll_box .scrollbar .track .thumb').fadeIn();
    });
    $('#player-container').mouseleave(function() {
        $('#scroll_box .scrollbar .track .thumb').fadeOut();
    });

    var playlistBar = (function() { return {
        isOpen: false,
        openHeight: 112,
        closeHeight: 32,
        container: $('#player-container'),
        playlist: $('#scroll_box'),

        toggleBar: function() {
            this.isOpen ? this.close() : this.open();
        },

        open: function() {
            var that = this;
            this.isOpen = true;
            this.container.animate(
                { 
                    "height": this.openHeight
                },
                {
                    duration: PLAYLIST_COLLAPSE_DUR,
                    complete: function() {
                        that.playlist.css('display', 'block');
                        $('#player-page').css('top', that.openHeight);
                    }
                });
        },

        close: function() {
            var that = this;
            this.isOpen = false;
            this.container.animate(
                { 
                    "height": this.closeHeight
                },
                {
                    duration: PLAYLIST_COLLAPSE_DUR,
                    complete: function() {
                        that.playlist.css('display', 'none');
                        $('#player-page').css('top', that.closeHeight);
                    }
                });
        }
        };
    })();

    $('.bottom-bar .close-btn').click(function() {
        playlistBar.toggleBar.call(playlistBar, null);
    });

    var playlist = {
        size: 0,
        playlistContainer: $('#playlist_container'),
        _tracks: [],
        _trackIndex: null,

        // pos [Number]: 
        //  The position in the playlist, 0 being first
        addSong: function(song_info, pos) { 
            var that = this;

            if (!playlistBar.isOpen) {
                playlistBar.open();
            }

            if (typeof pos === 'undefined') {
                pos = this.size + 1;
            }

            var track = _.find(unsafeWindow.displayList.tracks, function(track) {
                return track.id === song_info.song_id;
            });

            this._tracks.push(track);

            unsafeWindow.playList = $.extend(true, {}, unsafeWindow.displayList);
            unsafeWindow.playList.tracks = this._tracks;

            this.size++;

            // is this song fave'd?
            var isFaved = $('.fav_item_' + song_info.song_id).hasClass('fav-on');

            if (track.song == '') {
                track.song = 'Unknown Track';
            }

            var ele = $("<li title='" + track.song + '-' + track.artist + "' song_id='" + song_info.song_id + "' class='playlist-item'>"
                + "<div>"
                + "<span class='delete-btn hover-btn'></span>"
                + "<span style='background: url(&quot;" + song_info.thumb_pic_loc.trim() + "&quot;) repeat scroll 0% 0% transparent; display: block; height: 50px; width: 50px;'></span>"
                + "<a onclick='toggle_favorite(\"item\",\"" + song_info.song_id
                + "\");return false;' class='fave hover-btn fav_item_" + song_info.song_id
                + (isFaved ? ' fav-on' : ' fav-off')
                + "'>Favorite<span class='dont-play-btn'></span>"
                + "</a>"
                + "<span class='title'>" + track.song + "</span>"
                + "<span class='artist'>" + track.artist + "</span>"
                + "</div>"
                + "</li>;");

            // Play the song when the user clicks it
            ele.dblclick(function(eve) {
                if ($(eve.target).hasClass('dont-play-btn')) {
                    return false;
                } else {
                    var index = $(this).index();
                    that.playSong(index);
                    unsafeWindow.togglePlay(index);
                }
            });

            $('.delete-btn', ele).click(function(eve) {
                that.removeSong(ele);
            });

            ele.hover(function(eve) {
                $('.hover-btn', ele).fadeIn(FADE_TIME);
            }, function(eve) {
                $('.hover-btn', ele).fadeOut(FADE_TIME);
            });

            if (this.size == 1) {
                // adding the first song
                this.playlistContainer.append(ele);

                // play this song right away if something is not already playing
                if (unsafeWindow.playerStatus !== 'PLAYING') {
                    this.playSong(0);
                    unsafeWindow.togglePlay();
                }
            } else {
                this.playlistContainer.children().eq(pos-2).after(ele);
            }

            $('#scroll_box').tinyscrollbar_update();
        },

        /*
         * Call this when the order is changed to update the actual internal
         * playlist object so it reflects the new order.
         */
        changeOrder: function() {
            // does 'each' guarantee dom order? hopefully
            var orderedPlaylist = [];
            var that = this;

            $('#playlist_container li').each(function() {
                var songId = $(this).attr('song_id');
                var trackObj = _.find(that._tracks, function(track) {
                    return (track.id === songId);
                });

                orderedPlaylist.push(trackObj);
            });

            this._tracks = orderedPlaylist;
            unsafeWindow.playList = $.extend(true, {}, unsafeWindow.displayList);
            unsafeWindow.playList.tracks = this._tracks;
        },

        getNextTrack: function() {
            // var curIndex = $('#playlist_container li.playing').index();
            // return curIndex < (this.size - 1) ? curIndex + 1 : null;
            return this._trackIndex + 1 > this.size ? null : this._trackIndex + 1;
        },

        getPrevTrack: function() {
            // var curIndex = $('#playlist_container li.playing').index();
            // return curIndex > 0 ? curIndex - 1 : null;
            return this._trackIndex - 1 < 0 ? null : this._trackIndex - 1;
        },

        // Clear the active song that shows as playing
        clearActive: function() {
            $('#playlist_container li').removeClass('playing');
        },

        removeSong: function(ele) {
            var pos = ele.index();
            this._tracks.splice(pos, 1);
            unsafeWindow.playList.tracks = this._tracks;

            if (ele.hasClass('playing')) {
                unsafeWindow.stopTrack();
                this._trackIndex = 0;
            }

            ele.remove();
            
            this.size -= 1;

            // cloes the playlist if it's the last item
            if (this.size === 0)
            {
                playlistBar.close.call(playlistBar, null);
            }
        },

        playSong: function(index) {
            if (index == null) {
                this.clearActive();
                return;
            }

            var entryLi = $("#playlist_container li[song_id]").eq(index);

            this._trackIndex = index;

            this.clearActive();
            entryLi.addClass('playing');
        }
    };

    $('#playlist_container').sortable({
        revert: true,
        stop: function(evt, ui) {
            playlist.changeOrder();
        }
    });

    // HYPEM Function Overrides
    var orig_show_push_message = unsafeWindow.show_push_message;
    var orig_next_track = unsafeWindow.nextTrack;
    var orig_prev_track = unsafeWindow.prevTrack;

    unsafeWindow.watch('displayList', function(id, oldDisplayList, newDisplayList) {
        if (oldDisplayList && oldDisplayList.page_num) {
            if (oldDisplayList.page_num != newDisplayList.page_num) {
                update();
            }
        } else if (newDisplayList && newDisplayList.page_num) {
            update();
        }

        function update() {
            placeAddButtons();
            if (unsafeWindow.playList) {
                unsafeWindow.playList.tracks = playlist._tracks;
            }
        }

        return newDisplayList;
    });

    var clicksFixed = false;
    // var orig_load_track = unsafeWindow.loadTrack;
    unsafeWindow.show_push_message = function() {
        orig_show_push_message();
        placeAddButtons();
        unsafeWindow.playList.tracks = playlist._tracks;

        // only do this once
        if (!clicksFixed) {
            fixClicks();
            clicksFixed = true;
        }
    };

    // unsafeWindow.loadTrack = function() {
    //     unsafeWindow.console.log('load track ' + arguments);
    //     orig_load_track(arguments);
    // };

    unsafeWindow.nextTrack = function(evt) {
        if (evt) {
            evt.stopPropagation();
        }
        var nextTrack = playlist.getNextTrack();
        
        playlist.playSong(nextTrack);
        orig_next_track(arguments);
        return false;
    };

    unsafeWindow.prevTrack = function(evt) {
        if (evt) {
            evt.stopPropagation();
        }
        var prevTrack = playlist.getPrevTrack();

        playlist.playSong(prevTrack);
        orig_prev_track(arguments);
        return false;
    };

    function fixClicks() {
        unsafeWindow.jQuery('#playerNext').off('click');
        unsafeWindow.jQuery('#playerPrev').off('click');
        $('#playerNext').on('click', unsafeWindow.nextTrack);
        $('#playerPrev').on('click', unsafeWindow.prevTrack);
    }

    fixClicks();

    // unsafeWindow.attach_clicks();

    // Put the add button on every song
    function placeAddButtons() {
        $('.section-player .tools .favdiv').after(function(index, ele) {
            try 
            {
                var href_song = $('.track_name a.track', $(this).parent().parent())[0].href;
                var song_id = href_song.split('/track/')[1].split('/')[0];

                var addToPlaylistBtn = "<li class='adddiv'><a title='Add to playlist' href=''><span song_id='" + song_id + "' class='add-to-playlist-btn' ></span></a></li>";
            }
            catch (err)
            {
                alert (err);
                return;
            }
            return addToPlaylistBtn;
        });

        // remove all the previous click events
        $('a span.add-to-playlist-btn[song_id]').unbind('click');

        $('a span.add-to-playlist-btn[song_id]').click(function(e) {
            e.preventDefault();
            var song_id = $(e.target).attr('song_id');
            var thumb_pic_loc = '';

            try {
                var player = $(e.target).closest('.section-player');
                var thumbStyle = $('a.thumb', player).attr('style');
                thumb_pic_loc = thumbStyle.split('background:url(')[1].split(');')[0];
            } catch(e) {

            }

            var song_info = {
                song_id: song_id,
                thumb_pic_loc: thumb_pic_loc
            };
            playlist.addSong(song_info);
        });
    }
});

GM_addStyle("\
   li.playlist-item { \
        background-color: #444; \
        white-space: nowrap; \
        max-width:150px; \
        display: inline-block; \
        margin-left: 5px; \
        margin-right: 5px; \
        width: 150px; \
        height: 60px; \
        border-radius: 0 3px 0 3px; \
        position: relative; \
   } \
   li.playlist-item a.fave { \
       position: absolute; \
       left: 50px; \
       top: 1px; \
   } \
   li.playlist-item a.fave span { \
        height: 11px; \
        width: 15px; \
   } \
   li.playlist-item a.fave.fav-on span { \
       background: url('http://audioquarium.com/media/images/FaveBtn.png') no-repeat scroll 0 -22px transparent; \
   } \
   li.playlist-item a.fave.fav-off span { \
       background: url('http://audioquarium.com/media/images/FaveBtn.png') no-repeat scroll 0 0px transparent; \
   } \
   li.playlist-item a.fave.fav-off span:hover { \
       background: url('http://audioquarium.com/media/images/FaveBtn.png') no-repeat scroll 0 -11px transparent; \
   } \
   li.playlist-item .hover-btn { \
       display: none; \
   } \
   li.playlist-item .delete-btn { \
       position: absolute; \
       background: url('http://audioquarium.com/media/images/DeleteBtn.png') no-repeat scroll 0 0px transparent; \
       width: 15px; \
       height: 15px; \
       top: 1px; \
       right: 2px; \
       z-index: 400; \
   } \
   li.playlist-item .delete-btn:hover { \
       background: url('http://audioquarium.com/media/images/DeleteBtn.png') no-repeat scroll 0 -15px transparent; \
   } \
   li.playlist-item span.title { \
       position: absolute; \
       left: 60px; \
       top: 10px; \
       width: 90px; \
       font-weight: bold; \
       overflow-x:hidden; \
   } \
   li.playlist-item span.artist { \
       position: absolute; \
       left: 60px; \
       width: 90px; \
       top: 25px; \
       overflow-x:hidden; \
   } \
   .playlist-item.playing { \
        background-color: #999; \
    } \
   li.adddiv { \
        position: absolute; \
        right: 1px; \
    } \
   .add-to-playlist-btn { \
        background: url('http://audioquarium.com/media/images/AddToPlaylist.png') no-repeat scroll 0 0px transparent; \
        width: 23px; \
        left: 0; \
        height: 23px; \
        display: block; \
    } \
    .section.same .tools { \
        right: 30px; \
    } \
    .section .tools { \
        right: 30px; \
    } \
    .section .tools .playdiv { \
        position: relative; \
        left: 20px; \
    } \
   .add-to-playlist-btn:hover { \
        background: url('http://audioquarium.com/media/images/AddToPlaylist.png') no-repeat scroll 0 -24px transparent; \
    } \
    #player-timebar { \
        z-index: 100; \
    } \
   ol#playlist_container { \
       white-space: nowrap; \
       max-height: 70px; \
       position: relative; \
       display: block; \
   } \
    #scroll_box{ \
        margin: 5px; \
        clear: both; \
        position: relative; \
        float: left; \
        display: block; \
        width: 800px; \
        height: 70px; \
        padding: 0 10px; \
    } \
    #scroll_box .viewport{ \
        clear: both; \
    } \
    .scrollbar{ \
        position: relative; \
        height: 0px; \
        width: 790px; \
        margin: 5px; \
    } \
    #scroll_box { width: 800px; clear: both; } \
    #scroll_box .viewport { width: 800px; height: 63px; overflow: hidden; position: relative; } \
    #scroll_box .overview { list-style: none; position: absolute; left: 0; top: 0; } \
    #scroll_box .thumb .end, \
    #scroll_box .thumb { display: none; background-color: #666; } \
    #scroll_box .thumb:hover { background-color: #777; } \
    #scroll_box .scrollbar { margin: 0; position: relative; float: right; width: 15px; } \
    #scroll_box .track { background-color: #D8EEFD; height: 100%; width:13px; position: relative; padding: 0 1px; } \
    #scroll_box .thumb { border-radius: 5px; height: 5px; width: 13px; cursor: pointer; overflow: hidden; position: absolute; top: 0; } \
    #scroll_box .thumb .end { overflow: hidden; height: 5px; width: 13px; } \
    #scroll_box .disable{ display: none; } \
    .bottom-bar { \
        width: 100%; \
        position: absolute; \
        bottom: -6px; \
        display: block; \
        visibility: visible; \
    } \
    .bottom-bar .close-btn { \
        width: 57px; \
        background: url('http://audioquarium.com/media/images/PaneBtn.png') no-repeat scroll 0 0; \
        height: 7px; \
        cursor: pointer; \
        text-align: center; \
        margin: 0 auto; \
        display: block; \
    } \
    .bottom-bar .close-btn:hover { \
    }\
");



 
