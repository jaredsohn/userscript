// ==UserScript==
// @name           MageMinds nzbs.org 
// @namespace      http://nowhere.man
// @description    adds new features to nzbs.org
// @license        GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license        (CC); http://creativecommons.org/licenses/by-nc-sa/3.0
// @version        1.0.12
// @author         treas0n
// @author         MageMinds
// @require        http://usocheckup.redirectme.net/89388.js
// @include        http://*nzbs.org/*
// @include        https://*nzbs.org/*
// ==/UserScript==


/* Config */
var markAsHot = 50;
var markAsSuperHot = 150;
var widthCorrection1 = 428; // With 8 columns
var widthCorrection2 = 390; // With 7 columns

/* end Config */

img_new="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEMSURBVDjL3ZLBSgJRFIYvtO0BfIPeI3qBNj2Cy1rWzlWbkcBNYhC0TletJKOFq1lIILhQJCywaDZOkINiGl/n3DNj6LaF4MDHGebc/5tz544D3H9w2yAI3LkQp7UgREJRSIS+0BJqwr6QTzkWulqdD09juD3Ah5PI7r8TiPvw0YJeDUq7cJ83NDzqwmUOFUyYT/ASfasGm6d4kQo1OB3JszN4fTDujuBrqP2hW4baVxbMBIuZTfAeQucGxm/w+WzB6AleGipo/Am06hTrEwQupLhjwkFdtlOFnzlc72n/cFWgQb3WJ8i22a7A44mtCfQQ7BSyL6617BtWZ+kphMKFlwSusrJmW/7ETQt+AQhq/TxibW0lAAAAAElFTkSuQmCC"
img_PC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAItSURBVDjLfVM7bBNBEH27d7alOKfYjsM3gFLjRCAgiAoFBAIhQUNJh0SLqGgpEQW2a6LQ8VGgAAqUBqWk4bAbDEgoNCALJNtJlKDzfZaZ2bNFUJI9zc7d7c57b3ZmlTEGuw3f9x9HUXQjDEOXPMiL9ft99s/UTgDNZnOMAuYLhcL1XG4EAQUhSSC7KaZYLGBp6S3c7YIbjcYlDi6Xywfz+TxWvv8AsyeJQWISAjKICSwIAritViuI4zhLJpsGMtl3u93/JaPT6RJQggsXL8s/l4MnJw+j11sVdsOPYZVGjD+IE6XiGN68foWjlePCzmuigFE5+O68T9sUlKLZTuLZ1tfW8ODWKWH86L8Hq91/5ZpVwFKZlTcWS+PQWkOR6dT4nQFMYhkrMyfl3aRnoFkBfROAhuM4W0ynngcfHjP+9law0KtJWqIgTMujtILjukN28ZwCeVs5y7jw5RE21iNRIQA88YFwCsw4tWdE8rdD4edqlCqwjHfG7yEpWUAmFwCd5sn27ev2HeloRwBsL9hKDRVkMi7u3zwm5QnDCJubgTBksxlKw0j3aWXXYo5MyygKKK+Hy8vvzg4ahXzJ87wprk673Q5IXY5T47jK9AyOHDogivbtnZBm23IX6vX6bQK5Onv6zDnPK+Dli6d/qOZP6Hxm6f/0v13KRmufhwC1Wm2CSvZrbu48Rj2PNsRwHU2g1Y1qtTq6020dXiaS3iH7sLj4/MSg/1PGT7td97+G8aA4FJOt1wAAAABJRU5ErkJggg=="
img_game = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHBSURBVDjLlVM9aMJQEP6eNEF0sbiUouLgoLRkKXS1IG4dC6Xg2LXQRXATHbqVzq4iQjc3sVscnUSnYIdIB9GC4L/xL333IEFsBj04jpf77nt3l+8x0zRxaMViMbTdbtXVahVer9dYLBY/0+k0mcvltEPsGRzMMIyPQCAQ9ng8IAJd14OdTuedp+4PsS4ngslkctFoNNBsNgWB2+3GaDQKOWEdCTgY2WyW9Xo9QbBcLoUfTSDLsoiMMUFgkRxNwHeAdDpt+nw+8EUKp29O5rhEvnEoigJJktBqteD3+0/rgINNulHTNCjzGR5++1Bvb67x+vLF/dmxg3K5HOZB2+12MncxfzAYxJ25wcXjE5ixZCu9m/wufybfUqnLUqmUtwmomAtKi0ajcrVaxWAwQKFQEHOfK1dQajUwrwdSrw8ZEiKRSC4ej0NV1TwjJXI2IxaLyZwA4/FYFHL12T6fz+3o9XrhcrmQyWTQbreZ6IAnZS5dVCoVEpFYmFVEPpvNxJm+0zmRSIhoj0AJunU4HNogq3C/EwtHuqBfaxNQkhJ8NpGwAPtxs9n8c5ug2+2iXq/bojl0S41URKPuv2Dm9JxPsT8W0mO2IJm2EgAAAABJRU5ErkJggg=="
img_music = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==";
img_film = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZNPaBNBGMXfbrubzBqbg4kL0lJLgiVKE/AP6Kl6UUFQNAeDIAjVS08aELx59GQPAREV/4BeiqcqROpRD4pUNCJSS21OgloISWMEZ/aPb6ARdNeTCz92mO+9N9/w7RphGOJ/nsH+olqtvg+CYJR8q9VquThxuVz+oJTKeZ63Uq/XC38E0Jj3ff8+OVupVGLbolkzQw5HOqAxQU4wXWWnZrykmYD0QsgAOJe9hpEUcPr8i0GaJ8n2vs/sL2h8R66TpVfWTdETHWE6GRGKjGiiKNLii5BSLpN7pBHpgMYhMkm8tPUWz3sL2D1wFaY/jvnWcTTaE5DyjMfTT5J0XIAiTRYn3ASwZ1MKbTmN7z+KaHUOYqmb1fcPiNa4kQBuyvWAHYfcHGzDgYcx9NKrwJYHCAyF21JiPWBnXMAQOea6bmn+4ueYGZi8gtymNVobF7BG5prNpjd+eW6X4BSUD0gOdCpzA8MpA/v2v15kl4+pK0emwHSbjJGBlz+vYM1fQeDrYOBTdzOGvDf6EFNr+LYjHbBgsaCLxr+moNQjU2vYhRXpgIUOmSWWnsJRfjlOZhrexgtYDZ/gWbetNRbNs6QT10GJglNk64HMaGgbAkoMo5fiFNy7CKDQUGqE5r38YktxAfSqW7Zt33l66WtkAkACjuNsaLVaDxlw5HdJ/86aYrG4WCgUZD6fX+jv/U0ymfxoWVZomuZyf+8XqfGP49CCrBUAAAAASUVORK5CYII="
img_tv = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJKSURBVDjLdZJNSFRRFIC/82YazQJpkVgbQV9aU23cuQtatIxaREi4C9zmQvrBpEUGLtvnQkqIVi0jgmzjT5PWZJYwIiEG2iInnR/ffeeeFuNMjtaFwz1wz/fde+69Ymb03Z1Ine88uZxMSuP84lo4PtKb5x/j0rX7zafPtee2torlxWymY/rVWCRmBlAneZ/9Hk6M9tVJLl693dx5tiNXKBbLix9nOzJvnkUANQHAjTtPU+n248uYNc7MLIYvnwzkAS5cvtUcnjmVKxZK5a+fZzvm3z6PqkydAODKzceprs4TOfXx4Q/Tc2EUFelMd+UK26XSty+Z8NO7F9HeejEzBgcHHwD3qjIzo6WlJQGgqnjvWV9fVzPDzFBVCoXCw/Hx8eHkLjAUXn8k+y/NDNTAe8OXNLH221FSMODXWO8QMBwANDU1ScsRIZCDcKzGj7xjNe+IvZAQCADnnEAlx8xoTELrUSEZ/IXLkbK6GbEVeRIiJIIKEIigqtQEzjmcVsBjjYJIBf65HWOeXVgIEAIRAqMmSAJEUUTkgd2dU2LkywoIIkYAeKOSG3jZJ1BVnFaK1Hu2nKcpFeDUCAJQBcQQE6qPXieI45gdNcxDKTbUV/o8lDBiJ3VwNbz39S0UdgznoeSMWEHNUBNMKmf2tgfG6gUNDQ1svh5lZWWFkaUlBtracM6RTqdZmJuju7ubqakpenp6mJycJAzDWgtiZvT391trayuq+t/w3tdm7z3ZbJZMJiNJgI2NDRYWFmqL3nvM7EBe/crVvwPwB5ahnKoTKjg4AAAAAElFTkSuQmCC";
img_foreign = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC50lEQVQ4jX2STWgcBRxH387Mzuxks0k6adN0U7dpsm2WdbWJLYIoKF6Cnhos9CSWiiL0VgteClIUL0LxKnhSoQd7UZRCUCyIxIPYYNq0GuNO0o9NsrvZmZ2d7y8vVvdQffCD/+HxTn+R/2by1MLJE/sOjJc3dF0E2v/j/svrb7/58a3VX9LbW83U9MI0TdP0rU+/SRfeuZSeeHryCpDr98V/rrG5yrvvnWxOHpo6ftNTabS3WdQ7HBke4Iff66ijj1GZm6tNTEgXV3++8x2w2R8Y+eDyubtDwzampDGUzTAqdvH2VFlabxDGEKYpEQm1ozIFRT57e2X9M6AjApx//9LSi0+Mjt9PAvKqRPmAwNTxeQ7vHyGrHcSzLOzAxfVF5J6PurdMfa2+YBvtjwSg+FTlyKzp7qKIFsWixuCxVzk8eIiDA3sYUgSkJEPqhCSOx5o1wCtlhQtn5kvArDTz0munUjFCdwRApSs+z34KbAEWsNPs0bY9HD8mjCPiREAr5Dg6Mw1wWhrLq9P1nQfUvVmK4yk5X2FHN9hVZXqdLnqjQdcwSQKPJAwpaRLZQRFPtwDKUtBrRhudZyjtu0678ywF6RZWay9OBJ7r0LRdMrZNPvAIAx/DhB+XV1nRXYBIWr+xdKP63DwbRg0tt8VmUwPZxHIdkigiiQPSMEaIA+Q4wDF9rreyGJstgBWhtf3ganPjN3Bd2o7CVPwtlfhLKvIyuaRF7PkkgU/su7ihh+DbRIHAHzd/BfhcBCLX6tRK1WPVvNjDN9bYMV1Cy0D11hjOp0S+QxoGxF4AoQtmm+8Xr/0EXBYBurutLzKhe1ErzgiqLKNg4wURMVnUMESLLLqOSOwHKIHN11ev4Pv+DBBm+t56ZLpauz/3wssDTxbztA0dMZMlkxEwPIkwUrC277F47Stsx50G/gToDzzkw8rjtQuliTFyhUFcT8DYbXFPX6fRaHwCvNEvPyrwkOrfk4A7wPKjpL8AI0llJOxVRtYAAAAASUVORK5CYII="
img_misc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC4SURBVCjPdZFbDsIgEEWnrsMm7oGGfZrohxvU+Iq1TyjU60Bf1pac4Yc5YS4ZAtGWBMk/drQBOVwJlZrWYkLhsB8UV9K0BUrPGy9cWbng2CtEEUmLGppPjRwpbixUKHBiZRS0p+ZGhvs4irNEvWD8heHpbsyDXznPhYFOyTjJc13olIqzZCHBouE0FRMUjA+s1gTjaRgVFpqRwC8mfoXPPEVPS7LbRaJL2y7bOifRCTEli3U7BMWgLzKlW/CuebZPAAAAAElFTkSuQmCC"
img_xxx = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIpSURBVDjLpZNdaFJhGMcX9EExPVNn3Xcd3Ui3urnJbK4guiioiyjKPFm2QRSINZl2RDuprTZNaTLQ06ajizVhDILW+tpmYxXW6mKNXTSKGS2Xm+foP18vBjLRoosfLzzv//nxPC+8NQBq/oeyRfpAvYXVStMeXR2cWgoWtWT1hEJu+yuBXiG92nNYkg8cl8JfoPuoBEwrhXalOK/bL7NWFXRrqSSrEYNR1YJRi8DoJLC3yXGlUYqTCupnVQGjrIVLU4/RrmN4F7Ph85gfj90GXNDshaOByvdfO7SjqiCzMIVfk31YnuKwnBjE0qswUvMJuNQU3obo7RUFDpUol5qMIDUTQ3p2sEAU36ajSCU4uJrqhIor7NGFt9mVYv514CLWpoPIvH9U5PdMGM/vnoKjSb4m1wR2lhXIW7nibp2q3eCffMK4z1gCP/YB5uZ9IBmZ2rerRCA7OLCFnG/OMPCdbUAu/hHCracQrCMQLEMQbnDI9Y4g2HEEJEOyVGPv1pIJyEV2dBzpoQkIwWfgncPgLRyynWEIbBRZsw+CNwrhXmhDsiEgIxb3vd2HOdqNjDOGdWsY39vv4IvJidXrfqx3sJg7bUOmJ1LMkp5NghVXAMl2LxZNbnw1schc9mDF6MAizWBJb0fyEosfN/2bBS/uGxOkED9nz0/oHeDNkbKQ0eP6LoFkCz2zJW8w/9AgCrXQHq7NNEyC5ehvPv/yQQvtXRgwiCr+xn/hD7c3w4UciyonAAAAAElFTkSuQmCC"
img_download = "data:image/png;base64,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"
img_mynzb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALGSURBVDjLpZNdSNNRGMZ330V2GXXVRXVTICRd2IVIIFGSoJDWRUssRREJiswP1La16aab3x8tyoWl+T11tqmYmJbZh61pfvWFKZmoqZmp236dv1MxKrrowMP5n/95n+d5z3veIwNk/4PND1dz8z5nY2P0al1d0nJVVdhSebnXxt5cYeGO2ezsmGmtduyLUtnxOTn5+C8CLosl1tnQMONsseJsa2WlvpbF0lLHgtHoPVdQsHfWYLB/M91mtbuTH1YL0+lqxuLi7nyIitomkQOd5jrcQwMwMgQDDhgdZqW9jbn8/I8zen3/ktjHYYdHD0GISDEz+kzeyuVK2arZbHU/fwovn0FTI5jNUFMj1r24ertxdgpSbw/cugU3b0JREZSZcD59zHBo6Lhsubr6k3tkEKzNUCecagW5shLu3vUIPmgCo1GgBAoKBPIg24DrSRdvgoIWZKJYX9yD/VAvyBUVUH4PTCaPY8k6KU+QcnIEUQ8ZGaBR4+psp//YsTnZosk06nK8gmrhWnrbk+YGMTcXDAbQ6SA9HVQquJYG1xW4ujqw+/svyBZu3Cherr4PPV2e9La6abXCUQNKJaSmQnISXL4kjljGpEpBn69vsexrXt6emays90uSiFClpNDjJEFxTRBT1ohWVSSXc09zIesk51RH0YYd+v7Cx2fXWh9MqdUHJ1NTe+ezM3FJV1UjCphwFRITIP4KDSlnSas8R6Mjn74JG/qWaE7pD3A4ZqdusxMn4uO3j128qPgYHT0/byyGZnGdyUIkLpZwTQD1rw3UD4ijiaFrPY++NVISWPqtt9+Fhx8aOXPm8VSSILfboNXCiURvLA4jW4fZni8J/PmBDIWEeA0EBuY6AgLc4xFyjsTsdmpt4aht8jWy2ir/ewZbYffzCxaVjhOBymDdfjJtEWvO0iytf6nBvyCCNQLzUtrrs0b6/xNhTevE6BlD4wAAAABJRU5ErkJggg=="
img_cart = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJZSURBVDjLpVJda5JhGPYH9Ac66bSdFHTydtDhIAiCiA6CEbGiL1bUTgaO9pHk1+y11ymyNT/wYypMxzanqa8Km9PJxg5EJcWBJq7OzUHIRlfP/VQyKWLRCzcP78113dd1X8+jAKD4n/pngtfrhdPpxMLCAqxW6x1FLpcD1dbWFjY2NpBOpyHLMmKxGNbX17GysoJgMIhAIACPx8OxR0dHODg4gMlkKiuy2SyOj4/R7Xb/Wp1OBw6H41O73Ua1WoUkSQ2DwTCiyGQyvNFqtZDP59FsNkG9RqOBZDKJ/f19RCIRjgmFQiiXy9zRzMzMYC+DVCqF7e1tRKNRYXNzE8vLywKRFxcXBVrDZrMJRDabzYLP5+P7q9Xqgd6AeDyOYrHIM6jX6zwDUiZypVLpKbOBKBQKpI6pqakzfbewurqKw8NDJBIJsKSFcDhMSgLZZWEJRNbpdILdbicyfrtGBpzY3d1FrVYDkUl5aWkJpVKJBnJltgr29vagVCq//fEduN1uShrz8/OwWCyUNFjS0Gg0UBqe44VlCI/e3sDQ60FcU16cOPVDeiLdfKUK3kOkbEXhswwpOYLb0gVcfnpW5ACXy3We2Xs3NzdHScNoNEKv11PSmJ6exl3dVayVTFj7YKbdIaYeQko9pgFf+QAWFrczOzs7KoriR0YePeng+stLeF+24+QXLlppwA8Ae9MTLGl+XTs7O/D7/Tzp8fFxjI2N4cqzc3gj34dOHuZkXWK438Gv0mq1UKlUmJyc7HPAgOpb4gCM8gOuTCf99zI4TTGwntUXsv3z1FP/O6UL4ZoSeea0AAAAAElFTkSuQmCC"
img_hot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKDSURBVDjLhZNfSN1lGMc/7+939ORU1C0iszwSG2duOFqNBQ2meJUoY4MixiiKiCCGMMauZYJ00252uYIuRlsgKJRsDLE/VBIhu3B/knVmInpy/jnrpB71fX+/99uFO3KkrAfei/fh+Xx4eJ/nNZIoRtx9Vq6xCTs0hCTwHnmPJOQ9ya4u+PYHKkdumSKToCQURVvFRXBLUhRZV4oQbBO4aBOIYxTHBOlVyt6Y3brL+/8RWIesJdi3D8UxiWN5glfrYM8yQToN6+vI2v8U9JrZLGFTE+HLKcwLqwS72wmOGRKpFP7X35B1vTsKktev9ZD9o5epacJX1gga3iKofQ2lsmjiAXow2Vt773ZPKWMk4X5KVUhhWl6hF/j+5z5U2+IHZUcvQFCOnf4SNzD+tVrDi1KA9yJ2hYX6N+enjSTs9/Uz2tXcIPFkCiKoOw67Usg9Ri6PWxonLswjDN457PIUNrf4jpFEYcCc8I4vwgMfVSUaTiM7h7eP8S4HcQEUgUlgEtX4yJEfu0Zu7O5XJDljiouUv2r2+pih8v2n0uHzJ5F9hKJV5AsoXgMTEuWyzN3sj+0yPYcuq2/bI9a8rQxJjqz/Pjjo/7oPEtIG8hsgiyHk0Tf9ObdBRxH+xxTqTmvFVFQOu3wGGUAegwFtLhEhKy2faHjHMQKIpzrL6l7CmASKImwuiynbTVBeQ/kzzzbeuWhaSuu3/YWlwacrvGgPaw+Q/+USS6OjGQw/Vqb3vlu9v41k/UFyD+c6gTv/2kEcR62m6sWKhaHzLHw3eiVyHG7+WO/9OZHpmBz4bNauWdZX6dzesrR1Zj7l/Uwfk3fP8XppXhI/d1MzcobPb5ziXmn+b0pcjPW7AMpFAAAAAElFTkSuQmCC"
img_hd = "data:image/png;base64,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"
img_star = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIwSURBVDjLlZLNS5RRFMafe9/3vjPOjI1jaKKEVH40tGgRBWEibfoPQoKkVdtoEQQF4T/QqkVtWrSTFrVsF1FgJbWpIAh1k2PNh+PrfL4f95zTQk0HHKkDD/cc7vP8uHCuEhF0q/KnmXNgGR248PZFN4/GISXMC8L89DBPV0Dp4/SsazJjrtfb9/vdxfn/BgjzY5M8Aq8nBya+V3h93vtnQHFxat4kszntJAAAxus1YvnZQV5V/jyTEZarwnwFLGeFZdT0ZFOJdD84qoCDOpQ7grZfRNj020JSEOKvwvxGiF+q0tL0N5PuO+Mk0nC0B0BDsYCCImyzAIktBBloMwKJLSgKYcMAcdhC2KpVlIig+H5qxcv0n0xmj4Gbq+BwC2wtJLbgHUlMEFJwUpMIGpto16u+kJzSACAk+WCzvNbe+AVljkOYIcQQou3TbvdOJo+g4aNdqzaF+PT43HJVA8DQpcVIiPPtaqlEUQzlDELsTpgYwgTAQIjQqlUCtpQfn1spdmxh+PJSQyw9CrbKgM7tvcISQAxlBhC3GuCYXk3cWP25m3M7dk88qbWBRDVApaATOSjPBdXXwYEP5QyCgvjE/kwHgInHtHYBnYA2owhrPiiuw0sOw3EZFEagIB7qChDiYaUcNIoFtP1KxCTPhWiDw7WbXk9vKpnOgsI4exjg6Mbq96YQPxm79uPOvqvbXx4O3KrF6w8osv2df17kr5YXJq7vnw/S0v3k7Ie7xtud/wAaRnP+Cw8iKQAAAABJRU5ErkJggg=="
img_cartgo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKNSURBVDjLpVNLTxNRFP4GCkZK6QtftZVHaURLCHFBu7Cu0H/g0rhpdKEbjOlOEzCBjYmycS2kbggLWbHQmmho8GIw0YRWIhX6TKlFgvKYx5253juhBGIkMZ7kzEnOzHe/757zjcQYw/+E5V8B8XicaZoGSil4vSElk0lTgmEY0HX9UIqPDqYA+v1+9Pf3Y21tDVNTU4sWcYVwOGwCjgpVVTE5OVnq6enxZDIZzMzMrPIDn1kE8/LyMqxWKwqFAjweD7LZLHw+n9lvb2/H0tISurq6YLfbPfl8Hul0WhwYjcViCUskEpESiQRramrCxsZGiL8g1Wo1pCgK4TJDsiyTcrls1lKpZPa3t7fFdYpCWZ14iPs1NzcLFUQw22w2Ipg5IxHMTqeTdHd3w+VykWAwKIiEgoLASrU1Tk9Ps4GBAfCholKphARYMAtwsVgMrbhfkh26iZB+B7lcDkNDQ9K+AhFc0oNUKoWOjg6TORAIwOFwmMxut5vwvcDbegGv6GPBvm8e6aCRJiYmWG1dadsLMEODalCovOdxBdDrvYz51Tf4XCDYpUrdu/s/mPQ3J96Nh9nV4E3ojPvD0GGAobxZgNN6EnPfXmMh95bKVG00nTg+Pn6es97j7LcEu0jZpZrg7PpXaFwF5Wo0XcNP5Rf6fBFsaTsWsjIr1+2Z5Ho0Gr3N6yDPLD9gUKYyqE5xquUcTre04Yy9Ew31x3HCdhYf80kkM7NfdlQ4LHsDxNjYGPN6vaaBuNOekE0Fz+f4wAwVXCr8rRcR7ryGD9lZvE/NqzLQVxphyqEZjI6O1n6UweHh4acHZ9L7qHHrUtsV68LiJ6zXV49xsPrHFo6KzofSd92ob9019IbKCKO1/m/zF57K8A8dwwAAAABJRU5ErkJggg=="
img_cmts = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACh0lEQVR42pVSXUgUURQ+d+bOzrhuuyvY2g+VsYFRgS89SBSsRqVgVAiFQYHUg1BGgj1EUlkPgbsQST9EkuFbbyb+4EIlZihIFBIIQeYP1bK6+Lu7szt35nbubJLGFvjB4VyY+33nO99cAlnQ8GLIlTJYYTLNcjUHTThVZbr5fMl8trtk5VD3bNBlclLr3+w9u7PAXYxdcqoUdMOEyegi/xGLj49HFnuSqVTrgwsHRtcIXHzUX+LLc7+sLi3a7nOrWeQRHCDFLHg/FrXefJxoN0125fnlwBI5HQwX79iycfBM2W4XlQhIhNhEgp384QLn3D6IHl3Qoa3n0wg3WYCcuBceOHd8/yEN7VJZQgEsKSMgSRkJQbIsDkLDtCwwTQ6TPxeg993nIDkZfGseObhHkmUZuCCgABfTUUWWCcgZQyAjWybcJqcZAwOz6X49OkvKbvctF+3z51KFQo6qAKYOlAoyOsGyHeB0xsRkC7hpgoVlGAxGPnwBErjR+WSrv7DW5coBp6aAU3WAQ5EzAr9XEPaFdTE1mTIgoWNh/zb29Tspb+pyM8kx4N+7q5iiTQ2naw4FFCqvycBgJuhpBkkkG7jeXGwBolPTDfaN8jvdXiLRVl/htqq8fC9gGpmduZ0/oAFgIkAkWphVZCrCo5PTjzGtutV/Go41dZVpqlrv3VRQmevZgA4wA3QhMkgmkjAfm4+nF5fChpFq6btV2f/3U7FRHQrLswmIebweT2wm+lQ3jHZ8G5Y7h86qCp3ouF7Bsj7l1Sht7HzIJO2SocevDTefCsF/kFXg6M1X3pllNox5Do2EqmrWLSBwuLHDNxfXW/JdytXw3arIugVWUHO/V2urr9D/9f0XPL8dcRazFIQAAAAASUVORK5CYII=";


document.styleSheets[0].insertRule(".icon-cart-add { margin-left:5px; background-position:left center; background-repeat:no-repeat; padding:10px 0 5px 25px; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJZSURBVDjLpVJda5JhGPYH9Ac66bSdFHTydtDhIAiCiA6CEbGiL1bUTgaO9pHk1+y11ymyNT/wYypMxzanqa8Km9PJxg5EJcWBJq7OzUHIRlfP/VQyKWLRCzcP78113dd1X8+jAKD4n/pngtfrhdPpxMLCAqxW6x1FLpcD1dbWFjY2NpBOpyHLMmKxGNbX17GysoJgMIhAIACPx8OxR0dHODg4gMlkKiuy2SyOj4/R7Xb/Wp1OBw6H41O73Ua1WoUkSQ2DwTCiyGQyvNFqtZDP59FsNkG9RqOBZDKJ/f19RCIRjgmFQiiXy9zRzMzMYC+DVCqF7e1tRKNRYXNzE8vLywKRFxcXBVrDZrMJRDabzYLP5+P7q9Xqgd6AeDyOYrHIM6jX6zwDUiZypVLpKbOBKBQKpI6pqakzfbewurqKw8NDJBIJsKSFcDhMSgLZZWEJRNbpdILdbicyfrtGBpzY3d1FrVYDkUl5aWkJpVKJBnJltgr29vagVCq//fEduN1uShrz8/OwWCyUNFjS0Gg0UBqe44VlCI/e3sDQ60FcU16cOPVDeiLdfKUK3kOkbEXhswwpOYLb0gVcfnpW5ACXy3We2Xs3NzdHScNoNEKv11PSmJ6exl3dVayVTFj7YKbdIaYeQko9pgFf+QAWFrczOzs7KoriR0YePeng+stLeF+24+QXLlppwA8Ae9MTLGl+XTs7O/D7/Tzp8fFxjI2N4cqzc3gj34dOHuZkXWK438Gv0mq1UKlUmJyc7HPAgOpb4gCM8gOuTCf99zI4TTGwntUXsv3z1FP/O6UL4ZoSeea0AAAAAElFTkSuQmCC'); }", 0);
document.styleSheets[0].insertRule(".icon-cart-remove { margin-left:5px; background-position:left center; background-repeat:no-repeat; padding:10px 0 5px 25px; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ4SURBVDjLpZNLiFJRGMe/q1biA99UpqOilqALmYW6yM2MFLQtwU27bLbNLLSgidEethxcGLRTXIkbFyEYQlQu7qJNMD5AYXxcUZMRMhtf19s5NzRnExMdOPfAOff//f7fOd9HMAwD/zN4/ypIJpPMbDaD+XwOaL1PFAoF1sJisQCaps9M/NP6xEKj0QgOhwO63S6k0+kjHk7B5XKxgr+N6XQKqVSqbbPZ1LVaDbLZ7DEKGONhcrVaBaFQCK1WC9RqNdTrddBqtey+Xq+HSqUCJpMJJBKJutlsQqlUwgEfBAKBPM/tdhP5fJ4RCAQwGAyc6IDs9/vOyWRCIpvO8XhMdjoddm232+z+aDTC6VDYGQd/cH4ikQi7IDFZLBaTmIyIJCbLZDLSYrGAXC4nrVYrBmEHLawlls+YyWQYj8cD6FKh1+s5sRiTsZiiKKdSqSSRfadKpSIbjQaEQiFi5QAPZGm/WCyCwWBgyWazGaRSKUtWKBQkujzAQex2O6aviodYL6REIsEsn2vtrdmp6X6ByxQJvEEPRnwh8GfDJ7dy89fEeSqx4NMFxRp1+PqW9+IlgxVOv+ag+Ok9PSiXdtlKjMfjNxBlDxEfLonrDjZ/jGBzywv82geAjy9AIJGCXqfjnlSY3wFQTl6/378TjUZLSPAICQ+DweDh0kF+++WCf8VAwJ29Pz1wcBW4C0LPphCLxZ4i4XONRsMWEK60crm8cnHz6C1s370HwsY7mJx24CcKMPzOhXINqDN3EIlElo2yGw6HVw4++64dXBCL9jcUMw6P04Lhtzkcd7n0bMw8I87bzgXfxuPRSXuHSxM6mstQSPXmdm7+6heR5oijWAuHSQAAAABJRU5ErkJggg==') }", 0);

document.styleSheets[0].insertRule("#nzbtable tbody tr.rowa:hover, #nzbtable tbody tr.rowb:hover { background-color: #EFECD1; color: #000 }", 0);
document.styleSheets[0].insertRule("#nzbtable tbody tr.rowa:hover a, #nzbtable tbody tr.rowb:hover a { color: #000 }", 0);
document.styleSheets[0].insertRule("#nzbtable tbody tr.selected { background-color: #EFECD1 !important; color: #000 !important }", 0);
document.styleSheets[0].insertRule("#nzbtable tbody tr.selected a { color: #000!important }", 0);
document.styleSheets[0].insertRule(".movieinfo-tip,.viewimdb-tip,.movieinfo-text { display: none }", 0);

/* Change the last_visit color, by adding the same style to the document overriding the site css */
var head, style;
head = document.getElementsByTagName('head')[0];
if (head) { 
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "tr.last_visit { background-color: #BCEFFF }\r\n#nzbtable tr.last_visit:hover { background-color: #91D1E5; color: #000 } ";
	head.appendChild(style);
}
/* */

function CreateNewCounter(element, img_data)
{
	var img_element = document.createElement('img');
	img_element.setAttribute("src", img_data);
	img_element.setAttribute("style", "padding-right:3px;cursor: pointer");
	img_element.setAttribute("Title", "Reset New Counter");
	element.appendChild(img_element);
	return img_element;
}

function addtoCart(NZBid) {

	if (document.getElementById("checkbox" + NZBid))	{
		chk = document.getElementById("checkbox" + NZBid);

		//Toggle checkbox
		if (chk.checked == false) {
			chk.checked = true;
			document.getElementById("cart" + NZBid).setAttribute("class", "icon-cart-remove");
			document.getElementById("cart" + NZBid).setAttribute("Title", "Remove from Cart");
		} else {
			chk.checked = false;
			document.getElementById("cart" + NZBid).setAttribute("class", "icon-cart-add");
			document.getElementById("cart" + NZBid).setAttribute("Title", "Add to Cart");
		}
		
		//Simulate click
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", true, true);
		chk.dispatchEvent(evt);

	}

}

function addDownloadButtons(element, NZBid)
{
	//Make save icon
	if (element.getElementsByTagName("b")[0].getElementsByTagName("a")[0]) {
		var DL = element.getElementsByTagName("b")[0].getElementsByTagName("a")[0];
		DL.innerHTML = ""
		DL.setAttribute("Title", "Download NZB");
		var img_element = document.createElement('img');
		img_element.setAttribute("src", img_download);
		img_element.setAttribute("style", "border: none");
		DL.appendChild(img_element);
	}
	
	//make myNZB cart icon
	if (element.getElementsByTagName("b")[0]) {
		var cart_element = document.createElement('a');
		cart_element.setAttribute("href", "javascript:void(0)");

		if ( document.getElementById("checkbox" + NZBid).checked == true ) {
			cart_element.setAttribute("Title", "Remove from Cart");
			cart_element.setAttribute("class", "icon-cart-remove");
		} else {
			cart_element.setAttribute("Title", "Add to Cart");
			cart_element.setAttribute("class", "icon-cart-add");
		}

		cart_element.setAttribute("id", "cart" + NZBid);
		cart_element.setAttribute("style", "outline: 0")

		element.getElementsByTagName("b")[0].appendChild(cart_element);		
		cart_element.addEventListener('click', function (event) { addtoCart(NZBid) }, false);
	}
	
		//make save to myNZB button img_cartgo
	if (element.getElementsByTagName("b")[0]) {
		var img_element = document.createElement('img');
		img_element.setAttribute("Title", "Save Cart directly to My NZBs");
		img_element.setAttribute("src", img_cartgo);
		img_element.setAttribute("style", "border: none; cursor: pointer;");

		document.getElementById("row"+NZBid).getElementsByTagName("td")[0].appendChild(img_element)
		img_element.addEventListener('click', function (event) { 
			if (document.getElementById("checkbox" + NZBid))	{
				chk = document.getElementById("checkbox" + NZBid);
		
				//Toggle checkbox
				if (chk.checked == false) {
					chk.checked = true;
					document.getElementById("cart" + NZBid).setAttribute("class", "icon-cart-remove");
					document.getElementById("cart" + NZBid).setAttribute("Title", "Remove from Cart");
				}
				
				//Simulate click
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("click", true, true);
				chk.dispatchEvent(evt);
				
				//Simulate click
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("click", true, true);
				window.setTimeout(function () {
				  document.getElementById("addtomynzbs").dispatchEvent(evt);
				},1000);
				
				
			}
			
		}, false);
	}
}

function markCategory(element, loc, NZBid)
{
	if (element.getElementsByTagName("a")[0]) {
		var CategoryNode = element.getElementsByTagName("a")[0];
		var CategoryText = CategoryNode.textContent;
		CategoryText = CategoryText.substr(0, CategoryText.indexOf("-"));
	} else {
		var t= document.getElementsByTagName("H3")[0].textContent
		t = t.replace(/home > /gi, "");
		CategoryText = t.replace(" > ", "-");
		CategoryText = CategoryText.substr(0, CategoryText.indexOf("-"));
	}
	
	var HD = "";
	var NZBtitle = document.getElementById("row"+NZBid).getElementsByTagName("td")[1].getElementsByTagName('a')[0].textContent
	if ((NZBtitle.indexOf("720p")>0)||(NZBtitle.indexOf("1080p")>0)) {
		HD = "264";
	}
		
		switch (CategoryText) {
			case "PC":
				cat_img = img_PC
				break;
			case "Console":
				cat_img = img_game
				break;
			case "Music":
				cat_img = img_music
				break;
			case "TV":
				cat_img = img_tv
				break;
			case "Foreign":
				cat_img = img_foreign
				break;
			case "Movies":
				cat_img = img_film
				break;
			case "XXX":
				cat_img = img_xxx
				break;
			default:
				cat_img = img_misc
				break;
		}
		var img_element = document.createElement('img');
		img_element.setAttribute("src", cat_img);
		img_element.setAttribute("Title", CategoryText);
		img_element.setAttribute("alt", CategoryText);
		img_element.setAttribute("style", "margin-right: 4px;");
		loc.parentNode.insertBefore(img_element, loc);
		
		if (HD == "264") {
			var img_element = document.createElement('img');
			img_element.setAttribute("src", img_hd);
			img_element.setAttribute("Title", "High Definition");
			img_element.setAttribute("style", "margin-left: 4px;");
			loc = document.getElementById("row"+NZBid).getElementsByTagName("td")[1].getElementsByTagName('br')[0]
			loc.parentNode.insertBefore(img_element, loc);
		}
}

function markHot(element, NZBid) {
	var grabs = element.textContent;
	grabs = grabs.substr(0, grabs.indexOf(" grabs"));
	grabs = grabs*1;

	var cmts = element.getElementsByTagName('a')[0].textContent;
	cmts = cmts.substr(0, cmts.indexOf(" cmts"));
	cmts = cmts*1;
	
	loc = document.getElementById("row"+NZBid).getElementsByTagName("td")[1].getElementsByTagName('br')[0];

	if (grabs > markAsHot) {
		var img_element = document.createElement('img');
		img_element.setAttribute("src", img_hot);
		img_element.setAttribute("Title", "Hot Download");
		img_element.setAttribute("alt", element.textContent);
		img_element.setAttribute("style", "margin-left: 4px;");
		loc.parentNode.insertBefore(img_element, loc);
	}
	if (grabs > markAsSuperHot) {
		var img_element = document.createElement('img');
		img_element.setAttribute("src", img_hot);
		img_element.setAttribute("Title", "Hot Download");
		img_element.setAttribute("alt", element.textContent);
		img_element.setAttribute("style", "margin-left: 4px;");
		loc.parentNode.insertBefore(img_element, loc);
	}
	if (grabs > markAsSuperHot*2) {
		var img_element = document.createElement('img');
		img_element.setAttribute("src", img_hot);
		img_element.setAttribute("Title", "Hot Download");
		img_element.setAttribute("alt", element.textContent);
		img_element.setAttribute("style", "margin-left: 4px;");
		loc.parentNode.insertBefore(img_element, loc);
	}
	if (cmts > 0) {
		var a_element = document.createElement('a');
		a_element.setAttribute("href", element.getElementsByTagName('a')[0].getAttribute("href"));
		
		var img_element = document.createElement('img');
		img_element.setAttribute("src", img_cmts);
		img_element.setAttribute("Title", "Comments");
		img_element.setAttribute("alt", element.textContent);
		img_element.setAttribute("style", "margin-left: 4px; border: medium none; cursor: pointer;");

		a_element.appendChild(img_element);
		loc.parentNode.insertBefore(a_element, loc);
	}
}

function selectAll() {
	var tbl = document.getElementById('nzbtable');

	var tds = tbl.getElementsByTagName('tr');
	for (var i=0; i<tds.length; i++)
	{
		var td = tds[i];
		var NZBid = tds[i].getAttribute("id");
		if  (NZBid !== null) {
			if ( NZBid.substr(0,3) == "row") {
				NZBid = NZBid.substr(3) * 1;
				chk = document.getElementById("checkbox" + NZBid);
				if (chk.checked == false) {
					document.getElementById("cart" + NZBid).setAttribute("class", "icon-cart-remove");
					document.getElementById("cart" + NZBid).setAttribute("Title", "Remove from Cart");
				} else {
					document.getElementById("cart" + NZBid).setAttribute("class", "icon-cart-add");
					document.getElementById("cart" + NZBid).setAttribute("Title", "Add to Cart");
				}
			}
		}
	}
}

function topNavicons() {
	
	//adds icons to topnav 
	if (document.getElementById('header').getElementsByTagName('div')[1].getElementsByTagName('ul')[0].getElementsByTagName('li')) {
		var header = document.getElementById('header').getElementsByTagName('div')[1].getElementsByTagName('ul')[0]
		var x = 0;
		if (header.childNodes[x]) {
			var img_element = document.createElement('img');
			header.childNodes[x].innerHTML = "<img src='"+img_game+"' style='margin: 3px 2px 0px 3px; float:left; border:none'>" + header.childNodes[x].innerHTML
		}
		var x = 1;
		if (header.childNodes[x]) {
			var img_element = document.createElement('img');
			header.childNodes[x].innerHTML = "<img src='"+img_foreign+"' style='margin: 3px 2px 0px 3px; float:left; border:none'>" + header.childNodes[x].innerHTML
		}
		var x = 2;
		if (header.childNodes[x]) {
			var img_element = document.createElement('img');
			header.childNodes[x].innerHTML = "<img src='"+img_film+"' style='margin: 3px 2px 0px 3px; float:left; border:none'>" + header.childNodes[x].innerHTML
		}
		var x = 3;
		if (header.childNodes[x]) {
			var img_element = document.createElement('img');
			header.childNodes[x].innerHTML = "<img src='"+img_music+"' style='margin: 3px 2px 0px 3px; float:left; border:none'>" + header.childNodes[x].innerHTML
		}
		var x = 4;
		if (header.childNodes[x]) {
			var img_element = document.createElement('img');
			header.childNodes[x].innerHTML = "<img src='"+img_PC+"' style='margin: 3px 2px 0px 3px; float:left; border:none'>" + header.childNodes[x].innerHTML
		}
		var x = 5;
		if (header.childNodes[x]) {
			var img_element = document.createElement('img');
			header.childNodes[x].innerHTML = "<img src='"+img_tv+"' style='margin: 3px 2px 0px 3px; float:left; border:none'>" + header.childNodes[x].innerHTML
		}
		var x = 6;
		if (header.childNodes[x]) {
			var img_element = document.createElement('img');
			header.childNodes[x].innerHTML = "<img src='"+img_xxx+"' style='margin: 3px 2px 0px 3px; float:left; border:none'>" + header.childNodes[x].innerHTML
		}
	}
	
}
function recodeSelectAll() {
	
		//recode select all button
		if (document.getElementById('nzbtable').getElementsByTagName('th')[0].getElementsByTagName('input')[0]) {
			document.getElementById('nzbtable').getElementsByTagName('th')[0].getElementsByTagName('input')[0].addEventListener('click', function (event) { selectAll() }, true);
			if (document.getElementById('nzbtable').getElementsByTagName('th')[7]) {
				cols = 7;
			} else {
				cols = 6;
			}
			if (document.getElementById('nzbtable').getElementsByTagName('th')[cols]) {
				var cart_element = document.createElement('a');
				cart_element.setAttribute("href", "javascript:void(0)");
				cart_element.setAttribute("Title", "Select All to Cart");
				cart_element.setAttribute("class", "icon-cart-add");
				cart_element.setAttribute("style", "margin-left: 20px;");
				cart_element.setAttribute("id", "cartAll");
		
				document.getElementById('nzbtable').getElementsByTagName('th')[cols].appendChild(cart_element);		
				cart_element.addEventListener('click', function (event) { 	
					var chkall = document.getElementById('nzbtable').getElementsByTagName('th')[0].getElementsByTagName('input')[0];
					if (chkall.checked == false) {
						chkall.checked = true;
						document.getElementById("cartAll").setAttribute("class", "icon-cart-remove");
						document.getElementById("cartAll").setAttribute("Title", "Select None to Cart");
					} else {
						chkall.checked = false;
						document.getElementById("cartAll").setAttribute("class", "icon-cart-add");
						document.getElementById("cartAll").setAttribute("Title", "Select All to Cart");
					}
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent("click", true, true);
					chkall.dispatchEvent(evt); 
				}, false);
			}
		}
}

function init()
{
	/* Resize the page to use all the available width of the browser */
	document.getElementById('container').setAttribute("style", "width: 99%");
	document.getElementById('header').getElementsByTagName("h1")[0].setAttribute("style", "width: 50%; padding-top:5px");
	document.getElementById('user_box').setAttribute("style", "width: 50%; padding-top:5px");
	/* */

	/* Get the category being viewed */
	var t = document.getElementsByTagName("h3")[0].textContent
	t = t.replace(/home > /gi, "");
	CategoryText = t.replace(" > ", "-");
	if (CategoryText.indexOf("-") > 0) {
		CategoryText = CategoryText.substr(0, CategoryText.indexOf("-"));
	}
	/* */

	if (document.getElementById('nzbtable')) {
		var tbl = document.getElementById('nzbtable');
		
		tbl.getElementsByTagName('th')[0].setAttribute("align", "left");
		
		var tds = tbl.getElementsByTagName('tr');
		for (var i=0; i<tds.length; i++)
		{
			var td = tds[i];
			var NZBid = td.getAttribute("id");
			
			if  (NZBid !== null) {
				
				/* Put all the description into a div to prevent column resize */
				
				if (td.getElementsByTagName('td')[7]) {
					var theWidth = document.body.clientWidth - widthCorrection1;
				} else {
					var theWidth = document.body.clientWidth - widthCorrection2;
				}
				td.getElementsByTagName('td')[1].innerHTML = "<div class='nzbdesc' style='width: " + theWidth + "px; height: auto; overflow: auto;'>"  + td.getElementsByTagName('td')[1].innerHTML + "</div>";

				if ( NZBid.substr(0,3) == "row") {
					NZBid = NZBid.substr(3) * 1;
					
					markCategory(td.getElementsByTagName('td')[2], td.getElementsByTagName('td')[1].getElementsByTagName('b')[0], NZBid );
					td.getElementsByTagName('td')[0].setAttribute("valign", "top");
					if (td.getElementsByTagName('td')[7]) {
						addDownloadButtons(td.getElementsByTagName('td')[7], NZBid);	
						markHot(td.getElementsByTagName('td')[6], NZBid);
						td.getElementsByTagName('td')[7].setAttribute("valign", "top");
						td.getElementsByTagName('td')[6].setAttribute("valign", "top");
						td.getElementsByTagName('td')[5].setAttribute("valign", "top");
						td.getElementsByTagName('td')[4].setAttribute("valign", "top");
						td.getElementsByTagName('td')[3].setAttribute("valign", "top");
						td.getElementsByTagName('td')[2].setAttribute("valign", "top");
						
					} else {
						addDownloadButtons(td.getElementsByTagName('td')[6], NZBid);
						markHot(td.getElementsByTagName('td')[5], NZBid);
						td.getElementsByTagName('td')[6].setAttribute("valign", "top");
						td.getElementsByTagName('td')[5].setAttribute("valign", "top");
						td.getElementsByTagName('td')[4].setAttribute("valign", "top");
						td.getElementsByTagName('td')[3].setAttribute("valign", "top");
						td.getElementsByTagName('td')[2].setAttribute("valign", "top");
					}
					
					//add imdb covers
					
					var links = td.getElementsByTagName('td')[1].getElementsByTagName('a');
					var imdblink = "";
					var imdbpic = "";
					for(var kk = 0; kk < links.length; ++kk) {

						//remove all anons
//						if(links[kk].href.indexOf('?http://') > -1) {
//							links[kk].setAttribute("href", links[kk].href.substring( links[kk].href.indexOf('?http://')+1 )  );
//						}
						
						if(links[kk].href.indexOf('imdb.com/title/') > -1) {
							links[kk].setAttribute("id", "imdbl" + NZBid);
							links[kk].setAttribute("NZBid", NZBid);
							imdblink = links[kk].href;
						}
						if(links[kk].href.indexOf('nzbs.org/imdb/') > -1) {
							imdbpic = links[kk].href;
						}

					}
					if (imdblink != "" && imdbpic != "") {
						var a = document.createElement('a');
						a.setAttribute("href", imdblink);
						a.setAttribute("target", "_blank");
						var img = document.createElement('div');
						img.setAttribute("style", "float:left; width:100px; height: 140px; border: 2px solid #333333;border-radius: 10px; margin-right: 10px;background: url('" + imdbpic + "') no-repeat; background-size: 100px 140px;");
						a.appendChild(img)
						td.getElementsByTagName('td')[1].getElementsByTagName('div')[0].insertBefore( a, td.getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('img')[0] );
						
						var div = document.createElement('div');
						div.setAttribute("id", "padder" + NZBid);
						td.getElementsByTagName('td')[1].getElementsByTagName('div')[0].insertBefore( div, td.getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('img')[0] );
						
						var div = document.createElement('div');
						div.setAttribute("id", "imdb" + NZBid);
						div.setAttribute("style", "");
						div.setAttribute("class", "imdbdesc");
						td.getElementsByTagName('td')[1].getElementsByTagName('div')[0].appendChild(div);
						
						var imdbl = document.getElementById("imdbl" + NZBid);
						imdbl.innerHTML = "Fetch IMDB Data";
						imdbl.setAttribute("target", "");
						imdbl.href = "javascript:void(0);";
						imdbl.addEventListener('click', function(event){loadimdbInfo(this.getAttribute("NZBid"))}, false);
					} else {
						// If vieweing the Movies category of one of its sub, then add a spacer if not imdb image
						if (CategoryText == "Movies") {
							var spcr = document.createElement('div');
							spcr.setAttribute("style", "float:left; width:100px; height: 40px; margin-right: 14px;");
							td.getElementsByTagName('td')[1].getElementsByTagName('div')[0].insertBefore( spcr, td.getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('img')[0] );
						}
					}
					
				}
			}
		}
		recodeSelectAll();
	}
	
	topNavicons()
	
	
	
	function loadimdbInfo(NZBid) {
		if ( NZBid !== null ) {
			var imdbDiv = document.getElementById("imdb" + NZBid)
			if (imdbDiv.innerHTML == "") {
				imdbDiv.innerHTML = "<br><br>Loading IMDB info..."; 

				xmlhttp=new XMLHttpRequest();
				xmlhttp.open("GET","/index.php?action=view&nzbid=" + NZBid,false);
				xmlhttp.send();
				var resp = xmlhttp.responseText;
				var i = resp.indexOf("<b>Description:</b>")
				if (i > 0) {
					resp = resp.substring(i+28) 
					resp = resp.substring(0, resp.indexOf("</td>"))
					var theWidth = document.getElementById("row"+NZBid).getElementsByTagName("td")[1].offsetWidth - 155;
					imdbDiv.setAttribute("style", "width: " + theWidth + "px; height: auto; white-space:normal; margin-left: 115px;")
					imdbDiv.innerHTML = resp; 
				}
			} else {
				imdbDiv.innerHTML = "";
			}
		}
	}
	
	window.setTimeout(function () {	
		//adds icons to button 
		
		if (document.getElementById('addtomynzbs')) {
			if (document.getElementById('nzbtable').getElementsByTagName('tr')[0].getElementsByTagName('td')[1]) {
				var buttons = document.getElementById('nzbtable').getElementsByTagName('tr')[0].getElementsByTagName('td')[1];

				if (buttons.childNodes.length == 6) {
						buttons.childNodes[1].className = "submit viewcart"
						buttons.childNodes[2].className = "submit sendserver"
						buttons.childNodes[3].className = "submit mynzb"
						buttons.childNodes[4].className = "submit zip"
						buttons.childNodes[5].className = "submit remcart"
				}
				
				trows = document.getElementById('nzbtable').getElementsByTagName('tr').length - 1;
				
				if (document.getElementById('nzbtable').getElementsByTagName('tr')[trows].getElementsByTagName('td')[1]) {
					var buttons = document.getElementById('nzbtable').getElementsByTagName('tr')[trows].getElementsByTagName('td')[1];
	
					if (buttons.childNodes.length == 5) {
							buttons.childNodes[1].className = "submit viewcart"
							buttons.childNodes[2].className = "submit mynzb"
							buttons.childNodes[3].className = "submit zip"
							buttons.childNodes[4].className = "submit remcart"
					}
					
				}
			}
		}
	},1000);

 	window.addEventListener('resize', function() 
	{
        var  delay = 1000; /* milliseconds - vary as desired */
        var executionTimer;
       
		if (executionTimer) {
				clearTimeout(executionTimer);
		}

		executionTimer = setTimeout(function() {
			if (document.getElementById('nzbtable')) {
				var tbl = document.getElementById('nzbtable');
				if (tbl.getElementsByTagName('tr')[2].getElementsByTagName('td')[7]) {
					var theWidth = document.body.clientWidth - widthCorrection1;
				} else {
					var theWidth = document.body.clientWidth - widthCorrection2;
				}
				var divs = tbl.getElementsByClassName('nzbdesc');
				for (var i = 0; i < divs.length; i++)
				{
					divs[i].setAttribute("style", "width: " + theWidth + "px; height: auto; overflow: auto;");
				}
				
				theWidth = theWidth - 116;
				var divs = tbl.getElementsByClassName('imdbdesc');
				for (var i = 0; i < divs.length; i++)
				{
					divs[i].setAttribute("style", "width: " + theWidth + "px; height: auto; white-space:normal; margin-left: 115px;");
				}
			}
		}, delay);
	}, false); 
}

init();
