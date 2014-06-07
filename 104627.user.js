// ==UserScript==
// @name           oiohilhba
// @include        http://*
// ==/UserScript==

(function() {
    var DEBUG = false
    var filters = [
        //{
        //    name : 'Filter Name',
        //    process : function(canvas, tag) {
        //    }
        //},
        {
            name : 'Sun Glasses',
            process : function(canvas, tag) {
                var cxt = canvas.getContext('2d')
                with(cxt) {
                    strokeStyle = '#FB3DA4'
                    lineWidth = (tag.eye_right.x - tag.eye_left.x) / 6
                    moveTo(tag.eye_left.x, tag.eye_left.y)
                    lineTo(tag.eye_right.x, tag.eye_right.y)
                    stroke()
                    moveTo(tag.eye_left.x, tag.eye_left.y)
                    lineTo(tag.eye_left.x-10, tag.eye_left.y-10)
                    stroke()
                    moveTo(tag.eye_right.x, tag.eye_right.y)
                    lineTo(tag.eye_right.x+10, tag.eye_right.y-10)
                    stroke()

                    var radian = (tag.eye_right.x - tag.eye_left.x) / 3
                    fillStyle = '#FB3DA4'
                    beginPath()
                    arc(tag.eye_left.x, tag.eye_left.y, radian, 0, Math.PI*2, false)
                    fill()
                    beginPath()
                    arc(tag.eye_right.x, tag.eye_right.y, radian, 0, Math.PI*2, false)
                    fill()

                    fillStyle = 'black'
                    beginPath()
                    arc(tag.eye_left.x, tag.eye_left.y, radian*0.7, 0, Math.PI*2, true)
                    fill()
                    beginPath()
                    arc(tag.eye_right.x, tag.eye_right.y, radian*0.7, 0, Math.PI*2, true)
                    fill()
                }

            }
        },
        {
            name : 'Pierrot',
            process : function(canvas, tag) {
                var cxt = canvas.getContext('2d')
                cxt.fillStyle = 'red'
                cxt.beginPath()
                cxt.arc(tag.nose.x, tag.nose.y, 5, 0, Math.PI*2, true)
                cxt.fill()
            }
        },
        {
            name : 'Bakabon',
            process : function(canvas, tag) {
                var cxt = canvas.getContext('2d')
                var eye_dist = tag.eye_right.x - tag.eye_left.x
                cxt.strokeStyle = 'black'
                cxt.lineWidth = eye_dist / 10
                cxt.moveTo(tag.nose.x-(eye_dist/8), tag.nose.y)
                cxt.lineTo(tag.nose.x-(eye_dist/8), tag.nose.y+(eye_dist/5))
                cxt.stroke()
                cxt.moveTo(tag.nose.x, tag.nose.y)
                cxt.lineTo(tag.nose.x, tag.nose.y+(eye_dist/5))
                cxt.stroke()
                cxt.moveTo(tag.nose.x+(eye_dist/8), tag.nose.y)
                cxt.lineTo(tag.nose.x+(eye_dist/8), tag.nose.y+(eye_dist/5))
                cxt.stroke()
            }
        },
    ]

    GM_registerMenuCommand('gis rakugaki - clear config', function() {
        GM_setValue('config', '({})')
    })
    GM_registerMenuCommand('gis rakugaki - clear cache', function() {
        GM_setValue('cache', '({})')
    })

    var config = eval(GM_getValue('config', '({})'))
    var cache  = eval(GM_getValue('cache', '({})'))

    if(!config.api_key) { config.api_key = prompt('API KEY') }
    if(!config.api_secret) { config.api_secret = prompt('API_SECRET') }

    GM_setValue('config', config.toSource())
 
    var images = document.querySelectorAll('img')
    for(var i = 0; i < images.length; i++) {
        var img_url = images[i].src.replace(/_normal/, '')
        if(cache[img_url]) {
            process(images[i], cache[img_url])
        } else {
            GM_xmlhttpRequest({
                method : 'GET',
                url : [
                    'http://api.face.com/faces/detect.json',
                    '?api_key=', config.api_key,
                    '&api_secret=', config.api_secret,
                    '&urls=', img_url
                ].join(''),
                onload : (function() {
                    var img = images[i]
                    return function(res) {
                        if(res.responseText == '') { log('responseText is empty'); return }
                        var data = eval('('+res.responseText+')')
                        if(data.status == 'failure') { log(data.error_message); return }
                        process(img, data)
                        cache[data.photos[0].url] = data
                        GM_setValue('cache', cache.toSource())
                    }
                })(),
                onerror: function(res) {
                    log('response error')
                }
            })
        }
    }

    function process(img, data) {
        var tags = data.photos[0].tags
        if(tags.length == 0) { log('tag length is 0'); return }
        var canvas = createPhotoCanvas(img)
        tag = convertToAbsoluteCoordinate(tags[0], canvas)
        filters[random(filters.length)].process(canvas, tag)
        replaceImageWithCanvas(img, canvas)
    }
    function convertToAbsoluteCoordinate(tag, canvas) {
        var absolute_tag = eval(uneval(tag));
        ['eye_left', 'eye_right', 'nose', 'mouth_left', 'mouth_right', 'mouth_center'].forEach(function(elem) {
            absolute_tag[elem].x *= canvas.width / 100
            absolute_tag[elem].y *= canvas.height / 100
        })
        return absolute_tag
    }
    function createPhotoCanvas(photo) {
        var canvas = document.createElement('canvas')
        canvas.width = photo.naturalWidth
        canvas.height = photo.naturalHeight
        canvas.getContext('2d').drawImage(photo, 0, 0)
        return canvas
    }
    function replaceImageWithCanvas(img, canvas) {
        img.parentNode.insertBefore(canvas, img)
        img.parentNode.removeChild(img)
    }
    function random(num) {
        return Math.floor(Math.random()*num)
    }
    function log() {
        if(console && DEBUG) console.log.apply(console, arguments)
    }
})();