// ==UserScript==
// @id what-album-art-display
// @name What.CD : Album Art Display - DarkMono v2 Mod
// @namespace hateradio)))
// @author hateradio (edited by htrd)
// @version 4.9.1-dmv2
// @description View album art.
// @homepage https://userscripts.org/scripts/show/114153
// @updateURL https://userscripts.org/scripts/source/114153.meta.js
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAgAAAAIACH+pydAAAGO0lEQVRYw8WWXWwcVxXHf/fO7MzsrHd2s9mEbEzdWIlCikmwg1NIUicmLbRpVEWV+tAKyBOKBK0UCfWBUgmEFB7gAQnRvvSlQhHho2kBuYCg5UNJsRw5dYjjxImx81E7rpuNvbZ3PTM7OzOXBxtHgcSsHST+0mhGc+ee87vnnDv3wP9ZYiWTWlpajFwut0MI8SlgG/BpIcQ6pZSjlEoB9qlTp+qyrS/HcUdHx24hxMtCiM8bhlGVUiaEEHahUODWrVu0tbUxMDBAsVis26asN1J79ux51TCMP9q2/URzc7MlhMgcOXLEllJy9OhRhBDs3LkTIZYX1LoA9u7d+6JlWYdyuZytaZro6OgAYHR0FIDjx48DcOzYsWU5hzpqoLOzM6tp2jUgs337dvr7+ykUCoyPjyOlXLwAwjCMgyAo12q1zH3XQEtLi+F53heKxeKjjY2N0vd9BgcHmZqaYnx8nCAI5lcgBHEcAyhN00aBtyzL+tH/IgJy06ZNUVNTE77vq0qlIoIgIJ/P09raiq7r1Gq1RQjP8xgYGKBcLld835fAK1LKbw8PD1dXnIJNGz+ucqvXI6VE13VM02TLli10dXVhWRbZbJZMJoPjOGQyGUzTZHh4GNd1KZVKbrVavVStVh8ZGxvz7rnKpQCk8OIgCEin0+i6jq7rRFGE7/v/8a1SikQigVIKx3FYt26dbdv2Q4ZhfGdJH0sN6loQBkFAEAQYhoEQgmQyyf79+8nn82iatvjOsiwuXryI67oEQYBpmmSz2SSoF5b0sdSgJquxW60SRRFSSqIoolQq4TgO7e3tAARBQKlUore3F8/zSKfThGGIaZoIIRCo1IoBpIyV46SZnZ3Ftm10XefKlSs4jkMqlSIMQ1zXpVKpEMcxyWQSKSWJRIIoipidnUHXKqwYAITYtnUzN4tloigijmNSqRSVSoWpqSmiKEIphRACwzBIJBJYlrUYrXQ6Tc0r3Q8APPHFHfzixN8oFApomkapVGJ2dpYoigCIogghxOJOSafTNDQ0MDQ0RH//OdavjVYOkMvCwad2Mzh4gYlihG3bNDU1YRgGlmWRSCTQdZ0gCHBdl8nJSUZGRuju7mZ6epqDBx9nZPDEygFWZ0HTNL765Q28d3qSM/0hk5NlPM/D9/173o1EzAvPf43nnj3IS9+4H4AcgOD4G+d5/NE8+3bF9J6dY+BylQ/GQm5GEb4PKTtkbc6jkJ/h6vUZXn3tJOU5DSEj1uapHX4K+7Uu3GUDpEwlhRQ8f7idE796n7dvFGnfpvHsAZ9V6Sne+M0NdK1MaRqe3g9BAC//AEwrxUzZRUidBpt4roHEvXws+SMK49DQNQ3T0HjumY0cPrSBaqD46ZtlAPrOh/yyC06fhTBkRaqrIzp/oUjLFkm6QeexPRn27aoRh7fIrRJkHZgtg67PR2C5qqshSaUS9J0rEkXqjvd2UvCXbojuudP+e0uwJIAQIlYqZn3BYU0+yXs9k1z7oEoUz4+fORfy/Zdg/CNYOJkXpZRCSgMFsqeH3IoA9IRR8bwZzp4v8bG1No98bjUKRc+Z+dPw0DMWx96CJ/dBYqHM9DuSOh+BchkHMFeQAr33+kif+uRDn6D79EdMlQKamyx2P2wB8Ps/BwxchrffvT1D00BIE03TqAU+KkaWSkgguVwAcWNi7id/+N3rXm51M5/d0cjouEd3b5nxifmSnyjGfOlpqNbuTIEQJo7jMHb1TSLF9elpYkBbLoD6+a9558aNqx++39sVN2R38Zntm2nbmsJd6Ee++6JNHMM3v347BQ0NOZLJJG55lHd++71q7zl+CITAXVszjaUlq7WwpzzVd6BcnjA3bt6nJVON5LIKFc/gNFTYutkln8sgEs2Y6Q4w9+HPDfOz178S9A+Gr5zs4U/ADFAE1L87qKd1XlMo8OD+Tv1bq9IcaN/xMK1trcaa/BoMI4EUPu5cmWLxQ/4xNByf6r6gXDcYOXla/fjCEH8HbgHXAP9uxusBEEAeyD2wngfbWnjygUa909TjDQplR7HShcSLQ26O36TvwmX+emmESwurngRGgWAp4/XKAnKAA6SYr2qD23UULTjygFngJlC+W9hXCvAvyQUYcwFAB2KgthDm6sJzXfonEt2V6IwVQfIAAAAldEVYdGNyZWF0ZS1kYXRlADIwMDktMTEtMTBUMTk6Mzg6MjEtMDc6MDAmCoZFAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTIwVDIzOjI2OjIzLTA3OjAw62RuWAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0xMVQwODo1NzoyNy0wNzowMPCMu/gAAAAydEVYdExpY2Vuc2UAaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QdWJsaWNfZG9tYWluP/3qzwAAACV0RVh0bW9kaWZ5LWRhdGUAMjAwOS0xMS0xMFQxOTozODoyMS0wNzowMHm78HEAAAAZdEVYdFNvdXJjZQBUYW5nbyBJY29uIExpYnJhcnlUz+2CAAAAOnRFWHRTb3VyY2VfVVJMAGh0dHA6Ly90YW5nby5mcmVlZGVza3RvcC5vcmcvVGFuZ29fSWNvbl9MaWJyYXJ5vMit1gAAAABJRU5ErkJggg[headline=1]
// @icon64 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAEnSAABJ0gGoRYr4AAAACXZwQWcAAABAAAAAQADq8/hgAAAS7klEQVR42u2beWwc133HP++9mdl7SS5vSrIsUpdlW5YVO25sSz4S20mRBkXTpmjj1kgQo0mKNAWaP1uk6D8NUKAI4PQM0KBNgwQI0NRO4yaxU1dWZMdnbN0nKV4RKZG7y+Wec7zXP2ZnREoqIC0lOUD7gB9mtNTO/H7f9/2dMwv/v/5vL/FeKxCtPXv2RKcKsNpHG0i0xQIawHlA79+//7rc17qZRu7du5dsNsvy8rJljEkBPcAQMGiMGQSGhRC9QFdbskBOCJExxiSB48DngNnrpdMNB6C9s8oYU9Bab6pUKjuBnUKIUSHEBinlgBAiK4RICCEsKaWQUgKglEIphTEGz/NoNBoJY0zXLz0Ae/bswbZtPM/LGWPuBD4spXxYSrlZKdUrpXQi44QQKKXI5XIkk0kqlQqu6zI0NMSePXtIp9O88sorHD9+nEajYa63rtcdgPaOJz3Pewj4tFJqr+M4A7ZtS6UUUkqy2SxKKUqlEkEQMDY2xsc//nG6urp47rnneOONN9i6dSuPPPIIUkpmZ2c5duzYjdir6wtA2/gC8EUp5R8kk8lBx3EACIKAVqvF2NgYjz/+OK1Wi2effZZyucwtt9zCli1bkFLS09MTKmZZSCnRWuP7/g0x/roC0Da+zxjzZdu2P5PNZpNaaxKJBKOjoywuLjI1NcXg4CBDQ0MsLS3hOE7s357n4boupVIJgImJCQ4cOECj0eDkyZMIcWMS1nUBoG18AviibdtPZ7PZhOu6BEHAzp072bZtG0eOHGFqamqVoc1mEyklR48e5Zvf/CbVapWJiQmklExOTjIzMxPfIwLAGHNdwVgzAFH+NsY8qpR6OpPJJKLAZowhk8kA4HkeAKdOnaJWq1EsFqlWq0gpKRaLvPrqq3FAjAzUWq86XwnELw0A7ZUVQjyVTCYHAW699VaWl5eZnp6mUqkwMTHB9PQ0QgiWlpZYWlpCCEGU7oQQsURLax37v+d5+L6PMaYMNH/pADDG7LAsa49SCoC+vj5qtRpaaw4fPhz7+UqDPM8jCAKMCTOblBIpJZZlEV0H8KSUZ4A3gEPt48y1a3gDABgdHcMY48zOzt6TzWY/mUwm+40x5PN5giCgVqsBUK/XaTabNBoNPM9DCIFt26TTadLpNLZtAxezRKPRoF6vR4AFxphJrfVLQRC8WK1WZ1KplJmamrpuAHTsUJvHhsF4A4jsdwq9Aw/19fXJUqlELpdjcHCQ2dlZKpUK9XodKSW5XI58Pk+hUGB4eBjHcWi1WriuC1ys+jzPY3FxkQsXLlCpVKjVariuWwuC4LAx5ttCiO8JIaaMMYyPj68ZANXpFwd6NUrWu7V2Po1wRoaGhgCoVqsUi0WKxSJaa/r6+hgcHCSbzTI0NMTg4CCTk5McPXqU6elpFhcXY6Bc10VKST6fJ51OY4whkUiQSCQcIcR6rfWjWuv3A/PAZE9Pj47S5nsAQIAkyBvsTwbaGUomk+TzeS5cuECtVqO7u5uBgQFs28b3ffL5PP39/ezbt48zZ87g+z5KKWzbxrbt2Pej4JjJZLBtm1arhW3bJJNJHMdRWuuNvu8/TBgM3+3p6QnWAoLsHDsNIIRwMTqgVqsjhKC7u5uhoSHy+Xwc6JRSDA8Pc/DgQaampi6L+JeuKDDmcjkSiQRSSmzbJpPJUCgUyOVy64QQXwaeBNTo6Oh7AQAYQApfGHxcz6Ver1MoFFBK4bouSiksy4p3tVgsXtV1I3CibBAEQZwhEokEXV1dZLPZPiHEnwL3A3QKwtoAMAhLISxL4Ht+XOB4nkfU+BhjcF0X13XZtGlT/NlKQy+/bljtNRoNKpVKzKSoULIsK2LHrcCngFSnNqwJAAxIKYWtFL7vYYxBax0bL4SIc3+lUmH37t3s3r077gG01jEYq5SSEt/3GR8fjzvGqGaI2GTbNqlUCiHEg8DGTk1YUyFkQIAQyrJxmwFa61WUh4sVXaPRYHl5mfvuu4/R0VFmZmao1WoIIXAch0QiQSqVIpVKEQQBp0+fZmJiglwutwqsCFgA27YRQgxorTcIIY7fdAAAEAjHcag3wpxuWVe+ZLPZpF6vU61WsW2bLVu2xOwIghC8ZrPJuXPnmJubi9No1FOsumUbgHYwlWDsTtVfKwACQgAsKzQglUphjInpGrFheXmZSqVCJpOJpz6+7+P7Pq7rxgA1Gg2azbDcT6VS2LYd77oQImYD0O4PgpYU3jKiM29eWwwABEZYStHVlY+VimhvjImDVhAEcXUYrSAI4va43ezEO5tMJuPJ0cpsEgEQiWNr31HlpqOqN58BxiCkkiSSNk4ySyKRiA33fX9V1AZwXZeZmRny+TyJRCJmSnit1cZblhVLxAJjTBwQw//n4Lt14Xo1JUVnTeKaANAaHNsW60f6mV/wSKdTcdprNpvxDCCq+KLoXi6XY3DC6+g4yjuOE2eRCIBoNBYEAb7vk0gksCyL6enztBplqQTSmOA9AUBIKcSuXZt5/c0ZGk2fVCqFlJJGo0G5XI4DY0RlpdQqCkf+HDElaotXRvvIcCEEPT09pFIpzpwZ5+zZs/QXAmE5KNPhvLhjAKQEpUAKIzaPjdBybV597SSWZZFOp+np6aG3t5fFxcUYCCllXO+vzBZXGnOtZIVSikKhQKFQIAgCDh06xJEjR/C8FkoKaSmUvtkApFOgJCKRgFw2wa8+sZWJiRmqdRMb2tXVRX9/P81mk1KpRKlUol6vx4ESrlwNRi4TAdnd3Y0xhsnJSQ4ePMjMzAzNZov16/oZGmiJRqMkO52UdQ5AEiwJ6RRCSti2uYuPfWSE7/9oEa3DSF2v12m1WmSzWcbGxrAsC8/z4pQXjbqifG9ZFo7jkE6nSSQSACwtLTE1NcXJkyeZnp6OARwY6OfJT36CiVM/kGfHS8rqsBLoGIBUCiyFSCWFUEogpWDv/b1IaXjpQJN6I6R2o9GgWq3G0T2aBPX398c+DxdTYrPZpFgssrCwwPz8PPPz8ywtLdFqteLnAyMjIzz55O/x0J7dfHv6P0UqhbQ7tGRNLuAqSCURlhI0mz46CNhzX4b+XsP+n3mcPgvGiDgz1Go15ubmLguCQRDgui6tVotWq0Wz2cR13bgJitwlm81y991389hjj7Ft23ZsxyWZFCKdQlo3HYAk2AqRSoFtC35xrsKJ41M8dH8/O7YIhvp8Dh1z+flhzeSMwfMEWguMEWht8Dwf3/diN7h49AntlQghEcInn09yzz0P88ADe9i8eXOsgxCQSkqRTqFuOgCpFNgWIr3CBV7aP4nn1nl0bz893fDgvR53bmtwdtrjzFnD+BScX9AsLRtqNQ3GoDXoIMwoAoOlNF1Zj3SqSa3WIPCXufOOrXzmc58lkSywvFyhWq0Cou1WbQZ0ONvqGADHBgnCtsOGYN1Ing/cu57nXzhJsbjMYw8X6O2Brpxh5/YmO8bq1OtNlqstSksepbJPve7SaHi0XIMQHrbySTgeXTkX2/L4/gsB45OGrpwg4ThofXGMbjAIIXFsiWO/By4gRCwCAbYlefyDoyjp8/wLpzl+apEH78tx1+02PflwhzPpgFSyxUChjtE1jK6hgwZBoAk0BEFYXfoBVGtgKQjtFZhLB9gGBAIhpBACKYAvfAqe+cZNAiDCoa1GOMF1FI9/8BaGBxU/+PE43312jn0HJDu2WmzeBJvWG3JZgTFgtAgF2v8Oj4G+eB7XNkIgRATGSgQEIiwklKGzGf/aAQi3IVIJKQW77iywcb3knUNzHHjtPC8dqPLiyz4ffkTxscdCRU2bQe12Iexm9ZWNEEJeZl7EDIQUrGG6vWYABJcrrY2hK2+z9/4Cd91uMT5R5vipCoVuF0MQAqANL76sefaHhl23w/AAvH0YHn0Admy9AspCrKBECHfbBXhPAYj4GQYnE+kWtroaclnFrjtS3LFN43s1BHWEgAuLhr/9Z5dm03DkJHg+tFpwdgb+4kuXgHoFmI2hfeuLDOikHO58INJu30NXFFTrLsVSI1Rzpb4mDGxCQBSphRAUywZLGf7qzwSPPgBbR+FLn4XKMtTqq+0VXO4CsQJhDLCUDAG81tUxAwwQ6IidAs8NOD1eYsfWDJnUJWyNvhMRxBjyOUHLFXzla4bzi6HRE1OwfhhSSVZfQIjLdjeKAVJKEQQ4X/0XOPQi/MO3rs2OjhnwzDeg0cRphy8yGQcdGE6cKtFygzA3/m/gGRjsF/z+b9oEWvDEQ/D5p+DO7fDkb0A2fQmAV4w0baIJKTyPlBA4Ox+79kTQKQBCCOxanaQxRgjCOuCWDV2cX2hw7GQ5BOGKIT0EwFKCjz6m+MKnBBvXQyYNT/0WvP/uy20VyCs4eJwG8QOShA9HHK4xG3bqAgpI1JtYWmsCHbBc89DasOmWLk6dmcNt1tkyqshlLlEp1JuWa/in7/j807c11Xr4eaEH/vAp+Mijl8HNldMgCKGE1iSAyHEC4KpfK+sEANH+nlOtoX3fc1vNOlrnmZxeYvOmFJtHuzh95gLlisfYRsFwv8ayQjvC4C2YnTM89yOP3/l12H0HeAH8eB9874fwwL0XA2Z4wys5VFj6CCGE1jiEL2kFgNs+XtWMqBMXkIQvMdvlCn6r1VxeKp8nl8uTSjqcOlNieDDFXXd0o6Tg8LE6bx2sM/sLH9ejXTtCEBi0gd5uQX8v9BegJ3+xHF4N+ZWyQPQnJUxIfWuFXLUbdMoABVjnzlOv173pmekTO8UDjzK6aYDX3yxy5HiJ27cluPfubqZmDLOzFd492mLzRp+xjWGhtH5Y8tCvWPz111txmasUPP270JWHeuOSWwpx+aa2v2jMqjfMVXuT9NUY0wkA0XbIxRJuZZnDk2ePPFEuV6xCoZ/tW+Y5dOQcb79bZ+uYxZbRFOuGAmZnAywVMtMAyYTgj5+2ef8uj3ePapSEu26HnbeFA9fVdka3vAiAUhYYQ6vV0EGAG+m0Qr8bxoCIBQJgZo53NpybOn924thI7907WL+uC0yTYyfmeftghQ0jsHGdYcuoTeBHeoZrcsaw72eG46dDo2uNsCQeHrj0Zpfbk8lkaDbmWCrPtGp1zl2q17Xs5rUuQ0gvA3DiDNOlcu3Q0cOv0PIdpMqwfiTN++7qob/XYXKmxWtv1zhxxqXZCp8nSwHFsuErX3P56euGdDhc4T9ehH/8V2heUtEJuToMOokE2WyGmcmXKRXPzUyf43T7T3qlbjeKAdFNAkCXK1TnF9h34tjrD56deCKzZfMGjF+k0OOw68488/OGqZklxieb6CBg22iYBc4vaOYuaP78TwT37DT4Pvz7j+DfnoflWrsajAAQIq4flFLk8nlKC0c5cfjZYLHo/+TEGX6xQqerzgBrAcAHvLY4h0/wxvDA+Td/8uNvPdTb+0cUusbwGoewbcG6EYf+QprzCwFG10MKGUOhW5DPCb76dcO2sXAI8u5RGNsImdTqTBA9O7AsRXdPgfryDK/vf4bZmYk3Dx7jec+n1dYpkqsKgLCGNpLQfRSgKlW8pMO85NxttWqxd92GXWRzA5igggmqSOmSywZkUz4YD4xHOumzYSTg+Cmfg8dh7jzctgU+/dsw2A+uB4eOwUIR1m3Yxt3v+yiZTI6l4mlefuEvOX5034kjJ80zPz/CCaBF+NZYo328agA6DYI+YcHRal9DvfYOh5LJ4GtG//fnq8ul7R964hNsunUXlsrjN09i/AYhM027lTV84H2SndsFpaXws2w6TIV+m8TKsunt72Pjpp0kEoLxkz9k/389o8+cfufdY6fM37/6Fu+sML7ZPr+mp6RrYUDkZ3HkPTvDnJTmZODO9ZydODjcaLhWrmuMTP5WLCvXNr4FpoXRLsa0sJRPJm1IJ0FIhSGBUAWkM4avPsDwuvvIZRMcffe7/PSlv6uOT0y8+OZB/uatQxxp7/hKaXEN/h8pv5alCJuQ9Ipjcv0wg7vv4EMjg+rXhkeGNt22Y5e9ffvtDA12k065SFNCBxcwQRET1Ah0gCGJIYumC1/nWVoWvPXOAmcnTlBePNsslspHZ86ZZ986xIGFIottY+srpHmtu389AIhASLQBiCSpFMlto2zcson7+wpib093ZmxgYDA/sm697O/vo7s7Tzplo1Tors2mR7Vap1yucG5ujvn58/7iQqlUrjSPXFhg/7HTvDExzTlW+/vKne/oBYHr9euDqD9IXiK2FCRGhujbtJ6x/l7uyGbZmkzIoWTSLji2lZBSSiGRnhd4bsurtdygVG/oqcoyxy8scuL0WSYWSpQJY04Ud5orxOUaaX8jAIiuJSHuzCKJGxUpcXJZ0t15sj1ddKeSZJTEkhLZcmksV6ks16gtlqjUGzQJ02zQPkbGRxJ1fWtW+nqvCAi7Lc6K86hhier1S6aHwOpCa2W94a44v6Zq72YDsHJFzUlk+EoAIlm5NJcD4LfPo8+v67qZP55eueOXMiDazWi2rlecX/dfi65c/wMY7mS0Wi5EzwAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0xMi0wOFQxMzoxNjowNC0wNzowMB0Ok24AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMjBUMjM6MjY6MjMtMDc6MDDrZG5YAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTAxLTExVDA4OjU3OjU3LTA3OjAw+kmy4QAAADJ0RVh0TGljZW5zZQBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1B1YmxpY19kb21haW4//erPAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA5LTEyLTA4VDEzOjE2OjA0LTA3OjAwQr/lWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAZdEVYdFNvdXJjZQBUYW5nbyBJY29uIExpYnJhcnlUz+2CAAAAOnRFWHRTb3VyY2VfVVJMAGh0dHA6Ly90YW5nby5mcmVlZGVza3RvcC5vcmcvVGFuZ29fSWNvbl9MaWJyYXJ5vMit1gAAAABJRU5ErkJggg[/headline]
// @screenshot 
// @include http*://*what.cd/artist.php?*
// @include http*://*what.cd/user.php?*
// @include http*://*what.cd/torrents.php*
// @include http*://*what.cd/top10.php*
// @updated 2012-11-05
// @since 2011-09-27
// @grant GM_xmlhttpRequest
// (c) 2011+, hateradio
// Icon from http://openiconlibrary.sourceforge.net/
// ==/UserScript==
// @match *://*.what.cd/artist.php?*
// @match *://*.what.cd/user.php?*
// @match *://*.what.cd/torrents.php*
// @match *://*.what.cd/top10.php*
(function(){
var greaseWindow, strg, update, art;
// Obj+
Object.LEN = function(a){ var i = 0, j; for(j in a){ if(a.hasOwnProperty(j)){ i++; } } return i; };
Object.SFT = function(a){ var i; for(i in a){ if(a.hasOwnProperty(i)){ delete a[i]; break; } } };
greaseWindow = (function(){
var a;
try {
a = unsafeWindow === window ? false : unsafeWindow;
} finally {
return a || (function(){
var e = document.createElement('p');
e.setAttribute('onclick', 'return window;');
return e.onclick();
}());
}
}());
strg = {
on:(function(){ try { var s = window.localStorage; if(s.getItem&&s.setItem&&s.removeItem){return true;} }catch(e){return false;} }()),
read:function(key){ return this.on ? JSON.parse(window.localStorage.getItem(key)) : false; },
save:function(key,dat){ return this.on ? !window.localStorage.setItem(key, JSON.stringify(dat)) : false; },
wipe:function(key){ return this.on ? !window.localStorage.removeItem(key) : false; },
zero:function(o){ var k; for(k in o){ if(o.hasOwnProperty(k)){ return false; } } return true; }
};
update = {
name:'What.CD : Album Art Display',
version:4910,
key:'ujs_WhatAlbumArtDisplay',
callback:'wcdaadudpt',
page:'https://userscripts.org/scripts/show/114153',
urij:'https://dl.dropbox.com/u/14626536/userscripts/updt/wcdaad/wcdaadudpt.json',
uric:'https://dl.dropbox.com/u/14626536/userscripts/updt/wcdaad/wcdaadudpt.js', // Allow dropbox.com to run scripts.
checkchrome:true,
interval:5,
day:(new Date()).getTime(),
time:function(){return (new Date(this.day + (1000*60*60*24*this.interval))).getTime();},
top:document.head||document.getElementsByTagName('head')[0],
css:function(t){
if(!this.style){this.style = document.createElement('style'); this.style.type = 'text/css'; this.top.appendChild(this.style);} this.style.appendChild(document.createTextNode(t+'\n'));
},
js:function(t){
var j = document.createElement('script'); j.type = 'text/javascript'; j[ (/^https?\:\/\//i.test(t) ? 'src' : 'textContent') ] = t; this.top.appendChild(j); return j;
},
notification:function(j){
try {
if(this.version < j.version){
window.localStorage.setItem(this.key, JSON.stringify({date:this.time(), version:j.version}));
this.link();
}
} catch (e) {}
},
link:function (){
var a = document.createElement('a');
a.href = this.page;
a.className = 'userscriptupdater';
a.title = 'Update now.';
a.textContent = 'An update for '+this.name+' is available.';
document.body.appendChild(a);
},
check:function(opt){
if(this.gmu===true||!strg.on){return;}
var stored = strg.read(this.key);
this.csstxt();
if(opt || strg.zero(stored) || stored.date < this.day){
this.page = this.page || (stored && stored.page ? stored.page : false);
strg.save(this.key,{date:this.time(),version:this.version,page:this.page});
if(!opt && this.gmxhr){
GM_xmlhttpRequest({method: 'GET', url:update.urij, onload:function(r){ update.notification(JSON.parse(r.responseText));}, onerror:function(){update.check(1);}});
}else{
greaseWindow[this.callback] = function (json) { return update.notification(json); };
}
}else if(this.version < stored.version){ this.link(); }
},
gmu:(function(){ try { return GM_updatingEnabled; } catch(e) {} }()),
gmxhr:(function(){ if(!(this.checkchrome === true && typeof(chrome) === 'object') && typeof(GM_xmlhttpRequest) === 'function'){ return true; } }()),
csstxt:function(){
if(!this.pop){ this.pop = true; this.css('.userscriptupdater,.userscriptupdater:visited{-moz-box-shadow:0 0 6px #787878;-webkit-box-shadow:0 0 6px #787878;box-shadow:0 0 6px #787878;border:1px solid #777;-moz-border-radius:4px;border-radius:4px;cursor:pointer;color:#555;font-family:Arial, Verdana, sans-serif;font-size:11px;font-weight:700;text-align:justify;min-height:45px;position:fixed;z-index:999999;right:10px;top:10px;width:170px;background:#ebebeb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAACLCAYAAAD4QWAuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGN0Q1OEQyNjdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGN0Q1OEQyNTdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po6YcvQAAAQFSURBVHja7JzBSxRRHMdnp+gkiLdOgtshKGSljQVF8CK0biEErYfwFmT+BQpdA0MIBEFtTx2qSxESaAt5ioUQFDp5sjl06rbnumzfp7+VbZx5M+/Nb9wZ+f3g56wzO28//ua93/u9J/stdDodx2/P3o85llaFT8JvwlvwTfhf00a2Hv8IPO86PHYHvg//An8OfwRfg/9RfzvTZ7DBvoZXQq6p6D7MCuwT+N2I92zAB/sNO0yPO8quwxf7DasABmK+d0XTVVKHnYIvG96z1i9Ymw8ep/R2obAqNdkm41e2sFct71v1/f4BiXyOJpRpHKZ918s9527B5+FvLwJWDaoR3zmvZ/bZw2HPNyMeBOTeb/BfaXaDEuVMvx2G3QDQMkW21wZsUpkp7GbIeU9zz3TI+WXTVGYCW6XRbApb1lxbTwt2VVMltS1hVWRnuWFVqhoNudbW9NchHIpc+ToO7GDE49JFtRij/ZG4gy0O7CIVIjZWNuhiw0lhK1SA6GzI8ppxKouCjTNaOWC7qWzKFrYaNw/SQOKwNVtYk4KjyAQ7RpnHCHaeCg7ugZQon7sBj3RYM62mHdmTVAaGxbiRNVmqRM3/bUvgDQCX/CcLvZsceEOF1v82dgPTrkdVVp2iXU8Q4e9ob0IHu59gUecxdwdlMwBunusGAJ1NuPr0KLoFdYQ3GGBXAiMLWC9gBRDX2gTa9g3Wp7Rbk8TqaPfjWWRp9I0kaLARVCbiXMO/xLGwdfCd7Oa4eDGQdD0fYYcJ7z/bzXHpxbWEDRaddO1FF3aSobE6pazAawztX0H7465mXWVqB2hwqWdwFeFfGaM+Wlh4V/rkMO2fpmy3VWTf5AD0NzLLkYsfn53T7fUs21k2UPmw5jBs9qZgx/AH4Ns+VxvQwJg0rGXTMPUfnhYgj0MLmayb6+TIBFZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBTZzVrg3U+Nsz1iTo7m7c+GRFU2ONGBFkyMNWNHkSANWNDl0xqbJAZ+j1/nR5HBOv6zm/8JaPjQ5KKqiyRFVpORfk8PRf3NZq8lRrd3PhiaHc6pvcLk0ORDdfGlyAFg0OdKAPUlliG76mhyGUNaDLXOaHIjuJdXkoKVKXzU5wlJZZjU5AFyKKhErFkuVbjcoUo3Apcmhnu6Ebkcmc5oczd2dZlA3YNHkUAFwUtLkcJlWnm1a1ng94AvkbKnM1SxVTKwRMphYNDkAPNiFFU0OZuPV5NDMYiyaHOgKvJoc8CVftFk1ORRsi/FxvYR3yH9qZjYba+VGkwOTw5GCzZcmByzTmhyI6ra/kNkiz4wmByD/0+T4J8AAyDkZArebBxMAAAAASUVORK5CYII=) no-repeat 13px 15px;padding:12px 20px 10px 65px}.userscriptupdater:hover,.userscriptupdater:visited:hover{color:#55698c!important;background-position:13px -85px;border-color:#8f8d96}'); }
}
};
update.check();
art = {
jkey:greaseWindow.authkey,
uri:document.location.href,
div:document.getElementById('discog_table'),
uli:document.createElement('ul'),
cvr:document.createElement('div'),
act:document.location.pathname.substring(1).replace('.php', ''),
img:[],
mem:strg.read('AlbArtDispCache'),
usr:strg.read('whatartdisplaysettings'),
map:false,
ren:false,
top:true,
siz:90, // img size
max:50,
lag:500,
reg:/(?:\/torrents\.php\?id\=(\d+))/,
exc:['remix', 'remixed', 'mixtape', 'unknown', 'bootleg', 'interview'], // not for these
def: {
t : {
applications : 'apps', comedy : 'comedy', 'e-books' : 'ebook', audio : 'music', audiobooks : 'audiobook', comics : 'comics', 'e-learning videos' : 'elearning'
},
get:function(name){
return 'static/common/noartwork/'+ (this.t[name] || 'music') + '.png';
}
},
mod:function(n, m, s){//console.log('n-'+n, 'm-'+m, 's-'+s);
if(!n){return;}
var A, B, C, X, Y, a, b = document.querySelectorAll(s[0]), c = b.length, d = document.querySelectorAll(s[1]), e = d.length, tt, id, j = -1; //console.log(c, e);
if(this.map && !m){ this.row(); }
while(++j<c){
A = b[j];
B = n === 1 ? A.parentNode.parentNode : A.parentNode;
C = this.elm('td',{className:j>=this.max?'gm_albumartdisplay':'gm_albumartdisplay gm_albumartdisplay_loading'});
B.parentNode.insertBefore(C,B);
id = A.href.match(this.reg)[1];
tt = A.textContent;
if(j<this.max){
if(this.mem[id]){ a = this.mem[id]; this.max++; C.className = 'gm_albumartdisplay'; }else{ a=''; if(this.img.indexOf(id) === -1){this.img.push(id);C.title='Loading . . .';}else{this.max++;} }
if(this.map){
X = this.elm('li',false,this.uli);
Y = this.elm('a',{className:a?'gm_albumartdisplay':'gm_albumartdisplay_loading',href:'/torrents.php?id='+id,title:'Loading . . .'},X);
this.elm('img',{className:'_albumartdisplay'+id,title:tt,width:117,src:a},Y);
}
}
this.elm('img',{className:'_albumartdisplay'+id,title:tt,width:this.siz,height:this.siz,$onclick:'lightbox.init(this,'+this.siz+');',src:a,_display:a?'':'none'},C);
}
while(e--){ A = d[e]; A.colSpan = A.colSpan ? A.colSpan+1 : 1; }
this.max--;
this.run();
},
row:function(){
this.cvr.id = 'coverhead';
this.cvr.className = 'box';
this.div.parentNode.insertBefore(this.cvr,this.div);
this.cvr.innerHTML = '<div id="coverhead" class="head"><strong>Cover Art</strong></div>';
this.uli.className = 'collage_images';
this.cvr.appendChild(this.uli);
},
opt:function(){
var A = document.getElementById('collagecovers')||document.getElementById('hidecollage'), B, C, D;
if(A){
C = this.elm('tr',{innerHTML:'<td class="label"><strong>Album Art Display</strong></label></td><td><p><strong class="important_text" id="_albumartdisplaym"></strong></p><div id="_albumartdisplaysettings"></div></td>'});
A.parentNode.parentNode.parentNode.insertBefore(C,A.parentNode.parentNode);
D = document.getElementById('_albumartdisplaysettings');
this.pm = document.getElementById('_albumartdisplaym');
B = this.elm('input',{id:'albumdisplaymap',type:'checkbox',checked:this.map},D);
B.addEventListener('click',this.set,false);
A = this.elm('label',{$for:'albumdisplaymap',textContent:' Show collage in artist pages. '},D);
B = this.elm('input',{id:'albumdisplayren',type:'checkbox',checked:this.ren},D);
B.addEventListener('click',this.set,false);
A = this.elm('label',{$for:'albumdisplayren',textContent:' Show album art in torrent/notification pages. '},D);
B = this.elm('input',{id:'albumdisplaytop',type:'checkbox',checked:this.top},D);
B.addEventListener('click',this.set,false);
A = this.elm('label',{$for:'albumdisplaytop',textContent:' Show album art on the Top10.'},D);
}
},
init:function(){//console.log('N'+Object.LEN(this.mem));
var img, t = 'a.gm_albumartdisplay_loading{display:block;height:117px}.gm_albumartdisplay_loading{background:transparent url(http://whatimg.com/i/97804798653144081223.gif) no-repeat center center;cursor:progress}.gm_albumartdisplay_loading img{opacity:0 !important}.gm_albumartdisplay img{cursor:pointer}td.gm_albumartdisplay{max-width:'+this.siz+';height:'+this.siz+'px;padding:0;margin:0}td.gm_albumartdisplay img{opacity:.9}td.gm_albumartdisplay img:hover{opacity:1}';
update.css(t);

this.mem = strg.zero(this.mem) ? {} : this.mem;
if(!strg.zero(this.usr)){
this.map = this.usr.map;
this.ren = this.usr.ren;
this.top = this.usr.top; // console.log(this.map,this.ren);
}

if(/(?:\/user\.php)/.test(this.uri)){
this.opt();
}else if(this.reg.test(this.uri)){//console.log('album page');
if( (img = document.querySelector('.sidebar .box_albumart img[onclick]')) ){// console.log(img.src);
this.img = this.elm('img',{src:img.src,id:RegExp.lastParen});
this.img.addEventListener('load', art.mix,false);
this.img.addEventListener('error', art.mix,false);
}
}else if(/(?:\/artist\.php)/.test(this.uri)){
this.sel(0, 0, 1);
}else if(this.ren && /(?:\/torrents\.php)/.test(this.uri)){
if(this.uri.indexOf('action=notify') !== -1){
this.sel(0, 2, 1);
} else if (this.uri.indexOf('userid') !== -1) {
this.sel(1, 4, 2);
} else {
this.sel(2, 1, 2);
}
}else if(this.top && this.act === 'top10'){
if(this.uri.indexOf('type=users') === -1 && this.uri.indexOf('type=tags') === -1){
this.sel(0, 3, 1);
}
} // console.log('m: '+RegExp.lastMatch);
},
sel:function(a, b, c){//console.log(a, b, c);
var x = [], z = true;
switch (a) {
case 0 : x[0] = '.torrent a[href^="torrents.php?id"], table:not(#torrents_' + this.exc.join('):not(#torrents_') + ') .group a[href^="torrents.php?id"], .group_torrent strong a[href^="torrents.php?id"]'; break;
case 1 : x[0] = 'table td a[href^="torrents.php?id"]'; break;
case 2 : x[0] = 'table .cats_col+td a[href^="torrents.php?id"]'; break;
default: return;
}
switch (b) {
case 0 : x[1] = ['table.torrent_table:not(#torrents_', this.exc.join('):not(#torrents_'), ') .group_torrent td:first-child, table:not(#torrents_', this.exc.join('):not(#torrents_'), ') td.small:nth-child(', c, ')'].join(''); z=false; break;
case 1 : x[1] = '.small.cats_col, tr.group_torrent td[colspan]'; break;
case 2 : x[1] = 'form[id^="notificationform"] .small.cats_col'; break;
case 3 : x[1] = '#top10 .colhead td:nth-child(2), #top10 .colhead_dark td:nth-child(2), .group_torrent td[colspan]'; break;
case 4 : x[1] = '.colhead td:nth-child(2), tr.group_torrent td[colspan]'; break;
default: return;
}
this.mod(c, z, x);
},
run:function(){// console.log(this.img);
setTimeout(art.exe, art.lag);
},
exe:function(){
var id = art.img.shift();
if(id){
art.xhr(id);
art.run();
}
},
xhr:function(id){
var req = new XMLHttpRequest();
req.id = id;
req.pic = document.getElementsByClassName('_albumartdisplay'+req.id);
req.pln = req.pic.length; // console.log('p ln: '+req.id, req.pln);
req.pix = function(e){ art.mix.call(req, e); };
req.open('get', ['ajax.php?action=torrentgroup&id=', req.id, '&auth=', this.jkey].join(''), true);
req.onload = this.dat;
req.onerror = this.bad;
req.send(null);
},
bad:function(){//console.log('not found!'+this.id);
art.mux.call(this, 'error');
},
dat:function(){
var j, type;
try { j = JSON.parse(this.responseText); }
finally {
if(j){
type = j.response.group.categoryName.toLowerCase();
this.pic[0].setAttribute('type', type);
this.pic[0].onerror = this.pix;
this.pic[0].onload = this.pix;
this.pic[0].src = j.response.group.wikiImage || art.def.get(type);
} else {
art.bad.call(this);
}
}
},
mix:function (evt) {// evt - load or error - is attached to an image or xhr
var a = evt.type, b = evt.target;// console.log('mix: ', this, a, b.src, this.id);

switch(a){
case 'load' : art.mem[this.id] = b.src; break;
case 'error' : delete art.mem[this.id]; break;
default:return;
}

if(this.responseText){
this.pic[0].onerror = null;
if(a === 'error'){
this.pic[0].src = art.def.get(this.pic[0].getAttribute('type'));
return;
}
this.pic[0].onload = null;
art.mux.call(this, a);
} else {
this.removeEventListener('error', art.mix, false);
}
art.put();
},
mux:function(a){
var i = this.pln, p, q;
while(i--){
p = this.pic[i];
q = p.parentNode;
q.className = 'gm_albumartdisplay';
p.src = this.pic[0].src;
p.alt = a === 'load' ? 'Loaded' : 'No artwork';
p.removeAttribute('style');
q.removeAttribute('title');
}
},
put:function(){
if(strg.on){
if(Object.LEN(this.mem) > 1500){ Object.SFT(this.mem); }
strg.save('AlbArtDispCache',this.mem);
}
},
set:function(){
switch(this.id){
case 'albumdisplaymap' : art.map=this.checked;break;
case 'albumdisplayren' : art.ren=this.checked;break;
case 'albumdisplaytop' : art.top=this.checked;break;
default:return false;
}
art.pm.textContent = strg.save('whatartdisplaysettings',{map:art.map,ren:art.ren,top:art.top}) ? 'Saved.' : 'The setting could not be saved.'; // console.log('saved: '+strg.read('whatartdisplaysettings'));
window.setTimeout(function(){art.pm.textContent='';},2500);
},
elm:function(t,o,e,p){
var a, b, c = document.createElement(t);
if(typeof(o) === 'object'){ for(a in o){ if(o.hasOwnProperty(a)){ b = a.charAt(0); switch(b){ case '_' : c.style[a.substring(1)] = o[a]; break; case '$' : c.setAttribute(a.substring(1),o[a]); break; default : c[a] = o[a]; break; } } } } if(e){ p ? c.appendChild(e) : e.appendChild(c); }
return c;
}
};
art.init();
}());