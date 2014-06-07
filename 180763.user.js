// ==UserScript==
// @name     Remove related youtubes prototype 002
// @include  http://*.youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function source(src) {
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}

function append(code) {
      document.body.appendChild(document.createElement('script')).innerHTML = code.toString().replace(/^function.*{|}$/g, '');
}

function action() {
        var ytplayer = ytplayer || {};
        ytplayer.config = {
            "attrs": {
                "id": "movie_player"
            },
            "html5": false,
            "url": "https:\/\/s.ytimg.com\/yts\/swfbin\/watch_as3-vfllSKff3.swf",
            "min_version": "8.0.0",
            "args": {
                "feature": "episodic",
                "iv3_module": "https:\/\/s.ytimg.com\/yts\/swfbin\/iv3_module-vflWkqhpd.swf",
                "loeid": "924603,916625,930901",
                "ad_channel_code_instream": "afv_instream,Vertical_36,Vertical_41,Vertical_211,Vertical_592,Vertical_613,Vertical_930,Vertical_1030,afv_instream_fr,afv_user_edubhiphop,afv_user_id_ngEEdg13BzDNkggZQudXVw,yt_mpvid_AATYavVyvr3GwBVy,yt_cid_836759,ytdevice_1,ytps_default,ytel_detailpage",
                "ssl": 1,
                "cosver": "6.1",
                "ad_tag": "https:\/\/ad-emea.doubleclick.net\/N4061\/pfadx\/com.ytpwatch.music\/main_836759;sz=WIDTHxHEIGHT;kvid=g4lECkjFV8g;kpu=EdubHipHop;kpid=836759;u=g4lECkjFV8g|836759;mpvid=AATYavVyvr3GwBVy;ssl=1;plat=pc;kpeid=ngEEdg13BzDNkggZQudXVw;afct=site_content;afv=1;dc_dedup=1;k21=1;k5=3_8_35_36_41_211_592_613_930_1030;kage=24;kar=3;kauth=1;kclt=1;kcr=fr;kga=1001;kgender=m;kgg=1;klg=en-gb;ko=p;kr=F;kvz=205;nlfb=1;shortform=1;tves=1;yt_vrallowed=1;ytcat=10;ytdevice=1;ytexp=924603,916625,930901;ytps=default;ytvt=w;!c=836759;k2=3;k2=8;k2=35;k2=36;k2=41;k2=211;k2=592;k2=613;k2=930;k2=1030;kvlg=en;",
                "csi_page_type": "watch7ad",
                "oid": "krCThOPEJqqsS2LErhc1JQ",
                "host_language": "en",
                "ad_logging_flag": 1,
                "video_wall": 1,
                "no_get_video_log": "1",
                "ad_video_pub_id": "ca-pub-6219811747049371",
                "sourceid": "yw",
                "trueview": true,
                "keywords": "e-dubble,In The Bag,hip hop is good",
                "sffb": true,
                "sk": "9TSmJL0QKHCYl1jjSQhxnxihbtiX5kJLR",
                "hl": "en_GB",
                "adsense_video_doc_id": "yt_g4lECkjFV8g",
                "iv_load_policy": 1,
                "iv_invideo_url": "https:\/\/www.youtube.com\/annotations_invideo\/read2?features=1\u0026mfu=0\u0026pfc=0\u0026video_id=g4lECkjFV8g",
                "cbrver": "19.0,gzip(gfe",
                "share_icons": "https:\/\/s.ytimg.com\/yts\/swfbin\/sharing-vflL1Rgon.swf",
                "allow_embed": 1,
                "title": "e-dubble - In The Bag",
                "cbr": "Firefox",
                "cafe_experiment_id": "",
                "timestamp": 1363853803,
                "as_launched_in_country": "1",
                "rvs": "video_id=QuO0AuJ2eJQ\u0026thumbnail_ids=QuO0AuJ2eJQ\u0026playlist_length=23\u0026playlist_title=Top+Tracks+for+E-Dubble\u0026list=AL94UKMTqg-9D6yFkUGj33un2EVCPYzDx8,author=EdubHipHop\u0026id=ccaXufStWIs\u0026view_count=119%2C027\u0026title=e-dubble+-+Hip+Hop+is+Good\u0026length_seconds=218,author=EdubHipHop\u0026id=AYKYvVkhIYo\u0026view_count=2%2C842%2C976\u0026title=e-dubble+-+Be+A+King\u0026length_seconds=302,author=EdubHipHop\u0026id=lYBlea2_SJg\u0026view_count=90%2C273\u0026title=e-dubble+-+Rebuild\u0026length_seconds=228,author=EdubHipHop\u0026id=u5eEGvGh2F4\u0026view_count=67%2C505\u0026title=e-dubble+-+Plot+Twist\u0026length_seconds=219,author=heliocentric00\u0026id=hjWAo9Ye9vk\u0026view_count=169%2C037\u0026title=E-Dubble+-+Be+A+King\u0026length_seconds=304,playlist_length=13\u0026playlist_author=EdubHipHop\u0026video_id=C36T99w00Qo\u0026thumbnail_ids=C36T99w00Qo\u0026playlist_title=e-dubble+-+Hip+Hop+is+Good\u0026list=PL5FB37C5B95DD0FFD,author=MrHecticGamer\u0026id=JnI0k-zsPX8\u0026view_count=74%2C574\u0026title=E-Dubble%2C+All+Freestyle+Fridays+%28%231+-+%2354%29\u0026length_seconds=11169,author=heliocentric00\u0026id=-E-r-3tr6K4\u0026view_count=435%2C499\u0026title=E-Dubble+-+Class+Clown\u0026length_seconds=213,author=LabMuslc\u0026id=tWvywB-kTqI\u0026view_count=272%2C716\u0026title=E-Dubble+-+Miracle\u0026length_seconds=233,author=JukeBoxForMe\u0026id=XfHh8JSTAzc\u0026view_count=188%2C853\u0026title=E-dubble+-+Automatic\u0026length_seconds=197,author=LabMuslc\u0026id=c-jNoaUsCXM\u0026view_count=79%2C090\u0026title=E-Dubble+-+Grown%27+for+a+Minute\u0026length_seconds=228",
                "user_gender": "m",
                "loudness": -18.4899997711,
                "cid": 836759,
                "tk": "1",
                "sendtmp": "1",
                "plid": "AATYavVxcBWMDuQw",
                "afv_ad_tag_restricted_to_instream": "http:\/\/googleads.g.doubleclick.net\/pagead\/ads?client=ca-pub-6219811747049371\u0026loeid=924603%2C916625%2C930901\u0026video_cpm=6000000\u0026host=ca-host-pub-4055553365162709\u0026ad_type=video\u0026max_ad_duration=20000\u0026ytdevice=1\u0026hl=en\u0026description_url=http%3A%2F%2Fwww.youtube.com%2Fvideo%2Fg4lECkjFV8g\u0026channel=afv_instream%2BVertical_36%2BVertical_41%2BVertical_211%2BVertical_592%2BVertical_613%2BVertical_930%2BVertical_1030%2Bafv_instream_fr%2Bafv_user_edubhiphop%2Bafv_user_id_ngEEdg13BzDNkggZQudXVw%2Byt_mpvid_AATYavVyvr3GwBVy%2Byt_cid_836759%2Bytdevice_1%2Bytps_default%2Bytel_detailpage\u0026cust_age=1001\u0026cust_gender=1\u0026ht_id=695424",
                "ad_host_tier": "695424",
                "sdetail": "rv:QuO0AuJ2eJQ",
                "ad3_module": "https:\/\/s.ytimg.com\/yts\/swfbin\/ad3-vfl_h3G_h.swf",
                "endscreen_module": "https:\/\/s.ytimg.com\/yts\/swfbin\/endscreen-vflXfycQA.swf",
                "account_playback_token": "77mK1zcX1y3UYv11IqEAUNGleDV8MTM2Mzk0MDIwMkAxMzYzODUzODAy",
                "ad_channel_code_overlay": "invideo_overlay_480x70_cat10,afv_overlay,Vertical_36,Vertical_41,Vertical_211,Vertical_592,Vertical_613,Vertical_930,Vertical_1030,afv_user_edubhiphop,afv_user_id_ngEEdg13BzDNkggZQudXVw,yt_mpvid_AATYavVyvr3GwBVy,yt_cid_836759,ytdevice_1,ytps_default,ytel_detailpage",
                "afv_inslate_ad_tag": "http:\/\/googleads.g.doubleclick.net\/pagead\/ads?client=ca-pub-6219811747049371\u0026loeid=924603%2C916625%2C930901\u0026description_url=http%3A%2F%2Fwww.youtube.com%2Fvideo%2Fg4lECkjFV8g\u0026host=ca-host-pub-4055553365162709\u0026ad_type=userchoice\u0026max_ad_duration=20000\u0026ytdevice=1\u0026hl=en\u0026cust_age=1001\u0026cust_gender=1\u0026ht_id=695424",
                "abd": "1",
                "watermark": ",https:\/\/s.ytimg.com\/yts\/img\/watermark\/youtube_watermark-vflHX6b6E.png,https:\/\/s.ytimg.com\/yts\/img\/watermark\/youtube_hd_watermark-vflAzLcD6.png",
                "t": "vjVQa1PpcFMdEUkSXHhw1qjJCuvNsxBPx6hYxjk7W_k=",
                "instream": true,
                "afv": true,
                "pltype": "content",
                "iv_read_url": "https:\/\/www.youtube.com\/annotations_iv\/read2?expire=1363897500\u0026feat=C\u0026hl=en-GB\u0026key=a1\u0026signature=119EA0D9989A990BE2DA29178811B0E362F1E4D7.B40A9863EDC9F021116CB2C6828BFBA871FE25B4\u0026sparams=expire%2Cvideo_id\u0026video_id=g4lECkjFV8g",
                "ptk": "Indmusic",
                "referrer": "https:\/\/www.youtube.com\/watch?v=QuO0AuJ2eJQ\u0026list=AL94UKMTqg-9D6yFkUGj33un2EVCPYzDx8",
                "fexp": "924603,916625,930901,902000,919512,913605,906938,931202,900821,900823,931203,931401,908529,930803,920201,929602,930101,930603,926403,900824",
                "enablecsi": "1",
                "c": "WEB",
                "url_encoded_fmt_stream_map": "fallback_host=tc.v1.cache5.c.youtube.com\u0026quality=medium\u0026type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22\u0026itag=43\u0026sig=B3FC5372F52FE48FD4DC27CC1257C98A11620A62.A7E6CF75B2F5A709E0A8D8608DAD36D2F16076CF\u0026url=http%3A%2F%2Fr9---sn-p5q7ynee.c.youtube.com%2Fvideoplayback%3Fupn%3DRGa1R-DpprE%26mt%3D1363853772%26ip%3D82.67.42.97%26key%3Dyt1%26ipbits%3D8%26ratebypass%3Dyes%26source%3Dyoutube%26sparams%3Dcp%252Cgcr%252Cid%252Cip%252Cipbits%252Citag%252Cratebypass%252Csource%252Cupn%252Cexpire%26expire%3D1363876956%26id%3D8389440a48c557c8%26itag%3D43%26gcr%3Dfr%26cp%3DU0hVSFhSVF9KUENONV9QTFhKOmJkUFFzV3BuU1ll%26sver%3D3%26fexp%3D924603%252C916625%252C930901%252C902000%252C919512%252C913605%252C906938%252C931202%252C900821%252C900823%252C931203%252C931401%252C908529%252C930803%252C920201%252C929602%252C930101%252C930603%252C926403%252C900824%26newshard%3Dyes%26mv%3Dm%26ms%3Dau,fallback_host=tc.v10.cache3.c.youtube.com\u0026quality=medium\u0026type=video%2Fx-flv\u0026itag=34\u0026sig=0458BBFDB5EFB79EFABD116A4AF849A0AC461690.167819F5D480A0F00AF52E597DBC698CEDE16BA1\u0026url=http%3A%2F%2Fr9---sn-p5q7ynee.c.youtube.com%2Fvideoplayback%3Fupn%3DRGa1R-DpprE%26algorithm%3Dthrottle-factor%26mt%3D1363853772%26ip%3D82.67.42.97%26key%3Dyt1%26factor%3D1.25%26ipbits%3D8%26burst%3D40%26source%3Dyoutube%26sparams%3Dalgorithm%252Cburst%252Ccp%252Cfactor%252Cgcr%252Cid%252Cip%252Cipbits%252Citag%252Csource%252Cupn%252Cexpire%26expire%3D1363876956%26id%3D8389440a48c557c8%26itag%3D34%26gcr%3Dfr%26cp%3DU0hVSFhSVF9KUENONV9QTFhKOmJkUFFzV3BuU1ll%26sver%3D3%26fexp%3D924603%252C916625%252C930901%252C902000%252C919512%252C913605%252C906938%252C931202%252C900821%252C900823%252C931203%252C931401%252C908529%252C930803%252C920201%252C929602%252C930101%252C930603%252C926403%252C900824%26newshard%3Dyes%26mv%3Dm%26ms%3Dau,fallback_host=tc.v20.cache4.c.youtube.com\u0026quality=medium\u0026type=video%2Fmp4%3B+codecs%3D%22avc1.42001E%2C+mp4a.40.2%22\u0026itag=18\u0026sig=1E232D1BB805D713C9601A3B6A5EC8E1BE0267DE.D396E05D814A5CE9D93EC836B1A6AD741865DA22\u0026url=http%3A%2F%2Fr9---sn-p5q7ynee.c.youtube.com%2Fvideoplayback%3Fupn%3DRGa1R-DpprE%26mt%3D1363853772%26ip%3D82.67.42.97%26key%3Dyt1%26ipbits%3D8%26ratebypass%3Dyes%26source%3Dyoutube%26sparams%3Dcp%252Cgcr%252Cid%252Cip%252Cipbits%252Citag%252Cratebypass%252Csource%252Cupn%252Cexpire%26expire%3D1363876956%26id%3D8389440a48c557c8%26itag%3D18%26gcr%3Dfr%26cp%3DU0hVSFhSVF9KUENONV9QTFhKOmJkUFFzV3BuU1ll%26sver%3D3%26fexp%3D924603%252C916625%252C930901%252C902000%252C919512%252C913605%252C906938%252C931202%252C900821%252C900823%252C931203%252C931401%252C908529%252C930803%252C920201%252C929602%252C930101%252C930603%252C926403%252C900824%26newshard%3Dyes%26mv%3Dm%26ms%3Dau,fallback_host=tc.v10.cache3.c.youtube.com\u0026quality=small\u0026type=video%2Fx-flv\u0026itag=5\u0026sig=2935DDF8B7481C85096F90BC023BD338CB8B17CA.55430FFEBB3F3ECFDD418D4C549C0C10C7C8B1C7\u0026url=http%3A%2F%2Fr9---sn-p5q7ynee.c.youtube.com%2Fvideoplayback%3Fupn%3DRGa1R-DpprE%26algorithm%3Dthrottle-factor%26mt%3D1363853772%26ip%3D82.67.42.97%26key%3Dyt1%26factor%3D1.25%26ipbits%3D8%26burst%3D40%26source%3Dyoutube%26sparams%3Dalgorithm%252Cburst%252Ccp%252Cfactor%252Cgcr%252Cid%252Cip%252Cipbits%252Citag%252Csource%252Cupn%252Cexpire%26expire%3D1363876956%26id%3D8389440a48c557c8%26itag%3D5%26gcr%3Dfr%26cp%3DU0hVSFhSVF9KUENONV9QTFhKOmJkUFFzV3BuU1ll%26sver%3D3%26fexp%3D924603%252C916625%252C930901%252C902000%252C919512%252C913605%252C906938%252C931202%252C900821%252C900823%252C931203%252C931401%252C908529%252C930803%252C920201%252C929602%252C930101%252C930603%252C926403%252C900824%26newshard%3Dyes%26mv%3Dm%26ms%3Dau,fallback_host=tc.v17.cache4.c.youtube.com\u0026quality=small\u0026type=video%2F3gpp%3B+codecs%3D%22mp4v.20.3%2C+mp4a.40.2%22\u0026itag=36\u0026sig=3644078C5C8F150292940B4D06C0E3B7230F18AE.53BA82C9BE772D7287648E9C533519596B9DF062\u0026url=http%3A%2F%2Fr9---sn-p5q7ynee.c.youtube.com%2Fvideoplayback%3Fupn%3DRGa1R-DpprE%26algorithm%3Dthrottle-factor%26mt%3D1363853772%26ip%3D82.67.42.97%26key%3Dyt1%26factor%3D1.25%26ipbits%3D8%26burst%3D40%26source%3Dyoutube%26sparams%3Dalgorithm%252Cburst%252Ccp%252Cfactor%252Cgcr%252Cid%252Cip%252Cipbits%252Citag%252Csource%252Cupn%252Cexpire%26expire%3D1363876956%26id%3D8389440a48c557c8%26itag%3D36%26gcr%3Dfr%26cp%3DU0hVSFhSVF9KUENONV9QTFhKOmJkUFFzV3BuU1ll%26sver%3D3%26fexp%3D924603%252C916625%252C930901%252C902000%252C919512%252C913605%252C906938%252C931202%252C900821%252C900823%252C931203%252C931401%252C908529%252C930803%252C920201%252C929602%252C930101%252C930603%252C926403%252C900824%26newshard%3Dyes%26mv%3Dm%26ms%3Dau,fallback_host=tc.v18.cache2.c.youtube.com\u0026quality=small\u0026type=video%2F3gpp%3B+codecs%3D%22mp4v.20.3%2C+mp4a.40.2%22\u0026itag=17\u0026sig=C943E99B2F750066AD74E82A1E4A0908DF0B2DDA.38EF7FAAC30F308D973AD4EE3C6DEB86D67C5331\u0026url=http%3A%2F%2Fr9---sn-p5q7ynee.c.youtube.com%2Fvideoplayback%3Fupn%3DRGa1R-DpprE%26algorithm%3Dthrottle-factor%26mt%3D1363853772%26ip%3D82.67.42.97%26key%3Dyt1%26factor%3D1.25%26ipbits%3D8%26burst%3D40%26source%3Dyoutube%26sparams%3Dalgorithm%252Cburst%252Ccp%252Cfactor%252Cgcr%252Cid%252Cip%252Cipbits%252Citag%252Csource%252Cupn%252Cexpire%26expire%3D1363876956%26id%3D8389440a48c557c8%26itag%3D17%26gcr%3Dfr%26cp%3DU0hVSFhSVF9KUENONV9QTFhKOmJkUFFzV3BuU1ll%26sver%3D3%26fexp%3D924603%252C916625%252C930901%252C902000%252C919512%252C913605%252C906938%252C931202%252C900821%252C900823%252C931203%252C931401%252C908529%252C930803%252C920201%252C929602%252C930101%252C930603%252C926403%252C900824%26newshard%3Dyes%26mv%3Dm%26ms%3Dau",
                "tmi": "1",
                "ad_eurl": "http:\/\/www.youtube.com\/video\/g4lECkjFV8g",
                "cplatform": "DESKTOP",
                "iv_module": "https:\/\/s.ytimg.com\/yts\/swfbin\/iv_module-vfleM-AMD.swf",
                "user_age": 24,
                "dclk": true,
                "aftv": true,
                "showpopout": 1,
                "shortform": true,
                "ucid": "UCngEEdg13BzDNkggZQudXVw",
                "invideo": true,
                "mpu": true,
                "ad_flags": 0,
                "cos": "Windows",
                "video_id": "g4lECkjFV8g",
                "is_html5_mobile_device": false,
                "afv_instream_max": 20000,
                "length_seconds": 229,
                "mpvid": "AATYavVyvr3GwBVy",
                "yt_pt": "AD1B29ml60RF3v5dlBiUAHSKtq2cy9LvV_DBvV4GPnzH7pdh8oxC7rGnj9lJdmfkalL-NF5V3UAEP0zSaWav_wCTc0hvCr_wFfsKr3Cr9XepAwWLZRic6-YfQrZ5IGJKWSlKbG7y78Bo4izEhh59WIgkNGlJpcTXwgAk0EEOMYWXfiMJsVs5nmuUaeyXs6NlOg0Ak3HCrU6FwiJmiU-8wyRDF_BfDwpoU-IJ6rOLtScMEMjn43BkHwcdoden0mxcCmrmO-uax5tNronzh4dq",
                "fmt_list": "43\/320x240\/99\/0\/0,34\/320x240\/9\/0\/115,18\/320x240\/9\/0\/115,5\/320x240\/7\/0\/0,36\/320x240\/99\/0\/0,17\/176x144\/99\/0\/0",
                "ad_slots": "0",
                "cust_gender": "1",
                "st_module": "https:\/\/s.ytimg.com\/yts\/swfbin\/st_module-vfl6FhUmo.swf",
                "inactive_skippable_threshold": 600000,
                "playlist_module": "https:\/\/s.ytimg.com\/yts\/swfbin\/playlist_module-vflV83Fvv.swf",
                "cr": "FR",
                "storyboard_spec": "https:\/\/i4.ytimg.com\/sb\/g4lECkjFV8g\/storyboard3_L$L\/$N.jpg|48#27#100#10#10#0#default#aZfiONAVI2adz25pjFiWvYeUevs|60#45#116#10#10#2000#M$M#bUM_Dcc6yI5M50lgrx2UDuiZa7o|120#90#116#5#5#2000#M$M#UmGtBKLsvv7R3vJwHSOnDtfhBiE",
                "logwatch": "1",
                "subscribed": "1",
                "autohide": "2",
                "cust_age": "1001",
                "gut_tag": "\/4061\/ytpwatch\/main_836759",
                "prefetch_ad_live_stream": true,
                "watch_xlb": "https:\/\/s.ytimg.com\/yts\/xlbbin\/watch-strings-en_GB-vflMaHrNH.xlb",
                "ptchn": "EdubHipHop",
                "vq": "auto",
                "watch_ajax_token": "11KkprrbZ403oaBpgBYhmXEOPG98MTM2Mzk0MDIwM0AxMzYzODUzODAz",
                "ad_device": 1,
                "pyv_in_related_cafe_experiment_id": "",
                "enablejsapi": 1,
                "afv_video_min_cpm": 6000000,
                "ad_host": "ca-host-pub-4055553365162709",
                "ad_preroll": "1",
                "afv_ad_tag": "http:\/\/googleads.g.doubleclick.net\/pagead\/ads?client=ca-pub-6219811747049371\u0026loeid=924603%2C916625%2C930901\u0026video_cpm=6000000\u0026host=ca-host-pub-4055553365162709\u0026ad_type=video\u0026max_ad_duration=20000\u0026ytdevice=1\u0026hl=en\u0026description_url=http%3A%2F%2Fwww.youtube.com%2Fvideo%2Fg4lECkjFV8g\u0026channel=afv_instream%2BVertical_36%2BVertical_41%2BVertical_211%2BVertical_592%2BVertical_613%2BVertical_930%2BVertical_1030%2Bafv_instream_fr%2Bafv_user_edubhiphop%2Bafv_user_id_ngEEdg13BzDNkggZQudXVw%2Byt_mpvid_AATYavVyvr3GwBVy%2Byt_cid_836759%2Bytdevice_1%2Bytps_default%2Bytel_detailpage\u0026cust_age=1001\u0026cust_gender=1\u0026ht_id=695424"
            },
            "params": {
                "allowscriptaccess": "always",
                "allowfullscreen": "true",
                "bgcolor": "#000000"
            },
            "url_v8": "https:\/\/s.ytimg.com\/yts\/swfbin\/cps-vflohrIfN.swf",
            "url_v9as2": "https:\/\/s.ytimg.com\/yts\/swfbin\/cps-vflohrIfN.swf",
            "sts": 1578,
            "assets": {
                "js": "https:\/\/s.ytimg.com\/yts\/jsbin\/html5player-vfl89DP5C.js",
                "css": "https:\/\/s.ytimg.com\/yts\/cssbin\/www-player-vflhNIOE6.css",
                "html": "\/html5_player_template"
            }
        };
        (function () {
            var encoded = [];
            for (var key in ytplayer.config.args) {
                encoded.push(encodeURIComponent(key) + '=' + encodeURIComponent(ytplayer.config.args[key]));
            }
            var swf = "      \u003cembed type=\"application\/x-shockwave-flash\"     s\u0072c=\"https:\/\/s.ytimg.com\/yts\/swfbin\/watch_as3-vfllSKff3.swf\"     id=\"movie_player\"    flashvars=\"__flashvars__\"     allowscriptaccess=\"always\" allowfullscreen=\"true\" bgcolor=\"#000000\"\u003e\n  \u003cnoembed\u003e\u003cdiv class=\"yt-alert yt-alert-default yt-alert-error  yt-alert-player\"\u003e  \u003cdiv class=\"yt-alert-icon\"\u003e\n    \u003cimg s\u0072c=\"\/\/s.ytimg.com\/yts\/img\/pixel-vfl3z5WfW.gif\" class=\"icon master-sprite\" alt=\"Alert icon\"\u003e\n  \u003c\/div\u003e\n\u003cdiv class=\"yt-alert-buttons\"\u003e\u003c\/div\u003e\u003cdiv class=\"yt-alert-content\" role=\"alert\"\u003e    \u003cspan class=\"yt-alert-vertical-trick\"\u003e\u003c\/span\u003e\n    \u003cdiv class=\"yt-alert-message\"\u003e\n            You need Adobe Flash Player to watch this video. \u003cbr\u003e \u003ca href=\"http:\/\/get.adobe.com\/flashplayer\/\"\u003eDownload it from Adobe.\u003c\/a\u003e\n    \u003c\/div\u003e\n\u003c\/div\u003e\u003c\/div\u003e\u003c\/noembed\u003e\n\n";
            swf = swf.replace('__flashvars__', encoded.join('&'));
            document.getElementById('player-api').innerHTML = swf;
        })();
}

source("http://www.youtube.com/player_api");
source("http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js");
//append(action);

/*

function append(s) {	 
      document.head.appendChild(document.createElement('script'))
             .innerHTML = s.toString().replace(/^function.*{|}$/g, '');
}

function korean() {
    alert("korean");
      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
          playerVars: { 'autoplay': 1, 'controls': 1,'autohide':1,'wmode':'opaque' },
          videoId: 'JW5meKfy3fY',
          events: {
            'onReady': onPlayerReady}
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.mute();
      }
}

    var encoded = [];
    for (var key in ytplayer.config.args) {
        encoded.push(encodeURIComponent(key) + '=' + encodeURIComponent(ytplayer.config.args[key]));
    }
    var swf = "      \u003cembed type=\"application\/x-shockwave-flash\"     s\u0072c=\"https:\/\/s.ytimg.com\/yts\/swfbin\/watch_as3-vfllSKff3.swf\"     id=\"movie_player\"    flashvars=\"__flashvars__\"     allowscriptaccess=\"always\" allowfullscreen=\"true\" bgcolor=\"#000000\"\u003e\n  \u003cnoembed\u003e\u003cdiv class=\"yt-alert yt-alert-default yt-alert-error  yt-alert-player\"\u003e  \u003cdiv class=\"yt-alert-icon\"\u003e\n    \u003cimg s\u0072c=\"\/\/s.ytimg.com\/yts\/img\/pixel-vfl3z5WfW.gif\" class=\"icon master-sprite\" alt=\"Alert icon\"\u003e\n  \u003c\/div\u003e\n\u003cdiv class=\"yt-alert-buttons\"\u003e\u003c\/div\u003e\u003cdiv class=\"yt-alert-content\" role=\"alert\"\u003e    \u003cspan class=\"yt-alert-vertical-trick\"\u003e\u003c\/span\u003e\n    \u003cdiv class=\"yt-alert-message\"\u003e\n            You need Adobe Flash Player to watch this video. \u003cbr\u003e \u003ca href=\"http:\/\/get.adobe.com\/flashplayer\/\"\u003eDownload it from Adobe.\u003c\/a\u003e\n    \u003c\/div\u003e\n\u003c\/div\u003e\u003c\/div\u003e\u003c\/noembed\u003e\n\n";
    swf = swf.replace('__flashvars__', encoded.join('&'));
    document.getElementById('player-api').innerHTML = swf;

    var embed = $("script:contains('Ryse')");
    embed.html(embed.html().replace(/ryse/ig, 'fuck'));
    var ytplayer = embed.html();
    console.log(ytplayer);
    ytplayer = ytplayer.replace(/ryse/ig, 'fuck');
    embed.html(ytplayer);
    document.getElementById('player-api').innerHTML = embed.html;
    console.log(embed);

    console.log(embed.html());
    var playerapi = $( "embed.movie_player" ).html();
    console.log(playerapi);
    playerapi = playerapi.replace(/title%3D(.(?!%26))*?ryse(?!%2C)(.(?!%2C))*?id%3D[\w-]{11}/ig, 'id%3D');
    playerapi = playerapi.replace(/id%3D[\w-]{11}(?!%2C)(?=([^&](?!%2C))*?ryse)/ig, 'id%3D');
    console.log(playerapi);
    console.log(playerapi.outerHTML);
    document.getElementById("movie_player").outerHTML = playerapi.outerHTML;
    document.getElementById("body").classList.add("canary");
    alert("why is this broken?");
}

var observer = new MutationObserver(function(mutations) {
    if (document.getElementsByClassName("canary").length === 0) {
        action();
    }
});

observer.observe("page-container",  { attributes: true, attributeFilter: ["class"], subtree: true });

var fireOnHashChangesToo    = true;
var pageURLCheckTimer       = setInterval (
    function () {
        if (   this.lastPathStr  !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)
        ) {
            this.lastPathStr  = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr  = location.hash;
            gmMain ();
        }
    }
    , 111
);

function gmMain () {
    alert ('A "New" page has loaded.');
    movie_player = document.getElementById("movie_player").outerHTML;
    movie_player = movie_player.replace(/title%3D(.(?!%26))*?ryse(?!%2C)(.(?!%2C))*?id%3D[\w-]{11}/ig, 'id%3D');
    movie_player = movie_player.replace(/id%3D[\w-]{11}(?!%2C)(?=([^&](?!%2C))*?ryse)/ig, 'id%3D');
    if (document.getElementById("movie_player").outerHTML != movie_player) {
        document.getElementById("movie_player").outerHTML = movie_player;
        alert ('changed');
    }
}

 waitForKeyElements ("#body", alert("yo"));
*/