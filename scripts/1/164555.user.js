// ==UserScript==
// @name           beta nzbs
// @namespace      http://nowhere.man
// @include        http*://beta.nzbs.org/*
// @include        http*://nzbs.org/*
// ==/UserScript==



/* Config */
var markAsHot = 50;

/* end Config */

img_new="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEMSURBVDjL3ZLBSgJRFIYvtO0BfIPeI3qBNj2Cy1rWzlWbkcBNYhC0TletJKOFq1lIILhQJCywaDZOkINiGl/n3DNj6LaF4MDHGebc/5tz544D3H9w2yAI3LkQp7UgREJRSIS+0BJqwr6QTzkWulqdD09juD3Ah5PI7r8TiPvw0YJeDUq7cJ83NDzqwmUOFUyYT/ASfasGm6d4kQo1OB3JszN4fTDujuBrqP2hW4baVxbMBIuZTfAeQucGxm/w+WzB6AleGipo/Am06hTrEwQupLhjwkFdtlOFnzlc72n/cFWgQb3WJ8i22a7A44mtCfQQ7BSyL6617BtWZ+kphMKFlwSusrJmW/7ETQt+AQhq/TxibW0lAAAAAElFTkSuQmCC"
img_PC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAItSURBVDjLfVM7bBNBEH27d7alOKfYjsM3gFLjRCAgiAoFBAIhQUNJh0SLqGgpEQW2a6LQ8VGgAAqUBqWk4bAbDEgoNCALJNtJlKDzfZaZ2bNFUJI9zc7d7c57b3ZmlTEGuw3f9x9HUXQjDEOXPMiL9ft99s/UTgDNZnOMAuYLhcL1XG4EAQUhSSC7KaZYLGBp6S3c7YIbjcYlDi6Xywfz+TxWvv8AsyeJQWISAjKICSwIAritViuI4zhLJpsGMtl3u93/JaPT6RJQggsXL8s/l4MnJw+j11sVdsOPYZVGjD+IE6XiGN68foWjlePCzmuigFE5+O68T9sUlKLZTuLZ1tfW8ODWKWH86L8Hq91/5ZpVwFKZlTcWS+PQWkOR6dT4nQFMYhkrMyfl3aRnoFkBfROAhuM4W0ynngcfHjP+9law0KtJWqIgTMujtILjukN28ZwCeVs5y7jw5RE21iNRIQA88YFwCsw4tWdE8rdD4edqlCqwjHfG7yEpWUAmFwCd5sn27ev2HeloRwBsL9hKDRVkMi7u3zwm5QnDCJubgTBksxlKw0j3aWXXYo5MyygKKK+Hy8vvzg4ahXzJ87wprk673Q5IXY5T47jK9AyOHDogivbtnZBm23IX6vX6bQK5Onv6zDnPK+Dli6d/qOZP6Hxm6f/0v13KRmufhwC1Wm2CSvZrbu48Rj2PNsRwHU2g1Y1qtTq6020dXiaS3iH7sLj4/MSg/1PGT7td97+G8aA4FJOt1wAAAABJRU5ErkJggg=="
img_game = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHBSURBVDjLlVM9aMJQEP6eNEF0sbiUouLgoLRkKXS1IG4dC6Xg2LXQRXATHbqVzq4iQjc3sVscnUSnYIdIB9GC4L/xL333IEFsBj04jpf77nt3l+8x0zRxaMViMbTdbtXVahVer9dYLBY/0+k0mcvltEPsGRzMMIyPQCAQ9ng8IAJd14OdTuedp+4PsS4ngslkctFoNNBsNgWB2+3GaDQKOWEdCTgY2WyW9Xo9QbBcLoUfTSDLsoiMMUFgkRxNwHeAdDpt+nw+8EUKp29O5rhEvnEoigJJktBqteD3+0/rgINNulHTNCjzGR5++1Bvb67x+vLF/dmxg3K5HOZB2+12MncxfzAYxJ25wcXjE5ixZCu9m/wufybfUqnLUqmUtwmomAtKi0ajcrVaxWAwQKFQEHOfK1dQajUwrwdSrw8ZEiKRSC4ej0NV1TwjJXI2IxaLyZwA4/FYFHL12T6fz+3o9XrhcrmQyWTQbreZ6IAnZS5dVCoVEpFYmFVEPpvNxJm+0zmRSIhoj0AJunU4HNogq3C/EwtHuqBfaxNQkhJ8NpGwAPtxs9n8c5ug2+2iXq/bojl0S41URKPuv2Dm9JxPsT8W0mO2IJm2EgAAAABJRU5ErkJggg=="
img_music = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==";
img_film = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZNPaBNBGMXfbrubzBqbg4kL0lJLgiVKE/AP6Kl6UUFQNAeDIAjVS08aELx59GQPAREV/4BeiqcqROpRD4pUNCJSS21OgloISWMEZ/aPb6ARdNeTCz92mO+9N9/w7RphGOJ/nsH+olqtvg+CYJR8q9VquThxuVz+oJTKeZ63Uq/XC38E0Jj3ff8+OVupVGLbolkzQw5HOqAxQU4wXWWnZrykmYD0QsgAOJe9hpEUcPr8i0GaJ8n2vs/sL2h8R66TpVfWTdETHWE6GRGKjGiiKNLii5BSLpN7pBHpgMYhMkm8tPUWz3sL2D1wFaY/jvnWcTTaE5DyjMfTT5J0XIAiTRYn3ASwZ1MKbTmN7z+KaHUOYqmb1fcPiNa4kQBuyvWAHYfcHGzDgYcx9NKrwJYHCAyF21JiPWBnXMAQOea6bmn+4ueYGZi8gtymNVobF7BG5prNpjd+eW6X4BSUD0gOdCpzA8MpA/v2v15kl4+pK0emwHSbjJGBlz+vYM1fQeDrYOBTdzOGvDf6EFNr+LYjHbBgsaCLxr+moNQjU2vYhRXpgIUOmSWWnsJRfjlOZhrexgtYDZ/gWbetNRbNs6QT10GJglNk64HMaGgbAkoMo5fiFNy7CKDQUGqE5r38YktxAfSqW7Zt33l66WtkAkACjuNsaLVaDxlw5HdJ/86aYrG4WCgUZD6fX+jv/U0ymfxoWVZomuZyf+8XqfGP49CCrBUAAAAASUVORK5CYII="
img_tv = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJKSURBVDjLdZJNSFRRFIC/82YazQJpkVgbQV9aU23cuQtatIxaREi4C9zmQvrBpEUGLtvnQkqIVi0jgmzjT5PWZJYwIiEG2iInnR/ffeeeFuNMjtaFwz1wz/fde+69Ymb03Z1Ine88uZxMSuP84lo4PtKb5x/j0rX7zafPtee2torlxWymY/rVWCRmBlAneZ/9Hk6M9tVJLl693dx5tiNXKBbLix9nOzJvnkUANQHAjTtPU+n248uYNc7MLIYvnwzkAS5cvtUcnjmVKxZK5a+fZzvm3z6PqkydAODKzceprs4TOfXx4Q/Tc2EUFelMd+UK26XSty+Z8NO7F9HeejEzBgcHHwD3qjIzo6WlJQGgqnjvWV9fVzPDzFBVCoXCw/Hx8eHkLjAUXn8k+y/NDNTAe8OXNLH221FSMODXWO8QMBwANDU1ScsRIZCDcKzGj7xjNe+IvZAQCADnnEAlx8xoTELrUSEZ/IXLkbK6GbEVeRIiJIIKEIigqtQEzjmcVsBjjYJIBf65HWOeXVgIEAIRAqMmSAJEUUTkgd2dU2LkywoIIkYAeKOSG3jZJ1BVnFaK1Hu2nKcpFeDUCAJQBcQQE6qPXieI45gdNcxDKTbUV/o8lDBiJ3VwNbz39S0UdgznoeSMWEHNUBNMKmf2tgfG6gUNDQ1svh5lZWWFkaUlBtracM6RTqdZmJuju7ubqakpenp6mJycJAzDWgtiZvT391trayuq+t/w3tdm7z3ZbJZMJiNJgI2NDRYWFmqL3nvM7EBe/crVvwPwB5ahnKoTKjg4AAAAAElFTkSuQmCC";
img_misc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC4SURBVCjPdZFbDsIgEEWnrsMm7oGGfZrohxvU+Iq1TyjU60Bf1pac4Yc5YS4ZAtGWBMk/drQBOVwJlZrWYkLhsB8UV9K0BUrPGy9cWbng2CtEEUmLGppPjRwpbixUKHBiZRS0p+ZGhvs4irNEvWD8heHpbsyDXznPhYFOyTjJc13olIqzZCHBouE0FRMUjA+s1gTjaRgVFpqRwC8mfoXPPEVPS7LbRaJL2y7bOifRCTEli3U7BMWgLzKlW/CuebZPAAAAAElFTkSuQmCC"
img_xxx = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIpSURBVDjLpZNdaFJhGMcX9EExPVNn3Xcd3Ui3urnJbK4guiioiyjKPFm2QRSINZl2RDuprTZNaTLQ06ajizVhDILW+tpmYxXW6mKNXTSKGS2Xm+foP18vBjLRoosfLzzv//nxPC+8NQBq/oeyRfpAvYXVStMeXR2cWgoWtWT1hEJu+yuBXiG92nNYkg8cl8JfoPuoBEwrhXalOK/bL7NWFXRrqSSrEYNR1YJRi8DoJLC3yXGlUYqTCupnVQGjrIVLU4/RrmN4F7Ph85gfj90GXNDshaOByvdfO7SjqiCzMIVfk31YnuKwnBjE0qswUvMJuNQU3obo7RUFDpUol5qMIDUTQ3p2sEAU36ajSCU4uJrqhIor7NGFt9mVYv514CLWpoPIvH9U5PdMGM/vnoKjSb4m1wR2lhXIW7nibp2q3eCffMK4z1gCP/YB5uZ9IBmZ2rerRCA7OLCFnG/OMPCdbUAu/hHCracQrCMQLEMQbnDI9Y4g2HEEJEOyVGPv1pIJyEV2dBzpoQkIwWfgncPgLRyynWEIbBRZsw+CNwrhXmhDsiEgIxb3vd2HOdqNjDOGdWsY39vv4IvJidXrfqx3sJg7bUOmJ1LMkp5NghVXAMl2LxZNbnw1schc9mDF6MAizWBJb0fyEosfN/2bBS/uGxOkED9nz0/oHeDNkbKQ0eP6LoFkCz2zJW8w/9AgCrXQHq7NNEyC5ehvPv/yQQvtXRgwiCr+xn/hD7c3w4UciyonAAAAAElFTkSuQmCC"
img_download = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPCAMAAAAI/bVFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMAUExURQ4lCC9+HNXV1fb29gIFAUhISA0jCO3t7dLS0jmZIhc+Dk3QLkjDLHt7eyZlF11dXQMHAj2jJDSNIAABAClvGYSEhEVFRc/Pz/n5+QkZBqKioh1NEWlpaU7SL2ZmZv///wAAAP///yIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yPj3S8AAAAidFJOU////////////////////////////////////////////wAN0MNxAAAAaUlEQVR42oTLyQoCURBD0RJUcECcWmi60rn5/5908RTcmU04kFSSAKxJUkmQpM36V9cqSbrXPqlsbxq5TKlkPkuSDq/xO0rSwm4oT+mESSqQB4DpFDbYxqYLY8AYU5/mV99l0zTQ0HkPANnPFg7l0M2PAAAAAElFTkSuQmCC"
img_mynzb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALGSURBVDjLpZNdSNNRGMZ330V2GXXVRXVTICRd2IVIIFGSoJDWRUssRREJiswP1La16aab3x8tyoWl+T11tqmYmJbZh61pfvWFKZmoqZmp236dv1MxKrrowMP5n/95n+d5z3veIwNk/4PND1dz8z5nY2P0al1d0nJVVdhSebnXxt5cYeGO2ezsmGmtduyLUtnxOTn5+C8CLosl1tnQMONsseJsa2WlvpbF0lLHgtHoPVdQsHfWYLB/M91mtbuTH1YL0+lqxuLi7nyIitomkQOd5jrcQwMwMgQDDhgdZqW9jbn8/I8zen3/ktjHYYdHD0GISDEz+kzeyuVK2arZbHU/fwovn0FTI5jNUFMj1r24ertxdgpSbw/cugU3b0JREZSZcD59zHBo6Lhsubr6k3tkEKzNUCecagW5shLu3vUIPmgCo1GgBAoKBPIg24DrSRdvgoIWZKJYX9yD/VAvyBUVUH4PTCaPY8k6KU+QcnIEUQ8ZGaBR4+psp//YsTnZosk06nK8gmrhWnrbk+YGMTcXDAbQ6SA9HVQquJYG1xW4ujqw+/svyBZu3Cherr4PPV2e9La6abXCUQNKJaSmQnISXL4kjljGpEpBn69vsexrXt6emays90uSiFClpNDjJEFxTRBT1ohWVSSXc09zIesk51RH0YYd+v7Cx2fXWh9MqdUHJ1NTe+ezM3FJV1UjCphwFRITIP4KDSlnSas8R6Mjn74JG/qWaE7pD3A4ZqdusxMn4uO3j128qPgYHT0/byyGZnGdyUIkLpZwTQD1rw3UD4ijiaFrPY++NVISWPqtt9+Fhx8aOXPm8VSSILfboNXCiURvLA4jW4fZni8J/PmBDIWEeA0EBuY6AgLc4xFyjsTsdmpt4aht8jWy2ir/ewZbYffzCxaVjhOBymDdfjJtEWvO0iytf6nBvyCCNQLzUtrrs0b6/xNhTevE6BlD4wAAAABJRU5ErkJggg=="
img_cart = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJZSURBVDjLpVJda5JhGPYH9Ac66bSdFHTydtDhIAiCiA6CEbGiL1bUTgaO9pHk1+y11ymyNT/wYypMxzanqa8Km9PJxg5EJcWBJq7OzUHIRlfP/VQyKWLRCzcP78113dd1X8+jAKD4n/pngtfrhdPpxMLCAqxW6x1FLpcD1dbWFjY2NpBOpyHLMmKxGNbX17GysoJgMIhAIACPx8OxR0dHODg4gMlkKiuy2SyOj4/R7Xb/Wp1OBw6H41O73Ua1WoUkSQ2DwTCiyGQyvNFqtZDP59FsNkG9RqOBZDKJ/f19RCIRjgmFQiiXy9zRzMzMYC+DVCqF7e1tRKNRYXNzE8vLywKRFxcXBVrDZrMJRDabzYLP5+P7q9Xqgd6AeDyOYrHIM6jX6zwDUiZypVLpKbOBKBQKpI6pqakzfbewurqKw8NDJBIJsKSFcDhMSgLZZWEJRNbpdILdbicyfrtGBpzY3d1FrVYDkUl5aWkJpVKJBnJltgr29vagVCq//fEduN1uShrz8/OwWCyUNFjS0Gg0UBqe44VlCI/e3sDQ60FcU16cOPVDeiLdfKUK3kOkbEXhswwpOYLb0gVcfnpW5ACXy3We2Xs3NzdHScNoNEKv11PSmJ6exl3dVayVTFj7YKbdIaYeQko9pgFf+QAWFrczOzs7KoriR0YePeng+stLeF+24+QXLlppwA8Ae9MTLGl+XTs7O/D7/Tzp8fFxjI2N4cqzc3gj34dOHuZkXWK438Gv0mq1UKlUmJyc7HPAgOpb4gCM8gOuTCf99zI4TTGwntUXsv3z1FP/O6UL4ZoSeea0AAAAAElFTkSuQmCC"
img_hot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKDSURBVDjLhZNfSN1lGMc/7+939ORU1C0iszwSG2duOFqNBQ2meJUoY4MixiiKiCCGMMauZYJ00252uYIuRlsgKJRsDLE/VBIhu3B/knVmInpy/jnrpB71fX+/99uFO3KkrAfei/fh+Xx4eJ/nNZIoRtx9Vq6xCTs0hCTwHnmPJOQ9ya4u+PYHKkdumSKToCQURVvFRXBLUhRZV4oQbBO4aBOIYxTHBOlVyt6Y3brL+/8RWIesJdi3D8UxiWN5glfrYM8yQToN6+vI2v8U9JrZLGFTE+HLKcwLqwS72wmOGRKpFP7X35B1vTsKktev9ZD9o5epacJX1gga3iKofQ2lsmjiAXow2Vt773ZPKWMk4X5KVUhhWl6hF/j+5z5U2+IHZUcvQFCOnf4SNzD+tVrDi1KA9yJ2hYX6N+enjSTs9/Uz2tXcIPFkCiKoOw67Usg9Ri6PWxonLswjDN457PIUNrf4jpFEYcCc8I4vwgMfVSUaTiM7h7eP8S4HcQEUgUlgEtX4yJEfu0Zu7O5XJDljiouUv2r2+pih8v2n0uHzJ5F9hKJV5AsoXgMTEuWyzN3sj+0yPYcuq2/bI9a8rQxJjqz/Pjjo/7oPEtIG8hsgiyHk0Tf9ObdBRxH+xxTqTmvFVFQOu3wGGUAegwFtLhEhKy2faHjHMQKIpzrL6l7CmASKImwuiynbTVBeQ/kzzzbeuWhaSuu3/YWlwacrvGgPaw+Q/+USS6OjGQw/Vqb3vlu9v41k/UFyD+c6gTv/2kEcR62m6sWKhaHzLHw3eiVyHG7+WO/9OZHpmBz4bNauWdZX6dzesrR1Zj7l/Uwfk3fP8XppXhI/d1MzcobPb5ziXmn+b0pcjPW7AMpFAAAAAElFTkSuQmCC"
img_hd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPCAYAAAGega+EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvlJREFUeNpi/P//ryYDA4MhEF9nAHIW9/b23HJwcHgLEECMQI4XUJSXWVRUdIOZmakmQACBpJuAeH9HR/stoMz/nz+/LwIpiwJyQEqlgfgbEG8FCCCQoB2QIQ7E7ED8mgGk3NbW9hOIBmEmkMirVy9ZQHRpaclDkJYOqEPYgPgGQACBBEKADC0glgJiEagEM9SSxzAXLwCZ5+/v/05GRuYXzGkgZ2ZnZz12dXV5A7LjOcieDRvWXbSzczAGsdnY2BiYmFgcQOw3b16tBlmnC2RLADEfEHMDMSsQgxz6E4jfgwwBCCCQIhMgQxCqgAPqHhD4CsRvQYpA1pkBsTIQi4ECEIhBYv9ANgHxXSC+xFBQkH8xMDDgLcihIAd3dXXeggWOs7Pze6B4DRMHByfv6dNneEJCQnWh1jBYW1t/Bkoe2Lt3rwCQKwcOSXFxsd+Ojo4v2dnZGbAAJqZfv35+A4UPMExe/fz5E+z9Y8eO8TIyMjtoaKiDAxTku2IgQxUac/xAzAh10ysgBrnvPEiRFZAhDMQ8aEHwGarwGUCAgRTZQMOJDymsOKBxyAINWCaoDaCg+QXE36GGgJLJByB+B1JoMH36DIft23foOzk5/gEG2wuQVQ0NjfJXr17jiI+Pe8nExMQwf/4CcZhvBQT4/zk6OrwODw+/xMzMDEooD0E2aTx69Mhg8+bNKgcOHIAr3rdvv8iaNWskr169yg3CIPbFixeELC0tfrCwsPxPSUnTZ2Fhi+vq6g4EKtcEuUgI6GpwsG/cuEkQFIIgNijoQaGKDMTExH8VFRU+BLG1tLS+5eXlq61YsVKhrKxUkAnqTzDw9/cDxfgBEDYzM/v869cvFIO+fv3CfPDgIb5p06ZLAb2uxMjIyODl5fUMZAbIRbc4ONjVgUBMTk7uJ0yToqLij7dv37IC8+8fUBgZGhr++Pv3L1N2do6WgIDAz/T0tCclJcVnhYSE7oDCCBRrThDvMQhAY40LGmvsSLHGgBZrX6GxBsoi70AYAGKpKzAKClpzAAAAAElFTkSuQmCC"
img_star = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIwSURBVDjLlZLNS5RRFMafe9/3vjPOjI1jaKKEVH40tGgRBWEibfoPQoKkVdtoEQQF4T/QqkVtWrSTFrVsF1FgJbWpIAh1k2PNh+PrfL4f95zTQk0HHKkDD/cc7vP8uHCuEhF0q/KnmXNgGR248PZFN4/GISXMC8L89DBPV0Dp4/SsazJjrtfb9/vdxfn/BgjzY5M8Aq8nBya+V3h93vtnQHFxat4kszntJAAAxus1YvnZQV5V/jyTEZarwnwFLGeFZdT0ZFOJdD84qoCDOpQ7grZfRNj020JSEOKvwvxGiF+q0tL0N5PuO+Mk0nC0B0BDsYCCImyzAIktBBloMwKJLSgKYcMAcdhC2KpVlIig+H5qxcv0n0xmj4Gbq+BwC2wtJLbgHUlMEFJwUpMIGpto16u+kJzSACAk+WCzvNbe+AVljkOYIcQQou3TbvdOJo+g4aNdqzaF+PT43HJVA8DQpcVIiPPtaqlEUQzlDELsTpgYwgTAQIjQqlUCtpQfn1spdmxh+PJSQyw9CrbKgM7tvcISQAxlBhC3GuCYXk3cWP25m3M7dk88qbWBRDVApaATOSjPBdXXwYEP5QyCgvjE/kwHgInHtHYBnYA2owhrPiiuw0sOw3EZFEagIB7qChDiYaUcNIoFtP1KxCTPhWiDw7WbXk9vKpnOgsI4exjg6Mbq96YQPxm79uPOvqvbXx4O3KrF6w8osv2df17kr5YXJq7vnw/S0v3k7Ie7xtud/wAaRnP+Cw8iKQAAAABJRU5ErkJggg=="
img_cartgo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKNSURBVDjLpVNLTxNRFP4GCkZK6QtftZVHaURLCHFBu7Cu0H/g0rhpdKEbjOlOEzCBjYmycS2kbggLWbHQmmho8GIw0YRWIhX6TKlFgvKYx5253juhBGIkMZ7kzEnOzHe/757zjcQYw/+E5V8B8XicaZoGSil4vSElk0lTgmEY0HX9UIqPDqYA+v1+9Pf3Y21tDVNTU4sWcYVwOGwCjgpVVTE5OVnq6enxZDIZzMzMrPIDn1kE8/LyMqxWKwqFAjweD7LZLHw+n9lvb2/H0tISurq6YLfbPfl8Hul0WhwYjcViCUskEpESiQRramrCxsZGiL8g1Wo1pCgK4TJDsiyTcrls1lKpZPa3t7fFdYpCWZ14iPs1NzcLFUQw22w2Ipg5IxHMTqeTdHd3w+VykWAwKIiEgoLASrU1Tk9Ps4GBAfCholKphARYMAtwsVgMrbhfkh26iZB+B7lcDkNDQ9K+AhFc0oNUKoWOjg6TORAIwOFwmMxut5vwvcDbegGv6GPBvm8e6aCRJiYmWG1dadsLMEODalCovOdxBdDrvYz51Tf4XCDYpUrdu/s/mPQ3J96Nh9nV4E3ojPvD0GGAobxZgNN6EnPfXmMh95bKVG00nTg+Pn6es97j7LcEu0jZpZrg7PpXaFwF5Wo0XcNP5Rf6fBFsaTsWsjIr1+2Z5Ho0Gr3N6yDPLD9gUKYyqE5xquUcTre04Yy9Ew31x3HCdhYf80kkM7NfdlQ4LHsDxNjYGPN6vaaBuNOekE0Fz+f4wAwVXCr8rRcR7ryGD9lZvE/NqzLQVxphyqEZjI6O1n6UweHh4acHZ9L7qHHrUtsV68LiJ6zXV49xsPrHFo6KzofSd92ob9019IbKCKO1/m/zF57K8A8dwwAAAABJRU5ErkJggg=="
//img_cog = "data:image/gif;base64,R0lGODlhEAAQAOZeAMvLy8fHx9TU1MXFxcbGxsTExMHBwby8vMLCwqampqioqNLS0tbW1tvb27m5uf7+/re3t9PT07S0tMnJyd3d3d7e3s3NzeLi4uPj4+Tk5KysrM/Pz+Xl5cjIyL29vff399zc3LW1tc7OzrGxsb6+vpubm7CwsNnZ2bKysm5ubrq6upSUlKqqqvLy8ujo6NXV1cDAwHBwcOfn52hoaOvr64uLi9jY2E9PT6Wlpe/v76enp+3t7WxsbPb29oKCgtHR0aGhoZycnOnp6W9vb3V1dfn5+Y+Pj4CAgHFxccrKyp6ennp6enNzc/z8/H19ffv7+2lpacPDw4iIiIWFhZCQkHR0dGpqaubm5rOzs2JiYvj4+OHh4f///8zMzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAF4ALAAAAAAQABAAAAfggF6CgzQvEVeDiYJaTVxdHBlYD08tihgiG0UdFRQOHxIKAYMuIDsNAyQMAiYmADIQol4cBSACJw2qJwsAHUsOg1sCXRMqQUAIBAYQBoIRSQU2FgdKDRQKUQgWKyslBUIMEyI4FYIZGgUqBBQ8MBcLBBYjF4IYCggQMAtZISUJGwRdJGS4oMDAAQcprBARJGCAgQEBWOgwQCIEixGDGCR4MQDAjwkBugzwAGCIhGYHKiSQMqUAghRVEiw4omEQihhMWhgBEABJjhk3qChy8eFBDQ8ooDzogUFRIgI+nBxwGggAOw=="


document.styleSheets[0].insertRule(".icon-cart-add { margin-left:5px; background-position:left center; background-repeat:no-repeat; padding:10px 0 5px 25px; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJZSURBVDjLpVJda5JhGPYH9Ac66bSdFHTydtDhIAiCiA6CEbGiL1bUTgaO9pHk1+y11ymyNT/wYypMxzanqa8Km9PJxg5EJcWBJq7OzUHIRlfP/VQyKWLRCzcP78113dd1X8+jAKD4n/pngtfrhdPpxMLCAqxW6x1FLpcD1dbWFjY2NpBOpyHLMmKxGNbX17GysoJgMIhAIACPx8OxR0dHODg4gMlkKiuy2SyOj4/R7Xb/Wp1OBw6H41O73Ua1WoUkSQ2DwTCiyGQyvNFqtZDP59FsNkG9RqOBZDKJ/f19RCIRjgmFQiiXy9zRzMzMYC+DVCqF7e1tRKNRYXNzE8vLywKRFxcXBVrDZrMJRDabzYLP5+P7q9Xqgd6AeDyOYrHIM6jX6zwDUiZypVLpKbOBKBQKpI6pqakzfbewurqKw8NDJBIJsKSFcDhMSgLZZWEJRNbpdILdbicyfrtGBpzY3d1FrVYDkUl5aWkJpVKJBnJltgr29vagVCq//fEduN1uShrz8/OwWCyUNFjS0Gg0UBqe44VlCI/e3sDQ60FcU16cOPVDeiLdfKUK3kOkbEXhswwpOYLb0gVcfnpW5ACXy3We2Xs3NzdHScNoNEKv11PSmJ6exl3dVayVTFj7YKbdIaYeQko9pgFf+QAWFrczOzs7KoriR0YePeng+stLeF+24+QXLlppwA8Ae9MTLGl+XTs7O/D7/Tzp8fFxjI2N4cqzc3gj34dOHuZkXWK438Gv0mq1UKlUmJyc7HPAgOpb4gCM8gOuTCf99zI4TTGwntUXsv3z1FP/O6UL4ZoSeea0AAAAAElFTkSuQmCC'); }", 0);
document.styleSheets[0].insertRule(".icon-cart-remove { margin-left:5px; background-position:left center; background-repeat:no-repeat; padding:10px 0 5px 25px; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ4SURBVDjLpZNLiFJRGMe/q1biA99UpqOilqALmYW6yM2MFLQtwU27bLbNLLSgidEethxcGLRTXIkbFyEYQlQu7qJNMD5AYXxcUZMRMhtf19s5NzRnExMdOPfAOff//f7fOd9HMAwD/zN4/ypIJpPMbDaD+XwOaL1PFAoF1sJisQCaps9M/NP6xEKj0QgOhwO63S6k0+kjHk7B5XKxgr+N6XQKqVSqbbPZ1LVaDbLZ7DEKGONhcrVaBaFQCK1WC9RqNdTrddBqtey+Xq+HSqUCJpMJJBKJutlsQqlUwgEfBAKBPM/tdhP5fJ4RCAQwGAyc6IDs9/vOyWRCIpvO8XhMdjoddm232+z+aDTC6VDYGQd/cH4ikQi7IDFZLBaTmIyIJCbLZDLSYrGAXC4nrVYrBmEHLawlls+YyWQYj8cD6FKh1+s5sRiTsZiiKKdSqSSRfadKpSIbjQaEQiFi5QAPZGm/WCyCwWBgyWazGaRSKUtWKBQkujzAQex2O6aviodYL6REIsEsn2vtrdmp6X6ByxQJvEEPRnwh8GfDJ7dy89fEeSqx4NMFxRp1+PqW9+IlgxVOv+ag+Ok9PSiXdtlKjMfjNxBlDxEfLonrDjZ/jGBzywv82geAjy9AIJGCXqfjnlSY3wFQTl6/378TjUZLSPAICQ+DweDh0kF+++WCf8VAwJ29Pz1wcBW4C0LPphCLxZ4i4XONRsMWEK60crm8cnHz6C1s370HwsY7mJx24CcKMPzOhXINqDN3EIlElo2yGw6HVw4++64dXBCL9jcUMw6P04Lhtzkcd7n0bMw8I87bzgXfxuPRSXuHSxM6mstQSPXmdm7+6heR5oijWAuHSQAAAABJRU5ErkJggg==') }", 0);

//document.styleSheets[0].insertRule("#nzbtable tbody tr.rowa:hover, #nzbtable tbody tr.rowb:hover { background-color: #EFECD1; color: #000 }", 0);
//document.styleSheets[0].insertRule("#nzbtable tbody tr.rowa:hover a, #nzbtable tbody tr.rowb:hover a { color: #000 }", 0);
//document.styleSheets[0].insertRule("#nzbtable tbody tr.selected { background-color: #EFECD1 !important; color: #000 !important }", 0);
document.styleSheets[0].insertRule("td.check { width: 60px; }", 0);
//document.styleSheets[0].insertRule(".movieinfo-tip,.viewimdb-tip,.movieinfo-text { display: none }", 0);
//document.styleSheets[0].insertRule("#browsetable a:link, #browsetable a:visited, #browsetable a.rndbtn, #browsetable span.rndbtn, #browsetable .rndbtn {background-color: white !important}", 0);

/* table top buttons */
document.styleSheets[0].insertRule(".viewcart { background-position:4px 4px; cursor: pointer; background-repeat:no-repeat; padding: 4px 2px 4px 20px !important; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE3SURBVCjPhZFfK4NxGIZ/R458Dz7B7wv4Go5WpJW8819mSw3bos202DsTNpT3FTbCRs0YkYPFasvKJhw5kpVEu5y8W0uZ7sPnup+e+34EorH+HIRZQsXfLtKkOSPJCXEOiLGNxgarpPniGW9WnPPN5y+9E3p5I4+n6DaLFHmeuOSRFEUSFNgjj04WDVcbQiCOuWBfnrIlE0RkjKDU8ck1VBytCIE45JYkD8QpECOHTpYIGVzYmo0UO5Q5IiyjqFLDKyNMyUVs1GJq1mvuiZJjkzvCZAhyw3ClrocVQiwwhwc3E4xjZ5f+SoOihpr66Hk1gOWWYGAeHzM4cWBnlEF6QZjLBqBaEbPKdMmpVP0WpbtkVjo/DMBv9aJzxTo2RhjAQoA0fkyFuhsmGWestqFL6cDEP9+s6gcdbFPqiEGjeAAAAABJRU5ErkJggg==') }", 0);
document.styleSheets[0].insertRule(".sendserver { background-position:4px 4px; cursor: pointer; background-repeat:no-repeat; padding: 4px 2px 4px 20px !important; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJUSURBVDjLpVPNaxNBFP8lqY1JSJOGFBtSU11BaEulUUFB7EUalB70kINCQfBv8FgNgvRUJCdPUj36FxgqKahpi18NSQXBikRbE6UfYpNtsruzO+ubTTaHNoLgwuMxs/P7eG/eOEzTxP98Xfs38vn8Y13XpxhjXZRB2QpN00R+mkwmb3QkKBaLAQI8CgaDSbfbC5VA4ByWP3LZ2xvE/HzmOq0OEhQKhcsCHA6Hoz6fD6WvZQh1zk1wkxORCYPIVFXtXAIdzsRiMWuj0VDACPyhuEIEvB0TiStWGR0JRI3d3d2oVqtNZcPA8MiYpW621EWz/+pAMBsEEofEpQjrxcI7yoalLv5FJq92dOAQoGw2a8bjcdRqNTrEUK5st9XtnNm+g7omQ+O698mt1YZN4LQdNJttWmEIZaNZ+5a/hLnfaSg6w0B4CApj9WsPj3kOlNAGt4DPNqdJmUH9weCjvvSFTmKo/xxqyh6K31/L47OhwKvbv2SLQDTHnkhhWfRA5xomRm7CoLXliCaisruB0YELkLWGc2X95e6p+85Q24G4BZfL1aybXCi6ZoG/7XwG4zoR0kQaDFW1hrGjFyGzuvNNaXHH2XLwNpfLQZZl+P1+HPa4iUCBbug40hNDf88gIgEJh1we9PmjyG8sYenL4lZdw1mHbT2dTk/SPNyLRCJnjksn8GB1Cgo506gU4UYKD+O8lMD79WUsrD3/qem4VJkxPzr2v8ZUKpUgolmKUfsxibwcncPpwXG8WFsoa9wCf2rPwb980l3HnsFd3gY3pM0Zs2Tv/wEq26vP9fcF2QAAAABJRU5ErkJggg==') }", 0);
document.styleSheets[0].insertRule(".mynzb { background-position:4px 4px; cursor: pointer; background-repeat:no-repeat; padding: 4px 2px 4px 20px !important; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKNSURBVDjLpVNLTxNRFP4GCkZK6QtftZVHaURLCHFBu7Cu0H/g0rhpdKEbjOlOEzCBjYmycS2kbggLWbHQmmho8GIw0YRWIhX6TKlFgvKYx5253juhBGIkMZ7kzEnOzHe/757zjcQYw/+E5V8B8XicaZoGSil4vSElk0lTgmEY0HX9UIqPDqYA+v1+9Pf3Y21tDVNTU4sWcYVwOGwCjgpVVTE5OVnq6enxZDIZzMzMrPIDn1kE8/LyMqxWKwqFAjweD7LZLHw+n9lvb2/H0tISurq6YLfbPfl8Hul0WhwYjcViCUskEpESiQRramrCxsZGiL8g1Wo1pCgK4TJDsiyTcrls1lKpZPa3t7fFdYpCWZ14iPs1NzcLFUQw22w2Ipg5IxHMTqeTdHd3w+VykWAwKIiEgoLASrU1Tk9Ps4GBAfCholKphARYMAtwsVgMrbhfkh26iZB+B7lcDkNDQ9K+AhFc0oNUKoWOjg6TORAIwOFwmMxut5vwvcDbegGv6GPBvm8e6aCRJiYmWG1dadsLMEODalCovOdxBdDrvYz51Tf4XCDYpUrdu/s/mPQ3J96Nh9nV4E3ojPvD0GGAobxZgNN6EnPfXmMh95bKVG00nTg+Pn6es97j7LcEu0jZpZrg7PpXaFwF5Wo0XcNP5Rf6fBFsaTsWsjIr1+2Z5Ho0Gr3N6yDPLD9gUKYyqE5xquUcTre04Yy9Ew31x3HCdhYf80kkM7NfdlQ4LHsDxNjYGPN6vaaBuNOekE0Fz+f4wAwVXCr8rRcR7ryGD9lZvE/NqzLQVxphyqEZjI6O1n6UweHh4acHZ9L7qHHrUtsV68LiJ6zXV49xsPrHFo6KzofSd92ob9019IbKCKO1/m/zF57K8A8dwwAAAABJRU5ErkJggg==') }", 0);
document.styleSheets[0].insertRule(".zip { background-position:4px 4px; cursor: pointer; background-repeat:no-repeat; padding: 4px 2px 4px 20px !important; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKQSURBVDjLbZNNaJxVFIafe7/5KTPzpUloNK0tIsowCtbiQgRRQReudCMVqYrdiLgQ01UrWUgXXZQumoU2myyKii66dOFCEUo3IiL+VRMFHactYpsMmsy0mbnnx8X8tEn7wuHAudyH97zcG9wdgKWl9zNgl7vvrVar51T1PndHVQHDzBCRFGNhqd1ePXb06PF1gALAhbONF+7PanPtymtP9G2iVK3WmJjYibtjZuNupsWVlYtviaRTwABw4WzjEPDRVGMy/vt3QLpCu73G2toqZoKZE2Mkz3PyfBKxgKplDFUA3rz7wL5Y2lnigdrHiDhuRlaoYJslrv3cWb7cfehka/3BxUY93+EGqolbAU/tqz+K2V/MzFQAHZYQ4146v55v/NPd81UxL6uKQgyY2RgQB025fOUPCC9COAjhJVqt38BlcKpKb/M65kbq9YfB3nQAGOVSxqXWCXDBSZTLBWAAMDOKsYibYURE0naAMjOzC5gc2Pc0vDwApJTQGx3UDJHNLQ7GK1xq/Q7hFQivQjzMn82LY4CqhiwWw8BBQNW2OxBK5Yxm812whNNnx5YVtBBkoxICkLqYbcugt9Fh9+xj4/RHtblxA7EMVZsOYZC+qqMqWwBHfvr829OjgRNIWkIsIhb54cr+r7Ms+3Bqanr0GjHzm4AnDy8vAAujwfz83NTs7O7z3W7nYTOjH3uPp7RuWZYNHdhtDrZIVda/8+fPWa06nfWvfjJxdfFTEd2zvPzLZyn1CCHSrx954/UPWi8DC2H0G2/VM8ebzeceqd375fer/9WvnTgDVET0oLsWzJDmPe/lzx64K//ix43WHQH1t1fmgLkC/TNPy8lFM4vuWhGx6G72TXX+UAqVd4DT/wMfm3vSJoP5ygAAAABJRU5ErkJggg==') }", 0);
document.styleSheets[0].insertRule(".remcart { background-position:4px 4px; cursor: pointer; background-repeat:no-repeat; padding: 4px 2px 4px 20px !important; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKoSURBVDjLpZLbT5JhHMdZ1/VP1Cqrtco21kU3zevWVa3NXOuuedVmoU2jUR6CoRwcw1SYHIzJQQxBUXgLXg6Ga+mIwkBBBp08pYGvEOa393nbWC5Xa1389mzPnu/v+/t+nh8PAO9/6p8FBoMBWq0Wvb29UKlU13ihUAikAoEAfD4fKIrC5OQkxsfHMTo6CrvdDovFApPJBL1ez70tl8vI5XKQy+UxXjAYxPb2Nkql0h8rn89Do9G839jYwNzcHGQyWVoikdTzaJrmLrLZLKamppDJZEDu0uk0PB4PkskknE4n98ZqtSIWi3ETicXimgoDr9eLcDgMl8vF9/v9sNlsfCI2Go18EqOvr49PxEqlkj84OMjlb21trao0cLvdiEajHINUKsUxIM5EHI/HQTmUmKcFGHqixezsLHGHUCjcv+sXRkZGUCgUMDExAZY03+FwECf+sNWEhLs2vZq0YMZeZ+zv7ydi/PaNbK6W6elpJBIJEDFxNpvNiIdUWI4bUS7M4/XwFbwKO9DU1LSz5x7odDpCGj09Peju7kafqg1R62UUl50ofujC2oILkaGbENxp2PnrIr21Xdr3xnzRsPLOimL2AehHZ/Ft1YoZbQ1kwutfdzUYGBg4ypJ+rFarCWl0dnZCIxcgTTWjtKQHM38DdMcZbGUasZ4ag6frwveI4tyBSgMWVgs5FQrFLalUuigVtzWwTi+/sOC2Fm9jM3H1ZyXr2ChyZPxKhCTVwkoDdqdb2LXkFiUSiWBM14wM3YXSJzXnvpmsZSNUcyeTqgfz8Snohyc/+0Unju/K3d7eDpFIhJD8/DqzsoDSGoXiEstgyfJL2VDOx5B7YcSz5iOWPQGy460EO04zgbZTDOvEsE6M7/4x5vm9KoYVMdTdwwzVeIjxCg4GfgDxYPxXmKLFvgAAAABJRU5ErkJggg==') }", 0);
document.styleSheets[0].insertRule(".resetNew { background-position:4px 4px; cursor: pointer; background-repeat:no-repeat; padding: 4px 2px 4px 20px !important; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEMSURBVDjL3ZLBSgJRFIYvtO0BfIPeI3qBNj2Cy1rWzlWbkcBNYhC0TletJKOFq1lIILhQJCywaDZOkINiGl/n3DNj6LaF4MDHGebc/5tz544D3H9w2yAI3LkQp7UgREJRSIS+0BJqwr6QTzkWulqdD09juD3Ah5PI7r8TiPvw0YJeDUq7cJ83NDzqwmUOFUyYT/ASfasGm6d4kQo1OB3JszN4fTDujuBrqP2hW4baVxbMBIuZTfAeQucGxm/w+WzB6AleGipo/Am06hTrEwQupLhjwkFdtlOFnzlc72n/cFWgQb3WJ8i22a7A44mtCfQQ7BSyL6617BtWZ+kphMKFlwSusrJmW/7ETQt+AQhq/TxibW0lAAAAAElFTkSuQmCC') }", 0);

document.styleSheets[0].insertRule("input.nzb_check {float:left}", 0);
document.styleSheets[0].insertRule("td.check {width: 90px !important;}", 0);
document.styleSheets[0].insertRule(".container_12 {margin: 0 !important; width: 100% !important}", 0);


function CreateNewCounter(element, img_data, epoch)
{
	var img_element = document.createElement('img');
	img_element.setAttribute("src", img_data);
	img_element.setAttribute("style", "padding-right:3px;cursor: pointer");
	img_element.setAttribute("Title", "Reset New Counter");
	img_element.setAttribute("data-epoch", epoch);
	element.parentNode.insertBefore(img_element, element);
	//element.appendChild(img_element);
	return img_element;
}

var last_NZB_id = GM_getValue("last_nzb_id", 1) *1;
var topNZBID = GM_getValue("topNZBID", 1) *1;
	
function doReset() {
	
	if (topNZBID > last_NZB_id) {
		
	  setTimeout(function() {
		GM_setValue("last_nzb_id", topNZBID);
		GM_setValue("topNZBID", topNZBID);
	  }, 0);
		//window.setTimeout(GM_setValue, 0, 'status_' + valid_id, 50);

		doNew(topNZBID);
	}
}

function newTagClosure(someNum)
{
	// Local variables that end up within closure
	var num = someNum;
	return function(evt)
	{
		GM_setValue("last_nzb_id", num);
		doNew(num);
	}
}

function doNew(someNum) {
	var imgs = document.evaluate("//img[@title='Reset New Counter']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var num = someNum;
	for (var i=0; i<imgs.snapshotLength; i++) {
		var img = imgs.snapshotItem(i)
		if ( (img.getAttribute("data-epoch")*1) <= someNum ) {
			img.setAttribute("style", "display:none");
		}		
	}
}


function markCategory(element, loc, NZBid)
{
	if (element.getElementsByTagName("a")[0]) {
		var CategoryNode = element.getElementsByTagName("a")[0];
		var CategoryText = CategoryNode.textContent;
		HD = CategoryText.substr( CategoryText.length - 3);
		CategoryText = CategoryText.substr(0, CategoryText.indexOf("-"));
	} else {
		var t= document.getElementsByTagName("H3")[0].textContent
		t = t.replace(/home > /gi, "");
		CategoryText = t.replace(" > ", "-");
		HD = CategoryText.substr( CategoryText.length - 3);
		CategoryText = CategoryText.substr(0, CategoryText.indexOf("-"));
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
		//loc.appendChild(img_element)
		loc.parentNode.insertBefore(img_element, loc);
		
		if (HD == "264") {
			var img_element = document.createElement('img');
			img_element.setAttribute("src", img_hd);
			img_element.setAttribute("Title", "High Definition");
			img_element.setAttribute("style", "margin-right: 4px;");
			loc.parentNode.insertBefore(img_element, loc);
		}
		
	return CategoryText;
}






function convertDT(d) {
	
	try {
		d = d.replace(/-/gi, "/");
		var myDate = new Date(d); // Your timezone!
		//console.log(myDate);
		var myEpoch = myDate.getTime()/1000.0;
		
		return myEpoch;		
	} catch (e) {
		return null;
	}
}


function init()
{
	//var topNZBID = GM_getValue("topNZBID", 1) *1;
	localStorage.setItem('tags', '[]');
	var tagArr = eval(localStorage.getItem('tags'));

	if (document.getElementById('browsetable')) {
		var last_NZB_id = GM_getValue("last_nzb_id", 1) *1;
		var tbl = document.getElementById('browsetable');
		
		var tds = tbl.getElementsByTagName('tr');
		for (var i=1; i<tds.length; i++) {
			

			var td = tds[i];
			
			var DT = tds[i].getElementsByTagName('td')[3].getAttribute("title");
			var NZBid = convertDT(DT);
			var GUID = tds[i].getAttribute("id").substring(4);

			if  (NZBid !== null) {
					  NZBid = parseFloat(NZBid);
	
						if (NZBid > topNZBID) {
							topNZBID = NZBid;
						}
						
						if(NZBid > last_NZB_id)
						{
							var img = CreateNewCounter(tds[i].getElementsByTagName('td')[1].getElementsByTagName('label')[0], img_new, NZBid);
							img.addEventListener('click', newTagClosure(NZBid), true);
						}
						
					if (i%2) {
						if ( tds[i].getAttribute("class").indexOf("selected") > 0 ) {
							tds[i].setAttribute("class", "selected");
						} else {
							tds[i].setAttribute("class", "");	
						}
					  
					} else {
						if ( tds[i].getAttribute("class").indexOf("selected") > 0 ) {
							tds[i].setAttribute("class", "alt selected");
						} else {
							tds[i].setAttribute("class", "alt");	
						}
					}
					
					//move buttons to right
					$(td).find("div.icon").appendTo( "#guid" + GUID + " td:first");
					
					//add tag buttom
					var a = $("<a href='#' class='rndbtn'>New Tag</a>")
					$(a).bind('click',function() { 	
						//save tag
						var answer = prompt ("What is the tag in this post?", $(this).parent().parent().prev().text() );
						
						if (answer == "") {
						 return false;	
						}
						if (localStorage.getItem("tags") === null) {
							var tagArray = [];
						}
						var tagArray = eval(localStorage.getItem('tags'));
						tagArray.push(answer);
						localStorage.setItem('tags', JSON.stringify(tagArray));
						
						var tit = $(this).parent().parent().prev().text();
						var p = tit.indexOf(answer);
						
						if ( p > -1 ) {
						  	$(this).parent().parent().prev().find("a.title:first").html(
						  		tit.substring(0, p) +  
						  		"<span style='color: green; font-weight: bold'>" + answer + "</span>" + 
						  		tit.substring( (p + answer.length) ) 
						  	)
						}
					  		
						return false;
					});
					$(tds[i]).find("div.btns").append(a);
					
					//add erase tag
					var b = $("<a href='#' class='rndbtn'>Rem Tag</a>")
					$(b).bind('click',function() { 	
						var tit = $(this).parent().parent().prev().find("a.title:first span:first").text();
						if (localStorage.getItem("tags") === null) {
							var tagArray = [];
						}
						var tagArray = eval(localStorage.getItem('tags'));
						for(var kk = tagArray.length-1; kk >= 0; kk--){              // STEP 1
							
							  if (tagArray[kk] == tit ) {
							  	tagArray.splice(kk,1);
							  }
						}
						localStorage.setItem('tags', JSON.stringify(tagArray));
						$(this).parent().parent().prev().find("a.title:first").html( $(this).parent().parent().prev().find("a.title:first").text() );
						return false;
						
					});
					$(tds[i]).find("div.btns").append(b);
					
					var tit = $(tds[i]).find("a.title:first").text();

					for(var kk=0; kk< tagArr.length; kk++) {
						if (tagArr[kk] != null) {
						  var p = tit.indexOf(tagArr[kk])
						  if ( p > -1 ) {
						  	$(tds[i]).find("a.title:first").html(
						  		tit.substring(0, p) +  
						  		"<span style='color: green; font-weight: bold'>" + tagArr[kk] + "</span>" + 
						  		tit.substring( (p + tagArr[kk].length) ) 
						  		)
						  	 break;
						  }
						}

					}
					
					//Add Category icons
					var CurCat = markCategory(tds[i].getElementsByTagName('td')[2], tds[i].getElementsByTagName('td')[1].getElementsByTagName('label')[0], NZBid );
					//console.log(CurCat);

					//add imdb covers
					if (CurCat == "Movies") {
						var links = tds[i].getElementsByTagName('td')[1].getElementsByTagName('a');
						var imdblink = "";
						var imdbpic = "";
						var movietext = "";
						for(var kk = 0; kk < links.length; ++kk) {
							if(links[kk].getAttribute('rel') == "movie" && $(td).find("td:eq(2) a").text().substring(0, 5) == "Movie" ) {
								imdb = links[kk].getAttribute('name').substr(4)
								links[kk].setAttribute("id", "imdbl" + GUID);
								links[kk].setAttribute("NZBid", GUID);
								
								imdblink = "http://www.imdb.com/title/tt" + imdb + "/";
								imdbpic = "http://beta.nzbs.org/covers/movies/" + imdb + "-cover.jpg";
							}

							if ( links[kk].innerHTML == "View Movie" ) {
								movietext = links[kk].getAttribute("title")
							}
						}
						
						if (imdblink != "" && imdbpic != "") {
							var a = document.createElement('a');
							a.setAttribute("href", imdblink);
							a.setAttribute("target", "_blank");
							var img = document.createElement('div');
							img.setAttribute("style", "float:left; width:100px; height: 140px; border: 2px solid #333333;-moz-border-radius: 10px; margin-right: 10px;background-image: url('" + imdbpic + "'); background-size: 100% auto;");
							a.appendChild(img)
							
							tds[i].getElementsByTagName('td')[1].insertBefore( a, tds[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0] );
							var div = document.createElement('div');
							div.setAttribute("id", "padder" + GUID);
							div.setAttribute("style", "width: 800px;height: 50px; overflow:hidden; margin-left: 115px;");
							//tds[i].getElementsByTagName('td')[1].insertBefore( div, tds[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0] );
							var div = document.createElement('div');
							div.setAttribute("id", "imdb" + GUID);
							div.setAttribute("style", "clear: both");
	
							//$(div).appendTo( $(td).find("div.resextra") );
							var info = document.createElement('div');
							info.setAttribute("style", "float: left; width: 80%; ");
							info.innerHTML = movietext;
							//alert(movietext)
							tds[i].getElementsByTagName('td')[1].getElementsByTagName('div')[1].appendChild(info);
						}
					}
					
					//Do Some Norp previews
					if (CurCat == "XXX") {
						if ( $(td).find("a.modal_prev").size() > 0 ) {
							var a = document.createElement('a');
							a.setAttribute("href", "/covers/preview/" + GUID.substring(0,2) + "/" + GUID + "_1.jpg#" + $(td).find("a.title").text() );
							a.setAttribute("target", "_blank");
							var img = document.createElement('div');
							img.setAttribute("style", "float:left; width:100px; height: 140px; border: 2px solid #333333;-moz-border-radius: 10px; margin-right: 10px;background-image: url('/covers/preview/" + GUID.substring(0,2) + "/" + GUID + "_1_thumb.jpg'); background-size: 100% auto;");
							a.appendChild(img)
							
							$(img).hover(
							  function () {
							    $(this).css("background-size", "400% auto");
							  }, 
							  function () {
							    $(this).css("background-size", "100% auto");
							  });

							tds[i].getElementsByTagName('td')[1].insertBefore( a, tds[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0] );
							var div = document.createElement('div');
							div.setAttribute("id", "padder" + GUID);
							div.setAttribute("style", "width: 800px;height: 50px; overflow:hidden; margin-left: 115px;");
							tds[i].getElementsByTagName('td')[1].insertBefore( div, tds[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0] );
							var div = document.createElement('div');
							div.setAttribute("id", "norp" + GUID);
							div.setAttribute("style", "clear: both");
	
							$(div).appendTo( $(td).find("div.resextra") );
						}
					}
					
					//Do some console preview
					if (CurCat == "Console") {
						if ( $(td).find("a.modal_console").size() > 0 ) {
							
							var consoleid = $(td).find("a.modal_console").attr("name").substring(4);
							
							var a = document.createElement('a');
							var h = "#";
							if ($(td).find("a.rndbtn[target='_blank']:first").size() > 0 ) {
								h = $(td).find("a.rndbtn[target='_blank']:first").attr("href");
								console.log(h);
							}
							
							a.setAttribute("href", h);
							a.setAttribute("target", "_blank");
							var img = document.createElement('div');
							img.setAttribute("style", "float:left; width:100px; height: 140px; border: 2px solid #333333;-moz-border-radius: 10px; margin-right: 10px;background-image: url('/covers/console/" + consoleid + ".jpg'); background-size: 100% auto;");
							a.appendChild(img)
							
							tds[i].getElementsByTagName('td')[1].insertBefore( a, tds[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0] );
							var div = document.createElement('div');
							div.setAttribute("id", "padder" + GUID);
							div.setAttribute("style", "width: 800px;height: 50px; overflow:hidden; margin-left: 115px;");
							tds[i].getElementsByTagName('td')[1].insertBefore( div, tds[i].getElementsByTagName('td')[1].getElementsByTagName('img')[0] );
							var div = document.createElement('div');
							div.setAttribute("id", "norp" + GUID);
							div.setAttribute("style", "clear: both");
	
							$(div).appendTo( $(td).find("div.resextra") );
										
						}
					
					}
			}
		}
		GM_setValue("topNZBID", topNZBID);
		//recodeSelectAll();
	}
	
	//topNavicons()
	
	
	
	function loadimdbInfo(NZBid) {
	
		if ( NZBid !== null ) {
			

		}
	}
	

}
var $ = unsafeWindow.jQuery.noConflict();


init();

	window.setTimeout(function () {	
		
		
		//adds icons to button 

	
					
		if ( document.getElementById('nzb_multi_operations_form') ) {

				//var buttons = document.getElementById('nzb_multi_operations_form').getElementsByTagName('div')[0];

		
		$("input.nzb_multi_operations_download").addClass("submit").addClass("zip");
		$("input.nzb_multi_operations_cart").addClass("submit").addClass("mynzb");
				
				//resetNew button
				var resetNew = $("<input type='button' value='Reset New Counters'  class='submit resetNew' />");
				$("div.nzb_multi_operations").append( $(resetNew) )
				$("input.resetNew").live('click',function() { 	
					doReset();
				})
		}
	},500);