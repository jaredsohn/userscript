// ==UserScript==
// @name           Trello Unread Message Count in Favicon
// @description    Shows the number of unread Trello notification messages in the FavIcon in your browser's tab, inspired by http://userscripts.org/scripts/show/39432
// @version        0.1
// @date           2011-11-25
// @author         Cedric Gatay
// @namespace      http://cedric.gatay.fr
// @include        https://trello.com/*
// ==/UserScript==

// How often to attempt to update the favicon.  Change this to a larger number
// if your Firefox browsing becomes sluggish.
var pollDurationMS = 800;

function TrelloFavIconUnreadCount() {
    var self = this;
    this.lastCount = -1;
    this.head = top.document.getElementsByTagName("head")[0];

    this.poll = function () {
        try {
            self.checkCount(top.document.getElementsByClassName('count')[0].textContent);
        } catch (e) {
            if (console) {
                console.error("Something went wrong with Trello count checking");
            }
        }
    };

    this.removeIcon = function () {
        var links = this.head.getElementsByTagName('link');
        for (var i = 0; i < links.length; i++) {
            if (links[i].type == 'image/x-icon' && (links[i].rel == 'shortcut icon' || links[i].rel == 'icon')) {
                this.head.removeChild(links[i]);
            }
        }
    };

    this.setIcon = function (icon) {
        var newIcon = document.createElement("link");
        newIcon.type = "image/x-icon";
        newIcon.rel = "shortcut icon";
        newIcon.href = icon;
        this.head.appendChild(newIcon);
    };

    // standard icon, 1, 2, 3, 4, 5, 6, 7, 8, 9, + trello icons
    this.icons = [
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXZJgJXy9vdJgJYYNUunAAABAElEQVR42q2T3XKDIBBGkZ+EBBVrqcJSo6Z9/2fsmpJBypC0Mz03e/EdhmGXJX+hoowLITijFdlzOMoCx8NNwLxo3AT5gLtwOqu6aXX30kvZv5pOt039dtoJ52G02jgHXkoP4JzRdnzfCWq0k3GASAkbzkx23Am1nS4OooDGZbI7odF4PhEAb8FgDkKLeRTuBgYc8wqrdpAJ4DBYsKcUa1cSVkoIw2ogExAMFCOEY3UlYeCEiB+Ch4DfBJELvQ95XxAiQeAPBZ69IkWxrA8pK806mbJU2SxSeBjWVQfDJ3Gc5sfn93/wfeFPRv5deL44z1cvMvNlVcOGWhc+/3q7vwA4gjAoP9jTPQAAAABJRU5ErkJggg==',
        /*1*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAsVBMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE/BaGfs0dHv19bt09PFcnHGdHPDbWz79fXz4uLoyMfz4uHPiYi/YmH57+/47+9JgJXy9vdJgJbGcnL+/Pz89/cgcnJ/AAABF0lEQVR42q3Ta0+DMBgF4ALt6DagOKu0TLa5i9d5v/v/f5gnOF6qoZglng+U9DwkUFq2T4Iw4kIIHoUBczOIpSfxoAbovaIGsicNGI7GSZqp/GAi5eRQ5ypLk6OhA0bHhVHa2nIq5bQsrdXKFCcOGBem0rZEpMQFRFemcEBiqhl6AhCzyjggVXjeBRBaoZjvQIaeAAkUHH2AUaEnQALFAmsaYsx94DRkLMKo65nlav0rq03EGAewNaDeEXgJQaCZPTu/uLza3YsOcL29kbfrHnCHiXsH8F7A6Sta8PD41IKI1oEA8tyCkFbSAwL6Fx7AvsGLgugDr2/YD37Q5P/A+4f83DogJtCRH0ev63ezNnO+6dgwf5/uL27wUJyjl5HgAAAAAElFTkSuQmCC',
        /*2*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABHVBMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE+/Y2LXnp7jurrs0dDnxMTapaS/YWC6VlXgs7P9+vr9+/vOh4bMgYDy4ODt0tLWmpnPiYjbqKf89/f9+fm7WFjv2dnRj47Vl5fQi4q9XVzqysrcqKjUlZTNhYT79fXDbWzCaWjmwsLit7e+YF/ju7v+/PzapKO5UlFJgJX04+PYn57y9vdJgJbapKTrz8/KfHvLf3/kvLzHdXTVmZjBaGfhtrbDa2rAZWS7WViLQKFmAAABb0lEQVR42pXT51rCMBQG4NCmcJhBrHZgQUWcOHGiiAMH7r31/i/Dk6YmRYs+fj960py3zdO0Jf9JTNOpYRhU12IknHgCeiQR9wH2ewofwC/5AslUOpPNsXxfAaDQb+ZZLpsZSIZAatCymek4bhGg6LqOYzLbGgqBtGV7puNiAPCAxPRsKwQytlfCvgQoSp4dAlkmrlfAxVWwUQ5ADvsSSIENyvcPK8O+BFJgYxj3VMOa7wVGNEJ0rKY/M1oZ+5ZKVSeEIhA3UH0lKCGGBMHk+MTk1PRMTZwYP8Ds3DzwLCxGg6U6wPLK6to6bNQCQLtAYxO2eG0CbPNKg6dQS7R2/LILsMerLvdBAEyDH/bbAAd8oMmdlABzeIRzx/4wJt+FAp2TU4D22bl/QgS4YCgC0MS7X161+FCB6xv8HgS4Bbi7x9oNRPjEA8Djk8jzSxR4BZW3KFCPAIkweFfLdz4EUL9e1OsmKmVajfhg/v67PwHBWVQllzSfLAAAAABJRU5ErkJggg==',
        /*3*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABUFBMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE+5VFPPiIjgsrHoxsbt0tLmwsHZoqLBZmW6VlXPion47e3//v7apaTVl5f26ener6/SkJDWm5rv2dnlwL/lvr65U1L58fHjurq7V1bEbm2/YmHBaGf9+/vYn57fsLDkvbzbpqb79fXu1ta+YF/fsbH9+vrRjo3drKvbpqXTk5Pw29vhtrZJgJXMgoG4UlHrz8/79va7WFfy9vdJgJbJe3q9XVzju7q8WlnmwcHapKTEb26+YWDYoKD9+fm6VVTqzMz+/f389/f05eXDa2q9Xl3XnZzs0dDv19fZoaC8XFssWl3CAAABi0lEQVR42pXTZ1uCUBQHcGTo0VTMKAFDK1GbVmbLbNne0/bW9vr+7zpwkUs9WE//F5wj5wfqhcv8Jx6W4wVB4DnWwzjj9UGD+LwmwHlDYQL4JXXgDzQFQ2Ex0hwFiLZIETEcCrb6HSDQFpNFSVHUOEBcVRVFEuVYuwM0xWRNUlQMAB6QSJocc4CgrCVwTgARCU12gJBIrqdAxW/BQdICYZzbwBY44I31wyoqKgW2wEEHrimLNdIIdLIMw2GVzDNdKf1HUmmOYXgE5AZ0TgX+CMEG5Fwm293T29c/QD4JP0FucAjMDOfdwQhAYXQsOz4BkLUAT4GRyWLGKFMlmDYqb/0LCmZm9Tks82VY0DGccx10K4tLy8UVWF0zepauJAXrgNnYNHsPfRYUbG3v5HcB9oyeIWBfREHAAUGHFTg6puDkFN8HE5wVzom4gPIlBSQ65gpK1zdT+u1dFSq6C6jdV7F5eMTD07MLwLy8vpUAHt8/PvU68FFgpZaz229bz+1xMzRJPu3ywvy9u78AO4lZ3BrusugAAAAASUVORK5CYII=',
        /*4*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA/FBMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE/XnJvkvb3VmJe5UlHqzMzPiorit7f+/f3Pioncqqn9+fnWmZnPiIjEbm3Rj47//v7UlpXNg4P+/PzapaTIeXj8+fngtLNJgJXBaGf79PTx3t3IeHfRjo7apKTXnp67WFjy9vdJgJbMgYG8W1r47+/05OP26Oj37ez68/O/Y2K7V1a6VVTZoaHfsLD/2pp+AAABVklEQVR42pXTZ1fCMBQG4LRN4TJTMdqBBZUiLtwTFcS95///L95WMrQFj++HpCfv03PStCX/iWFa1LZtapkG0ZPLw5jkcwlQfVokACZEgEKxVK5UmTNVA6hNc4dVK+WZggaKs67HuO8HdYB6EPg+Z547p4GS64XcDzAAOCDhoedqoOyFDewlQNEIPQ1UGN6vAxScYdEcgSr2EkiBBcXewJlhL4EUWMzjmZo4O+PAgkmIhTNPVhZb0a+02hYhFIGfANUrgZuwJVDrS51OZzm5sjPByiqurU0A69AF2BCApsAmbG0LQPWnEBuA7s6uAJY4BwX29uEgksAUJynB4REcRwoY8l2MQO8ETiMNkG9wxlDEoD+A895wOLwAuLy6VuDmFr+HGNyBlnsBRGLw8JjkCeD5JQu8vuEw2kP/PQVUPgA+5SbzCqTz49fLet1EpUnbGR/M33/3F3wXUk8ooLaDAAAAAElFTkSuQmCC',
        /*5*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABNVBMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE+5VFPJe3vkvb3nxcXTk5O7V1bTlJO6VlXnxMPht7blwMDFcG+8W1rAZGPSkJDZoaDWm5rNhYS7WFfFcHD58fH68/P79fXdq6u5UlH//v7t09LcqanYn57gsrH26enju7vEbm7era3s0dC/YWBJgJW9Xl3QjIvPiIjy9vdJgJa4UlHrzc3ZoaHCamnapKTox8fMgYC7WFj8+Pjz4uLKfXzqzMv79vb05eXAZWXLf3/nxMT36+v+/f3v2dnWmpm8XFu5U1Ihdnj/AAABf0lEQVR42pXT51rCMBQG4NIBh1nEagcCaosDXKA4EMW998K99f4vwZO0DaWAPn4/kibn7dM0bbj/JMALoiRJosAHWuaDIeiSUJACrHcVFMAvcUE4Eo3FE3KyJwWQ6lWSciIe6wt7QKRf1WRF1400QNowdF2RNXXAA6KqllF0AwOADRIlo6keENMyWawzgCKb0TwgLuP9DNDgU7CQc0AC6wwwgQWR7B/2MtYZYAILg7inPPbJbmCI5zgBe4XODJuWL2Ze4DgRgU6Brz5CBC5CYoDMjo65GS+QseQHRWCZ6AgmAaamaWZcIPpBybJTJo3ovAUDswhKc5X5hUVbCWwfHLBUhWUgqa2skjHv3UmLpFStr61vbG4BbJNhwPstLJqdXbqWPYB97DkbHMgobHBYtt0RwHETnJzi/0DB2XnFBhcAlww4IfNXANc3DatRuIU7qxO4fwDMYx3g6bkd0Ly8vr1D7ePzy3JBiAE330V22XL0TKstJtdMTsx3+GH+Pt0/nHNWAw8VMGYAAAAASUVORK5CYII=',
        /*6*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABR1BMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE/KfXzapKPnxMTs0NDmwcHYn57BZ2a/YmHpyMj+/v7t09LBaGe+X1757+/47+/ZoaHMgYHJennVmJfu1dXs0dDmw8P36+q8XFvhtrbGdHPFcXDSkpG7V1bEbm3Lf3/DbWy5VFPUlZTWmZn+/f347u7Wm5rhtbX68/P68vLbpqXgs7LKfHu5UlH58fH9+/tJgJXUl5bfsbHera3IeHfy9vdJgJbFcHD//v7lvr7jurq9XVzkvLzcqanGcnLFcnHbp6bv2Njx3Ny4UlHVmZj79fXTk5O6VlXqUO/pAAABiklEQVR42pXT51PCMBgG8NIBL7OI1bZgRSWoOMCN4MaJW8C9cOH8/z/7Xi6EIkXP544m8PzIQdIK/4lLlGRFUWRJdAn2uD3QJh43Bdi3FRTAL6kDr88fCIbUcEcEINKphdVQMNDltQFft26ommlGYwCxaNQ0NdXQe2zArxuWZkYxAHhBolmGbgMBw+rFngMUvZZhA0EVv88BW0PFIs5ACHsOuMBCxt6Fo4o9B1xg0Yd7KuIYbgf6RUGQcNToJwMJ8iOJpCQIMgKTAuxbBP4IhQPCMjg0nBoZHaNzpRWMp4EmMzHpCKamYWZ2LjufgzxbQW4GC7C4RCfLKwQjs3/BwSrAGimsb2xuERqJ7wMD2wA76SIA7O5RILKd5GAfMAf5Q7weEYyLnwUDx1iflEgpW4ZKAd+zwzpVUVBwBnBO174AuGyAq2u8Hyi4uYU7Cu6hWOWAhRYPkHl8Kj2/FCFFHEG1hrMKvl6rzoC8vefK8FH7/CJ14OGAp8BnTY+e03ELjcTlpMMN8/fT/Q2Zz1jEx2OQpAAAAABJRU5ErkJggg==',
        /*7*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA9lBMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE+5VFO5U1K4UlHx3d3kvb305OS/Y2L+/v7x29vht7bpyMjz4uK8W1rqysr//v7Je3rQi4rkvLy8XFv47+/58fG9Xl3ju7rTk5LKfHvt1NRJgJW6VlX05eX9+/vDbGvy9vdJgJbdq6vcqqrFcG/+/Pv15+e5UlHw2dnKfn3lvr779vbAZGMMkBFpAAABT0lEQVR42pXTZ1eDMBgF4AChvZ2pFWVUWhXaumfds+49/v+f8RUwkFrq8X7ghNyHnEMI7D/RdIObpskNXVPmC0XkpFiIAPW5IgKYkB9QKleqtbpoTDWB5rTVEPVadaaUAeVZ2xGW63otoOV5rmsJx57LgIrt+JbrUQC6ELF8x86AquO3qZeARNt3MqAm6HkF0BoCQCcBdeolkAIAp14DIKiXQAoA87SnOoBGHljQGTMAWNHMYhCOJOgajHEC8QLffS9t+0skOGOmBCFleUVmdY3uzVGwjjRjwcZmnC1guxcDroCdMM4uBnshhWffIkyzDxxEA0PugwIOj3B8Eo10uZMKOAXO4pEmv0UWnA9wkQxZDC4FCQmGV7i+UcHtHZ0HCe6Bh1ABSZK5xyc8DyeAl1fgLcwH/Xfg41MBRQnGRPn1gt99wNJ0eHfMgfn77/4CqutSLTDZSm0AAAAASUVORK5CYII=',
        /*8*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABWVBMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE++YF/UlZXlwL/rzs7t09PpyMjerq7LgH+4UlHLf3/68vLs0dD26ur8+PjRjYzDbGvBZmXGcnLfsK/BaGfhtbS5UlH26eny4OD15+e7WVjIeXj//v7ht7bOhoX36+v9+fnz4uHx29v26Ojv19fCamm9XVzcqKj+/Pz47+/NhIP47u7XnJvKfn3Hd3bgsrH+/PvoxsVJgJX+/v6/Y2LYoKD+/f3AY2Py9vdJgJbpysm5VFPQi4rNg4PWm5vhtra+X17FcnH89/e6VlXv19b37ez05OT68/P9+vrUlpXt0tL05eXiuLjFcHBeAVGTAAABkUlEQVR42pXTV1eDQBAFYEIxV01CVDQQjZXYe+8ldmPvvfeu///B2RVWokSP94Fhdz4OsAvSfxKQFVXTNFWRAxnzOUFkSTCHA+pnFRzgl7ggNy8/FI7o0YJCoLDIiOqRcKg41wPySmKmblhWvBQojccty9DNWJkH5MfMhGHFKQAdiBgJM+YBITNRTn0BSJQnTA8I63S9ADx0FwAVDohQXwAhAKhs/ajq1BdACACVtKYy1Wg2UCVLkkLV4DPVNfa31CQVSVIJWByIvkfQQ2gC2Dy1dfUNjU3NLa18pP0Abe34TEetP+hEV3dPb18/0O8ANQMMAIOsDg1jhFXV+xa80YnRMarjE0ixseJdB5tlcgrTM7NzwPwCG8ruSgqQXlwCy/IKf42A2AsH9K5idG19Y2VzC9ts7GzWjk6CgxR292yWfRwcfoGjY/oeODhB1ykHZ8C5AE7Y/AVweUX1egY3t34gfQcc3D88Ak/Pth+wTy9eboDd17d32wVBAdzcjrW6pxm/nt92S1+pUJM+H8zff/cHJEJa6ZRTj/AAAAAASUVORK5CYII=',
        /*9*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABX1BMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE/Gc3Lerq3nxMTrzs7gsrHRj465VFO9XVzt09Ly3t7FcXC7WFjx3d39+/vit7fQi4rcqKj47+/68vK+X17Oh4bUlZTCamn//v7mwcHgs7LCaWj36+v9+fm5U1LapKTVmZjDbWzEbm39+vr+/Pzlvr7UlpXSkpHer6/Je3rMgYD58fH15ubv19dJgJW6VVTdq6viuLjYn5/KfXy4UlHnxcXy9vdJgJbMg4K9Xl3BZmX89/fdrKz15+fu1tbGdHTIeXjy4OD05OS6VlXWmZn68/P05eXw29vhtrb26en+/f337Ozrz8/Wmpm5UlG7V1a0sVrTAAABkElEQVR42pWT51PCQBDFQwosNYjRJCCgEmxgF0EFu9h779h7xf9/3ITjAAk6vg95c/t+2bnsXZj/yMJyvCAIPMdaKupWG9SQzWoAmNckDAB+URGwO5wut0f01vkAfPWSV/S4XQ32MsDRKCuipKr+AEDA71dVSVTkpjLAKStBSfWjAPCBiBRU5DLApQRDmFMAiVBQKQPcIr5PAdJDxCBMAA/mFKAEBrw+P3QRcwpQAoNmnCmL7q0FtLAMw6FLRqU1ov1QJMoxDI9AoQHmVQRuQqAAKba1d3R2xeKFhVAFdPeAod4+c6B/AAaHYonhJKRGCMBXAKMAY7qnMzCuO0++ggITAJNG7ymYnkHj6BwIMAswp3s2A5BFZ8kkKTC/AItLyyurKayu4dpCz4IA2voG6NrcAtB3SQ5rW0SCzGEnsbu3f3B4BEmtBByf4H0oAKdnhp3n4IICRemF+OXVNdrNLdzdmwIP6I9POYDnrGbeIf3y+gbvH595jQI2ChDlvzSqil/P7LiZksJ81OTC/P13fwNQzVpku4IdpAAAAABJRU5ErkJggg==',
        /*+*/
        'data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAyVBMVEUbVm4bV28cWHEcWnIcWnMdW3RGdony9fb////y9fdIe48eXngfYXsfYn0gZH8gZYAgZoFKg5ry9vhLhJogZoJIfJEeX3kfYXwfY34hZ4MhaIRLhJtIfZIgZYEhZ4IcWHAdXHUdXXa2UFC3UVC4UVC2UE/FcnHfsbHgs7LXnZzt09PFcXDs0dHBaGfRjo3SkJDHd3bw29vPiYjcqqrUlZVJgJXrzs7mw8P57+/qy8vu1dXy9vdJgJbBZ2a5VFPEbm7Id3b68/PapKRhWF4mAAABMklEQVR42p3T2VaDMBAG4BBCmbZAsEYJVFq1rftC3XCv+v4P5ZRljBb02P8iIcxHTkiA/ScWt4XjOMLmFjPTcaElbqcAWG8VBYBfUoNur+/5gQw3BgCDTRXKwPe2ugbobUdaqjhOhgDDJIljJXW0Y4B+pFMVJxgAbJCoVEcG8HQ6wjoBFKNUG8CX+DyBag6JhXEFAqwTIIEFgXULe4l1AiSwsIt7yrEP28AeZ8zGXhV39ifTH5nMbMYEgnICqhsCF+EQmDbEWQscHB4dG0CsznACp/WloLcwwRmc15c27UML4NVOEri4zLJsDlfYXi/HFp1FBW6AMl+OWQluJYoS3OV5fg8P2D4a4OkZv4cCvLzSGhYE6qwscm3w9g4fJnAJNOTbr9d03OwrYzFr+GD+/rs/AS9jUTm3agxkAAAAAElFTkSuQmCC'
    ];

    this.checkCount = function (inboxText) {
        // Parses the "(6) - Boardname | Trello" text.
        var matches = inboxText.match(/(\d+)/);

        // If unable to parse, assumes 0 unread.
        var count = matches ? parseInt(matches[1], 10) : 0;

        if (this.lastCount != count) {
            var index;
            if (count > 9) {
                index = 10;
            } else {
                index = count;
            }

            var icon = this.icons[index];
            this.removeIcon();
            this.setIcon(icon);

            this.lastCount = count;
        }
    };

    setInterval(this.poll, pollDurationMS);
    this.poll();

    return true;
}

var initialized = false;

function initialize() {
    if (!initialized) {
        setTimeout(function () { initialized = new TrelloFavIconUnreadCount(); }, 400);
    }
}


window.addEventListener('load', function () { initialize();}, true);