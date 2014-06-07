// ==UserScript==

// @name Tumblr Post
// @namespace http://localhost/odds/
// @description Adds additional functionality to cross reference current post with previous tumblr posts
// @include http://www.tumblr.com/new/text


// ==/UserScript==

var _tumblrPostHTML =   "\t<style>\n#tumblr-post {\n\twidth: 581px;\n\theight: 20px;\n\tbackground-color: #FFFFFF;\n\tborder: 1px solid #BBBBBB;\n\tmargin-top: 5px;\n\tpadding: 8px;\n\t-moz-box-shadow: 5px 5px 5px #777777;\n\tposition:absolute;\n\tz-index: 1000;\n}\n\n#tumblr-post > div:first-of-type {\n\tcolor: #666666;\n\tfont-weight: bold;\n\theight: 16px;\n\twidth: 16px;\n\tfloat: right;\n\ttext-align: center;\n\tline-height: 14px;\n\tborder: 1px solid #BBBBBB;\n\t-moz-border-radius: 8px;\n\n}\n\n#tumblr-post > h2 {\n\tfloat:left;\n\tmargin-top:0;\n}\n\n#tumblr-post > div:first-of-type:hover {\n\tcolor: #FF0000;\n\tcursor: pointer;\n}\n\n#tumblr-post > div:last-of-type {\n\tborder-top: 1px solid #BBBBBB;\n\tpadding: 5px;\n\tmargin: 3px;\n\tclear:left;\n}\n\n#tumblr-post > div:last-of-type a > em {\n\tfloat:right;\n\tfont-size: 0.8em;\t\n\tcolor:#7C95AC;\n\n}\n\n#tumblr-post > div:last-of-type a  {\n\tdisplay:block;\n\theight:18px;\n\ttext-decoration:none;\n\t\n}\n\n#tumblr-post > div:last-of-type a > span {\n\t\n\t\n}\n\n#tumblr-post li {\n\tpadding:0;\n}\n\n#tumblr-post-loading {\n\tmargin-left:25px;\n}\n<\/style>\n<div id=\"tumblr-post\">\n<h2>Results:<\/h2>\n<img src=\"data:image\/gif;base64,R0lGODlh3AATAPQAAP\/\/\/wAAAL6+vqamppycnLi4uLKyssjIyNjY2MTExNTU1Nzc3ODg4OTk5LCw\nsLy8vOjo6Ozs7MrKyvLy8vT09M7Ozvb29sbGxtDQ0O7u7tbW1sLCwqqqqvj4+KCgoJaWliH+GkNy\nZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAA\n3AATAAAF\/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv\/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQ\ntAQFg8PwKIMHnLF63N2438f0mv1I2O8buXjvaOPtaHx7fn96goR4hmuId4qDdX95c4+RG4GCBoyA\njpmQhZN0YGYFXitdZBIVGAoKoq4CG6Qaswi1CBtkcG6ytrYJubq8vbfAcMK9v7q7D8O1ycrHvsW6\nzcTKsczNz8HZw9vG3cjTsMIYqQgDLAQGCQoLDA0QCwUHqfYSFw\/xEPz88\/X38Onr14+Bp4ADCco7\neC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdE\/9chIeBgDoB7gjaWUWTlYAFE3LqzDCT\nlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKwgcWABB5y1a\ncFNZmEvXwoJ2cGfJrTv3bl69Ffj2xZt3L1+\/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3f\nRatCLYMIFCzwLEprg84OsDus\/tvqdezZf13Hvr2B9Szdu2X3pg18N+68xXn7rh1c+PLksI\/Dhe6c\nuO3ow3NfV92bdArTqC2Ebc3A8vjf5QWf15Bg7Nz17c2fj69+fnq+8N2Lty+fuP78\/eV2X13neIcC\neBRwxorbZrAxAJoCDHbgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBBAJNv\n1DVV01MZdJhhjdkplWNzO\/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJgxQCwT40PjfAV4G\nqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA00AqVB4hG5IJ9PvYnhIFOxmdqhpaI6GeHCtpo\noisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5\nBAAKAAEALAAAAADcABMAAAX\/ICCOZGmeaKqubOu+cCzPdG3feK7vfO\/\/wKBwSAQIBoSkcslsOp\/Q\nqHRKrVqv2Kx2OhC0BAXHx\/EoCzboAcdhcLDdgwJ6nua03YZ8PMFPoBMca215eg98G36IgYNvDgOG\nh4lqjHd7fXOTjYV9nItvhJaIfYF4jXuIf4CCbHmOBZySdoOtj5eja59wBmYFXitdHhwSFRgKxhob\nBgUPAmdoyxoI0tPJaM5+u9PaCQZzZ9gP2tPcdM7L4tLVznPn6OQb18nh6NV0fu3i5OvP8\/nd1qjw\naasHcIPAcf\/gBSyAAMMwBANYEAhWYQGDBhAyLihwYJiEjx8fYMxIcsGDAxVA\/yYIOZIkBAaGPIK8\nINJlRpgrPeasaRPmx5QgJfB0abLjz50tSeIM+pFmUo0nQQIV+vRlTJUSnNq0KlXCSq09ozIFexEB\nAYkeNiwgOaEtn2LFpGEQsKCtXbcSjOmVlqDuhAx3+eg1Jo3u37sZBA9GoMAw4MB5FyMwfLht4sh7\nG\/utPGHlYAV8Nz9OnOBz4c2VFWem\/Pivar0aKCP2LFn2XwhnVxBwsPbuBAQbEGiIFg1BggoWkidv\na5z4cL7IlStfkED48OIYoiufYIH68+cKPkqfnsB58ePjmZd3Dj199\/XE20tv6\/27XO3S6z9nPCz9\nBP3FISDefL\/Bt192\/uWmAv8BFzAQAQUWWFaaBgqA11hbHWTIXWIVXifNhRlq6FqF1sm1QQYhdiAh\nbNEYc2KKK1pXnAIvhrjhBh0KxxiINlqQAY4UXjdcjSJyeAx2G2BYJJD7NZQkjCPKuCORKnbAIXsu\nKhlhBxEomAIBBzgIYXIfHfmhAAyMR2ZkHk62gJoWlNlhi33ZJZ2cQiKTJoG05Wjcm3xith9dcOK5\nX51tLRenoHTuud2iMnaolp3KGXrdBo7eKYF5p\/mXgJcogClmcgzAR5gCKymXYqlCgmacdhp2UCqL\n96mq4nuDBTmgBasaCFp4sHaQHHUsGvNRiiGyep1exyIra2mS7dprrtA5++z\/Z8ZKYGuGsy6GqgTI\nDvupRGE+6CO0x3xI5Y2mOTkBjD4ySeGU79o44mcaSEClhglgsKyJ9S5ZTGY0Bnzrj+3SiKK9Rh5z\njAALCywZBk\/ayCWO3hYM5Y8Dn6qxxRFsgAGoJwwgDQRtYXAAragyQOmaLKNZKGaEuUlpyiub+ad\/\nKtPqpntypvvnzR30DBtjMhNodK6Eqrl0zU0\/GjTUgG43wdN6Ra2pAhGtAAZGE5Ta8TH6wknd2Iyt\nNKaiZ+Or79oR\/tcvthIcAPe7DGAs9Edwk6r3qWoTaNzY2fb9HuHh2S343Hs1VIHhYtOt+Hh551rh\n24vP5YvXSGzh+eeghy76GuikU9FFEainrvrqrLfu+uuwxy777LTXfkIIACH5BAAKAAIALAAAAADc\nABMAAAX\/ICCOZGmeaKqubOu+cCzPdG3feK7vfO\/\/wKBwSAQIBoSkcslsOp\/QqHRKrVqv2Kx2OhC0\nBAWHB2l4CDZo9IDjcBja7UEhTV+3DXi3PJFA8xMcbHiDBgMPG31pgHBvg4Z9iYiBjYx7kWocb26O\nD398mI2EhoiegJlud4UFiZ5sm6Kdn2mBr5t7pJ9rlG0cHg5gXitdaxwFGArIGgoaGwYCZ3QFDwjU\n1AoIzdCQzdPV1c0bZ9vS3tUJBmjQaGXl1OB0feze1+faiBvk8wjnimn55e\/o4OtWjp+4NPIKogsX\njaA3g\/fiGZBQAcEAFgQGOChgYEEDCCBBLihwQILJkxIe\/3wMKfJBSQkJYJpUyRIkgwcVUJq8QLPm\nTYoyY6ZcyfJmTp08iYZc8MBkhZgxk9aEcPOlzp5FmwI9KdWn1qASurJkClRoWKwhq6IUqpJBAwQE\nMBYroAHkhLt3+RyzhgCDgAV48Wbgg+waAnoLMgTOm6DwQ8CLBzdGdvjw38V5JTg2lzhyTMeUEwBW\nHPgzZc4TSOM1bZia6LuqJxCmnOxv7NSsl1mGHHiw5tOuIWeAEHcFATwJME\/ApgFBc3MVLEgPvE+D\ndb4JokufPmFBAuvPXWu3MIF89wTOmxvOvp179evQtwf2nr6aApPyzVd3jn089e\/8xdfeXe\/xdZ9\/\nd1ngHf98lbHH3V0LMrgPgsWpcFwBEFBgHmyNXWeYAgLc1UF5sG2wTHjIhNjBiIKZCN81GGyQwYq9\nuajeMiBOQGOLJ1KjTI40kmfBYNfc2NcGIpI4pI0vyrhjiT1WFqOOLEIZnjVOVpmajYfBiCSNLGbA\n5YdOkjdihSkQwIEEEWg4nQUmvYhYe+bFKaFodN5lp3rKvJYfnBKAJ+gGDMi3mmbwWYfng7IheuWi\nhu5p32XcSWdSj+stkF95dp64jJ+RBipocHkCCp6PCiRQ6INookCAAwy0yd2CtNET3Yo7RvihBjFZ\nAOaKDHT43DL4BQnsZMo8xx6uI1oQrHXXhHZrB28G62n\/YSYxi+uzP2IrgbbHbiaer7hCiOxDFWhr\nbmGnLVuus5NFexhFuHLX6gkEECorlLpZo0CWJG4pLjIACykmBsp0eSSVeC15TDJeUhlkowlL+SWL\nNJpW2WEF87urXzNWSZ6JOEb7b8g1brZMjCg3ezBtWKKc4MvyEtwybPeaMAA1ECRoAQYHYLpbeYYC\nLfQ+mtL5c9CnfQpYpUtHOSejEgT9ogZ\/GSqd0f2m+LR5WzOtHqlQX1pYwpC+WbXKqSYtpJ5Mt4a0\n1lGzS3akF60AxkcTaLgAyRBPWCoDgHfJqwRuBuzdw\/1ml3iCwTIeLUWJN0v4McMe7uasCTxseNWP\nSxc5RbvIgD7geZLbGrqCG3jepUmbbze63Y6fvjiOylbwOITPfIHEFsAHL\/zwxBdvPBVdFKH88sw3\n7\/zz0Ecv\/fTUV2\/99SeEAAAh+QQACgADACwAAAAA3AATAAAF\/yAgjmRpnmiqrmzrvnAsz3Rt33iu\n73zv\/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQtAQFh2cw8BQEm3T6yHEYHHD4oKCuD9qGvNsx\nT6QTgAkcHHmFeX11fm17hXwPG35qgnhxbwMPkXaLhgZ9gWp3bpyegX4DcG+inY+Qn6eclpiZkHh6\nepetgLSUcBxlD2csXXdvBQrHGgoaGhsGaIkFDwjTCArTzX+QadHU3c1ofpHc3dcGG89\/4+TYktvS\n1NYI7OHu3fEJ5tpqBu\/k+HX7+nXDB06SuoHm0KXhR65cQT8P3FRAMIAFgVMPwDCAwLHjggIHJIgc\neeFBg44eC\/+ITCCBZYKSJ1FCWPBgpE2YMmc+qNCypwScMmnaXAkUJYOaFVyKLOqx5tCXJnMelcBz\nJNSYKIX2ZPkzqsyjPLku9Zr1QciVErYxaICAgEUOBRJIgzChbt0MLOPFwyBggV27eCUcmxZvg9+\/\ndfPGo5bg8N\/Ag61ZM4w4seDF1fpWhizZmoa+GSortgcaMWd\/fkP\/HY0MgWbTipVV++wY8GhvqSG4\nXUEgoYTKE+Qh0OCvggULiBckWEZ4Ggbjx5HXVc58IPQJ0idQJ66XanTpFraTe348+XLizRNcz658\neHMN3rNPT+C+G\/nodqk3t6a+fN3j+u0Xn3nVTQPfdRPspkL\/b+dEIN8EeMm2GAYbTNABdrbJ1hyF\nFv5lQYTodSZABhc+loCEyhxTYYkZopdMMiNeiBxyIFajV4wYHpfBBspUl8yKHu6ooV5APsZjQxyy\neNeJ3N1IYod38cgdPBUid6GCKfRWgAYU4IccSyHew8B3doGJHmMLkGkZcynKk2Z50Ym0zJzLbDCm\nfBbI6eIyCdyJmJmoqZmnBAXy9+Z\/yOlZDZpwYihnj7IZpuYEevrYJ5mJEuqiof4l+NYDEXQpXQcM\nnNjZNDx1oGqJ4S2nF3EsqWrhqqVWl6JIslpAK5MaIqDeqjJq56qN1aTaQaPbHTPYr8Be6Gsyyh6D\na7OkmmqP\/7GyztdrNVQBm5+pgw3X7aoYKhfZosb6hyUKBHCgQKij1rghkOAJuZg1SeYIIY+nIpDv\nf\/sqm4yNG5CY64f87qdAwSXKGqFkhPH1ZHb2EgYtw3bpKGVkPz5pJAav+gukjB1UHE\/HLNJobWcS\nX8jiuicMMBFd2OmKwQFs2tjXpDfnPE1j30V3c7iRHlrzBD2HONzODyZtsQJMI4r0AUNaE3XNHQw9\n5c9GC001MpIxDacFQ+ulTNTZlU3O1eWVHa6vb\/pnQUUrgHHSBKIuwG+bCPyEqbAg25gMVV1iOB\/I\nGh5YOKLKIQ6xBAcUHmzjIcIqgajZ+Ro42DcvXl7j0U4WOUd+2IGu7DWjI1pt4DYq8BPm0entuGSQ\nY\/4tBi9Ss0HqfwngBQtHbCH88MQXb\/zxyFfRRRHMN+\/889BHL\/301Fdv\/fXYZ39CCAAh+QQACgAE\nACwAAAAA3AATAAAF\/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv\/8CgcEgECAaEpHLJbDqf0Kh0Sq1a\nr9isdjoQtAQFh2fAKXsKm7R6Q+Y43vABep0mGwwOPH7w2CT+gHZ3d3lyagl+CQNvg4yGh36LcHoG\nfHR\/ZYOElQ9\/a4ocmoRygIiRk5p8pYmZjXePaYBujHoOqp5qZHBlHAUFXitddg8PBg8KGsgayxvG\nkAkFDwgICtPTzX2mftHW3QnOpojG3dbYkNjk1waxsdDS1N7ga9zw1t\/aifTk35fu6Qj3numL14fO\nuHTNECHqU4DDgQEsCCwidiHBAwYQMmpcUOCAhI8gJVzUuLGThAQnP\/9abEAyI4MCIVOKZNnyJUqU\nJxNcGNlywYOQgHZirGkSJ8gHNEky+AkS58qWEJYC\/bMzacmbQHkqNdlUJ1KoSz2i9COhmQYCEXtV\nrCBgwYS3cCf8qTcNQ9u4cFFOq2bPLV65Cf7dxZthbjW+CgbjnWtNgWPFcAsHdoxgWWK\/iyV045sA\nc2S96SDn1exYw17REwpLQEYt2eW\/qtPZRQAB7QoC61RW+GsBwYZ\/CXb\/XRCYLsAKFizEtUAc+G7l\ncZsjroscOvTmsoUvx15PwccJ0N8yL17N9PG\/E7jv9S4hOV7pdIPDdZ+ePDzv2qMXn2b5+wTbKuAW\nnF3oZbABZY0lVmD\/ApQd9thybxno2GGuCVDggaUpoyBsB1bGGgIYbJCBcuFJiOAyGohIInQSmmde\niBnMF2GHfNUlIoc1rncjYRjW6NgGf3VQGILWwNjBfxEZcAFbC7gHXQcfUYOYdwzQNxo5yUhQZXhv\nRYlMeVSuSOJHKJa5AQMQThBlZWZ6Bp4Fa1qzTAJbijcBlJrtxeaZ4lnnpZwpukWieGQmYx5ATXIp\nlwTL8DdNZ07CtWYybNIJF4Ap4NZHe0920AEDk035kafieQrqXofK5ympn5JHKYjPrfoWcR8WWQGp\n4Ul32KPVgXdnqxM6OKqspjIYrGPDrlrsZtRIcOuR86nHFwbPvmes\/6PH4frrqbvySh+mKGhaAARP\nzjjdhCramdoGGOhp44i+zogBkSDuWC5KlE4r4pHJkarXrj++Raq5iLmWLlxHBteavjG+6amJrUkJ\nJI4Ro5sBv9AaOK+jAau77sbH7nspCwNIYIACffL7J4JtWQnen421nNzMcB6AqpRa9klonmBSiR4G\nNi+cJZpvwgX0ejj71W9yR+eIgaVvQgf0l\/A8nWjUFhwtZYWC4hVnkZ3p\/PJqNQ5NnwUQrQCGBBBM\nQIGTtL7abK+5JjAv1fi9bS0GLlJHgdjEgYzzARTwC1fgEWdJuKKBZzj331Y23qB3i9v5aY\/rSUC4\nw7PaLeWXmr9NszMFoN79eeiM232o33EJAIzaSGwh++y012777bhT0UURvPfu++\/ABy\/88MQXb\/zx\nyCd\/QggAIfkEAAoABQAsAAAAANwAEwAABf8gII5kaZ5oqq5s675wLM90bd94ru987\/\/AoHBIBAgG\nhKRyyWw6n9CodEqtWq\/YrHY6ELQEBY5nwCk7xIWNer0hO95wziC9Ttg5b4ND\/+Y87IBqZAaEe29z\nGwmJigmDfHoGiImTjXiQhJEPdYyWhXwDmpuVmHwOoHZqjI6kZ3+MqhyemJKAdo6Ge3OKbEd4ZRwF\nBV4rc4MPrgYPChrMzAgbyZSJBcoI1tfQoYsJydfe2amT3d7W0OGp1OTl0YtqyQrq0Lt11PDk3KGo\nG+nxBpvTD9QhwCctm0BzbOyMIwdOUwEDEgawIOCB2oMLgB4wgMCx44IHBySIHClBY0ePfyT\/JCB5\nweRJCAwejFw58kGDlzBTqqTZcuPLmCIBiWx58+VHmiRLFj0JVCVLl0xl7qSZwCbOo0lFWv0pdefQ\nrVFDJtr5gMBEYBgxqBWwYILbtxPsqMPAFu7blfa81bUbN4HAvXAzyLWnoDBguHIRFF6m4LBbwQng\nMYPXuC3fldbyPrMcGLM3w5wRS1iWWUNlvnElKDZtz\/EEwaqvYahQoexEfyILi4RrYYKFZwJ3810Q\nWZ2ECrx9Ew+O3K6F5Yq9zXbb+y30a7olJJ+wnLC16W97Py+uwdtx1NcLWzs\/3G9e07stVPc9kHJ0\nBcLtQp+c3ewKAgYkUAFpCaAmmHqKLSYA\/18WHEiZPRhsQF1nlLFWmIR8ZbDBYs0YZuCGpGXWmG92\naWiPMwhEOOEEHXRwIALlwXjhio+BeE15IzpnInaLbZBBhhti9x2GbnVQo2Y9ZuCfCgBeMCB+DJDI\nolt4iVhOaNSJdCOBUfIlkmkyMpPAAvKJ59aXzTQzJo0WoJnmQF36Jp6W1qC4gWW9GZladCiyJd+K\nnsHImgRRVjfnaDEKuiZvbcYWo5htzefbl5LFWNeSKQAo1QXasdhiiwwUl2B21H3aQaghXnPcp1Na\ngCqYslXAqnV+zYWcpNwVp9l5eepJnHqL4SdBi56CGlmw2Zn6aaiZjZqfb8Y2m+Cz1O0n3f+tnvrG\nbF6kToApCgAWoNWPeh754JA0vmajiAr4iOuOW7abQXVGNriBWoRdOK8FxNqLwX3oluubhv8yluRb\negqGb536ykesuoXhyJqPQJIGbLvQhkcwjKs1zBvBwSZIsbcsDCCBAAf4ya+UEhyQoIiEJtfoZ7ox\nUOafE2BwgMWMqUydfC1LVtiArk0QtGkWEopzlqM9aJrKHfw5c6wKjFkmXDrbhwFockodtMGFLWpX\ny9JdiXN1ZDNszV4WSLQCGBKoQYHUyonqrHa4ErewAgMmcAAF7f2baIoVzC2p3gUvJtLcvIWqloy6\n\/R04mIpLwDhciI8qLOB5yud44pHPLbA83hFDWPjNbuk9KnySN57Av+TMBvgEAgzzNhJb5K777rz3\n7vvvVHRRxPDEF2\/88cgnr\/zyzDfv\/PPQnxACACH5BAAKAAYALAAAAADcABMAAAX\/ICCOZGmeaKqu\nbOu+cCzPdG3feK7vfO\/\/wKBwSAQIBoSkcslsOp\/QqHRKrVqv2Kx2OhC0BIUCwcMpO84OT2HDbm8G\nHLQjnn6wE3g83SA3DB55G3llfHxnfnZ4gglvew6Gf4ySgmYGlpCJknochWiId3kJcZZyDn93i6KP\nl4eniopwq6SIoZKxhpenbhtHZRxhXisDopwPgHkGDxrLGgjLG8mC0gkFDwjX2AgJ0bXJ2djbgNJs\nAtbfCNB2oOnn6MmKbeXt226K1fMGi6j359D69ua+QZskjd+3cOvY9XNgp4ABCQNYEDBl7EIeCQke\nMIDAseOCBwckiBSZ4ILGjh4B\/40kaXIjSggMHmBcifHky5gYE6zM2OAlzGM6Z5rs+fIjTZ0tfcYM\nSlLCUJ8fL47kCVXmTjwPiKJkUCDnyqc3CxzQmYeAxAEGLGJYiwCDgAUT4sqdgOebArdw507IUNfu\nW71xdZ7DC5iuhGsKErf9CxhPYgUaEhPWyzfBMgUIJDPW6zhb5M1y+R5GjFkBaLmCM0dOfHqvztXY\nJnMejaFCBQlmVxAYsEGkYnQV4lqYMNyCtnYSggNekAC58uJxmTufW5w55mwKkg+nLp105uTC53a\/\nnhg88fMTmDfDVl65Xum\/IZt\/3\/zaag3a5W63nll1dvfiWbaaZLmpQIABCVQA2f9lAhTG112PQWYa\ndXE9+FtmEwKWwQYQJrZagxomsOCAGVImInsSbpCBhhwug6KKcXXQQYUcYuDMggrASFmNzjjzzIrh\n7cUhhhHqONeGpSEW2QYxHsmjhxpgUGAKB16g4IIbMNCkXMlhaJ8GWVJo2I3NyKclYF1GxgyYDEAn\nXHJrMpNAm\/rFBSczPiYAlwXF8ZnmesvoOdyMbx7m4o0S5LWdn4bex2Z4xYmEzaEb5EUcnxbA+WWg\nlqIn6aHPTInCgVbdlZyMqMrIQHMRSiaBBakS1903p04w434n0loBoQFOt1yu2YAnY68RXiNsqh2s\n2qqxuyKb7Imtmgcrqsp6h8D\/fMSpapldx55nwayK\/SfqCQd2hcFdAgDp5GMvqhvakF4mZuS710WG\nIYy30khekRkMu92GNu6bo7r\/ttjqwLaua5+HOdrKq5Cl3dcwi+xKiLBwwwom4b0E6xvuYyqOa8IA\nEghwQAV45VvovpkxBl2mo0W7AKbCZXoAhgMmWnOkEqx2JX5nUufbgJHpXCfMOGu2QAd8eitpW1ea\nNrNeMGN27mNz0swziYnpSbXN19gYtstzfXrdYjNHtAIYGFVwwAEvR1dfxdjKxVzAP0twAAW\/ir2w\n3nzTd3W4yQWO3t0DfleB4XYnEHCEhffdKgaA29p0eo4fHLng9qoG+OVyXz0gMeWGY7qq3xhiRIEA\nwayNxBawxy777LTXbjsVXRSh++689+7778AHL\/zwxBdv\/PEnhAAAIfkEAAoABwAsAAAAANwAEwAA\nBf8gII5kaZ5oqq5s675wLM90bd94ru987\/\/AoHBIBAgGhKRyyWw6n9CodEqtWq\/YrHY6ELQEhYLD\n4BlwHGg0ubBpuzdm9Dk9eCTu+MTZkDb4PXYbeIIcHHxqf4F3gnqGY2kOdQmCjHCGfpCSjHhmh2N+\nknmEkJmKg3uHfgaaeY2qn6t2i4t7sKAPbwIJD2VhXisDCQZgDrKDBQ8aGgjKyhvDlJMJyAjV1gjC\nunkP1NfVwpRtk93e2ZVt5NfCk27jD97f0LPP7\/Dr4pTp1veLgvrx7AL+Q\/BM25uBegoYkDCABYFh\nEobhkUBRwoMGEDJqXPDgQMUEFC9c1LjxQUUJICX\/iMRIEgIDkycrjmzJMSXFlDNJvkwJsmdOjQwK\nfDz5M+PLoSGLQqgZU6XSoB\/voHxawGbFlS2XGktAwKEADB0xiEWAodqGBRPSqp1wx5qCamDRrp2Q\noa3bagLkzrULF4GCvHPTglRAmKxZvWsHayBcliDitHUlvGWM97FgCdYWVw4c2e\/kw4HZJlCwmDBh\nwHPrjraGYTHqtaoxVKggoesKAgd2SX5rbUMFCxOAC8cGDwHFwBYWJCgu4XfwtcqZV0grPHj0u2Sn\nqwU+IXph3rK5b1fOu7Bx5+K7L6\/2\/Xhg8uyXnQ8dvfRiDe7TwyfNuzlybKYpgIFtKhAgwEKkKcOf\n\/wChZbBBgMucRh1so5XH3wbI1WXafRJy9iCErmX4IWHNaIAhZ6uxBxeGHXQA24P3yYfBBhmgSBoz\nESpwongWOBhggn\/N1aKG8a1YY2oVAklgCgQUUwGJ8iXAgItrWUARbwpqIOWEal0ZoYJbzmWlZCWS\nlsAC6VkwZonNbMAAl5cpg+NiZwpnJ0Xylegmlc+tWY1mjnGnZnB4QukMA9UJRxGOf5r4ppqDjjmn\nfKilh2ejGiyJAgF1XNmYbC2GmhZ5AcJVgajcXecNqM9Rx8B6bingnlotviqdkB3YCg+rtOaapFsU\nhSrsq6axJ6sEwoZK7I\/HWpCsr57FBxJ1w8LqV\/81zbkoXK3LfVeNpic0KRQG4NHoIW\/XEmZuaiN6\ntti62\/moWbk18uhjqerWS6GFpe2YVotskVssWfBOAHACrZHoWcGQwQhlvmsdXBZ\/F9YLMF2jzUuY\nBP4a7CLCnoEHrgkDSCDAARUILAGaVVqAwQHR8pZXomm9\/ONhgjrbgc2lyYxmpIRK9uSNjrXs8gEb\nTrYyl2ryTJmsLCdKkWzFQl1lWlOXGmifal6p9VnbQfpyY2SZyXKVV7JmZkMrgIFSyrIeUJ2r7YKn\nXdivUg1kAgdQ8B7IzJjGsd9zKSdwyBL03WpwDGxwuOASEP5vriO2F3nLjQdIrpaRDxqcBdgIHGA7\n4pKrZXiR2ZWuZt49m+o3pKMC3p4Av7SNxBa456777rz37jsVXRQh\/PDEF2\/88cgnr\/zyzDfv\/PMn\nhAAAIfkEAAoACAAsAAAAANwAEwAABf8gII5kaZ5oqq5s675wLM90bd94ru987\/\/AoHBIBAgGhKRy\nyWw6n9CodEqtWq\/YrHY6ELQEhYLDUPAMHGi0weEpbN7wI8cxTzsGj4R+n+DUxwaBeBt7hH1\/gYIP\nhox+Y3Z3iwmGk36BkIN8egOIl3h8hBuOkAaZhQlna4BrpnyWa4mleZOFjrGKcXoFA2ReKwMJBgIS\nDw6abwUPGggazc0bBqG0G8kI1tcIwZp51djW2nC03d7BjG8J49jl4cgP3t\/RetLp1+vT6O7v5fKh\nAvnk0UKFogeP3zmCCIoZkDCABQFhChQYuKBHgkUJkxpA2MhxQYEDFhNcvPBAI8eNCx7\/gMQYckPJ\nkxsZPLhIM8FLmDJrYiRp8mTKkCwT8IQJwSPQkENhpgQpEunNkzlpWkwKdSbGihKocowqVSvKWQkI\nOBSgQOYFDBgQpI0oYMGEt3AzTLKm4BqGtnDjirxW95vbvG\/nWlub8G9euRsiqqWLF\/AEkRoiprX2\nwLDeDQgkW9PQGLDgyNc665WguK8C0XAnRY6oGPUEuRLsgk5g+a3cCxUqSBC7gsCBBXcVq6swwULx\n4hayvctGPK8FCwsSLE9A3Hje6NOrHzeOnW695sffRi\/9HfDz7sIVSNB+XXrmugo0rHcM3X388o6j\nr44ceb51uNjF1xcC8zk3wXiS8aYC\/wESaLABBs7ch0ECjr2WAGvLsLZBeHqVFl9kGxooV0T81TVh\nBo6NiOEyJ4p4IYnNRBQiYCN6x4wCG3ZAY2If8jXjYRcyk2FmG\/5nXAY8wqhWAii+1YGOSGLoY4VR\nfqiAgikwmIeS1gjAgHkWYLQZf9m49V9gDWYWY5nmTYCRM2TS5pxxb8IZGV5nhplmhJyZadxzbrpn\nZ2d\/6rnZgHIid5xIMDaDgJfbLdrgMkKW+Rygz1kEZz1mehabkBpgiQIByVikwGTqVfDkk2\/Vxxqi\nqur4X3fksHccre8xlxerDLiHjQIVUAgXr77yFeyuOvYqXGbMrbrqBMqaFpFFzhL7qv9i1FX7ZLR0\nLUNdcc4e6Cus263KbV+inkAAHhJg0BeITR6WmHcaxhvXg\/AJiKO9R77ILF1FwmVdAu6WBu+ZFua7\n2mkZWMfqBElKu0G8rFZ5n4ATp5jkmvsOq+Nj7u63ZMMPv4bveyYy6fDH+C6brgnACHBABQUrkGir\nz2FwAHnM4Mmhzq9yijOrOi\/MKabH6VwBiYwZdukEQAvILKTWXVq0ZvH5\/CfUM7M29Zetthp1eht0\neqkFYw8IKXKA6mzXfTeH7fZg9zW0AhgY0TwthUa6Ch9dBeIsbsFrYkRBfgTfiG0FhwMWnbsoq3cA\nBUYOnu\/ejU\/A6uNeT8u4wMb1WnBCyJJTLjjnr8o3OeJrUcpc5oCiPqAEkz8tXuLkPeDL3Uhs4fvv\nwAcv\/PDEU9FFEcgnr\/zyzDfv\/PPQRy\/99NRXf0IIACH5BAAKAAkALAAAAADcABMAAAX\/ICCOZGme\naKqubOu+cCzPdG3feK7vfO\/\/wKBwSAQIBoSkcslsOp\/QqHRKrVqv2Kx2OhC0BIWCw\/AoDziOtCHt\n8BQ28PjmzK57Hom8fo42+P8DeAkbeYQcfX9+gYOFg4d1bIGEjQmPbICClI9\/YwaLjHAJdJeKmZOV\niGtpn3qOqZineoeJgG8CeWUbBV4rAwkGAhIVGL97hGACGsrKCAgbBoTRhLvN1c3PepnU1s2\/oZO6\nAtzdBoPf4eMI3tIJyOnF0YwFD+nY8e3z7+Xfefnj9uz8cVsXCh89axgk7BrAggAwBQsYIChwQILF\nixIeNIDAseOCBwcSXMy2sSPHjxJE\/6a0eEGjSY4MQGK86PIlypUJEmYsaTKmyJ8JW\/Ls6HMkzaEn\n8YwMWtPkx4pGd76E4DMPRqFTY860OGhogwYagBFoKEABA46DEGBAoEBB0AUT4sqdIFKBNbcC4M6d\nkEEk22oYFOTdG9fvWrtsBxM23MytYL17666t9phwXwlum2lIDHmuSA2IGyuOLOHv38qLMbdFjHru\nZbWgRXeOe1nC2BUEDiyAMMHZuwoTLAQX3nvDOAUW5Vogru434d4JnAsnPmFB9NBshQXfa9104+Rx\nl8e13rZxN+CEydtVsFkd+vDjE7C\/q52wOvb4s7+faz025frbxefWbSoQIAEDEUCwgf9j7bUlwHN9\nZVaegxDK1xYzFMJH24L5saXABhlYxiEzHoKoIV8LYqAMaw9aZqFmJUK4YHuNfRjiXhmk+NcyJgaI\nolvM8BhiBx3IleN8lH1IWAcRgkZgCgYiaBGJojGgHHFTgtagAFYSZhF7\/qnTpY+faVlNAnqJN0EH\nWa6ozAZjBtgmmBokwMB01LW5jAZwbqfmlNips4B4eOqJgDJ2+imXRZpthuigeC6XZTWIxilXmRo8\niYKBCwiWmWkJVEAkfB0w8KI1IvlIpKnOkVpqdB5+h96o8d3lFnijrgprjbfGRSt0lH0nAZG5vspr\nWxYRW6Suq4UWqrLEsspWg8Io6yv\/q6EhK0Fw0GLbjKYn5CZYBYht1laPrnEY67kyrhYbuyceiR28\nPso7bYwiXjihjWsWuWF5p\/H765HmNoiur3RJsGKNG\/jq748XMrwmjhwCfO6QD9v7LQsDxPTAMKsF\npthyJCdkmgYiw0VdXF\/Om9dyv7YMWGXTLYpZg5wNR11C78oW3p8HSGgul4qyrJppgllJHJZHn0Y0\nyUwDXCXUNquFZNLKyYXBAVZvxtAKYIQEsmPgDacr0tltO1y\/DMwYpkgUpJfTasLGzd3cdCN3gN3U\nWRcY3epIEPevfq+3njBxq\/kqBoGBduvea8f393zICS63ivRBTqgFpgaWZEIUULdcK+frIfAAL2Aj\nscXqrLfu+uuwx05FF0XUbvvtuOeu++689+7778AHL\/wJIQAAOwAAAAAAAAAAAA==\" alt=\"Loading...\" title=\"Loading...\" \/ id=\"tumblr-post-loading\" >\n<div onclick=\"_TumblrPost.hide()\">x<\/div>\n\n<div id=\"tumblr-post-inner\">\n\n<\/div>\n<\/div>\n";
var _posts = '';

function TumblrPost() {

	this.targetElement = null;
	this.resultsPane   = null;
	this.tumblrUser = null;
	this.logOn = true;
	this.tumblrUrl = '';
	this.targetDetails = {};
	this.display = {start : '<ol>',end : '</ol>', line : '<li><a href="{link}" target="_blank"><em>{publish-date}</em><span>{title}</span></a></li>'};
	this.entries	   = 0;
	this.charLimit     = 3;

	TumblrPost.prototype.init = function() {
		console.log('init');
		i = 0;
		var self = this;
		tumblrUser = GM_getValue('TumblrPost_Tumblr',null);
		if (tumblrUser == null)
		{
			tumblrUser = this.setAccount();
		}
		console.log(i++);
		GM_registerMenuCommand('Set tumblr account',this.setAccount);
		console.log(i++);
		this.tumblrUser    = tumblrUser;
		console.log(i++);
		console.log(document.getElementById('post_one'));
		this.targetElement = document.getElementById('post_one');
		console.log(this.targetElement);
		this.tumblrUrl     = window.location.host.replace(/www\./, '');
		console.log(i++);
		this.tumblrUrl     = 'http://' + this.tumblrUser + '.' + this.tumblrUrl
				+ '/api/read/json';
		console.log(i++);
		this.targetDetails.lastKeypress = new Date().getTime();
		this.targetDetails.bounceId     = this.targetDetails.lastKeypress;
		this.targetDetails.callbacks = [];	
		
		console.log(i++);
		this.targetElement.addEventListener(
			    'keyup', 
			    function() {
			    	self.targetDetails.lastKeypress = new Date().getTime();
					self.queryPosts();
			    	
			    },
			    true);
	
		console.log(i++);
		console.log('init-end');
	}

	TumblrPost.prototype.queryPosts = function(bounceId) {
		
		var self = this;
		this.entries++;
		console.log('queryPosts');
		var text = this.targetElement.value;
		
		if (text.length > this.charLimit) {
			this.show();
			var currentTime = new Date().getTime();
			var diff = currentTime - this.targetDetails.lastKeypress;
			
			if (diff < 1500 && currentTime >= this.targetDetails.bounceId) {
				this.targetDetails.bounceId = currentTime;
				this.targetDetails.callbacks.push(window.setTimeout(function () {self.queryPosts(currentTime)}, 1000));
				return;
			}
			this.targetDetails.lastKeypress = currentTime;
			for (i=0; i< this.targetDetails.callbacks.length; i++)
			{
				window.clearTimeout(this.targetDetails.callbacks[i]);	
			}
			
			var options = {
				callback : this._process
			}
			options.search = text;
			this._fetch(this.tumblrUrl, options);
		} 
		else if (text.length <= this.charLimit)
		{
			this.hide();
		}
	}
	


	TumblrPost.prototype._fetch = function(url, options) {
		console.log('fetch');
		if (typeof (url) != 'string' || url.length < 5) {
			throw new Exception('Tumblr Post: Please specifiy URL');
		}

		
		options.callback = (typeof(options.callback) != 'function') ? function (xhr) {} : options.callback ;
		options.search   = (typeof(options.search) != 'string')     ? ''                : options.search   ;
		
		
		// Remove old script node (if present)
	
		if (this.node != null)
		{
			this.node.parentNode.removeChild(this.node);
		}
		var self = this;
		// Create script node and intialise
		this.node        = document.createElement('SCRIPT');
		this.node.type   = 'text/javascript';
		this.node.src    = url+'?search='+escape(options.search);
		this.node.id     = '_tumblr-post-script'; 
		this.node..addEventListener(
			    'load', 
			    function() { 
			    	options.callback.apply(self,[tumblr_api_read]); 
			    },
			    true);
		
		console.log(this.node);
		
		// Insert node into head, and wait for the magic to happen!
		var head = document.getElementsByTagName('HEAD')[0];
		head.appendChild(this.node);
	

	}
	
	

	TumblrPost.prototype.hide = function() 
	{
		if ( this.resultsPane != null && typeof(this.resultsPane.style) != 'undefined')
		{
			 this.resultsPane.style.display = 'none';	 
		}
	}
	
	TumblrPost.prototype.show = function()
	{
		this._insertHTML();
		if ( this.resultsPane != null && typeof(this.resultsPane.style) != 'undefined')
		{
			this.resultsPane.style.display = 'block';	
			document.getElementById('tumblr-post-loading').style.display = 'inline';
			document.getElementById('tumblr-post').style.height = '20px';
			document.getElementById('tumblr-post-inner').style.display = 'none';
			
		}
	}
	TumblrPost.prototype._insertHTML = function () 
	{
		var html = document.getElementById('tumblr-post');
		if (html)
		{
			this.resultsPane = html;
			return this.resultsPane;
		}

		var container = document.createElement('DIV');
		container.innerHTML = _tumblrPostHTML;
		this.targetElement.parentNode.appendChild(container);
		return this._insertHTML();
	}
	


	TumblrPost.prototype._process = function(json)
	{
		
		var insertionStr = '';
		var height = 0; 
		document.getElementById('tumblr-post-loading').style.display = 'none';
		document.getElementById('tumblr-post-inner').style.display = 'block';
		if (json.posts.length > 0)
		{
			//var olHeight = document.getElementById('tumblr-post-inner').childNodes[0].clientHeight;
			height = 60 + (18.2*json.posts.length);
			_posts =  json.posts;
			insertionStr = this.display.start;
			for(i = 0; i < json.posts.length; i++)
			{
				console.log('in');
				var obj = json.posts[i];

				var line = this.display.line
	
				obj['regular-title'] = (typeof (obj['regular-title']) == 'undefined') ? 'Untitled Poem' : obj['regular-title'];
				
				line = line.replace(/\{link\}/,obj['url']);
				line = line.replace(/\{title\}/,obj['regular-title']);
				line = line.replace(/\{publish-date\}/,obj['date']);
		
				insertionStr += line;
	
				
			}
			insertionStr += this.display.end;
		}
		else {
			height = 50;
			insertionStr = '<strong>No posts to display :(</strong>'
		}
		document.getElementById('tumblr-post').style.height = height+'px';		
		document.getElementById('tumblr-post-inner').innerHTML = insertionStr;
		
	}
	
	
	
	TumblrPost.prototype.debug = function(message) {

		if (this.logOn) {

			console.log(new Date() + ':' + message);
		}
	}
	
	TumblrPost.prototype.setAccount = function()
	{
		var blog = prompt("Enter the tumblr blog to search against:", "")
		GM_setValue('TumblrPost_Tumblr',blog);
		return blog;
	}
	this.init();
	
}
var _TumblrPost = null;
window.addEventListener(
	    'load', 
	    function() {
	    	console.log('start');
	    	
	    	window._TumblrPost = new TumblrPost(); 
	    	
	    },
	    true);


