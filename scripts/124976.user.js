// ==UserScript==
// @name            [LEG-X] Rank Image
// @autor           genes
// @contact         rogelio.meza.t(at)gmail(dot)com	
// @description     Script for Ikariam. Puts an image next to the player's rank according to the given range.
// @include         http://s2.cl.ikariam.*/index.php?view=embassy*
// @include         http://s2.cl.ikariam.*/index.php?view=diplomacyAdvisorAlly&listAllyMembers=1
// @version         1.1.1
// @exclude         http://board.ikariam.*/*
// @exclude         http://support*.ikariam.*/*
// @require         http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

Arranka = function(){

    //officials
    this.ranks = {
    
        leader : {
            image : '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'
            , rankName: 'Imperator'
        }
        , minister : {
            image : 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEALUApwAA/VN3/gAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCBQMjOp7VxSwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAElElEQVRIx+2W24tVVRzHP2utPXPOzJkz54yO40zZBUUKJCGCnsoH9UXtoehKD71UD1ovvfiQf0FFD4G9SGD3CxJClGEkVEOFIKWkWEoZmTo6nqPnHM/ZZ1/W79fDrJFxvI0mQtCCzd4b1lrf3+X7+/5+8B9e9qYdAug3Zt6DpdKzwDLA3TQ3x6LojU1jY1owZjOw6FrPX6ulJrzvemFk5L2CtVhjFv2RJAeA3wCdsefGAC/p7X1qbaWy9Jc4jleVy5vvHxhY0hYxg9aW98dxN1P9e1mx+Egtz88otACZiwdXXc/Nn7/yzmJxV6aalZ3ryVVpi9D2nqK19FtLy/tjr0xMvAZsAeIbQq63arXdBihY25OrIiGuRWspRxFtEcZbLRsAsxvB6sGwr300SVpdEWIRMlWcMfRYy2SaUstzJrLsLHAM8EDlSvfbS/wXgCh89z1UqYwDK4CBknM7LaDG4IPXLe9JVMlVqXk/CZwCnl5dLn8eSs2E+wozORXNRH1m3rwli4vF72IRfm639+3rdEorK5Xlg8599GG9vmEiy8YHo+gxB3hjSEUQVQyQiWjD+2PA2IsjI+8POpd2VV9F9fYHBgeHD8fxl5+ePfs6cACQ2eRym0ZH633ODRaspd85GllGQ4SDnc6Ruvfb1lSrG3NVPJCIkIiQq3IsTeO9nc6OddXqo0uLRWp5TiWKKBjDRJrqO6dP/3g0yzYCPwB6EaufrFZ33F0qrbEhLqkqqSo9xjAcRXRF6M4CzkQoOseinh4USEIaCKk4kaa67cyZ7R2Rl4C/Lkmufd3uhulEJKpkQGQMRWtpq+KNmapB1fNnSs4x5Bwx0A3M8qo0vaclQuK974gcAmqXJNdoFK1Z3te3q2wtAnRVEVUckKuSi5CLXCBPBWMoOYcAefA+FeGcCB0RVIRKFEVPVKtrgQXTmBco19uLF584mWXrY9WhrgiookAWWOuNQWeqjzFE1iKq5CFCHe/pqJKG3HsgVpXv2+3jDe9PAb8C+UU5rjhXWl0ubx3r7X18uqasm7LPqGIBFyIyvbwqXgQfRMUDEjyve5980WjsTlU/Az4GjgN6kVYnqtnBbnf7sHNx2blV1lpjQslMC8Y0obwqPkRFjUGCEbkIKfB7ktS/ajbHc3gX+CTU+FW12i4tFO5bMTCwqxxF5V6gGEW08hyvevHmAJxMKZvu73Qmforjb5kC/Wa2dl+tSZiiMWPrR0YOD0VRf9N7OiLndXpmi7Mh/16EnY3G4SNp+jWwFdh7Ke2OrgKsXdWaNaa/6T2TWYaEftfM825XNR2KolLJWqfhMgP0WpsA24A9s2ycMzAWFhbhzQ/q9TvqeV5tiZxWaALngJNABxjpM+aWsnMLFkbRrTpVzuZyoHPqxwPG2HOqo8A9QMoUaCdoRRxIXACKQD9QCh3tEPDndXvcVr335bGxPWrmODOoUsvzE1smJ9eF9OfX1Y+dMTIt9tP6faUHoJHnFeDhEAWuy2NVNc0850iS4Oc4rbRFbAA1/3bmug14Hhi+EmFm2hvK6IPLzV5zBXaBNNcyDqeBhMr/C/gHMbtnCJdlCnAAAAAASUVORK5CYII='
            , rankName : 'Pretor'
        }
        , diplomatic : {
            image : 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAYAAADwbH0HAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCBQM7C00QXU8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEUUlEQVRIx+2XW4hVVRzGf2vtvc8+Z84cnTPO6GgzNF5SrAyZKIy0AhG6QBGGItSLGXah6CECJYl6DKuXoB4Cox6ii0GWMBpadjEL7+WlJp2xGc0Zz8yRc9n3tVYPcwIZdHLEIwSt18X6f4vv//2/9S34f13manecxUAzIK8lrvXw5MklYDkw6UoKXNFtO1Opuxflcrk2214FtF8z4Hmu+7oRgq5sdjFwJ5CqO3Aa1i9talqYaM28dHrabNddCcydcK8memB1S8tXUxzHjo0hMYYZjnPdPs87CxwEoroAdzjOgYeam9tDY1BCEGtNSko7DbN6o+gQ0AuYq031TY9PnbowNAZlDL5SowWE4OZMZuZkKVcAU656j5flcvc2SkkxSTgdRQzFMcNJQlUpbMui03UXAfOvJtVzbs9mVyxoaHjGEqLluO+Hx4Lgr94wPDqcJP1AOiNEVoIdGXP+vFL7a70el3Ix3uY02/78uba2B3NSUlKKH8vl0tZSaTvwCbAHqACppbncs13Z7Ppm2ybSOt5cLL502PffB4YAPRHgB1bm85tua2xsBSgmCT1BEH1cLO4E3gS+GaNg+VRra3ez4yxzhMAYw59R1LupUFhVU3s4HtX23FSqa6brvvdYS8uGGzOZbATEWlNIEo74fuF0HG8DPgS8MXXM4sbGngYp1wghUECTbeeXZLNrMlLOGE6SnsCY4oX02wA3uO7yBQ0NHy3J5SxtDLExVLRGA2FtXitae8AJoHpRYzHmqCslsRmtrY1BSskdudzqRdns6qO+v3trqfSqp/UuILABesJwc6ttd346PPzk9a77dN6287YQWEIgACEErpQ2kFxKD5lUqtkSggSoKkWkFEoIIq3pC8Nzp6LIs2B2jfpRYIDd1eoA8PIP1epb902a9Fqn6z7qSiksIbCA2a7bfMDzptd82R8LnBNirQaU1nhKERvDmTAsf1ep/FTVuhvYBfQA5fHEZd2STt96Vy63ByGEJQRSCHaVSj/v97wngF8vVOvGjo58RoizFWNS/WFISSkOel7/Yd/fBnwA7B2ri3HHaV463Z63rBctIe7pcJw5s9LpzFAcnzgbx6/YsK2roaGxyXHWOvD8UJI4vwVBPBBFlWNB8Pu5JPlHiD0XGylxGQaSAqY/ks+vnZ/JrLOFwBWCtJTIWv/LSvHZyMipvZ63E/geOAkcBkYuVdS+DOAIONVkWW8nWq/TQiClRGuNEAJfKQaCgN4wHAa+AL4E1KWMY8Je/W6h0B8as10BVa2pKMVgFDEYRYwkSTis1B/AISD+N9AJB4E3Bgfvj7SOdO2FCrQmMoYd5fKRGsVn6pVAlKfURlOzIAWcDIJiWevjQDcQ1C36vFMobAi07pGjRqG/rVR+AbYAffUOe9pX6gUDHPC8XgP7gK9rva1vytwyMtJtge4Lw2PADqBQ97DH6Cuh2hxn4JDv99WssHQtfxMSmAE4/6m/19/qQ/fRK/JGgwAAAABJRU5ErkJggg=='
            , rankName : 'Praefectus'
        }
        , general : {
            image : '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'
            , rankName : 'Legatus'
        }
        , rank1 : {
            image : 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCBQQzA45dSfAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAu0lEQVRIx+2SPQrCQBCFv3WjIIRAbAQbD2FrZeGdxNbKW3gJ8U5G8QdBs5sZCxOIhU1MIbhfs8PMMA/eWwgEAv+DqYrU2tU8SZZetZXDN5H17nJZABJVzWkc+0kcU7QgcldlezqNgAGQRfWhAA8RjDHNbDGGXISz9ziRLmAB3kQUyIGrc9BUqLxTJ6oP7yLsnXstfWGb/RT8uNdLj97PvGq/jeBz1WEBGyCre9Ipg7It/VwBDuUbCAR+gSfNf0HfWAYEegAAAABJRU5ErkJggg=='
            , rankName : 'Munifex'
        }
        , rank2 : {
            image : 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCBQQ2MEz63KMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACt0lEQVRIx+2UvYucVRTGf+fcd995J7Pz7g7uZCAIFq4RiURBUCwCpoiIYqVlmhT+B2KhlbGzEKyEpLITLEIQm8QgKEpcs6SxslXcWfaD+djZ+bj3nmuRye7soEsgWLkPnObee85z7r3Pc+AEJ/ivII94rnI2zy+fr9UuPeHcc7nqZj/Gu90Yv7jR6Ww8NkkVXr28snLzXK3WnMSIiRDMMBF8jLYZwifXtrauAvZvNdxxBKXIC1darV+frlRqQzP2zBiYsZ8SlhJORE4599qTCwuN34bD20A6jqQxjfpMlG8tLd0/V63m+2a0vWfHe7ZDCMMYRUBEBBVh0blXSOn+H95352sAfQF4syx/eKlev3CEPiWWs4xRjGx4z5b34bteb30nxnuLqu5SWb67WhQrC6pMzFhyjnFKiBz+wCBGPmu3WwqwnGULOVCIHIYqIzN8SozNuNPvr+/E+Cnw0Z7Z+zc6nbcdWC7CoioqQlX1IN+lxMAM4Gz2kNUAb4afUUMCxjGikLZDWAPuAN3p9vqicxODwgNjsyN5oxgJD0j0kCQlOjEeIQHIACciL9dqq2uDgX+4fvXMmeVCNd83oxMjYa45navB2Gzj99FobxhjdvCmKbGS50XdOSaqXKjX33i+Wv34qTz/spFlzzi4PkhJAzAxYzuESTSz2XynqrM+aQDvAMuzf/9es/lBI8uapESuSkWVqgiZKiElRlPV9ULgq93drycp3ZvzywT4VmZMqfPmXK1UXny9LH8sVAunSkWETASbdt+PkT0zbnW7dze8/xD46R9MabNmTNMDB7EbY/tP79dOqV4sVMvxVDG9GOk/uMX+973eL5shfD4VxXi+BpAeZXY54NlWll05nWUX686d7ptNdkJo/+X9z8A3wNqU4LEGpAAF0ARaU8FsAZvA4Li5dYL/Mf4Gb39M16qp0mYAAAAASUVORK5CYII='
            , rankName : 'Immunis'
        }
        , rank3 : {
            image : 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCBRAGCKCRWWIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADL0lEQVRIx92WT2gdVRTGf+e+mUleTOJLQ30lqRTcWLBSiYgKKiK4cKWCSxfVhSuFLqSLLlxIuxa6sgvBhX+gUBeKbgyi0CwUIw0qurGCbVKbNMnre/PeZGbuPaeLzNMkpjZtuuqFO8zinPud+53zfVy4W1btFmIdUAfGgHur3ADYzRJlB4cL8Pjzo6Mn9ifJ1Git1jCz7t9lOf9jr3fmQp5/DPwB+NsFkck4PvH63r3HG1GENyOY4avyzYyZTmfu63b7GPAtUNyMLtm6DyTJ2280m+/WnaOnyrUQaIdApopVQRNJsk/NDl8sijng0jZnrX8cPBmLHDZI+oiFmb3VbJ7anyS0Q2DJezre+2uqy41abWxPFCV154jWY/l0efmLpbL8TkTK/hlmlpYwLQCvjo/PPjo8PLX1mmpGT5WFouDC2lprut1+J8DZPVFUvNhofHVfHD9WE0HNGI9jItnM/u9Z1j69uHg0AohEpOs9OPefJuWqeDPOpel0gLPAwor3OHg5ce5SDXAiFGYUtj5oBnRDYLEsHRC7f6oWIa8471S7/w/QVV0Cuv34D65eXbjHORywZrY5z3u6IWAVaNRP8mashoBuuIWZkThHIsKhwcEnfllbexCYBfTk5ORrkQgZ0PIe5MaDGlWUzP2WZY1MNe6HGrj7k2SiLoKv1Xih0XjkQJa97+HLQ0NDE6NRdCRTJa9oupznLSfS7YvTgF4Iy8BfskHNg1srONpszibOHRQgEWHAOepV33w1FFfKkvmi6H7eah0DPtlGK75PlwK9rSCp6nN1s19jkbHgHKpKUQkyVyVVZdX78pt2+zTwGdC6LVt5ZWxs36DImZEoetqJYGaUgFflYlEsfJ+m73VUPwKu3MjHZKfm+NTw8MMDIi+JyEMt71cvl+XMfFnOVCrPd2KQm2xgB24sFcW2g3iLAB4YGHhzMo6f8ds0fzcrC2HlfJadigCeHRk5cnBoaEruIICZ8XOvl57PsnNRNVqSh/C/grolAFh3AFUAif7tjtBTJQ8B2SWYAsEMNtqKgGXrM1/J1XZ9E7e18anqhz+k6Z+F2cCdbHyuugL8dNe8iLgOF9CuV4g8ohsAAAAASUVORK5CYII='
            , rankName : 'Signifer'
        }
        , rank4 : {
            image : 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCBRAPE/s2K8cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC5UlEQVRIx+1VzUsUYRj/ve/Mzs7szOq4y24a6C61YvZJoJAWgVD0cenzktixQ8fokKf+gi4FnUshDYoOaSAZEQQFZeYqbh9EIeYXs6K57kzjzrxvh0aIbVdHkE49l2Hgfec3z+/jeYB/UAQADofDt1Ky3LT6vlllMpa5Pz9/RQSAellu2ibLLQ7nmwbAOMdHy0oBGBQBIO+6H4aWl+stxoKb2ckP13UAhFfpqQBw0nv6pdlP2xzAMPnjEimjCYmJ4pmDmtZRK0lNHKiWKDVcYGzKtnseLSz0MMBZC2g9oetO6/rDRkXZ+dW2MxnLyi+5rqNQKieDwXijoiQZ55Njptn+PJcbAsDKuqscwNmqqtdbAoFsdzb7Oc9YGsArAN8BFADoEVE8cKSiorMmEIi8yOXOp01zsBzQX6VRSk7p+pvL8XiaAt0ATgDQin6KABBVSlMd0einS7HYLAUafccgLornrtXULKuUPvAApLVM0BwK7b5aXf2zWVV7AYSLD9BSt45XVl6csO1xj6KXAFbWEvataWZsxvq3B4OtAHYUd1MSRBOE5oxlmZ4GeT/ZkwWhLx4I6AD2ABDWAyEUqF5mrOCJ7GsMqJTOqJRqAGoBiOt2QggxQpQqnovgEySywvkiALn4u7RMSkeTkhQHUOnXLQIhbVnHmQVgoCicJTtZ4fxevaIkY6LYUsxvqbqZSMQ45+3v8/lpAF98gXRnsz0FxiaP6XqnRmlyrW5u1NWJItA1VSjMjVrWNwAjxYEsCWIxVhi3rHad0siFaPTJIU3bVers7UQiFiLkseE4TXcNIw1gAMD0RsYK3acoR/eraldNIKC7nPerotinUjojERIRCGlzGGufsO25O9lsesF1nwLoBbC0ERAAoBRo2BsKXU8Fg61bJUkPC4K2wtii4Tiz7/L56bHfFA0AeFYKAD6dQ7xR0eAFrdazqeGJPOJR5GzKjufezuGcE0III+sE9f+O32hxAMO/AMoPJ8j/IWDkAAAAAElFTkSuQmCC'
            , rankName : 'Aquilifer'
        }
        , rank5 : {
            image : 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCBQQvMNf6dbsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADyUlEQVRIx91WQW8bRRh9s7veXduJN7Zry8b2um0qEXEhVKE5VApVeolSokpBpVD1B7QFVAkIQkU9ohapB2hoRC+AKAgqoYpD4BRQIgRKIZVSKG2lFLVR6ybB7mJv7bW9np3hEDtyFickwKkrzWX3zbx53/fmzQKPykM2gd290+frDoliyiuKSzPF4uwCpVMA2H8lCQ0EAmO6ohzUFQV5Sk3TcWoioIQ9njYOIE/pxEyxeOSyZf2+aZK4JB0fDoffZYwtjRcKN+7a9ncArgPI1iGR7Yqy72m//9ltihKZr1bPfW4YrwKwN1QXTRA+OJlI8E5F+RHAEQBJAGILqAgg+aTXO/paLMYPhcOTAHz/SBCTpOMnEwmuieLXAPoACBvYl/C4qr7weizGBzTtIgB53R68FI02FPRt0hikv719ZCQW41FJem5N1ICmfXE0Elmsl6ilgvd0vXeN0gGAcDQanRsOBucAhFZeNiOSsnzwm0LhBoBxtzVH0+kLY1u3cg5Mn04m6SvR6ASAgIuEmZSe6FTVHQB6WpHsTsoy5pddtODa/QUGHDYpRZExWIxBk6S9h8LhKTfRZ4ZxSSUEnYpyoLH+CkmPz9dtUmoC+A2A0zyRE3LYchxQAJTzlRHzeLoB7HGpcTjni0FR7AKgriKJSlKqyFgNQK55xtuJRG+VMdQ4R61BUCercY5tirLf3SOPIBheQQg27LxCIgnCEgEUdyffymRmio4DizFYjoMyY6jUS1ZiDLer1fvuOR5Ae+g4lb/1JFOtzoYkqQ3AFrf8jG1/SzkHq7uhoWiuXM4C+NldXkkQEjlKMwCsVSRXyuUpBqBLVfe55X+Yyw3fqlRmG2pKjOF6uZz9vlgcAzDZjD2j6/0WY7hXq10BUAEAqdl+BUonevz+oZuVShzAvaZv5lf5/DMA9qRkef9d275fVzAJwFyVM5yf+tWy7gCYbpnQfW1tnW/E43yX3z+6TpyIax3Gs7o++E4qxRVCPm0+jKvA87b952MeT+Qpn+9l03Fu/kHptRZr8fqA67BuFwi5fPHBg6vztn0GwLX1Mkh+MRSafDMe50MdHSMbCcj30+nBc+k0H9S0OQDH3AG5VgD69gYCH+30+5/njN16yNiJ89nsJbeLzqbT/QLnpyzOd31pGL/8VCqdB/Bxw1UbuRnlLaI41NvefvoJVd3RIUkgwKJMiCERohFCEialmLWsO+P5/A9Vzj+pG8H+N3d8CECPLssHgqLY5RWEYImxSo7SzMKyTacBzAAw/o8fCRHLidC4+SwAVXcJH+3nL0ouk+Efa7riAAAAAElFTkSuQmCC'
            , rankName : 'Centurio'
        }
        , rank6 : {
            image : 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCBQQsKgG13wIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEtklEQVRIx+WWX4hUVRzHP+fcO/fOzO447qyj+2dmFkxNS7BsNVDxwafFVMIKtYd66MEtA4uSDJKICJX0wRLRIgtB0OgfpEi2pFaagZqmSaLCGpmr7p+ZnZm7M/fPOT04s4xbpFZPdd4Ov/M7n/v7fX+/37nwX1niDs7Onh6N3tdgGOmoYVw9ViicvOL7hwD1TyGJjlGjtmRse0nGtsn6fs7V2vK09htNM6aBrO93HSsUOr93nIt3HGKzaa5cMW6cfjqZ7Elb1gFgDbD4lZaWIrAKWDzetrcvSSSurW5u1ssSic2AdduAuJRb17S26rts+wjQCaQAuT6dvnd9KqUn2vY2wAAkkJoWibz9QlOTfryx8SAQvSWgyTRXrmlt1XHD2AvMrVwEwJvp9NY3Wlv1/Hi8G0jWuMm7w+GlLzY16Y54fPetIkqsGDu2GsHckZptTKezr6dSenkyGVTsN+k7LxZbtaqpSY81zUdqDbJ20xGPb1FaX71YLu8AvgV01bY2lZokhIgrrbGklG2WtWCEv/4qn9+YV+rCnPr6dUCiajBrIRnbXnKiWDy1PJm8NjEcnjXsDdqETk9rNGAIwT3h8MOLGho+SVtWsfaOq5733qRIZC3ZbDuwfyRkdioUojcUakzZ9scIgSFEFQJaEyiFrnz+zFhs4mjD+E5Uz2hNUSmyvv/TaNNkgm0/eqFc7gKUUSW0R6OLxoVCc7b39a32lRqyhZhaDAJcpfC0xq/AFGAKQVhKhpQiFwRcc11+cV0+Hxg415XPb54Xi8247LryN8/bBXjDOR1rmumCUh5w4ZtC4YmuwcHlBaUCRynyvk/e93G1Hu7g655Hj+fR53lc8/3g04GB/efL5ZXAO5aUvREpG6rlPAwxpbwqwK5svXOl0rvvX78+/Yrn9UghiEqJ1hpXKZxK2hTQXS4P7urv35YLgucrGvghiOeDoPSH6rpcLp9MmGY9MKaqtwc/FpXqaDBNEAJPaxylCCoRaa05kM/vBF4FzlblM6Vs7fX9y4BzE+T40NAhBUwOhx+qdDMAc2OxpSEh8IFcEOBqTalSZZaUtEejU4DhCtuQycxzlOJXzzsOlEb2icr5fld7Xd1CoHk4jUI86WtN1vMoa013uVwMtEYClhCMt+0HgEz1vKH12tOO0w0crU7om5rx7NBQZ4tlJWfW1b0EyPWp1BgBzf2ex2AQ8GUud3xfLvfcsWJxk6c1SikaQ6GYCTMA3spk5rswc082exg4NgyuhVxy3YGWUCh5fzT67GAQ/Dytrm5WSamOHxzH+WxgYHc2CF4D9vZ43hfnSqWv07a9KCJlxNM68lQyeSJmGEd29/WduuS6G4AzfzW/rGWJxMHVzc16Qzrd2x6NngZerk1hzWqZU1+/rzOZzG9ua9Pz4/HzwDMjB6TxJ47BmaGhD20pJ1pCzEiaZjAtGv3opOMcrZ1lAJvb2tqnRiILtBDjd/b1nTtcKGwCPqgKfjsvo5U0zYUP1tevmxIOTxhtmgjosYToN4WICyFaB32fk47TvSebPVzWegdwEHD/zhufANozlvVYg2FMjkjZUFSq1Ov7l6/cKNOjFZH7/40fCYMbE6H68jlAGQj436zfAQG0CPswQZ2wAAAAAElFTkSuQmCC'
            , rankName : 'Tribuni'
        }
    };
    
    this.memberList = function(){
        return members = $('#memberList').find('tbody').find('tr');
    };
    
    this.insertRankImage = function(){
        var members = this.memberList();
        var ranks = this.ranks;       
        $(members).each(function(){
            $(this).css('height','37px');
            var member = $(this).find('td:nth-child(4)');
            
            var newRank;
            var newImage;
            
            if($(member).text() == 'Líder'){
                newRank = ranks.leader.rankName;
                newImage = ranks.leader.image;
            }
            else if($(member).text() == 'Ministro del Interior'){
                newRank = ranks.minister.rankName;
                newImage = ranks.minister.image;
            }
            else if($(member).text() == 'Diplomático'){
                newRank = ranks.diplomatic.rankName;
                newImage = ranks.diplomatic.image;
            }
            else if($(member).text() == 'General'){
                newRank = ranks.general.rankName;
                newImage = ranks.general.image;
            }
            else if($(member).text() == ranks.rank1.rankName){
                newRank = ranks.rank1.rankName;
                newImage = ranks.rank1.image;
            }
            else if($(member).text() == ranks.rank2.rankName){
                newRank = ranks.rank2.rankName;
                newImage = ranks.rank2.image;
            }
            else if($(member).text() == ranks.rank3.rankName){
                newRank = ranks.rank3.rankName;
                newImage = ranks.rank3.image;
            }
            else if($(member).text() == ranks.rank4.rankName){
                newRank = ranks.rank4.rankName;
                newImage = ranks.rank4.image;
            }
            else if($(member).text() == ranks.rank5.rankName){
                newRank = ranks.rank5.rankName;
                newImage = ranks.rank5.image;
            }
            else if($(member).text() == ranks.rank6.rankName){
                newRank = ranks.rank6.rankName;
                newImage = ranks.rank6.image;
            }
            
            $(member).html(newRank);
            $(member).attr('style','background: transparent url("data:image/png;base64,'+newImage+'") no-repeat scroll right center;padding-right:37px;');
        });
    };
};

var ar = new Arranka();
ar.insertRankImage();

