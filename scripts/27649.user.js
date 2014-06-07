// ==UserScript==
// @name          Easynews Navigation Toolbar 0.1
// @namespace     EasynewsNavigationToolbar
// @description   Navigation toolbar on top of every page in easynews
// @include       http://*.easynews.com/*
// @include       https://*.easynews.com/*
// @include       http://easynews.com/*
// ==/UserScript==

addEventListener('load', function(event) {

  // ================================================================================
  // MAINLINE
  // ================================================================================
  if ( document.body.childNodes.length > 1 ) {
    var logo = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAsHCAoIBwsKCQoMDAsNEBsSEA8PECEYGRQbJyMpKScj' +
               'JiUsMT81LC47LyUmNko3O0FDRkdGKjRNUkxEUj9FRkP/2wBDAQwMDBAOECASEiBDLSYtQ0NDQ0ND' +
               'Q0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0P/wAARCABQALEDASIA' +
               'AhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAgEI/8QAQBAAAgEDAwIDBgIHAw0AAAAA' +
               'AQIDAAQRBRIhBjETQVEUImFxgaGR0gcVFjJCUsEjJKIlM1NiZHKCkpSxsuHw/8QAGgEBAAMBAQEA' +
               'AAAAAAAAAAAAAAIDBAUBBv/EACERAAICAgEFAQEAAAAAAAAAAAABAgMEESESIjFBcRNh/9oADAMB' +
               'AAIRAxEAPwDrlKUoBSlKAUpSgFKVGa3rEOlpCjMonuH2Rhuw9WPwH/rzoDekuFRtigvJ/Kv9fSqr' +
               '1J1Fq1neez2EFswGBIzSDKEj/wC8q96n1PHp0RisVe6k5MtwRlQfPOPP4ceVc+nvLzqC7lkKvBCz' +
               'HfJkB2Ppx2qUItvhEZNJckjrnVmvWdwhj1KKVFPvCNCAT6Hjj6HyrBbfpN16GUtItrNGT+46HIHz' +
               'BrytpBaoyxIBnv8AE1DalZqJPEjAAPcCuhVjxa1JGK29p7TOl9OfpH0/VpUt7uJrK4Y4Xc25GP8A' +
               'veX1FXJWDDI7V+dVjeJ1kQlXU5BBwQR8a6V0x1BqtuiXepQKNGunCxShgTA3bn/VJB5PbNUZGN+b' +
               '2vBbTf1rR0GleEfNexWQ0pilKUPRSlKAUpSgFKUoBSlKAUpSgFKUoATgZNc0ub79c3N5qHLhnMVr' +
               '8I0PH4kE/hV26su2sum9RuEOHS3faR5EjA/71zXQZ/8AIlsF42qR9zWimHUmym2emkbFhr36vW9g' +
               'WD2Zp2yfEXJYjvz2PnWo7SAl1aM723cjbk/Ssl0VmBV+QauPSOj2r9Plr2OKTxmJ3NjIXy+XnVrS' +
               'pW2U7dr0iltGXzWCWzLrjFWrVtIt4pCbfBjXs8eP8QqPtrbxAA4Ct6H5+XrWmnIhP6Ysmmyvnyiu' +
               'SWBA7Vc9H1VW6bgsdqo8QIBHIPfhh5ZrSm04hTgZqD1HT5opvGtnKSeZDYzTKg7Ydvojh3xrn3ez' +
               'oHSGqm8s5IJOJbZ9hB77f4f6j6VZEbNc16Eu7htVc3CgGSMxsw43suCD88E10WFsiua4teTrxkm+' +
               'DYpQUqssFKUoBSlKAUpSgFKUoBSlKAUpSgIPrqMy9I6oq9xAW/Dn+lce0TUfBjNu7YUnKn0PpXeL' +
               'uBLq2lglGY5UKMPUEYNfnq/spNN1C4spxiSCQofjjz+vet2G09xZkydrUkWDxST3rPb61qFg6q07' +
               'yWvkjeQ9BUBaTOMDcSPQ1MK4a0ffgrjnitV9KlD4Yq73C3j2WS2uIpVE9vdCPd3BNR+r31ucW0Mq' +
               'NPIwVVjbAJJqs6vfP/m4cpGOABxmrF0f0nEPZ9QvN/tIO8I3YZz98VyYxcnwdO62NUdssdpZTQae' +
               'iTO0jgcse54qN1KEjNWS4lxHgY4OPpVd1WTCsScV1aW9cnzze5bPHSMbfrAHHuq7t/hAP/kKv1ua' +
               'p3RyNIsk3HhoPDTHmSdzH7qP+GrhbisNr22zuVLSS/huL2r7Xxe1fazGoUpSgFKVikuYYnCSSorH' +
               'sGYA0BlpSlAeJpo4F3SMFB4HqT6AedR8nUOmRsVe52sO4MbZH2qH6kW6NzdF7lVtfBI/s0PiIMdg' +
               'c4yeT29M+VR9pHP7LF4Om6EI9g2+PIofGP4hg8+vJoC12mu6deXS21vcB5mUsF2MMgd+4+NJ9csY' +
               'GxJI/wACsLsD8iBg1EaQpVLw3VvpEMnhYh9jKlzwd2TgfD71C2tjdXuoXfslhY3hjWNX9u94ISuR' +
               'tGD680BbP2k0wnAmlJ+FvJ+Wtqy1O0voJJreXMcbFHLKV2kAEg5A9RVRn0m+gj8W60TRIoVILvbI' +
               'FkUZ7qdvesGlNcW+m3lvbvaLJ+spXZLifwuNq7SOD589vKgLVcdTaVbSGOa4dHHkYJPy1z39I8em' +
               'apImp6ZOXuhhJY/CceIOwIyO47fEfKpW1tr21RlWLpyUs5dnuLgSOST/ADEVmN1cWUMt3PZaNi3H' +
               'ibreEMpxk8OOxGPTjI9anCbhLaIzipLTOcWME8sDTxxO0SfvOBwOM81IwS7oGU9iOflV21rpu2SZ' +
               'r7TJbe2kuEDy2k7bUlz5j+U9/h3qk3UXscxi9huo5CCFAnWRSfgQvI+9dCGV17jI51mLpqUTY0iy' +
               'je49tuFyDKyRA9sjP34zV0t7iXwUMcZ2lQRx34qlXCta6bpszRtH/eJcAjHdT/Ws16PC1GUvD4ie' +
               'zQtyuQuQfwqmEunUVr2e3Uqxuct+Fx9LdNJcOvCMe9QiW82sX7WqblVD/bORjwx5j5+lYrfQbue2' +
               'e7aGO1jjQyKdo3tgZGAO1SmlR3C2+prBIgK6gVxIC2R4aYHfsO/pgHPGalO6UeCNWLB9y2id097H' +
               'T7WK3hfbFGNqnBwfU5xzzW+NY0+CJpJLlVVRljg8AfSqvp0Ia8vGS2gupN43z3sgAPHAXIJxjv8A' +
               'P8JSKGRpYw2n6Ise9fEJdWIXPvYG0c4zWNzbOhGCRYG1S0S5W3aUCVnCBcHkkbgO3pzX3UNUtNNX' +
               'deS+GuxnyVJ91cZPA+Iqp6ugPWen3Ax4cd3ln8lXwByT6dvxrz+kzbe6SzQMsipDIuUOfeJTA/wm' +
               'oFhdLi5jtofFlbamQM4J5JwPuaxw6hbT2ntUcqmDJG88DIJB+4IqO1+4gudJkiiljkYlCQrA4AYE' +
               'k/QVWNMivpOk9PtbSW2iKibf4s/hupMhwQMemfxoC5trVgjFXuArDuGUgj7VD3r2l/qCrDcwtJO2' +
               'Iw2e+FJGMcjEZ8x3NR9jZyWVpHbpp+iuEGN0tyrMx9SSnJr0+qppc8Mkmm2UbiVV3wIrZBIHusAP' +
               '5sfMEUBavYf9on/5qVtUoCKvemtOvrl7i4S4Mkhy226lQdgOwYDsBWMdKaYBjF7j09vn/PUzSgIm' +
               '36a023nWZEuGkUEKZLqVwMgg8MxHYmtjStHs9JEos43XxSC5eV5CcDA5Yk1vUoDFd20V5bSW84Jj' +
               'kGGAYqcfMciog9HaQe8d0fnezfnqcpQEF+xujf6G5/6yb89ZI+lNJiKkQSuFOQklzK6/VWYg/Wpm' +
               'lARmpaFZalOJrlJTIFC5Sd04BJHCkDzP41pN0vYL+6LsfK8m/NVgNeSua9TItFZn6V02YqZoppdh' +
               'yviXMjY/FvjXiPSNM0u5hdYMzzusMbOzSNkBiACxOMAMePSrOYwa0tQ0i11HwvaVkzCxaNo5njZS' +
               'QQeVIPYmpqSIOLK9P1DpEszae8ryPIWiZVGP4infI7kHt8/StAat0tHZylWu2tlm8R5Ynlbc5G3O' +
               'Qdx4Un0wpNWT9kdJ2ophmKJgqhupSoI7HG7GfPPrz3rPYdN6bp5iNtDIPBOY1e4kkVDtK8BmIHDE' +
               'fWvHJs9UEiuRan0uHjitbi9laU5RYLqb3hnGR747nI+YPpUhANGuba+mYapHBZBxO8tzOq+7ncB7' +
               '3OMVv2nSekWU6TWtvJAyY2iO4lVcAkgbQ2MZJOMY5PrW8dKtDZS2Zi/u8zs8ibj7xZizZOc8kmoF' +
               'hVm1Dpye5Aa21RLgDYiAToWKbUKgA8kZXPwrH7b0yzvLJZalKbc4l8ZZpBEdxX3gSQDkH8KssvTe' +
               'kzypLNZRSsju4EmWG5ixY4Jwclj9vQVgXo/RkyI7aSNCwYxx3MqISDke6Gxwee1ARelx9N65O9vZ' +
               '+13KRAksbmUx8HHm3z8uaww6h0zIXS0fUZkRti+z3E5VjnaAoDeuccY4J7VZNM0Kx0qF4rJJo42X' +
               'ZtNxI4A+G5jt7+WK14Ok9HgiSJbQvChBWKaZ5UBAI/ddiOzHyoCBGqdNNOIN+qC4LFTC11Orgg7e' +
               'QX9QR9DWeGbpeK/gkUyzXi3BhVJJpJXR1fZkqzHHvEYJ9QRUunSekRlAls6xpIJFiE8nhBg24HZu' +
               '2/vc9qzW3T9hbXi3Ua3DTqCA8t1LIQD3HvMeOBx8B6CgJOlKUB//2Q==';
               
    var innerHtml = '<table border=0 width=100%><tbody><tr><td width=200px><a href="http://www.easynews.com/">' + 
                    '<img src="data:image/jpg;base64,' + logo + '" alt="Easynews Logo" title="Providing Premium UseNet Service Since 1994." border=0 height=80 width=177>' +
                    '</a></td><td valign=top><a href="http://www.easynews.com/">Frontpage</a>';

    innerHtml += addLink( 'https://secure.members.easynews.com/', 'Main Members Page', '' );
    innerHtml += addLink( 'https://www.easynews.com/edit/', 'Your Account', '' );
    innerHtml += addLink( 'https://secure.members.easynews.com/index.html?favorite=1&amp;alpha=1', 'Favorites (Alpha)', '' );
    innerHtml += addLink( 'https://secure.members.easynews.com/global4/betasearch.html', 'Global Search (beta)', '' );
    innerHtml += addLink( 'https://secure.members.easynews.com/zipmanager.html', 'Zip Manager', 'zipmanager' );
    innerHtml += addLink( 'https://secure.members.easynews.com/preferences.html', 'Preferences', 'EZprefs' );
    innerHtml += addLink( 'http://www.easynews.com/survey/', 'Survey', '' );
    innerHtml += addLink( 'http://www.easynews.com/support/?nocache=1126818496', 'Support', '' );
    innerHtml += addLink( 'http://forum.easynews.com', 'Forum', '' );
    
    innerHtml += '<br><br><form enctype="multipart/form-data" action="/zipmanager.html" method="post">' + 
                 '<input name="MAX_FILE_SIZE" value="52428800" type="hidden">' +
                 'Import NZB file: <input name="nbzfile" accept="text/nzb" type="file"> ' +
                 '<input value="Send File" type="submit"></form>' +
                 '</td></tr></tbody></table><hr color=#000 noshade/>';

    var topBar = document.createElement("div");
                 
    topBar.style.backgroundColor = "#fff";
    topBar.style.font = "8pt arial,serif";
    topBar.innerHTML = innerHtml;
    
    document.body.insertBefore(topBar, document.body.firstChild);
  }
  
  // ================================================================================
  // FUNCTIONS
  // ================================================================================
  function addLink( url, name, target ) {
    if ( target != '' ) {
      return ' | <a href="' + url + '" target="' + target + '">' + name + '</a>';
    }
    else {
      return ' | <a href="' + url + '">' + name + '</a>';
    }
  }
}, false);
