// ==UserScript==
// @name        CT Pirate
// @namespace   BJrey CT-Pirate
// @author      bjrey
// @creator		bjrey
// @description	This script will provide you with a few tools that will help you use CT more efficiently .
// @license     GNU General Public License (GPL)
// @date		2013-1-18
// @updated     2013-12-09
// @version		0.44
// @include     http://stat.cashtowns.com/op.php?op=ID_OP_GET_WORLD_MAP*
// @include		http://*.cashtowns.com/*
// @include		http://www.goldentowns.com/*
// @require		http://code.jquery.com/jquery-latest.js
// @compatible  Greasemonkey
// ==/UserScript==

// CSS
GM_addStyle(' .CDTdiv {	background-repeat: no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAvCAYAAAAvgRLNAAAABmJLR0QA/wD/AN113eZ3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QITAwIwTLHiNwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAgAElEQVR42u2cebBtWV3fP7+11t7n3OmN/V7PDa/pbgYBaQGVSdHCEuNAlalUjGXUWKUVK5Xkj2gSU8kfJBqrgompVJnEiUwSE0swQaKACGkEpBmaBoGeu+npzfe9O55z9l7DL3/81j7nvNuvmyb9r/fVrXfP3mv8rd/w/Q3rCM/yo3p5NLt88drUpzeONo6PxbcgghRBvAIOQVAUUaWoA6cIDpA6SkYBQQAH9ROaQAWVgoir7wAUVUWE+mwxDgoqwxNfnycUoM6q8+cF0ULBIaJL7Rdrcgi6NK9otj2I1jVR5x/2UNc+HytDYWkPw5pzXdOw1nDlmmSgh6/0ANUMKjhRVIZ3y+O45ZOhaMapq2Q7uDettHA47cmixOk+3e7ZzfGh6z7t/Pmtdu118eB5yzMZII2YXT7e5/g3Rdq395PNt4Z2FdXMufs/weqRExy/7a2gmTSbIT7gApy+9wNcc/ubaFePgzjQAs5z8cGPcuiGV9KuXWPkLAkR4cIDH2P95B2sHLsOaEAd4h2Tiw+Ruikb172skl8RCexfuJ843eHIi74VSkJVcb5l7/wD7G8+zsk73mrzAohQ+l0uPPQpTrz0rTjf1r0VNEc2H/kEx1/yJlyzipaMOA+l58yXP8TxW19Pu35tZdiMa1Y495U/YuPalzE6dB3iAmhBNbP1+Odp14+wfu03UVKHOI+IY+uJz1FK5sgtr50ziZZCnFxg78KjHDv1RrQkoEVcoaRdzt33fzlx25sIK4fRAr5Z4eJDd+HbhsM3vx7NtiRxiW7rKfYvneboLa+19dSf2dY5di8+yInbv42cwedMacaEsEqcbJJmu3+qOf6rtbX1z8V779lp3/JDaejrr2CCWVrJ/eVvLozu8+34uzV3p5zzWtJUUj/l6S9+iNVjJ8hpj277PCJbSIAvvfdfcsMr3kDu93AhkLsdIHP50Y9z+Wv3srJxhNCOKWkKecbFR79IjpdI3SVG67eS+8to6SndJR766H/k6E13IE7I3S6CUtIuD/7Jr7F+/CSjteNo6UAj3e5pnvzs73Ls5m8ixz2cD5S4hw8Nn/rNn+Hm17ytMl6xuTVy9i/+NyX3oJEwWqOkPTTPuP9PfoOjN7+EPL1Ms7JBibuoFi4+8CEuP34vq0evIYzWKf0uSmay+Ribj96Nk0y7fhRypMQduu2nePST/41rTr0KJ6BpRo77NOMV7v7Pf59rX/JqXGgQhJJ20Dzjkbvew5Hrb6XfP0NYOY7myPbTX+DyY59h9fBJfNOgpUPTHt57Pv5rP8PNr34TfnyIkvbJaULudnjyc+9m5eitkDI5X0J7x9bZL/DF3/tnrGwc4eipN9yKpr9x8YlPvSPcfOpDv/TDP73zzt/+jXIFIxTtVgj+za5Z+8DFhz/Y3v/hf++O3vIqXLsumjPiPd4VNk7cTor7eNei/R4pNfig7J5/lPGRmxFxqBZK6tCS2Dn3NY7c8i1oTpTUk+MMyg57px9ifOgko5UNctpDHMTJHnsXn8CFFcYbJ1GEPNtBizLdegrfrLBy9CbidJfUTVFV+v3L7Jz/Gkdv+RZynJJzpKSOkqbE6TYrx26hxA7NNneOPdtPP8DJl7+NONmi5ETJCSGxd+4RxkduwrkGVUizXUrOTC6fYe2alyDOkeOM0s/Iccbe+UcYb5xgtHEtOc5Isz1KTsTpNnE6Ze2aW0ndvmmDbt+YC1g5eoo0u4QyI3VTALae+hIb178CHxpK3IE8Y//yk6RUWD9xK6k/TymJHJU0u4D4EaP14+Q4Q3NEVZluX2b/3ENce/u3MZtskffPUXo48fLXMLn0GEdu/lb8aN2NDl17YnLpzCvSsdHHfvlXf317bhp0f3uF1dFrcuo/6MLGoe1HP82FB/+YF7355wiN59xXP8z5B+5if/IEWorZcbcCeZ1GPBo8pWScD+QU58zgnJur8NRPEXGEpiVrhpJxoUVzMezhvW2ojqMKJUVA8KEhpx7fjmubgiJ1noyIR7yjxB6cmFV1ntR3tONVSo6GMQAtmdCOSCnNUYuBEiXHGc1oHS2ZkhK+aSgKlGgyI8xNiYjhGQggBYoizqFAST2+GVNyAi24ECgp4oIxmKiiKCVnXONtbUXxzRgoaCmINJQ8wYUxqhnNhVIy4h0OZ2ZQQHNGS8GFiivU41yBWOhc5uRtr+Nlb/lZis4QaRAnKE5L2pd+59wPrRy77iMia1PZ3/1U4/MNr0eaT44O3aBQRNOEQmK6eY7P/dbfwrWBQsY5pQC+8XjvySoIDhcMABWF4AWtwC6r4EUQZ+Asi+BFDYKpzMGSiKCqZIXWCUkV1QqpHJSieCcVTAqpQHCAKKUM4E4pKhRVnIAXRcWB2ppLqWsrOl9nKfYuOEjFpEKk7sNBKkrjhJgVETEeA7JW2Cg2V1+EICCixGx9RaAUIRal9fa/F0XV9hQLOBGEQsn2PHhIWfAOclFQo5UTJamp76KKU9urc0rOxvvGlMZkgpKyQsloCdz0uu/hpm//h/iR4kti68mv0ndn9dgt3yWTrQfePD48+YzspjMb7tL++1ZPvORtVIkpRDYfuIsH3v/PcWMIwVFEwHvUOZrWoVo5UoTgIBbbgNFeEIHGO/LgK4hJaiwQXMXhqnXTgnd2QDELK42SSsXgWgkmSi52oN5DUWg99qxKuxuEG3se/HAgRqyi9tw76rz2i0DjoAy4vzBH7ANTBAfTVBVOPUwEKNbPO0h5mN/2NqzJe6OJVrVkzGvjCMYEWaFxSp/t4ENdL4oxk4OYwQsU1LC46Q9EjSlTWeyXUki5EEohdplAy21v/8ccv/3beOQj/5qdCxe480fexd6FBz/i1jd+WNLuuVv8+sn/evYv3v+ds/2nuOX1P0XslLv/3ffg2kw7Drg20KmjbT0hODJCVmMAnKBFaBros9AGSJURUhbaxjREQVhphP1oUtR4IRVl5KHLdthq0B6tnlrroCvWthTr5zBpaqoUp4LNWWDk6zO1v3M2ZugyVWKhS8ZAXbJ3udjn4SCN8RbM1PrqQFRmM61lcwymxYn1RRYeclFovPUrxf7uUmVCUabRmKGRgZntsK2NTZaLEpwN6esBD5JfqmZrvdKnylRSNUYViJwLxATZmIFOufMnfotm7Qbi5ElG6ydQ3F15tvUTIWp6o+T0nQ9//D368r/yU0IJPP3pXyKXntC0lBAoLtAEjwuOKI7gZK7enQcXhF6hHTtigtBAUWFtBF0WRo2p86kKaysmQbnAKEDC/s8DwYKtHSCJvdMqVVIJXDIUUcQLLVWSvZlxzeAVvFeKF/oCvrExYobxGGYJVlehzzCuarqIjeHUiO4shIA4I25WsYNNShQzBblqBmfKkpQV54UgSipi0iqClAoxxEyRE1gNdqgpQwhqh4wybowBYoaVFmYZGjGz6SpzN16RbFojZ3CNaRYvts+Sjcmkqr7cR3xRiiY+/+s/zlv+0V2wdg2ao8Zu/zvJ6Q2hXT06Fh945ff/vKg4XBN4/OMfwB8K+MZDMI2A80hwtA7ECYYOhFRFonHgnDAOJtlBzAy0IzEbGmA1CFqYS3weNmJWhlAPvR0NoRNjmEGtqykMY6CqCfpo0laqGh+1drBapThUM1K0mhSBtcb6V1xJqMynUn9ZHHCuWmgkCxNQ6vi+zpGBpjUmHKIzTaiqvf7EAqORHXBWCN5MHYDzSk41sOWqJnGKCoyDbTom0yReBvOjNMEYU9T2U0RN2xlYqOEwQRpjcM0ZP244++X/w9FbXwslSWhXwTUrQfwKKBx58SuBMZ99z8/jWo/zjiyOcXBocCR1jIOpxAGxegHUoSijxlUVbAwwDhAqil5phT4LBVP1ToRRYwQZV0nv0yLCpZjqn0abQ9yCyCJG1IFRxIEP0PVV/TuL5Wm1384ZgGoEFCEmpa/mRhS6qIxaoQkmaV1UQhBiFoJXipqlz+iAJhkFO1ABnBcchaJmBktV6cuMHLwxRiq271lU+oqpGimkYlHZ4AzsojBqhFlU03BOaLwhcGNsM5OzLKCF4MyExSSmQUIhZTuX4C2CGvBMO49KolldpeSEloiEEc43OEomd/v0+1NKnrFx062oFrwXnLdon3fCqFFmSfDOVQkzqgcPbXB0WQhecA5aL6TiKAjihKJSVbOw2oodSKneQiWYViny1SZ3FcSVJakNHsYNrI5qW7fQBMEbE8yySahUyUkFvBdEzDw1jdAGYZYqDmnMGwgBplEIjUNEGAXqup15QAxuqQHjIoIP9hlxqCzGzGpzKMLaSCjYYoK3NdicUjGH0XBUQYyrC1dg3AhNY4ePE7yvGKaKjIC56BiN20qTwcMJzsbLaqDeB4fzFtq+/LW7eeCjv825+/8MJ0LYO/15mrUTtBs3kWZ7bJw4xfkQKM60QSx2Gh7j+FjEmKSi2BBMsryzRXbFzEPO1qapdroJQlKpsfy6kep1LMLbdqAx299NGKL0itT2WQwkZcXm9QOBlFyMaFL7hGBqPKnQOhg7ZRphtYWgpi1SsTXkAiutqeM+VUaqktZnA4iDuVEZEDtzdzEvjecqg7YNxCWQ6QXECympHS5CsiC6rdeZy+nFbGeqADkVwVdQ2TgTyMZXwJxNk3RJq2ApSU1rTaK548FbXEdFKM6jObFx4g7CaBXfrKIIIc4yXX+eFdljNL7VfE/njdOccaRrZO4pSIWkzknluGqvxRIdjRP6bJIHFaxVXNGIkIoQGkPZviJpJ9W2JzvcUm2EVske3FGkgk9vRB7SM4PXMW4X7mDKgibDEwL0aqqzDaY12mrDR6GaIAelxhCcZw4Gu2xmLuaKV5wdQF/dt5WmuqSNMVBTkf/QVqleTTYAm7MxnvOmC7U4vDeXsejgNgu5KE7MrV5oNiPM6sjGidUbSaUSylmcZRSUUipY77NphBo7wRsojWmb0dHrOXz9ayndhCDO4XVG3Iqk5iG8czjn8H5xkE2hBoNgFBxRK6dXiWw89GrtgwMfTBUXatBDBafGOLmq7LZ6CouN1JyR2KGMvB1QWxH54NiPmhocEjskLwtAGKv/38jioF09GBFD4YPbVwaJTlXzyCLGQJV0JzAeTOIQP6ig0TldqHcgVbe0VNzSNAYG58EqZy60D4orptgHZsla4yxqOKVUDVpKBZbOYgmpmPYcBTOZqkp2hmUspmZYIhcTnlwU54TijLh9AS8O50esHXspcXKObucMOU5x6ydPsbf5NOKU8/d/BMlTA2TZpN6JaYPBK1CYPw/OpEdFDHw547rgB+Q9qGshBEdSI4hzZmJyReFUFdxU4Ohq8GYUKnaokTrEDnJA93N0XqODwdv/A95wztT62sjG7uvBVKxpDOCN0fq8kGAFxq3trWCmR51pLaltBpPnKqYJvnoSFRgqgwm1/ReEURAKzjQGkCo+kCEuEQxTIaZ9XfVcJqnS3Nm6uup5NM2gwYz+FlE1bCI1xiNuwBKG3QTYn+4xOnw9zcpR0myLPLuMk3bMDXf+EI/++fsZrZ2wtKZIVdtqG6vQvSB0WWiCI3gh4+hLBYQI3gkqQiwO58SAUNUOFph0iBj4DF5ovEOcQzCvJOHIWp9J/XWOjP3inCFgZ+1HwdFnR+MdRRyxOEKwfl02zRaCjZmxzxnHqLHnXXKsNvZ8fbzoj9g8jXeU2g9sXMThvY0j4phlR/D2zHIr1icWhxOhKw4VRxOMVlmF8cj6jNsB2BmTWEDLIZU+itFktTWGaoKZVsXV98KoceQKxhOOTo0Bc7H3IIRgDJO0hvmbNUQV14zmtSAOcZSkvPz7/zYbN36zRfCq7Q9+oeJ9MDsUqkpHFsi4L1LVa80D+OpmNdY/Fvvfu+pG1ShYqFI6SLgfpMotAJfCXJMUhdXG2oQadfTeglK+SsvMajxow8LcDJhgCDmnCjZDqPNXU7A6Ms1QHSJzU8W0iXM1Qjl3Ba3/MM+yifNu0BBGl1DRvvcL7ZCqOeizeSCm7UzqvRfK3ATZOFpjAoNnVtTGyRVQmdc2hL6laimj/dB2CMqJCPubD7N39j5mO2fBeRwImhN5ehmJF0BjzcgNUj1M7CzEK3aofan5hOpCmcQNro9phmk07eAdTKupSepog0n6JDlcTVCIMwm0ELZj3F75TsTezarGSDi8c8SqGWbZMUsmmYhjmlxlQse4cUyiq+bJxo1qmqkJQqljW0WT7W+WHU3jGAX723lH2zhmecHYlnCyOWOxsbKYdkqV+E2lybiRuaCY5jR711QNVir9zAMwL8WYxjSEaVMbo+DMFXSmlcWZ6bUhzZW1/Sxwl7mmdQxNXHz4bpzz7Jz+Cv3eJs6jhPGYbj+hsmYpXTEbVioeQFxFvRZ7zWrSrY4KYGTuhhmOqD63r5rC2aanuaJ/t7ClgwQMc+YqranUJEuVxlAlbogdWAygum6DTXeG8H3FHOItHtBX6QUbx9X35gVJBVdDLMI03eDGDoIgQ+4hmCpfaS3O0lYbP8RLRt6wTVNNYpcrfarHNWpkHq7uixBr8kyrtBcxhhpiE+MaiAqVoZJaUKqta/V+kdsJzhkdy0LyXcUJ3kGsWUtV4UXf/qOce/ALrB1/MX50iJBLwYUWF5TUTeww5xVsFjySqppjhkaEUWv+qqsxgAw1EGKTN26RvXPOsIMUmYdcU1WxpSLzIpZm7qurlmuWcKVdSiw1FjEcYvUeU+MDyh8A3hBjcN7mUTUXT3UR5aPmLijm8rWN+eMxW2Qvaa0SrGBzNPRpasq3MgV6JYPlauLSUqIJUfrh4JN5IYPguCGaiM737sTMRj+ky6tJnSTLLQxxBRVl5KtHhoHyVL2MNtSYQ2W2ogsgWcRMf+4St7zh7Uwu7VtdhKiy+dBHmV0+QxMO4ZA5sUUNX/ululNEiUnpooU6pS4uF8VTfeEh/CpG4D4Vcik4p8RsBR25WHFGrhtWrf4oNW9f/4HSBmUSdZ6Ld9gaxqG2UUWL5eBzUYK3984p3it9VrqkZIa1WZ8uq2X6qg6jWFrcoQSnuErsVJSsNk4uSp8UL8YJqY4dk7UvxdZnB26xf1F73wZlFoUuK21NuzPUZlS3us8690zGAbpYUC2st9T6TV2k5BFy0kUeZp7etgfTaPQWtOIJxRXzZUvpGa+/lPWjJ2nGgaAIk+1NLj52D9fediejtaM1w2ODellUFgtYcsQVGm9+Wl+LNhqv83rblI2wiSEVKwRniZNB10jNImpNBsWaoo21gCFniNUEWdzADtG5IY9vfRwWZArO5jSpM1epVApVrVq1gkUPZ2lI6EDOFiRwYtIVMxRXawp0AVKHegjBUutpXrBia2usDoaYLbhT1LREqFpi2lngSIsFuIaim1TjIqXYIc56tcBUNJyQsjGYqnkWI690RZlF66dqiSdEGTmjgXPKWGBWaobT8pL0KTHZOk8Yr5Bme4SVk4w2biYgyrUvewvHT92JuIbJhQdRLfTRIlhaCpKLuUAOuqyMvKOLGaIwbmvoWIWcoFAIzlGKMq7uTqxRsrapSaNkUTZRK4hvEPZjzSbWgxzKt/pkCHkUCm2tFhqiZ7k4uqw1umdaarUV+qSMgtL1i8yk1JqBUc2Aulq1ZEEbxTksLNvVAE7WeXq8rYdSKlO5WgSCmvYYmGDaW8Bp7LXWVjA3Ca0HL4WcDTfFWKxYpRRKqZVVwQSg9TVYlBdhbid28H6J6VqUnO13KHxxNUUrAx4o4NQqcHIq5OLYeuzLuDf9BO0aqI7Nw9BotYTeN+ACcTKhZKEh03WZprqPWRVfgUbsFYeFn2M/VMXUej1ApCDODtdiBpCzIxWZAz7jdq2xCUvzpr6CuGF8qfl4B7FfxPlLgRyhDYUWmM3qASnMOmvXZRg5I2wqNc4PdJ0dzsgJ+52axiqmnWbJNFqoGCDGavbyAptodXeHUPasmLYoRSlZaL1FGX1dT9eZ2u6S5RSCU3I085drxrWRTFEhxqpJqyYL2HwxW/qZbIBP0HltRs610MeZ1uh707A5mSb3WogxE/tMSlbH8PofexeXH78H0cLhF7+OlCaE6e6FmW9GNKM1VRfk2lf+AI9++FfJsSG4RIlW6KHArLpkoTEAknLNQjpDv8Ev3B9XKV8q0vXO1KFzDhUjihHJDiNRU7AVgKpCX2v8+ho2ThUYDXmAnBaHM4S8QzUdvUL2xjRtzRU0HmaxhmeDQIJc09SpCOPG2vUD8nYQlyS7YGFfVyuIUjGNtjuznIAqdEO9wABWhyhmNVWTZBqjy2ZOY7axWmeJslL32KV6uNUMpmr/Q8URvoa5U6JmF2tbUUqlSymgKaN9Mq7uEje+7nspMVHKBe77o3fzpp/978S9C8hk86Fb/PjIfxHKW7u9CzSrNxP3T/Ol9/wsOipIYzHYNhiaDd7qF4OzxA41DdsGFoWoYgwiWN4h1TDzUAM4FJ8OJWFDIcgsDkWpi0JSk2Yr3myquzoHr1UDDfyjc6RuGmc02HWGws9FmdpykclQqyg1CTG4jsEtkk5d9S7m3oI3bBBLxUXF8gSORXp9yH+MA0x7ra7gsB4ze74msWKtKhrqGQN24POyuWxAdnDOB7o5NSbxVUOIGuf0yQC05IzkROoLEhte+zMfIIzgic++m/HaTRw79Qb2Lz36Dombj41T0/69duXwL9/zuz/nDp04wUve9g/YfPgzPPInvwLSoaHGB8RcwSEB5ZxJaRAo4uaulTiZJ6RKrVd0Ar4WqgwOyGBzh8LNVMz1TBWgDZ6HLFUPa00aVaxqALLy44C8i9rz1i9qFdJS9ZCwiEmkWv+oLA4tL1VRlTlg1XkR7TxDWvdmjGp00Joyz/Wwh/lR8xZ8LegZKqGp1duhVhTFbFqB6jMJ9m4Ard4tPB/HclGszunkgJgMcedcTENk4Y63/wLH7vgOHI3d7gImFx75WHH8dQHY3X76xnHYeOrSEx/TdnSdHLn5FWQXyJ3wxKd+kQtfuRucuTF4T/CBMq8mkpq7r7kGhmITmYeqsxoDLJeNWXLJtIZV8Uo9OH3GPbxYQdNQPTyUeAW3eFdT+BZgqmHjIcE0lHwPvvWQZRziAYMLLBhjzzOMQyjaG2FDNXfz7GUZqooGYtgfWaXeuRy0lzGEFzvooUSO6jYPatwEYzAHFQtgYFvEpN1X5hkYcXF/cihnF7JmNA/FnUqaRe78yd9k5di1OAISVgGn3c5pKXn2Zvy5zxhTTnXcxbOvGW1c92GFDaGgRVGNUBpc4/ns7/w8h265nfXjNzNuaoTGLW7M7e1usr521CTC+bowXVScwJXP67PhvqI4R7NymJJ64nS7cqzUOw9l0b72EefQAW0NteE1RDxvP/iMgPiAlrxYTxWf4TLOlePXyzPUyNAwzlCtQkVxV9wirZeCS7piHNT2Np97eY7Q2C0su7I6p4OVw1cbpFaZK95TYjenCapzqZ63xTSPNFaRk3OkHa2zcd1ryKnw+Cd+hRN3fB+Hb/12StrdTUm/r+xN7lk9cf00AMiKzFTzF1XTXy15+l4fNtbFIY9/6j+wft1thHAdr/+xd1HyjDSd0KxuIK7hwgMfBjzHbn0jR+vlUBdGnPnSH7B+8qWsXXMriLfaOBwXHvpTxhvXs3Hjy6A4oEGcMrn4EJPLT7F28qWIVAZwnsnmQ+ycfZCTL//eKnAFcYHppce59Njd3PCadyCumev8kvd58rPv48Y730EYbcyJJC5w5t73cs0d30WzeqzeVgpo6Xj6C/+LYy/6Flavub2CjoRrVjj9hd9n9fiL2bj+FfXiq6Ka2X7yC6gmjt36XZQ0rZdQle0n72G6fZZrv+nt9cKNHWaeXeb8g3/G9a/6gcpM43rxdYczX/xjrrntTYwOX48WxYUVNh/5M3K/xYmXfS+aPeIzeXaZp77wh9zw6u+nWT2CFsE3Y05/8Q8YrR/l2KnvQIc7Fa5n/+wDzHY3OX7qzagWUtwlTi6xfeE8h190TgX2xTV/DZfuWT1x/ZSl++iI+KmIfkKkfXu3c1oAxus3c/8H/1MVnhlxNiGMN+h2n2Ln6c/ytT//n7SrY+Le03TbjxOnF9h88EOcv//j5G6TODlPv/cUaXaR3XMPs33mAfYvPUC/F+n3zhMnZ+j3nuLhu36DdmVMt/0Es+0nSNNN0uwiX3rfL9I0nrh/jjTbJHdbdDtP8NTn/werR0+wd+4rxOlF+r2zlLTL3e/+u1xz6tVMLz1KnJwn7p8j91uc/dLvM90+w/6F+0iTi7au3ad5/DPvJbQtk82HSNPz9HtPk7otLtz3fjYf/TTolDS5QNw7S5xeIO6f44nPvY84uUC/+zh5dpl+9ylmW1/jic/+HquHj9FdfoS4d5Z+90mcRD756z/N+rGTzLYeJfe7xMmTxL0znPnSRxHx7J65lzTbIU632TlzL5sPfxwvnm7rceL0adL+eb78h/+Woze+nP3zX6Hfv0yabXHuq3/E/vmHkZLpd54iTp4m7j+F9hM+8zv/FO8zOe6SphcQzTpav4Y7f+RdHHvRd8ts5/Tb+zz6+Hi0Mb3qbeh3vvNfpHf+k79zse8mH4x7Wy9ePXnbqVNv+DFGR24ADVAy/d4Z+skWlEyKM0oqtGvHyKkndxNUC93eZVaO3oxqJsf6PG8xvXSG8fpxmtEKud8BycTZhG7nAqnvWTl8PSVn4vQyOUZKnlhFzsYJ4mSHONsjp0iOM3bPPcbRm15DnG2TY0fuJvi2YbL5JOOjN1FiR44TuyxbCvubT3P0ltfRT7cp/ZScepwU9i48xvjQ9YhrzCxNLqE4+skOvj2Eb0fE6TY59qTZLv1kk2blMM3qcdJs1y6+pp6SZky3L7J28g76ySU0F/rJZZrxmH66y/jQjcTZZUreJXYTBMfOufvYuO5lFrHtttDc0e1dpJtNWD9xO3Fymth3+NCwc+4B1k/cZp7U7BJoYbp9GqSlXT9K6i+QYkfqE1r2CKONev8yghZxYfWu6aXHHj6C1VoAAAX1SURBVIqTcz/p2yP3rKwdmj7n9yMAdHt3N6Vcd+T0vX96Xinm35fFF0IICu0q4kf1KpsBJ3uXkThZ2Kxle4mgroWhX0XDQ01uTj3a7eKcpVYBSrZLoW7teIWhFnEcxlQc0m8jUg5CEruE2qzhmnG11dU2D+/i3pwIQ0HtYNdp18A1aBnwRt27KJo7iDO7yDq/n2g3ZDRs1LmzgVDvLBCmgqSdOVZwg4s1r9pdpUhTTZmbr9ORoN9fmD8t83ciAu2hWrSgC5eo0k3ytEbAEte95DtONWtsanp8Njr+PV//izKWf8599YN68tSrmO1tce7SjPHhGzl06DBNE+Y3nYfYQam3pJ1zlFLqZt2cUYaLrqUUvFVhzp8tqph13t7i/IvxF/wk83fL7ZffL7dZ7p9zrtVGUEqZtx1+h+fD2g+u8eB8y2sY2i3vcxjnYLsrv5hEn7GvgYbLfZbHWV7fwTV2Xcfe3h5jt8/6GM6dv0i/9TS33PmO5zzr8FwvS74SGbt5yZmfL3jYjPd+vqDlRS4TcVh0jLEWyPoriHY1Ii2PtTzO8twHGeFq/6sqISy2e7D/QSZMKeFqIW/O+VnXt3z4ywcyMPvcBnv/jH0O+xsEaXmvQ/+D9HPOkVKaM/LANMPnUjWYLH/5T8p8vZ/nZATzhRcj6gGf9WpEefax5BlMsyw1w2aWtcjw90GpfLY1LB/oQUl9rj4HGefgAR3UUsuCcJCBDmqjuVBdhQkOzv/19rRMl4NzDTTMOT9jHO/kBTLCUpxgcP0NLpQrTMDzMQ0HCbm8oUECrmYaDqrj52Mano34z2UaDhJ9aLe8xuX5ns38HJz7oGl4htZdWuNzmYaD8y1rnGXmbZqGrusW8INaIfZCGOEvTcNfmoYF0F8yDWVJEg9KwvJCnk01D+1DCFc8Hw7o4KaXibGsipfnuxqTXO3z1UDp1TTQQS1xkMmfjRkPgr6D67uauVj+vKyhrra35T4HwbaI0DQWWEvJbvMsb9c3QV4QIwyDOXEEH56BiA8S76C6Xd780C7nPOf+gZAppatiiWUvYFDtz2Vnr0bwgwd0NU/gYNuc8xX7GPZ7cI0HTeAyA1xtjqt5RFfDEgcZ8eD6ls3GIBzDs1y/U2mIEClCjumFaQRXv3khhKDjETKLkb7v5yVcoM841Gdzr5alvJRCSukq7uMQbrDKnWG8ZbteBgm9AkcsqnYPahatL32tmvLeXZXwB03RsmbTg352jfUva4ZlnHRwzQfHvlITaL19fjXTKvYFWlfsy0rbF3O5eRtVJcZIHyNjpwMdxXu/+cI0ggVuivPeOa9M96Y1vWyXEecBppqTKVrmd/iG3DpD+rluYvEdQ6V+7Ywld3RpY9RU9nJ2bSHJV+aAdPlrTvUq/nnNcB5kzOEiz9w8zAdblmZdBKBUa3KKeguLK74rx75pbpFNvap5haWE0jIuqTfD63cjLfayTLOBG5fnWDJtFdOlFOlmHWuNlVV3fY+gF18QIzSj8R+C/qAWZX3FMx45xGX7ytilL8hafH3us2CNpRqEKykzz9/WAublrOAzg5NX9F1qu/hbF9HFq3gRqC5l+bV+hTBXFHrI1U9vKWu6iE4uM58uRyevZmOfsY7lLT0bDa/URcKVDHFgEssYi8JGS+uVy1tbXL68jS/lF14QI6TY/Zudi2d+UP1IVYuM2pZm1OKbsHRSyjf2o9/g5+fbVp9nn+Vn30if/981vpA+z3u8JYlCYtdzaXOb02cvaO73ZX0sD7wgRshF7p5OJ38+mW2/YdKlqv48TvxQQyVXynvhihKkZ3VBngWVLm9ruGHyTLXwzFqAoZO4Z9FH5dnp+WzrGoImV3v/XH2+niY7uGblG+tzNVrZt4goIFbA2rG/t4/LE+mSvMszeuSFgcUym+l08qN5pod2Jj6Tu/HJjfDb0m9/88Fk1DeciHqOJJQg5P7rJ6CeT/Lp+SSenjPplBdJp+eTcHreyabnlWh6fkmmkmqCqaQtKKtNce/75OPNz333qdnJZsx9d7z1x7uvxwj/D3J8AkdrQGCnAAAAAElFTkSuQmCC); margin:0px; width: 130px; height: 47px; position: fixed; right:90px; top:0px; font-family: Arial, Verdana, "SF Sans Serif"; font-weight:bold; z-index:6; cursor:default; }'+
' #timer { width:130px; position:relative; top:2px; left:3px; text-align: center; font-size: 24px; color: #c00013; vertical-align:bottom; }'+
' #control { width:130px; position:relative; top:5px; text-align: center; } '+
' .fontlarge { font-size: 24px; } '+
' .fontlarge_r { font-size: 24px; color: #FF0000; } '+
' .fontlarge_g { font-size: 24px; color: #004903; } '+
' .fontlarge_o { font-size: 24px; color: #FF6600; } '+
' .fontlarge_y { font-size: 24px; color: #FFFF00; } '+
' .fontsmall { font-size: 10px; } '+
' .fontsmall_r { font-size: 10px; color: #FF0000; } '+
' .fontsmall_g { font-size: 10px; color: #004903; } '+
' .fontsmall_o { font-size: 10px; color: #FF6600; } '+
' .fontsmall_y { font-size: 10px; color: #FFFF00; } '+
' .fontcontrol { font-size: 9px; color: #613900; } '+
' .fontcontrol span:hover { cursor:pointer; color: #004903; } '+
' .timer_h:hover { cursor:pointer; color:#004903; } '+
' .timer_m:hover { cursor:pointer; color:#004903; } '+
' .timer_s:hover { cursor:pointer; color:#004903; } '+
' .timer_h:active { color:#0066CC; } '+
' .timer_m:active { color:#0066CC; } '+
' .timer_s:active { color:#0066CC; } '+
' .war-timer-class { font-size: 24px; float:right; osition: relative; width:12px; height:12px; top: -6px; right: 9px; } '+
' .wt-inactive { color:#909090; } '+
' .wt-inactive:hover { color:#6699CC; } '+
' .wt-inactive:active { color:#003399; } '+
' .wt-active { color:#FF6666; cursor:pointer; } '+
' .wt-active:hover { color:#FF9999; } '+
' .wt-active:active { color:#CC3333; } '+
' .wt-engadged { color:#66CC99; } '+
' .wt-engadged:hover { color:#99FFCC; } '+
' .wt-engadged:active { color:#339966; } '+
' .BTdiv { position: fixed; right:5px; top:0px; } '+
' .TSBdiv { position: fixed; right:50px; top:0px; } '+
' .alignit {  position:relative; left:3%; } '+
' .alignitless {  position:relative; left:2%; } '+
' #main_tb_low_td, #bottom_td, #main_tb_td { 	background-repeat: no-repeat; } '+
' #main_tb_td { 	background-repeat: repeat-y; } '+
' table.tablesorter tbody span.red { background-color: #FE8080; } '+
' table.tablesorter tbody span.green { background-color: #80FE80;} '+
' table.tablesorter td { white-space: nowrap; } '+
' .highlight { background-color: #99FFFF !important; } '+
' .fillin td { background-color: #FFF; } '+
' table.tablesorter { font-family:arial; border-top: 1px solid #CDCDCD; border-left: 1px solid #CDCDCD; margin:10px 0pt 15px; font-size: 8pt; text-align: left; } '+
' table.tablesorter thead tr td, table.tablesorter tfoot tr td { background-color: #e6EEEE; border-right: 1px solid #CDCDCD; border-bottom: 1px solid #CDCDCD; font-size: 8pt; padding: 1px; } '+
' table.tablesorter thead tr td { background-repeat: no-repeat; background-position: center right; cursor: pointer; } '+
' table.tablesorter tbody td { color: #3D3D3D; vertical-align: top; border-right: 1px solid #cccccc; border-bottom: 1px solid #cccccc; padding: 1px; } '+
' table.tablesorter tbody tr.even td { background-color: #FFF; } '+
' table.tablesorter tbody tr.odd td { background-color:#F0F0F6; } '+
' table.tablesorter thead tr .sorttable_sorted_reverse, table.tablesorter thead tr .sorttable_sorted { background-color: #8dbdd8; } '+
' table.tablesorter thead tr .sorttable_sorted { background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7); } '+
' table.tablesorter thead tr .sorttable_sorted_reverse { background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7); } '+
' .popup_layer { height:185% !important; } '+
' #div_popup_back table { border-collapse:collapse; } '+
' .popup { margin: -10px 0 0 -250px; top:5% !important; left:50% !important; } ');

// Params array
var params = new Array();
function qs() {
   var query = window.location.search.substring(1);
   var parms = query.split('&');
   
   for (var i=0; i<parms.length; i++) 
   {
      var pos = parms[i].indexOf('=');
      if (pos > 0) 
	  {
         var key = parms[i].substring(0,pos);
         var val = parms[i].substring(pos+1);
         params[key] = val;
      }
   }
};


// Get Now - Timestamp (UTC time in secs from 01/01/1970 00:00:00 UTC )
var set_now_time_stamp = new Date(), now_time_stamp = Math.round(set_now_time_stamp.getTime()/1000);

// Get worldmap stats function
function make_world_map_stats_table(appendToThis, newtableID, newtableClass){

// Coding for ID_OP_GET_WORD_MAP

// XML elm Name Tag Array
var ddht = ['country', 'code', 'name', 'id_gen_towns', 'id_gen_total_cit', 'id_gen_avg_pop', 'id_gen_avg_level', 'id_gen_avg_gold_sold', 'id_gen_avg_accom', 'id_gen_avg_stock_cap', 'id_gen_avg_happiness', 'id_price_veg', 'id_price_meat', 'id_price_iron', 'id_price_stone', 'id_price_clay', 'id_price_wood', 'id_gf_share_price', 'id_gf_sold_shares', 'id_gf_fund_sold', 'id_gf_interest', 'id_gf_splits', 'id_gf_shareholders', 'id_stock_legume', 'id_stock_carne', 'id_stock_fier', 'id_stock_lut', 'id_stock_lemn', 'id_stock_piatra', 'id_stock_aur', 'occupied'];

// If not on default URL, use ajax to get results.
if(document.location.href.indexOf('ID_OP_GET_WORLD_MAP') == -1){ // run 1st if not on ID_OP_GET_WORLD_MAP, 2nd if on it.

// WORK IN PROGRESS
// ajax
$.ajax({type: "GET", url: "http://stat.cashtowns.com/op.php?op=ID_OP_GET_WORLD_MAP&nocache="+now_time_stamp }).done(function(returned_page){
World_Map_Stats_returned_result=$(returned_page);

var DataElm = World_Map_Stats_returned_result.getElementsByTagName("data");
var iAr = DataElm[0].getElementsByTagName(ddht[0]);
}); // end of ajax
// suggest using different class names, so the CSS doesn't crossmatch between different styles
$(appendToThis).append('<table cellspacing="0" cellpadding="0" border="0" id="'+newtableID+'" class="'+newtableClass+' sortable"><thead>'+
'<tr><td>ID</td><td>Code</td><td>Ctry Name</td><td>Towns</td><td>Cit.</td><td>Avg Cit. / Cty</td><td>Avg Lvl</td><td>Avg Gold Sold</td><td>Avg Accom</td><td>Avg Stk Cap.</td><td>Avg Happy.</td><td>Prc Veg.</td><td>Prc Meat</td><td>Prc Iron</td><td>Prc Wood</td><td>Prc Stone</td><td>Prc Clay</td><td>Veg. Stk</td><td>Meat Stk</td><td>Iron Stk</td><td>Wood Stk</td><td>Stone Stk</td><td>Clay Stk</td><td>Gold Stk</td><td>GF Share Prc</td><td>GF Sold Shares</td><td>GF Fund Sold</td><td>GF Interest</td><td>GF Splits</td><td>GF Shareholders</td><td>Occ. By</td></tr>'+
'</thead><tbody id="main-table-tbody"></tbody></table>');
$('#stats_table').hide();

// WORK IN PROGRESS

}else{
$('body').prepend('<table cellspacing="0" cellpadding="0" border="0" id="stats_table" class="tablesorter sortable"><thead>'+
'<tr><td>ID</td><td>Code</td><td>Ctry Name</td><td>Towns</td><td>Cit.</td><td>Avg Cit. / Cty</td><td>Avg Lvl</td><td>Avg Gold Sold</td><td>Avg Accom</td><td>Avg Stk Cap.</td><td>Avg Happy.</td><td>Prc Veg.</td><td>Prc Meat</td><td>Prc Iron</td><td>Prc Wood</td><td>Prc Stone</td><td>Prc Clay</td><td class="sorttable_nosort">&nbsp;&nbsp;&nbsp;</td><td>Veg. Stk</td><td>Meat Stk</td><td>Iron Stk</td><td>Wood Stk</td><td>Stone Stk</td><td>Clay Stk</td><td>Gold Stk</td><td>GF Share Prc</td><td>GF Sold Shares</td><td>GF Fund Sold</td><td>GF Interest</td><td>GF Splits</td><td>GF Shareholders</td><td>Occ. By</td></tr>'+
'</thead><tbody id="main-table-tbody"></tbody></table>');

var iAr = document.getElementsByTagName(ddht[0]);

}; // end of load results

// Loop through the countries tag
for (var i = 0; i < iAr.length - 10; i++){ 
if(iAr[i].getElementsByTagName(ddht[1])[0].textContent == iAr[i].getElementsByTagName(ddht[30])[0].textContent){
var tdcolor= '<span class="green">'}else{var tdcolor= '<span class="red">'
};

$('#main-table-tbody').append(  "<tr><td title='ID'>"+i+"</td><td title='Code'>"+tdcolor+iAr[i].getElementsByTagName(ddht[1])[0].textContent+"</span></td><td title='Country Name'>"+iAr[i].getElementsByTagName(ddht[2])[0].textContent+"</td><td title='Towns'>"+iAr[i].getElementsByTagName(ddht[3])[0].textContent+"</td><td title='Citizens'>"+iAr[i].getElementsByTagName(ddht[4])[0].textContent+"</td><td title='Average Citizens per Town'>"+iAr[i].getElementsByTagName(ddht[5])[0].textContent+"</td><td title='Average Town Level'>"+iAr[i].getElementsByTagName(ddht[6])[0].textContent+"</td><td title='Average Gold Sold'>"+iAr[i].getElementsByTagName(ddht[7])[0].textContent+"</td><td title='Average Total Housing Capacity'>"+iAr[i].getElementsByTagName(ddht[8])[0].textContent+"</td><td title='Average Stocks Capacity'>"+iAr[i].getElementsByTagName(ddht[9])[0].textContent+"</td><td title='Average Happiness'>"+iAr[i].getElementsByTagName(ddht[10])[0].textContent+"</td><td title='Price of Veggies'>"+iAr[i].getElementsByTagName(ddht[11])[0].textContent+"</td><td title='Price of Meat'>"+iAr[i].getElementsByTagName(ddht[12])[0].textContent+"</td><td title='Price of Iron'>"+iAr[i].getElementsByTagName(ddht[13])[0].textContent+"</td><td title='Price of Wood'>"+iAr[i].getElementsByTagName(ddht[16])[0].textContent+"</td><td title='Price of Stone'>"+iAr[i].getElementsByTagName(ddht[14])[0].textContent+"</td><td title='Price of Clay'>"+iAr[i].getElementsByTagName(ddht[15])[0].textContent+"</td><td></td><td title='Veggy Stocks'>"+iAr[i].getElementsByTagName(ddht[23])[0].textContent+"</td><td title='Meat Stocks'>"+iAr[i].getElementsByTagName(ddht[24])[0].textContent+"</td><td title='Iron Stocks'>"+iAr[i].getElementsByTagName(ddht[25])[0].textContent+"</td><td title='Wood Stocks'>"+iAr[i].getElementsByTagName(ddht[27])[0].textContent+"</td><td title='Stone Stocks'>"+iAr[i].getElementsByTagName(ddht[28])[0].textContent+"</td><td title='Clay Stocks'>"+iAr[i].getElementsByTagName(ddht[26])[0].textContent+"</td><td title='Gold Stocks'>"+iAr[i].getElementsByTagName(ddht[29])[0].textContent+"</td><td title='Game Fund Share Price'>"+iAr[i].getElementsByTagName(ddht[17])[0].textContent+"</td><td title='Game Fund Shares Sold'>"+iAr[i].getElementsByTagName(ddht[18])[0].textContent+"</td><td title='Game Fund Sold'>"+iAr[i].getElementsByTagName(ddht[19])[0].textContent+"</td><td title='Game Fund Interest'>"+iAr[i].getElementsByTagName(ddht[20])[0].textContent+"</td><td title='Game Fund Splits'>"+iAr[i].getElementsByTagName(ddht[21])[0].textContent+"</td><td title='Game Fund Shareholders'>"+iAr[i].getElementsByTagName(ddht[22])[0].textContent+"</td><td title='Country is occupied by'>"+iAr[i].getElementsByTagName(ddht[30])[0].textContent+"</td></tr>" ); 

}; // end of loop


// $('thead').find('td').append('');

$('tbody tr').mouseover(function() {
    $(this).removeClass().addClass('highlight');
}).mouseout(function() {
    $(this).removeClass('highlight');
	$("#main-table-tbody tr:odd").addClass("odd");
	$("#main-table-tbody tr:even").addClass("even");
});

$("#main-table-tbody tr:odd").addClass("odd");
$("#main-table-tbody tr:even").addClass("even");

$('thead td,thead span').click(function(){
setTimeout(function(){
$("#main-table-tbody tr:odd").removeClass().addClass("odd");
$("#main-table-tbody tr:even").removeClass().addClass("even");
},10);
});


if(document.location.href.indexOf('ID_OP_GET_WORLD_MAP') !== -1){ // If on ID_OP_GET_WORLD_MAP, remove clutter after running the script.
// Remove original coding, it is just cluttering up now
$('response').remove();
};

}; // end of make_world_map_stats_table function

function make_town_stats_table(THEURLHERE){

// Timestamp countdown function
function time_left(Time_End, Element_insert, is_worker){
		
	// Create a newDate() object
	var newDate = new Date();
	var tstamp=Math.round(newDate.getTime()/1000);
		
	// Time Difference
	var dif=Time_End-tstamp; 
		
	if (dif>0){
        // Days
		d=Math.floor(dif/86400);
	
		// Hours
		h=Math.floor((dif-d*86400)/3600);
		if (h<10) h="0"+h;
			
		// Minutes
		var m=Math.floor((dif-d*86400-h*3600)/60);
		if (m<10) m="0"+m;
			
		// Seconds
		s=dif-d*86400-h*3600-m*60;
		if (s<10) s="0"+s;
			
		if( (is_worker == "Y") || (is_worker ==  "y") ){
			if(d==1){				$('#'+Element_insert).html('<span class="red">'+d+' Day '+h+':'+m+':'+s+'</span>');
			}else if(d<1){			$('#'+Element_insert).html('<span class="red">'+h+':'+m+':'+s+'</span>');
			}else if(d==2 && h<1){	$('#'+Element_insert).html('<span class="red">'+d+' Days '+h+':'+m+':'+s+'</span>');
			}else{					$('#'+Element_insert).html(d+' Days '+h+':'+m+':'+s);
			};
		}else{		
			if(d==1){				$('#'+Element_insert).html(d+' Day '+h+':'+m+':'+s);
			}else if(d<1 && h>3){			$('#'+Element_insert).html('<span>'+h+':'+m+':'+s+'</span>');
			}else if(d<1 && h<=3){			$('#'+Element_insert).html('<span class="green">'+h+':'+m+':'+s+'</span>');
			}else{					$('#'+Element_insert).html(d+' Days '+h+':'+m+':'+s);
			};
		};
		
	}else{
		if( (is_worker == "Y") || (is_worker ==  "y") ){
			$("#"+Element_insert).text("---");
		}else{
			$("#"+Element_insert).text("00:00:00");
		};
	}
};


// Make holding div and button div
var TnStHlDvElm = document.createElement('div');
TnStHlDvElm.className = "Town_Stats_Div";
TnStHlDvElm.id = 'town_stats_holding_div';
$('body').append(TnStHlDvElm);

var TSBElm = document.createElement('div');
TSBElm.className = "TSBdiv";
TSBElm.id = 'div_ID_TSB';
TSBElm.innerHTML='<button id="TSB_butt_ID">TS</button>';
$('body').append(TSBElm);

$('#town_stats_holding_div').hide();

var tsx=0;
$('#TSB_butt_ID').click(function(){ // Show/hide stats div
    if(tsx==0){ // First Run
        tsx+=2;
        $('#town_stats_holding_div').show();





// Make arrays with XML tags
var ddhtprog = ['progress', 'actual', 'total'];
var ddhttownstats = ['level', 'grave_cap', 'grave_loc', 'resource']; // 7 in resource, with names 'aur' (GOLD), 'carne' (MEAT), 'fier' (IRON), 'legume' (VEGETABLES), 'lemn' (WOOD), 'lut' (CLAY), 'piatra' (STONE)
var ddhtpatch = ['patch','ID', 'x', 'y', 'src', 'bought', 'modified', 'cleaned'];
var ddhtbuilding = ['building', 'ID', 'src', 'status', 'statusID', 'degradation', 'capacitate', 'locatari', 'stoc', 'stoc_prod', 'god', 'level'];
var ddhtprocess = ['process', 'tip', 'begin', 'end', 'real_end'];
var ddhtproduction = ['production', 'ID', 'produs', 'start', 'end', 'status'];
var ddhtemployees = ['employees','employee', 'ID', 'calificare', 'nume', 'ico', 'born', 'die', 'god'];
var ddhtworkers = ['workers', 'worker', 'ID', 'calificare', 'nume', 'ico', 'born', 'god', 'die'];
var ddhtcazati = ['cazati', 'cazat', 'ID', 'calificare', 'nume', 'ico', 'born', 'die'];
var ddhtlicences = ['licences', 'trups', 'trup', 'ID', 'nume', 'atac', 'aparare', 'viteza', 'carne', 'piatra', 'lemn', 'fier'];

// Do an ajax request to get the town stats page

// Get Server ID
var getServerID = window.location.host.split('.'), ServerID = getServerID[0];

var townstats_url = THEURLHERE+now_time_stamp;

// ajax
$.ajax({type: "GET", url: townstats_url }).done(function(returned_page){ // Do stuff with results.
$('#town_stats_holding_div').append('<temp_returned>' + returned_page + '</temp_returned>');
var ts_return_res = document.getElementsByTagName('temp_returned');
// ts_return_res=$(returned_page);

if(getServerID[1] == 'goldentowns'){
var tmp_Veggies = ts_return_res[0].getElementsByTagName(ddhttownstats[3])[3].textContent,
tmp_Meat = ts_return_res[0].getElementsByTagName(ddhttownstats[3])[1].textContent,
tmp_Iron = ts_return_res[0].getElementsByTagName(ddhttownstats[3])[2].textContent,
tmp_Wood = ts_return_res[0].getElementsByTagName(ddhttownstats[3])[4].textContent,
tmp_Stone = ts_return_res[0].getElementsByTagName(ddhttownstats[3])[6].textContent,
tmp_Clay = ts_return_res[0].getElementsByTagName(ddhttownstats[3])[5].textContent,
tmp_storage_total = ts_return_res[0].getElementsByTagName(ddhtprog[0])[0].getElementsByTagName(ddhtprog[2])[0].textContent;
tmp_total = tmp_Veggies*1 + tmp_Meat*1 + tmp_Iron*1 + tmp_Wood*1 + tmp_Stone*1 + tmp_Clay*1,
tmp_percent = Math.round(((tmp_total*1)/(tmp_storage_total*1))*100);
var storage_cap_type = Math.round(tmp_total)+'/'+tmp_storage_total+' - '+tmp_percent+'%';
	
}else if(getServerID[1] == 'cashtowns'){
	var storage_cap_type = ts_return_res[0].getElementsByTagName(ddhtprog[0])[0].getElementsByTagName(ddhtprog[2])[0].textContent/6;
}else{
	var storage_cap_type = ts_return_res[0].getElementsByTagName(ddhtprog[0])[0].getElementsByTagName(ddhtprog[2])[0].textContent/6;
};


// Get Basic Town Stats
// Get time town started by finding the original workers and their birth dates
var tsdis = ts_return_res[0].getElementsByTagName(ddhtemployees[1]);
// Loop through the patch and buildings tag
for (var i = 0; i < tsdis.length; i++){ // Loop through the employee tag
if(tsdis[i].getElementsByTagName(ddhtemployees[8])[0] != null){ // Filter 1, if employee tag does not contain <god></god> skip it.
var getgodmode = tsdis[i].getElementsByTagName(ddhtemployees[8])[0].textContent;
var getgodbirth = tsdis[i].getElementsByTagName(ddhtemployees[6])[0].textContent;
if(getgodmode == "Y"){ // Filter 2, if employee has God Mode = "Y" then stop looping and show results
i=9999999999999;
// Basic Town Stats and stuff
$('#town_stats_holding_div').append('<center><table cellspacing="0" cellpadding="0" border="0" id="progress_table_id" class="tablesorter"><thead>'+
'<tr><td>Town Started on:</td><td>Happiness</td><td>Level</td><td>Experience</td><td>Energy</td><td>Stock Capacity</td><td>Population</td><td>GOLD</td><td>Veggies</td><td>Meat</td><td>Iron</td><td>Wood</td><td>Stone</td><td>Clay</td></tr>'+
'</thead><tbody id="progress-table-tbody"><tr class="fillin"><td>'+(new Date(getgodbirth*1000)).toUTCString()+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhtprog[0])[4].getElementsByTagName(ddhtprog[1])[0].textContent+'/100</td><td>'+ts_return_res[0].getElementsByTagName(ddhttownstats[0])[0].textContent+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhtprog[0])[1].getElementsByTagName(ddhtprog[1])[0].textContent+'/100</td><td>'+ts_return_res[0].getElementsByTagName(ddhtprog[0])[2].getElementsByTagName(ddhtprog[1])[0].textContent+'/100</td><td>'+storage_cap_type+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhtprog[0])[3].getElementsByTagName(ddhtprog[1])[0].textContent+'/'+ts_return_res[0].getElementsByTagName(ddhtprog[0])[3].getElementsByTagName(ddhtprog[2])[0].textContent+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhttownstats[3])[0].textContent+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhttownstats[3])[3].textContent+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhttownstats[3])[1].textContent+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhttownstats[3])[2].textContent+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhttownstats[3])[4].textContent+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhttownstats[3])[6].textContent+'</td><td>'+ts_return_res[0].getElementsByTagName(ddhttownstats[3])[5].textContent+'</td></tr></tbody>'+
'</table></center>'
); // End of Appending
}; // end of Filter 2
}; // end of Filter 1
}; // end of loop and of Get basic Town Stats

// Buildings with Employees (with death time), renovation, Time to end of production, etc...


$('#town_stats_holding_div').append('<center><table cellspacing="0" cellpadding="0" border="0" id="buildings_table_id" class="tablesorter sortable"><thead>'+
'<tr><td>Type</td><td>x,y</td><td>Degradation</td><td>Q</td><td>God</td><td>Status</td><td>Prod. Typ.</td><td>Ending (t)</td><td>Building Status</td><td>Employee ID</td><td>Name</td><td>God</td><td>Dies</td></tr>'+
'</thead><tbody id="buildings-table-tbody"></table></center>'
);
var pats = ts_return_res[0].getElementsByTagName(ddhtpatch[0]);
// Loop through the patch and buildings tag
for (var i = 0; i < pats.length; i++){ 
var srcType = pats[i].getElementsByTagName(ddhtpatch[4])[0].textContent, xspot = pats[i].getElementsByTagName(ddhtpatch[2])[0].textContent, yspot = pats[i].getElementsByTagName(ddhtpatch[3])[0].textContent, patchID = pats[i].getElementsByTagName(ddhtpatch[1])[0].textContent;

if(pats[i].getElementsByTagName(ddhtbuilding[0])[0] != null){ // Filter if building exists then do the following, else set vars to empty

var renovationsstattext = pats[i].getElementsByTagName(ddhtbuilding[5])[0].textContent*1; // Renovation stats
if(renovationsstattext > 80){
var renovationsstat = '<span class="red">'+renovationsstattext+'</span>';
}else{
var renovationsstat = ''+renovationsstattext+'';
};
var qualitystat = pats[i].getElementsByTagName(ddhtbuilding[11])[0].textContent; // Building Level stats
var godstat = pats[i].getElementsByTagName(ddhtbuilding[10])[0].textContent; // Building is God? stats

if(pats[i].getElementsByTagName(ddhtbuilding[3])[0] != null){ // Filter if Building Status is advailable
var buildingStatusstat = pats[i].getElementsByTagName(ddhtbuilding[3])[0].textContent;
}else{
var buildingStatusstat = '';
};

if(pats[i].getElementsByTagName(ddhtproduction[2])[0] != null){
var buildingproducingstat = pats[i].getElementsByTagName(ddhtproduction[0])[0].getElementsByTagName(ddhtproduction[2])[0].textContent; // Building producing type stats
}else{
var buildingproducingstat = '';
};

if(pats[i].getElementsByTagName(ddhtproduction[0])[0] != null){ // Production Status
var pdst = pats[i].getElementsByTagName(ddhtproduction[0]);
if(pdst[0].getElementsByTagName(ddhtproduction[5])[0] != null){
var prodStatusStats = pats[i].getElementsByTagName(ddhtproduction[0])[0].getElementsByTagName(ddhtproduction[5])[0].textContent;
}else{
var prodStatusStats = '';
};
};

}else{
var renovationsstat = '', qualitystat = '', godstat = '', buildingStatusstat = '', buildingproducingstat = '', prodStatusStats = '';
};

$('#buildings-table-tbody').append(
'<tr><td>'+srcType+'</td><td>'+xspot+','+yspot+'</td><td>'+renovationsstat+'</td><td>'+qualitystat+'</td><td>'+godstat+'</td><td>'+buildingStatusstat+'</td><td>'+buildingproducingstat+'</td><td id="'+patchID+'_'+i+'"></td><td>'+prodStatusStats+'</td><td id="EmployeesID_'+i+'"></td><td id="Name_'+i+'"></td><td id="God_'+i+'"></td><td id="Dies_'+i+'"></td></tr>' );

if(pats[i].getElementsByTagName(ddhtproduction[0])[0] != null){
var tst = pats[i].getElementsByTagName(ddhtproduction[0]);
if( tst[0].getElementsByTagName(ddhtproduction[4])[0] != null){
var endingtime = tst[0].getElementsByTagName(ddhtproduction[4])[0].textContent;
setInterval(time_left, 1000, endingtime, patchID+'_'+i)
};
};

if(pats[i].getElementsByTagName(ddhtemployees[1])[0] != null){
var emp = pats[i].getElementsByTagName(ddhtemployees[1]);
// Loop through the employees
for (var tt = 0; tt < emp.length; tt++){

if(emp[tt].getElementsByTagName(ddhtemployees[2])[0] != null){
var employeeIDis = emp[tt].getElementsByTagName(ddhtemployees[2])[0].textContent;
// console.log('Employee '+employeeIDis);
$('#EmployeesID_'+i).append(''+employeeIDis+'<br>');
};

if(emp[tt].getElementsByTagName(ddhtemployees[4])[0] != null){
var employeenameis = emp[tt].getElementsByTagName(ddhtemployees[4])[0].textContent;
$('#Name_'+i).append(''+employeenameis+'<br>');
};

if(emp[tt].getElementsByTagName(ddhtemployees[8])[0] != null){
var employeegodis = emp[tt].getElementsByTagName(ddhtemployees[8])[0].textContent;
$('#God_'+i).append(''+employeegodis+'<br>');
}else{
$('#God_'+i).append('<br>');
};

if(emp[tt].getElementsByTagName(ddhtemployees[7])[0] != null){
var endingtime = emp[tt].getElementsByTagName(ddhtemployees[7])[0].textContent;
$('#Dies_'+i).append('<span id="Dies_'+i+'_'+tt+'"></span><br>');
setInterval(time_left, 1000, endingtime, 'Dies_'+i+'_'+tt, "Y")
};

}; // End of loop
};



$('#buildings-table-tbody tr').mouseover(function() {
    $(this).removeClass().addClass('highlight');
}).mouseout(function() {
    $(this).removeClass('highlight');
	$("#buildings-table-tbody tr:odd").addClass("odd");
	$("#buildings-table-tbody tr:even").addClass("even");
});

$("#buildings-table-tbody tr:odd").addClass("odd");
$("#buildings-table-tbody tr:even").addClass("even");

$('#buildings_table_id thead td,#buildings_table_id thead span').click(function(){
setTimeout(function(){
$("#buildings-table-tbody tr:odd").removeClass().addClass("odd");
$("#buildings-table-tbody tr:even").removeClass().addClass("even");
},10);
});

}; // end of loop

// Make Table Sortable
var newTableObject = document.getElementById('buildings_table_id');
sorttable.makeSortable(newTableObject);

// $('response').attr("id","data");

$('temp_returned').remove();
}); // end of ajax

    }else if(tsx==1){ // second or more runs
	tsx++;
        $('#town_stats_holding_div').show();
	}else if(tsx==2){tsx--; // Hide Stats
        $('#town_stats_holding_div').hide();
    }
}); // End of show/hide stats div

}; // end of make_town_stats_table function

function runBigTown(){
var seElm = document.createElement('div');
seElm.className = "BTdiv";
seElm.id = 'div_ID_BT';
seElm.innerHTML='<button id="BT_butt_ID">BigT</button>';
$('body').append(seElm);
var xy=0,ro=0;

// Show Function
$('#BT_butt_ID').click(function(){
if(xy == 0){
xy++; // Sets it, so restore script is next time button is clicked

if(ro == 0){ro++; // First Run, set ID's to make things faster, and indicate that first run has been done
// Not run yet so set ID's too
// Make bigger tables so more flash can be seen
$('table:eq(0)').attr('id','main_table').attr('width','5100');
$('td[height="78"]').attr('id','bottom_td').attr('align','left');
$('#bottom_td').find('table:eq(0)').addClass('alignitless');
$('#main_table').find('td:eq(0)').attr('id','main_tb_low_td').attr('align','left');
$('#main_tb_low_td').find('table:eq(0)').attr('id','low_table').addClass('alignit');
$('#main_table').find('td:eq(18)').attr('id','main_tb_td').attr('height','1510');
$('#main_tb_td').find('table:eq(0)').attr('id','amain_table').attr('width','5050');
$('#amain_table').find('td:eq(0)').attr('id','flash_td').attr('height','1510').removeAttr('align');
$('#flash_td').find('table:eq(0)').attr('id','title_flash').addClass('alignitless');
$('#fmain').find('embed').attr('height','1500').attr('width','5000');

}else{ // second or more runs
// Already run once
$('#main_table').attr('width','5100');
$('#bottom_td').attr('align','left');
$('#bottom_table').addClass('alignitless');
$('#main_tb_low_td').attr('align','left');
$('#low_table').addClass('alignit');
$('#main_tb_td').attr('height','1510');
$('#amain_table').attr('width','5050');
$('#flash_td').attr('height','1510').removeAttr('align');
$('#title_flash').addClass('alignitless');
$('#fmain').find('embed').attr('height','1500').attr('width','5000');
}; // End of Set BigTown


}else{ // Restore page to default
xy--;
// reset heights and widths
$('#main_table').attr('width','1200');
$('#bottom_td').attr('align','center');
$('#bottom_table').removeClass('alignitless');
$('#main_tb_low_td').attr('align','center');
$('#low_table').removeClass('alignit');
$('#main_tb_td').attr('height','1000');
$('#amain_table').attr('width','950');
$('#flash_td').attr('height','800').attr('align','center');
$('#title_flash').removeClass("alignitless");
$('#fmain').find('embed').attr('height','950').attr('width','950');
};

}); // End of show function

};

function CountDown_T(){
	
	var ms = 0, cms = 0, wtms = 0;
	var running = 0, stopped = 0;
	var t,cd;
	var isTimer=0;
	var wartimeison = 0;

	// Get Server ID
	var TgetServerID = window.location.host.split('.'), TServerID = TgetServerID[0];
	
	// holding div for CountDown.
	var CDTElm = document.createElement('div');
	CDTElm.className = "CDTdiv";
	CDTElm.id = 'div_ID_CDT';
	CDTElm.innerHTML='<div id="timer">'+
	'<span class="fontlarge">'+
	'<span id="hours">00</span>'+
	':<span id="minutes">00</span>'+
	':<span id="seconds">00</span>'+
	'</span>'+
	'<span id="war-timer-id" class="war-timer-class wt-inactive">&#149;</span>'+
	'<span id="millisecs" class="fontsmall">.000</span>'+
	'</div>'+

	'<div id="control">'+
	'<div class="fontcontrol">'+
	'<span id="Reset">RESET</span>'+' / '+'<span id="Pause">PAUSE</span>'+' / '+'<span id="Start">START</span>'+
	'</div>'+
	'</div>';

	$('body').append(CDTElm);
	
	$('#timer #hours').addClass('timer_h');
	$('#timer #minutes').addClass('timer_m');
	$('#timer #seconds').addClass('timer_s');	
	
	// Control buttons
	$('#Reset').click(function(){
	resettimer();
	});
	$('#Pause').click(function(){
	stopcountdown();
	});
	$('#Start').click(function(){
	starttimer();
	});
	// CountDown Clicks
	$('#timer .timer_h').click(function(){
	setTimerh();
	});
	$('#timer .timer_m').click(function(){
	setTimerm();
	});
	$('#timer .timer_s').click(function(){
	setTimers();
	});	
	
	// THE CODE //

	function setTimerh()
	{
		var hours_t='';
		document.onkeypress = function()
		{
			if(running == 0 && stopped == 0)
			{
				evt = window.event;
				var keyPressed = evt.keyCode;
				if(keyPressed == 48 && hours_t.length < 2 ){hours_t+="0";
				}else if(keyPressed == 49 && hours_t.length < 2 ){hours_t+="1";
				}else if(keyPressed == 50 && hours_t.length < 2 ){hours_t+="2";
				}else if(keyPressed == 51 && hours_t.length < 2 ){hours_t+="3";
				}else if(keyPressed == 52 && hours_t.length < 2 ){hours_t+="4";
				}else if(keyPressed == 53 && hours_t.length < 2 ){hours_t+="5";
				}else if(keyPressed == 54 && hours_t.length < 2 ){hours_t+="6";
				}else if(keyPressed == 55 && hours_t.length < 2 ){hours_t+="7";
				}else if(keyPressed == 56 && hours_t.length < 2 ){hours_t+="8";
				}else if(keyPressed == 57 && hours_t.length < 2 ){hours_t+="9";
				}else if(keyPressed == 13 && hours_t.length < 2 ){hours_t="0"+hours_t;
				};
					
				var x = hours_t;
				if(x.length < 2){x="0"+x} else if(x >= 100){x = 99};
				$('#hours').html(x);
				
			}
		}
	};
			
	function setTimerm()
	{
		var mins_t='';
		document.onkeypress = function()
		{
			if(running == 0 && stopped == 0)
			{
				evt = window.event;
				var keyPressed = evt.keyCode;
				if(keyPressed == 48 && mins_t.length < 2 ){mins_t+="0";
				}else if(keyPressed == 49 && mins_t.length < 2 ){mins_t+="1";
				}else if(keyPressed == 50 && mins_t.length < 2 ){mins_t+="2";
				}else if(keyPressed == 51 && mins_t.length < 2 ){mins_t+="3";
				}else if(keyPressed == 52 && mins_t.length < 2 ){mins_t+="4";
				}else if(keyPressed == 53 && mins_t.length < 2 ){mins_t+="5";
				}else if(keyPressed == 54 && mins_t.length < 2 ){mins_t+="6";
				}else if(keyPressed == 55 && mins_t.length < 2 ){mins_t+="7";
				}else if(keyPressed == 56 && mins_t.length < 2 ){mins_t+="8";
				}else if(keyPressed == 57 && mins_t.length < 2 ){mins_t+="9";
				}else if(keyPressed == 13 && mins_t.length < 2 ){mins_t="0"+mins_t;
				};
			
				var x = mins_t;
				if(x.length < 2){x="0"+x}else if(mins_t >= 60){ if(x==60){x="00";}else{x=x-60;}; var y = $('#hours').html(); sy=y*1+1; if(sy < 10){sy = "0"+sy;}else if(sy >= 100){sy="00";}; $('#hours').html(sy); };
				$('#minutes').html(x);
			
			}
		}
	};
			
	function setTimers()
	{
		var secs_t='',tkeyhit=0;
		document.onkeypress = function()
		{
			if(running == 0 && stopped == 0 && tkeyhit < 2)
			{
				evt = window.event;
				tkeyhit++;
				var keyPressed = evt.keyCode;
				if(keyPressed == 48 && secs_t.length < 2 ){secs_t+="0";
				}else if(keyPressed == 49 && secs_t.length < 2 ){secs_t+="1";
				}else if(keyPressed == 50 && secs_t.length < 2 ){secs_t+="2";
				}else if(keyPressed == 51 && secs_t.length < 2 ){secs_t+="3";
				}else if(keyPressed == 52 && secs_t.length < 2 ){secs_t+="4";
				}else if(keyPressed == 53 && secs_t.length < 2 ){secs_t+="5";
				}else if(keyPressed == 54 && secs_t.length < 2 ){secs_t+="6";
				}else if(keyPressed == 55 && secs_t.length < 2 ){secs_t+="7";
				}else if(keyPressed == 56 && secs_t.length < 2 ){secs_t+="8";
				}else if(keyPressed == 57 && secs_t.length < 2 ){secs_t+="9";
				}else if(keyPressed == 13 && secs_t.length < 2 ){secs_t="0"+secs_t;
				};
		
				x = secs_t;
				if(x.length < 2){x="0"+x}else if(secs_t >= 60){ if(x==60){x="00";}else{x=x-60;}; var y = $('#minutes').html(); sy=y*1+1; if(sy < 10){sy = "0"+sy;}else if(sy>=60){ if(sy==60){sy="00";}else{sy=sy-60;}; var hy = $('#hours').html(); hsy=hy*1+1; if(hsy < 10){hsy = "0"+hsy;}else if(hsy>=100){hsy="00";}; $('#hours').html(hsy); }; $('#minutes').html(sy); };
				$('#seconds').html(x);
				
			}
		}
	};
			
	function stopcountdown() 
	{
		//	console.log('Ran Stop Timer');
		if (isTimer == 0 && running == 1){
			running = 0;
			stopped = 1;
			cnow = new Date();
			cms = cthen.getTime() - cnow.getTime();
			
			clearTimeout(cd);
				
		}else if (running == 1){
			running = 0;
			stopped = 1;
		
			now = new Date();
			ms = now.getTime() - then.getTime();
	
			clearTimeout(t);
		}
	};
			
			
	function starttimer()
	{	
		
		var hours_t = document.getElementById("hours"), minutes_t = document.getElementById("minutes"), seconds_t = document.getElementById("seconds"), milliseconds_t = ''+document.getElementById('millisecs').innerHTML+'', milliseconds_t = milliseconds_t.replace(/[\D\s]/g, '');
		if ( (hours_t.innerHTML*1 > 0 || minutes_t.innerHTML*1 > 0 || seconds_t.innerHTML*1 > 0 || milliseconds_t*1 > 0) && isTimer == 0 && running != 1 ){
			running = 1;
			stopped = 0;
			
			if(cms > 0){}else{
			cms = hours_t.innerHTML*3600000 + minutes_t.innerHTML*60000 + seconds_t.innerHTML*1000 + milliseconds_t*1;
			};
					
			cthen = new Date();
			cthen.setTime(cthen.getTime() + cms)
			displayCountDown();
		}else if (running != 1) {	
			isTimer = 1;
			running = 1;
			stopped = 0;
			then = new Date();
			then.setTime(then.getTime() - ms);
		
			displayTimer();
		}
		
	};			
	
	function resettimer() 
	{
		localStorage.clear();
		clearTimeout(t);
		clearTimeout(cd);
		
		wartimeison = 0;
		isTimer = 0;				
		running = 0;
		stopped = 0;
		ms = 0, cms = 0;
		
		$('#war-timer-id').removeClass('wt-active wt-engadged').addClass('wt-inactive');
		$('#timer #hours').addClass('timer_h').html("00");
		$('#timer #minutes').addClass('timer_m').html("00");
		$('#timer #seconds').addClass('timer_s').removeClass('fontlarge_g fontlarge_y fontlarge_o fontlarge').html("00");
		$('#timer #millisecs').removeClass('fontsmall_g fontsmall_y fontsmall_o').html(".000");
	};
	
	function displayCountDown() 
	{
		cnow = new Date();
		cms = cthen.getTime() - cnow.getTime();
		
		if (cms <= 359999999 && cms > 1)
		{
		    var hours = Math.floor(cms / 3600000),
			mins = Math.floor((cms % 3600000) / 60000),
			secs = Math.floor((cms % 60000) / 1000),
			mms = cms % 1000;
				
			if(hours < 10) { var hStr =  "0"+ hours.toString(); }else{ var hStr = hours.toString(); };
			if(mins < 10) { var mStr =  "0" + mins.toString(); }else{ var mStr =  mins.toString(); };
			if(secs < 10) { var sStr = "0" + secs.toString(); }else{ var sStr = secs.toString(); }
			if(mms < 10) { var msStr =  "00" + mms.toString(); }else if(mms < 100) { var msStr =  "0" + mms.toString(); }else{ var msStr =  mms.toString(); };
	
			if(hStr <1 && mStr <1 && sStr <= 20){ var secClass = "fontlarge_g", mmClass = "fontsmall_g";
			}else if(hStr <1 && mStr <1 && (sStr > 20 && sStr <=40) ){ var secClass = "fontlarge_y", mmClass = "fontsmall_y";
			}else if(hStr <1 && mStr <1 && (sStr > 40 && sStr <=60) ){ var secClass = "fontlarge_o", mmClass = "fontsmall_o";
			}else{ var secClass = "fontlarge", mmClass = "fontsmall";
			};
			$('#timer #hours').removeClass().html(hStr);
			$('#timer #minutes').removeClass().html(mStr);
			$('#timer #seconds').removeClass().addClass(secClass).html(sStr);
			$('#timer #millisecs').removeClass().addClass('fontsmall '+mmClass).html("."+msStr);
		}else if( cms <= 1)
		{
			$('#timer #hours').addClass('timer_h').html("00");
			$('#timer #minutes').addClass('timer_m').html("00");
			$('#timer #seconds').addClass('timer_s').removeClass('fontlarge_g fontlarge_y fontlarge_o fontlarge').html("00");
			$('#timer #millisecs').removeClass('fontsmall_g fontsmall_y fontsmall_o').html(".000");
				running = 0;
		}else if( cms > 359999999)
		{
			$('#timer #hours').addClass('timer_h').html("00");
			$('#timer #minutes').addClass('timer_m').removeClass('fontlarge_g fontlarge_y fontlarge_o fontlarge').html("00");
			$('#timer #seconds').addClass('timer_s').html("00");
			$('#timer #millisecs').removeClass('fontsmall_g fontsmall_y fontsmall_o').html(".000");
				running = 0;
		}
				
				
		if (running == 1)  
		{	
			cd = setTimeout(displayCountDown, 10);
		}
			
	};
	
	function displayTimer() 
	{
		now = new Date();
		ms = now.getTime() - then.getTime();
		
		if (ms <= 359999999)
		{
			var hours = Math.floor(ms / 3600000),
			mins = Math.floor((ms % 3600000) / 60000),
			secs = Math.floor((ms % 60000) / 1000),
			mms = ms % 1000;
			
			if(hours < 10) { var hStr =  "0"+ hours.toString(); }else{ var hStr = hours.toString(); };
			if(mins < 10) { var mStr =  "0" + mins.toString(); }else{ var mStr =  mins.toString(); };
			if(secs < 10) { var sStr = "0" + secs.toString(); }else{ var sStr = secs.toString(); }
			if(mms < 10) { var msStr =  "00" + mms.toString(); }else if(mms < 100) { var msStr =  "0" + mms.toString(); }else{ var msStr =  mms.toString(); };
	
			$('#timer #hours').removeClass('timer_h').html(hStr);
			$('#timer #minutes').removeClass('timer_m').html(mStr);
			$('#timer #seconds').removeClass('timer_s').html(sStr);
			$('#timer #millisecs').html("."+msStr);
		}
		else
		{
			$('#timer #hours').html("99");
			$('#timer #minutes').html("59");
			$('#timer #seconds').html("59");
			$('#timer #millisecs').html(".999");
			running = 0;
		}
			
			
		if (running == 1)  
		{	
		t = setTimeout(displayTimer, 10);
	   	}
				
	};

	// END OF THE CODE
	
	// IF page changes while running or paused, save data //
	
	window.onunload = function() { // onbeforeunload || onunload
		saveFormData();
		return null;
	};
	
	function saveFormData() {
		if( running == 1 || (running == 0 && stopped == 1) ){
			clearTimeout(t);
			clearTimeout(cd);
			// save settings
			var s_hours_t = $('#hours').text(), s_minutes_t = $('#minutes').text(), s_seconds_t = $('#seconds').text(), s_millasec = $('#millisecs').text().replace(/[\D\s]/g, '');
			r_ms = s_hours_t*3600000 + s_minutes_t*60000 + s_seconds_t*1000 + s_millasec*1;
			s_now = new Date();
			var Current_TimeStamp = s_now.setTime(s_now.getTime());
			var CD_endTime = Current_TimeStamp*1+r_ms*1, CD_startTime = Current_TimeStamp*1-r_ms*1;
			if(isTimer == 1){
				localStorage.setItem(TgetServerID+'_store_CD_startTime', CD_startTime);
				localStorage.setItem(TgetServerID+'_store_isTimer', 1);
			}else{
				localStorage.setItem(TgetServerID+'_store_CD_endTime', CD_endTime);
				localStorage.setItem(TgetServerID+'_store_isTimer', 0);
			};
			
			// set 	// GM_setValue(); // Greasemonky // http://wiki.greasespot.net/GM_setValue
			localStorage.setItem(TgetServerID+'_store_hours', s_hours_t);
			localStorage.setItem(TgetServerID+'_store_minutes', s_minutes_t);
			localStorage.setItem(TgetServerID+'_store_seconds', s_seconds_t);
			localStorage.setItem(TgetServerID+'_store_millasec', s_millasec);
			localStorage.setItem(TgetServerID+'_store_timein_ms', r_ms);
			localStorage.setItem(TgetServerID+'_store_now_time', Current_TimeStamp);
			localStorage.setItem(TgetServerID+'_store_warTimeison', wartimeison);
			
			localStorage.setItem(TgetServerID+'_Timer_going', 1);
			if(stopped == 1){
				localStorage.setItem(TgetServerID+'_store_timer_stopped', 1);
			}else{
				localStorage.setItem(TgetServerID+'_store_timer_stopped', 0);
			};
			console.log('saved');
		}else{
		localStorage.clear();
		};
	};
	// End of Save Data //
	
	// var obj = {foo: TgetServerID+'bar'};

	// set
	// localStorage.setItem('testObject', JSON.stringify(obj));
	
	// get
	// var get = localStorage.getItem(TgetServerID+'testObject'); // if its an object use JSON.parse(get) to extract the object
	
	if(localStorage.getItem(TgetServerID+'_Timer_going') === null){ // Do nothing
		// localStorage.setItem(TgetServerID+'_Timer_going', 0); // if it's an object, strinify using JSON.stringify(obj)
		// get
		// var get = localStorage.getItem(TgetServerID+'_Timer_going');
		// console.log(get);
	}else{ // get values of other stored items and run countdowns
		// get
		// var get = localStorage.getItem(TgetServerID+'_Timer_going');
		// console.log(get);

		// stored_timein_ms = localStorage.getItem(TgetServerID+'_store_timein_ms');
		
		/*
		s_then = new Date();
		var Then_TimeStamp = s_then.setTime(s_then.getTime());
		stored_now_time = localStorage.getItem(TgetServerID+'_store_now_time');
		var TimeStamp_dif = Then_TimeStamp*1 - stored_now_time*1;
		// console.log('Page took '+TimeStamp_dif+'ms to load'); // page load time
		*/
		
		isTimer = localStorage.getItem(TgetServerID+'_store_isTimer');
		stopped = localStorage.getItem(TgetServerID+'_store_timer_stopped');
		if(stopped == 1){
			stored_hours = localStorage.getItem(TgetServerID+'_store_hours');
			stored_minutes = localStorage.getItem(TgetServerID+'_store_minutes');
			stored_seconds = localStorage.getItem(TgetServerID+'_store_seconds');
			stored_millasec = localStorage.getItem(TgetServerID+'_store_millasec');
			$('#hours').html(stored_hours);
			$('#minutes').html(stored_minutes);
			$('#seconds').html(stored_seconds);
			$('#millisecs').html('.'+stored_millasec);

			if(isTimer ==1){
			}else{
				if(stored_hours <1 && stored_minutes <1 && stored_seconds <= 20){ var secClass = "fontlarge_g", mmClass = "fontsmall_g";
				}else if(stored_hours <1 && stored_minutes <1 && (stored_seconds > 20 && stored_seconds <=40) ){ var secClass = "fontlarge_y", mmClass = "fontsmall_y";
				}else if(stored_hours <1 && stored_minutes <1 && (stored_seconds > 40 && stored_seconds <=60) ){ var secClass = "fontlarge_o", mmClass = "fontsmall_o";
				}else{ var secClass = "fontlarge", mmClass = "fontsmall";
				};
				$('#timer #hours').removeClass();
				$('#timer #minutes').removeClass();
				$('#timer #seconds').removeClass().addClass(secClass);
				$('#timer #millisecs').removeClass().addClass('fontsmall '+mmClass);
			};
		}else{
			s_currently = new Date();
			var Currently_TimeStamp = s_currently.setTime(s_currently.getTime());
			if(isTimer == 1){ // Is Countup timer
				var CD_startTime = localStorage.getItem(TgetServerID+'_store_CD_startTime');
				var cv_ms = Currently_TimeStamp*1-CD_startTime*1;
				ms = Currently_TimeStamp*1-CD_startTime*1;
			}else{ // is CountDown Timer
				var CD_endTime = localStorage.getItem(TgetServerID+'_store_CD_endTime');
				var cv_ms = CD_endTime*1-Currently_TimeStamp*1;
				cms = CD_endTime*1-Currently_TimeStamp*1;;
			};
			
			var hours = Math.floor(cv_ms / 3600000),
			mins = Math.floor((cv_ms % 3600000) / 60000),
			secs = Math.floor((cv_ms % 60000) / 1000),
			mms = cv_ms % 1000;
			
			if(hours < 10) { var hStr =  "0"+ hours.toString(); }else{ var hStr = hours.toString(); };
			if(mins < 10) { var mStr =  "0" + mins.toString(); }else{ var mStr =  mins.toString(); };
			if(secs < 10) { var sStr = "0" + secs.toString(); }else{ var sStr = secs.toString(); }
			if(mms < 10) { var msStr =  "00" + mms.toString(); }else if(mms < 100) { var msStr =  "0" + mms.toString(); }else{ var msStr =  mms.toString(); };
			$('#hours').html(hStr);
			$('#minutes').html(mStr);
			$('#seconds').html(sStr);
			$('#timer #millisecs').html(msStr);
			
			starttimer();
		};
		
		
		
		wartimeison = localStorage.getItem(TgetServerID+'_store_warTimeison');
		if(wartimeison == 1){
		$('#war-timer-id').removeClass('wt-inactive').addClass('wt-engadged');
		};
	};
	
	/*
	var storage = chrome.storage.local;

	// Get data
	// chrome.storage.local.get("mykey", function(fetchedData) {     alert("fetched: " + fetchedData.mykey); });
	
	// chrome.extension.sendMessage({cmd: "load"}, function(response) {  console.log("tab data:", response) }); // get from background.html
	// GM_getValue(); // GreaseMonkey // http://wiki.greasespot.net/GM_getValue
	//
	*/
	
	/*  // USAGE OF localStorage //
	To set: localStorage.setItem(key, value);
	To get: localStorage.getItem(key);
	To clear map: localStorage.clear();
	To remove item: localStorage.removeItem(key);
	To get length: localStorage.length
	To key based on index in internal map: localStorage.key(index);
	*/

	
	if( (document.location.href.indexOf('/pages/war/main.php') !== -1) ) {
	function check_for_war_timer() {
	var popup_hidden = $('#div_popup').attr('style');
	if( document.getElementById('id_wh') && document.getElementById('id_wm') && document.getElementById('id_ws') && popup_hidden !== "display: none;" && running == 0 && stopped == 0){
	$('#war-timer-id').removeClass('wt-inactive').addClass('wt-active');
	
	$('.wt-active').click(function(){
	if( $('#war-timer-id').attr("class").indexOf('wt-inactive') == -1) {
	wartimeison = 1;
	document.getElementById("hours").textContent = $('#id_wh').text();
	document.getElementById("minutes").textContent = $('#id_wm').text();
	document.getElementById("seconds").textContent = $('#id_ws').text();

	starttimer();
	$('#war-timer-id').removeClass('wt-active').addClass('wt-engadged');
	};
	});
	
	}else if(wartimeison ==0){
	wartimeison = 0;
	$('#war-timer-id').removeClass('wt-active').addClass('wt-inactive');
	};
	
	wtt = setTimeout(check_for_war_timer, 10);
	};
	setTimeout(check_for_war_timer, 10);
	
	};


}; // End of CountDown timer Function

if ( (document.location.href.indexOf('cashtowns.com/pages/main/main.php') !== -1) ){ // Run only on http://*.cashtowns.com/pages/main/main.php*
var getServerID = window.location.host.split('.'), ServerID = getServerID[0];

// Make the link
if ( (document.location.href.indexOf('cashtowns.com/pages/main/main.php') !== -1) ){
// Get the session key
var getsessionkey = $('embed').attr('src'), splitgetsessionkey = getsessionkey.split("="), sessionkey = splitgetsessionkey[2];
var THEURLHERE = 'http://'+ServerID+'.cashtowns.com/data/op.php?op=ID_OP_GET_TOWN&key='+sessionkey+'&nocache=';
}else if( (document.location.href.indexOf('/pages/towns/index.php') !== -1) ){
// get username
qs();
var THEURLHERE='http://'+ServerID+'.cashtowns.com/data/op.php?op=ID_OP_GET_CACHE_TOWN&key='+params['user']+'&nocache=';

};
make_town_stats_table(THEURLHERE);
runBigTown();

}else if ( (document.location.href.indexOf('ID_OP_GET_WORLD_MAP') !== -1) ){ // Run on ServerStats for the World Map

make_world_map_stats_table();

}else if( (document.location.href.indexOf('cashtowns.com/pages/towns/index.php') !== -1) ){ // Run on http://*.cashtowns.com/pages/towns/index.php?user=*


make_town_stats_table();

};

if( (document.location.href.indexOf('goldentowns.com/pages/main/main.php') !== -1) ){
var getsessionkey = $('embed').attr('src'), splitgetsessionkey = getsessionkey.split("="), sessionkey = splitgetsessionkey[2];
var THEURLHERE = 'http://www.goldentowns.com/data/op.php?op=ID_OP_GET_TOWN&key='+sessionkey+'&nocache=';

make_town_stats_table(THEURLHERE);

// $('table:eq(0) td:eq(22)').attr('height','869').attr('id','changed_id');
};

// Get Server ID
var FgetServerID = window.location.host.split('.'), FServerID = FgetServerID[0], serverlocation = 'http://'+FServerID+'.cashtowns.com/', second_login_page = serverlocation+'index.php';
	
if( (document.location.href.indexOf('ID_OP_GET_WORLD_MAP') == -1) // Don't run on viewing Servers Stats page (xml page)
&& (document.location.href.indexOf('/pages/towns/index.php') == -1) // Don't run on town preview
&& (document.location.href.indexOf('/pages/login/login.php') == -1)  // Don't run on login page
&& (document.location.href.indexOf('/pages/signup/signup.php') == -1) // Don't run on signup page
&& (document.location.href !== serverlocation)
&& (document.location.href !== second_login_page) // Don't run on Server home page
&& (document.location.host.indexOf('goldentowns') == -1)
&& (FServerID !== "forum") ){ // DO NOT Run on forum

CountDown_T();

};

// SORTABLE SCRIPT //

/*
  SortTable
  version 2
  7th April 2007
  Stuart Langridge, http://www.kryogenix.org/code/browser/sorttable/
  
  Instructions:
  Download this file
  Add <script src="sorttable.js"></script> to your HTML
  Add class="sortable" to any table you'd like to make sortable
  Click on the headers to sort
  
  Thanks to many, many people for contributions and suggestions.
  Licenced as X11: http://www.kryogenix.org/code/browser/licence.html
  This basically means: do what you want with it.
*/

 
var stIsIE = /*@cc_on!@*/false;

sorttable = {
  init: function() {
    // quit if this function has already been called
    if (arguments.callee.done) return;
    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;
    // kill the timer
    if (_timer) clearInterval(_timer);
    
    if (!document.createElement || !document.getElementsByTagName) return;
    
    sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
    
    forEach(document.getElementsByTagName('table'), function(table) {
      if (table.className.search(/\bsortable\b/) != -1) {
        sorttable.makeSortable(table);
      }
    });
    
  },
  
  makeSortable: function(table) {
    if (table.getElementsByTagName('thead').length == 0) {
      // table doesn't have a tHead. Since it should have, create one and
      // put the first table row in it.
      the = document.createElement('thead');
      the.appendChild(table.rows[0]);
      table.insertBefore(the,table.firstChild);
    }
    // Safari doesn't support table.tHead, sigh
    if (table.tHead == null) table.tHead = table.getElementsByTagName('thead')[0];
    
    if (table.tHead.rows.length != 1) return; // can't cope with two header rows
    
    // Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
    // "total" rows, for example). This is B&R, since what you're supposed
    // to do is put them in a tfoot. So, if there are sortbottom rows,
    // for backwards compatibility, move them to tfoot (creating it if needed).
    sortbottomrows = [];
    for (var i=0; i<table.rows.length; i++) {
      if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
        sortbottomrows[sortbottomrows.length] = table.rows[i];
      }
    }
    if (sortbottomrows) {
      if (table.tFoot == null) {
        // table doesn't have a tfoot. Create one.
        tfo = document.createElement('tfoot');
        table.appendChild(tfo);
      }
      for (var i=0; i<sortbottomrows.length; i++) {
        tfo.appendChild(sortbottomrows[i]);
      }
      delete sortbottomrows;
    }
    
    // work through each column and calculate its type
    headrow = table.tHead.rows[0].cells;
    for (var i=0; i<headrow.length; i++) {
      // manually override the type with a sorttable_type attribute
      if (!headrow[i].className.match(/\bsorttable_nosort\b/)) { // skip this col
        mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
        if (mtch) { override = mtch[1]; }
          if (mtch && typeof sorttable["sort_"+override] == 'function') {
            headrow[i].sorttable_sortfunction = sorttable["sort_"+override];
          } else {
            headrow[i].sorttable_sortfunction = sorttable.guessType(table,i);
          }
          // make it clickable to sort
          headrow[i].sorttable_columnindex = i;
          headrow[i].sorttable_tbody = table.tBodies[0];
          dean_addEvent(headrow[i],"click", function(e) {

          if (this.className.search(/\bsorttable_sorted\b/) != -1) {
            // if we're already sorted by this column, just 
            // reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
            this.className = this.className.replace('sorttable_sorted',
                                                    'sorttable_sorted_reverse');
            this.removeChild(document.getElementById('sorttable_sortfwdind'));
            sortrevind = document.createElement('span');
            sortrevind.id = "sorttable_sortrevind";
            sortrevind.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            this.appendChild(sortrevind);
            return;
          }
          if (this.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
            // if we're already sorted by this column in reverse, just 
            // re-reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
            this.className = this.className.replace('sorttable_sorted_reverse',
                                                    'sorttable_sorted');
            this.removeChild(document.getElementById('sorttable_sortrevind'));
            sortfwdind = document.createElement('span');
            sortfwdind.id = "sorttable_sortfwdind";
            sortfwdind.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            this.appendChild(sortfwdind);
            return;
          }
          
          // remove sorttable_sorted classes
          theadrow = this.parentNode;
          forEach(theadrow.childNodes, function(cell) {
            if (cell.nodeType == 1) { // an element
              cell.className = cell.className.replace('sorttable_sorted_reverse','');
              cell.className = cell.className.replace('sorttable_sorted','');
            }
          });
          sortfwdind = document.getElementById('sorttable_sortfwdind');
          if (sortfwdind) { sortfwdind.parentNode.removeChild(sortfwdind); }
          sortrevind = document.getElementById('sorttable_sortrevind');
          if (sortrevind) { sortrevind.parentNode.removeChild(sortrevind); }
          
          this.className += ' sorttable_sorted';
          sortfwdind = document.createElement('span');
          sortfwdind.id = "sorttable_sortfwdind";
          sortfwdind.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
          this.appendChild(sortfwdind);

            // build an array to sort. This is a Schwartzian transform thing,
            // i.e., we "decorate" each row with the actual sort key,
            // sort based on the sort keys, and then put the rows back in order
            // which is a lot faster because you only do getInnerText once per row
            row_array = [];
            col = this.sorttable_columnindex;
            rows = this.sorttable_tbody.rows;
            for (var j=0; j<rows.length; j++) {
              row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
            }
            /* If you want a stable sort, uncomment the following line */
            //sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
            /* and comment out this one */
            row_array.sort(this.sorttable_sortfunction);
            
            tb = this.sorttable_tbody;
            for (var j=0; j<row_array.length; j++) {
              tb.appendChild(row_array[j][1]);
            }
            
            delete row_array;
          });
        }
    }
  },
  
  guessType: function(table, column) {
    // guess the type of a column based on its first non-blank row
    sortfn = sorttable.sort_alpha;
    for (var i=0; i<table.tBodies[0].rows.length; i++) {
      text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
      if (text != '') {
        if (text.match(/^-?[£$¤]?[\d,.]+%?$/)) {
          return sorttable.sort_numeric;
        }
        // check for a date: dd/mm/yyyy or dd/mm/yy 
        // can have / or . or - as separator
        // can be mm/dd as well
        possdate = text.match(sorttable.DATE_RE)
        if (possdate) {
          // looks like a date
          first = parseInt(possdate[1]);
          second = parseInt(possdate[2]);
          if (first > 12) {
            // definitely dd/mm
            return sorttable.sort_ddmm;
          } else if (second > 12) {
            return sorttable.sort_mmdd;
          } else {
            // looks like a date, but we can't tell which, so assume
            // that it's dd/mm (English imperialism!) and keep looking
            sortfn = sorttable.sort_ddmm;
          }
        }
      }
    }
    return sortfn;
  },
  
  getInnerText: function(node) {
    // gets the text we want to use for sorting for a cell.
    // strips leading and trailing whitespace.
    // this is *not* a generic getInnerText function; it's special to sorttable.
    // for example, you can override the cell text with a customkey attribute.
    // it also gets .value for <input> fields.
    
    hasInputs = (typeof node.getElementsByTagName == 'function') &&
                 node.getElementsByTagName('input').length;
    
    if (node.getAttribute("sorttable_customkey") != null) {
      return node.getAttribute("sorttable_customkey");
    }
    else if (typeof node.textContent != 'undefined' && !hasInputs) {
      return node.textContent.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.innerText != 'undefined' && !hasInputs) {
      return node.innerText.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.text != 'undefined' && !hasInputs) {
      return node.text.replace(/^\s+|\s+$/g, '');
    }
    else {
      switch (node.nodeType) {
        case 3:
          if (node.nodeName.toLowerCase() == 'input') {
            return node.value.replace(/^\s+|\s+$/g, '');
          }
        case 4:
          return node.nodeValue.replace(/^\s+|\s+$/g, '');
          break;
        case 1:
        case 11:
          var innerText = '';
          for (var i = 0; i < node.childNodes.length; i++) {
            innerText += sorttable.getInnerText(node.childNodes[i]);
          }
          return innerText.replace(/^\s+|\s+$/g, '');
          break;
        default:
          return '';
      }
    }
  },
  
  reverse: function(tbody) {
    // reverse the rows in a tbody
    newrows = [];
    for (var i=0; i<tbody.rows.length; i++) {
      newrows[newrows.length] = tbody.rows[i];
    }
    for (var i=newrows.length-1; i>=0; i--) {
       tbody.appendChild(newrows[i]);
    }
    delete newrows;
  },
  
  /* sort functions
     each sort function takes two parameters, a and b
     you are comparing a[0] and b[0] */
  sort_numeric: function(a,b) {
    aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
  },
  sort_alpha: function(a,b) {
    var t1 = a[0].toLowerCase();
    var t2 = b[0].toLowerCase();
    if (t1==t2) return 0;
    if (t1<t2) return -1;
    return 1;
  },
  sort_ddmm: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  sort_mmdd: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  
  shaker_sort: function(list, comp_func) {
    // A stable sort function to allow multi-level sorting of data
    // see: http://en.wikipedia.org/wiki/Cocktail_sort
    // thanks to Joseph Nahmias
    var b = 0;
    var t = list.length - 1;
    var swap = true;

    while(swap) {
        swap = false;
        for(var i = b; i < t; ++i) {
            if ( comp_func(list[i], list[i+1]) > 0 ) {
                var q = list[i]; list[i] = list[i+1]; list[i+1] = q;
                swap = true;
            }
        } // for
        t--;

        if (!swap) break;

        for(var i = t; i > b; --i) {
            if ( comp_func(list[i], list[i-1]) < 0 ) {
                var q = list[i]; list[i] = list[i-1]; list[i-1] = q;
                swap = true;
            }
        } // for
        b++;

    } // while(swap)
  }  
}

/* ******************************************************************
   Supporting functions: bundled here to avoid depending on a library
   ****************************************************************** */

// Dean Edwards/Matthias Miller/John Resig

/* for Mozilla/Opera9 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", sorttable.init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            sorttable.init(); // call the onload handler
        }
    };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            sorttable.init(); // call the onload handler
        }
    }, 10);
}

/* for other browsers */
window.onload = sorttable.init;

// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function dean_addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else {
        // assign each event handler a unique ID
        if (!handler.$$guid) handler.$$guid = dean_addEvent.guid++;
        // create a hash table of event types for the element
        if (!element.events) element.events = {};
        // create a hash table of event handlers for each element/event pair
        var handlers = element.events[type];
        if (!handlers) {
            handlers = element.events[type] = {};
            // store the existing event handler (if there is one)
            if (element["on" + type]) {
                handlers[0] = element["on" + type];
            }
        }
        // store the event handler in the hash table
        handlers[handler.$$guid] = handler;
        // assign a global event handler to do all the work
        element["on" + type] = handleEvent;
    }
};
// a counter used to create unique IDs
dean_addEvent.guid = 1;

function removeEvent(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else {
        // delete the event handler from the hash table
        if (element.events && element.events[type]) {
            delete element.events[type][handler.$$guid];
        }
    }
};

function handleEvent(event) {
    var returnValue = true;
    // grab the event object (IE uses a global event object)
    event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
    // get a reference to the hash table of event handlers
    var handlers = this.events[event.type];
    // execute each event handler
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
            returnValue = false;
        }
    }
    return returnValue;
};

function fixEvent(event) {
    // add W3C standard event methods
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
};
fixEvent.preventDefault = function() {
    this.returnValue = false;
};
fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
}

// Dean's forEach: http://dean.edwards.name/base/forEach.js
/*
    forEach, version 1.0
    Copyright 2006, Dean Edwards
    License: http://www.opensource.org/licenses/mit-license.php
*/

// array-like enumeration
if (!Array.forEach) { // mozilla already supports this
    Array.forEach = function(array, block, context) {
        for (var i = 0; i < array.length; i++) {
            block.call(context, array[i], i, array);
        }
    };
}

// generic enumeration
Function.prototype.forEach = function(object, block, context) {
    for (var key in object) {
        if (typeof this.prototype[key] == "undefined") {
            block.call(context, object[key], key, object);
        }
    }
};

// character enumeration
String.forEach = function(string, block, context) {
    Array.forEach(string.split(""), function(chr, index) {
        block.call(context, chr, index, string);
    });
};

// globally resolve forEach enumeration
var forEach = function(object, block, context) {
    if (object) {
        var resolve = Object; // default
        if (object instanceof Function) {
            // functions have a "length" property
            resolve = Function;
        } else if (object.forEach instanceof Function) {
            // the object implements a custom forEach method so use that
            object.forEach(block, context);
            return;
        } else if (typeof object == "string") {
            // the object is a string
            resolve = String;
        } else if (typeof object.length == "number") {
            // the object is array-like
            resolve = Array;
        }
        resolve.forEach(object, block, context);
    }
};


// END OF SORTABLE //