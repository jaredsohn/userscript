// ==UserScript==
// @name tf2wh.com Metal Converter Alpha
// @description Convert credits on site tf2wh.com to tf2 metal currency
// @author	The Jackal
// @namespace tf2wh.com
// @include http://www.tf2wh.com/*
// @require http://userscripts.org/scripts/source/103196.user.js
// @run-at document-start
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA5CAYAAABj2ui7AAAXjGlDQ1BJQ0MgUHJvZmlsZQAAeAGtWWdYFMvS7plNhCXnnHPOOWcByVFQliUnYckIBkBUQEVARIJEiRJVkoCCCqIIElRUVBBREFQQQSXeAfXc8+O7/755np15qXmrurqre7qrAIDtBiE0NAimBSA4JIJka6LP6+ziyot7BbCAHdADMSBDIIaH6llbW4D/ea09A9DuyzGpXVv/k/Z/v6Dz8g4nAgBZI689vcKJwQi+AQDcQgwlRQCA3rUnEB0RuoszEMxIQhxEcPku9v2N23ax5288uMextzVAOFMAkOEJBJIvAPhFRM4bRfRF7FDhAcDSh3j5hwDAwItgbaIfwQsANg+EIxkcfHgXpyNY1PNfdnz/hQkEz39sEgi+/+DffUE0kYYN/cNDgwixe3/8f96CgyKR8dq7mJE7PjRC3xZ5siLjxuofYWaPYEYEy/pFmjr8wYZxfvZOu1xE7hziud8KwfQI9iKGGyBjCRA7UFTgYfNdO7ucdC9vQyMEI7MCyg2PsvuLq+L8DPb/4TgHEPbtxowa4bQRSAj63W5faIT1rg+7Nl+GBO23+IOXfEjGu/YROYz1DjeyQzDiA8wZQbLflSM+w9I+/sZmCEbahfVDg/bm3C7HlhRpu9sXQQR7eYc4/NU97UUwNEfknIg8D1gAA2AIeJH7YRCE/EjAH3ghz79y4r/kdiAOfAYhwBuEIxp7jEP+iaS/GBgDAqLvi7yX+qOvvyfxBlGI1tZf3tBi6+Jf/EfH8x8NY/B+z8YfC7K1svOym3/ZvDR//cIaYQ2xplhjrNhfCdLS716Q9vwzR3rjDSIRW95I23/9+XevIv9h/Fv6ewxs97QCEYb/37aB455n/v/YMv9nZP6MBVoYLY9WQuujtdDaaDXAi2ZGswMptCJaFa2H1kFrIO/U/jXOf7T++C8FfPbGKmrP+0DwAfEcWdUR3jERSKyAweHQWJK/r18Erx7ytfCW5DULIUpL8srLysmB3W/PLgeAFdu9bwrEPPxfmaccAKpbyNIa/K8seBOA+mQAuO//VyZcjSyHowDUFhAjSVG/7aF3HxhAAWiQmcYGuIEAEEX6Lw+UgQbQBUZgH7AC9sAFHARE4If4SwLRIB6cACkgDWSAiyAPFIEyUAXqQDNoBZ2gB/SBR+AJeApegSkwCxbAElgDGxAE4SAqiAFig3ggIUgCkodUIW3ICLKAbCEXyAPyhUKgSCgeSoLSoEwoDyqBqqEmqB3qgQagEegFNA3NQ9+gdRgF42FGmAsWhmVgVVgPNoftYXfYFw6D4+Bk+BycC5fC1+AWuAd+BD+Fp+AFeBUFUJQoZhQfSgqlijJAWaFcUT4oEuooKhWVgypF1aM6UP2oMdQUahH1C41FM6B50VJILE3RDmgiOgx9FJ2OzkNXoVvQ99Bj6Gn0EnobQ4XhxEhg1DFmGGeMLyYak4LJwVRgbmLuY55iZjFrWCyWGSuCVUHmrws2AHsEm44txDZg72BHsDPYVRwOx4aTwGnhrHAEXAQuBXcZdw13GzeKm8X9JKMk4yGTJzMmcyULIUskyyGrIesmGyX7SLZBTksuRK5ObkXuRR5Lfp68nLyDfJh8lnyDgo5ChEKLwp4igOIERS5FPcV9ikmKFUpKSn5KNUobSn/K45S5lI2UDyinKX/h6fHieAO8Gz4Sfw5fib+Df4FfoaKiEqbSpXKliqA6R1VNdZfqDdVPagZqaWozai/qY9T51C3Uo9RfaMhphGj0aA7SxNHk0FynGaZZpCWnFaY1oCXQHqXNp22nfU67SsdAJ0dnRRdMl05XQzdAN0ePoxemN6L3ok+mL6O/Sz/DgGIQYDBgIDIkMZQz3GeYZcQyijCaMQYwpjHWMQ4xLjHRMykyOTLFMOUzdTFNMaOYhZnNmIOYzzM3Mz9jXmfhYtFj8WY5w1LPMsryg5WDVZfVmzWVtYH1Kes6Gy+bEVsg2wW2VrbX7Gh2cXYb9mj2K+z32Rc5GDk0OIgcqRzNHC85YU5xTlvOI5xlnIOcq1zcXCZcoVyXue5yLXIzc+tyB3Bnc3dzz/Mw8Gjz+PNk89zm+cTLxKvHG8Sby3uPd4mPk8+UL5KvhG+Ib4NfhN+BP5G/gf+1AIWAqoCPQLZAr8CSII+gpWC8YK3gSyFyIVUhP6FLQv1CP4RFhJ2ETwm3Cs+JsIqYicSJ1IpMilKJ6oiGiZaKjothxVTFAsUKxZ6Iw+JK4n7i+eLDErCEsoS/RKHEiCRGUk0yRLJU8rkUXkpPKkqqVmpamlnaQjpRulX6i4ygjKvMBZl+mW1ZJdkg2XLZV3L0cvvkEuU65L7Ji8sT5fPlxxWoFIwVjim0KSwrSih6K15RnFBiULJUOqXUq7SlrKJMUq5XnlcRVPFQKVB5rsqoaq2arvpADaOmr3ZMrVPtl7qyeoR6s/pXDSmNQI0ajTlNEU1vzXLNGS1+LYJWidaUNq+2h3ax9pQOnw5Bp1Tnna6Arpduhe5HPTG9AL1rel/0ZfVJ+jf1fxioGyQY3DFEGZoYphoOGdEbORjlGb0x5jf2Na41XjJRMjlicscUY2puesH0uRmXGdGs2mxpn8q+hH33zPHmduZ55u8sxC1IFh2WsOU+yyzLyf1C+0P2t1oBKzOrLKvX1iLWYda3bLA21jb5Nh9s5WzjbfvtGOwO2dXYrdnr25+3f+Ug6hDp0OtI4+jmWO34w8nQKdNpylnGOcH5kQu7i79LmyvO1dG1wnX1gNGBiwdm3ZTcUtyeuYu4x7gPHGQ/GHSw6xDNIcKh6x4YDyePGo9NghWhlLDqaeZZ4LlENCBeIi546Xple817a3lnen/00fLJ9Jnz1fLN8p330/HL8Vv0N/DP818OMA0oCvgRaBVYGbgT5BTUEEwW7BHcHkIfEhhy7zD34ZjDI6ESoSmhU2HqYRfDlkjmpIpwKNw9vC2CETnkDUaKRp6MnI7SjsqP+hntGH09hi4mJGYwVjz2TOzHOOO4q0fQR4hHeuP54k/ETyfoJZQchY56Hu09JnAs+djscZPjVScoTgSeeJwom5iZ+D3JKakjmSv5ePLMSZOTtSnUKaSU56c0ThWdRp/2Pz10RuHM5TPbqV6pD9Nk03LSNtOJ6Q/Pyp3NPbtzzufc0Hnl81cysBkhGc8u6FyoyqTLjMucybLMasnmzU7N/n7x0MWBHMWcoksUlyIvTeVa5LZdFryccXkzzy/vab5+fkMBZ8GZgh+FXoWjV3Sv1BdxFaUVrRf7F0+UmJS0lAqX5pRhy6LKPpQ7lvdfVb1aXcFekVaxVRlSOVVlW3WvWqW6uoaz5nwtXBtZO3/N7dqTOsO6tnqp+pIG5oa0RtAY2fipyaPpWbN5c+911ev1N4RuFNxkuJnaArXEtiy1+rVOtbm0jbTva+/t0Oi4eUv6VmUnX2d+F1PX+W6K7uTundtxt1fvhN5Z7PHtmek91PvqrvPd8Xs294bum99/0Gfcd7dfr//2A60HnQPqA+0PVR+2PlJ+1DKoNHjzsdLjm0PKQy3DKsNtT9SedIxojnSP6oz2jBmO9Y2bjT96uv/pyDOHZxPP3Z5PTXhNzL0IerH8Murlxqvjk5jJ1Ne0r3PecL4pfSv2tmFKeapr2nB68J3du1czxJmF9+HvN2eTP1B9yPnI87F6Tn6uc954/smnA59mF0IXNhZTPtN9Lvgi+uXGV92vg0vOS7PLpOWdb+krbCuV3xW/965ar75ZC17b+JH6k+1n1S/VX/3rTusfN6I3cZu5W2JbHdvm25M7wTs7oQQSYe8sgELusI8PAN8qkVzABckBngBAQf07N9hjAICCEA6CHSFpaAFORsmj5tDFGAKy1y3h2sjSyX0pdCgZ8bRU9NS0NIy0nHR89BIM6oyWTJ7MMSxZrPVsg+xzHKucW9xkPKy8Qnyy/NoCVoIeQuHCp0UKRZvFHktgJAlS3TK8skfkxhXEFaOVelWwqgZqEeplGoOaX7UpdOh0mfRY9dkM2A1ZjBiNaUzITHZMv5st7HtrPmbRZ9m6v8oqz/qsTZJtnF2EfZhDuGO001Hn0y7ZrqUH6tzq3WsOVhwq8yghFHkWE0u8yr2rfRp82/3u+g8HvAlcDsaGsB+WCFUPMyU5hB+M8I4MigqLjoqJjU2IO36kML4jYezop2PbJ6gTOZKEk6VPKqWon9I+rX/GJNUmjZRecHbg3M8MsQtumWezurMXc5gvaeS6XY7Jy8gvK2gpfHjlddFyCbqUuUy0XO2qWYVzpW9VZHVizbna/GtX65rqbzcMN041rVzH3uC4Kdti1OrSFtx+vCPzVknn2a6IbpfbWnd4ekDPu967dyvupd0n9bn373ugPsA9sPCw/JHTIHaw4bH9459DecM6w7NPskaMRjZHb40ljls95Xn65VnX89QJhxc8L+Ze1r0Km1SY/P66+U3oW/m3W1ND00XvQmd039O9fzfb9OHER+s5nrnP87c+nVmwX2RbfPH50hfXrwJffy19XF5eEft+fk3iJ826zebizs5e/AWgRtgCXkLloI3Rq5hKrCdOEDdHVk8eQaFHKYSnw69TLVC/onlCe5+um76VoY2xk6mLuYdlgHWErZ+9i6OFs4mrlruKp4L3Cl8Wf4ZAmWC/0BcRZlFdsSDxPIkHkmvSwjJ2skflauRHFNaUWJVVVaxUCWoB6kQNF01LLT1tRR0hXUY9WO+r/iuDPsNGozzjZJMgU1sz5X0c5sD8o8WQ5c39RVZnrKNsiLa2dvr28g6CjsxOZE4bzp9d3rqOHLjn1orMhqJD2R6phOOeUcQQrxDvEJ9g3yC/QP+AAL9A7yBC8MEQ18NOoXZhViTLcJcIH+TInBCdEnMuNjvu8pGC+MKEoqPFx4qPF58oS2xJGkqeS8Gc4kfmAzE1Ka0svefsm3M/MqgvCGSqZFlke16MyTl/qTy34/Jw3kz+j0LyK+xFEsXqJSaljmV+5UevZlfUVT6oel8DarmuadQ51ZMa0huvNnU2P7n++sb8zdVWqI2qna1D6JZsp1qXfve+29Z3HHpcew/ctb9ndl+zT6qf4wHuwdLAs4ftj/IH4x+7DWkMsw//fPJs5MZo1ljEuPNT3WdSz3kmWF+wvOR+JT6p+drujedb1ymTacV3fDPUM9vvv8xOf3j+cXju0fzAp4GFx4tjnz99hZZYliW/Ga54fE9abVpb+Kn5q3iDdbNm22Iv/hLgHmQOTSAzoA9lhnqK9kB/x6Rg+bCtODvcClkluTsFA8UTynN4WypeqiXqhzTXaLPpTtBHMAQyujNpMbMyryAzoZgtit2cg4/jB+djrnLuBB4nXgU+Wr6P/O0CpwXthbiEpoRLRYiiQqIfxKrFD0uoSqIlR6TypAkyojKLsk1yUfLq8tsKPYrJSibKZMoPVdJULdXI1frUkzR0NTY127QitGW1P+lc1fXQY9cb1z9nYGawbXjdKMCYx3jM5JSphulns6J9NuaQebOFpyWd5f39CVbqVj+sb9iQkPPDV7t6+xAHKYfPjnVOwc6SznMupa4uBxgPjLhluNsdZDv47lC9xxGCuSen5xdij1emt5uPgM+C73W/eH+jANqAycCaoLhgyxD+kF+HR0Mrw0JJCqS18PaIhEiDKHzURHRlTHysU5zKEY54VPyXhBdH7x6rO37pxInEwCTHZL2T0ilcp6hObZ9ePvMh9Xlad3rJ2aRz3udNM6QuMFzYyvyUNZk9evFxzqNLw7njlyfyJvPfFrwvnLvytWitBJRSlrGVi13VrLCp9Ks6Xp1b01jbf22q7lcDQ6NUk1mz7/WUGxU3H7QsttG163Sk3Brr4u72uV13Z6VX4+7JeyN9gv3xD1491H/U9Fh8qOgJeoQw2jMu/7TjOekF8dXVN27T1bNjC4QVgd34/64R7e4JWGUALnID4IzUJuwuAnAW2SBEvgLAQgGANRUA9moA3qcFYMY4ABlx/7N/QACN5Jz0SIVCFMk0jYETCADHQTaoBnfABFiG8JAokhsSoUSoDLoHfYQpYVnYCU6EG+DXKDxKCxWKKke9QNMiOdoJdCf6J0YZE46pxbzFMmHNsYnYW0iOJYcLwdXjviK5VAzZHXI8uSt5Dfk2kiU1UDJQxlJO4y3w7VTiVIVIppOO5DankWzmHB0TXRG9FH0ngyXDW0YSE5Ypj1mauZfFiWWRNZGNja2J3ZZ9naOc05pzi6uO252HhqeXN4pPgm+KP0dgvyBWsEsoQlhKeF6kWjRITF5sQ3xAIk8yRMpImkd6U+aVbJdcury7grwipeKc0oByg0qe6hm1eHWSRrCmv5a/doCOj66lnqI+uwEw+ICckFuMS0zOmR41C98XZB5ocdgybn+qVYl1u82Y7Vd7KgcpRxunaOdil0HXDTcpd8+DeYeeEhg87Yi5Xq99+H19/er8VwLVg5KCBw+zhvqEtYZTRBAib0VzxXTEuceTJbQfCz0hkTifXJlCPM15Zizt1FnV83IXQrIe5ZjlzuSfuSJW3FTGdzW2sqX63TXGesvGc80vbsq0ZnZAnfG30T059+A+9wedj3gfnxr+Puoz/ub5gRevJ73ffJu+9P7gR6n5ucXwL91LD79d+i63WrW281P6l926zYbFpvQWemtiO2PHZO/7ASE1BzxgAnxABugAG6QiEg8ykej3gknwE2KCFCF7KArKhTqhdzA5LAcfgNPgW/BnFC/KEZWOuo+G0LroI+gb6EWMMIaAKcS8xLJinbC52Jc4Lpwnrhq3TKZBdprsGbkIeRz5CIUExRmKJcoDlAN4Nfw1Kn6qAmpW6lwadppiWlHa63R6dOP0AQwwQyGjGuMEUwwzO3MXiycrGWsjmys7hv06B5GTifMhVyK3BvcPnpu8kXzKfOv8twVOCVoLMQlNCleIkET1xOjFPoh3SVySDJeylVaQYZHZkp2R65YvUEhQJCiZKSuqCKgyqVGqYzQgTaAFa+N0qHQxuut6S/qzBq8MR40GjHtNukw7zDr2dZnftxixnN6/ao23EbDVsHNATjEZjo1O487rrgIHrNyOuTcfnPPgJxzyLCA+96bzsfA95dfrv4VEOya4LWQ9VCfsNGk8QjAyOmo4RjG24Ag2npQwfcz2eF+iVlLbSZWU9tM6Zx6mOad/OncqQ/nCp6yKi/6XlC5T5M0VDF/pKm4uvVZeW1FX1VLTc+1x/bPGF81PbzxoaWw72+HRKdG1dLu+x++uyf0D/WEDqY+uPr49/GJkeRzzjGmC/6XkpOIbtSm1d1zvMbPLH6fmhxY6Phd9jVk2WoG/V69p/+j7pbtevUm5Rdy+vhd/GJAh9SYBZO1bIFWxJKSGdBtMQWhk1e+HIqB86C60CDMj1Z1wuBqeRnGhDqAKUdNoEXQo+haGDOOEqcJsI5WVdhw37gzuF1kQ2TtkfY9RWFIMUFpSjuM98F+pEqnZqG/Q2NGs0RbSmdJt0DcxBDFKMH5hamFOYrFjFWOD2d6y93M0c5ZxXea+yHMJOYdcQ6I6Ibgg9EuEUpRXTEXcTiJMMkuqXXpGll7OXP6CwrgSs7KDygXVR+poDS3NaK3r2su6Bnr5+j8MHY1aTdhMj5hNmmta5Fn+snKyfm7rY7fucMFJ2LnN1ejAQ3eTg90eMoQCIoVXgvd332C/TwH+gZ+Cg0K+hIaFfQ+PjliPSohhi717JCyB/+jT46cSVZJmTqaekjjdn3oo7dvZxPOsGU2ZFlnzF09fEsntz/MpwBSWFukUvyyNKKe+WlmpV/WmJuEad92dBq8m8ubGG443t1rL2807vnVe7ta9/bHn/F2ue9l9NP1nB2geXhzkflw1LP+ke9R0bPSp47OJCccXw68MJ2+84Xt7cmrxnevMxOyhD3NzIfNzC7aLDZ+XvvIuaS4bfFNe4V35/L1jlbTGvtb7g/Djw8+gn8u/In69XNddr9ig2gjf6Nuk2XTaLN6c25Lbit3q3Vre5to2247cLt4e3P65I7hjvXNkp3JnbDf+4T4K8ru7B4Dw+kj58c3OzoowALhMALYu7OxslO7sbJUhycYkAHeCfv/fYZeMRfaYgpVd9KCg8fju89/XfwAINpqQXfwSgAAAGn9JREFUaAXdWnmQZVdZ/85d39r7OtOZ7pnpTCYzWUlCNCoiJCxRCOCKAiqKQixLqRKVPyxNgWIBagmlIIlSCAomiEGIQoBkKgYJJLNl9szSs3RP76/fvtzt+Pud16/TnZls/qdn5vS976zf/n3nO1dpreX/c7H+PyNH3JyXi+A99yjrp0bFrsyKPZoWt+B2uTqddtJRjyOuHkzZ9pCWuCmR29Je2NKJDgKVhKqZhEmYCiQTh424GfctNMIFWYzyFyW+aZPE8sc6ebmwvJTxqiOiBPxnx6/5LctSEzqyU2LFKaXtlBadFkuldGLhd4J27YsWTyzLw29PRKGKK6IdUZK1LdtLjNhrrbQkgDoWrSKMQ41RJcK4EOiEoqxAdBKgLcAeLQDTsh07aLWi/7jm1w7+9ZF/uOZ627JeK5Z9E8ZvFktsiVVZWfExPB+eu3DwkVf/seaaz1vWEFRKWUc/+4ofdOXcm6IoxoREiLzRUKwOcCVZfQJuvCvghGei0IfR+MN3ZVMoHGmFIeBJALdGRdPqEwQUhd9sx5aoeGIkn5blChCUej3aq3V80bWt13m+7eskljgmTJhn2WLbtgQkV6L31MPkd298976DpvMyfwyCRA59zr7P3HB/T86/6+yip+vSo5VlqySxwQUbgHtWnDhAA1NsD8R3LLQDL5vMxb6WSsRN/MrTKq2WZDn7hsTxXFtHgVZJkIiKgZcGzmEicagVflsSW0kSJZYGExMt2eSCNd5XVI4FVmH1Ui2UYiunK/GQjlUXiG1BgCqSkwXVnymp3nxKGkEy26yFP3n9ew/svwx+azpIBNPlelTqzztSdSZFtvwM8AYcyrIckhw0xhOFfOODRdlgI59o4QPyNVVMrMaKyo1ea7t+muxlz5oxA4Uwh6VtvfHXtjAoAu6tU/+oHbWs6q1IZqqbklr+Vm0NTyov3aNc221vqWNdrpd0YflAMrq8x7piwB4FbT798Q+MvOb3PjZXa6/97N+OkeFkr1xMivaoLb7VFEn52Nms2V54FST8ML87uttGrj1Eg/KJl1aqqcR1UAE6EemM5ag2WnhpL9MhlbIApXjgWt2Rc/rHk9SVP6F60l1YAOQ0qtGZ6apUKq2S/jtl/mx3nF75N3uwx33lT4yP3YVF/5krry8dBDlbF2rBMont6LpOgJ3npYx+GVioY3EIuAAm3vlUYKDRU/zROgGzIa52Gkg4ynFc7TgO+tvGkbrz7FyC0CaKQZnLQccazaaasn846dp1F+Q9lChoGN2mqaKOazxX92sTqnuXdWzvl5N8/UlL1+SnIVdfIiDPh2CyVI4W4sQCB+tqceFEEnq+FQc1WP2WWE5adW2+Dli1pQ2KrwvPfFP7ekklUQTRCgByJNloSZQLQ2vbsDeUxrZEBrWCDlpNqDDnW2AYzAisBBlHJQByYs88DkRsVRr6Ee2nslD2DqwkJqXd8MHAT/K4vq+KuVt0pbgPxkmu/bFJ6Ufzohmw+mc9B5PpxeZSGKtoKNtyMuUv2I4VY3MqWiCz5XEtYzeI58IjoESxJbngGZnMnwIiKeUCbm4fA6ZzlX6dYJzrwZOAM1GspXDg88lQ434rhD0JYBATWkEuRPNDyxo70ueHKg+nc+jkfyZdt7wLkglPYrvSqpd1q1oUP9MtXjpnrACn0mKn+7dL/axIry/9rxyXQRBiCYQgKKZsQHDqYqMIojazKTvnuQLYbPgwrT3Xc31jprV2XQANynLxptsljpuW2ZVwfr4QTqc9lb1ys7czbhYhXi0gDLcVhRJrSyf1ORnyMS0LnoL8RsLX5JQuI6QhxViR4dnPqeryq5KuwQk1d+DfdXr+86pbFWQxGdXZWz+quwaugF0CDJYDhPMC74SFxQ5bkgZWFJk132gQJMbAXO/ZWyr8/dfP/UW5FgwWS4EuNuLW7omuwd/5uW3voAjC3lOv8Bf+DTNsL69d6NmR00sHf+Vjxx/8+R+SXX/6dtlZnYPYbW9pF2JGPbQVYgDHFzL/0LQc+M5B2QvG+Gm4Pc8WJ+MDTl/SPobevF1unhyS7u8f/oxuOFm9Qz9iDW8CxEB8pDarjpz+RtK/6bfBefhZB+4qKEkG60aJVB49AlG7HIKGlyBeKZTKR++f/i5+j6D6bG9FcRWeKoK4ugmMuQso6Xg1gI7g2VtLeyQL24NS6PGlQtrR+HqeI74HXcRYQ16LAY9If056b7lKJkh0yjTwV4fPy7k/fEC+gW7rgz8pc++5XX5pd+r7FhCmMdePn5AnBrql/8pB2eGGZYg+JjHAAAeTxae4ppxfkWcOrUida3CfTumIKH8TzBIq6C8NVPbZTThlRC1Nz07cFpyvAwSDFiILAF6vlCWCR+lOGZE4B787SuNI70BCsMLaABDbIE0pH+uT8YkBGcfaBhQfQ0a7ZM+ffU2+jJbcRx6SPa/aLddeNy7XVRHRfu4x+dLD+2T6vrvlfWWA743dDFZTEhNZnjmT9Fa+rOwhkb2n5TE0Uq1BtmfLegTZWUYloguoAFX82grGKxveKcxXGxUVI4yjuXYgcrYP+W+JZFNG7pfSKSlgEt0hkIPceeAaLaECT7uv0kcXF2MranMS9NOqvs+6YbgMIypwT3IKNYM68OmH5f4P/YJs/uJ/yYOPHpWpT71X7u5KSff+xq5k7Lo3KhcWjWAUD9wr1/eJuliUUx9+QH6AucSBda2sIQg1hCNTANfIMZFjyZyeiZbi6sVKXDo23Op+p7hbPcMhyr/t9dBcKehSCmNDKHoLqGhlK4vcW0MQnbvveJ+TyN0MwNsF4d6Zhz8kunUvvKYRLSK5hFr86gFJFory4Tuuk8l/uFven4eFPDwneuj2P5feviHGV3Jmz2f1ePR1S6Wl9aXvypdWYjMX8gTWritrCLKNxoaPTj8QjhD71OtLxyoZ2qawSouKKBJRIRCEyTZ+DLEvEYRXlwTv2oEFAXIIFLy2DnIqnTZ8EOWCXCZnNfwrxTmExHPIJ35VvFsm5C2I1HZmPbl5pFdeEQLkp5c3JYOv+zsZmbzJYth85smvJb1Tf6KGIJrk5EiPYcoK1qAOPj+C6HxuIbJBGEkZEgffBQR9HyEyHIALBDO95jzk2sY8O4jwIbzgIAgAf6l9IJnQyMClHH3447E7+wXbdrpos43ryCZTyhnBujg+YZ/kxjHZsnlA/jIFvWwC1Gnwszjwi/H2N35A9Q5tseIokJNPPJg0H3+v2joiCnAJ1CK1ZdAwpUhYV5m0hscGDq61PvtCaoRwzEUXI1VUhu7R7EM8IYKpbF6R9DBq1HqccEE9eCgLPg2BjDEyOG0Yi5vSZZnsLornF9tnFywHSUPMajbjPvZKU3JbgfvZRbELA78Rj97yVpm86lYLRyzje4NmJWnVVyR365/KhSBK1JmPq6tTFRVFUsB8qtcG/ePKL4YgORjjsFOkQbSDOhQckkgOOq6kc7201uIguoN1cGFwYrwndBMYR26rhGdciCwjEkyRQzNy6PHDchD66lJfezJSP78gj2OfVKkqvWizm852ff1bPmR1dfWoCN4buoNuS7z+Eeu2t74fNsuSarkkJz77BbCuIpVAeIrgINYN5SUh2GzJCnRLbES0fiqN6B4WFJjkekcU5QJewJ8YEw+6xCMbbYD4MOXpTAYBOnQNiobgWxzQd2ZZzt/zoDHp1GpSnNQ/i2rjpJhjTG47WcGJwbgkyDS6NhawlAdmyEaDvjQpVoXG5bLl0tkbh5EiSaMlRW4c1WfV3NQRHFixHozu/Llj2gFKjErGesVHtEFRM1ScO3NAh/UCoy+xEM5BvEgIyaeNIZjhuqhEkNSn/w1AGI+EVOEpOfCVDyaIELHaeqaAciiU7Ua9BnZPWzhGhpWGWdP0PffPS0Kw0pQVeroR/U21/JVvKlo+mHaQW1R/H6BMJD2al1QNhhJ7qyt6wZYn7rILgI3gEZNhwOphbC4FmRI5jUqqE0HIsAksdC4NxsFNXj1ch7/9G5s9nN9GCy+rpdPmwYoiGFCFant+p3/988UQ5Fi9VJFSK5CwC0e9rG+OZjHEkdyJyk1YeegorLdVrEjYCGQedqinKwMPgEwHxiDxARiReIEIQjelijXp78g5Ikh4WTOnZmR+f5d8u9ySDBgHMr5wwWkMZxpZOHzOBCgdN7dhEiSZa1++QBRIvO7tfbLr1p3yY0sl6Sk3RFUbiNAaEpcjiWt1EDGRc4D0LMaqbb1yFUC7AmKb8YEUggDk2cQCZ3RfWsowJPu/c0KewtgC9iZzKXLcJ486jroNFc4DmbsXLwwpKe5nUC9gPfrBDeWlIJjDjDHUCdQBVHK9Q3U+KWoM7RjDElACN4xK598pbCcytEnnUM/z/TkI0tVw7mZUCLkJ//B4wcLTAyOgC6g8B9JVbCgvKKKYAIuIc5JAB9sb8klgiRgBZqWTpthRt9hHnaLRgNaZ32zrzCHFCRCJwjVMWd2H69Ci8tkhlul/gT8Uca7JGJr7XlJekIPrRwNRAkyxQYgtCtisR7AJIPmb4kbdYdDcETECzM3ZTkRbGMu25y2re3WIT/xJkOctGE881gi2fuBlEXzgAWXvLu/ujlQ06Ct/c5gkE6D3NoA4kfbciVojfuC69xz86wOf2fWWrnTq7maYLECLFnQsC3BbC4V69bHbfuv06Sc/ufu27pz9B2Gs9yeJPlAP6kccZdu+6+WQerk8QDhJW3F94epfO3OOgB69R3lq7IY7cQDsx4E7i8gCmfYkp7WTATwZGLBcoFsfvfZXjh1aj1jnvUOlzm85dO/uN96YuvEjoYsMg/Z6EXKlfOYYwDBG1oxgILQtEO0TT9937Zu8lHeHslrgHNMOFkIvD2ZV3QeCvmf/fTe8JpNNvSmKojcBQXF8p2YciaWRW1zbcsOLBx9Ua7ifRuPd7Jh1t/aO2tbnsikPQSwlkmlE9iDTZm4NoD9Ljc+h4aUhOLsUFsavSCF9huwWpLsV27qVZCRIunVDp2Q8PWXlUvqaP/jZ4Wss5dxUqsVyorgjYerCiksy0bPI2PG28fGe3q/90bbb6ghQzyz1aN8NcXFRzabcAD7Uk0INIR9P5auIEmjb1oKTgUQRgkMUit5fvW9LdtNmKyzUlMxVhxJlp1WsbeTHLTXgXrSG8jU9vRTRVlggqpnHuZ2ygYMY5E/2ycxXPvaKY6DQril9R+wOXYswMoWUp6+YxC/N3Kt71PTgD12TfxtS7BPLTTjGTW8S1T2iGqVFvbx0n4zmVrZ/4M19t8NPXY0oQ0r9b9NedlCWGovIDSyKWvieRPnrtT10LbhBrsDiIDjV84/r4eQpp4bonrCw+UKhmWe2tRFmpDrydknl+tGFPDFSkOHs3+F8WU2m5mOOddH+oqcJ+1RB7NnF1tM7tqR2IZJUqb4x3idwL/xD9OdsBZVwhzCSf4fj6FxdhnW2exBJe6T2ewZVfWUM58GSf8327l90HXtosdkj2b4x5afySnoGcYmC+7TKQe3l+63U4Bbgt2r8kONplvImUG+0jKEi0FGt1Mggx4rzBA6diE/TKeN9oBEhgnwIunLilSXj/hBrXVpo2dYXSrf1/eOlg/QKufAkrpRayKQhJwcR9JhLzE5IM7ClO5+ehF7ZgbtV+37GJHl9bB6lJnUr1DLa59+JxdMtZ7NOZbp5jwMRBK1aK9KlLiLjh2MXgma2tSv6MYH5i1Zk2EqAESrwdIiIExaFKUvYKIxhsI3OpAnaN6JCIyAHLqvVz0WQ5Ay+smf6WL2pCj3OMtYoioPsGHWMmWq/Z1w14yzOfLgsiZDdyk/g5I4EE/pJCLd3UtVDHxk114thuaPUVnNIZj8AFIpo1gOLLM9k6My8VaDjVg2h0Ulplc7SYbetbHVRgrmnVGXmUSmXK6peqUi1WpVycUVq03ukcfFwVJgt0VfTU7Tn4EenPBdBKkTzwFmZWShHR/vS2Kd+zgDGg64DEme6h6Vuj4C/MQxQRns9Wwxi7OdlS7pnE0L7YRxlcNcQeuJ2jRvOM0dDCyyVKe1F56XZqCM718KpoG5qHTFfbeGkDhYK0iogvG8jCG+CrWCkeSiFRCZmHx5OcctEAwIEQuBMBC9bNiC4aoVIvfIz58tP+TjcevWTUHhzgDWI+EidR6ltyE0E0rCGgfCQQdzBWHI4ne1WgT8JUmpp6i4QYBPvLpAWCHBILepg6msqXCpIE1wgvWEYIKLI/oJATHbySAVhMxwhxAzY0UU0JZVOmzwP860uzqP4TyscrgTPjuec9WUDgqsdlOfmt54q7K+HdjOfTCsd1CFOPg6gyMNAHO3uHVJDhB2nJ7BpTjFXColEH1KFPvxgeouU5p6QhcUqXCfzqEzjA+rqsuRw+wx7AbEH8ZAU9ZHjYXLK9yGytBmACOdPhn51ELyOgzuut2ERmOTyU211wHgP93OGJpYEMzjFrEdq/fvlEKQeNr/82PKZUjU405sqS1KZ1i6Bx4pGTPsmpBhktdOzwwBI8QsbFV1dmk7IKZUaUfPTEKL0DnA0b4Dy02kJS+d0N9QQ/0xAgIgG4t9OELsQX97qkqu7JuTOAx+Wvzj8Z+pTv32XfBDpfU9wuwwdZjUEsSiiWAfxQzC9YkLBS/SPiG7wg6uY01lSTAtnFxr7f3ige1dSfgZW71ZIUFukcr3D6nQymWzq2QIri4MhbkxmTz2p68WLeuePvkt6RibkpDWp+4Z2gwAukjTgH6+9SyeZJJY6BLAtDZ450HHfGLJmJQh0YAWGcvJawP5atuMrCIg3LF9ST3LI8ZDbFkSakR6tLohFWFd9DWdsLJcgSEsEveCkxhNHV566dWfP273mKeS6Ag1ritADIReoqHp2aeUhqwb94k2TXj4obuUMoPxlyebyyhp9Y5IbvtJiDoIhVQT/51X2mexUAwLFNXC91gYSm5H8Ud8t+pnGqNZWClYaYQWDCzeNe3wEKSN9OpvN4h4VERO4DR2E7wUHE6N/RPAlcxBjDUVa//zQ+ePvvnPrXLe1sKlVXdTZke2gJlJn+IJibOerlJ/uglGwpdlq6Wz1Cbjc47grrehMelBNvvLNkukaMIYJLkFWFi9ILtpLN0aqm3tGcgP3rZ2idt3+OzAp/OKCI6B55oWv/A2zxRtmFCaBEFggLQcuJObo9bIRpJg2pssyN18IDu+4wtk0vXQCgeJ2w0E65u6+EZC1fUdXWjit8/FxBV1R9cWppH9oTA1uvtLuhIbMgoeFsxrfN8BDA0CAC6Ohn4OgyZYTrw4zDEuMPSaGRNAg2742i1u8A8HHGgZBwnvZcomIchTdBeM6vFYPT5Wf3Dlae1351ENq4Oo3GKOC/tXFoAuwro2Zg+ZykyKzvABRvfF2ZMEp5WQXQAaCrcUjMoIzO5hi2IMwzugTrwHoKhLI2tS+h+KoNksAcL2RIKcacB18aQIr7A2ona9+N7TBhT2AaGMeMuqCiI0+k/67AxS3XCuXRXC1l/LQ+teHjx98/XhcyTSezge1e3R2cDOultsBMsfxyjqaf1yyq8Dby99jP7nTJjfGhLjDtopP4lMQSZqRNEH5DN2Ecf48RqAEYaiDI5+0JrzDitlujDHEANg21FxOta5OLPs3zRwi6Lq44QGCuJsggi+Pg2bHNlWajxyNzy/X5ER/Wm6uzR3To1dciWwz1wR/oFDLC9M6W3tI6Tz3Qqjaesxplhckv2krAuvIjKktTEsmeEw1fCktV6SAtbbFq+a+zUF+KaMlzWteqOWxGTlSDaTO633c/mau2yI3pOwBRZ/JzDoRVFGTbgK3zWsIvmwOkirEpDQ1L3sndsnNhYs/gO78NCwf9AEA4Rgl1YuHNQC2cMN6GuY8HB+Qa+qLx5P0jutU2GoYB11fPKl7ANN8SS7iwiS0kPMwwQGMDBEkqyCH4Bo+atMS/v4X5Kv7L8g89tZvvlG2/u2vyw221wWjluEJAtd2yK4DNXIQRgoHsufnIDX6sgUIkCLUw8ajh2UfXF0kS3tw0RFoHyl5P5NFNGJL7dx3pRsZmL2n5MjeKTmKfKgUT3xLlnD72qyV8SFDrOszB6QbInxqXk7D3QWUXTeVkxTE1E8jTY/1XNxuUK9gRJO+rElyMfE0C4LVaExgFGAZQIYo1C186RQ1ysZN4G6eCBLWl81BzGm7i3/6Lzn5/jfL+X5n37ZDD/xegksXg3+M1b3FL6okJ9Gjh+QwSKLf+WqRK4L7rPn774MT3yqRv1k7jaPK6hX9/RNy9MoR2COc9KaevFdVT39nDa4gaKlUfFQsX0IENxfQcQI1GeiTzbyeSJceUcf+8fW4HwF94qr4yXGVQRITYkxr9r/SQcwzE5vVSBbPL8uBH98t2/rqn7JMUpC9KOlhHH+XZPbr++U4dFD97rQ8Ntoj2/FBQtZ1ptKeM+WBWWqlJtUHn5TTv36H3D6ErGe+/i9KM7m4rriDiPJr+I6onWedQZfG/X2NMeeWvjqinP8mROAh/kKi6siqF2sm1bhulY2vL2RFqWedqKb5+Ufkm7hWZpiF7x6Mpae91zAK8Zk5OQLkKFLymnvkb/HYtKlLurYNSXpsULJXbZYMMtyV+Yosfftp+cbRaTldC5AYpkRiIksCfcJXFQFc7Mz+aSOi1H/r6wcg2SX5CIiYL+HgjhRIiJNVVK3j3K1lYW5BcDhfS0ZzqQ3lsmnD9SPgo0BQGULdhjqG2o265gLwznyB0Rc86Vo4lhVaZxwhQDe6zKQux/I3M+TPXQdNRp+m8ZxCvYjKsdxzAhWyYpLJHX1j9MI1z6FeQC2DH5eI6gtyEJNYSGPkeY1VI2LmShDPTiGl+X3YAioRJBLcGGG1AYgEIlDmCLTaznFcZz2h8NMQgplvjuW+nMesNS0qL2toFIkEKxFk2yWZcrStlRflIEeuchH2UfAhlslYrweMwNKSETFuSqoTKRKP76wcz3EEmu0mC4bncwv7STACzifncSylocOMDgeJJNekpWc27RLuoR1ZO+MN+Pr8BQhyI1KPdT1ynMQNDVWxFt9JkM4YPjvV9K373RnDKZ2yBnwH4HV7d8bw2VnLPDv7rh/QeX9JCHYG/198/g+8dPOSlFBGuQAAAABJRU5ErkJggg==
// @version	0.8.6
// @history 0.8.6 Fixed overstock page
// @history 0.8.5 READ Firefox 14+ requied !! (1)Fixed allItem page performance problem and readded the code. (2)Ref is parsed il all position on userdetail page. (3)Some adjust there and here. (4)I don't remember (1,712)
// @history 0.8.4 Fix for some site layout change. Disabled allitem page until i found a workaround for the lag added by style injection. Preliminary change on ref conversion function.
// @history 0.8.3 Fix overstock filter not working if user ave a different language on steam.
// @history 0.8.2 Added a beta feature regarding overstock page. Some little tweaks.
// @history 0.8.0 Price update
// @history 0.8.0 Updated buds and bills prices. Some little fix. Added a discouraging message in consignement page (15 days of user losing their items without seeing the admins for days and days) 
// @history 0.7.9 Buds price updated. Fix on some minor bug. Fixed opacity of painted variant that WH admin don't want to fix. 
// @history 0.7.8 Updated Bil & Buds prices. Fix a bug with credit held.
// @history 0.7.7 Support for new WH layourt. Ugly consign.php support.
// @history 0.7.6 Detecting the right paint color also for some Team Spirit that look like black in inventory. Better visibility on stacked items.
// @history 0.7.5 Correct itemStacking not whowing up crate and medals numbers. Added Ref calculation in the Consignment controls
// @history 0.7.4 Readded the itemStacking Function with some improvement. Color stacking on warehouse was a mistake (FeedBack). Fix some new style on warehouse.
// @history 0.7.3 Removed itemStacking code no longer necessary. Fixed the new custom price.
// @history 0.7.2 Added item stacking on allitems page (beta) Fixed an Error With Chrome
// @history 0.7 Fixed AllItems page not working after the changes of warehouse. Removed the filter code, but left the code suggestions for the text box
// @history 0.6 Added QuickFilter function on AllItem page. Fix script not working if you are not logged on warehouse. Added greasemonkey menu command to manually check for updates. 
// @history 0.5 Fix some error in credit conversion, added conversion on ticker and on item page. On allitems page added a check to see if you can purchase the item and how many credits you miss.
// @history 0.4 ChatLog implemented, fixed userbalance code, autoupdate, tested with chrome
// @history 0.3 Added Userbalance live converter (found out why my script was unlistened and fixed) :))
// @history 0.2 Added paint name detector ^^ (work only on item page and with firefox) 
// @history	0.1 Initial release
// ==/UserScript==
var initObserver = new MutationObserver(function(mutations) {
	var gg = GM_addStyle('\
	/*########## Global ##########*/\
	acronym{\
		cursor: help;\
		font-size: 0.7em;\
	}\
	.ticker > ul > li > i > acronym {\
		font-size: 0.7em;\
		font-family: tahoma;\
	}\
	\
	/*########## allitem.php ##########*/ \
	.pricetag2 {\
		background: none repeat scroll 0 0 #514336;\
		height: 25px;\
		margin-left: 538px;\
		margin-top: 116px;\
		position: absolute;\
		text-align: center;\
		width: 130px;\
		font-family: tahoma;\
		font-size: 1em;\
		line-height: 14px;\
		color: black;\
			border-radius: 0 0 10px 10px;\
			border-style: solid;\
			border-width: 3px;\
			border-color: #7D6D00;\
	}\
	.reftag, .gm_pricetag{\
		font-size: 1.2em !important;\
	}\
	.nobuy {\
		text-decoration: line-through;\
	}\
	.list > tbody > tr {\
		cursor: pointer;\
	}\
	.list > tbody > tr:hover {color: red;}\
	.list td, .list th {font-family: arial; text-align:center; font-size: 13px; }\
	.list td:nth-child(1) {text-align:left; font-size: 10px;}\
	.list td:nth-child(5) {text-align:right;}\
	\
	/*########## items.php ##########*/\
	.main .search ul > li > i {\
			margin-right: -25px;\
			-moz-transform: none;\
			-webkit-transform: none;\
		}\
	.main .search ul > li > i > acronym {\
			font-family: tahoma;\
			font-size: 0.6em;\
			cursor: help;\
	}\
	/*########## userdetail.php ##########*/\
	.consigns > li .ref{\
		display: none;\
	}\
	.consigns > li:hover .ref {\
		display: block;\
	}\
	.consigns  > li:hover .credits {\
		display: none;\
	}\
	\
	/*########## items.php ##########*/\
	.main .search ul{ width: 80% !important;}\
	');
	console.log(gg);
	initObserver.disconnect();
});
initObserver.observe(document, {childList: true});


document.addEventListener("DOMContentLoaded", function onDom(evt) {


	function log(data){ if(unsafeWindow.console){ var output = ''; if (data instanceof Array){ output = data.join('\n'); }else{ output = data; } unsafeWindow.console.log(output); } }
		
	var ref = 4500;
	var doomword = atob("U2NyYXA=");
	
	if (typeof(ScriptUpdater) != "undefined"){	
		ScriptUpdater.check(117278, '0.8.6');
		GM_setValue("ScriptUpdator.interval_117278", "28800000");
		GM_registerMenuCommand( "Check For updates",  function(){ScriptUpdater.forceNotice(117278, '0.8.6');});
	}
	
	if (typeof GM_deleteValue == 'undefined') {
		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}
	
		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}
	
		GM_openInTab = function(url) {
			return window.open(url, "_blank");
		}
	
		 GM_registerMenuCommand = function(name, funk) {
		//todo
		}
	
		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}
	function insertAfter(target, newNode){
		target.parentNode.insertBefore( newNode, target.nextSibling );
	}
	function myInsertBefore(target, newNode){
		target.parentNode.insertBefore( newNode, target );
	}
	function RemoveElement(target){
		target.parentNode.removeChild(target);
	}
	function wrapElement(target, newNode){
		newNode.setAttribute('class', 'test');
		newNode.appendChild(target.cloneNode(true)); 
		target.parentNode.replaceChild(newNode, target);
	}	
	function arrayUnique(arr){
		var i,
		  len=arr.length,
		  out=[],
		  obj={};

		for (i=0;i<len;i++) {
			obj[arr[i]]=0;
		}
		for (i in obj) {
			out.push(i);
		}
		return out;
	}
	RegExp.escape = function(text) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}

	function refCalc(val){
		var tmp = String((val/4500).toFixed(3))
		
		return({
			simple:	tmp.substring(tmp.length - 1,0), //fuck
			extend: String((val/4500/2.55).toFixed(2))
			});
	}	
	
	function cleanPrice(val){
		return val.replace(/,/ig,"").replace(" credits","").replace("c","");
	}
	
	/*
		User Balance code
	*/
	var TotalCredit = false;
	var userbalance = document.querySelector(".login > .overlay > .available > #userbalance");
	var ticker = document.querySelectorAll('.ticker > ul > li');
	
	function OnUserBalanceChange(event){
		// var balancetext = document.querySelector(".login > #userbalance");
		
		TotalCredit = userbalance.textContent.match(/([0-9]+,[0-9]+,[0-9]+|[0-9]+,[0-9]+|[0-9]+)c/)[1].replace(/,/ig,"");
		
		var CreditHolded = refCalc(userHeld.textContent.match(/([0-9]+,[0-9]+,[0-9]+|[0-9]+,[0-9]+|[0-9]+)c/)[1].replace(/,/ig,""));
		var credits = refCalc(TotalCredit);
		
		newAvailable.innerHTML = userbalance.innerHTML +
			" <acronym title='"+ credits.extend + "'>" +  credits.simple + "r</acronym>";
		newHeld.innerHTML = userHeld.innerHTML +
			" <acronym title='"+ CreditHolded.extend + "'>" + CreditHolded.simple + "r</acronym>";
			// " held)";	
	}
	
	/*
		Chat queue code
	*/
	function OnChatQueueChange(event){
		var text = event.originalTarget.innerHTML;
		var match = text.replace(/([0-9]+) credits/ig, function(string, match1, offset, s){
			var ref = refCalc(match1);
			if (ref.simple){
				return string.replace(match1, match1 + " (<acronym title='"+ ref.extend +"'>R:" + ref.simple + "</acronym>)" );
			}else{
				return string.replace(match1, "<acronym title='"+ ref.extend +"'>" + match1 + "</acronym>");
			}
		});
			  
		var match = match.replace(/Paying ([0-9]+) each/ig, function(string, match1, offset, s){
			var ref = refCalc(match1);
			if (ref.simple){
				return string.replace(match1, match1 + " (<acronym title='"+ ref.extend +"'>R:" + ref.simple + "</acronym>)" );
			}else{
				return string.replace(match1, "<acronym title='"+ ref.extend +"'>" + match1 + "</acronym>");
			}
		});
		event.originalTarget.innerHTML = match;
	}
	
	if (userbalance){
		var newAvailable=document.createElement('i');
		newAvailable.setAttribute('class','priceline mybalance');
		// newAvailable.setAttribute('style','float:right;margin-top:-20px;');
		// newAvailable.appendChild(document.createTextNode("xxx"));
		var newHeld = document.createElement('i');
		newHeld.setAttribute('class','priceline mybalance');
		newHeld.setAttribute('style','background: red;');
		
		var userHeld = document.querySelector(".login > .overlay > .held > #userheld");
		userHeld.parentNode.appendChild(newHeld);
		userHeld.setAttribute('style','display: none;');
		userbalance.parentNode.appendChild(newAvailable);
		OnUserBalanceChange();
	
		// userbalance.appendChild(newAvailable);
		userbalance.setAttribute('style','display: none;');
		userbalance.addEventListener('DOMNodeInserted', OnUserBalanceChange, false);
	
		document.querySelector("#chat").addEventListener('DOMNodeInserted', OnChatQueueChange, false);
	}

	
	/*
		ticker
	*/
	
	for (var i = 0; i < ticker.length; i++) {
		var pricetag = ticker[i].querySelector('i');
		var price = pricetag.textContent.replace(/,/g,"").replace("c","");
		var ref = refCalc(price);
		pricetag.innerHTML = pricetag.innerHTML + " <acronym title='"+ ref.extend +"'>" + ref.simple + "</acronym>";
	}
	
	
	/*
		Various pages
	*/
	if(location.pathname == "/credits.php"){
		if (/\?name=/i.test(location.search)){
			var tags = document.querySelectorAll('.item > p > i.priceline');
			for (i=0; i< 2; i++){
				var credits = cleanPrice(tags[i].innerHTML);
				var ref = refCalc(credits);
				tags[i].innerHTML =  tags[i].innerHTML + " <acronym title='"+
					ref.extend + 
					"'>" +	 ref.simple + "r</acronym>";
			}
		}
		
		var tags = document.querySelectorAll("table");
		for (i=2; i< tags.length-1; i++){
			
			var head = tags[i].querySelector("thead > tr > td:nth-child(3)");
			
			var newnode = document.createElement("td");
			newnode.innerHTML = "Ref";
			insertAfter(head, newnode );
			
			
			var col = tags[i].querySelectorAll("tbody > tr > td");
			for (x=1; x < col.length; x=x+2){
				var credits = refCalc(cleanPrice(col[x].innerHTML));
				var newnode = document.createElement("td");
				newnode.innerHTML = credits.simple;
				insertAfter(col[x], newnode );
			}
		}
	}
	
	if(location.pathname == "/item.php" && /\?id=/i.test(location.search)){

		document.title = document.querySelector(".item > h1").innerHTML;
		/*
		function PriceBoxOnChangeValue(event){

			var newPayout = refCalc(cleanPrice(document.querySelector("#newPayout").innerHTML));
			document.querySelector("#newPayoutRef").innerHTML = " "+ newPayout.simple + "r";
			
		}
		
		var ConsignInput = document.querySelector("input[name='new_cost']");
		
		if (ConsignInput){
			ConsignInput.setAttribute('autocomplete','off');
			var currentPrice = document.querySelector("#curCost").value;
			
			var newPayoutRef = document.createElement("span");
			newPayoutRef.id = "newPayoutRef";
			document.querySelector("#newPayout").parentNode.appendChild(newPayoutRef);
			
			
			PriceBoxOnChangeValue({currentTarget: ConsignInput});
			ConsignInput.addEventListener("keyup", PriceBoxOnChangeValue);

		}
		*/
		
		/*
			Standard job
		*/
		function OnItemPriceChange(){
			var textcredits = oldPriceTag.textContent.match(/([0-9]+,[0-9]+,[0-9]+|[0-9]+,[0-9]+|[0-9]+) credits$/)[1];
			var credits = parseInt(cleanPrice(textcredits));
			var ref = refCalc(credits);
					
			if (TotalCredit !== false && TotalCredit < credits){
				oldPriceTag.setAttribute('style','text-decoration:line-through;');
				NewPriceTag.innerHTML = "<span class='reftag'><acronym title='"+ref.extend +"'>"+ ref.simple + "</acronym></span>";
			}else{
				NewPriceTag.innerHTML = "<span class='reftag'><acronym title='"+ref.extend +"'>"+ ref.simple + "</acronym></span>";
			}
		}
		
		var oldPriceTag = document.querySelector('.item > i.pricetag');

		var image = document.querySelector('.itemicon').parentNode;
		if (image.tagName == "SPAN")
			image = image.parentNode;
			
		var qualityColor = image.style.borderTopColor;
		var NewPriceTag = document.createElement('div');
		
		var wrapper = document.createElement('div');
		wrapElement(image,wrapper);
		
		NewPriceTag.setAttribute('class', 'pricetag2');
		NewPriceTag.setAttribute('style', 'border-color: #514336 '+ qualityColor + ' ' + qualityColor +';');
		wrapper.appendChild(NewPriceTag);
		
		oldPriceTag.addEventListener('DOMNodeInserted', OnItemPriceChange, false);
		

		
		
		
		var userNotePriceTags = document.querySelector('.usernote')
		if (userNotePriceTags){
			userNotePriceTags.querySelectorAll('.priceline');
			for (var i = 0; i < userNotePriceTags.length; i++) {
				var price = cleanPrice(userNotePriceTags[i].innerHTML);
				userNotePriceTags[i].innerHTML += " (" + refCalc(price).simple+ ")";
			}
		}
		
		/* private function */
		
		function mySortingA(a,b) {
			a = a[0]+a[1];
			b = b[0]+b[1];
			return a == b ? 0 : (a < b ? -1 : 1)
		}
		function myReserve(e){
			console.log(this.getAttribute("item"));
			unsafeWindow.reserveitem = this.getAttribute("item");
			unsafeWindow.performReserve();
		}
	
		var arr = [];

		var it = document.querySelectorAll(".buybox > p > img");
		for (x=0;x < it.length; x++){
		
			var itemID = it[x].getAttribute("item");
			var FullText = it[x].nextSibling.wholeText
			
			if (it[x].nextElementSibling.tagName == "SPAN"){
				var bot = it[x].nextElementSibling.nextSibling.wholeText.match(/, on (.*)./);
			}else{
				var bot = it[x].nextSibling.wholeText.match(/, on (.*)./);
			
			}
			
			if (!bot){console.log(it[x].nextSibling.wholeText);}else{bot = bot[1];}
			
			var level = it[x].nextSibling.wholeText.match(/, Level ([0-9]*).*/);
			
			if (level){
				level = parseInt(level[1]); //level
			}else{
				level = 0;
			}
			
			var craftN = it[x].nextSibling.wholeText.match(/#([0-9]*)/);
			var craftName = it[x].nextSibling.wholeText.match(/, by (.*?),/);
			
			if (craftN) craftN = craftN[1];
			if (craftName) craftName = craftName[1];
			
			arr.push([
				level,		//0
				"",			//1
				"",			//2
				FullText,
				itemID,
				bot,
				craftN,		//6
				craftName
			]);
			
		}
		// arr.sort(mySortingA);
		arr.sort(function(a, b) {return a[0] - b[0];});
		//arr.reverse();
		var it = document.querySelector(".buybox > p")
		var out = "<table class='list'>";
		out += "<thead><tr><th>Id</th> <th>Level</th> <th>Craft #</th> <th>By</th> <th>Bot</th></tr></thead><tbody>";
		for (x=0;x < arr.length; x++){
			out += "<tr item='"+ arr[x][4] +"'>"+
			"<td>" + arr[x][4] + "</td>"+
			"<td>" + (arr[x][0] ? + arr[x][0] : "") + "</td>"+
			"<td>" + (arr[x][6] ?  "#" + arr[x][6] : "") + "</td>"+
			"<td>" + (arr[x][7] ?  arr[x][7] : "") + "</td>"+
			"<td>" + arr[x][5] + "</td>"+
			"</tr>";
			
		}
		out += "</tbody></table>";
		
		it.innerHTML = "";
		
		var cont = document.createElement("div");
		cont.innerHTML = out;
		insertAfter(it,cont);
		
		var it = document.querySelectorAll(".list > tbody > tr");
		for (x=0;x < it.length; x++){
			it[x].addEventListener('click', myReserve);
		}
		
		
		/* private function end */
	}
	
	if(location.pathname == "/items.php"){
	// if(location.pathname == "/over/items.html"){

		var items = document.querySelectorAll('.search > ul > li');
		for (var i = 0; i < items.length; i++) {
			var pricetag = items[i].querySelector('i');
			var price = pricetag.textContent.replace(/,/g,"").replace("c","");
			var ref = refCalc(price);
			var format_price = pricetag.innerHTML;

			pricetag.innerHTML =  pricetag.innerHTML + " <acronym title='"+
				ref.extend + "'>" + ref.simple + "</acronym>";
			
			/* Private */
			/*
			var link = items[i].querySelector('div > a');
			var id = link.href.match(/\?id=([0-9]+?);/i)[1];
			switch (id) {
				case '5001':
				case '5021':
				case '5002':
					break;
				default:
					link.href = link.href + "&specific=1";
			}
			*/
			/* Private end*/
		}
	}
	
	if(location.pathname == "/allitems.php"){
		function ShowPaintList(e){
			var paint_container = e.currentTarget.querySelector('.paint_container');
			var w = (paint_container.querySelectorAll('span').length * 28);
			paint_container.style.height = "auto";
			paint_container.style.top = (paint_container.clientHeight/-1) + "px";
		}

		function HidePaintList(e){
			var paint_container = e.currentTarget.querySelector('.paint_container');
			paint_container.style.top = "-10px";
			paint_container.style.height = "40px";
		}
		
		var stackdiv = document.createElement('div');
		stackdiv.setAttribute("class","filters");
		stackdiv.innerHTML ='\
		<label>Show only consign <input type="checkbox" id="ConsignOnly"></label></br>';
		
		function filterChanged(e){
			var vintage =document.querySelector('input[name="vintage"]:checked').value;
			var items= document.querySelectorAll(".main > div > div.entry");
			for (var i = 0; i < items.length; i++) {
				if (vintage == "2" && !hasClass(items[i],"qual-3")){
					items[i].style.display = "none";
				}else if (vintage == "1" && hasClass(items[i],"qual-3")){
					items[i].style.display = "none";
				}else{
					items[i].style.display = "block";
				}
			}
		}
		
		
		myInsertBefore(document.getElementById('#filter'),stackdiv);
		
		var filterButtons = document.querySelectorAll(".filters input");
		for (var i = 0; i < filterButtons.length; i++) {
			filterButtons[i].addEventListener('change', filterChanged);
		}
		
		// document.querySelector('input[name="vintage"]:checked').value
		
		
		var ConsignOnly = document.getElementById('ConsignOnly'); 
		ConsignOnly.addEventListener('change', function(e){
				document.querySelector(".allitems").style.display = "none";
				if (ConsignOnly.checked){
					var items= document.querySelectorAll(".main > div > div.entry");
					for (var i = 0; i < items.length; i++) {
						if (!items[i].classList.contains("custom")){
							items[i].style.display = "none";
						}else{
							items[i].style.display = "block";
						}
					}
				}else{
					var items= document.querySelectorAll(".main > div > div.entry");
					for (var i = 0; i < items.length; i++) {
						items[i].style.display = "block";
					}
				}
				document.querySelector(".allitems").style.display = "";
		});
		
		var items= document.querySelectorAll(".main > div > div.entry");
		var dataList = [],itemName,idlist = {};
		
		for (var i = 0; i < items.length; i++) {
			itemName = items[i].querySelector('div > span').innerHTML.toLowerCase();
			var credits = parseInt(items[i].getAttribute('price'));
			var ref = refCalc(credits);
			var pricetag = document.createElement('div');
			pricetag.setAttribute('class', 'gm_pricetag');
			pricetag.innerHTML = "<acronym title='"+ref.extend +"'>"+ ref.simple+"</acronym>";
			items[i].appendChild(pricetag); // children[1].
			
			if (dataList.indexOf(itemName) == -1){
					dataList.push(itemName);
			}
		}
		
		/*
			DataList build
		*/
		
		var items, searchBox,out,obj_datalist;
		searchBox = document.querySelector('#substr');
		searchBox.setAttribute('list','itemNameList');
		
		for (var i = 0; i < dataList.length; i++) {
			out +=  '<option value="' + dataList[i] + '">';
		}
		
		obj_datalist = document.createElement('datalist');
		obj_datalist.setAttribute('id','itemNameList');
		obj_datalist.innerHTML =  out;
		
		document.querySelector('body').appendChild(obj_datalist);
	}
	
	if(location.pathname == "/consign.php"){
	
		var items = document.querySelectorAll('label.entry > .overlay > .pricetag');
		for (var i = 0; i < items.length; i++) {
			var creditPrice = cleanPrice(items[i].innerHTML);
			items[i].innerHTML += " " + refCalc(creditPrice).simple +"r";
		}
	}
	
	if(location.pathname == "/userdetail.php"){
		var price,div;
		var consigns = document.querySelectorAll(".consigns i:not(#consignstate)");
		
		for (var i = 0; i < consigns.length; i++) {
			// log(consigns[i]);
			price = cleanPrice(consigns[i].innerHTML);
			div = document.createElement('i');
			div.className = "consignprice";
			div.innerHTML = "<span class='credits'>" + price + "</span><span class='ref'>"+ refCalc(price).simple +" r</span> ";
			myInsertBefore(consigns[i],div);
			RemoveElement(consigns[i]);
		}
		
		var prices = document.querySelectorAll(".pos, .neg");
		
		for (var i = 0; i < prices.length; i++) {
			price = refCalc(cleanPrice(prices[i].innerHTML));
			prices[i].innerHTML = prices[i].innerHTML + " <acronym>"+ price.simple + "</acronym>";
		}
		
	}
	
	if(location.pathname == "/overstock.php"){
		var button,steamid,backpack;
		

		function getBackpack(){
			document.querySelector("#backpack_filter").innerHTML = "loading...";
			// "http://localhost/over/data.json"
			GM_xmlhttpRequest({	method: 'GET',
			url: 'http://steamcommunity.com/profiles/'+ steamid +'/inventory/json/440/2/?l=english',
			onload: ongetBackpack});
		}
		
		function ongetBackpack(response){
			var data;
			backpack = [];
			data = JSON.parse(response.responseText);
			
			for(var prop in data.rgDescriptions) {
				if (data.rgDescriptions[prop].tradable != 1) continue;
					
				if (data.rgDescriptions[prop].fraudwarnings){
					var name = data.rgDescriptions[prop].fraudwarnings[0]
					name = name.match(/name: "(.*)"/)[1];
				}else{
					var name = data.rgDescriptions[prop].name.trim();
				}
				name = name.replace("The ","");
				name = name.replace(" ()$","");
				backpack.push(name);
			}
			arrayUnique(backpack);
			document.querySelector("#backpack_filter").innerHTML = "Filter with my backpack content";
			applyFilter();
		}
		
		function applyFilter(){
			var rows,name;
			rows = document.querySelectorAll('#over > tbody > tr > th:nth-child(2)');

			for (x=0; x < rows.length; x++){
				name = rows[x].textContent;
				if (backpack.indexOf(name) == -1){
					rows[x].parentNode.style.display = "none";
				}
			}
		}
		
		function bpFilter(){
			document.querySelector("#filter").value = "";
			if (!backpack){
				getBackpack();
			}else{
				applyFilter();
			}			
		}
		
		steamid = document.querySelector(".detail");
		steamid = steamid.title.match("steamid: (.*)")[1];
		
		button = document.createElement("div");
		button.innerHTML = "Filter with my backpack content";
		button.style.cursor = "pointer";
		button.id = "backpack_filter";
		
		button.addEventListener("click", bpFilter);
		insertAfter(document.querySelector("#filter"),button);
		
		var col = document.querySelectorAll("#over > tbody > tr > td:nth-child(3) > i");
		for (x=0; x < col.length; x++){
		// console.log(col[x].innerHTML);
			var credits = refCalc(cleanPrice(col[x].innerHTML));
			col[x].classList.remove("priceline");
			col[x].style.fontFamily = "arial";
			col[x].style.fontSize = "12px";
			col[x].innerHTML = col[x].innerHTML + " - " + credits.simple + "r" ;
		}

	}
});
