// JavaScript Document
// ==UserScript==
// @name Ogame Redesign New Smilies
// @namespace http://userscripts.org/users/36331
// @description Ogame Redesign New Smilies
// @date 2010-05-19
// @creator Black Cat
// @include http://*.ogame.*/game/index.php?page=showmessage*
// @include http://*.ogame.*/game/index.php?page=writemessage*
// @include http://*.ogame.*/game/index.php?page=alliance*
// @exclude
// ==/UserScript==

// edit by vpascoal
// http://userscripts.org/users/166659

(function(){

	var smilies = new Array();

	smilies.push(new Array(":)","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAwFBMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD//5n/+4v/+or/+IP/"+
    "9Xv/8nL/8Gr/7mT/6lr/61v/51H/5Ur/40P/4T/+3jn/3TH/2yv/2Sf/1yH41zD51ir/1Rn/0xP1"+
    "0CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwTO"+
    "pwvOpABmZjNlXyllXCFlWRllWBQGwRrPAAAAQHRSTlMAEREREVVVVWZmZnd3d3f/////////////"+
    "////////////////////////////////////////////////////Z8jW7AAAAAlwSFlzAAAK8AAA"+
    "CvABQqw0mAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAADgSURB"+
    "VBiVPZDpUsMwDIQNDVdLAySxE98OuActR7nZkrTv/1aVCcP+0ze70qwYIx1NkDQdsT+dAJv53fwd"+
    "OBvABAtrjLEuvCBP4By3WkmptHFhjTHtwELLuhGNVMa1rxhRxqim6you+p0NkXJ40FJ0P0XJ+974"+
    "+AlGW2pe3lwVlZAUe9wyuESK64HE5TZ5pOBlWfFaWR+TZ2NVLzinY3ofZt9gl3BG9XUtCfi4pFvH"+
    "WDmrd6S9b2dvyBi7wMo7a50LCYxTjSme2xBCGwnkQ9VT4GN9//T1352xLP/9T56l4QC+cSG8sDMu"+
    "4AAAAABJRU5ErkJggg=="));

	smilies.push(new Array(":(","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAulBMVEX/"+
    "///XshTVrQrXqwDTsBjVrQrXqwDTsBjVrQrXqwDTsBjUrg/VrQrXqwD//5n/+4v/+IP/9Xv/83X/"+
    "8nL/8Gr/7mT/6lr/61v/51H/5Ur/40P/4T//3zn/3TH/2yv/2Sf/1yH41zD51ir/1Rn/0xP10CX9"+
    "zw/vzzD5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwTOpwtm"+
    "ZjNlXiZlWyBlWRplVxKqr4HDAAAAPnRSTlMAERERVVVVZmZmd3d3d///////////////////////"+
    "/////////////////////////////////////////8kZH4cAAAAJcEhZcwAACvAAAArwAUKsNJgA"+
    "AAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAA4ElEQVQYlT2Q2VaD"+
    "QBBER1GzGAyEGZitGXSymLjE3SLE//8tG+KxHu+p6u5qIVhnU/SaJeJPF8B+dbd6B65OYIqNd855"+
    "Ci9IezDCrTVaG+so7DDhGdhYXVaq0sZR84qEM85Usiik0saHyDk8WK3aNsvloXN1/ITgKaVs25us"+
    "YELNIxNissjmWaG0o7gePFrJPF/I0vg69p69N4wkL7MUlt8Q1yBndHfouiNb1rzrHFvyR8sH+p9m"+
    "+cb3iDG2NXlPFHow6WvM8NyEEJrIID1VvQQ+dvdPX//dhUjS4T/p8J9f9rIgces2Wi8AAAAASUVO"+
    "RK5CYII="));

	smilies.push(new Array(";)","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAvVBMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD//5n/+4v/+or/+IP/"+
    "9Xv/8nL/8Gr/7mT/613/6lr/51H/5Ur/40P/4T/+3jn/3TH/2yv/2Sf/1yH41zD51ir/1Rn/0xP1"+
    "0CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwTO"+
    "pwtmZjNlXytlXCFlWRllWBTLLF3oAAAAP3RSTlMAEREREVVVVWZmZnd3d3f/////////////////"+
    "//////////////////////////////////////////////8a9lBCAAAACXBIWXMAAArwAAAK8AFC"+
    "rDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAN9JREFUGJU9"+
    "kOlSwkAQhFeJoiArJtnsfUQDKHjgbUPg/R/LWbDsf/NV90z1MEY6GSNrMmB/OgPW87v5BzA8gjEW"+
    "3jnnQ3oFz+ACt9ZobawLaYUR7cDCaiWl1MaF9g0DyjjTi7reNv3Op45yeLS62W42leh7F7svMNqi"+
    "RHVzXdaNptgTkZBJOS1rSaS7P3i0FFVVC2V87LJn7U0vhWiktvs0+wG7QqBjSmkCkUKcnWIZvN2R"+
    "9rGdvaNg7BLLGLwPIWUwyjUmeGlTSm1HgB+rngOfq4fn7//ujBX88B9e5OEX0iAh1FJDXDEAAAAA"+
    "SUVORK5CYII="));

	smilies.push(new Array(":P","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAz1BMVEX/"+
    "///XshTVrQrXqwDTqADTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD//5n/+4v/+or/"+
    "+IP/9Xv/83X/8nL/8Gz/7mT/6lr/61v/51H/5Ur/40P/4kH+3jn/3TH/2yv/2Sf/1yH41zD51ir/"+
    "1Rn/0xP10CXvzzD9zw/5zhPxzCH0yxfqyy/2yAruyBrzxw/lxCfpwhjrwRHuwAfkvx3mvRLmuwrk"+
    "uAnktwTOpwtmZjNlXyllXihlWyBlWhplVxJlVQ//AABmAACnKUKjAAAARXRSTlMAERERETNVVVVm"+
    "ZmZ3d3d3////////////////////////////////////////////////////////////////////"+
    "//+CR8jIAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZp"+
    "cmV3b3JrcyA4tWjSeAAAAOdJREFUGJU9kOtygjAQhdNqr1pTC0ogIQlgUVvtxd57CgHi+z9Tk+L0"+
    "/Ntv9tuZs4S4HI3hMxmQQ06B3ep29Q6c92CMtZJSKZ2/gHpwgYUUnItU6nyLkbuBdcrjhCVcSF28"+
    "YuAcKZKqmkfMNCovnYeHlLPqJwij2sis/ATBIo2j8OY6mDPutEdHdBqzWTDtSXnnd6RhURjOolio"+
    "tvQ7OyVMXVV1bZo2X36DXEFLYazdW9tmTqLkGButmp4UyzecEHKJTaZba23nwcjXmOCpyLuuKx2g"+
    "fdUz4GN7//z1352QIf37Dx364RcG5Cbq10CabQAAAABJRU5ErkJggg=="));

	smilies.push(new Array(":nice:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAt1BMVEX/"+
    "///WtRDVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD/////+4v/+IP/9Xv/"+
    "8nH/8Gr/7mb/6lr/613/51H/5Ur/40P/3kL+3jn/3TH/2yv/2Sf62jT/1yH51ir41zD/1Rn/0xP1"+
    "0CX9zw/vzzD5zhPxzCH0yxfqyy/2yAruyBrzxw/lxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwTO"+
    "pwtlWRllWBQ7OR3WwDA+AAAAPXRSTlMAEREREVVVVWZmZnd3d3f/////////////////////////"+
    "////////////////////////////////////OEICLgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAB90"+
    "RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAADSSURBVBiVPZDpUgJBDISj"+
    "rKIgI8c6l5kdRxdE8MDbXnz/5zIBtX90Tb6aTlWHSHQwhGrUo18dAZvF9eIN6O/BEEvmS+aUn2EU"+
    "nOAqBu9DFLTGQHZgGb11zvnAqbygJxkO36JaLbeSw70+z//sAyRbrI4TtVQehKQdGU9mStpbITfR"+
    "u3o6ndU2cNPqnw0HQfWF83Gb51+gMyRB1noBjYQMHWKVOMau67ZNmb+iIjrFqknSIWUFA60xwmPJ"+
    "OZdWgNlXPQbe13dPn//diSqzu4+pdPgByyAkbui4xW8AAAAASUVORK5CYII="));	

	smilies.push(new Array(":D","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAA1VBMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD//////5n/+or/+IP/"+
    "9Xv/8nLr6+v/8Gz/7mT/613/6Vf/51H/5Un/40P/4T/+3jn/3TL/2yz/2Sf/1yH41zD51ir/1Rv/"+
    "0hL10CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx26urrmvRLmuwrk"+
    "uAnktwTOpwuLeyGLeBqLdBCLcwxmZjNlXyllXSZlWyBlWRllVQ9lUwhSeUxkAAAAR3RSTlMAERER"+
    "EVVVVWZmZnd3d3f/////////////////////////////////////////////////////////////"+
    "/////////////4CyhhwAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAfdEVYdFNvZnR3YXJlAE1hY3Jv"+
    "bWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAA5ElEQVQYlT2Q6VLCQBCER4kXSEYh5NosMSCCigeKeDQK"+
    "2Wzy/o/kLFh21fzor6anqodIdNCBU7dFfzoCFtPr6RtwsgcdzIZa62FevMB34BTjTKWpUjov5mjL"+
    "Dcyy1Jg4Tiqbj17RkoxWJgrK0CTKFhPJ4SFLoqDX64dxqq8mHyCMVRL2Ly96QeTIo5DcVuVWVJrK"+
    "1j+3bscOmLfMbJgHjdtZrFfMpZCKebX5Ap0jX+8cW2YJ+XSI+2/rnEzdLOERnQmqHakdaLsaXTyP"+
    "alFzs9z3IjoG3ud3T5//3Yk8f/cf33PmFze+Jo/YnJCUAAAAAElFTkSuQmCC"));

	smilies.push(new Array(";(","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAw1BMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD/////83X/8Gr/7mb/"+
    "613/6Vf/51H/5Umq6///40P/4kH/3zn/3TH/2yv62jT/1yH51ir41zD/1Rn/0xP10CXvzzD9zw/5"+
    "zhPxzCH0yxfqyy/2yArzxw/uyBpb1//lxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwQ+yPTOpwtm"+
    "ZjNlZDplXyllXSZlXCFlWRplVxJlUwj1G6ziAAAAQXRSTlMAEREREVVVVWZmZnd3d3f/////////"+
    "/////////////////////////////////////////////////////////1bbZoUAAAAJcEhZcwAA"+
    "CvAAAArwAUKsNJgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAA"+
    "4UlEQVQYlT2Q6VICMRCER1hPJBHZK5sluoCCByhe2yG7ie//VE7EsqvyY77qTvUMEetohKjxkP50"+
    "DGwXN4s34PQARlhW3vsQzAtEBGeYKS9lL2Uwa1zwH1iWPMlORvSKIWcUA+dcF10N5/AQLdZa10Xy"+
    "AcIs74tiv2dSFME8MtFlv2nb1vLbhOaOya3KOmftleu9r5vo2VZ5Op1MrqdZqc38C3QJrfIsTdOs"+
    "rGoOCRpgpblyXiouPd8hocE5VkFXIYTafO9iZ6Ixnk1Uww5xWPUEeF/fP33+706UiN/7iCQOP49p"+
    "JZU6SzyTAAAAAElFTkSuQmCC"));

	smilies.push(new Array(":rolleyes:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAw1BMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD//////5n/+4v/+IP/"+
    "9Xv/8nL/8Gr/7mb/6lr/613/51H/5Un/40P/4T//4Dr/3TH/2yv62jT/1yH51ir41zD/1Rn/0xP1"+
    "0CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwTO"+
    "pwtmZjNlXytlXidlWyBlWRllVxNlVQ9mnBHFAAAAQXRSTlMAEREREVVVVWZmZnd3d3f/////////"+
    "/////////////////////////////////////////////////////////1bbZoUAAAAJcEhZcwAA"+
    "CvAAAArwAUKsNJgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAA"+
    "5ElEQVQYlT2Q61LCMBBGo9QbSKO9kKZpUioBEbzg3a82ad//qdyAw/mxM3tmdzNfGCNOJghMR+yf"+
    "M2C3ult9ABcHMcG995XW/fCKOIhLzL1zrvS+H7YY0w2a4K7jHXeeD28Y0U7lOPEbymBpD49Kdpy3"+
    "KSlf2y8wzEuRt+1NknWuMs0TGaPELE1uk6yQlbFrMgslizxNs1yUurZhZqdLV+T5rJCqb5Y/YNcw"+
    "VemEkFLR4TW9dYqN0coTfd0s3xExdoVNbbQ2Zi/GIcYUL03AkogPUc+Bz+3D8/cxO2NRvP+fOArN"+
    "H/MIJC1WhC7VAAAAAElFTkSuQmCC"));

	smilies.push(new Array(":thumbup:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABoAAAARCAMAAAD0U0w/AAAAA3NCSVQICAjb4U/gAAAAxlBMVEX/"+
    "///WtRDVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqACZcwr/////+4v/+IP/"+
    "9Xv+8nL/8Gr/7mb96l//6lr/613/51H/5Ur/40P/4T774Uf+3jn/3TH63Tv/2yv/2Sf62jT/1yH5"+
    "1ir41zD/1Rn/0xP10CXvzzD9zw/5zhPxzCH0yxfqyy/2yAruyBrzxw/lxCfpwhjrwRHuwAfkvx3m"+
    "vRLmuwrkuAnktwTOpwuZcwplWRllWBQ7OR1/MgreAAAAQnRSTlMAEREREVVVVWZmZnd3d3fu////"+
    "//////////////////////////////////////////////////////////////+9Tl6hAAAACXBI"+
    "WXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjS"+
    "eAAAARVJREFUGJVdkWlTAjEMhqviBbKrsEe3B61bVxdQ8MDbZPH//ymTIs7I+yGdyTPJmyZCkPYG"+
    "wBoeiF0dAqxm17M3gOMdMoC5s9Y6H54h2aRSTPk5gSujldLG+rCE/oZcIvvA3ChZlZXS1jcvwH44"+
    "mWBsZ/U3KecQWm6ZolKM4J5z59vwAURkGb3ISXJ+xME3DyCIFMgMfEQXo4xRe0uISJYRgxujynw8"+
    "znKpXd1yVZnjKMtRwMppYnlRKbMO069tVYHiDLzVSkpFpKZ+CXshS+zDwjtjuq5b1830FXoCFWJZ"+
    "Shr/FBa1d877wKTPH45FPP4QHpsQQtMSSeKaaBtxHUIcAbwv754+/zaf/haRekm8V9L7d5EfGdY1"+
    "s2cfbHAAAAAASUVORK5CYII="));

	smilies.push(new Array("X(","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAxlBMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD//////5n/+IP/9Xv/"+
    "83X/8nL/8Gr/7WL/6lr/613/51H/5Ur/40P/4kL/3zn/3TH/2yv/2Sf62jT/1yH51ir41zD/1Rn/"+
    "0xP10CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnk"+
    "twTOpwtmZjNlXyllXSZlWyBlWRllVxJlVQ7hcj+NAAAAQnRSTlMAEREREVVVVWZmZnd3d3f/////"+
    "//////////////////////////////////////////////////////////////9ihKzJAAAACXBI"+
    "WXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjS"+
    "eAAAAOVJREFUGJU90OlWwyAQBWC0cWttamI2IBAaTRdbl7p7aSC+/0s5WI/3H9+ZgXNhjHI0Qch0"+
    "xP5yAuyWN8s34OwAE6yUqpXS5hlxgHPMa+G4kF6bLcZ0B1ael1VfOaH09wtGtKNEn2fZvuBiMB3t"+
    "4V66mU2SNK/cbOg+wDAPYq+SrCdpH0i0dHtrbWJ754duTXJb8yJP0+u8FKrpwsxOCaK8qLjUZvEF"+
    "dglNVJacSxpZ01vH2GhVS++9atrFKyLGLrBp9KC0HgKMQ40pnlpjTNsRxIeqp8D79u7x8787Y1H8"+
    "+z9xFA4/sVUkceW3vYMAAAAASUVORK5CYII="));

	smilies.push(new Array("8|","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAt1BMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD/////8nH/8Gr/7mb/"+
    "6lr/613/51H/5Un/40P/4kL/3zn/3TH/2yv62jT/1yH51ir41zD/1Rn/0xP10CXvzzD9zw/5zhPx"+
    "zCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwTOpwtmZjNlXyllXSZl"+
    "XCFlWRllVxJlVhCoNhrdAAAAPXRSTlMAEREREVVVVWZmZnd3d3f/////////////////////////"+
    "////////////////////////////////////OEICLgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAB90"+
    "RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAADWSURBVBiVPZDpUsMwDIQF"+
    "DVdLk6aJ7dipwb05ys2mdcL7PxdSwrAz+qFvVtKsiFhnE4imI/rTBXBY3a3egasBTLC2trLW+Rek"+
    "Aq6xqGKMWjPaY8w7sDYxy7KTim3nXzHiGSuAEddP4Dk89JasEdSFTxAWevA0XJ1/ZOJMcRQwO8XW"+
    "hQ2T+0qVx6aZ5YW2dRDPwWpV5vm8VMb55TfoFo5RUShl2LLhW+fYOVtpbdqu9ss3JEQ32NWOM7ge"+
    "jCXGFM9eFBikQ9RL4GO/ffr6z06UpP1/0kSaX+EbH4v5Ul+5AAAAAElFTkSuQmCC"));
	
	smilies.push(new Array("?(","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAMAAAArvOYAAAAAA3NCSVQICAjb4U/gAAAA0lBMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD/////+r3/97T/+IP/"+
    "9az/8qX/9Xv/8J//83X/8nL/8Gr/7mT/61v/6Vf/51H/5Ur/40P/4T//3zn/3TH/2yv/2Sf/1yH4"+
    "1zD51ir/1Rn/0xP10CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3m"+
    "vRLmuwrkuAnktwTOpwtmZmZmZjNlZDplXytlXSZlXCFlWRhlVxPu5Mm3AAAARnRSTlMAEREREVVV"+
    "VWZmZnd3d3f/////////////////////////////////////////////////////////////////"+
    "////////2IunTAAAAAlwSFlzAAAK8AAACvABQqw0mAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRp"+
    "YSBGaXJld29ya3MgOLVo0ngAAAD+SURBVBiVjZBpT8MwDIYNK9fGmnXAWNPcTaA72DjGjXe06///"+
    "SySbQID2AUux5Uevbb0BAJjDrxTK/GcC2C36A3bEfzSw18IQ7cYXOECcDa+HL4hHW9DCkVZKaWMf"+
    "MQ7gGK+k4FzIdW2n2PQ7cCR5VZYZE6p2T9jwM0pkab+fUia0Lfwc3kpGyWJxsSqJyos3BL+FJWS5"+
    "7HrSM+7OExMIIV3/eqYYbzScJp3OZXJ2rvMiaGZaMJqmNOPS2MEHwikaJTirqkp6ydjf2seJ0XIt"+
    "pKpzN3jGCOAEJ7nR2hgbQDPYaOODs9a6woN4a/UQ8XV6c//+7R0gijf/E0eh+QSBOyk/YNDjhwAA"+
    "AABJRU5ErkJggg=="));
				 
	smilies.push(new Array("8o","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAz1BMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAALCQAAAAD//////5n/"+
    "+4v/+IP/9Xv/9Hf/8nL/72j/6Vf/6FT/40P/4kH/4Dr/3TH/2yv/1yH41zD51ir/1Rn/0xPw0TL1"+
    "0CX9zw/5zhPxzCHqyy/2yArzxw/uyBroxyfrwRHuwAfmvRLmuwrkuAnktwTOpwtmZjNlXyllXSZl"+
    "WyBlWhplVxJlVQ5hVRX/ICBhUApbThBcTQpURw5TRQguIwuWCvp4AAAARXRSTlMAEREREVVVVWZm"+
    "Znd3d3eZmf//////////////////////////////////////////////////////////////////"+
    "//+7Bq24AAAACXBIWXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZp"+
    "cmV3b3JrcyA4tWjSeAAAANdJREFUGJU1kNtWwjAQRUetoiCh0SIIbagGQQTvnrRJsIDy/99kpsX9"+
    "MGtl55yHGSKiuNcB0+3FVBOf4mc7u5/tftFqVAffUrrMS7mDYHHOQkrLY4M20REenJRl49avOAmd"+
    "rP4ueHgdengaj0LC9INyE/0Bwt34dmjMVTIobaryZTAqmJvkOhkMR6nSc86ktiyMMUVpndececnc"+
    "/p/19At0CZXZg/ChJOgYCxVSVVXtfT59Q0R0gcVEeYZFm9fo4jlndBCiWf4MeF89rj6BFh2IRH0f"+
    "EfHjD1c0JsGC/bZuAAAAAElFTkSuQmCC"));

	smilies.push(new Array(":evil:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAxlBMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD/+4v/+IP/9Xv/8nL/"+
    "8Gr/7mT/613/6lr/51H/5Ur/40P/4T//3zn/3TH/2yv/2Sf62jT/1yH51ir41zD/1Rn/0xP10CXv"+
    "zzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwTOpwtm"+
    "ZjNlZDplXyllXiZlWyBlWhxlVxJlVQ1lVQzRtSBMAAAAQnRSTlMAEREREVVVVWZmZnd3d3f/////"+
    "//////////////////////////////////////////////////////////////9ihKzJAAAACXBI"+
    "WXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjS"+
    "eAAAAOVJREFUGJU9kOlWwkAMhUepoiC17XQms6RDtSyCC+4Gihbf/6XMAMf7L9/JTXIjBOtkSFGj"+
    "njjqjGg1vZm+EfUPYEgz75zzGJ4pjeCCxtYAGOswLGnAM2hmQSulwDisX6jHHme2bVHIEn660LCP"+
    "7i2U7TrL5fbbVc0HCZ6i5XqzyVomWD8wQSZFdp0VChw2cya3FpTM80Jq46sm9qy8YSRLBRZ3ky8S"+
    "V4TOgNYA1ne/c951Sgv01vKBvttNXikR4pIWFXqPuAeDGGNET3UIoW4YpIeo50Tvy7vHz//sQiTp"+
    "/j9pEos/amEhCNVGSxcAAAAASUVORK5CYII="));
	
	smilies.push(new Array(":thumbdown:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABwAAAARCAMAAAD5TTx4AAAAA3NCSVQICAjb4U/gAAAA1VBMVEX/"+
    "///WtRDVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqACZcwr//5n/+4v/+or/"+
    "+IP/9Xv/83X/8nL/8Gr/7WL/6lr96l//61v/51H/5Ur/40P74Uf/3zn730L/3TH63Tv/2yv/2Sf6"+
    "2jT/1yH51ir41zD/1Rn/0xP10CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHu"+
    "wAfkvx3mvRLmuwrkuAnktwTOpwuZcwpmZjNlXyllXidlWx9lWRplWBSeNQAJAAAAR3RSTlMAERER"+
    "EVVVVWZmZnd3d3fu////////////////////////////////////////////////////////////"+
    "/////////////58HrvoAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAfdEVYdFNvZnR3YXJlAE1hY3Jv"+
    "bWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAABK0lEQVQYlWXRa1cCIRAGYEq7aa6Vu8uCgITi1npJu9i9"+
    "Gdf0//+kgF07p9N8g+cMDC+E/K2DNvjqNMj/OgJYTW+mbwAnYd1FxG5tbZhprbQ29hkiv4Hj4bDm"+
    "UxgrKYRUTpfQqhoRr9HfBzMlGM/6QmqTv0CD4EAKRInhUC37NE1p5tQW7uDQyJlHuFdiU67Xcbn5"+
    "3o6KDyDIOEXKA44VK+Ori16ZCWXyB4ecppjSgEYxmvQue6nHYg5uIJpgUuGtEhmN44QyqUeF6/Tj"+
    "JnXnSkun1I2rjJ18QUiB0vDOczBOGRNCucZ5iAE5rzI4hIXR261UzvLJKzQ9CoFVemewGBm92xnr"+
    "rRXyG/xm24Gn3FqbF86iOvm9EXIM8L68e/zc/8rfakbhPyN/H/kBRAQ0FMRQi4AAAAAASUVORK5C"+
    "YII="));
	
	smilies.push(new Array(":thumbsup:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAACcAAAARCAMAAABpXkW3AAAAA3NCSVQICAjb4U/gAAAA5FBMVEX/"+
    "///WtRDVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqACZcwr//////5n/+or/"+
    "+IP/9Xv/8nLr6+v/8Gz/7mT96l//613/51H86Fj/5Un/40P74Uf730L+3jn/3TL63Tv/2yz/2Sf/"+
    "1yH41zD51ir/1Rv/1hD10CX9zw/vzzD5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfk"+
    "vx26urrmvRLmuwrkuAnktwTOpwuLeyGLeBqZcwqLdBCLcwxmZjNlXyllXSZlWyBlWRllVQ9lUwje"+
    "tui4AAAATHRSTlMAEREREVVVVWZmZnd3d3fu////////////////////////////////////////"+
    "////////////////////////////////////////jlu26AAAAAlwSFlzAAAK8AAACvABQqw0mAAA"+
    "AB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAFhSURBVCiRbZKJUsJA"+
    "DIaL4AVCV9vSlu1hyyUiigeKeASj9OL938fstrSOwz/TmZ38X5NNsoqiqKgqpWotEGrXq9DOx34F"+
    "HgIsplfTV4DjCutjzvk+FrEWzILAC4Jw+AydIlbayHmR8ATGnsu56xI4h2aRjuziZNsSrMHM43Fs"+
    "95wkDUcvUJemk5t0QtOyUVYN3NgyIjN23HQ4kZUJs1CAKloGGpbg4N7jlqFputnjwWDyDoIjTDcI"+
    "RNvUUTclN3YdU7841wyLe4PJQ86ZqAmbfijzhWkSbUhRnKTZ902Vj2wUyu8H47TL2IYxFjPW3eb5"+
    "qA0hmoo4OZJbrFeMRcQljK1+PiXHkcZBtipxV3BnEK4lw1LGqKzs15c+NYyXNHA5ogO4+0oFQ1+2"+
    "XUIjn5qfL0TNcaFTAjPBZQJr7vaLfx+KVBueRhlpe70s97tXRwBv89vHjz/vZb8aHfn+Oo1/8V/p"+
    "2UfQfZLdcQAAAABJRU5ErkJggg=="));
	
	
	
	smilies.push(new Array(":sleeping:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABoAAAARCAMAAAD0U0w/AAAAA3NCSVQICAjb4U/gAAAAxlBMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD//5n/+4v/+or/+IP/"+
    "9Xv/83X/8nL/8Gr/7mT/613/6lr/51H/5Ur/40P/4T//3zn/3TH/2yv/2Sf/1yH41zD51ir/1Rn/"+
    "0xP10CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnk"+
    "twTOpwtmZmZmZjNlXidlWx9lWBVlVhBlVxJwpB0YAAAAQnRSTlMAEREREVVVVWZmZnd3d3f/////"+
    "//////////////////////////////////////////////////////////////9ihKzJAAAACXBI"+
    "WXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjS"+
    "eAAAAP1JREFUGJVVkel2gjAQRmOlm1bagoQw2QiKS7WL3TtCl/d/qQ4cQbg/cnJyz3yTSRgjBmOs"+
    "mAzZgT1Rb04Rd8v58g3xnLWyXse4MlprY90z+j1zgTMlAaTS1m1xVKUdAge4UpAIIUBqm73gsCmp"+
    "4rQseVTwEuSPyymyMQzvFcRFEYS8/NZp/oFs3zjqlPDw9jqIYqDEB2wvydCSmgY3QSRI5euumikQ"+
    "PAynPJEmzXtVOyPJ8ViAsm7x1VFXaLWEJAFQVLRuhyZOcGONUjSx+csWr+gdFbvETWqNsfa3MiPW"+
    "ZYJPmXMuy8n4rM8Z4vv27vGz+/INnl//l+/1Tv8BpFwlQT+ZqMwAAAAASUVORK5CYII="));
	
	smilies.push(new Array(":whistling:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAz1BMVEX/"+
    "///XshTXrQfXqwDTqADTsBjTqADOpwvTsBjTqADOpwvTsBjUrg/TqADOpwv/////+4v/+IP/9Xv/"+
    "83X/8nH/8Gr/7mb/6lr/613/51H/5Un/40P/3zn/3TH/2yv62jT/1yH51ir41zD/1Rn/0hL10CXv"+
    "zzD/zhD5zhPxzCH0zBjqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAncswrXrQfO"+
    "pwvOpACxlRWLdRJmZjNlZDplXyllXSZlXCFlWRllVxJlVhCBBeAyAAAARXRSTlMAEREREVVVVWZm"+
    "Znd3d3f/////////////////////////////////////////////////////////////////////"+
    "//+J5uZxAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZp"+
    "cmV3b3JrcyA4tWjSeAAAAORJREFUGJU9kOtSwjAQhVfBK5YIWtrcSjSAgiLe7VFqm8L7P5MbdPx+"+
    "ZGa/ydmZs0TMXg+Rfof+OABW06vpC3D4K3qYGaONse4RSRTHGOsQpFLtxi1wwjswY9E0eQisntDh"+
    "jAmirkUtQiu2nnO400EwVXw2/g2EscpqIb4HrFrr7tlYnY2q6nxw2QRt/Q2bay3zdDi8SDNlCh//"+
    "rIxilY5yqa1zJegMllWWSalN8bX+AO1jbo1WSrNw6+3ik+gU88JyB1u4CadKrtHHg4v4yTNQ7qoe"+
    "Aa/L2+X7f3eibrK7T9KNww/lwCSDp9okLAAAAABJRU5ErkJggg=="));
	

	
	smilies.push(new Array("^^","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAwFBMVEX/"+
    "///XshTVrQrXqwDTqADTsBjVrQrTqADTsBjVrQrTqADTsBjUrg/VrQrTqAD//5n/+4v/+or/+IP/"+
    "9Xv/8nL/8Gr/7WH/6lr/61v/51H/5Un/40P/4T/+3jn/3TH/2yv/2Sf/1yH41zD51ir/1Rn/0xP1"+
    "0CXvzzD9zw/5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrkuAnktwTO"+
    "pwtmZjNlXyllXidlXCFlWRllWBQ6XzhpAAAAQHRSTlMAEREREVVVVWZmZnd3d3f/////////////"+
    "////////////////////////////////////////////////////Z8jW7AAAAAlwSFlzAAAK8AAA"+
    "CvABQqw0mAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAADhSURB"+
    "VBiVPZDZUsJAEEVHiRtI1CSTpGfLBAMouODuNQv//1f0GMvz1qf6dtVtIZijGQLzifjjBNitblfv"+
    "wNkoZlhbY4x1/gVxEOdYaEWklHF+iynfwFpT0eUl9cbVr5hwxqiyzVrZ0WB9wzk8aOqy5CdtSxqq"+
    "5hMCC1XI9OYqyXLi2CMbp9kk16Np7sKOplymaSYLZasm7Oys6nMpZUl675ffEJdwRvVFQSwqDsXi"+
    "GBtn9cDsq3r5hkiIC2wqZ61zPohpqDHHc+29rxsW8Vj1FPjY3j99/XcXIop//xNHYTgA9g8h+dN9"+
    "TEAAAAAASUVORK5CYII="));
	
	smilies.push(new Array(":evilgrin:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAA2FBMVEX/"+
    "///XshTVrQrXqwDVqQDTsBjVqQDTsBjVrQrVqQDTsBjSrRHVrQrVqQD//////ZP/+or/+IP/9Xvr"+
    "6+v/8nL/8Gz/7WL/613/6Vf/51H/5Ur/40P/4T/+3jn/3TL/1yH41zD51ir/1Rv/0hL10CX9zw/v"+
    "zzD5zhPxzCH0yxfqyy/2yArzxw/uyBroxyfpwhjrwRHuwAe6urrmvRLmuwrkuAnktwTOpguLeyGL"+
    "eBqLdBCLcwxlYzdlYjJlXyllXSZlWyBlWRllVxJlVQ9lUwhbThBaTAxRQgQpEg3WAAAASHRSTlMA"+
    "EREREVVVZmZmd3d3d///////////////////////////////////////////////////////////"+
    "//////////////////8u4sMDAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBN"+
    "YWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAORJREFUGJU9kOlSwjAUha9SQZZckKVQGgtWRHEH"+
    "l4NK0qSt8v5vZFIcv3/nm5PMnEvkOGrD06nRHyfA9+Ji8QPUD6K1X55LK/Nk9rQXXjQwt9MoMrFM"+
    "ihWa7g8sLWfjcDyZWi6eUaMWpGGth6PQOJNCEG5jk2ml+jozNk9fQZjHk1G/1z0bhpFM0jtnEmu0"+
    "2u1U1fm88h07YFbMnDEPSt953G6YtTOGefP1Dmoj2VaJLbN7JOgYNx/WJ865KNcIiE6dynNnCi+a"+
    "fkYHD7PCUV6uIQ5T68DL6vr+7X87USCq+4jAh183CCcSYHoznwAAAABJRU5ErkJggg=="));

	smilies.push(new Array(":chinese:","data:image/png;base64,"+
    "iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAA3NCSVQICAjb4U/gAAAAw1BMVEX/"+
    "///XshTVrQrXqwDVqQDTsBjVqQDTsBjVrQrVqQDTsBjSrRHVrQrVqQD//////ZP/+4v/+or/+IP/"+
    "9Xv/83P/8nL/8Gz/7mT/613/6Vf/51H/5Ur/40P/4T//3zn/3TH/2yv/2Sf62jT/1yH51ir41zD/"+
    "1Rn/0xP10CX9zw/vzzD5zhPxzCH0yxfqyy/2yArzxw/uyBrlxCfpwhjrwRHuwAfkvx3mvRLmuwrk"+
    "uAnktwTOpgtlYTFlXyllXihlWyBlWRkI8MDyAAAAQXRSTlMAEREREVVVZmZmd3d3d///////////"+
    "/////////////////////////////////////////////////////////zcgRzwAAAAJcEhZcwAA"+
    "CxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAA"+
    "5klEQVQYlT2Q6VLDMAyEDQ2F0iZAQhrfigmkBy1HuVFc+/2fCpky7D99syvNijHS0RSTZiP2pxPE"+
    "3fJ2+Y44PoBzXFtjjAX3gnkCp3ijlZRKG3BbnNAOXGspOOdCGehecUQZo/be1/MmxOh6yuGDFs11"+
    "OVSeS9P2n8hoi5hXVxdl3UiKPRIBLXxVXpY1lxH6FZE7LbkfhsGHYNs+eXZWCe6LfRE0uMU3simC"+
    "UTIUoYhkWdGtY9yA1TGp7RZvmDF2hpsWrAVwCUxSjRk+d865rieQH6qOET+2909f/90Zy/Lf/+RZ"+
    "Gn4ANockX66zUJgAAAAASUVORK5CYII="));

	smilies.push(new Array(":dash:","data:image/gif;base64,"+
    "R0lGODlhHAAYAPeWAP/hPvzoWfvfQ//pVv/jRP/////ZJv/mT//fOP/nUv/hQP/nUP/sYf/rXv/k"+
    "R//WHf/cL//bLf/XIP/gO//vaP/jRv/iQv/mTf/xbv/eNf/yc//cMWZYFP/qWf/bLP/XIv/lSmZZ"+
    "Fv/tYv/3gOq9Bu/PMfDRM+nDGf/tY/3PD//dM//TFv7YJv/lTPTLGGZdI//1fP/vav/SEv/TFPvN"+
    "Df/aK//VHOS5Cf/qW+7BB//rXP/fOv/ZKOTAHvbICvXQJvbXNmZdIv/1ev/XIf/5h//kSPXIDOvC"+
    "Ef/sYP/TFf/VGuXFKOS4BOa8Cv/ycv/aKe/CCP/WHv7eOv/VG//cMP7TGf/lS/PHD//xcP/0ef/6"+
    "i//0eP/vaf/uZWZgKmZbHPraNf/zdOrLMGZXD//kSfnOFFxMB//pV//YJf/zdv/gPf/uZ//hP//w"+
    "a//pWP/wbfTKFPTSLOa+Ev/9lP7dNf/4g//3gv/4hP/7jPnWK2ZbHWBSDmZdIWZcHmZaGWZcIGZh"+
    "Lv/eN+jHKPHMImZYEv/oU//iQ2NWFGZkOGZeJPjXMV9QC2ZfKO7IG//dMmZbG2ZgLf70eJp0Cs6n"+
    "C/9tAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEA"+
    "AAAh+QQJGQCWACwAAAAAHAAYAAAI/wAtVRo40JLBgwgTKjRYiZLDSgsjRmz4UKJFhBQpQbx4MeNG"+
    "jhIJFrQ4qWTJhR4lllwSJ8+PHicxOtQYcVIJKQDYqEFAhcWJSTIrKpwExAKIAwsuOACgwoALoAxn"+
    "fjw4yQSBBR2QMGgwwAqADR+OQE2ZcBKACzooQNLwBsWAIgh4VBkrsqyYR0EYARpRBwaGBgcARLDR"+
    "BChZqmAcuOEiBNGcOxpEJFAAIYoRw1LL0qlwhsIWInjsOGGwgPIDGpgpSVrN2tIkRRYSMMCQBUaa"+
    "GDhaTKgxxQdmSZGCBw8gaZKgCWQGMODSZk2DBAQyGFjBJDXr4QKKc/DTh8+LDgMOVGTY4eFBCrrA"+
    "hQfPPqmAe/d6KihAEGHIDBJjHV6PFCC76z2EcBBCIBls8IQESUABlUCqCRdAf5JQ1cgHBhiAhgRK"+
    "yJDDggyqxtpqZU0iBxxlXHFDTAcdVpNJHKaYGUgh1QXjQgEBACH5BAkKAJYALAAAAAAcABgAAAj/"+
    "ACsJFGipoMGDCBMWrESpYSWFECEydBix4sGJlB5atIhR48aIAwl+BNkwI8JJKEda6mgQ5ZIfPVJu"+
    "ZGlpUgkpABBQYXFi0sySDycBsQDigAMAKgy48Fmx4yQTBBZ0QDLACoANH44wlRhyEoALOihgQTGg"+
    "CAIeVbYq7CiGQJAuYUZgaHAAQAQbTdQi7AjGwQsvQrRoEJFAAYQoRvRebCipseMtRJwwWGD4AQ3F"+
    "BhlKisSZcwBJWWLgaDGhxhQfmBcybuxZgKQGCQhkMLCCSeqVlTZ35uz6T4UdHh6kuL1yte4ArguE"+
    "iDBkBgnimjsHQC6pAIcnEpJAIV6ckmPHBcZIGFAiIwf37iYLojRz5YZMjkBPvp8ZUiXEgAAh+QQJ"+
    "CgCWACwAAAAAHAAYAAAI/wAtVRo40JLBgwgTKjRYiZLDSgsjRmz4UKJFhBQpQbx4MeNGjhIJFgQZ"+
    "0qFGhJNSkmRocmPKJT96qATp0dKkElIAIKDC4sQkmi0nAbEA4oADACoMuPjZsaUJAgs6IBlgBcCG"+
    "D0eYhhQJ4IIOClhQDCiCgEcVrRNbEgjSJcwIDA0OAIhgowlahR4dvPAiRIsGEQkUQIhi5G5CipIS"+
    "KybihMECwQ9oGMZISVKky5cDSIqBo8WEGlN8TD6IOHFmAZISEMhgYAWT0QwrWcZ8GXWFHR4epIDN"+
    "srLpSAFQh4gwZAYJ3gIrYw4QXBKHJxKSQEGe3LdiSWMkKJGRg3r1kzYnmQ+5cmMmx5oHU3onLXLl"+
    "woAAIfkEBQoAlgAsAAAAABwAGAAACP8ALVUaONCSwYMIEyo0WImSw0oLI0Zs+FCiRYQUKUG8eDHj"+
    "Ro4SCRaMOKlkyZAONS4suSROnh89Tir0qHBSCSkA2KhBQIXFiUkzU340OAmIBRAHFlxwAECFARdA"+
    "MQpFOMkEgQUdkDBoMMAKgA0fjkRlOPXgJAAXdFDAouENigFFEPCoMlagSLNiCATpEmZEHRgYGhwA"+
    "EMFGk7E0iYJx8MKLEC1z7mgQkUABhChGEJe1NInOlzMUthDBY8cJgwWWH9DQTEmS69eHLCRggCEL"+
    "jDQxcLSYUGOKD82SIgkXHkDSBDIDGHBps6ZBAgIZDKxgwvo1cQGSAIAo5CbRgAMVdnhieJCi7sDg"+
    "w4VjdzTB0JcCXxQgiDBkBgnzDq1HCoB9kAcOBYSQwQZPSJAEFHUJ1NpwAfAnCWeLFDCGAWhIoIQM"+
    "OSSoYGuvuWbWJHLAUcYVN8iUUGIrmaThQSiCtJBIQ7mIUEAAOw=="));

	smilies.push(new Array(":rofl:","data:image/gif;base64,"+
    "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"+
    "0pM3k3oQylXoi29GWATQScSDWTVBAAA7"));
	
	smilies.push(new Array(":inibido:","data:image/gif;base64,"+
    "R0lGODlhGQAZAPcCAEAUEFVACP////raEP/mIP/iHP+6XfrWDP/eGP/SRPbKAPahLG1MBHFVBFlA"+
    "CP+uZf+2Yf+hWf/GSP9lUP91Wf+ZbbKNAPbGAPqNQP/KTPK2AP/aFP/GTP/OSP/CVfK+AHVdDPZ5"+
    "OEA0EPrSBK6BBPKFJL48JP+Faf/CNP++UP+uYfrOBP+ySN51GP9tVf+uQP+JXf++Wf+hZf+qaf+J"+
    "af/COP+RZf++OP+BWcKNAP+lbaVxBKVEHPbCAP+2UP9MOP+VVfKlFK5dENauAP99VeJMLPKhGPZt"+
    "POqNDP9ZQMo8LMqlAJ19BPahMPKVHPJlLNZ9DP9xXfqVRP/OPPplRP9pUO5xJNJEKNJ1DK6JBPKB"+
    "LO51JP+6QO66AK5IHP+2Wf9VPLJhEOpQKPKhHPp1ROqRDP9ZRM5ELNalAKp1BPqhNPaVJPZlOJlx"+
    "BLo4KP9xUP+hafp5QP+JYe6yAPaJOPaZJO6qAKVpBP+JTOadAPLCAN6VAM6NAP9lSPLGAOqqAOqh"+
    "AP+ZceaZAOKVALp1AJVhBN6uAOalAO6uAM6FAMqFAJlpBN62AAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEA"+
    "AAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh/iFEZXNpZ24gYnkgQWl3YW4gKGFp"+
    "d2FuQHlhbmRleC5ydSkAIfkEBWQAjQAsAAAAABkAGQAACP4AGwkcSLCgwYMIGwVYyDAhwgANsgy5"+
    "cAENiQYBHBIMwGTFgQEDDoxQ0KVNRo0OlhzYgKBAAQQIDij4kMOBwwAWDiAAwJMATwAKFGhIc/Jg"+
    "gxU7BSgFoFQAgAM9/jB4mJNp06tOFczZUXQjowE/l/JcKpRP14EB/IAd65QtUA17zgpMe6DATwA+"+
    "fw7QGvdgAEMjWhIYTJhAyB52EslVSELBAJeFCRTYMBPQncWNGnxQoLOA5JeTP/wRNPUhic0jQCII"+
    "CUAPojyXHTrIoUFP0J8a7OQhZFNjgEWH5mjQMMcOoEGFMBsMwGAHnzyCFN1hoPwhw4Uas2vfzr27"+
    "9+/gwwMLDAgAIfkEBRQAjQAsCQAFAAsABgAACC0AGzUqQKBAo4IDBA4kSJBAwQ0LC0p0OCBhQwIH"+
    "KQ4UCAAAxkYdEQyUmJFAwoAAIfkEBTwAjQAsCQAFAAsABgAACCQAGzUCQHBgQYEABChMuHCgwocQ"+
    "ARhUOFHAQIENGzUkWJCjxIAAIfkEBQ8AjQAsCAAIAA8ACgAACGcADTQaSLDgQIECDRo08KARiikK"+
    "CSYwUKcFixQGEhRMwJEhnUYRVEAwkJFjxwd44jSCUUEHBA8ZEnTwAAGOnDcET1SYYUBChwwxGtmg"+
    "MKEgDRkLFhCMgMNFxKQ1bryQEiLiwKRJFQYEACH5BAXIAI0ALAcABgAQAAwAAAihABsZaNQIAACC"+
    "BgkSHChQoUOHBh40eoCikQABCi8qNFCnRRMWFjES1EjwAZ0tGCKocJjA4QM8cZ4cgVFBBwQPGRJ0"+
    "8AABjpw3VMScoXAi0IxGEjpkiPHABoUJSUw0mhCFhowvHDJI8BEBhwszPwgqqUIEyAIuNW68aBSi"+
    "DxipBIuQwaDGYYkQbK489KJlzZggRpyUsMLjocIwUMogwSLkYUAAIfkEBRQAjQAsCQAFAAsABgAA"+
    "CDYAGzUqQKBAo4IDBA4kSJBAwQ2NEjAs6JDAhoQJKh4kkCBhCgAgARAICcBAIwgGDCSImCCByYAA"+
    "IfkEBTwAjQAsCQAFAAsABgAACCQAGzUCQHBgQYEEAQhIuHCggIcQIQJoFJEiRIcSI05MuDFho4AA"+
    "IfkEBRQAjQAsCQAFAAsABgAACDYAGzUqQKBAo4IDBA4kSJBAwQ2NEjAs6JDAhoQJKh4kkCBhCgAg"+
    "ARAICcBAIwgGDCSImCCByYAAIfkECQoAjQAsAAAAABkAGQAACGgAGwkcSLCgwYMIEypcyLChw4cQ"+
    "GwGYKJEixIkABGDU+DCjgI8gPwJoOMWjyJAjHYZshLIjxooWI8qcWTAlTYkEFEqxeRAAAZ8GFwjk"+
    "2XMigZw0AQxQSrTjAQBPmzocKfWm1atYs84MCAAh+QQJCgCNACwBAAEAFwAUAAAI/gAbCRxIsFGA"+
    "gwgLKiQYoEGWIRcuoCHRIMDCggGYrDgwYMCBEQq6tLF4sZGDJQc2IChQAAGCAwo+5HBwMYCFAysL"+
    "ANipc6eGNCQLNjCQcycAAUaRGmCg0KaBBASOCphKdSqAHUEFBniAYkoCqVarAmiR1WATFikMgEUq"+
    "dkvZABgiqICg1uhXo3GevD0Co4IOCB46JOjgAQIcOW+oiHl7hsKJCjMMcMiQIcYDGxQmJDFRtlGD"+
    "CVFoyPjCQYIEHxFwuDDzg6lAowaVVCECZAGXGjdeSAkBAIwbkgAICAdgsggZDGoWKDfK5grNRsGD"+
    "ExhAPIAXLWvGBDHipIQVHkGNJQo/QNwggzBQyiDBIoRBWQDU45c3iPDgQgDkyc8vqZD4fv4EBQQA"+
    "IfkECR4AjQAsAQABABcAFgAACP4AGwkcSLBRgIMICyokGKBBliEXLqAh0SDAwoIBmKw4MGDAgREK"+
    "urSxeLGRgyUHNiAoUAABggMKPuRwcDGAhQMrCbDUOUCBAg1pSBZsYGBlAQIAkiJN2sMAA4U2DSQg"+
    "gFSAVQBWBQB4sEOowAAPUExJgDWrWa0tvBpswiKFgbJXzQLYojYAhggqICRNqnWv1id1j8CooEPv"+
    "Xg97AVARQxKAiMdnKJyoMMMAhw4ZYjywQWFCEhONOw4AMCEKDRlfOEiQ4CMCDhdmfjxtBED0aCVV"+
    "iABZwKXGjRdSQgAA48Zibduji5DBoGaB871srtCkjXx0AC9a1owJYsRJCSs8hCoCADG6PACDDMJA"+
    "KYMEixAGapOSB3F+IMKEF2vXL1lSP3/+/v3Xn4AKBQQAIfkECQ8AjQAsBAABABQAFgAACP4AGwkc"+
    "KDCAwYMEEw4M0CDLkAsX0JBoEEDhQiYrDgwYcGCEgi5tKip0sOTABgQFCiBAcEDBhxwOEgawcAAl"+
    "gZQ3ByhQoCGNSIENDKAsQACA0aJGexhgsNCCgQQEigqYCmCqAAAPdogM8ADFlARVrYq92mJrExYp"+
    "DISlKhbAlq0YIqiAYNTo1bpXn2w9AqOCDrp1PdQFQEXM1jMUTlSYYYBDhwwxHtigMCGJiYpGG0yI"+
    "QkPGFw4SJPiIgMOFmR9MAWwEoKQKESALuNS48UJKCABg3GBe7aAIGQxqFgivy+ZKzEaqBwBoFMCL"+
    "ljVjghhxUsIKj5+qlxdkEAZKGSRYhBsw+NkIxAAQMg8aVJjdonuB7d9bjC+ffX2LAQEAIfkECR4A"+
    "jQAsAQABABcAFgAACP4AGwkcSLBRgIMICyokGKBBliEXLqAh0SDAwoIBmKw4MGDAgREKurSxeLGR"+
    "gyUHNiAoUAABggMKPuRwcDGAhQMrCbDUOUCBAg1pSBZsYGBlAQIAkiJN2sMAA4U2DSQggFSAVQBW"+
    "BQB4sEOowAAPUExJgDWrWa0tvBpswiKFgbJXzQLYojYAhggqICRNqnWv1id1j8CooEPvXg97AVAR"+
    "Q1KEYwBnKJyoMMMAhw4ZYjywQWFCEhMWAXQcAKDBhCg0ZHzhIEGCjwg4XJj58bRR0tEAlFQhAmQB"+
    "lxo3XkgJAQCMm9C4SQMoQgaDmgXQ97K5QtO2ctJIA3jRsmZMECNOSi9Y4SFUNGnSBQAYZBAGShkk"+
    "WIQwUAsAxAAQSRkiPHhRtPqSAPoHYICkDRiggQsFBAAh+QQFDwCNACwEAAEAFAAWAAAI/gAbCRwo"+
    "MIDBgwQTDgzQIMuQCxfQkGgQQOFCJisODBhwYISCLm0qKnSw5MAGBAUKIEBwQMGHHA4SBrBwACWB"+
    "lDcHKFCgIY1IgQ0MoCxAAIDRokZ7GGCw0IKBBASKCpgKYKoAAA92iAzwAMWUBFWtir3aYmsTFikM"+
    "hKUqFsCWrRgiqIBg1OjVulefbD0Co4IOunU91AVARczWMxROVJhhgEOHDDEe2KAwIYmJikYbTIhC"+
    "Q8YXDhIk+IiAw4WZH0wBbASgpAoRIAu41LjxQkoIAGDcYF7toAgZDGoWCK/L5krMRqoHAGgUwIuW"+
    "NWOCGHFSwgqPn6qXF2QQBkoZJFiEGzD42QjEABAyDxpUmN2ie4Ht31uML599fYsBAQAh+QQJHgCN"+
    "ACwBAAEAFwAWAAAIRAAbCRxIsKDBgwgTKlzIsKHDhxAjSpxIsaJFgQBEaJwIYIBHABE7DuDocWSj"+
    "ASAdijSJ8iEAECZPplQ5c+bFmzhzHgwIACH5BAkPAI0ALAQAAQAUABYAAAj+ABsJHCgwgMGDBBMO"+
    "DNAgy5ALF9CQaBBA4UImKw4MGHBghIIubSoqdLDkwAYEBQogQHBAwYccDhIGsHAAJYGUNwcoUKAh"+
    "jUiBDQygLEAAgNGiRnsYYLDQgoEEBIoKmApgqgAAD3aIDPAAxZQEVa2KvdpiaxMWKQyEpSoWwJat"+
    "GCKogFDVqNGrdp9sPQKjgg66dj3YBUBFzNYzFE5UmGGAQ4cMMR7YoDAhiYmKRhtMiEJDxhcOEiT4"+
    "iIDDhZkfTAFsBKCkChEgC7jUuPFCSggAYNxgXu2gCBkMahYIt8vmSsxGqgcAaBTAi5Y1Y4IYcVLC"+
    "Co+fqpcXZBAGShkkWIQbMPjZCMQAEDIPGlSY3aJ7ge3fW4wvn319iwEBACH5BAkeAI0ALAEAAQAX"+
    "ABYAAAj+ABsJHEiwUYCDCAsqJBigQZYhFy6gIdEgwMKCAZisODBgwIERCrq0sXixkYMlBzYgKFAA"+
    "AYIDCj7kcHAxgIUDKwmw1DlAgQINaUgWbGBgZQECAJIiTdrDAAOFNg0kIIBUgFUAVgUAeLBDqMAA"+
    "D1BMSYA1q1mtLbwabMIihYGyV80C2KI2AIYIKiBgTZpUK98ndY/AqKBDL18PfAFQEUNShGMAZyic"+
    "qDDDAIcOGWI8sEFhQhITFgF0HACgwYQoNGR84SBBgo8IOFyY+fG0UdLRAJRUIQJkAZcaN15ICQEA"+
    "jJvQuEkDKEIGg5oF0PmyuULTtnLSSAN40bJmTBAjTkovWOEhVDRp0gUAGGQQBkoZJFiEMFALAMQA"+
    "EEkZIjx4UbT6kgD6B2CApA0YoIELBQQAIfkEBQ8AjQAsBAABABQAFgAACP4AGwkcKDCAwYMEEw4M"+
    "0CDLkAsX0JBoEEDhQiYrDgwYcGCEgi5tKip0sOTABgQFCiBAcEDBhxwOEgawcAAlgZQ3ByhQoCGN"+
    "SIENDKAsQACA0aJGexhgsNCCgQQEigqYCmCqAAAPdogM8ADFlARVrYq92mJrExYpDISlKhbAlq0Y"+
    "IqiAUNWo0at2n2w9AqOCDrp2PdgFQEXM1jMUTlSYYYBDhwwxHtigMCGJiYpGG0yIQkPGFw4SJPiI"+
    "gMOFmR9MAWwEoKQKESALuNS48UJKCABg3GBe7aAIGQxqFgi3y+ZKzEaqBwBoFMCLljVjghhxUsIK"+
    "j5+qlxdkEAZKGSRYhBsw+NkIxAAQMg8aVJjdonuB7d9bjC+ffX2LAQEAIfkECR4AjQAsAQABABcA"+
    "FgAACEQAGwkcSLCgwYMIEypcyLChw4cQI0qcSLGiRYEARGicCGCARwAROw7g6HFkowEgHYo0ifIh"+
    "ABAmT6ZUOXPmxZs4cx4MCAAh+QQJDwCNACwEAAEAFAAWAAAI/gAbCRwoMIDBgwQTDgzQIMuQCxfQ"+
    "kGgQQOFCJisODBhwYISCLm0qKnSw5MAGBAUKIEBwQMGHHA4SBrBwACWBlDcHKFCgIY1IgQ0MoCxA"+
    "AIDRokZ7GGCw0IKBBASKCpgKYKoAAA92iAzwAMWUBFWtir3aYmsTFikMhL261uiWrRgiqIAQ1mhd"+
    "o0+2HoFRQQddux7sAqAiZusZCicqzDDAoUOGGA9sUJiQxERFow0mRKEh4wsHCRJ8RMDhwswPpgA2"+
    "AlBShQiQBVxq3HghJQQAMG4uq3ZQhAwGNQuC22VzJWaj1AMANArgRcuaMUGMOClhhcfP1MoLMggD"+
    "pQwSLEIYGfxsBGIACJkHDSrEbrG9QPbuLcKPv56+xYAAIfkECR4AjQAsAQABABcAFgAACP4AGwkc"+
    "SLBRgIMICyokGKBBliEXLqAh0SDAwoIBmKw4MGDAgREKurSxeLGRgyUHNiAoUAABggMKPuRwcDGA"+
    "hQMrCwDYqXOnhjQkCzYwkBOAgJ1GkRpgoNCmgQQEjAqYSnUqgB1BBQZ4gGJKAqlWqwJokdVgExYp"+
    "DIA9KnZL2QAYIqiAoBbpV6Rxnrw9AqOCDggeOiTo4AECHDlvqIghKaIxgDMUTlSYYYBDhgwxHtig"+
    "MCGJCYsAOg4A0GBCFBoyvnCQIMFHBBwuzPxg2minaABKqhABsoBLjRsvpIQAAMYN6NujARQhg0HN"+
    "gudI2VyhWTv56KgBvGhZMyaIESclrC/wCBp69GidBhmEgVIGCRYhDMoCADEAxE6GCA9eDA2gpP/q"+
    "/f2332gClhRggQQFBAAh+QQJCgCNACwBAAEAFwAUAAAI/gAbCRxIsFGAgwgLKiQYoEGWIRcuoCHR"+
    "IMDCggGYrDgwYMCBEQq6tLF4sZGDJQc2IChQAAGCAwo+5HBwMYCFAysB6CSgE4ACDWlIFmxgIKeA"+
    "nkd19jDAQKFNAwkACJhKlSqABzuECgzwAMUUqVarAqjTQqvBJixSgJ269iidLWYDYIigAkJPAFF7"+
    "4onzJO4RGBV0QPDQIUEHDxDgyHlDRUzcMxROVJhhgEOGDDEe2KAwIYkJs40aTIhCQ8YXCah9RMDh"+
    "wsyPpgJ7GlRShQiQBVxq3HghBUAfMG5IAiBAHIDJImQwqFmwoGcINldoNho+nMAA4wG8aFkzJogR"+
    "JyWsKfAQ2pP4AeMGGYSBUgYJFiEMzAK4Th+9QYQHFwI4f95+SYXG+fcfQQEBACH5BAkKAI0ALAQA"+
    "AQAUABMAAAj+ABsJHCgwgMGDBBMODNAgy5ALF9CQaBBA4UImKw4MGHBghIIubSoqdLDkwAYEBQog"+
    "QHBAwYccDhIGsHAAAYCbBG4CUKBAQxqRAhsYsClAZ9GbB3oYYLDQggEAAqJKlQrAwIMdIgM8QAGV"+
    "6tSqdVpkbcKia1SzRR/Q2ZIVQwQVOgEkiPsAT5wnWY/AqKADgocMCTp4gABHzhsqYrKeoXAi0AwD"+
    "EjpkiPHABoUJSUyIBNBgQhQaMr5wyCDBRwQcLsz8YNoIAIEASqoQAbKAS40bLwCE6ANGc+ucBBwU"+
    "IYNBzQKdJUKwuRKzNc7XXrSsGRPEiJMSVngAbT0AQPcADMIXQCmDBIsQBttbH/B+s9FBhBYBtLZI"+
    "PyAAIfkEBTIAjQAsBgABABIAEgAACP4AGwkcGKCgwYEICTbIMuTCBTQkGgRIKDAAkxUHBgw4MEJB"+
    "lzYTETpYcmADggIFECA4oOBDDgcELRxAAKAmgZoAFCjQkCZkAwM0BeAUWvNADwMMGgWwYACAgKdQ"+
    "oQIw8GBHwQconEqNOrVOi4JNWGh9OlboAzpbCmKIoAIngARuH+CJ86TgERgVdEDwkCFBBw8Q4Mh5"+
    "Q0VMwTMUTgSaYUBChwwxHtigMCGJiYkNJkShIeMLhwwSfETA4cLMj6RKlVQhAmQBlxo3XgAI0QfM"+
    "5YEOipDBoGYBzhIh2FyBiTCAFy1rxgQx4qSEFR4hEwZgEAZKGSRYhDCITlGpwYIUAwECACH5BAUU"+
    "AI0ALAkABQALAAYAAAg2ABs1KkCgQKOCAwQOJEiQQMENjRIwLOiQwIaECSoeJJAgYQoAIAEQCAnA"+
    "QCMIBgwkiJgggcmAACH5BAU8AI0ALAkABQALAAYAAAgjABs1AkBwYEGBAAQQTLhwoICHECECaBSR"+
    "IkSHEiNOXLixYUAAIfkEBRQAjQAsBwAGABAADAAACIoAG61oRLCgQYJ/CB44yFDBnEaMDDA8qMAA"+
    "Hz8SJxY08GCPHxRTDBIwmMBAnRaGWKQwkICASwIJYnKkk4hEBBUQJMbcyRFPnDuNYFTQAcFDhgQd"+
    "PECAI+fNIIIkTlSYYUBChwwxGtmgMAEowRw0ZCwwGAGHC0IHFx1asKDGjRdSQhTSuIMtW68FAwIA"+
    "IfkEBSgAjQAsCAAIAA8ACgAACGgABzQaSLDgQA2NBBo0qADhgQILCQ5QMGfPCAQFCBQkQGDAgR52"+
    "GikYUCAjR44FNij4AKjRBwUHMBIoiXHDhz8EX44YMACBx0Z6EOUpqEGPAgUENdgZunCOBg1z7AAa"+
    "FHEgnzyCFC0MCAA7"));
	
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addSmiley(smiley) {' +
		'var message = document.getElementsByName("text")[0];' +
		'var str = " " + smiley;' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'rng.text = str;' +
			'rng.collapse(false);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + str + endtext;' +
			'start += str.length;' +
			'message.selectionStart = start;' +
			'message.selectionEnd = start;' +
		'}' +
		'message.focus();' +
	'}';
	document.body.appendChild(script);

	function funcSmilies() {
		var form = document.getElementsByTagName("form")[0];
		if (!form) return;
		var div = document.createElement("div");
		for (var i = 0; i < smilies.length; i++) {
			div.innerHTML += "<a href=\"javascript:addSmiley('"+smilies[i][0].replace(/'/g,"\\'")+"')\"><img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' /></a> ";
		}
		div.style.textAlign = "center";
		div.style.height = "200px";
		div.style.overflow = "auto";
		var cell = document.getElementsByName("text")[0].parentNode;
		do {
			cell = cell.previousSibling;
		}while(cell && cell.nodeType != 1);
		if (cell) {
			div.style.width = "99%";
			cell.appendChild(document.createElement("br"));
			cell.appendChild(document.createElement("br"));
			cell.appendChild(div);
		} else {
			var message = document.getElementsByName("text")[0];
			var message_div = message.parentNode;
			var parentDiv = message_div;
			do {
				parentDiv = parentDiv.parentNode;
			}while(parentDiv && parentDiv.nodeName.toLowerCase() != "div");
			parentDiv.style.position = "relative";
			div.style.position = "absolute";
			div.style.width = "160px";
			div.style.marginLeft = "10px";
			if (parentDiv.className == "textWrapperSmall") {
				div.style.top = "5px";
			} else {
				div.style.top = "50%";
				div.style.marginTop = "-50px";
			}
			message.style.width = "540px";
			message_div.style.width = "550px";
			message_div.style.marginLeft = "170px";
			message_div.parentNode.insertBefore(div, message_div);
		}
	}

	if (document.location.href.indexOf("page=alliance") != -1) {
		var $;
		try { $ = unsafeWindow.$; }
		catch(e) { $ = window.$; }
		$("#eins").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=allianceBroadcast") == -1) return;

			funcSmilies();
		});
	} else {
		funcSmilies();
	}

	if (document.location.href.indexOf("page=showmessage") != -1) {
		function rep_smilies(value,index) {
			var text = value;
			for (var i = index; i < smilies.length; i++) {
				var smiley = smilies[i][0];
				smiley = smiley.replace(/([\\\[\](){}.+*?^$|-])/g,"\\$1");
				var expression = new RegExp(smiley,"i");
				var pos = value.search(expression);
				if (pos != -1) {
					var part1 = value.substring(0,pos);
					var part2 = value.substring(pos+smilies[i][0].length,value.length);
					text = rep_smilies(part1,i) + "<img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' />" + rep_smilies(part2,i);
					break;
				}
			}
			return text;
		}

		function sort_smilies(a,b) { return b[0].length-a[0].length; }
		smilies.sort(sort_smilies);
		var divs = document.getElementById("messagebox").getElementsByTagName("div");
		var message;
		var i = 0;
		do {
			message = divs[i];
			i++;
		}while(message.className != "note");
		message.innerHTML = rep_smilies(message.innerHTML,0);
	}
})();