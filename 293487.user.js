// ==UserScript==
// @name           rebuildGELinks2
// @description    captcha solver, remove ads and add textarea with all grabbed links
// @version        0.2
// @include        http://www.goldesel.to/*
// @include        http://goldesel.to/*
// ==/UserScript==

if (jQuery)
{
    /* remove ads */
    $('ul.wbh').remove();

    var dd = $('ul.ddl');
    dd.before('<textarea wrap="off" rows="10" id="linkBox" style="font-family: monospace, sans-serif; font-weight: normal; margin: 10px 0; width: 570px;"></textarea>');

    var count = 0;
    var failCount = 0;
    var liArr = [];
    var linkArr = [];

    dd.find('li').each(function() { liArr[count++] = ['new', $(this)]; });

    var checkCaptcha = function ()
    {
        var done = 0;

        for (var i = 0; i < liArr.length; i++)
        {
            if (liArr[i][0] == 'progress')
                break;
            else if (liArr[i][0] == 'new')
            {
                liArr[i][0] = 'progress';
                solveCaptcha(i);
                break;
            }
            else if (liArr[i][0] == 'done')
                done++;
        }

        if (done < liArr.length && failCount <= 5)
            setTimeout(checkCaptcha, 100);
    };

    var solveCaptcha = function (index)
    {
        var tis = liArr[index][1];
        var data = tis.attr('data');
        var canvasId = 'canvas_' + index;

        if (!$('#' + canvasId).length)
        {
            tis.css('overflow', 'hidden');
            tis.append('<canvas height="1" width="1" id="' + canvasId + '"></canvas>');
        }

        var context = $('#' + canvasId)[0].getContext('2d');
        var image = new Image();

        image.src = 'http://goldesel.to/inc/cirlecaptcha.php?' + $.now();

        image.onload = function()
        {
            var cObj = {};
            var count = 0;
            var w = image.width;
            var h = image.height;
            var x = 0, y = 0;

            var key;
            var color;
            var colorKey;
            var colorCount = w * h;

            $('#' + canvasId)[0].width = w;
            $('#' + canvasId)[0].height = h;

            context.drawImage(image, 0, 0);
            var imageData = context.getImageData(0, 0, w, h);
            var pixelArr = imageData.data;

            for (var i = 0, n = pixelArr.length; i < n; i += 4)
            {
                color = hex(pixelArr[i]) + hex(pixelArr[i+1]) + hex(pixelArr[i+2]);

                if (cObj[color] === undefined)
                {
                    cObj[color] = {};
                    cObj[color].count = 0;
                    cObj[color].xMin = w;
                    cObj[color].yMin = h;
                    cObj[color].xMax = 0;
                    cObj[color].yMax = 0;
                }

                cObj[color].count++;

                y = Math.floor(i / (4 * w));
                x = (i / 4) - (y * w);

                cObj[color].xMin = Math.min(cObj[color].xMin, x);
                cObj[color].yMin = Math.min(cObj[color].yMin, y);
                cObj[color].xMax = Math.max(cObj[color].xMax, x);
                cObj[color].yMax = Math.max(cObj[color].yMax, y);
            }

            for (key in cObj)
            {
                if (cObj[key].count < colorCount)
                {
                    colorCount = cObj[key].count;
                    colorKey = key;
                }
            }

            var mx = cObj[colorKey].xMin + Math.round((cObj[colorKey].xMax - cObj[colorKey].xMin) / 2);
            var my = cObj[colorKey].yMin + Math.round((cObj[colorKey].yMax - cObj[colorKey].yMin) / 2);

            $.ajax(
            {
                type: "POST",
                url: 'res/links',
                data: { 'data' : data, 'xC' : mx, 'yC' : my },
                success: function(response)
                {
                    if (response.search(/cirlecaptcha\.php/i) != -1)
                    {
                        liArr[index][0] = 'new';
                        failCount++;
                    }
                    else
                    {
                        response = response.replace(/.*<br \/>/i, '');
                        dd.before('<div id="lkssBox_' + index + '" class="lkssBox" style="width: 585px; margin-bottom: 15px;">' + response + '</div>');
                        $('div.lkssBox ul.lkss li').css('height', '25px').css('overflow', 'hidden');
                        linkArr.push($('#lkssBox_' + index + ' input[name="urls"]').val().trim());
                        $('#linkBox').text(linkArr.sort().join("\n"));
                        liArr[index][0] = 'done';
                    }
                },
                dataType: 'text'
            });
        }
    };

    var hex = function (dec) { return ("0" + parseInt(dec).toString(16)).slice(-2); }

    checkCaptcha();
}