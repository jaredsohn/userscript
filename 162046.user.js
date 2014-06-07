    // ==UserScript==
    // @name            youkuantiads.uc.js
    // @namespace       YoukuAntiADs@harv.c
    // @description     视频网站去黑屏，支持优酷，ku6
    // @include         chrome://browser/content/browser.xul
    // @author          harv.c
    // @homepage        http://haoutil.tk
    // @version         1.3.4.8
    // @updateURL     https://j.mozest.com/ucscript/script/92.meta.js
    // ==/UserScript==
    (function() {
        // YoukuAntiADs, request observer
        // 脚本地址：https://j.mozest.com/zh-CN/ucscript/script/92/  播放器swf更新地址：https://code.google.com/p/haoutil/source/browse/#svn%2Ftrunk%2Fplayer
        function YoukuAntiADs() {};
        var refD = 'file:///' + Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).path + '/chrome/swf/';
        YoukuAntiADs.prototype = {
            SITES: {
                'youku': {
                    'player':refD + 'youku.swf',
                    're': /http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/(loader|player.*)\.swf/
                },
                'ku6': {
                    'player': refD + 'ku6.swf',
                    're': /http:\/\/player\.ku6cdn\.com\/default\/common\/player\/\d+\/player\.swf/
                },
                'iqiyi': {
                    'player': refD + 'iqiyi.swf',
                    're': /http:\/\/www\.iqiyi\.com\/player\/20(13((03(0[8-9]|[1-3][0-9]))|(0[4-9]|1[0-2]))|(1[4-9]|[2-9]))\d+\/Player\.swf/
                }
            },
            os: Cc['@mozilla.org/observer-service;1']
                    .getService(Ci.nsIObserverService),
            // getPlayer, get modified player
            getPlayer: function(site, callback) {
                NetUtil.asyncFetch(site['player'], function(inputStream, status) {
                    var binaryOutputStream = Cc['@mozilla.org/binaryoutputstream;1']
                                                .createInstance(Ci['nsIBinaryOutputStream']);
                    var storageStream = Cc['@mozilla.org/storagestream;1']
                                            .createInstance(Ci['nsIStorageStream']);
                    var count = inputStream.available();
                    var data = NetUtil.readInputStreamToString(inputStream, count);

                    storageStream.init(512, count, null);
                    binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
                    binaryOutputStream.writeBytes(data, count);

                    site['storageStream'] = storageStream;
                    site['count'] = count;

                    if(typeof callback == 'function') {
                        callback();
                    }
                });
            },
            observe: function(aSubject, aTopic, aData) {
                if(aTopic != 'http-on-examine-response') return;

                var http = aSubject.QueryInterface(Ci.nsIHttpChannel);
                for(var i in this.SITES) {
                    var site = this.SITES[i];
                    if(site['re'].test(http.URI.spec)) {
                        if(!site['storageStream'] || !site['count']) {
                            http.suspend();
                            this.getPlayer(site, function() {
                                http.resume();
                            });
                        }

                        var newListener = new TrackingListener();
                        aSubject.QueryInterface(Ci.nsITraceableChannel);
                        newListener.originalListener = aSubject.setNewListener(newListener);
                        newListener.site = site;

                        break;
                    }
                }
            },
            register: function() {
                this.os.addObserver(this, 'http-on-examine-response', false);
            },
            unregister: function() {
                this.os.removeObserver(this, 'http-on-examine-response', false);
            }
        };

        // TrackingListener, redirect youku player to modified player
        function TrackingListener() {
            this.originalListener = null;
            this.site = null;
        }
        TrackingListener.prototype = {
            onStartRequest: function(request, context) {
                this.originalListener.onStartRequest(request, context);
            },
            onStopRequest: function(request, context) {
                this.originalListener.onStopRequest(request, context, Cr.NS_OK);
            },
            onDataAvailable: function(request, context) {
                this.originalListener.onDataAvailable(request, context, this.site['storageStream'].newInputStream(0), 0, this.site['count']);
            }
        };

        // register observer
        var y = new YoukuAntiADs();
        var isLoaded = false;
        if(location == 'chrome://browser/content/browser.xul') {
            isLoaded = true;
            y.register();
        }

        // unregister observer
        window.addEventListener('unload', function() {
            if(location == 'chrome://browser/content/browser.xul' && isLoaded) {
                y.unregister();
            }
        });
    })();