// ==UserScript==
// @name       Dropbox music player
// @namespace  http://robaldred.co.uk
// @version    0.2
// @description  Adds simple buttons allowing you to play shuffled audio files from the dropbox folder your browser is open on
// @match      https://www.dropbox.com/home/*
// @copyright  2013, Rob Aldred
// ==/UserScript==

var DropboxAudioPlayer;
DropboxAudioPlayer = (function() {
    function DropboxAudioPlayer() {
        this.audio_files = []
        this.loaded = false
        this.playing = false
        this._elementCheck()
        return this
    }

    DropboxAudioPlayer.prototype = {
        _elementCheck: function() {
            var _this = this
            this.check = setInterval(function() {
                if(document.getElementById('global-actions')) {
                    _this._addSkipButton.call(_this)
                    _this._addPlayButton.call(_this)
                    clearInterval(_this.check);
                }
            }, 500);
        },
        _addSkipButton: function() {
            this.skip_button = document.createElement('a')
            this.skip_button.className = "title_bubble"
            this.skip_button.setAttribute('data-title','Skip Track')
            img = document.createElement('img')
            img.src = '/static/images/icons/icon_spacer.gif'
            img.className = "sprite sprite_web"
            img.style.margin = '2px 0px 0px 0px'
            img.style.width = '14px'
            img.style.height = '13px'
            img.style.backgroundImage = 'url(http://robaldred.co.uk/dropbox-audio-player/control-skip.png)'
            this.skip_button.appendChild(img)

            this.action_bar = document.getElementById('global-actions').lastChild
            this.action_bar.style.position = "relative"
            var first = this.action_bar.firstChild
            var li = document.createElement('li')
            li.style.position = "absolute"
            li.style.left = "-60px"
            li.className = "action"
            li.appendChild(this.skip_button)

            this.action_bar.insertBefore(li,first)

            this._bindSkipButton()
        },
        _bindSkipButton: function() {
            var _this = this
            this.skip_button.addEventListener('click',function(e) {
                _this._playNext.call(_this)
                return false
            });
        },
        _addPlayButton: function() {
            this.play_button = document.createElement('a')
            this.play_button.className = "title_bubble"
            this.play_button.setAttribute('data-title','Play Audio')
            this.play_img = document.createElement('img')
            this.play_img.src = '/static/images/icons/icon_spacer.gif'
            this.play_img.className = "sprite sprite_web"
            this.play_img.style.margin = '2px 0px 0px 0px'
            this.play_img.style.height = '14px'
            this.play_img.style.backgroundImage = 'url(http://robaldred.co.uk/dropbox-audio-player/control.png)'
            this.play_button.appendChild(this.play_img)

            this.action_bar = document.getElementById('global-actions').lastChild
            this.action_bar.style.position = "relative"
            var first = this.action_bar.firstChild
            var li = document.createElement('li')
            li.style.position = "absolute"
            li.style.left = "-30px"
            li.className = "action"
            li.appendChild(this.play_button)

            this.action_bar.insertBefore(li,first)

            this._bindPlayButton()
        },
        _bindPlayButton: function() {
            var _this = this
            this.play_button.addEventListener('click',function() {
                _this._onPlayPause.call(_this)
                return false
            });
        },
        _onPlayPause: function() {
            if(this.playing) {
                this._pause()
            } else {
                if(this.loaded) {
                    this._play()
                } else {
                    this._loadAndPlay()
                }
            }
        },
        _loadAndPlay: function() {
            this._findAudio()
            this._shuffleAudio()
            if(this.audio_files.length > 0) {
                this.loaded = true
                this._createAudioElement()
                this._playNext()
            }
        },
        _findAudio: function() {
            var elems = document.getElementsByTagName('a'),
                i
            for (i=0;i<elems.length;i++) {
                var file = elems[i]
                if((' ' + file.className + ' ').indexOf(' filename-link ') > -1) {
                    if(file.href.indexOf('.mp3') > -1) {
                        this.audio_files.push(file.href)
                    }
                }
            }
        },
        _shuffleAudio: function() {
            for(var j, x, i = this.audio_files.length; i; j = parseInt(Math.random() * i), x = this.audio_files[--i], this.audio_files[i] = this.audio_files[j], this.audio_files[j] = x);
        },
        _createAudioElement: function() {
            if(!this.audio_element) {
                this.audio_element = new Audio()
                var _this = this
                this.audio_element.addEventListener('ended', function() {
                    _this._playNext.call(_this)
                });   
            }
        },
        _play: function() {
            this.audio_element.play()
            this.playing = true
            this.play_button.setAttribute('data-title','Pause Audio')
            this.play_img.style.backgroundImage = 'url(http://robaldred.co.uk/dropbox-audio-player/control-pause.png)'
        },
        _pause: function() {
            this.audio_element.pause()
            this.playing = false
            this.play_button.setAttribute('data-title','Play Audio')
            this.play_img.style.backgroundImage = 'url(http://robaldred.co.uk/dropbox-audio-player/control.png)'
        },
        _playNext: function() {
            if(this.audio_files.length > 0) {
                this.audio_element.src = this.audio_files.shift()
                this._play()
            } else {
                alert('[DropboxAudioPlayer] No more files')
            }
        }

    }

    DropboxAudioPlayer
    return DropboxAudioPlayer
})()
document.dropbox_audio_player = new DropboxAudioPlayer();
