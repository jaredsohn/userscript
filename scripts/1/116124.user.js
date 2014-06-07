// ==UserScript==
// @name       Dozensonline Custom Symbols
// @namespace  http://userscripts.org/users/322169
// @version    0.5
// @description  Changes the Pitman digits for ten and eleven on Dozensonline to some better ones.
// @include    http://z13.invisionfree.com/DozensOnline/*
// @copyright  2011, James Wood
// ==/UserScript==

console.log('start');
var els = document.querySelectorAll('#quote, .quote');
for (var i = 0; i < els.length; i++)
    els[i].innerHTML = els[i].innerHTML
        .replace(/<img src="http:\/\/i2\.ifrm\.com\/4201\/70\/emo\/ten_doz\.JPG"/gi,
                 '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAIAAAAh9zBHAAAABGdBTUEAALGPC/xhBQAAAO5JREFUKFMljzFLA0EQhed+nI1YXMCoxCKYwiaFcFgIKSwSLfwBaRQUU9hYaB2MhaWgrQQtFEQj0RM593bnZvY5iY83MHzDMG8SVqWZQJSYIiGx9vzmZaGRpauttL65WO8st3qvb1/0A0zmzgW73cHp8SXYEUc/BR4Zzaw/Gt4agjgKEROHje29u/Fz1AJVrsr0CXT2j65GQ8QPaB6kCgoaB2QHZ97/gqeo1AnKaJSxstO/f3hHCcnR7R0WgclOXT99LzW21mrt9bQ9OLkQESqBAnAKrqBzz6hVFHvQW8QA9oYtr4iqTZT/aYi25f4AfH3KqzxYOTsAAAAASUVORK5CYII="')
        .replace(/<img src="http:\/\/i2\.ifrm\.com\/4201\/70\/emo\/elf_doz\.JPG"/gi,
                 '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAIAAAAh9zBHAAAABGdBTUEAALGPC/xhBQAAAOxJREFUKFNNjj1LA0EURZ9G/5iIvcawIiiiLlgHtRKroBauNloEJP9AsLNMIdjaGcEVtlqDGsiHzuy+eW+us7ERbnE5xT13xgKznmqeihrNg+agIKIxcN99XlneX1g/WG1s33Y63oGyoYn2Tns5csBO9O6mbQvQRyGbh5fdVxgHMMONJh7VQt8ibiYb9SjtPYk3gVA6crtx02RDOCMiFlp6pYe39/OTNj5hPYyCBV4KSse8FR8PMgyCTXCVXPfzr2r38eVncS1Zio4a9Z2L1tl3CWLVfxHWEA20aqUXUZ6WqS142XMJDpJA/z78AjIezcqla2DPAAAAAElFTkSuQmCC"');

els = document.querySelectorAll('.post1>.signature');
for (var i = 0; i < els.length; i++)
    els[i].innerHTML = els[i].innerHTML
        .replace(/<img src="http:\/\/i2\.ifrm\.com\/4201\/70\/emo\/ten_doz\.JPG"/gi,
                 '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAIAAAAh9zBHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAPhJREFUKFMVjrFKw2AUhW8pCL6MDlpBBCPmARx0081BpGAli/QNdHRxKjg4OTmpT+DUIS51EopDsLWFtE3+m3v/P8nxzxm/A+d8rYmiBVovaa0in7pN7TbR81u8cXC5uR/t7PaD7Zujw+vkZ0Ys1dwisZgwot7T4P5FCxCrWynGU+yFp/HnWIvKaEUzh494enZ8US/FCq+cLhzoy+DkavD7DcyBJVJFQ0eM4PxhOAT+muL27jVlUFLjfWQ6QTfsdMOtXj96zP1b6rCwyASmABuIAYt3kMoWqsrG5VmZGyu5lKTiRByrsPUFZ04bM0/9qVdmv1DAj3r6D+yzx7/UZDDKAAAAAElFTkSuQmCC"')
        .replace(/<img src="http:\/\/i2\.ifrm\.com\/4201\/70\/emo\/elf_doz\.JPG"/gi,
                 '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAIAAAAh9zBHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAPdJREFUKFNljrFKA0EURZ8GQf/HoFlQY6NWASGFNmphJ1gEg9ilsREESzvzAxams/ALLFQQsrCNIVgscbOTmczOzsy+va61cMtzOHdBFdmSW6GSuEa+RssFlYtEU/aDp3Br9SpodOqbR73OnVWgKJHNVm8YIU2hFe6v+2YGGs+xd3L78gYpAYFCc5aDYsZY4ODwZjtoh++v0lvhmYYJ7+921ScgIcvJ1EM4UJj49s6l/gDPEAP9h+fRSFLq8DiIGusXa8F5feP0uHXmBGhu8M34KhHnMOlfkDVIW/wUqJqVlGu4jHPDpLx3xrLJrJOSZXVAOa5Y/r9f+wjIuwxOB3cAAAAASUVORK5CYII="');

els = document.querySelectorAll('.post2>.signature');
for (var i = 0; i < els.length; i++)
    els[i].innerHTML = els[i].innerHTML
        .replace(/<img src="http:\/\/i2\.ifrm\.com\/4201\/70\/emo\/ten_doz\.JPG"/gi,
                 '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAIAAAAh9zBHAAAABGdBTUEAALGPC/xhBQAAAPlJREFUKFNtyr1Kw2AYhuE3osfjJFERW8jgLOIojrV06iQuYjdF6FTB1SPQQRBcHFwEURxEaEVtIW1+v3z/Mam1jz0At5uL24kkyKEFGjvT+QnmprN2iC6ueouVuru+s7Zac91Dzzv56CoaWPQ1fIYkQHPvunN6pzjIL9TA4O0L1ZXWy31aZEZJSb7F7VO4uXVgA5RMKh1mhlM3xnbj7PM9ABtZwQODyJT0mmBjt/340PtNjE5xdHw5EhPq57h5ZsuVWtWte0uN/eY5E2MKv9nQYMiRxNARcgYpDQkjUl0kEqmA5JAi58qQ5D+ZKrhmUkep5bEtZ9P/+gcUhcRMUKe8ZAAAAABJRU5ErkJggg=="')
        .replace(/<img src="http:\/\/i2\.ifrm\.com\/4201\/70\/emo\/elf_doz\.JPG"/gi,
                 '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAIAAAAh9zBHAAAABGdBTUEAALGPC/xhBQAAAPhJREFUKFNtjzFLw0AYhr9CQZwE/4mDxVRRwU2qm520i7suVnATQiddnR0EcRCc3N0cRAcjVdClBVOPu8vlS+7SaExfFXQT3uHhWR7eSmR1Vpn8GNHYJ42XNAGXVaskHJ9c3E3Vd2uz7Zn6pr/tJ3pE3VA1ltu9e7DEwOWHnWOpQc+m3Gj6j1c201DDvkgg0oJ6Dv0QrbWDJa95e3MtbC6tpWDgFlb3gy6MgJNITMFxTkE4XFzpBA+Qb1Aap0eXvSdFrxZn5y9ztT3P25qeb603dmIBkklhGCaC/umAI5i4JOYkclJl4vsOM0unlWVS6btK87/98v/2CxWUxm4KxrJTAAAAAElFTkSuQmCC"');

var els = document.querySelectorAll('.post1, .row1, .post2');
for (var i = 0; i < els.length; i++)
    els[i].innerHTML = els[i].innerHTML
        .replace(/<img src="http:\/\/i2\.ifrm\.com\/4201\/70\/emo\/ten_doz\.JPG"/gi,
                 '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKGg8BMYKgn1AAAABPSURBVBjTY2AgEiQzMDD8x4K7cWlwgCrAaxoDAwMDAwuaZDcDA4MOAwMDIzad3QwMDNtxGauAy04mJAU78HkTZoICmk+SsXkNGSswDAIAAPcxEsAX2YlWAAAAAElFTkSuQmCC"')
        .replace(/<img src="http:\/\/i2\.ifrm\.com\/4201\/70\/emo\/elf_doz\.JPG"/gi,
                 '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAOCAYAAAD9lDaoAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKGg8HDxWbJX0AAABBSURBVCjPY2AgETgwMDD8R8MKyAoUsAgmQzGKKdsJWQUzyYEUNyXjU4AVMEFpZQYGhh5irVJAc2c3MeHkwDBIAQBdARPPv8F4awAAAABJRU5ErkJggg=="');