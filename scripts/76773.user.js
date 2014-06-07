// ==UserScript==
// @name           Youtube Link Channels
// @namespace      http://www.userscript.org
// @description    Adds 4od and demand five on the top on every YouTube page
// @include        http://www.youtube.com/*
// ==/UserScript==


// Got the right link for Fivedemand and replaced the text with the Images

// This will load the 4od logo without going to a server
var FourodImage = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBuRXhpZgAASUkqAAgAAAABAGmHBAABAAAAGgAAAAAAAAAB'+
'AIaSAgA6AAAALAAAAAAAAABDUkVBVE9SOiBnZC1qcGVnIHYxLjAgKHVzaW5nIElKRyBKUEVHIHY2'+
'MiksIHF1YWxpdHkgPSA4MAoA/9sAQwAGBAUGBQQGBgUGBwcGCAoQCgoJCQoUDg8MEBcUGBgXFBYW'+
'Gh0lHxobIxwWFiAsICMmJykqKRkfLTAtKDAlKCko/9sAQwEHBwcKCAoTCgoTKBoWGigoKCgoKCgo'+
'KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8AAEQgAKAA3AwEiAAIR'+
'AQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAAB'+
'fQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5'+
'OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeo'+
'qaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMB'+
'AQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYS'+
'QVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNU'+
'VVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5'+
'usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+qazPE2u'+
'2HhrQrzV9XnEFlaoXdj1PoAO5J4A9TWk7rGjO7BUUZLE4AHqa+Tfij4s1b4v+INU0Lws4XwppEEl'+
'3cXBTKyGIFvMz15I2qO/JPsmxo9P+DHxU1Dx1r2v/bbSO00OIJNYyy/I4DME8s/wt8wPOepx9PZC'+
'QBkkAeprynQ/Cemf8JroVrDEYtM0zQreaKyT/VvJ5rlXf+8VO5h/tHPUCuh+NRI+E/isqSCNPlwQ'+
'cdqYjsvNj/56J+dPBBGQciviH4V/BrXvHemnV7jUjpGi5IS4lLO8uOpVcj5R0yTXY6z8N/HXwvsG'+
'8R+BvFc2q6fbDzJ4Vzyg6kxlmV1HfGCKVx2Pq2iuG+D3j6D4h+EI9TWNYL6FvIvIFOQkgAOR/skE'+
'Efl2opiPOP2nvG93Ctn4I0G5ihvdTwLx3fyykTHCjcflCsQdxzwBjvXJ+LNW8M/Dr4Q3fhHwh4gs'+
'7jxHeoj39zbgyeercOFkUFRxwATwM9zX0VqHg3Rb/wAXWPiWe1H9rWsTwCTtJGwI2uDwcZJB6iua'+
'+NfiY+APBB1rS9L0+5nFzHD5c8eEw2cn5cHPFIYnh3XtKn8Wz3tpqFtc2tn4dhM728gkEe2RyQdu'+
'ecDp1rJ8bePPDfjb4P8AjN/DWpx3bQafL5kZVkdcjg7WAOPfpWhoFheX/i/UrbXP7OVb7QI1xp0L'+
'QgI8kgOdxPzcnmr/AMU9Jhs/hB4itbG33SR6W8KbIwXcBQB0HJ4oEeUfGiLULv8AZ+8Ht4UWaTRF'+
'ggN4lqCTs8oAbgOdobOffGag/ZDt9Xt7TxHNqKTReGDEuBcAiMyjO4qD22/eI46V598L/iZ418AW'+
'jWFvo9zqOkliwtLm3lHlk9SjAcZ9MEV2us+Lvij8WbM6HofhmTRNKuPkuJmV0Vk7hpHAwvsoyelK'+
'5Xkaf7HoY6j40e1BGmmWHy/TOZMf+O4or2T4UeBbT4feEodJtpBPcMxmurjbjzZSBkgdgAAAPQUU'+
'0Szsq8J8R/A+XXvEni+91PVLu5tNQX7Tp0KXTRpHOd3ySJyCoO3BHbNFFMDudR8F3Wra5DNcajfW'+
'FoNIjsZPsM4jZ3DMWDZU8YbgjHet3TNIn8M+FzY6RPealJbpi3F/P5j+yl+Mgdsn8aKKAKd1e+Lx'+
'YI9vpdibvzCTH5vy7AMgZz1JyM/TjvTG1DxmqqRo2nSFiAVE+No75JPNFFAGp4fm1ya5ujrdtb28'+
'SqghELbtx53Hqf8AZ47e/WiiigD/2Q==';


// This will load the DemandFive logo without going to a server
var FiveDemandImage = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYF'+
'BgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoK'+
'CgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAAoAC8DASIA'+
'AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA'+
'AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3'+
'ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm'+
'p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA'+
'AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx'+
'BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK'+
'U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3'+
'uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0j4ie'+
'OvEXjHXbzxV4o1i4v9R1CZprq5uJSzu7HPfoB0AHAAAFVfgr+zJ8cv2sfGkng74R+HlaO2KnVda1'+
'BzHZaejdDI4BJY84jUFjjoBzWDaxat4q8Saf4U8PxGbUNUuobOwiz9+aV1jQH23MK/RqHx34i/Ya'+
'0i4+Afwl8L6BqUHh3RbO5nhntLg6hq95cQXD3F8WjbaY42gVnBAxGwUMMKD9BWqujBRgtWf0xxDm'+
'uIwNGGGwEIutJPlT0jGKsr/JtJLRdXomcB4M/wCCAnwdn0tX+MPx38V6pfOg80eHY7ewgRu4USJK'+
'5HuT+Arhvj7/AMG4Xg7WNGmvf2dP2i9Z0/U0jzb6f4ztYrq1mb+601ukckf+9tf/AHTXv9h+338Z'+
'rW6VNc+HukzWS6rZefrFnaTiFbDEIvGwssi+aj3MAQByDls/dIEc3/BQr4xyaY2pW3wtsE+x6dKd'+
'Yglsbzfa3Usj/Ysg4PlsphV8jO9yQdorgVXHxldS/Kx+aez4+lX5/a3v5w5delrW8rWvdpbs/DL9'+
'oz9nH42/spfFK6+EPx+8DT6HrcCebBlhJb30BJAuLaYfLNESMZHKn5WCkYrG+GHxY+JnwQ8a2vxJ'+
'+EXjjU/D2uWSSJb6jpd20UgSRGR1JUjcpVjweM4PUCv2i/a6+E+t/wDBT79lHxT4f8VeD9E/4S/w'+
'f4ej8SeBtc0W1nQ2WoHzvN0mYylstJHCFcK2MSxsVBRc/hyJfOtRMgI3qCAwwRn1r3MLiPrNNqa1'+
'WjR9bl2MnjqU6GKilUhpNLVaq6fo10fmff37IfiPT4P2yfhfJq0qC3/4TbT1YueAzShUz/wMrXb/'+
'APBXfxjf+M/+Cr0Pwl+JifGjxH4L0f4b2txbeDfgtfyR6kZ5POZp1jU7Su7HmOQWwqAECvkrV/Gm'+
'oaFq8Ot6JftbXllcJcWNxGfmhljYOjj3DAH8K/VL9gHw98Hv25f2ndO/4KpeHvi5eQ+NNO8EJ4T8'+
'ZfDlbWHydPuwmGmL/wCs2ScyRn7rKcZ3KwHDif3M/bNaWa+Z5nHMXSxVPHtXioSh6Nu69L6q/wDm'+
'fl5+1L4s8T6Fqvx00fwd4j8f6Np1jZ+B4tJ0rxHrtymp2ERtIQIrkK4C3GMCXGMuDmvXf25vGPxB'+
'/a1+If7QH7Q+heOtctvB/wABvBOg+FtDax1m4giuNVkvbaCVyInUOwdtQYk5OBD7V91ftI/8EKPh'+
'/wDtH/FT4pfFPVP2jPEekzfFDVdMvrqztNGtZE05rPbtWNm5cNt5LdO1dN4R/wCCNHwt8Gf8E/PF'+
'/wCwdpvxc1t18ba6ura/44m063a+nnW5glTMf3CAlvHHz23N1JrH65hkovrp06e7f8rHwyzbL4xp'+
'yT95WT0eiahzP/yVr5nlH/BBnw38NrPRfEnjzSfAfx30fVZ/B2jf8JBq3xX1B5dE1ZnWWSSfSQ4/'+
'1W5WYsST5bx5zX40eJJbK61/U7nSyv2aXU7l7bb08szOUx7bSK/VX9re71f/AII7fs6+I/g/Yft4'+
'ePPiZ4s+IfhKLw54I8HeJriPyPCenpujm1GGJCfIVYW8mPpudUC5CNj8nRDHFbLAi7URQqgdgOgr'+
'uwEXKU6t9JWtv09T7DhPDzcq+Lv7lRxUd9VFO711trb5M+i/jZ+y1+1N8NfHWreAPE3wA8YPfaZe'+
'SQSy6d4cubq3nAPEkUsSMjowwwIPQ9jxXP8AwdH7ef7N3xJt/ir8Bvh58TfDeu2w2fa7LwbfNHcR'+
'5yYZ4nhKTxE4yjgjuMHmiinSrOdJXS1R6Mc2r43BQdWMWpRV1bR3Xa59+fCf/gu7+3xoGix2Hxn/'+
'AOCa+v8AiK7jQK2peHtK1TTfOIH3mhltZgpP+y2PYVkfHL/guN/wUi8baNNovwL/AGBtc8DyToVG'+
'sap4a1LV7qD/AGo4zbRRBvQuHHtRRWKw+G5r8i/H/M8ZZTk6q+0+rxv/ANvW+7mt+B+fPj74bftj'+
'fFfxpqPxI+KHwp+KHiHxBq03malrGreE9QlnnboMkw4CgcKigKo4AAq/8I/2Gv2vfjh45tfh54F/'+
'Z08Xi9uUkkM+q6BcWVtCiIzlpJp0RFzgKBnJZgAKKK6KuInTpNxS0R6mKzbEYTBznTjFcq00dtPm'+
'f//Z';


var thisElement = document.getElementById('masthead-nav'); // This will create the
var a = document.createElement('a');			   // 4od Link
a.href = 'http://www.youtube.com/4od';
a.innerHTML = '<img src=\"'+FourodImage+'\">';
thisElement.parentNode.appendChild(a, thisElement);

var blank = document.createElement('a');  // This will create a gap to separate
blank.ahref = 'http://www.google.co.uk';  // the links
blank.innerHTML = ' ';
thisElement.parentNode.appendChild(blank, thisElement);

var lnk = document.createElement('a');        // This will create the DemandFive link
lnk.href = 'http://www.youtube.com/user/demandfive'; 
lnk.innerHTML = '<img src=\"'+FiveDemandImage+'\">';
thisElement.parentNode.appendChild(lnk, thisElement);