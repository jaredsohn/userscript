// ==UserScript==
// @name          CacheContest-GM
// @namespace     http://cache-contest.com
// @description   An implementation for cache-contest.com in geocaching.com
// @author        Sven Karsten Greiner (SammysHP) <sven@sammyshp.de>
// @version       0.7
// @copyright     2010 by SammysHP & cache-contest.com
// @licence       http://creativecommons.org/licenses/by-nc-nd/3.0/
// @license       (CC) by-nc-nd
// @include       http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

////////// Static configuration ////////////////////////////////////////////////

var Configuration = {
                        debug: false,
                        icons: { // some icons from www.famfamfam.com
                                   visitpage:    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIMSURBVBgZpcHNi05xGMfhz/07hzTDiKZmEmLYeM3iKTKUiFhY2EhZ2NjIBgsWYoUoSWr+B7NhY6GkJBRhYSMvJYRSFDPPi3N+9/01Z2Jvcl0mif9h+46PH92yrXXpe0f9EhCBIvBwFCIUyJ2QkDsewcDsuv3y5adTN67sHytbo61rs+b0p6E5zER/u+PXgLGyUyt1vk8yU91aiSmlXJw/uJKZOnzxPY1SChpVdgQohAcEIkJ4BJ6FZ+EKKhfLh+fh4TRKJBqWDJNQMmTCwkjJMEuYOVaIIhJlFo3ITiN5OI0EmBmWjCIZqTAsQZFgVlFw/tZuTt/cjIqaRnjQSAoxzYxGApIZKRlFYRQGKcGvXLF4cBXHxjdS5R4RTqOMcP4yM6ZJnLy+DSlTRabKmUULVrJqeCMTvTZ7x0ZYoKs0ylzXTDPDAEmYGTkqdq45hCvwcALx+cdH1i0eZbLq8qx7iPXnDswv5UGjAMQUM5Do5QpX8P7bG+rI5Kipvebnrwk2LNnKZN3h8bsH38qI4C8DjClm9HKP7JmhgaXkcFzBlx8fWDh3mOcfH/L47Qs6Tsv2HR8fH1qyaH+4Ex64OxHBz8Ej9KqKKip6uWLF4Go2jezi6YdH3H/1hGXdE7fvXD6zxyTxL9aeS+3W0u19917f/VQFOz5f0CummCT+xchZa3sUfd3wka8X9I4/fgON+TR7PCxMcAAAAABJRU5ErkJggg==',
                                   config:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVDjLlZPLbxJRGMX5X/xbjBpjjCtXLl2L0YWkaZrhNQwdIA4FZxygC22wltYYSltG1HGGl8nopCMPX9AUKQjacdW4GNPTOywak7ZAF/eRe/M73/nOzXUAcEwaqVTKmUgkGqIoWoIgWP/fTYSTyaSTgAfdbhemaSIej+NcAgRudDod9Pt95PN5RKPR8wnwPG/Z1XVdB8dxin0WDofBsiyCwaA1UYBY/tdqtVAqlRCJRN6FQiE1k8mg2WyCpunxArFY7DKxfFir1VCtVlEoFCBJEhRFQbFYhM/na5wKzq/+4ALprzqxbFUqFWiaBnstl8tQVRWyLMPr9R643W7nCZhZ3uUS+T74jR7Y5c8wDAO5XA4MwxzalklVy+PxNCiKcp4IkbbhzR4K+h9IH02wax3MiAYCgcBfv99/4TS3xxtfepcTCPyKgGl5gCevfyJb/Q3q6Q5uMcb7s3IaTZ6lHY5f70H6YGLp7QDx9T0kSRtr5V9wLbZxw1N/fqbAHIEXsj1saQR+M8BCdg8icbJaHOJBqo3r1KfMuJdyuBZb2NT2R5a5l108JuFl1CHuJ9q4NjceHgncefSN9LoPcYskT9pYIfA9Al+Z3X4xzUdz3H74RbODWlGGeCYPcVf4jksz08HHId6k63USFK7ObuOia3rYHkdyavlR+267GwAAAABJRU5ErkJggg==',
                                   about:        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3EAAAAAElFTkSuQmCC',
                                   info:         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKcSURBVDjLpZPLa9RXHMU/d0ysZEwmMQqZiTaP0agoaKGJUiwIxU0hUjtUQaIuXHSVbRVc+R8ICj5WvrCldJquhVqalIbOohuZxjDVxDSP0RgzyST9zdzvvffrQkh8tBs9yy9fPhw45xhV5X1U8+Yhc3U0LcEdVxdOVq20OA0ooQjhpnfhzuDZTx6++m9edfDFlZGMtXKxI6HJnrZGGtauAWAhcgwVnnB/enkGo/25859l3wIcvpzP2EhuHNpWF9/dWs/UnKW4EOGDkqhbQyqxjsKzMgM/P1ymhlO5C4ezK4DeS/c7RdzQoa3x1PaWenJjJZwT9rQ1gSp/js1jYoZdyfX8M1/mp7uFaTR8mrt29FEMQILr62jQ1I5kA8OF59jIItVA78dJertTiBNs1ZKfLNG+MUHX1oaURtIHEAOw3p/Y197MWHEJEUGCxwfHj8MTZIcnsGKxzrIURYzPLnJgbxvG2hMrKdjItjbV11CYKeG8R7ygIdB3sBMFhkem0RAAQ3Fuka7UZtRHrasOqhYNilOwrkrwnhCU/ON5/q04vHV48ThxOCuoAbxnBQB+am65QnO8FqMxNCjBe14mpHhxBBGCWBLxD3iyWMaYMLUKsO7WYH6Stk1xCAGccmR/Ozs/bKJuXS39R/YgIjgROloSDA39Deit1SZWotsjD8pfp5ONqZ6uTfyWn+T7X0f59t5fqDhUA4ry0fYtjJcWeZQvTBu4/VqRuk9/l9Fy5cbnX+6Od26s58HjWWaflwkusKGxjm1bmhkvLXHvh1+WMbWncgPfZN+qcvex6xnUXkzvSiYP7EvTvH4toDxdqDD4+ygT+cKMMbH+3MCZ7H9uAaDnqytpVX8cDScJlRY0YIwpAjcNcuePgXP/P6Z30QuoP4J7WbYhuQAAAABJRU5ErkJggg==',
                                   rate:         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIwSURBVDjLlZLNS5RRFMafe9/3vjPOjI1jaKKEVH40tGgRBWEibfoPQoKkVdtoEQQF4T/QqkVtWrSTFrVsF1FgJbWpIAh1k2PNh+PrfL4f95zTQk0HHKkDD/cc7vP8uHCuEhF0q/KnmXNgGR248PZFN4/GISXMC8L89DBPV0Dp4/SsazJjrtfb9/vdxfn/BgjzY5M8Aq8nBya+V3h93vtnQHFxat4kszntJAAAxus1YvnZQV5V/jyTEZarwnwFLGeFZdT0ZFOJdD84qoCDOpQ7grZfRNj020JSEOKvwvxGiF+q0tL0N5PuO+Mk0nC0B0BDsYCCImyzAIktBBloMwKJLSgKYcMAcdhC2KpVlIig+H5qxcv0n0xmj4Gbq+BwC2wtJLbgHUlMEFJwUpMIGpto16u+kJzSACAk+WCzvNbe+AVljkOYIcQQou3TbvdOJo+g4aNdqzaF+PT43HJVA8DQpcVIiPPtaqlEUQzlDELsTpgYwgTAQIjQqlUCtpQfn1spdmxh+PJSQyw9CrbKgM7tvcISQAxlBhC3GuCYXk3cWP25m3M7dk88qbWBRDVApaATOSjPBdXXwYEP5QyCgvjE/kwHgInHtHYBnYA2owhrPiiuw0sOw3EZFEagIB7qChDiYaUcNIoFtP1KxCTPhWiDw7WbXk9vKpnOgsI4exjg6Mbq96YQPxm79uPOvqvbXx4O3KrF6w8osv2df17kr5YXJq7vnw/S0v3k7Ie7xtud/wAaRnP+Cw8iKQAAAABJRU5ErkJggg==',
                                   rateInactive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMzQjU3MzhFQ0E3NTExREY5ODI2OUM3MEFGQzRDOTUxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMzQjU3MzhGQ0E3NTExREY5ODI2OUM3MEFGQzRDOTUxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzNCNTczOENDQTc1MTFERjk4MjY5QzcwQUZDNEM5NTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzNCNTczOERDQTc1MTFERjk4MjY5QzcwQUZDNEM5NTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7hhwpPAAABqElEQVR42oxTMU/CUBB+LW1JCYmii3ExWkCJEAf/g//AsLi6Ggdnw39wcXFwMw46uroRFha7QSdl0ChxKFhaoH5f5ZnaUOIll3vv7r7v7t21ShiGIk0cx9mH2bAs6y4tRxULBOQ30KtFOakE3W63nslkitDlTqfTSMtT0p4Agn42my0oiiKGw2EAV75cLvv/6gDghqZpBVX9CeOsT6fT67kdIDkPe4hODmD3ODQAclAxHo/FZDIRhmEI3/dFEARfyOtBn5D3CHtPAhvJu6wmK1IIHo1GHKTAHISu65EfnUSkjEPfoxmAxEHCFpMIYgL9VALkmWKaJjthR5+4WupsXRUAX9gm242DZ/FIY+AB3DvVarUfEZRKJU63gsAbQexEVpSW26Agx2NBgF//bAErcgG+YAW+OU5AJSnfjfNDrVZ7ljgtsZVtVmIXJOEmZlWjufCO2GYcoCU+3aLcBmfBiiRLzGVtEcE6red53AbncgvfB0DHeEKOz8B5KZUAsuq67gCgSwzpLOY/bbfbJ/ikzxFbSf5xv2rb9lH8Pk9brVa92Wwa8v4twAA+80jveYzAagAAAABJRU5ErkJggg==',
                                   accept:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLpZPrS1NhHMf9O3bOdmwDCWREIYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW/n7MVMEiN64AsPD8/n83uucQDi/id/DBT4Dolypw/qsz0pTMbj/WHpiDgsdSUyUmeiPt2+V7SrIM+bSss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7vWO1D40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6+TwphA5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP5CyYD+UkG08+xt+4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU/rH5HW3PLsEwUYy+YCcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo+V3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptwQG+UAa7Ct3UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K+6kW49DKqS2DrEZCtfuI+9GrNHg4fMHVSO5kE7nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEptIOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXOIvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2+FxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag5YUFKl6Yrciw0VOlhOivv/Ff8wtn0KzlebrUYwAAAABJRU5ErkJggg==',
                                   cancel:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLpZNraxpBFIb3a0ggISmmNISWXmOboKihxpgUNGWNSpvaS6RpKL3Ry//Mh1wgf6PElaCyzq67O09nVjdVlJbSDy8Lw77PmfecMwZg/I/GDw3DCo8HCkZl/RlgGA0e3Yfv7+DbAfLrW+SXOvLTG+SHV/gPbuMZRnsyIDL/OASziMxkkKkUQTJJsLaGn8/iHz6nd+8mQv87Ahg2H9Th/BxZqxEkEgSrq/iVCvLsDK9awtvfxb2zjD2ARID+lVVlbabTgWYTv1rFL5fBUtHbbeTJCb3EQ3ovCnRC6xAgzJtOE+ztheYIEkqbFaS3vY2zuIj77AmtYYDusPy8/zuvunJkDKXM7tYWTiyGWFjAqeQnAD6+7ueNx/FLpRGAru7mcoj5ebqzszil7DggeF/DX1nBN82rzPqrzbRayIsLhJqMPT2N83Sdy2GApwFqRN7jFPL0tF+10cDd3MTZ2AjNUkGCoyO6y9cRxfQowFUbpufr1ct4ZoHg+Dg067zduTmEbq4yi/UkYidDe+kaTcP4ObJIajksPd/eyx3c+N2rvPbMDPbUFPZSLKzcGjKPrbJaDsu+dQO3msfZzeGY2TCvKGYQhdSYeeJjUt21dIcjXQ7U7Kv599f4j/oF55W4g/2e3b8AAAAASUVORK5CYII='
                               },
                        starImg: {
                                     0:  'http://www.cache-contest.com/tpl.cc/images/rating_inactive.png',
                                     10: 'http://www.cache-contest.com/tpl.cc/images/rating_1.png',
                                     15: 'http://www.cache-contest.com/tpl.cc/images/rating_15.png',
                                     20: 'http://www.cache-contest.com/tpl.cc/images/rating_2.png',
                                     25: 'http://www.cache-contest.com/tpl.cc/images/rating_25.png',
                                     30: 'http://www.cache-contest.com/tpl.cc/images/rating_3.png',
                                     35: 'http://www.cache-contest.com/tpl.cc/images/rating_35.png',
                                     40: 'http://www.cache-contest.com/tpl.cc/images/rating_4.png',
                                     45: 'http://www.cache-contest.com/tpl.cc/images/rating_45.png',
                                     50: 'http://www.cache-contest.com/tpl.cc/images/rating_5.png'
                                 },
                        version:        '0.7',
                        defaultLang:    'de',
                        apiUrl:         'http://www.cache-contest.com/cc_srv_gmapi.php',
                        updateUrl:      'http://userscripts.org/scripts/show/86973',
                        updateInterval: 1000*60*60*24*2
                     };

////////// Language-packs //////////////////////////////////////////////////////

var LanguagePack = {};

LanguagePack.de = {
    firstStart:          'Dies scheint deine erste Benutzung des Cache-Contest-Scripts zu sein. Bitte konfiguriere es nun.',
    linkToContest:       'Zum Contest',
    linkRate:            'Jetzt Bewerten',
    linkLogFirst:        'Du musst den Cache erst finden und loggen, um abstimmen zu können.',
    linkOwnCache:        'Du kannst deinen eigenen Cache nicht bewerten.',
    linkAlreadyRated:    'Du hast bereits abgestimmt.',
    linkContestEnded:    'Der Contest ist beendet.',
    linkContestInfo:     'Contest-Info',
    linkConfig:          'Einstellungen',
    linkAbout:           'Über CC-GM',
    configYourLanguage:  'Deine Sprache (Änderung erfordert Neuladen der Seite):',
    configYourPassword:  'Dein Passwort für cache-contest.com',
    configSaved:         'Deine Daten wurden gespeichert!',
    configAllFields:     'Bitte fülle alle Felder korrekt aus!',
    infoContestName:     'Contest-Name',
    infoContestDuration: 'Laufzeit',
    infoRating:          'Aktuelle Wertung: ',
    infoRank:            'Position',
    loginFailed:         'Login fehlgeschlagen',
    ok:                  'OK',
    cancel:              'Abbrechen',
    newUpdateAvailable:  'Es ist ein neues Update verfügbar. Update-Seite öffnen?'
};

LanguagePack.en = {
    firstStart:          'This seems to be your first use of the Cache-Contest-Script. Please configure it now.',
    linkToContest:       'Visit contest',
    linkRate:            'Rate now',
    linkLogFirst:        'You have to find and log the cache, in order to rate.',
    linkOwnCache:        'You cannot rate your own cache.',
    linkAlreadyRated:    'You have already rated this cache.',
    linkContestEnded:    'The contest is over.',
    linkContestInfo:     'Contest-Info',
    linkConfig:          'Configuration',
    linkAbout:           'About CC-GM',
    configYourLanguage:  'Your language (Change requires reloading the page):',
    configYourPassword:  'Your password for cache-contest.com',
    configSaved:         'Your data was stored!',
    configAllFields:     'Please fill in all fields correctly!',
    infoContestName:     'Contest-Name',
    infoContestDuration: 'Duration',
    infoRating:          'Current rating: ',
    infoRank:            'Position',
    loginFailed:         'Login failed',
    ok:                  'OK',
    cancel:              'Cancel',
    newUpdateAvailable:  'There is a new update available. Visit update-page?'
};

////////// Classes /////////////////////////////////////////////////////////////

/**
 * $-function
 * 
 * Shortcut for document.getElementById()
 */
function $(element) {
    return document.getElementById(element);
}

/**
 * lang
 * 
 * Shortcut for Language.lang()
 */
function lang(langString) {
    return Language.getInstance().lang(langString);
}

/**
 * debug
 * 
 * If Configuration.debug is true, this function will output debug-info.
 */
function debug(message, loc) {
    if (Configuration.debug) {
        var debugMsg = '\n\n';
        if (loc) {
            debugMsg += '>>>  ' + loc + '\n\n';
        }
        debugMsg += message;
        GM_log(debugMsg);
    }
}

/**
 * inArray
 * 
 * Extends Array() with inArray()-method.
 */
Array.prototype.inArray = function(needle) {
    for (var i=0; i < this.length; i++) {
        if (this[i] === needle) {
            return true;
        }
    }
    return false;
}

/**
 * Language
 * 
 * The i18n-class, handles language-packs and language-strings.
 * Implements singleton-pattern.
 */
var Language = (function () {
    var instance = null;
    
    var PrivateConstructor = function () {
        var userLanguage = null;
        
        this.setLanguage = function (language) {
            language = language.toLowerCase();
            if (this.getLanguageList().inArray(language)) {
                userLanguage = language;
                return true;
            } else {
                return false;
            }
        }
        
        this.getLanguage = function () {
            if (!userLanguage) {
                return Configuration.defaultLang;
            } else {
                return userLanguage;
            }
        }
        
        this.getLanguageList = function () {
            var resultArray = [];
            for (language in LanguagePack) {
                resultArray.push(language);
            }
            return resultArray;
        }
        
        this.lang = function (langString) {
            var language = LanguagePack[this.getLanguage()][langString];
            if (undefined == language) {
                return LanguagePack[Configuration.defaultLang][langString];
            } else {
                return language;
            }
        }
    }
    
    return new function() {
        this.getInstance = function () {
            if (null == instance) {
                instance = new PrivateConstructor();
                instance.constructor = null;
            }
            return instance;
        }
    }
})();

/**
 * Event
 * 
 * The event-class for the observer-pattern.
 */
function Event(sender) {
    var _sender = sender;
    var _listeners = [];

    this.attach = function (listener) {
        _listeners.push(listener);
    }
    
    this.notify = function (args) {
        for (var i = 0; i < _listeners.length; i++) {
            _listeners[i](_sender, args);
        }
    }
}

/**
 * CcModel
 * 
 * The model-class, provides methods for basic user-handling and api-interaction.
 */
function CcModel() {
    var _this = this;
    var cacheData = {};
    
    this.dataChanged = new Event(this);
    
    this.getIsContest = function () {
        if (_this.cacheData.isContest) {
            return true;
        } else {
            return false;
        }
    }
    
    this.getCurrentVote = function () {
        return _this.cacheData.currentVote;
    }
    
    this.getContestLink = function () {
        return _this.cacheData.contestLink;
    }
    
    this.getContestName = function () {
        return _this.cacheData.contestName;
    }
    
    this.getContestFrom = function () {
        return _this.cacheData.contestFrom;
    }
    
    this.getContestUntil = function () {
        return _this.cacheData.contestUntil;
    }
    
    this.getCurrentRank = function () {
        return _this.cacheData.currentRank;
    }
    
    this.getLoginCorrect = function () {
        return _this.cacheData.loginCorrect;
    }
    
    this.getCanRate = function () {
        return _this.cacheData.canVote;
    }
    
    this.getGcCode = function () {
        return $('ctl00_uxWaypointName').innerHTML;
    }
    
    this.getHasFound = function () {
        if ($('ctl00_ContentBody_uxStatusInformation')
            && -1 != $('ctl00_ContentBody_uxStatusInformation').innerHTML.search('/images/stockholm/16x16/check.gif')) {
            return true;
        } else {
            return false;
        }
    }
    
    this.getIsOwner = function () {
        if (-1 != document.getElementsByClassName('CacheDetailNavigationWidget')[0].innerHTML.search('/images/stockholm/16x16/add_image.gif')) {
            return true;
        } else {
            return false;
        }
    }
    
    this.getUsername = function () {
        var username = $('ctl00_LoginUrl').parentNode.firstChild.nextSibling.innerHTML;
        if ('Log in' != username) {
            return username;
        } else {
            return false;
        }
    }
    
    this.getPassword = function () {
        var password = GM_getValue(_this.getUserHash() + 'pwd');
        if (undefined == password || '' == password) {
            return false;
        } else {
            return password;
        }
    }
    
    this.setPassword = function (password) {
        GM_setValue(_this.getUserHash() + 'pwd', password);
    }
    
    this.getLanguage = function () {
        var language = GM_getValue(_this.getUserHash() + 'lang');
        if (undefined == language || '' == language) {
            return navigator.language;
        } else {
            return language;
        }
    }
    
    this.setLanguage = function (langCode) {
        langCode = langCode.toLowerCase();
        if (Language.getInstance().getLanguageList().inArray(langCode)) {
            GM_setValue(_this.getUserHash() + 'lang', langCode);
        }
    }
    
    this.getUserHash = function () {
        return hash(_this.getUsername());
    }
    
    var hash = function (data, n) {
        var norm = Math.pow(2, -32);
        var a = 2095533;
        var s = 0, c = 1;
        var t, t0 = 0;
        var n0 = 1000000000;
        
        data = data.toString();
        for (var i = 0; i < data.length; i++) {
            s -= data.charCodeAt(i) * 65537 * norm;
            if (s < 0) {
                s += 1;
            }
            t = a * s + c * norm;
            t0 = s = t - (c = t | 0);
            t = a * s + c * norm;
            s = t - (c = t | 0);
        }
        
        if (n) {
            return Math.floor(n * (s + t0 * norm));
        } else if (0 == n) {
            return s + t0 * norm;
        } else {
            return Math.floor(n0 * (s + t0 * norm));
        }
    }
    
    this.setApiRequest = function (vote) {
        var dataString = '';
        if (vote) {
            dataString += 'action=vote&vote=' + escape(vote);
        } else {
            dataString += 'action=getinfo';
        }
        dataString += '&username=' + escape(_this.getUsername());
        dataString += '&password=' + escape(_this.getPassword());
        dataString += '&gccode=' + escape(_this.getGcCode());
        
        debug('dataString: ' + dataString, 'CcModel.setApiRequest()');
        
        GM_xmlhttpRequest({
            method: "POST",
            url: Configuration.apiUrl,
            data: dataString,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function (response) {
                    debug('response.responseText: ' + response.responseText, 'CcModel.setApiRequest.GM_xmlhttpRequest()');
                    
                    _this.cacheData = eval('(' + response.responseText + ')');
                    _this.dataChanged.notify();
                }
        });
    }
    
    this.checkUpdate = function () {
        var currentTimestamp = (new Date()).getTime();
        
        if (!GM_getValue('lastUpdateCheck')) {
            GM_setValue('lastUpdateCheck', currentTimestamp.toString());
        }
        
        var lastUpdateTimestamp = parseInt(GM_getValue('lastUpdateCheck'));
        
        debug('Last update-check: ' + lastUpdateTimestamp + ' (' + (new Date(lastUpdateTimestamp)).toGMTString() + ')\n' +
              'Current time:      ' + currentTimestamp + ' (' + (new Date(currentTimestamp)).toGMTString() + ')\n' +
              'Update necessary:  ' + (currentTimestamp > lastUpdateTimestamp + Configuration.updateInterval)
              , 'CcModel.checkUpdate()');
        
        if (currentTimestamp > lastUpdateTimestamp + Configuration.updateInterval) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: Configuration.updateUrl,
                onload: function (response) {
                        GM_setValue('lastUpdateCheck', currentTimestamp.toString());
                        
                        var result = response.responseText.match(/<b>Version:<\/b>\s*([.0-9]*)\s*<br\ \/>\s*<b>Copyright:<\/b>/);
                        
                        if (result && Configuration.version < parseFloat(result[1])) {
                            debug('Update available.\n' + 'local version:  ' + Configuration.version + '\nserver version: ' + parseFloat(result[1]), 'CcModel.checkUpdate.GM_xmlhttpRequest()');
                            
                            if (confirm(lang('newUpdateAvailable'))) {
                                GM_openInTab(Configuration.updateUrl);
                            }
                        } else {
                            debug('No update available.\n' + 'local version:  ' + Configuration.version + '\nserver version: ' + parseFloat(result[1]), 'CcModel.checkUpdate.GM_xmlhttpRequest()');
                        }
                    }
            });
        }
    }
    
    this.checkModel = function () {
        if (Configuration.debug) {
            debug('GC-Code:   ' + _this.getGcCode() + '\n' +
                  'Has found: ' + _this.getHasFound() + '\n' +
                  'Is owner:  ' + _this.getIsOwner() + '\n' +
                  'Username:  ' + _this.getUsername() + '\n' +
                  'UserHash:  ' + _this.getUserHash() + '\n' +
                  'Password:  ' + (_this.getPassword() ? '******** (hidden)' : 'false') + '\n' +
                  'Language:  ' + _this.getLanguage()
                  ,'CcModel.checkModel()');
        }
    }
}

/**
 * CcView
 *
 * The view-class, handles all html-output and some logic.
 */
function CcView(model, ctrl) {
    var _this = this;
    var _model = model;
    var _ctrl  = ctrl;
    
    this.init = function () {
        debug('Init view', 'CcView()');
        
        addStyles();
        _model.dataChanged.attach(_this.update);
    }
    
    this.update = function () {
        if (_model.getIsContest()) {
            renderContainer();
            renderStars(_model.getCurrentVote());
            renderLinkBox();
        }
    }
    
    var addStyles = function () {
        // Add styles
        GM_addStyle('#cc_vote_container {float: right; width: 30%; text-align: center;}');
        GM_addStyle('#cc_vote_stars {display: block; margin: auto;}');
        GM_addStyle('#cc_vote_links span {cursor: pointer; margin: 4px;}');
        GM_addStyle('#cc_vote_links span img {padding-top: 4px;}');
    }
    
    var renderContainer = function () {
        if ($('cc_vote_container')) {
            $('cc_vote_container').parentNode.removeChild($('cc_vote_container'));
        }
        
        var container = document.createElement('div');
        container.setAttribute('id', 'cc_vote_container');
        $('ctl00_ContentBody_LatLon').parentNode.parentNode.insertBefore(container, $('ctl00_ContentBody_LatLon').parentNode);
    }
    
    var createLink = function (callback, title, image, text) {
        var link = document.createElement('span');
        
        link.addEventListener('click', callback, false);
        
        if (title) {
            link.setAttribute('title', title);
        }
        
        if (image) {
            var linkImg = document.createElement('img');
            linkImg.setAttribute('src', image);
            linkImg.setAttribute('alt', '');
            link.appendChild(linkImg);
        } else if (text) {
            link.innerHTML = text;
        }
        
        return link;
    }
    
    var renderStars = function (stars) {
        if (!$('cc_vote_container') || !_model.getLoginCorrect()) {
            return false;
        }
        
        if (undefined == stars || stars < 0 || stars > 5) {
            stars = 0;
        }
        
        if (!$('cc_vote_stars')) {
            var starImg = document.createElement('img');
            starImg.setAttribute('alt', '');
            starImg.setAttribute('id', 'cc_vote_stars');
            $('cc_vote_container').appendChild(starImg);
        }
        
        var starValue = Math.floor(stars * 2 + 0.5) * 5;
        
        $('cc_vote_stars').setAttribute('src', Configuration.starImg[starValue]);
        $('cc_vote_stars').setAttribute('title', lang('infoRating') + stars);
    }
    
    var renderLinkBox = function () {
        if (!$('cc_vote_container')) {
            return;
        }
        
        var linkBox = document.createElement('div');
        linkBox.setAttribute('id', 'cc_vote_links');
        $('cc_vote_container').appendChild(linkBox);
        
        if (!_model.getLoginCorrect()) {
            $('cc_vote_links').innerHTML = lang('loginFailed');
            $('cc_vote_links').appendChild(createLink(_ctrl.actionConfig, lang('linkConfig'), Configuration.icons.config));
            return;
        }
        
        $('cc_vote_links').appendChild(createLink(_ctrl.actionVisitContest, lang('linkToContest'), Configuration.icons.visitpage));
        
        if (_model.getIsOwner()) {
            $('cc_vote_links').appendChild(createLink(function(){}, lang('linkOwnCache'), Configuration.icons.rateInactive));
        } else if (!_model.getHasFound() && _model.getCanRate()) {
            $('cc_vote_links').appendChild(createLink(function(){}, lang('linkLogFirst'), Configuration.icons.rateInactive));
        } else if (_model.getHasFound() && !_model.getCanRate() && '' == _model.getCurrentRank()) {
            $('cc_vote_links').appendChild(createLink(function(){}, lang('linkAlreadyRated'), Configuration.icons.rateInactive));
        } else if (_model.getCanRate()) {
            $('cc_vote_links').appendChild(createLink(renderVoteBox, lang('linkRate'), Configuration.icons.rate));
        } else {
            $('cc_vote_links').appendChild(createLink(function(){}, lang('linkContestEnded'), Configuration.icons.rateInactive));
        }
        
        $('cc_vote_links').appendChild(createLink(_ctrl.actionContestInfo, lang('linkContestInfo'), Configuration.icons.info));
        $('cc_vote_links').appendChild(createLink(_ctrl.actionConfig, lang('linkConfig'), Configuration.icons.config));
        $('cc_vote_links').appendChild(createLink(_ctrl.actionAbout, lang('linkAbout'), Configuration.icons.about));
    }
    
    var renderVoteBox = function () {
        if (!$('cc_vote_container') || $('cc_vote_choice')) {
            return;
        }
        
        var j = $('cc_vote_links').childNodes.length;
        for (var i = 0; i < j; i++) {
            $('cc_vote_links').removeChild($('cc_vote_links').childNodes[0]);
        }
        
        var rateDropdown = document.createElement('select');
        rateDropdown.setAttribute('id', 'cc_vote_choice');
        rateDropdown.setAttribute('size', '1');
        
        for (var i = 0.5; i <= 5; i += 0.5) {
            var dropdownItem = document.createElement('option');
            dropdownItem.innerHTML = i;
            rateDropdown.appendChild(dropdownItem);
        }
        $('cc_vote_links').appendChild(rateDropdown);
        
        $('cc_vote_links').appendChild(createLink(_ctrl.actionRate, lang('ok'), Configuration.icons.accept));
        $('cc_vote_links').appendChild(createLink(_this.update, lang('cancel'), Configuration.icons.cancel));
    }
}

/**
 * CcController
 *
 * The controller-class, provides action-callback-methods and basic logic.
 */
function CcController() {
    var _model;
    var _view;
    var _this = this;
    
    this.init = function () {
        debug('Init controller\nScript-version: ' + Configuration.version, 'CcController()');
        
        _model = new CcModel();
        _view  = new CcView(_model, _this);
        
        _model.checkModel();
        _model.checkUpdate();
        
        if (_model.getUsername()) {
            Language.getInstance().setLanguage(_model.getLanguage());
            if (!_model.getPassword()) {
                alert(lang('firstStart'));
                _this.actionConfig();
            }
            
            _view.init();
            _model.setApiRequest();
        }
    }
        
    this.actionAbout = function () {
        alert('Cache-Contest-GM\nVersion: ' + Configuration.version + '\n\nWritten by SammysHP <sven@sammyshp.de>');
    }
        
    this.actionConfig = function () {
        var availLangs = ' (' + Language.getInstance().getLanguageList() + ')';
        
        var langCode = prompt(lang('configYourLanguage') + availLangs, _model.getLanguage());
        var password = prompt(lang('configYourPassword'), '');
        
        if (langCode && '' != langCode
            && Language.getInstance().getLanguageList().inArray(langCode.toLowerCase())
            && password && '' != password) {
            _model.setLanguage(langCode);
            Language.getInstance().setLanguage(langCode);
            _model.setPassword(password);
            alert(lang('configSaved'));
        } else {
            alert(lang('configAllFields'));
        }
    }
        
    this.actionContestInfo = function () {
        var infoString = '';
        infoString += lang('infoContestName') + ': ' + _model.getContestName() + '\n';
        infoString += lang('infoContestDuration') + ': ' + _model.getContestFrom() + ' - ' + _model.getContestUntil() + '\n\n';
        infoString += lang('infoRank') + ': ' + _model.getCurrentRank();
        
        alert(infoString);
    }
    
    this.actionRate = function () {
        var selectedValue = $('cc_vote_choice').value;
        $('cc_vote_links').innerHTML = '. . .';
        _model.setApiRequest(selectedValue);
    }
    
    this.actionVisitContest = function () {
        GM_openInTab(_model.getContestLink());
    }
}

////////// Initialization //////////////////////////////////////////////////////

debug('##############################################\n#      CacheContest-GM session started.      #\n##############################################', 'main()');

var CacheContestGm = new CcController();
window.addEventListener('load', CacheContestGm.init, false);


/*
Changelog:
--- 0.7 ---
    ! Sorry, wrong API-URL

--- 0.6 ---
    ! old API-URL again

--- 0.5 ---
    ! temporary API-URL-change
    ! garbage in update-function
    + better debugging
    
--- 0.4 ---
    ! "is null" in getIsOwner()
    + Contest-page opens in new tab now
    + automatic update

--- 0.3 ---
    * modified license
    + icons now included as base64-encoded string
    ! better recognition of vote-state (owner, found / not found, contest ended, already voted)

--- 0.2 ---
    * completely rewritten
    * now OOP
    ! bugs as result of debug
    ! implement observer-pattern
    ! debug-history / no alert()
    + half-stars
    + rate-function

--- 0.1 ---
    * initial release

* comment
+ added
- removed
! fixed
*/