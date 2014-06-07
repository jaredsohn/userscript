// ==UserScript==
// @name    Facebook Mafia Wars Autoplayer 2
// @namespace   mafiawars
// @description   autoplayer for the mafia wars game I modified code from Blannies Vampire Wars script http://userscripts.org/scripts/show/36917 and from StevenD's Facebook Mafia Wars Autoplayer. Call me on +96170613231 for more info.
// @include   http://apps.facebook.com/inthemafia/*
// @include   http://apps.new.facebook.com/inthemafia/*
// @include   http://www.facebook.com/common/error.html
// @version 0.9.12
// @contributor KhaleD
// @contributor StevenD
// @contributor CharlesD
// @contributor Eric Ortego
// @contributor Jeremy
// @contributor Liquidor
// @contributor AK17710N
// @contributor Fragger
// @contributor <x51>
// @contributor CyB
// @contributor int1
// @contributor Janos112
// @contributor int2str
// @contributor Doonce
// @contributor Eric Layne
// @contributor Tanlis
// ==/UserScript==


var SCRIPT = {
  url: 'http://userscripts.org/scripts/source/43573.user.js',
  version: '0.9.12',
  build: '604',
  name: 'inthemafia',
  appID: 'app10979261223',
  ajaxPage: 'inner2',
  presentationurl: 'http://userscripts.org/scripts/show/43573',
  controller: '/remote/html_server.php?&xw_controller=',
  action: '&xw_action=',
  city: '&xw_city=',
  opponent: '&opponent_id=',
  user: '&user_id='
};

// Register debugOnOff with Greasemonkey
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Turn Debugging Log On/Off', debugOnOff);
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Clear Saved Values', function() { clearSettings(); loadHome(); });
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Display Stats Window', function() { toggleStats(); });

function clearSettings() {
  if(typeof GM_listValues == 'function' &&
     typeof GM_deleteValue == 'function') {
    var values = GM_listValues();
    for (var i in values) {
      GM_deleteValue(values[i]);
    }
  } else {
    alert('In order to do this you need at least GreaseMonkey version: 0.8.20090123.1. Please upgrade and try again.');
  }
}

// Handle Facebook error pages.
if (location.href.indexOf('error') != -1) {
  var delay = 30;
  var p = document.createElement('p');
  var wait = function() {
    if (!delay) return back();
    p.innerHTML = 'You will automatically return to the previous page in ' +
                  delay-- + ' seconds.';
    window.setTimeout(wait, 1000);
  }
  document.body.appendChild(p);
  wait();
  return;
}

customizeLayout();



//create data uris for mini icon usage
var searchIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVR42mNkgIJ12/cacLCzlTIwMtkwMzNx/Pnz58qfP3/n+Ls5LGfAAxhBxMZdBxKFBflnqirKs4oKCTAwMjIyfP' +
                    '/xk+HmvYcMj54+X/n9x4/oCD+Pv1gNWLVlp6GYiMhJQ20NVm4uDoTMfwaGf///MZy5fIPh9Zs3tf5uji1YDdi67/BSaUnJKDUFGQYmJiaw7SDd//79Z/j77x/Di9fvGO4+ePTh4+fP4mE+br8wDNh+4OhDTRVlOU' +
                    'F+XgYOdlaIAUDbQZp//vrN8OrtB4b3Hz8yPHzy1BhowDkMA3YePPZCR0NNnJebk4GdlRXsiv9A+PfvP4Yv374zfPryjeHdhw+gsLAK9nQ+js0Lewy1NZ15ebgYWFlYGFiYmcDO//P3L8M3YEB+/faD4eHTp3+ePH' +
                    '8pFuXv+R7DAGD0hasoyK1QlkeEwf//EBf8+PWL4e37jwy37z9Y7uNsF4UvGherKcnHyEtLMjAzM4MNALng5Zt3DM9fvWa4/+BhSWyIfy9OAxav28LEy81VwsvDUyolLioCcsW7Dx9/vf/4adWLl6+vXzt/qmXz+r' +
                    'WHGJmYfG7evPkFwwAYmL96IwsTI6MG0BXsQFfcjg3y+QQSNzO3OMzLL2Dz9OH9o0A/ety4ceMLVgNwAR1tbT5efv4dXDx8lk8fPTgKFPIEGvKZaAMghmgBDRHAMIRoA3AZQpIBUEN4gYbsBBny8O7tvSQbAA0TXg' +
                    '4u7g2fP33YBwCb9/irlkMH+QAAAABJRU5ErkJgggo=' +
                    '" />';

var lootbagIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAIQfALq3nMG8k8TAmbSvfMnFoTg3LYmEWhMSDaumeM7Lqrm0hNXStXl2Vnp4ab65jaeha4+Nery2irexgmhnW9HNrsvIpdjVurGrd9fUuktKQcK9otPQsrOwkiAfHG' +
                    'poSv///yH5BAEAAB8ALAAAAAAQABAAAAWB4CeOk1Y0UHeMrHgAUZU4Wds2gcKo9thxl0ePNUlUKoPVEGLZYDaBZK9gsTwJgcig11h4KQSHQiJscSjoRFgi2bIOsoRxPXCPDoQ4QSAeXFp4BIICAQ5tfywFAouEDh' +
                    'FtBm8Bk4xZCgoPSh8ZARcKk4UKjgiaHyoFDAaqBh4MpCIhADs=' +
                    '" />';

var tabSelectedImage = '<img src="' +
                    'data:image/gif;base64,R0lGODdhZAAyAOMQACIODyUQESYTFCkWGCwZHTMgJDckKDAdIDooLT4sMUw6QEY0OkEvNVJBSFlIUGFQWSwAAAAAZAAyAAAE/hAAIQMFwYa5+c6fxklChplT1YGq5GlgOXpnd6FsCm' +
                    '7CRfEyUa/ymwRlwxPxc3G5hJcBxsgEtjDHZ6W1I9lqR9s3xvReU1oyRjr7ZbIzFNopm7OSnVnNuDVjr3VXeSVvJngudRaAKzeGPlM4Pk1FkSSPgk1TiJYkKoycdp+ac00iKJRBpmNYZUqjeqhlIjqsf655aIZqXU' +
                    'mlJryXe4qjhE9fKj+SnZ62g79uMcEsw3K+rThOz33at2HNK9nX4DVqddC/QmNdw75nudMr6tPSoutMA+vBP/jzy3Y3jcL5SyRq0hOAgvKka2OsFUNm7BracsIMD71W1iZqMvcGiZgQ/iE8egG5DMcpZxjFjNzzjp' +
                    'kmVRLwWarCZ82UHjTxMHIYr1giSTkD1hr2ElnKTrs4Ii1ki+CmPkQGPkrqp5qWNjw+1HTmiWfWqK5+0imI5Aaieiq3KQsFFo+UkF/RtGtG8eTKSjXnEj0mLG0scrdMXcL2dE7YVEiHCsU1hJqPKrKUEnlsRuHan1' +
                    'p7xYuclh1lrUPfTuKmaINMLDJ7xTwLNhIhC1E+NovCemLsrEFjOgKShJ+R1yUu71wT0lJZ3UCs5B0kRUDq21QmyByAhN+b5zF7sIHNY7sJ6h9OB/CNU7ppkdGdLwEgczx18+zZkE89oD14C+/VD3sffbxp+dWV/l' +
                    'cfcvCpxx5QxOkWn3bOZVCfc28RoIF24zknIQAEvEcdIc51OMuG7uHTYH/UPThgABIG16GHdYDYYA8HlDBAhiLWWKKE7lVAAIQWUlDfeTN2BJ4AF/4YogU7rnEAbPXd6CCATAZXpIozYpChjCVuuGOTP9aXIZLBze' +
                    'jjjkRukKR7Mh6AT5D4+eglPlcSCWGT4xEgwZkP1kkBkRuKGZ+Z1BGwI4qE7HhAAU0uiaGWTcrpp6Axgdeon0HG16igJQxKqHZJQvrnBBlOsCR+oYpJo4VSEHDAgWp6iSifGWC6qIxXUirTqTOKKMCrud6Y6qqz1n' +
                    'njng1maCcAB5B5paAW/iRrLKYzFiChtDOquiMBBaQ5ZqbLqolitnxK4aqhKTpb7ZYxsjeooGRKi+KgB6gJawDOEllAjPFScGiu8eJzL3XJ6lurtwOMKiaRgtaH6HhLQhjvtfcKkC+yJhLc8IxqWouiARYGjK1ziL' +
                    'Lr8b+7tiqtoYhimG0A1L6baIiq7kuAAc5m+O8AIQs6cgkts2sBrzRK6yyiOCeLM9HmnoxxvwUQrbTS+77LM7MRD2CAzkY7G6+aTdeXdMJRY1pnARsgGrDVhy5pAMcAUCvo1bty7BwCquL8LNwFyM3roRIeYIDX/f' +
                    'pNHQJc/00313fvmHcPe7u7tapX+41oAQkI2rQB/ohivuPV0uaNr+dWSysA59jSLDHbN9+boeloq1oA4QQQDrrmo2NbOr6ot0rzz1jPiHm8a8OOAM0IIDBj5clePnPe9xZ/vLXKv454D2tHbEACPcCObQLSYv678w' +
                    'Qgj23e2BJud8ccB4BAtggkQF0Cw0t/79o0U57h8F4y4Dr9h1Y+AP7/S94B1oczBkjPe9jSn9XwRwD9HYp/9vvf3wKIrQGGDHb9m1nx/LaAwyXgah9sGgP8FryrYc6A4cNcAUZIv+HNzH0B4N6M1ne9AySgcgIYHv' +
                    'AYQDgDIACFIVwhCX1oQhjKMHY+fN/8EpAsHhYPcwogIuZ+mKwFhIx7CGiA/hRfN0ICWPF49/KbAXOYABQN74OxW0CGOigtBCwgAVEc3hS7+MXwhdEAY2zf0QqgRgF0MHYKiNcTDRBFEVavfX+D4/8KUMgVHvKDA1' +
                    'CkAAyYrOL1kHv3YsDabGjF2MHvUI3U5BQhKUlKxq54mfyd5uAnu0DeUAGVU4AD36hJJ5IQlgSQpapoiccNElJNVGxgAlDIADUOoJOU++IrYznLYfayh4H8Xxd5yMRjGu+TwhyhAijHxzeuUAFWXMAC1PTGH3aTew' +
                    'wAZzfJub7XKYBuCNjm2ooJTwVQx5uR3Cb3xIlOdYqTnU2LZz1fGM+8RTF2DUgmG8G5tijeMAEdtKEC/rR4AIYS8no3jCgc1QRLEG5QoIjyJh61mEtwrs+iDs0o4TY6gI6GD5XxtOEB2GgAcTJyeD9cgCYVIM8Onh' +
                    'R++tQpIXuKSliuL52JrKY4cZlO5zTAhQ2wog+LuVOi/vSoUYxkNd/5wagyr5wTXZsDrlfTD7bvnRUNZPgcgMg3+hCOhONpsraZwHcOgAEkZaQmZ5rQXDYgigYY6wfdeta4qpWu3zQeXlP5TqkKtHg81aYmCfDUDi' +
                    '4AlwlwgE4rOtnKuhGzDdgRLJsGS/gF9qkBkCUUOxpPWXL2ap69bOUSEFoBjJaRNyweRXUZ2G0W4KmQde0CHEA5B6CxAZoM7giH/lvc4xpwpH+baLzAObMDNOABNFOAAxSALeC2drnEzaxz84bX6DZgupREoxvfCM' +
                    'enBhaLshzsO73ogEi+150MkC/dhlufsUqLoZRLaADSqb/A8rO9wzMufvVL3/5qDsC0zZZOw/fUQ411qA3gXgMSat0nmpSRE9Uwh4FLSDYu4LwtDe0AMkwzvOoPAQ54gOwuzNMM/3bEHjYxiieaIRYfwMUnVq0DHH' +
                    'AoGRsQnDs1LmVxqQAjM1Ko2q3cX2Np2hMzUbsZoqcX/yrUIRfZnEgmpJKnnMsqZ7iiDsjyH0mKV51eNsOUpahxPxhi+sJ5wzSbMyHhPNwYOYCOqs3sNfPaVeZi1hnPB9BznfssgD9XMdBsjeQIGfCABaxNxmdFLp' +
                    'qbFtWr8bR47dUmcX9r6ZISbrgIAAAcs4VcHp540gao9KVBPVFRc7rUn54pW1W9TQG02o0NiAAAOw==' +
                    '" />';

var playIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR42l1TSU9TURT+Xt9UaIHWAqUMJY2tSIwS41QEjXFhTFy54B/wF9iUhAUJxAQTt0RJkJUxLli6c6ELNcTEKV' +
                    'GCYShWfNRHh1faN7aeexkinuTm3pt77ne+851zBPxnW1tbCVmSxxVVuU3XRKPRAK0N0zRf2ba9kEwmN/71F44O2WxWlCRpGj5x4sPXVXk9m0OlWuVvweZmJOLduDiYclzbmnNddyqVSnnHAD+3t0VFUV9ktT/336' +
                    'x8RGtLEKqiwOfz0WsD9XoDpmWhXNnH6OUhREPBZWIzxkA4gKZpM7/+FDMrn78hEg5BlmVIokgABwQZgOu5sG0HeqGIKxcGEQ6os4lEYlLY2dlJSIq6+vL1e7k9HIaqKvyzKAogLQ4B6nBcD7bjwLJs5PcKuDNyya' +
                    'ntVwYEXddn1nO7Gb1ooCXQTAAyOVl49vw5boyO4kwySYkKTEh4Xp1SsWHsVxEJtaA7HJwVjLLx9tPaZjrQ5Kdsma+AKok3//gJP/f39+N6Oo1otJPfD6uCas3E2XjXO8EwjN9ffmSjHadCqJkWahTdILGWlpag+p' +
                    'sQaGmjyC66OtsxfO0q2iMRNFGa+b0iBuJdGgFUfn/fzEXDbUEuFqNXKpex+HQJ/qZmBFpD8FwXsc4IRobTiB0yKZQMnO7u0IRKpfJ2bVtL+xWZq65QBaq1Kh48fASBysg0uHVzFD2xGC+pRZWoNw72eEfonVAsFm' +
                    'f0cjVTpsgqfVZkCY5jY35hEffu3sHQ+XNcPIdY2I7LK8F2JnhAwqyQz+cTlOvq6lZOZgAyAYhEkTURY8PMozK6ngeXgdCybBepvi7HKJcGeKcUCoUZ061ncprOGRz0gY/netRIRyCMQQ/pIXjObCwWm+Qeu5omqn' +
                    '7/i5rt3s/t6jy66PsHoNHgzcRSYZ9FeMuWaY71xePe8TAxEFlRpiVZmdBLhlwy9nn3MZMlEW3BAMKtAceq1eZsx57q7e31TkzjkTFNaBbGaTKPx5lsg4aHjzPRPjHOfwGdsIJvkkplkQAAAABJRU5ErkJgggo=' +
                    '" />';

var infoIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADPUlEQVR42l3Te2wMQRwH8O++aTV1WjmttueupSIedWiaqJL7QyQETdoQJyIIEsQrErlS0Wg9KooQkYq/LogSCeKt8Q' +
                    'wSjcQj+INzrfbu2nu0d1drd293ze4FZZJNdnZmPzO/38yPwn/N5/PbOY5dJwiCS9N1u64DFHSfKIrtsqycmzChxDd0PvX7xe/3MzTNNiRF7PK2dXDPX/kQjSbNsVGjMjG73IEVNWUKz6aaNVWtLy0dr/4BOju7GJ' +
                    '7n224/+VZ9/OxjWMgP3DAO+u9VyIsiKeiPDmLr+irMK8+7JstyrYGYQE8g2HjnWaen5fxT5FizkaJpVDpt2La83ASOnm7HK38ErKYhHBzAtjWVqHKObhpf4qijurt77AmJ/rx4y0UuZ8xIKAwNjaYwf+Y47HNXmE' +
                    'B9yz087IyCUTVwBIkE+nGlpVYRKKmUCofDjQe8bzztb/xghwsAAUCArEwBedkZJhDoSyChpACNxKKqUEUZrrIibK2e2ETF4/EX5Z5bFRkCC8gyARhIZKJragFOrp1tAjsO3ca9njgEhnRSGiDwEKUUHu11vaRiA/' +
                    'GgY/t1q91hhdY/gO+RQYQHFbjnlMC7ea4JrG+4idYPQeRm8CjIyQRtyYbvSxAfDy0IpYGdN6w2xxh86fuBRKTf3Ka7shjejZVp4MAttH7qI6ExyMrNRnFuJvxfA/h4kADJZPKFs/5uRYIbhkDSCIGEQm6P25kP7+' +
                    'oZaeDwfbR+F83cIKUiL4tHliziuWceCSEWa/Rc+eA52xGERtFmDozHPbMA3pXT0kDzwzRATsDYHa1r2OC0om5hcRPV29tnj0jU52n773Myy5nbBLkH7lmF8K6angaOPEBr1480oKngFQUde1zKCOpnqXmRItFY46' +
                    'XXQc+my28BlgBkJ0vL8nGiZooJ7D7zFBe7CUBWBjnOU8umYsmkkU2FBfl1JhAKhRheENouvA5Vb7/6DrJx3hQ1pFR0My886R4jaM1kyzVJkmpttiL1TzEZCMvxDb2ivuvko2/czfdBdMVEc6zQMhyLJluxucqmWF' +
                    'i1OaXI9UVFhX+LaWgzcmKUM8dxLkXV7cY3htJ9pJTbJVk+NzY/759y/gUON2pDlqRajwAAAABJRU5ErkJgggo=' +
                    '" />';

var attackIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhDQANANU/AKJRAP/LNP/dNP/KIv2uAMmHAOyXAP/pfP/eQ7VkAfisAEA8LOWNAP+9CkgkDeejAIhIA92OAP/ODmtEDf/EAf+9ADErHF02Df/PE/y3ALVrAGMyCv/mhk9LLy' +
                    'ccFhsYGf/TJaeRO9PCav/fYqeWLP/UE//hRv+0DvC6QqeDDrWiHPecAP/GCtGeAoVXCvDcXKebSdOwWLF3CP/ic//sdvWnAIRuDWMtB3toDXYuAnU/CqJgAm9KDXBZDXtrLf///yH5BAEAAD8ALAAAAAANAA0AAA' +
                    'Z3wJ+wAxP+FiqjkkY6vnBK48HkEwl6xo4UIUCUbEJLaMbhjEASTBrd+qUGgQGLQs8UIB6hb9Co+CsPOx9CCzEBDRmJCg8FPEcoJzU1BAQ1ERo7Gi4yExc8BgYMEQk3Dg4bSisJEAkADlFCDDkfF66wFgl5PzqoQk' +
                    'EAOwo=' +
                    '" />';

var closeButtonIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA2lJREFUOMu9VF9oW1UY/917zv3XJC7p0j4YFTTS2RJwrB' +
                    'AGe9hgT0P6KlTX+DBh6WAi00otDhZlXcKwBspo+9i8+DSHvraQMlYznViVjuYhbWY3blNzk9zk3mubP/deH0buGoJuE/SDD8453+/8zvedc74f8B8Y8zTAuXNnjxeLlUy1quPQITf6+nzs0TePvHrxg8tbz0WamJ' +
                    '4KLqd/zDWbLbAsC4ZhwLKsE7csC5SyOH0qTD759Kr1j6Tl4n3mw0tfvLb9sJAjhIBSCkopCCEghDg40zRhmiZarRYCL/qHk1/Gai/0vp5rx8lB0sJuJbj9sJDjOA6iKEIURfA8D57n0T6EEAKO45y5pv15/s7qD1' +
                    '+vrf32qM3j1HQ9/lnP79s7OUEQIEmSQ0gpBcMwYJjHRbXHlFLwPA9RFFFUqpmvZmLHuzK1wTUIoRBFEYIgoF6vIxwOY3BwECsrK8jn81AUBW63GyMjI9B1HYZhgGVZsCyL/AP5/Ww2G3MyTc5ccds2IAgCbNvG7u' +
                    '4uNjc3kclkMDo6WolGo7BtG5IkIZFIYGhoCEtLS5BlGfV63bnzuRvXRCfTQOAl6Mb+ZcuyUCwWUSqVYFkWFEXB1taWNDU1hWw2i0gkgmAwiEgkgr29Pei6jmazCUEQwPM8Go3mt3fv3pMpABQVtW6aJsrlMnRd7/' +
                    'gey8vLWFxcRDwerwDA2NiYr1arOXFVVfE4sQBUVbsHgGEBoNFoQlVVGIbhlHLQ0+k0PB6PD4BvZ2enK65pGiqVCpot68nrM4wNTdOcRzrofr8fs7OzmJ+fhyzLSKVSXRhBEKDrOjhKnpD2+b3HKKWQJKnLk8kkCo' +
                    'UCUqkUpqenEQgEMDk52YXjOA79/d6TAEABIBwO/bp+P4eenp6OdhwfH8fAwACi0ShcLhdkWcbc3BwmJiawsbGB1dXVjvs/dvSN7502fZS/I7z97sS+1+sDx3EOKBQKwTAM5PP5js2hUAgAsL6+7qxRSnDz5jdMR+' +
                    '8nZ65wK7d/abhcrn8ld2+dOeF95+yFapegfPzRRY9a3asdFI9nsYWFhQ4e2iF5iet2PH71sFLSS+1ef5q98nL/8DPp6Xe3Frmf1nINy7L/lowQFrHY58xzK//t9C32wfYf4XJZy+jGPtwuEb29nuHIe+d/xv9tfw' +
                    'FATFKTqjXpOQAAAABJRU5ErkJggg==' +
                    '" />';

var updateGoodIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADaElEQVR42lWTX2gcVRTGvzv/dibZmezOrLObmNrGVttKpLKWKGit+NLaB4sU8tAiRPDBFhUf+iBRKiKhvolQoQUtTf' +
                    '8kuytRWzRUCqVYaggl2+oiphZTXKPtNknTpMnu/Llzx7MRH3Lh4zAP3++ee843DHSGhkuFqVr9BYbYA2N+QpM8x1R8XU94kqZT1b2krvkJRfF8HvkiijwWR35jaWmQNQFfnhkZO1SafjZmEiAxhFYSjZ6tMJgAEx' +
                    'ECHkDwEHJI4hHUiGPgGRPJxemDK4Avhr79vXCdPyboKwaDLMtofXoLJElCJGLUI4G7YYT7AYfwSVQ/zSsQ1V/eXgEcOX129psbzCEHdFmCSsp0b0TC0CHiGB4Blghwm4z1kANBhE+eUnG3MrafDRdL0m0pFZybjG' +
                    'S1ebMiQVNkuOsfgZm2/uuAzA/IPEO3/+OH8BshjvYYqJYvv9kE2FejzNzx6x6ycoyMocHUVeTW5JDrdNEg81w9wEw9xPSyjxsk7oX4cWcqrl678kYTsOFSmL15fIrBqS/DSahIkpxMCu1r22mAAvfJcK8RoEZ1iq' +
                    'qgemVHMvrr14nX2VDxq57vvNz4cE1H29IismS2mpBWA+lcBhIEnnMDLPgT8MI5xMwm2Gb0dYL/OVl5jRWKpZeH5t3R72cUaIGHtKIglVBgaCpSTht6n5jDscmjELRShYbLaaCm3IL3N+0V83/c6WWFQnHfpXup0+' +
                    'M1AZ/eu1Bv7lxAp430vdiB0fAIHB1IqYBKMelp34bnH34JBy4exscb+/rZ1yMj74Rh+FlM64qoYU3TEEsKtQuI9Q8wPn8WdsJBLDzYRgZv5T/Cqd9GcPXOOWzLvPozK5fLXRSFrUIINwiCbOD73Zzz3SRpYc0tCs' +
                    '9F9G4+hgu3ziCf245lruFUpR9dbRy28srsSpD+Pz+cP/+453mXVU11FVkB1i7i2uwAut092LmhfyVUAz/tgywmaB4m8g99UF4FKJWK76mKethqs5BOpeFkbZSqB+g5N7EltxeR1I3K3/30v4GG/CR2dR56dxVg8M' +
                    'SJdclk61jatnN22obR0gLZCnBh+kMKUgVcyFBYBDeZx/aOg6OMa7tXAZrn5OCgbVnWftM0dxiG8ShjTDOSiZqcWRTL4WyHqblVS2k/yUPxeVfHJv4vpD6OQ8IRFmYAAAAASUVORK5CYIIK' +
                    '" />';

var pausedMessageImage = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAAAaCAYAAACuJFCeAAAAAXNSR0IArs4c6QAAFUBJREFUeNrtXHmUVcWd/uq+1/2abuimabohNIoedfQ4J4K4EI2OC1lm0FEmBh0wEkVFMo7GYH' +
                    'I8QYUwrSGbtAnJETWEwTVEyWQCRGMSgyK7oiBi3Gh6ofd+3f2Wfsu9t77549V9r+59972GYDLnIHVOnV5q+9VXv6/qV1W/ugLHw7CB5EIAVQAqAAQA2ABiAPoAdAohnjuO0vHgozezAIwHUANgJIAgAAvAEICoEO' +
                    'KHokjhs1WhcgClSvEEAAnABJAAEBdC7PyYhD1XKXiZEhRK2KRq5/WjrP881Z8RAEKqjQAAQ0Wh/R5UfS5XZSrVzzKVbioC9gJoB9AqhHjhGFemswCMUmMUAlCi4afrkVQTlKnGbkgI8donkHz/AuAEABMAjFXYBQ' +
                    'EQQApAHEA8WKDwNABjAIxWBR1SCAVuWlUwSPKfhBCvHqWwFwGoVqtMuRpcqEEcUu1c9NcOJMmLtf44RCpVfTI8MaBiqco3Qsk0Qv0Pqv9l6ncHzGNZmaaoWXyMmozKNRI6uEEpl0PAlJqkoyRnCCF+9wnjYLXCa6' +
                    'xGwFJtYUkBSAYLFB4LYJwCvUopnwO2A24MQL9KO9rgzBKj1QyrK3ocwMBRtuPUryuQTsCAh4RBbRUMqVgKIc7xaOZaTdGO5VCl8KtTGI7SJrGARkAo/bDU2A0BiADoJ3mdEGLtJ4iAtSqOhRDXefTmTYWRlUdA0z' +
                    'Q/b9t2bSAQGAegFnPmfA7PPvtpV6avfGU/nnxyq2PSkbxJCLH6KIQ9UZF9NIRY4BF2pRrw8qOsfyyAaghxa8FcZWUSNTVpTJ0ax2239eGKK5KKiI655Q1jlKKZx7gyVaoZvRZC3F8wVyhko6YmhbPOGsAttxzANd' +
                    'e0AogqAleSvFUI8fgnhIDjFQHHFFgdJQCZtwe0LOtaIcSJhmFMkKnUOGPChC8hHC5zZaqpSaGj408oKRkAEAYQFkIsITlfKaRU5og3CJ89VqVa+aoBjIIQV3sI+L9qEPvVShhRM2tazbZ6W0Jb0Zz6q1TdGRNXiC' +
                    'sOG8Jbb43iscci2VleiDqPbLvUQUw3gB6FRUztfSwlHzX5+LewED2/UzMFKYR4juSXtb2aE+kxGbNmkdq37dJM0H9X+5mJEOLOw5Zszpw2PP30HjVmg9r4xVRbJgDbtm3pKKRt2zIUCv3KsqxZgUBA+Mit69Jfg4' +
                    '+zT3WiLYT4H9XPf/Oxhrx1OXhJIcSvVblrlUVQofS5RlmQdQBqIMR5Hr3pceRwdaKnp+eKMWPGTAQwyTCMCXjiiTPx1a+e59utX/7yPVx33SEN3JgyxcwiBNT3WSXKrKxQK2lmlRPiAo+w25xTI9VGXGvHIaC3DX' +
                    '0PV6HqHgVgJIQ431N/CwADpimweXMIN95YjdbW3Gr36KNxzJ9vZYZcVHnKvqf6P6BiVMmX9iHg35KE8NQvPT+FjxLrSuiYjAnVh4gi4StKwW5SVsSJEGKeB4OPFH4GXn01hBtvHIu2tpxl1djYhLvuala4OPgMKQ' +
                    'JaUkrbMAxbSqnLQ8MwIKU0DMMQzs8jJF4hjLwTj65D+hmA4dOWi4AatiVqm+Ic2jmT/mg16Z/uwSziO4tYljVLCHGyQ0B+8YsXiZdeGgsAmDTJhBACBw9mwL3yyijWr29SYDqkcBSvGAGFRkD9oKMMQAhCnOER9i' +
                    '/azJxQP3UFL0TAoM9BSghC/IOn/l4X2Bs3luDKK0dm0889V2LXrqQiYLmnbJtzGqxhkNQmh/8vAurk060D4aNIlnZiGVOTaRjAoBBigyLgAgCTFAHneDBo107IgfXrS3DVVdXZ9MmTk3jrrQ8945dyxlBm2OWMo5' +
                    'RS0iEgACGlzK6Azv8+RnxsjfTeBaIYAaUPaUMaCR0iVqhFZaIHs+yZQdDH1q8CUMWOjjHYtKkmm3LDDSkIIdDQkCnz0ksj0dtbjbFjy1Rj6aziCXGhp8HNWQUQ4rOetP0ASiDEab6w5RNyT7ad7dvL8NBD47FjRy' +
                    'W6u0Mggbq6NC64IIq77+7GtGmWRvRS7XTVtXNxAX3ppW7Q333XKLD/gyJ2ZrXdvr0aTz5Zji1bynHgQBnicQMjRkjU1ydw2WX9WLy4DRMmmACIyZOnYO/e3Go6b14rVq06kP170aKJWLbslOzfZ5wRxbvv7na1vH' +
                    'fvCPzwh/XYsmU0OjvLYFkCtbUpXHJJGEuWtOD00xMeAgJCfM6D5Xo0NNTjiSdOQmtrJdLpAKS8TxEkpeUManthb9CvqAQuv9yd+sEHIQCV2L59NJ5+egQ2bx6BAwdCDj6Gg8/997egvj5lGAZJOqavMAKByz0yv6' +
                    'L155KCaQDws5/VYc2a8Xj//ZGIxYIIhWycdNIQLrxwAHPnduLiiyO+W5g9e8rxox+diC1bqn2wbVbYugmYTpdg8eIT8cwzdejqKkV9vYVbb03gnnv8zgcCeeS2LGumbdsLbdteIaX8DR944AABEiANg2xqGmBTU4' +
                    'SGwez/GxujJNtJtpBsIvkhyfez6U4k31XxLz5pbSQ78v5fKJIHSX7ExsYuBoOyYL5gUPLhh3uz9ZM9JMM+9cVdMRYbcqVXVJBkimTKp2yEZJhk97Byjxtn8sCBD0i+w7VrW1xpEyakSb6TjRdfHHWlNza2u9JXrm' +
                    'xjKFS47yNHWtyw4QDJvST3ZKM33+zZ7T59WkLya2pf4xDhTpIPkXzeJ3+Y5CDJKMkoYzG37OXlkmTPsPjU1aX50Ud/kVK+reTeK6V826e9HA7F0u6/v/MwdGkPybdc8ZFHWg4D2480XPeSfIdXXx3xzT9vXtqnXd' +
                    'OJOgHn2rb9Hdu2/1tK+Qd55plxp4C85BJTKVuMl15qZSs6+2yLZD/JPpLdJDvzyCSEQ7JDJA/5CNOn6oiQjPqkx1TagBrsHm7aFHZNBJ/+dJpNTV1sbu7iWWelXRPHq68OqrIZ+fPrH1IxQ8CNGxOu9HPPtUkmSS' +
                    'YLlM3IN326yeeei7Cjo5em2cW2ti4uWOBu74YbYiTbaNttPOMM98Bs3txNso2JxCGWlUltwCUHB9tItpJs5datXQwEcuXq6y3u3t3Jzs5DPP/8nIxVVTZbW9tINqtJ66CvMv3kJ/vZ2/sCySdJNpL8Nsmb1YGEQ8' +
                    'A7FAHX+WAwkB07MpaH3znnWCQHOH26yeefj7Kjo28YfFpcMV+XWrMxX5Zc2vjxlitt3boeJpNtbG09xFWrejltWtKFDXmQW7a0+2Dbwc7OtiLYtvCpp/pcbU2ebLG5Ocrm5jinTLF95LScmLu8se07bdtulFKuk9' +
                    'u3v+kqsHp1XCnaENescSvO3r1DagAcRe93pQcCDsnCBVagqFL+IZIJn/SERpAoyQivusotw4YN0Wz9Gza4SXz11aaSPdOG/woYo2lG+MorMU6a5AbssceSRcomlXxxbaLI4TA0NODKP3GinZVz9Wq38t1xR4JkmC' +
                    '++GPHMoEmSvdk4c6Z7JV61KppN27TJ3d5ddw2piTEzOXrlf/jhJinln0mus237UZL/Zdv27SRnkfyCRsD/IPmjIivgAE1zkK+8Ei+AX0SLOj79Pvj0uGK+LuWwyJcll1ZS4k5bvjzGffv6mU73etrozsaZM5NHiG' +
                    '0PyV5On+7Wx40bHX1N8He/Sw9LQMuybjZNc6llWaullL+Xt9zSlc08apRkLBbJEjAWS7CyUhfE1BQwlreKZUCLFFnhcuTzX2WSmqJnOlZb6zYRwuFY1gQKh2Me00Zqq1zisE1dgJw/f4i23ZtdoYvJ9tprSc6ebf' +
                    'LUUyXLyzOztTd/SQmzOJlmjCedJDXlk7TtGL/5TfeA7dwZ1xR3kHV17r63tubS4vFBV9qZZ9pZZSf78uTp7HyD5Au2ba+xbft7ytS8luR0jyfMbSR/QPJXR4TfbbcladsDJAe5eXOcs2ebPOUUexh8BqWUg1LKTJ' +
                    '8K61KkwJYgE88+2/KVKRQiL7rI5Jo1cYVNLh45tpm0MWO8+pjI6nM47Ld1STsx40uVSt1rWdZPpZTrZDK5WdbUmIcNcl2dZDqt76NiPqBFsyZKYQIWWwETLlMxGHTnsayYS7HzBzUnX7G+hEKSEyemOXPmIDdubF' +
                    'V72ma1z+0paL4+80zKZRIX33fkBmfFCtNjhqY4eXJuBZk61c5Oao5iefteLGb2X4NZ8z1fllellM/btv1j27a/WcQV7WaS3yX57LD4nXCCyS99KcYXX+zJ7r2ffjp2BPhECpLMrUvRAtZUJm7bFue4cbJoW0uXul' +
                    'fnI8c2s6joZmtGH3OLimkmik3cwaGhoQYhRJWUcgyAkWLt2nFGX1/wsA93u7sFNm4UmDnT8k2XMncEHIn45bCHOVq2847vq6uJnp5cmWiUGD2a6nd3XdXV9K0jp13NmjtZUrvHNDRXtBGa76fr7AqAwNKlIdVP5+' +
                    '4rhQULLJSUAMFghY8zQibefDPR0AB0dzundkHs3WtojgCm50ohv+/FwtCQ8Byd5+UQQkRI9kcike4iNZla9OL3gXad4VxBBVynz9/5zmgPPgksWGAqfCqLXJwX0yVR9NL9M5+x8dFHcfz2twFs2RLAe+8Z2L49gF' +
                    'gsV27lyhIsXpwsqFeHhy1RVUWEw159lOp3owCeAEAjGAzWGoYxxjCMUQDKxFNP1bqyvvxyD8gOkJ0gu0B2o6mpD4ZW7y9+EdCuIUyEQvoAAYODmbumN97wU4K0duyddtWbAT3tqhtIY9o0tyJs3cps2tat7jYyeV' +
                    'M+R+tOiChvli4AhwC0AGhWP9uUl0tY3Y95Q6bOAwfcQs+fn0BZmYn9+2XRy+ARI4A777Q15wYD6ggeI0cS11/v3Jelszidf37ac8zfD7JPi2EVM3/ruOWvbHEpZRTAQHV19ROHQcBC+PUrnDqQeR3SrvAMA4igqS' +
                    'ngwSeOsrI09u+3C+hDLpaW0qVLAwNmEV0yXbGiIo3ZsxP46U9j+MMfBrF//wDcnieGK//555vDYKvH3qyMU6Z49VFm07Zt8+tj9k7U0JyTS9DeXoo//zl3P3XyyWlcdtmAuqCNKU+GKE46aRAXX5xzQH7xxRJ0d6' +
                    'fUpfwQTjnFLdDPfy7Q15fC/feH/OYSLcZRW+sW+I9/tD15Eli4cBBCm6gWLQqhuTmN1tY07r03t1IZBrBwYb/mLOD3aiGslOcQgIMAPgTwgfp5UJGwSymZv+zjxrllXrsWCIfTWLiwtMCKnrskv/12icrK/FzXXp' +
                    'vGqFEJ7aI/Mwbf+EbY1fc5c8qxa5cJ00wgEkli504Ty5YZmDx5lAe3ofwrVhE1DCNiGEZkmPne1JwhvKFfw69ZYdas/s6QsLbW9HhRAeFwEgsX+jnYJ1zx1FPdltWqVQb6+pIFdClX7rzzRmLFCgP79plIJBKIx5' +
                    'N44QX36lpfb2l6Ec/D9vrrK7Brl6Vha2HZsoDCNtfWTTdFXfUuWhRCS0sKLS0pLFrkJ2c8O6aWZT1rWdY6KeUGed9977ls1W9/u5XkTpI7SG5XcQfJXXz88SZX3gcf7CC5j+Q7bGxs97Wbb7jBbx/ytop7Sb7N+f' +
                    'N7iuwPcvc83/9+OwOBwjZ+ICD5gx8c0u7C3iL5pk+dz5F8hOTSAvufpSr9uQL3SG/zgQf87zFnzYoUODWMZE/JyCS/9a38A4MdO7rUHnQfyd0kd6mxeJ3LlrUU7XuurX0K2z0kd/uk/5jkt9TDURTZA/4rydtJLv' +
                    'Op4xmFz3c9ZR4kuZLkc7z33nd95bvmmv4C+rA3G5cvbzsCXSp8R+iNhkE+8khL3j3g977XdpjYuuWcMWPAN9+cOX5yvknyDZKvC8uyHhdClAAoFaeeOkM0NVVljFODeP/9l8UppyQ0typnDxPE0FApxo+/HNFoxj' +
                    'vitNNieP/917P7uSVL6rFqVT26uspQV5fEjTe2o6GhDYGA13vhZZftnkgEcM89k7BhQx3a20cglTK0vO53h1u2VGD58nps316F3t5Q1lF82rRB3H13Ky66KOrxdCCE+IKn/RXKkbpLCPGYj/LNz3q2C/GfnsQ/Zd' +
                    '2XGhrq8eijmf6OHZvGl7/cg4ce6kAo5HXE7UDuKVTG5enllwOYPj2kuW+l8dZbBzTLY0itQsy62W3dOhrLl5+InTur0d0dgmUZqKw0cfLJQ7jggkHMmdODCy+Mudyu8vu+FIfxoJjk5wDUA/gUhFjmSWxUq2CvEO' +
                    'IR/eQ0+xwHqMZ9952F1atPQ3d3OWpqUrjmmk40Nh5EKHRpUX0ABJYsOQGrVk08DF3K6ce2bRV45pmx2Lq1Ck1NFRgcDCIQIGpq0pgyJYI77mjFjBn9vp4wW7dWorFxInbsGO2L7ezZ3fjsZ6MuOVMpA4sWTcKzz3' +
                    '4KPT0hjBuXwty5HWhoaEUw6JXz9w6nhG3bDdqGuUQphqH87qicZU21waZSuBItBop4rB+pz6LQXjTodR2p57ufQ7Ke5jwqHlJ7ux4A3UKI9X6zv/Jqr0XusxTeF/XCR/aAdhih+whWaIc6mToaGkJYvDhHwIcf7s' +
                    'DXv96szON+tc9KKdmDRbD3YkXPIYzudB1R9Xch81mN14oQ8ALl3V+rHIzLkfs0R1zJ2CeE+I1W5krkHqM6D6GLvaTH30AfhtM7qfnrQhs3w6fNQvrlJ+fhjIMNwAqSbBZClBiGUSKlLDEMQ39gKQ3DcAbNFEI8qh' +
                    'xz8wj7VxLQz2vfGKYzR1K39HEMd9IcB2TnqVNfoXNeBVZSkXWE5v8Y8Hlp4P20hXOK6vjZjgZgQ0oiHC7Dpk0BrFhRoj31sjBvXpt2MNQlhFiklPprmpN56REQUHc+dvod10g4OAyuUTXWUk1azqc5LEVm56mRvr' +
                    '/cQPLzKv+AZ+IyChDw49aHj+M1RLFJYjg5UcAB3BkHUwCAaZr/rMzQIIBAIBAQtm0jEAhkveV1E0V976K0yCyMAkIM925tls+MdzhvwIrVLYUQz5O8xpPHedk/BCAmhNhdZAWYityj4GKrn5eEQaWsI+E8aHUeae' +
                    '7ZU4spU07Na2zVqg8xb94HADrVQcYhIcRKTZYZw6yAxZTO1lZ/51MaUSHE28NqLvmPyH1TR/86gvPNnjcLlLsQuW/9lBaR+ePUh2LXGnlk8HkPOJyMRyqn3wpoCSHWH83bquPhSKdfsgHApwCMw+7dE3DOOVMz7z' +
                    'FCxOmnJ3D33a2YO/egdqrYou+rjodjLwSPQ/B3De3ZmXLqVAlyALnv3zgfoMruy9TP4+E4AY+Hjyl0aearrfZPpYqUzgeowtre79fHITu2w3ET9O9vhs5RZqj3U3UOAfsU+dYcR+vYD/8HshtVUk4+/YMAAAAASU' +
                    'VORK5CYII=' +
                    '" />';

var experienceIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAOZyAAABAQBAUAARFQAFBgAUGQANEHvl/wMJCwBIWwBLXgAZIABLXQArNAUOED/Z/0Ta/wAbIgBDVAArNSnX/wB5lwBedUrb/xHQ/wB4lgYQEwA3RQTC8gCEpgCy3h' +
                    'PE8Ifm/wBgeBZ+lYbn/wAvOyhSXAC/7wBfdwCPsyU6QFOSogAiKinU/wDG+ABbcgAGCCTT/wTO/wGbwkDZ/3nk/wDC8gMFBV/h/znY/wARFjHV/16Pmyx2iAAKDAAKDQBJWwAICgBmfxU4QAEDBEfK6gCiywA7SQ' +
                    'BngRFEUQ3P/yXE6SE8QgB0kgOjyy7X/xjR/yg7QB0uMhxCSxU9RxtvhAI6SA7Q/3nM4QBuigB6mRc4QAo3QQBiewA0QQKfx0nb/wB3lQUSFQBlfwGgyAONsAACAwCWvSk7QAAqNRrR/QTB8RvO+1Pc/wIJCwjQ/x' +
                    'rL+AA8SwidwgCFqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHIALAAAAAAQABAAAAeagHKCg3INGYSIiCQ7iY1yKUNCjoQ1VhZUk4NQIl5jiWBRSihPZjozD25HWUFaRQ' +
                    'QHUzI2Bh8GazkvTRMeXRUFgiNMajcOK05IG2UgKogFSywXVTAlJwg4jnBtNB1EWFyObElpcVcYFGE8jVJoHAEMPkZfGo0hMQECcgILQCYAiGRiEvQY9ONNCwiIJGxxkehMBH+DFAxwRGBiIAA7Cg==' +
                    '" />';

var badIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADW0lEQVR42l2TW2gUVxzGv7Nz2yS7m2xMNpusuWxq3EKLfSsJjVDEtlgLIuQiWJGKF4qlVFpL2bRpDN2l1FYRxZcGBL' +
                    'VaDaIkD5XapIJIQl+KNj4ktFm7ZrOX7H1mNzszOzM9O9G09j8cGGbO9zvn+18I/hfhUMjLctxBXhC2EV33GoYBg5BQaXV1WlXksc7NvtB/95NnL08eP2ZYhhnlCtLxJ1cucisz9yGnk+Y/oX4DGnt64dmzVy1yws' +
                    'myrg9v8vm0dcBSOMzwPD8u3bm9e+HcaVid9WAF6zrdoKssl1DKpNF19CNwW1+/qShKfwVi7kksLweKUz/7F8+fQbWrCbzNDr0g/QugBIvNBkUSUUjE0fn+hyA9vcGOrq4hEo1EvNaCNP9g3yBnc7vhenMH3O/ux9' +
                    '8jn0NZ/GvNwgub0P7lV4hcuoDknduQYjG8dOGyKrKcj6SSyUD67Hf+/G+zqKpvQNf578E6alEW84gOD4EQguYTATB2O7WQwdyh/SBFCY5Xu1H13pEgEfP5mfDAO91cTTU1SlDV2UkFQSpwQKMQQh8LFcvZLB4e+w' +
                    'C1mRTA0K2FIlwXx2eJmM3Gwm+91uTwbYQmGdCTUTDtLWg59yO9SZ1poSJ+cHgPGmPLsDQ0w1JDIC4swT0xFScSBSxRQM2LHmjpRWh5CcLmLXB/ew3MU4CSyyL+ySDUhYf0mx2M0wtpPgLX5DQFSNJMvO/tbsYiQp' +
                    'ejsG55Ga7R62BsTvNkmgLwtXXUTgaxLwag/DEHi9AMTbej7vKNWZLNZALymW/84sQlMM02tF65T0+pN8Vzn/ajpVGD67MbNCdOlHNp/DnQCzYhwr5rH4xDR4NkJZHwVou5+ejgGxwsMux9e+E46MfcMeo5/7tpgW' +
                    '17BU0nruHR6a9hnfwBLHi4rv6k5nirz+yVbCoVwK8T/pUALRtnYJVeuUbP0O552kk6TSTrBEnmwNAGbhgKQO7eHnS3tg6tdWI8xgiCMG7cvbU7dWoEel41QZVymUFFhkrLaeOw4eMRqD07bpbkUn9re4e2PkwVCM' +
                    '9xo7yUOl6cHOOK935BORZZs+D2oHrrdlh3HlCLguOkopaHN7a1ac9N47NI0pxUxpmubdDK3sogGBYmRIdnWpXlMbfH89w4/wNi4WxKCJsyDQAAAABJRU5ErkJgggo=' +
                    '" />';

var pauseIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEUlEQVR42l1TW08TQRg92+7sFlqwFZCL0LBCRV8Eg1wMmhiMGmOMQYNPxsSEv+ALJjyQwIt/wcTE+EYUTLwbeUADCK' +
                    'J4SbRyL1ZYytLSLe1eW2cHIeqXTHY3O3PmnO87h8N/tbS0JBGedAmi0E4/pVwuB7oWNE0bNgzjTm1t7cLf+7mdl0gk4uZ5vhcu982pr2EyH4kilU6zf778fEjBChw9HDItQ79tWVZPKBSydwF+Li+7BUEciMjrHW' +
                    '8mp1FY4IMoCHC5XPRvDtlsDpquI5nawolj9Sj1+wYpm04HhAHIstz3az3RPfn5G4oCfhBCwLvdFGCboANg2RYMw4QST6DpyGEEvGK/JEm3uJWVFYkXxPCzkXekOBCAKAoQCA+epwCc6w9AFqZlwzBN6LqB2EYcZ9' +
                    'sazcxWqo5TFKVvPrrWrSRUFHjzKQDB95k5/FqV0dLYwFROfJhGWUkxDh0MUSkG1K00ivwFqAj4+jk1qY59mlls9eZ5qFq6neMwOvEeM3MLOHf6FGvSi+ER1FRXoa21GX+mgnRGw6Fg2Tinqurql9lIaclePzKajg' +
                    'xt1tvRcczOzePC+bOMwdPnL3FAqsbJtuPwiCLyqMzYRgJ1wTKZAqRWvy9GSwN7fKxZDr1Xr4cRDv/AlcsdrAcPBodQR+mfOd3OZDos45sqaipKZC6VSo3NLMutHoGwrgt0Ao8eP8HUx2ncuH6NAdy9dx+NDfW4dP' +
                    'ECdDqJLJXgPIMl/nEukUj0Kcl0d5LeLNLDzgTGJyaZhKuXL7G+DDwcQm1NDVqam9gkDNNiTLw8+rlYLCaJnrxweClKHABCAQj1gNtZru0x2nSMlm2DOhAGXbphIVRVZqrJzTrmlHg83qdZ2e6orGx7gAG4mNYdI+' +
                    '2AOAz27ysCZ5v95eXlt9iONVl2ix7PQMawOqJrCrOwc/suQC7HzGTbWXbYDXtQ17TOqmDQ3g2TA0IEoZcnwk1lUyWb6hZzn1OEunKPz4tAodfUM5nbhmn0VFZW2v+kcaecntAsdNFk7saZ1gIND4szpf1PnH8DjE' +
                    'h/b2bB2sAAAAAASUVORK5CYIIK' +
                    '" />';

var defenseIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhDQANANU/AFFzrH2m60V0ukhrpazH/CQ0TYuv8U19yVeK3Cc7Wl+Q4F2O3S1MfFCAzBgdJRsjMjtinj9loVp4r22a52aFvzlPdIGYwk2AzneUzVN/x2iDt8ja/ZS29mOAtT' +
                    '9dj9Pi/jFShI6hxHef6G2Nx0VdiDlLaePs/rrR/SxEaaWwxYCh4lWH1198slqJ1mN5oqLA93uSv05ihUJkm0JusF+IyzRdm22b6DdfnGWV5HSg7YKq9Hul8Iiv+K/J/M3e/v///yH5BAEAAD8ALAAAAAANAA0AAA' +
                    'Z4wJTp4ysaiwRMaHPqOZ9OlcZC4PCu2OuoA3txdOAwmMJycQy7tHonkkhiBkNuTs/hAKRSIDCx+f0TNAAVDjiGh4YKAAMFPx4tCwqSCgsZAzI/Pw8HDSsInw0REQmZPygzAgcXAhAQDKWZCTezswwOsJkPDDUgja' +
                    'VBADsK' +
                    '" />';

var staminaIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQANU/ANVbbJmZmkVHRikpKVV5Wq2fnux4itCxt8fIx76WnBYWFjU1NYyNjaVweJOSlNxqdysVF3t6fgcGBnR0daOhp76/vnZze7lcZOaMmq6Bh7KtrpN8hIJCSaCXmI' +
                    'GFi6qurmVjYm1jZGhpapOLjHRoa1EpLnJvdt9KUeyQoZ+foLKJkeBpfE5QUO/w8FRJTOJTXpSVmudVZNHR0sdkb91wfICAgIR0d7t3g2VeZamnq7NWXPJugGRWXH9BR4BfXAAAACH5BAEAAD8ALAAAAAAQABAAAA' +
                    'aJwJ9wSCwaj0OJUFBTiByBQIohWAxSFeEA8SFUWjJExOKBRSZCBYlAGBU6HQvFQclFhJtXiMVAaDQmA0UDADsJAiA8LjgBCkUJJzE+IgsiCgMTSkMDNAYABJcDCgQOmkI2KwYNggsCLI5FGQ8oKrCmRTcPGAe3Rw' +
                    '0XM7xIQyU9HDrDQxDLvcnOQkEAOwo=' +
                    '" />';

var huhIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADW0lEQVR42l2Te0xTVxzHv+f2PniMlQpLAaXY8oxhg5FIXNjQNHGSOTFN6EzmH8THZqJuzixspnUs0wGLxkf2yIIxZn' +
                    '843IaOTM3mNCE4fCaii84QTKAWJrTYUqBl13tv7707PUaHO8lJzuv3Ob/vL78vwf9GIBB0CgK/WZIkt2GaTtMECMyALMu9qqodLSsrCcx/T54sgsGgheP4PQkZLce7B4TL1wOYmkqwuwULMlFX68LbTdWayCf3G7' +
                    'reWl5eqj8FjI6OWURR7P7tj/uew50XYaMBQpoA88kvdKEpGqan5rDj3XqsqM3vUVXVm4IwwPhEqO3cpVHfoWP9yLFbsajAhuY1VSh15MDCEYwEo+jquYl7oRlEwjP4YOOrqK95ob20xOUnDx6MO+MKN9T43gkhJy' +
                    '8bz2dn4MSnjbBlpT1TG01LYlNLN4YTjxCdmMbJQ15NIko5iUQibZ8fv+XrvRUEny6huaES76+tZkF7v+lFPEPCvg11bP9913Uc7L8HXVbhrnZgh6einczOzl6t9f26LEPiAVXFYpp+cUE2JN6Cb3++iXc8L6NjfS' +
                    '0DfHXkIr67Mw5IImQlib5P3NdIbGY25Np52u502WFMz+Dv6BwicxpAtfs9VdjrrQEhBAN/jsF74AKstEaczYrAcAiDXzSEHwM+PGMvcuVh+OE/iEenAV1HXUUe+v2vs+BzfUN4q/MK4oKArFwrinMzERyZwGAHBS' +
                    'QSias1rb8viwtpmEiogIVKod3TvHQhWt+oYKmv/OgXjGRksqyQ1JGfJSJLlXHZt4JKiMXafCfv+joHQjAIRwEWNpeX5uIVh5UBjp0fwiRHzw2DZceZBrbU2OFfXdxOJicfOqMKGar67IKg8gL9hT7kOHQ0LsGulS' +
                    'UMULXlR9wW0x8DDB2ipmFgt1t7jjwqZ40UnYq1/XAj5Nv2022AVh80k49XlWHra04GaNh1GoO8RKVRAO2Hr9e9hLVLstsLFxX4GSAcDltESeruuhH27Dx1B6qRchCZZxWT1UWk24NNL6Kp0tajKIq3qMihPzVTCs' +
                    'IL4p5J2Wz5su++cPavEMZiMrsrtKXjzUo7ttcXaTZe35/U1FaHo/A/M80fqZqk7CwIglvTTabBQswAtXKvoqpHFxbkP2PnfwFXFV5DkrUSVwAAAABJRU5ErkJgggo=' +
                    '" />';

var updateBadIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADcElEQVR42lWSa2gcVRiG3zO3nenOTHZ2N3uRxrZaK8WAVWsqSKOIEItoqAWlrYKiQiJWiwhKQPFSafWHIlhRsKUp7W' +
                    'Z3a2yUukR/haYlaYtrNVTSC0HXxbCXpJt2L3M949mIP/LBy8vAvM855/s+AlapkWx6rtTsJfBNEGIFJM6MaIIlywGTk2TmsqnKkhUQBNNyPYt6nkl8z2rV68OkDTh0fHTq3WzxAZ9wAEfg6CpaPZuhEApCPdiuDe' +
                    'o64B0m14Poufhoiwb1RvHNZcA3qbEr6YvuHZR9+SDgeR7B++4Gx3HwqI+mR1F2PNRsF9RiYv7ZvQJo4fc9y4Avjn1fPXmZRFgCMs9BZIp234mAIoP6PkwGqDPAPAs2HRewPRzYJKI8MzVIRjJZbp4L2T/MerzYPl' +
                    'ngIAk8YrffCs3Q/7sBC99k4Qo7/R/LgdVy8FWPgkJ+cqANCF/woguHL5qI8z6iigRNFpHoSiCxOoYWCy80bVSaDooNC5eZXNPB6cdCfuHXsy+1AesnnPjVw3MEkWYDkYAIlSkSDSG5JskaSFFjgcWWjRLzOeaU+d' +
                    'k+1fv70i8vkFTmRM8pM3FupCSjo34DcRbW25CgAiMRBQeKRwwLG66cQXCpjLIWw8+xe7BrDXH/mp15jqQz2W2p67HcjxUBkm3CEASEAgIUSUQo0oGh6DyErz8GRyk41lzKGupLEjpfeZ3OVipPk3Q6s3tiMXTsXI' +
                    'nCYu9darZnTiGziQw8mMRDx99H8vEnlgFL4zmEt+9Aq1ZD9cxp6K/uHSLfjY6+5jjO5z4bl8cuLDG6zwlgz8T9jQr8sTQi255E58uDaJyfRrBnC65+sh/e9CSkHTt/I/l8fh1bhc2U0pht23Hbsrpd1+1n4u669g' +
                    'f86Rzc4p/o/PAg1K19KOdGUT/wFsTVa+H19leXF+n/+ml8fINpmpOiJMYEXsDGagnOoX3o2P0sjOeHUJ04iejDT6H65RDq344hMPBOfgUgm828LQrifr1DhxEykDBCsAafgdK7FTfZNIQLKQQffRGLhRrkSzOQ3/' +
                    't07wrA8JEja1U1OGWEw4mwEYayahUijetofLAHznwR4NlPbJPFrnUIvrEvZyta/wpAu44OD4d1XR/UNK1PUZTbCCGSKgml5MI16i9UbuGj8QK6Nh51PP9gvHuT+y+285cc/rnNdQAAAABJRU5ErkJgggo=' +
                    '" />';

var processIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADhklEQVR42nVTbWxTZRQ+7/3qvbe77W1X0q7r1i0q/KCMtQsdDscSidkH1GEd/tAtmkwHw0Wz6B+dwcQsmiEyBzMm6D' +
                    'aSZcHIDGNCXIjRoWFKYjrBNoyW6Uqh7b3Yfdkv6Mf13RINBjnJ++PkPec55zznOQgeYoPHjzkZhjHlcjlf58FX5x8Wh+53RoY+30aSVJei5Ns1Wu14SWlpc8DvfyORSJzZYNhwKJ6I97zQ2hb+X4B33n6rwPV0c2' +
                    'izzSae+3qyWxTFequ1rGFu7loPRdNVDE27s9nsd7v3uHY9ADB4bKBJpWI9Gq2mbe8z7sOyJClrf3lFgbvptBJbjEEmk1XuyFJNKpnMEASZf7619dd1gP6PjphqduzwcxwPweDCdG3tThduFTL3MoAIjI+h1nzMRU' +
                    'aW5EmSJPYmk0lPNBKpfrljv4I+7Our2FKxZczuqLKp1WqQZRlEUQs3AjckRVH8hQZDFUWS/BpINBoFgiDgr5XVc6HQzbau115fRgP9R0VB0NBGk2nCbrfXkBQFsx7P+UQi3vJsy770xUs/WAp1+kscz5XeXpZASW' +
                    'UvRhflAyvR2K2O9v1xNH76yyWj0Sjq9YXAcRyw+F29csXR0Ng4uzbj996Z7rPhmb6pm5fprJIHhqCgqaQa6tCmKddTuxvR2YkzS7hNTLoIQoEAPB7j+tw1xxO1O2d/CvyyZ8D/1WQwEUICA0BjSgx8EVQUVoJPDu' +
                    'SfM9btQp8MHhdxIl1WXjZhNJpqdHo95kE6n7ybbIlwsQsnAiO1Fp4FgaaAxtUPVvbArfgSvHv5feh89KVv0MnhoQpzcfGYimVtLMuCxVICeOcQjoQlH/pZH0l9Sz9u6YTphdPgND8JjqIGeG/mTShRx8DINEloZG' +
                    'jIhKv7EVqXxLTZXOyiMQDCbP+WnobfV4bBtfEIiKwVCmgtDHsH4M7KKeAZFh4ROhfWs8ZGR5vwnj2CRmgrMpsP8xyviDoR5fkMnPS6QUUqsG/zCUjmNPDFVTdwVA4yigbc5Z9+9q+UP+jtLXBu3x4iSEKMhMPdOp' +
                    '2ufpuzusG3egF+DPUCgQgAwooFdR1Hs1BXeuhPPVHueOCYsO67UqlUOz6e8Uq7vfmP4PyocRNnD6xO2ZbTIdCxZbBRW++hFPWLj5m3ev8DcL993H/USVGUSaVifK90HJiXF29vRYiwZHP3gkUGq/efuL8BeLNcQJ' +
                    'E3FaMAAAAASUVORK5CYIIK' +
                    '" />';

var energyPackIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhGAAYAOZ/AFcqAO96APLpzPXHMv3012g2AIZRAvniksS3nue6RHZCAPvoqfjXa9KdAO9pAPO+EbCJKePXw51oAbGVZS8oD2FbR/767NurF/bSXe+UAPPELdOsQ++HANC/q6' +
                    '2PTQwIAufEV3JbErF8AOW9N49hIfTBG/bZeNvEiubTl/TEJvzsu/DLUtW9cKVyAaJ3MLiEAtq5VfXcjcZ4MbyJAOKtAdmlAO65Dd2oAPn4+PXLP/K/FSUUAO2+ItaiAPLu6+u2CXRoP+PJeOfJZvzwysqVAO/JS6' +
                    'NuBEUdAP745v39/f778LWAAOvm4at2APDFQfG8EOaxBMSRAPXy8O9fAKRyDjcyIbSBC////++kALOEGtvMt+izBuK2MOXbt+3iyZ5uG/n39t+tDPHPX+3ALfCjDLOlduvGTcCNAPbhnMueD1hKHd3AZNVNAMKFI+' +
                    'OyD++6AOXPhr+njN3SybiGDO/IAI1gAP734fC+Gs+gH6J8AO+sAOPATevSf+Pa0uG0IQAAACH5BAEAAH8ALAAAAAAYABgAAAf/gH+Cg38fVUBlKHATQFUfhJCDHxURFkqXFkgEC2tqj5GCFAgWFpsYAzkmC0NDBx' +
                    'AUoFUCSUMrbjc9uTU1F2sofH6whBQCSjE8NTNNEszNLTMsQls7kghKB3c3SxFX3d7eJ0FOeZ8VBAQDP0Qu3Q5T71NsOBEvCSZpAIVdFgw6NEtxrshwQPAdDikkXoQxwaWFITsEcthoIEFKkgABHGTEkeSIgRc3Vp' +
                    'gRsQOInQUpoMyYkEQGB4wBuiWZ6aXHGDEiAHiwYOJJjRZyrmTgQPQlxita5tS4w2BJgT0WMEyEcKVNhqtDiV5BYIQIFB0YRCgYYYfBxBNXcKhNgPVKHCMN7KA8KVHESAEIBA7woEFEQoEkOLBgIZNkQpMGW57oSM' +
                    'GlzpEQKlSkuyH2ihM9V8B4ENHjx5MHDzRcMLCDAgMVGPy96MDkzRUfLqx0/vyghAYrBT58SHMATYobTXzQucLExYwbnkE/SDEawCMAI9BgAN6tz5czN2zQrs2jBQBqhepsiJHgTJIIVKLQ0A5aRwkeuI98+rOjxY' +
                    'YgMNJEabD+gfsSKcBXgHOQ7FBHFjAIAYITGqSQwgADiGYEAARGskMBBkCwAQhiiFEEF3hQoQAA8oEiyAc7AFCAAga0OCCFO8xnYiEoHkHhETHKOEggADsK' +
                    '" />';

var energyIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhDQANANU/AEs+IPfHHj0zIPesHveqHmhPIPfCHvfAHi8uIfexHve4HktEIPe9HvfEHve7HveoHvfFHiAiIWhZIPeuHiAgIS8wIdqfHqGBH/fWHvfiHve6HlpWIMyYH/fJHv' +
                    'e3HsyXH+nGHr6SH/fbHj05IOmfHoV0H/ezHlpEIFpPIK+hH/fMHve0Hsy0H9q0HmhUIKGSH6GWH/fKHvfUHvevHtqqHve5HvfPHvepHvfIHve+Hve2HoV9Hz0xIGhYIEs9IP///yH5BAEAAD8ALAAAAAANAA0AAA' +
                    'ZgwJ+wMCDcHg8ST8i0JGaT4okpdCl0K1OiQBXSGA6NggMA+ATCXsNwOIBrng/61+oEIOtDLkRhLhYoMTh3F11CJTY2KhKGPwgYMiAjjT8vIiwIlBUZKRGUPzA7n0Iboz9BADsK' +
                    '" />';

var killedMobsterIcon = '<img src="' +
                    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgND' +
                    'RgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAoACkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEA' +
                    'wUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp' +
                    '6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhc' +
                    'RMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0' +
                    'tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDy3UJ501CVUmkVRjADEDoKtGzvRawSR3UssspH7lFYtgqGzn0AZc9PvDrzirfrnUJfXj+QrXgvotRN1CYB9mWKWVo/PchGEeE4BA4IQcg9K' +
                    'VCnF0oaLZfkelmWKrrG1kpu3PLq+7GI8EIaGaeISC35kaSRx5pPTKEj5Qc9DyMVD9kuWhkki1BJSkZl2L5oLKCMkblAOM5PPQGn6LbiXXtNjPR7uJT/AN9itbRZ/tiGW/u1Kw3aSMZ5wCYpEdZgNxycqqDAyelbe' +
                    'ygvsr7ji+t4j/n5L72c7DNOZ4w0zkFhkFvetms5reGK+228zTQq42SsmwsM9SvOD7Vo15GaRUZRsrH3nCFWpUo1eeTeq3d+hj3kJkvZAAxLEKAvUkgDjHetOx02K1S5srfyxPIqpeTKNywruDCMYyXclRkDJ4IHR' +
                    'jW7o2reF9HP2i+057zUR02Qlth56l2CdMfdH61oTeJLeC2trm00qRtKmkw6i62CFud0flooAO0kj5sEYI6HbpRxddxUKdFuyWrsk/Q+QzKnD67Wbl9uX/pTMyx8P6g95p93oum3KXMMu5oL90iZihDLJtbHysOCB' +
                    'nBU8nINXJ/h1ew6lJCZ/Lt2JaEQQPOyx5ON5+VQcYzgmkl12806/sbhrqyXTblXVZbC1KTJHkoWHmZcEEkgAlSVIyRms+f7TdXN1oPiDUJJpPM3W93POzokmOCST/qpBjntlW6bgduXH1Hq4xX3v/I4b0V0bLM+g' +
                    'aBp9vIbjUma9WPMcUl3Hy+BgGOPLA5J6nHHpWNStot1YW4neGEQ7whkhnjlUMQSASjHBIU9fQ0lcGPpTpyjzz5mz7zg+SlRq2VtV+RSlgke4dgmVOMHI9K2tEW2FlqNvfXTW6TCIEBSxkRWLsFwCA/ChS2B8zZI7' +
                    'lFOGZVYwUElp6/5nVX4TwderOtKcrybb1XV3/lKV9PLqF287xLGCAqRKcrGgGFQewAA/U8mrv8AaaNb2yzaRZ3E9vCIRPO8hLKCduVV1HAIXkHhRRRV/wBq1v5V+P8AmY/6nYH+ef3x/wDkSObVLy4t2tiLeG2Zl' +
                    'YxW9vHErEZwTtUFsZPUnrVaiiuTEYqWIacklbsezleU0ctjKFFt82utv0SP/9kK' +
                    '" />';

var goodIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADA0lEQVR42o2TWWgTURSG/8nMnUlsNTFNTNN0IVpbu6i0GFD0xQ2xD4pCq2JBpa2CBVFwI2KqYgISX3wRtSrqq2ARBL' +
                    'F1AZG2UrTigxIJxEbSNm3aLE06yUwm42TEuDyIBwYu95zz3bPMT+EvC4x9tROG6eQ4blNOztnVSxkBPs2/FAThdk11TeD3eOrnYSw4Rmto+lJCw5+6/vEReREcQTgVU32WBQZsrnLgSMNOUScw3pwkuWqX10oFQP' +
                    'BbkGZZ9mHf+OtdF4buoKTIAC1hf+FlIC0ImFGAPes6sL3E0adU05qHqCHjkxPux5NvnBdH7sKmN0FLA1XFZnjXn1XzDz7vQSqbREZ5MxSPwOU4hK2GZs9ye/U5KjQesicY3rfpSTdZYTBjMQF0tIzKhVZ4NnhVwN' +
                    '6n3WAQVyAUolnAF5tG/7ZropbX1FKRmYj7qq/X+X5yFKU6gmJCKRXQsBbbcHKNWwV0DByDnsTBSxKSIjDBi2i2NKG7Yp+Hmkskhk4O719r4BagiLVBx+jAagj0rB4HGo+rgPODHpg4AWIui4Q4j5QQQlxIw9PUO0' +
                    'zF52KTZwZbLE2mJdjTcAt6zox/2dfEBHo/dGFqPgb3mkdhFeB622JpNJrQVn8Ti7jS/wIkhChcTX1hKplMDnlH29cayBQ04KChGOVjUVq8Grvrfszg8tBpGJlPyMn5NiRIcgaxrBkn6pUWorGo+2nontMfuaGsXS' +
                    'q8ZNTZcdTRr56PDuxAGfe54JNkGtWmI9hobPNQ09NTdpHlfTdH2wmNCVDUvwGy8lMJshWHV90X5ZSyxvzlbHTW7Z8fcT7zO5WAuAoxaCvQvurBjy286YKF9avJOUqP7cvcKNc0emxl5edUQDgcpjkt9zDIv9s1EL' +
                    'iCZCagzEEulJxPlJUGi1g7tiw9jTLNyr50Ot1aWVklFcSUh7AsuZQj6VOfZgbIl9lXSGRCqm8hZ0ONcSPqFm8WczzjFQXBVV5R+UtMv1t+JoSQToYhipwlVc6UTAUEUVDlbLWW/SHn7/7NSUl252Y9AAAAAElFTk' +
                    'SuQmCCCg==' +
                    '" />';

var mafiaHatIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhGAASANU/AKysrDg4OJSUlIuLi1tbW3Jycnx9fUtMTK0nMqKiokJCQqhqcMbGxhUVFU0gJKWlpWI0OCQjI5tGTk0PFF5JSpdmamxsbGZlZYgtNJ+fn4aGhpmZmYKCgol5ew' +
                    'cHB7Ozsra2tlFRUJiLjGpqamBgYFVWVj0mJ4+QkFtTU1NUVGBiYk1HSJqjom5vb5ZbX6+vr2dnZzYHC7hLVDEwMXh1daipqWxeX28XHkdHR5h/gbYgLL+/v6Gnp5KYmJycnAAAACH5BAEAAD8ALAAAAAAYABIAAA' +
                    'b/wJ9w+PMYj0gjcSk0BjSPR+2x4ZQiDSWz2CgwHhyaRuADgD6jiGf7a4QYvgKB0OIIEi+AQNHYehoDH3IlKhoJDwIGJCVXWUR/DRkgBmIbCYkXITglIzAKWFwNBAkMDC8PlwYtJJoKIQQHKhcBHhERAiAAOyAvCS' +
                    'cGFiQErQopBzgHIQ0RPr2SLzUZA6oXJAcKAQErJZowEQUAGWR5Dz6/BTAEOAEzMw4owy0zAuInIlIJG9MFFyXrMyYmhChxwEAAAQJO9HCxgAeLHtNaqCihAOAEE/5IaMDBgcMAARV0yFiQowMNGxQgTJgQw0SIYh' +
                    'kIBLCgysAAFwh0IECA4cbKVYs4UgQgUcPCnxEcWhCAYaCDCwkYMECAQAEeDgUaABBY0+bCAA2ZShBQoUIYQQUFAZyYscTDDAsINaCDcQFGAQ0ZXmhQwHVLgwCcWhQYPKJEgD5MggAAOwo=' +
                    '" />';

var plussignIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQALMPAO3r6wxTAGmvZqjQppHFj4O8gANoAACCAJ3JmkqiRzCXLQB3ABGOEl6pWv38/P///yH5BAEAAA8ALAAAAAAQABAAAART8MlJqwUuO2CpG0ghON30hQ1ZPmeRqB' +
                    'SmDYTwahxbEDxRNIyDcKFyCI7HBGPBNBiKiigjuHAaAoGi8NDEerMSWcaJ1Wwsjmt5xfrCOg43W3xmsyMAOwo=' +
                    '" />';

var cashIcon =    '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAKU/AHS3k3W0OxIbEtW8BTN7S9XquYnDlVKSNFObXEpzVmelcPXkAXCNXpzUpWyoRPbbAChtEcfFJqm9c7jaimOXe5iiGWyqiVaHboe3Y4i9k0h4YGWTaK3Wd0V5Ey' +
                    'dCJZzKbDxkIluPc+Lxz6nUb2JbD+zMA5XCXJG9cj+MW3rAmnCxhVB/Zk+bckBTSN7bAsrDBMa/E9XDD1NcLkt2J6u5PMrlqGOOaIS7V6TObKjIf22NC4K6TmOHKJ6rQfLPAP///yH5BAEAAD8ALAAAAAAQABAAAA' +
                    'aMwJ9wSCwaj8hkUXBgMARKUKAm+mB4HZnxEJiIODkJBLKggTxDAgKzM/U6EFdE8rmdZp7VikCoDHQvc14FIwcEIYgrMAsPFQ44BQUcDgo2CRQUFzAPCwkoCA4mAQgNCT8CHhoxPg8bFhYsCAoNBlBDJAMlCgC8AA' +
                    'YZaEYCLRQAKSkZG0qnCQAqtsvRSUEAOw==" />';

var cashCubaIcon = '<img src="data:image/gif;base64,R0lGODlhEAALANU/AMa6tcCbk7lpirKkmxRvU+Tc1ChYKlclM8zDuiu1J+LSzFmYYxX1AHQzUnBsbB0XF9PGu8Jcje3i3t/X0NrMxLt1puvh2Av1AfHP4eq508psmPPm49qKtdZ3qY1ebu3j2bQ7cBjVBWaHZ9RvpbNce7tTf9e/uuDOygLeCMm2q9C0rguNMDCLOlFKSmpTVJiYmKtids5soJtFXcaAoOWoyFWYV4x5egTKBRzsA9LCwdLKxtjGwpI0TuTV0ahEaAAAACH5BAEAAD8ALAAAAAAQAAsAAAaFwN/vwfN4HsKk8ncA0TAaQYNgWP5kIA6mM3sRCJfF4ZBMqWYlweKLqlU06YYLMaEMWKHVTVTRZkYwFBATEwgJFwwOPjEZGR0CPRMABQWGDBcAEAEkEREnGzo/DgAACQwMOZQTJgobEi1KBiE4Oxa2FhISNlZDAwUWHx8SALxKDggWCkg/QQA7" width="16" height="11"/>'

var healthIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAMQfAKkAE4oAELYAFawAFJEAEYYAD////7UAFZcAEZIAEaAAEp0AEo4AELIAFbAAFJsAErkAFZoAEpQAEbEAFJgAEq4AFKsAFIwAEKQAE7gAFaYAE6MAE7sAFbsAFr' +
                    'wAFgAAACH5BAEAAB8ALAAAAAAQABAAAAVm4CeOZGkaaGqShsdlgrGOBiQcjTx/Bu4MOlbKMKlYAEOdoZM5/ACajWJBVUIOkwEAM41QEAiloFHZKh4ISYJAUDotmjMiwbgEAsrhYs5IniISDHg7PBQJFwVBKwYIBA' +
                    'GJhEmKhCshADsK' +
                    '" />';

var foundIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADC0lEQVR42o2SbUhTYRSAz3vvdjc3l7p0OXXmQsnhRzBLi/IrI1KhlFBJg0ApRCItK8u0EjQViuhHQT9TIpH8kaFUwq' +
                    'IgI1MpDcNMxT40m86Vus9739vRZmi/fOHhwOE9z3k/DoF1rvPpGQnaqYmGX6y09Grfu4GVPFlPcUnFFTlxOY+oZqefka9jIeLCfKq30zFVNTB0b43gQsOtTRh0iByRICylNNDlsPtJZTIXIcwX+6x5gFgt+d6fh0' +
                    'zXXrzsJ57CIs9pzMg0MrOUF0URqCBE2G2LAQqltxkIkbmdziRWwvZcrz7X8u8KKEjEkOUpnET4pe6iSP0FQYhlGNZMCBF4t2uSd7uH5V6KucbK0z2rBTkYNiNBSAfixu4W7K5zOuzpcoWyEwUah90Ww8nkHxiGGW' +
                    'm8WNa9WpCKIRbZhXQiFAWz2NGIm92cTDaLOQPD0mGFUvmaERl5RXFh72pBtkegRVqxWEmpsID3Peqr9u2NMujzxpmpuHnRxvlJVN+2KnQteMGazB1prhVBHobtSAjyBAVSkVJOLufCohK3pDUOPzBSQkHCMsALFF' +
                    'SsAs5E5pgUhDuwImAwFHskUyigLMsI2+Mi9zXONO3eiJ/qKwWQ4q54bSLsCd4LJaZ6qIsuPPf/HOzHEIpIOU6i1e9Rlff87lCoZRtBpA5Qe/nDSWMNNH9sg7c/2iHRP/v9sqD8St0m/C4dy3kxWLks0wT4SIMTbM' +
                    '+tLpM013AXusbvgzEwGRZ5DpoHK0Hvw4NacnBmWXCs6HiFxfwz7nH7o9zVJ+oaefipf7o2IlpzGA6EVy59DdR1F+B49uF7qMAYUPV3EnfG7wgODAvPDNKFtd65UW8tq67lQjfr1DvjI2teLVw94XCPwLbAfBCYaB' +
                    'j8XokDCeDFxUBGyOWyNW9QWnEpS0bEm59GRy/qDbHdyUlxC4ZoTZvpa22K2TYIPGVBQgTQeBshOehsJ+G5Q2sEaSlJvvbFxTdW69ypoZGxp0u57+ZxjmGh1OKaKJh3moNVnObLBom2iXfT2/qgSP4PU3k9tCVxAe' +
                    '4AAAAASUVORK5CYIIK' +
                    '" />';

var warningIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgUlEQVR42pWST0gUURzHv29n/7S7rpuhlroW/kFdobQ8qBgdxItWB6NDkVAdukREWdShEr3YHyiicwQlJRJJEP2hOo' +
                    'Vmapq1qbEuaWq7Cu6s6+7OjLuz7zU7I1aYZXP5vWHm++Hzvu8R/OURJ15YGZWZJXePsNo/ZLUPYc9jS0ykQ0yWKKen2+1bG8T/AoS+tLf4J4UmeVFEaqaueX3Z8ZY1AxZGbm+e9y2OJttDFqoAeB+N2NMNRWm7mq' +
                    'bXBOAHb7YHJkMHHPnzYDEJYwNMsdA/yKi7deifgOCnqzu9I+E3jnyeuH0S5KiEApsE9wBYdpGlKrO+rWdVwMLHZl2El/pEPliWlRfAjYdALCbiTG0QnveA2Wbqs9qNFVkHn7A/Avjes0fH+4N3nBVz0FEB1zoAWQ' +
                    'GcqwtCDkvoeUZQXLnh8JZjb++tAPi7T9v8EwG3ycRvSncEwaR5NN8NKR2EcGmvABbX4duoEYJg86bnpBXmnugP/waYfXnkytd+//mSqilQYQosGsHlTgPMBuBkjWIcJ6CyDl3PzXCWp7XmN7ouLANmnzbkTrrmhr' +
                    'McnnW2pO8AUwKUoMtDYOKAsgxOMSCqBT/DYdxtlnJKHMV5p96Nq4CJttrO6aGx+m2VXk0nUREjGJll6rooRa8aJABMJhjoNsJRkPrIefHzfuLt2F3teuV5XVrpJWYrU7NY6rixnVPn9X3QwgokARLDBIO9RuYsz6' +
                    '4mrtaSD8Kct7Rwx6KyHy3JmFZNnFDVRBfVa2GasNBg7mEOJmvyIBlqyuOn3ZGUFVeK/TqJOjU7srRFICPTwBPf/ZokvSV5I8D9PJPlMFH7VN/p0poSDRKniIYCMz8A9QcpP1oZxJMAAAAASUVORK5CYIIK' +
                    '" />';

var chickenIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODdhEAAQAMYAAAQCBKSKBHQCBEQ2FNTKDEwCBDQyTCQaBIyKvHxiDMzOzExOTBwaNCQCBFw+BPTmBHx6fPS+BDQmBExKfLy+BCQmJKSm3Hx+BAwOHMyaBKQCBExKHDwmDDQyZB' +
                    'waHPTy9FxaXPz+BKSWBDQyPPzKBGQCBJyavIRuDExOZCQmNCQWFGROBPzyBMQCBDw+ZBweHAwKDLSKBEwyBFQCBHxmBNze3FRSVDQCBGQ+DPzmBHx+fFxajLy+vJxyBBQSFLQCBBwaJPz+/PzWBJyazCwqRDw+dA' +
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAHi4AAgoMAL4SHiDclM4iNGi0FjYcwLT+SkyUCMJeDJhUNE4Obgh6EFiguRRg6hoQeNUEQPgg7qz' +
                    'wKhzpBuhUGGx48t4QwNrsfCyI5AwoKpYQ+IDogEiE5MT6XEgEPIUIRGT0Ho4QEFxQsJD0OOByNEisJJwkyHtiIIxYmLhISHkQdHeyJYkCwYMFBgQAAOw==" />';

var hideIcon =    '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQANU/AP////8zM/f39+3t7YCAgOXl5fX19fT09BkZGdPT0xUVFbS0tMvLy4eHh/9LS/v7++Hh4aAVEtvb2/j4+M9NTKQWFMcuLDw8PMMcGkpKSrq6uqQVFKkXFawYFs' +
                    'YcGqAUEqcmI5GRkf7+/qenp6+vr/Pz87u7uwMDA/9ra/5ycmNjY2lpaf5HR8gdGs3Nzf+Hh8AbGtLS0vr6+psUEdjY2NnZ2dJOTP/b26MWE+fn56cWFL0bGKsXFa4YFp0UEgAAACH5BAEAAD8ALAAAAAAQABAAAA' +
                    'aYwJ9wSCwaA8ikkRhoeTyYwFKoQNkoFpiUqFCNCoJwgbCTIhDCDOAhAAAMgwQhREgwSD+FyO2G1wYCEwYQDEIPfAIDEoAAMm8JQhp8BTk0A3wAAgVCDm4CBAQml3wHmz8BNwApAT08BAUHsS4EQw0ADQEdOjgRLG' +
                    'dFFwAxATwVID5bRSclAA4cGx8zyUULAC9JSFMrAAtTQkEAOw==" />';

var redBgImage =    '<img src="' +
                    'data:image/gif;base64,' +
                    'R0lGODlhZAAyALMAACIODyUQESYTFCkWGCwZHTMgJDckKDAdIDooLT4sMUw6QEY0OkEvNVJBSFlIUGFQWSH5BAAAAAAALAAAAABkADIAQAT/sC3EWBNFJYDcOoiiEMbSFIWjHJaGII9RxgwrURamcR4okiaUyuYK' +
                    'jUqn1KqVeMVmNYbJ0FQMDonEwKBgFBAJxRexMGQUBikDYTaREI2BoEsILxbX7Lb7DY/LZ2kLCRlgYi+AIoJrBiEFd2ZkCAECBgcEcgQFVwgFJCgElwmYLwcFZgaahAShCAICCQYCpjKvmpyeZp6ipAi0p5+7db0H' +
                    'ja0yB7SYBwIAAQMDAACsAAKYr9YBlATbBALQ4M6Y1dfglNDS1NaZ39De3wTOB+AFzNzb3fDO6OuvA97OnDWrNlBAAGmUEBqsdlDbQYHSXgWk9DAhwYgPJw60+CqjRYoM/52B5PjQYMWSKKVVU1nwpEKWCDOKxEgz' +
                    'IsyQDp8dHLgSp0M5DYNqQ8iy4cKZF0dKPBgt6VGVRQW6dGq02c6SVhdSstpzqUMpGBoQKjHilANoHgiEKJOAgYJOCRw0aqAhwR25BNwyCFBA7KkFZQ2cHZB2LRW3cOVqKayALeICcefWvYOAhKVTNcZUNsXgm4Yt' +
                    'TU6lQcGlHpjKjxIUS2MKsqUXmwt0HvCZSicZXk4doq3FtujcXGSUOvBWLZ5vBQyy4vavACVP1i6xGrDpyqblxTDVu2Runjvmmp7Ho27vlvVvpryFWk5dDvT1clIFWI9wQNWITeXss/pMGrqt+p3jX/80OglUUFML' +
                    '6feNSd80BI1VAfYHwH8KQuPgTUiRJNVQBfHUElQZ8TQURDiZtNNLUm14IolamURUTy+O2GJDPYE0Y0Ai8hQQUjeuOBRFRtG4UZAYNmMcA/8MkYAEjYRRhwIN1KGCIGKs8UA9DsglBZQLHJnkCkuWYciTUcaFxpay' +
                    'wTBCGGVOiaaVWGrJZTENvJCFGJApYI1YT04wQZRpLCECG2GIEWgAcMgFhh957jmKHZIA6hYLCzjwaGORkjCpW2+98FYbnbwVCwHFhdDJF3gccMcjfNi1AGQZaAHZAp5VRgYDMhSi1lsokHHFqoB54Wqadv36arCz' +
                    'vkrIEm21ooX/KQl8w0Zl1CXwzKiNyGAJcKOk+RquyTRiTRZYRKKdtQNgywYy3GriRSrZskvaKFRcQsZrbLBiSSjJzFePHNS9YoY1qWByi71bbALCN5ZckQw0lvg7D3ICJ0fCdAerJUclFhfcXDUyBGBKMZnMo4kt' +
                    'rGwTzSyZYByKcvZ4go47r3jyzCXwcLNONfOIFx3GzmlyDXusMDOfN//YckA6/+j0jTgGLRh1fvbNB/CDBvVMjkHmPEOgN+d0ZPXTXpNzdTYDalMOUGz/Y98sHemHokRO8YdgVnS7WCBILLZkIjYi3b2UV3enqI3d' +
                    'KoU4VVcfznQ4iiMmXlPkBb0EZED2RdQ4/+Wa17SjQzHZJFJQG5VO0+OQjyhjTKRbrvePH+GN+kc8BgVi6CUSWXuGp8s0lVac4w58iJrndFXqk4vY+eEOKY8U8iGRuKNXHjlP/U0WAaBFB7G41SULDsyS1pJoZOEA' +
                    'nWXStYAUDXhBglgDcB/o9wyEf8D4dFERF/p1NIB/+fszQAPS1xj2MeB9FqgBFeJAALpcQQKoQsMLGmCKAUKGLmgQjGke4IDKJLAYS/qHAw8AQTJIEA4VPAH5DgGYRqCwLyrEoAwcYBo+qUY2KyChFQSIK9kAKi6E' +
                    '6AGnYHMCUg3BAA+gYCoAkwwH8tAMFiABEFPwgSGyIYpUsBQVWTCoCf+iQAF44RRr+oKkELgvA6EQgQ+aQAW2CEYGUCqLBIrhlly0L3580MQIiLOCELDRLraxVBr76II2UuGNAhTVq8yABeJ0wk5StAJxVEOGLMQi' +
                    'g4CJ4BHaZ4ZifeEtIABDJK+gARAMIgvBIQudSllJVGKShYPoS2WC4yssUCAUayAlvnDFALtcwi1P0kNqPPGIf6zPXc1iAQJ0GUpe+jIva8pgM9PwTGCGgVxiCGW3rPEqFKTLFbKxBLS0Q7/bZEsDE9CErwiQzkNW' +
                    'JgBNwAC4xkmdcoqGDXWCDDlxaU42GAo2BywXIS4BAu34YhfL3MIy61APbdUjL5jI1j/chwoQyGb/E19IDwggttCBOvSXmFDoPzyKDNOcAgzfiOdDTyYyA0DDFCBjRjGISQJrnOIKjNxMJwjq0lm4NBTVgWklZGoG' +
                    'oclCEy6dKVFpetSbngIUDKXOZZwhs24841+suE4ooOHNZEjHZMnQlxxMcTTnWIM5WL1FVrmqsLD+Q61bpc51TMHVoplnGdcQmX2ucLWlzUKm73kYUHrWnre+AxPaIOzE/uHXl1nnZiYjD88Aq55QaCNpDrOqRPrh' +
                    'tnPEAwCXmNDaypEcro12HysrB2L1cdbLIk1mL31aaN3WDvVEg7aJbcY/zHaOzFmDaV4DhzX8AZ5wLEhte+1ZO3YSj/nYIrVA/xnuM0Ia3Ae940EWgsdBrnFcfygkbFKjCDcmdLbMbWU/wQXQdxcEFPXqY2x77Yhy' +
                    'mHK1y0qNQimaEN5cR6AAEa4i5iXbiPx7lI0V7hkmQrBA+rvfyy5PQVGRHoJSMru7Ne8oMqoITxD0YAwTKHrA8xBTdLcTHf2OSD66z/NgZGLhnc5FjgPdSGo0pNHBpHrC07Dk6pY8qGC4xtFLCOWEouMXLQUisYtR' +
                    'VPgmo6yo+McigbHi8ttkwx05c1QxUH1Cx7clB294NznK9aDiZeL5xMzZA7PohOzkHWPYzMPjEO5gt7rELe5DxqPxhkYnZyQnWHU+sZ5QwvwhGNfII9mj8FOX+UNnQvNZRfwx8p07F+Q65+12EV705ITEks1xOimR' +
                    'E12G8GwiPU8oSD/ysZ3nhmofla7Vps4J74b0O9ZF2XU5+duqbcwjW8/OyYP+9Z5BLI0IAAA7' +
                    '" />';

var mwLogoSmall =   '<img src="' +
                    'data:image/jpeg;base64,' +
                    '/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAWgAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQIBAQECAgIBAQICAgICAgICAgMCAwMDAwIDAwQEBAQEAwUFBQUFBQcHBwcHCAgICAgI' +
                    'CAgICAEBAQECAgIFAwMFBwUEBQcICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI/8AAEQgAUADAAwERAAIRAQMRAf/EAK0AAAICAgMBAQAAAAAAAAAAAAcIBgkEBQECAwoA' +
                    'AQAABwEBAQAAAAAAAAAAAAABAgMEBQYHAAgJEAABBAIBAwIEBAQDBgcAAAACAQMEBQYHEQASCCETMUEiFFFhFQlxMiMWgVIkkaFCJRcYsdFiM2M0JhEAAQMCBAQDBgUBBwUAAAAAAQACAxEEITESBUFRYQZxEwfw' +
                    'gZGxIjKhwdHhFGLxcoKyM0MVQlJTFgj/2gAMAwEAAhEDEQA/AEP/AHV9h5t5O5BqnSWsplXe7N2/KyDK3ayXkFDRw5F9lNicevhLOvpsKIDyiLbbDZvIRkogCKRCK+M/TGxfue7ee/i4k+LiXH4NFF6D7vnbZWJj' +
                    'bwAA8Gig+JNUuulvEX9z3x81wzlTuo28Kw+prhtMpiv51gP6S6VLWPSEsWjG4c4UGI/uvRz5bLsXhEVURNi7/wDS9u4P1xAEk1NMDXkakVGdOIKona3extWaJOApjj8M6H5qsssb8qf3M90ZpR6yh/8AU/MGBbtc' +
                    '7lybqjpHpjTtgxVtpGC7mwxJgH5LTYNtKSopCqoicdW/sDsSDa4g5wo4+8ivM8XHifcFXu6e5pL1+lpq0fA/t/apzt/9t7y+8aNfWef7n1fX65wvHVhNSZk3MsGKQ69PeNiOzFiRrh2TKecVpwvaYaM+wDNUQAMk' +
                    '2KG8i+1pVCkhfmUlwyEHlO706fa03omX8cfFbyE8rLfIaXQGuHs+nYoyw9fkk6qrI8dJROIy2si5lRGVedRl0wZE1cIG3DQVBs1FvNcsZ9xSjInOyTiN/tG/uJwm3ZVl48rFhM8e89/dmDF9REgCAoFyqkRkqCAo' +
                    'iqRKgoiqqJ0h/wAjFzSn8V/JCWo0TkdO0zb5fLrdc17jQk6/czQGUoKHd/8ATie/JTn0/mbFPz6F943xQNgK0dxnvjphrqxSv7XbV8Cr21UJn9Og9yfBO1gpT7ifmhNL+XTd92TklWwhE/WOF+UvkoU/DtE6jp9Z' +
                    'x7SHKSvenyaajs7FhqOTzzUWRkMxiRLc9kDP2G3TLtQi7O1CVG8smGKWjjoUvm7/ANq39xzCcYyjZW0NPpQ65xevn20/JJue69KONZWwynPPIEa9cV01bDkG20IjVRAEIyFFYulBKchtFJfHP9pvza2lglfmcXSy' +
                    'ZHp3KayHkeKZHCzfBFim3MhhJE3QC6VxpSZXhwHAE2yBQcQTEkRe1mjYTqxCTlaTki3qr9t/yLznN891jrjAK6flOmpkGBn+NLmmD8QptpEO1YBl525FuQntJw97JH7DqE072OcB0+besBrkE2dC4lMbnfgn5HeN' +
                    'mBWed7UxOkxaiqpcGBNmv51gL86RYWSorUWDXQ7p6ZLdQF91wI7LhNtcumgtopdOYruN5oDikXQuaKlAWbeLCaj1sde019XVT4c9PQEgSoTsSa4/+hlyvCsFwX4KhevRwuJQtV9RHtL4l8uPXjoxKCgXsLimIii9' +
                    'qfA1/L8OuoiuKsS8Edku6tj7lvqTu/uKREoI0yTHa96UGPuXA/fICdwqgK+kRXVT1UU4+aouV+sL7kbK/wAnxPUAio9uCtXZMcTtwaH+7xoaK06d5sbeg6kzjZ2MYUr8PDrSvqJmF2E37KXchPcVlxuNIFqQDT5t' +
                    '8nHYeVPcRCJSFe1C8ibbvjJJQx8oaKVcQCQK5Amlac6A0W33OwltuZWtqQcASATTl7YqUePHkT4uZri+2cX25YHgexqwJtxX01s3Jg28MoaLKHgDIPeRrsVO5tS+lEXn06p26dm3pkkmLfNjcfpdGdYHQgYjliFe' +
                    'dk7psxbsiJ8t4GLXDST1ByPxV3X7bH7i+lN94FV1VblDUe4gwAmRIVgH6eF/WMJ7b8+AUwgZdbbRFV4O9DAfqIe1ULrT+37e52tgbNpBBpQHGvyr0wPRVTeLu33Fx8upwJrTCnz99KL4Xdkx1ostzWI1FagtN2k3' +
                    '9NjMm26wkVyQTrKtGyRATatkKgQqqKnHHXuPbJxLbMeDWrR8l5huWFkhbyJQwatZAuCSr3J80/BOnlE3SJ3GY5Vs/IcDrLS0lTrSXdVI22Qvfag8TDMoRaREjA2iqHdynonqnWQ9venQ224L2aQymAFcK55kq97t' +
                    '3YbuINdUuriTTH4K/DM9u4Rp39xPPM8yWpjzcUxbbuQN7BplbFW5mOy8ik1l1GJF9FF6E++BIvx56s6g0q2Ba4q/EDWPm/j1083aZFabMHT+J5MHb7VhSYTNl3V+6IqnKg89+hvAvKJ2r8+U4kb2YOY0JvAyhKiG' +
                    '2amz2t4N4rT4BRSsjvz3e6wOOV0d2Q88P9iIYukDCKvaCkqdy+g8r6onPSdjTXijXH2pWKjxKyiG2E3auwcf1PXiilJgyJg2tqIoiKqJFq/dbEvX+V59tUX0XhepZ12wdUy8lN/iV/pzWvhZvLH9aZdOzFyXsjXB' +
                    '5LezBix23SZx3MgbBpmN7nYH1r3ITrnPp8PnFXspeQncDAK0Vg1NO8Ya+88XsvvzxbVN3rLItcMY9RUntQcsz2TkmDYTk0Zy1fluFFZhNXM6wKRZyeFajorDDT5iICz0pxVIl5k648OKbFNheRVBfbg2D/a2wiw7' +
                    'bev8mhQsZhjml+F1efbV/aw0rUaIFS+D7TnuuD3sqKkhF2uoJhkQknx8lVxO8urukaKBpjWWN6ZiccBasQgubvj5EUy0EwEvxUGR6XMpoihiFlBvDaMHZuD7aXYVva7HwK4rbvE8glTX3noNlWTAnxXmFcJUBW3W' +
                    'xVO1E4/Drg4OwPFcW0V/ecytdXPkb55aOxSDEjYZvrCtnnqqICNx2UYsKD/qviwhwnAArkOGAoicIi8J1G8UuhdtWVj2sqzQmmIzsaVK0prLC4U2W19Yfq13AXOLFBI0FVEZ92+icoioifBPh1zjUrgmM2bcYnXz' +
                    'fOzPm2iNnyAyXVlliIOL/pW4uaYy5s69FkV9OQmlDRVT8P4dKvdVgCIMygJ5RSKY8i8ZdaxZJs0WptbV9paUja9rA5LnNtNyWRJ7E9PddrnK1oiX1UWQT4CnUjtcQNSU1vX8Ev8AdzIz81pYoK0KcIic88+nU+Ao' +
                    '5dslqbOxoosuugP2KUzbjto4yy46keOhgCuuqCL2AhGIqS8JyqJ806AOQ0Qn9ky+p1eCL5/Bf8E6Piiru60+Edx1qOZsNqgnIQSIBJfgilxwi+vw65Fomi8LLtup3/gkCxnhX0uaPOUl0+ZdqC1PDtaPn8W5AtOD' +
                    '8fUU9F+HUVvNsJrctOXsD+CXtZdEgI4JtfH7PG5lrubB9g4zZZDCxyTY32j8oaF6FFG8kx/0pxH23zEzYBt10EJO7lUT6U9F6+fXdwsNrJMJ1EihA99PDqfBerO35Lm8ZSQU4ivLCv6qwnV2j6DeepN3+Luxac6j' +
                    'H85xaQzT77i1ddY2WGWLXtPFPbSf7JONkDKi+DT7ZKJFwvPHVJ9PO6ha7oyVzC/EkgECp5mvAK09y9vOnsHwghuAxIrToOpU0xTw4/X9sal8N/J3ZuJZfVeO+s8zjePGOVsiyxKzzGfnNWXsy3Zc1G5MiK2xFCMz' +
                    'HZUmWuD5IyXhNVsN+EU7baNtGSv1Oe9oq6taBtBSoOIcaEkCnFUq72asRle7U+NmkNa44UzrjlTCg96p6/7cfK7yUyDK8w1/423UiohvSVfg01PPZpK0I6mX2cR2eRdyNIKi22rpucIieq9e1bK8sLC2a0yAAjMn' +
                    'PBebZIJ7iUuawnHgCaJKXlfizJUKUwcOZDMmpMV0VBwHALtISEkRUVFThUXqysc1wqDUFRzhRLtrHxz3dZ3OM5QWCP0NLFnwZDM25ejUv3IhLaXiMFq5HJ7nn0UEVPz6j33LaUSzYymU3NjmwvJHzY8/sG1lMgu3' +
                    'GvbXdmcyoU159tZ1PhM+wuZzERWGne6UUZoyaAuBJR4Uk6rCmCtPsHaLnm/jGKRNCxZlPP8AGPT1rsDyll3zAwo9vktMzCgXNlCKBInq67MYZhNCTyNIRNjygqqr0JKCiyvELJaLLdE47A2HtuLpfWbG33J2ws6l' +
                    'vONGNNGw5p2XHi+01JMpTrQELAi04SmqcAS8CqkWaJIK4J38g/cG8wWvGDdG/fHTyxu6TWek5tLW12GydC4ZRYDPK4uQgfptJaz7e9mmcJqQLgtvxgbRkUQlacNoHCOaRmjhJB5NbfzXang1TbrzH7FzL9rZBhdt' +
                    'm1jCgM162Fo7Z7NqPdP7dE57Y9M2Cfmil8SJV4uJC4BGTJtuzdm6/wDHnwM2Jvz9Rn7JxXAzmyK3XNFjzdZQO4rFzKixxLKC8btnPnynIEZbGS223F9oiJHBcc4FhIxXEKMbj8pqjzc0ngGk2MtudbeJmntl4BUR' +
                    'c3zq7kXGQi1Posqcsr+0cJ2UCPrGZ7WYrKuKKALYm5yKDzM1xKKjfnD5Q1ejNrZt4obkn4lpvxzixxo6BdJ4jHwhmHIuo9cxWw7m6nXFkb7bUsSAn4494hy6jbjnJ89hGa4FVzeTeyb7fdDoPyQ2O1BTauy6rIP7' +
                    '4ymvrolb+pPUeTy4UN1xuKIAroMKDHfwq+222P8AKCJ07sxVJyBTy/3u1gnkB4L+RmXQpX9lycW19Ly6HCYZlSZ1br6yka4sGwZddjtuOyYmP8ECuCi9/wAURem0wo8ozckINyb8c25ubfG2cKp7RNf2t7OtICOQ' +
                    'iD9EoJ1j9tWtzUinIajCAuNMAiuKPPaKEqqnSSMmT2n5k4dtXx18I9I4HU2kTaWqoV5X7puZcOLHh3tvYXItUhRHmJT7r4xa4Go3LjbaogIiIvPpy5XLf9c8A0xty9ofH3eU668itw3M3G7/AB7AtT1exsmgU2HP' +
                    'R8CoKd9/LbmkrYyFFoPvHQYV8jWQCvI2rDSo40vLcMgki5oPVD3NfI7aG1dweUniD5Obbp821/omFk8uVsyvwepgS4T2K2UMktY8KoRg1dBvvEmhdVVE3G0dVs1Ugt5nMeCEaRgLaFGLX/kTq7RWf7x8cNc6tpcV' +
                    'xjQMKSnkJtfLaV/N8hurqoySFjDD1bX1dpUtDEGwnMOg24//AC8miNqKg4ea5fK6pRWRNYFvK3O9qeQUHyMuvK2Ljmx2/BewtpmBTH8ep4FHd5diUuWzLo2kFlpJkZyOJTJUERVXGI7ZPioCi9JxTvZWhzQvia7N' +
                    'eGI/uT+WlpidttTI/KzDfH7UGP3FdQwqqxxR+XRLZWEWROi1TEXG6e3s+z7aI4ROkSIIj/7iEooqYBJ6o5IAS7+TsvB9SeQOE7unvYFG2Zn2u8dzTXOJUBi9hmX5jYy5NcN5CGKjLEaCDTDc9xt4mlOX3NKAl7oN' +
                    'vpL+RtsQKF+Qqae3sElZtsheMFyS2E/cWipA6eJ/VRDU+/MmznOaGBuipHGKsO+tyDNmAEwiMyk7QektNd5Gy2SoROtqSoiqqoXCdeJu/uyYLSfMtLyTpdkT0dz6Feyu0bM7taGawe24ZGKHTTU0dW54eCus0VYx' +
                    '4eYv6gzzMq7CbPKIwli16+rT9PeVQoy80/CcV1tmSMx9xEcBHOe0O3+VVLrDbfbfIeWuPGh4Urz6HnyVgnui76DgfnTl1HIoDeYG6Me3H5Q3GC+XmHrgcHRddWVWI7PgyYVm7jxXEU5sSRMg03sMz4rxNo4UVOVZ' +
                    'TuT3FTlV3+3buTNuN9AGuikBhdQantoKlzBSmH4LG7/+E+//AIk9WPYRI01oDXg/HimD8JtVeQOQ7t1TtPKdyxtpaHpCcax3MK27WHW1kyGSNCCVZDGICbEh9sEbVtPgqr1kdnCZ5WO10AdiXOJcB7+IWiRudFG8' +
                    'EBwLcA0Chr0HBBX98vwQpKq6Y8sdGVIToNi+5G3tGrmO0G5rpI6xbuMtDwCPERNvkn0oXYv/ABKvXsr0l7yjbO7b3yB7c2H5t/MDx6Lz36hdsvETbtsZYcnj5O/I+5fO/dQajH7SNK3Bu6qoL6U+0rFYc9y2unHU' +
                    'cTgQYhe8SEprx9aoiL8etlLQAs0GJQ30dsi+03+4p5o7HAiek4h/1THLWlRF+5q52Q/o1uySEipw9ElPAX5EvUSBinZXfx2xjIPG3BvP/Bfuyj3Gdxdk6tnyUACWVT4Nidxk1u33EnKCUuPVnynxRE+S9cAuUE8S' +
                    'Y+tJ3jHYS9x41LzTWGtc6uMxyzCa+atbMu2qnE4cMIKTBRTZbccmCTqh2mQCQAbREjoKRvLcQgITEb3zut8tvBfZ24sys7HW1friK3O8SfFPEUr4GvsTx6nz3HMMsJV0RNjIs7aT/capHMGmwbQHnFUUdBkUzU4o' +
                    'UOt01KNfs8ePFz7yEcq5wVomeE5T/wDX79TnlF5+DSf7U67guRCj4jRj5reHkN6w+3uLjBPGd2vYbjs8OOz9T4rK4N5zkk4Jz1QUTnjp9C0eUSikYpaPCHE8fyfRO65+Z1Uq7wbXuT0mWZdTQ3G2JM6JjOAZtblE' +
                    'bddE0bV9Ge1T45ROeFReFRrDIWmoQuFQjvuPaS+WHiZsTLnxsdSaf1+xcf8AbF41Y26y1jkD+07nF49lbZPKMRdtLB9rKBBhUARBxXXE7EIhcI4k4lClByGdJheOfh2gUH6689W5z+nx/ZOQnKZjIQl9sUVF9fx6' +
                    'eWUmknCqSlXXfzGRZB4o6IyfIq84VxgOYZlj77Zg2Cs01tW015VBw19IoUlu0JB/j0ldFxdU8UMWSYX9v5qsY8YvMjEbSqi2Nh5a1krX+MvSWu4472J4xabNaKOX/C85dVdIxzwv0OEnz6bgJRJv4OwK6+8tfH5M' +
                    'laSXimJ5DFyXL4prwDlPigHk08SX/KsaA4i/l0C5WyYt5F1WrcnpPHHTsWbqTa2e4mGc+UHmUisWmXlT2evWtn2FdikQ/YagPq085FaeNxTV1Ac7wURMF5JHH6eASbWAYpZcWxzH9deXfnDrjXlvZHgOPYRnwYtL' +
                    'upbc23kV7zcSWAzpLQNg9JND/rGIoJHyqIicJ0WH7wjPyKNBZLkc7zX/AHWKsHxnS0iZOct1T4B37bbeNPkqKiL/ADONj6oi+ny6KxwDqlG0F2AzTBYxtnfvk75cWWd3uKY/Ko6ih2lNxjxWrEtqnFGMUt8et7zK' +
                    '6qrGuakSktLeOUj/AJgXuSXZatOPOF2AiPIRC5hFcfbHwQXNvNGQSMPbBRPB9z0vi5gec7L1vQwfJ/w22FY0lL5B+POx6lmDm2LS30l/pTzVvXtFDljy28MWzh8cH2fcQ4rhtF03fG+J3JJte14QG8h2cWyDceJb' +
                    'S1lDLEsM21hGM32F6+fRmQmMV4A/SOVjTgjwbQS6+Q8BqquELqK6bjve4cdeyOc/UVVt7j0YZhEDXVzCgFGespTEaWyPY4y8L7bTqf5gdYEuxfyVFTqLvbGC5iMczQ9pwocQoDat9vttuWz2Uj4pm4hzDQjxpmOY' +
                    'NQUwWVWkzPdaxsKq81fj01BM+9oKgHhlt1kt5RR11lIyqaNmnPuAKDx6kgqvKLRNt7FtNqv/AOVDGJWEaXMdQkNOZaTgaf8AaeGRXoOL1zf3JaCz3giG4BBbcsGlpIwAmYMq/wDkbkRUtpWibV+W5/hew4OeG8t5' +
                    'lOHWEWac+c3+pxDlQ3BdYV9HkIXB9EVEP5dblt9pYfxBFA1rI3DIANzzw+eCzq7upjOXSO1vBzrqrTkamvQgo76N8gN41ucUVbrFyU3ld3LRmiqamW9AJyRINfpHlxQTu59e7gVT+blOsf33/wCe9in+qNz4XDiD' +
                    'UeJB4q9bT6n7nbmho8ciP0V82kf3T2a5iZg29cXZ2lNOt/Tra2qHqSbXSm5cVG5LDjtc+cOQ4AmoG439KknzVO5fK2/7fP27ubna2SCM0Dm1+JAqAeBxOK9mdmdhX3cu1tJaYvMGIfngaUyrTiOi+QnSWl6PbW8t' +
                    'X4TfbQo9QVkn3pt3nl6xbSIEOLXizNd/p0kOc+bziIoMgoCBOEiG42KqY/Q14+nAVXgEZpzKHQtA/wCSPlVs3MvKzSWF03k/X7Ljw61M6kWsvHZmWyX7mAEqPDqlcdAZANx3VbHkUJXOOB7VhmtIcliVOLA9SbFr' +
                    'nLOs3Vj+IWjuscplZi/mxWeKra7V2ljLWvbWPGNyBKbcbZZqI1mbquI2omrYGTqqKLvhLQcM0Ach94/eP2tcQ8avIzT2wfNHTWNZRkMGwla1nxsmuLmLbTrOHGgvQHxqad92Kbf2bRtukKtr3l3KPanLcNKNVabG' +
                    'qLAMN8MtleG+f760ouf58+L+nNo00vKrqTGRu9q76xr8gum2lg1tc7+mj9oDcUjOUok8rbQ+6nBjqLqrS5rpquvvCbXmoWvKfV/6rj1nTpLA8ls0qAZpbTN7H7hub+lqwauJlICjYl3oSGqoicclXVWKGZY/i3lt' +
                    '4uTqrYuKbHh1VFqWHk+waJ2fcwMb/tOjr8UlNSpJQhVr2Fq1d7mANPZMCRe5SFHsUpERaAk3E6q8F08fde0uiNL77wbM/JLXEI9psvQa5+Ha3NoIHZYVk+Kob4wqoyBpl+5ZJ0kQlRtTIRJQ7VZhpRyQsrVN7g2r' +
                    'vEPdnh9sDb+n7ew3As53UO0ahMkyG7pbadMoJk6NYWbbQxaynlN4+yBK3HN4pCtkX9AHDb4NK6qh02QmFaI0Bg2IbAwrPM31qxmUK2WmkneEwxYXI30eQiTI7LKI4Mh1tOQNRJrle3uHlza1qkZjgtbX14bs8XNo' +
                    '4Znu/cXos7vs2w+fhePZVaWla9XRscqb1mVKFWq96GEV4b1GhaaP3FcDlQEQRTVvWHBFgcmK8ccF1hrOL4T45ZeReuZMvXOxcjyLZsmHa3VlEjty3aOWzIlfZVZqUU4lIsdEAScRwiEhETQukYGYGvJKSOyQV8ef' +
                    'F3CtWbE2nkVv5U6ir6q7wzPqPA/dy2ZJlRpN/SSqhhuQ0xWEXe9GkOMIQ+guGJEqAhKiLGkEVRy4URApMboo/khrby8xnd+l5OLU+IYvT5bqfZk3LWDbGt1rDwK6i2FPRxGpU5o/aecjpCfcF4CbRU71cZE80bmu' +
                    'KCNwcFKbjB9H5b5SeS/kThXkxr6BpffOOZgOB47bz5eNZXVSLKq9+HXy6JYj4suDLjDE4bkOMoJI4LpNp3dJsNHVR3Rk4Lyf1/gVB5Febe52/K7WB4huOBl8jAa9i+uX7iYB5VBymFEciDUCQyJbFerQCS9qPEKG' +
                    'SDyaJkJaIEOC9dd7caxHZddllDmEjX8wINzBpdixIC2LlJMuKOVVxZ5w+w1kMR35AOvsiBkbQmIgZKgqVjCSpq8AMRXPlhtry48nsFTRO0N5eNOA6/rL1L3JpWNzsexibZXLLCx/u58c2Etkd7VVTaSK2RLwhtqo' +
                    'iiKvccjwVda5uYSi57s7CRyTXGLa+yks8xzUOGU2KP5+MSZBh3c+NLm20uRCj2LbMkIoPWBMMk+2Dhi2jhAHf2CwuHYqC3iESYBS+r2fWuNCrrwiXpyi/wDn0gFUTZPCl1PuqDik9uzrzV2aXLcUB4JBcUVX3CQv' +
                    'RUbFFJE+aonXVRH7a5+BWRgR7My7IFyaQ97GKTSc/UMeabFY5MOoveTqcKrjhd3cRkqqpfl0LS4GoKGV0MAAb9wyP6IiYdRjiG3MPZmXjtBBj3Fc/EyiMLb70aP94BA+2JkIkQInPBKicp6+nV5t5xNFj4FWu0u/' +
                    'MjD28fmg1i1jkuT5JkrmKXk3AawbixPHsZCYCfpjJznUaik6IgLispw33KnC8c8dZLf9obXO9xlha/VXMcOSul16590WxaIrp8emlA36R+CWB7KssnU1jSBmbkSkuVbO1xOn/wCU1shWxMAF8Ya97/ajipw44SLz' +
                    'yqc9a5/FaRnVQBlJ6Kd4ZcTG8Cy2IVHAZiY2zG+ytWIMaPII3nfbRlx5oB9xU7eeV+pE556ViiAOSMCaIP12dWjOR19mUaNaOVMuPMhxpjSSoxOw3UdbQ2nEVDDlOCFU4IVVF9F6T1AuShw4pm8yqcrzKqtNpS8O' +
                    'o6jJc6bW5q66ur4UaM6EpEJtYNbXOArbCiKoCI0IIqcKvPxWfG3SSKVQBxril5iawyvM8mp4UXGWW482SJXEQ5bDI+y05w6ho0Rm2hqKp2J9aJ8vn1GSOOmhpUo5HJOP5AZFi+PDGh7rtY2T5HHZYXE/HzGoEWlo' +
                    'qKGjApHCSgIagPYgknu97p896ind3dN2RNaUlqKU4945e2Bw8FoKnXFe8nZ2VcIClECpx9UiZ7pIv5t9nSzWojnKBP0FndPrY2zrtlMc9Tkvmbziqq8r6nyvRxCEUyLfVWGMRv6xtByXooqPCrz/AIdKCIBEMhTH' +
                    'aQqaSLZv0MnGTmy78lD9Va7VCNH7fqLjjnnn59CYhmhD1CcwxJvHM5l1c+O1KGI+hNOcg4JtGXoSqCqnqnxTpdrQQk6kFTmJQVFcTkqNBbFHOeFQUT+Pr0IYF2pYLtNj06WpHWMsvc+h9icH/H8+h8tvJFLjVZcj' +
                    'F4NlEeiuRGfXtFt5RRUBRXkV9Pl+P5dEnhD2EJa3mLHhynukdCLszZeNYjaVyMVkp9v9TsRBCQYqHwXtkiEikXwH8/j8OqdvVybOIkj6uHX9le9lt2XsoA+3j0H68k7WQeJdBTTL5uXqqFCocZbkvPWD/ar6NNl2' +
                    'sJ3tumRm6voiFwqfFeOoQdzxtYK/U6oBGRFVP/8ArD3vJAoyhIPA0Q5yLRFVKpH7qpgP4McSIUiG08rzvvgzwouK0ad4AS+iGhL/AA6sVveMecDiOqrt3bOjGINOqrU8p26yx8ld7WUSGDcC1yi2mVY9qJ/pJshZ' +
                    'kdU4RPQmnRVPy6Q3Jx893ifb4LN4y5rQOSB7SIzyLSI2ny46YI6zG5jzf8jiiqJ8efy66qLpCyY9m8LrRumqoC888/7ehBQOYCFZf41bwq6mkm0kpgHZEtkm2wXhVXkflz0q0ql71tzg4FY1ZBtribbPtR3n265w' +
                    '5UY2g90mG0PvQ0b55JBX0IR9VThURVHtJ/YXpidjiDmpPbtxZCaE4H5odRHaGXv7baUGd0dDiuT5FbyqK1kuSGo5MTJrkpv2wcFtR4VztRHEH4cKidN7nSZDTJG3IgsBALqBcal0PS4zUEGVYe7muZZC+69juNRn' +
                    'UIIlZHZ99HZBD7YoRdpKq9wp2p+adXlkRrhkrq0VURyaPluw5yYZi9QxCq4Jqh4ZjEN+4lIap9SuBU+62B9vzkvtl8OU4VF6B9wzIGvhijNY4lTOl/b93VcwX7Gsx2FSNMD3k9k1ign6LyqlFoUdBsV+Ke5KJU5T' +
                    'lBVF5bND3CooPFLGNYOe+JmzNYYwOU7Lm2+e4K0jYSZONPBCxqL/APFMWD3vKKEaohLwnr8fXrjbFxq91UUigwC0uAZvUa4qM62jQUEGBC1zCiRcMpgaQ2JGSXjjrEByQsg3HHgjsxn5CiRKhKCIvx6CcNaKAIhG' +
                    'CUuLU22VyZ+R2dg5eXdxIdkW0991XX3pDxq4444RqqkRESqqr8V6bsaknFEmkw4mjacktg3wn0qaovrx6enTlookSVNoFQ2K8OL3GK8rx+XSoCKSibB1rOvoLj9eDbntILikhcl2coiqooiqvx45/HopdRdRFvGc' +
                    'NkVlRMx6taKqmze1yVcyEVrvZa+owRVT6UX19V6KSK1QhA1cJtc82HApa90Icm5eRt5815BpGxVxwvinPaIqqfj0leXrbeB0hxp7BLWlqZpQwcU7Wy9Tav11RYwMG/YzCqkNxzu7Ft9CaN1xBbNBdaVFQ0X0QRVO' +
                    'VT4L1mw7ovTcipw5AcPfjgtDi7cszbnDHgSfYJWts4VD17np0dZZ/q1NKjR51RNXtVxY8kVVBc7URO8CEhVUROeOeE5461BkgNRnT+1ZvLEWmijUYzabXhORJfn+HStUknY8L8rhQs8dxl5pwbjIDZOpsRcT22Ri' +
                    'NvPuh2Ki8k4iIiKipx69UvvixdLah4/28fjQK9+n+4shu/LcP9TD4AnHxVhO4bN2xhy4tXeSIWWznFjXR8R0hPsvCntMGckh4QeE5JPRFX1XrObERvmAcNRcaGmfRade+ZHA5zTpawYfnh1QByO+lM4XepkcpAhU' +
                    'sNivnSCBFfbMTQyiB7a8ESuJxzzwiL8eOr527sgjDgM3GhPQHBUfuPf/ADWtcaENGA6kY/iqWPKyIzZZrUbDgxPtI2Ywmo1rHReRZtKZhqCYIq8KolGSOYqvxVST5L1J71CGzVGRH4rKjXUSeKVz5evy6iKrl+/J' +
                    'OuqhXKKiKi/JOuqgUkx+/l08xiTGeVk2zFWyRVRRUV5RU4/PrmnFIXEIe0gqxfS+4K9ifFsnzbZYktE5KUv5WnQH/UAvr8FH606VBVLvrA0o3muNsYVS4xmrWwKKsjWuG5s6yFswb8ePFZdlNdzbilIZkM+26qKn' +
                    'JgqIXHqnPQEUR7C5c+PyyaOb7dEKpLWPyYtrY7ls5OzMtjvR0LCjv1iQYDctTVpJVRTI36+4PBIbxKimArzyKrd4WteaPxP4LTXPIChth5NZfpyfiUrVFLX4ncy8ecj2qnHN6LBddspTDjMSA8ax2UBGA57myLvR' +
                    'S55XpKVxZJ9OCBshQE2Du7dW1hUc/wBnXGSR3fVah2Y63XinPP0RGFBgf8A6SoXZpNz+a/ai3PtjRN81kGs8ylUDi/Ta0vf9xVWMdfQ482E/3MSGTT6SBwFThfl1zQW5Lg9HjdLuH2WBWFnrapZosU2k9judOYqC' +
                    'n20U2IlpittVsqfKrHjz3Uejoq8oxIbRfVF6EuLijvdUVSzUr70EvdZc7eE+tPkv5dLsCbEopYyNjkc5itq4Ts2fI4RuK0JGqrzxyn4ev49IX+4wWkJlmcGMGZJoEra2ks7wyMFzjwCtEx39vHZMXWLWfbGmTMSy' +
                    'LKYzi6i1fErjsMgyeUg8gaRlcYGHAHjl+fKNtlseV5JU7VyG79XazgxNa2ChOp5Ic8DixoqQP6iMcgFfLfsWkZ1uJkyo2hDf7xyJ6Bc6ht4/29xlGPSa5TjsrUWFT7jD7zU2E6rD7feyqgva4CoiivaScKnovWr2' +
                    'F+y6gbKz7XgEVwzVIubV0MpY7NpoUPNg5JaSr6ylOWCuNOOi2MUFRBQBTtX4ceiL+PT1owTV2aHWGWbFFtrEbM1NIr0tpp9BURIVkF7KEikioiKSp3en8vPUdvlsZbRzRnSvwxT/AGmcRXLXHKtPjgmG2kzrqoYr' +
                    'osDF7C8OFcSrG6mBGdQYrstOG25DpCQk/wAIjiIJKKJ8eFVesuhMjm62nEigyWoEMa7SRlTn+CWncWRMZFf4cy2x7c2qpWG7Zw17n1efkvSkVwvn3A4Jony7utO2WRzoWuIIJGPjzWcb8Gi4c0YgH2HuUUiB7xCJ' +
                    'co2PCc9TQKg6JqPGDXeWZztbGWsLiOOP0TyTpsoXAY7GIqiR9puKiKS8oiInzVOmO6tL7Z7B9zmkDxIUltLxHcskd9rXNJ8Kqwnb2T3dcFnjtjRRihHJQ0sRbVmSro+n9QeFVD4XhU/3dYlYbQ6aUxF5jeMSKY+I' +
                    'K3q+3dsUImDBIw4A1w8Cly3qMqDg+H1bkA6cbl6TIcry+LiMMAoqS8IvKIZFxx6p6/LratukaBprisT3jU/HhXgkfmantN4gOqcaRg8uyJ8XsOR4waE7aEw+TLKuHwgJIAzY5VURCMSX0HpTcrUSMwzVefTTU8FW' +
                    'za1lrR2VjS3da/TXNNIdi3FRKZNiVFlMOK06y605wQGBIqEip8eqe6MtcQcCEiFgdyqq9FohRgqqHG6HTVrtu7qnMksWL8KOqx9xw2a8VGMxYFJkORjFxPRSb7FXgu70/lXqQtLdpbqKT0udIGg0qnq09+2JuPyP' +
                    '8YG/KDAUhYvaZDLc/tPTryuG5ZwQNQWTFdNe9ptxRVWhMSThF+rjhesr7n9TLTbtx8gsLmDBzmnEE8A3iAM1qOy+mFze2JlY4B+bQRgR/e4HkkPta3YelcnkY5m2Ny8atYTnbLqprJALnYqipNl6iaKnKdwqqcLx' +
                    '1ctn3y0v4RLbvD29Mx4jMHoVnW+dvz2knlzsLHdePgcimL1fvClaontdZa397j80VGokkSIrcd4ufZJV/lNokRQX8UTqXB4Km3+2O1eY3glF1JeUGPZqL2fNzpeH3jD8XKPsTBLBBIhlsPMm76e41KZZd9fj28fP' +
                    'q1xHS6qvuvmi7uTVlzVu0121YMZPj+Ro7MwzL4/YsW3hvF7ioJJx7b7ZqvvMHwQGpcp8+nrmiQVGaB7Uuzkd9mQYPNGy416E0QqJCv4Kip0kAkCV7IzwiuFwIl/N0LggBRb1zFyPOren13CgnKro6WUGc4gqDcNm' +
                    'z9p4nnjNUREZkRmXFT0/lVPxVAcAAnAH0qD0IV/3TSWYvrXJ9UxY4oTggi+q+qFwifFVQSVE9e1fh1F7zuL7a2MjAC4ZAmg+KX260bNMGONB8V9LvjJSeKHjZrSHsbD5VZf5pBjsO5XtjIWWJFTj0p5lHhZq4Jqf' +
                    '6hKIV7mnj5b44VBVPVPIO+913F7PqmJklGQI+hh5NZjqd1dh0W7bfscVvFpjGmM8j9Turnf9LegSC+Xf7hmVbWkX2Eafk2bYXyKuRZVJkg7e3nK9guzH5BC2y18mmlXsH/hElTqR2Ts99w/+RemkdcdROJ/qIz/u' +
                    'jAJrf762FvlW4q/hQZeA4eJxSd6B8efJB9bg4eA24pcOC/DgQwflqZKicuKUX3BLvReeefXrb7H1J2S1j0CXURwa1x+QWdXPaO5TO1FmmvMgfmnzwvwJ8uskebdLS+Rgw4ncrhwHGULlfVVKaTAinx9eV/h06l9U' +
                    'bU/6UUr/APAR/mom7OzZh98kbf8AED8qrrP8edgav2DjGMbB1umP3NxYsC5NkWsCxlxK1h4VddYGC6TTZuonaButqQKqKKd3Cp21d9219eNtnEse7JpFK14Vx+FRVI7h21c28BmaA5jc3A1p7sPjREzPsJz9bG0w' +
                    'SjalXEO2tCexemFr3nSjA4SssOGqEvMQT7DIvgKcqqoqL077h7Vnh3Hy4m/TIatplT9lLdvdywyWAkmdR0Yo6vP9/wBkB9k4VDl57atVMWPbV1SzAgTLR4EZakvxILMeQ4Bui24go8BiCjxyKJx6dW6/uI7Z/lih' +
                    '0AA9SAK/j0VEtILm6JkAIDiSK5AE4fgtK3rKGERHGAcN5HAUfbJz7dUJfUeHA7/4L3/Dpud6FPpFfH9lMw7C7/cdTw/dOV4w5VVay2xh5P8AbBqLEXqua6q8C0kweANfyR0RVV/j0wjuHPk1OOal7y1a2DQwYBOj' +
                    'n2Qjl/kBh1dR1TFhIqUAJMx4R/T5KtCciR7/AD6uKjSdrKj6oXqnw6ib64abyMCmuhr4KwbJtrhs88zgTHUBuOTudOXNIt5by49vtBzGID5hX44b32znevcpkfKFz8iElVEX8uepLWQcFCQRDRjjVKJg8uTS7AjO' +
                    'FFNJP2mRR48ntH2XX/7cng2v9MhIVM1EeET4r6KnpxPR34kbpOarG6bWYmOc04fqq1c22VbbMYqbTL/dtsyr2mYp5m897k2wrY7AMRWp5KKK+9HAEAJBL3kCIJ93CL1XZpi8CufNQYjoSFBIsWTOlRYMJgpU2c60' +
                    'xCignc46++4LTYCifEiIkRE/PpuM0Ypp88hwbnH9GeH2NWaNXrlm9L3XLYRH0hWTsonJiErakLqxmxERUVUS9keF9ejdwbvFtm3vmfkwE+J5fHDwUv2ztjry7AGTjSvTiVcVi37kGu6iA1qvQQWGF4bp6BV4lr6+' +
                    'mLFOREjQmW2rC3dcFe0jQQJlgU5FVRVXjlOvMk/plvF1J/JpV0oLjVwBBdU08ae4Bbxc+pu22jPJrRrKAYE4DihdvPySstxYGNPZ4ZT5JjUidMWvyW3pK4rUISgoi6Hsj2+4aqiqRovHqievr1cvTH0vurS/bNdE' +
                    'NaBg1pNSf6iKAge+qpXePqvaX0RtYAXOJpUjIZ4DgVW1kGpMQsXVcgRVo33vq9yGfYya/Lho0NsU/IBHr0pLtERywWUkBJ97FjAlOQbBhW3WV7TExUSFUXheUJP93SgTo5o1663PlWtoU+kgsw8rwu2JHLnBLeOk' +
                    'utedREFHmx5QmXkROEcbIS/HlOjaqZLg4hFaJneuMxOI5D8fpQ2JercdiecmCpIvwEpbXIj/AOnleh1Su5fBH1DktLD1ccKxkZ3eLE19ixPq5WE4azRjp3ejUUHU7pMgePTgVEV+pURPgOqnUoNIGah2W7MWNSys' +
                    'L1/CLE8OmGv6rLIkK4uF55IpkhFJeDX6ibQlRVX6iPhOC5lEc4lCiM97Kg42StECorZJ8UVP/H+HRbi1ZNGWOyIogimdG8ObmFxd59lYV1Vh9G1KNqE0QQnJLpPsxWydN1EZEl7VQSMlBTRe1F4TrNYuwm/y3SSU' +
                    'NTwFK+PLrTNXF/dDvIDGYeONPD8q5KW6k/UMTdtbIZSzcgWTV2hSy4cP3quZ76InehdyfWqki+ionC9O+9doDbCjR9IwIphQimXikO29wrdVJxPxwV4eO/uuN4rg9PQ215mVi9UM/ahEjXEagrUjsGTTCD9oiEqe' +
                    '0g8/Dj4deerfYt6c3Qxzi3DIkfgAtTmv9vB1EAHqAfmUN7b91z+4H3Y9Lr6FZvJwgy7ezuMgcTleEXtN0wX/AGdSA9Ot2lxcK+JJ/wAxTI907fHkT7qD5BZen8r8ivJPO9i3eLU9diDWR1aY8/kIQm4caDHlRHIk' +
                    'k4kYERFfcYMgRxzlRReUTu4VL/2b6RuhnZdyn6mGtGjM8K8AB0+KrW+d+Mmidbx/a7ifxp4q4am1/LwXDjk39ir81qIrd9cdv+tmo0PcbQf5AIk/qEnqS+nKInr6a2i61UL8RGK9B18TwWP7lBT6W4OeadT08Oap' +
                    'WyLIa5nZxxZUdArXZrva8SJ/QkOGQoQfgi93H5dZTOXSSPdxJJWpW4EbGt5AD4Ip2UT7dpW1E1LuDscBUQiVOeOFPlE/NV6LGaBLPChVi0URkZNfIL78DQ23F5IG3Gy7hUFJE+C/l/h04YCkXPqKFGYd7XLVDjuT' +
                    'RpMeNl1TcBOt3xHtIpDI+jftivCNEnp2p8UXqreTN/yOIwrWvTktTZfWLe3aA4lujT/VWur86oP2E+4ym+k5XYkgWc90ne5BHgVVVL0RUVPiq/Lq1FZa0ELRXFyzHs4FxKZB+Tjz7ElUaaFv3vt3ReVte1OOTQe1' +
                    'ePx6UhfpcDyKQvofNic3mFTbnONO4VmmXYg76ljNlMhCXxQ2o75A2afkYdpJ+S9IzNLXkHms8a6oUp1BeY9jGWrk9xK+0u8bjPTsDJ4DOAd5HBSijLVoDMRQlQ2yREFHBHvVB56Ws3ta+ruCJO1zmENwqhnSz8nx' +
                    'nJLnIPvCi2VrF9pyaLrLxkEhUcNW3WiJQVO1E7hVC+Pw56bbzbQ3dGyDUAa04VGSlbK7dZRhsJpgRXP2qiviEMqligxqCK/qORG3JsiT1IWCL+k2q/H6vUy/w6FxJUFdSaquOQy8easfyGXCg4QxXsEitw4oRQVP' +
                    'UfceDgl/wVen23xkzNpwVd2tpddV8fkgPENwDWM+Kq0S+hf5VX5p1b1c1//Z' +
                    '" />';

var mwapLogo =     '<img src="' +
                    'data:image/jpeg;base64,' +
                    '/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAARgAA/+4ADkFkb2JlAGTAAAAAAf/bAIQABAMDAwMDBAMDBAYEAwQGBwUEBAUHCAYGBwYGCAoICQkJCQgKCgwMDAwMCgwMDQ0MDBERERERFBQUFBQU' +
                    'FBQUFAEEBQUIBwgPCgoPFA4ODhQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAUAJYAwERAAIRAQMRAf/EAaIAAAAHAQEBAQEAAAAAAAAAAAQFAwIGAQAHCAkK' +
                    'CwEAAgIDAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAACAQMDAgQCBgcDBAIGAnMBAgMRBAAFIRIxQVEGE2EicYEUMpGhBxWxQiPBUtHhMxZi8CRygvElQzRTkqKyY3PCNUQnk6OzNhdUZHTD0uIIJoMJChgZhJRF' +
                    'RqS0VtNVKBry4/PE1OT0ZXWFlaW1xdXl9WZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3OEhYaHiImKi4yNjo+Ck5SVlpeYmZqbnJ2en5KjpKWmp6ipqqusra6voRAAICAQIDBQUEBQYECAMDbQEAAhEDBCESMUEFURNh' +
                    'IgZxgZEyobHwFMHR4SNCFVJicvEzJDRDghaSUyWiY7LCB3PSNeJEgxdUkwgJChgZJjZFGidkdFU38qOzwygp0+PzhJSktMTU5PRldYWVpbXF1eX1RlZmdoaWprbG1ub2R1dnd4eXp7fH1+f3OEhYaHiImKi4yNjo' +
                    '+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A42X/AM6Z3gk8IY/ikz8uaBq3m3W7Py7ocKz6pfMywRu6QpSNGkdmeRlUBVVmNT8t8rzamOKPFJni00s0uGI+xkOu/lP558v67p/ly6s4' +
                    'ZtX1T0/qkFrdW8/97L6KmQrJSMFv2pKL13+FqY8e0sRBO+zfLszKCBtumHmf8kvzH8oaPNr2q2Nu+m2xjWd7W6t7iRPWkWJP3aOXNXdV+EHrjj7SwzkI7i0ZOzc0ImWxruVPK35JfmN5u0S28waVZ2y6bd8/qzXN' +
                    '3BBI6xuULcHfkByUgcgK0r0ocGTtLDCRib2Tj7NzTiJCt2Fazp2q+XNWu9D1u2ez1SxkMNzbuASrjwKkhgRurKSGG4JGZuHLHLHiidnDzY54pcMhv7kIt0f8xltfi2ri/FKi3X+dMa/FsuL8Uy7S/IfnLV/LT+bd' +
                    'P05ptFWYWyOHjE0slQG9KEsHdVr8TKpA3/lamvnrcUcnATu7CGjySx8YG32q03kDznBqlnoY0/19dvYEuk0u3kimu445aFRNCjl424srlXAIU1NKGkYa7FIE2QAznossSBQJKVa5pWt+WNSk0fzBZTafqcSq7206' +
                    '8W4yCqsOxB8RmVjywyC4m3GyY54zUhSBW698sphf4pVW698Cb/FImzM97dQWVsOdzcyJBCpZUBklYKoLOQo3PViAO+V5JiETI8g244mchEcyy/zh+XvmzyJa2t55hit44LyQww+hdQTvzCl90Ry1KD7VKDv1GYeL' +
                    'W48suEXbmZdJkxx4jVLPJ/kjzJ54t7+70AWrwaY6x3ZnvLe3ZC6eoCUkcMF4/tEUO9DsaObW48UuE3a4tJPJHiFUkulwXeravZ6JZGM39/cC0tw80UcRlNQB6rOEoabEN8X7NSRls88Y4+M8muGGUp8A5px5t8s6' +
                    '55H1G20vzAsMd3dwNcwpBcw3H7tX4EsImYrv05AV3pWhpDBqoZiRG9mzNp54gDKklW69/wAcyqca1Rbv3/HBSbVFu/f8cFJtUW79/wAcaTaot37/AI4KTaqt37/jgpNqi3fv+OCk2qLdDx/HBSbVBdDx/HFNqgul' +
                    '8fxwUm1RblfH8cFJtUW5Hj+OBNqouV8fxxVUFwv83/DYEqi3A/m/4bAlUWdf5v8AhsUqizj+b/hsCqizj+b/AIbAlUEw/m/4bFKoJv8AK/4bAqoJf8r/AIb+zFK8S/5X/DYEqizf5X/Df2YEqizf5X/D/wBmBKos' +
                    '3+V/w/8AZgVUE3+V/wAP/ZgSqCb/ACv+H/sxSqLN/lf8P/ZgSqLN/lf8P/ZgSqrMP5v+H/swJVFm/wAr/h/7MCV6zf5X/D/2YFVVm/y/+H/swJVFn/yv+H/swJVVn/y/+H/swKqLP/l/8P8A2YEqqz/5f/D/ANmB' +
                    'Kqs/+X/yU/swKqLP/l/8lP7MCVVZ/wDL/wCSn9mBKqs/+X/yU/sxVUW4/wAv/kr/AGYEqq3P+X/yV/syKVZbjwk/5K/2YFVFuP8AL/5K/wBmBVVbgf78/wCSv9mCkqy3P/Fn/JX+zBSbVVuvGT/kr/ZgpNqy3P8A' +
                    'xZ/yW/swUm1Vbr/iz/kt/ZkaTast1/xb/wAlv7MFJtWW5/4t/wCS/wDZkaTaqt1/xb/yX/swUlWW6/4t/wCS/wDzbgpNqq3X/Fv/ACX/AObcjSbVlu6f7t/5L/8ANuCk2qrdD/fv/Tx/zbkaTb8vuf8AnQ52oLxR' +
                    'iyT8t728s/zI8pTWN1Layy6pa2srQO0fOCeVVkjahFVYbEHqNuhzXdoxBxX3Ox7OkRlodXqn/OTPmPzFpPnvSrLR9XvNLgl0hZZPqEz2zs/1mZal4yG6bdc1egwQyyIlydl2hnniiDHn7mW+Udc12b/nHjVNYutU' +
                    'urzVoRO0N/dStPcKY5E40d6k8TuK5h5YiOQgcgXNxSMsYJ5kPNvyD83+b7/81dH03UfMWp32m3MF4ZrK7u5poD6VuzJSN2KjidxxGbPtDS48UQY9fN1fZ2qyZZSE+g7qS78+lim/OjVbe4uY7WGUWKSXU/IRxJ9W' +
                    'j5O3EE0UVOwJ8AcyOz84w6eUvP8AU4naWnObUwj5fpKJtfJP5GXdxHa2/wCb6PPKwSMHRLlASdhu0wA+nH+WJ/zPt/Yn+RYfz/s/alv5p/lZf/ltrllpsF4usWOpxiSwu44zHI7dGV4Q7lSD0+IgjevUDO0vaMco' +
                    'lxDh4RfwcDV9mywmPCeLiNcuvzfQ8H5T+cG/Je18hR3VtZeZaCaStyUiTmSWhaWMGjANxbjUe9M5nxIHNxH6eK/hb1QxzGHhH1cNfGng/ln8sGtfzFg8j6l5ottNuGZhPqOkTzXDRXTB+MSyD0/3hdAG4vt3Nds2' +
                    '+fNg8EcMNjL3cg6bT4dR45EpixHnz5nkp+f/ACppvlv8xx5a1HzHdXOnxC1XV/MmpRvI8SSAMz0MsjuI42XiCwJPw+Byem1MMeCUoxrflbHU6aeTURhKV7c66JrZ+UfyQvrmK0tfzaR7iZgkanRrhQSdhUtKAPmT' +
                    'lf8AK0v5v2/sbR2TH+d9n7Ul/NPyHL+WXmOHRG1BNStrq2W8tLpUMTshYowePk3Eh1I+0aih9hsdHrBqAdqIdbrdIdORvYPkxCyv7m3vbS5s7iS1u4Jo5ILiFikiOGFGVh0I7ZbrMYlhlfdbXo8pjmjXfXJ9Hf8A' +
                    'ORsjjyp5TkkcvIWYtI27MTDHUn3Oc32d/fj4/c9L2iawH4felf8AzjU/qaZ5+b2tP+oebD2l/fn4I7NN4B8Xk3kSbl588ox+Gt2f4TZsNSP8Dj7ouv05/wALl75PRP8AnJacW/5h6U5NP9woHhv9bkoMxOzZCPHI' +
                    '9A5faMTLgA6lJ4bD8kGVOf5rqkzAco/0LdEqx6rUSEGh22y3+VJfzfx8mv8Ak2P878fNEeffIVn5R0XRPMei63+ntE1n1Al19X+plCoVo/gaV3IcFt6CnHfrmVpdf4s+EinH1Oi8KPEDaaeWPyz0rX/IB88y+Zfq' +
                    '3pmRZ7JLZJFiZZOChpWuIwOSsjmqigbv3oydpcMzEDYHvbsfZ/FASvchKvM+g+Q/LGlRzN53i1HXHTfTrG3S4jWVIzI4M0dw3wLTj6nDrTapplmPXGc6rb9DDJoxCF3v+llrfkzBp2lWOo+YPNNppZuJvTujKqLB' +
                    'FFR25JJLLEZG4qPg4Dc0rQVyB7R3OzMaDYbsb82aD5B0GwWXQ/PEWvatK1IdPgtkSqKRzdnFxJxCg/ymp+8T0+tllmI8NMc+kjjhxWwxbv3za0621Rbr3wUm1Rbr3wUm1UXfvgpNqi3Xv+IwUm1Rbv3/ABGNJtUW' +
                    '7Pj+IwUm1Vbs+P4jBTK1Rbs+P4jBSbVFuz4/iMFLaql2TsCT8iMaTaqt2f5vxGCk2qLeHx/EYKTaqt4fE/eMFJtUW8/yvxGCk2qreH+b8RjSbVVvD/MfvGCk2qreH+Y/eMFLaot4f5j94wUm1Vbw/wAx+8Y0m1Vb' +
                    'w/zH7xkaTaot57/iuNJtVW8/yv8AhlwUm1VbwfzH/glwUm1VbsfzH/glwUm1RbseJ/4JcFJtVW6H8x/4JcFJtVW5H8x/4JcjSbVFuR/Mf+CXGk2qrcf5R/4JcFJtVW4H83/DLgpNqi3A/n/4ZcjSqq3H+X/wy/0w' +
                    'UlVWf/KP/BLgpKqs/wDlH/gl/pgpVVZz/Mf+DT+mBKqsx/mP/Bp/TAlVWY/zH/g0/pgVVWdv5j/waf0wJVVnPdj/AMGn9MFJVVnPZz/waf0wUqqtw3dj/wAGn9MFJVVnP85/4NP6YKVVW4b+c/8AIxP6YKTbzf8A' +
                    'Pz81dZ/KL8vV836JZW+o38t/Dp6xXrsYUE6SNzIiKliDHSnIdchM8MbUbyp8m/8AQ835zgmlpoIB6D6lNt/08ZR4pbvD8y2n/OdH51KKNa6Cx8fqMw/VcYPEKeDzbb/nOr87CBwttBQg7kWMpr7b3GDjKeBCRf8A' +
                    'Ob/58RzNK1zpMsbfZgfT14L8irhvvbBxFPCEUv8AznX+eSyFiuiFCABGbB6AjuCJ67+5wcRTT7H/AOcb/wA0vMf5sfljB5u80G3j1hr+7s5BZBbeHhblOBCOzkGjb75MbsTs+GzJ/nvnXAvIkfjdkX5dvX8xvJw/' +
                    '7XVh4/7+XMHXn9yfg5mgH74fF6X/AM5WGn5i6N/2xR/1Fy5hdl/XL3Ob2oPRH3sy8mGv/OMmsH/Iuf8Ak4ma/P8A3sveXYaf+5j7h9zyn/nHRuX5x6D/AMw9/wD9QzZue1fpj73S9kj1y9yffmlpNl5g/wCckovL' +
                    '+otIljql3plpcPDT1BHJBGGK8qitPEZj6bPLFppGPO2/VYI5tVGMuXC9B/MDUfy9/LnzjpuhWf5P2+qfXDG1lqCSSIryOyrxSMrIJCrMoI/DKI5tRlhL1bAbt8sOmwzj6dyduaR/85bzML7y5LGxjZ4JN0JUgMWq' +
                    'Kof1Zd2VATySBFjh/SGjticoY4yiaIl+gqdyg/6FUtjyfeYOTzepPNuprWntmLGEfzPDW3FX2uZKcvyvFe/Bd/B5h+QwjT8y9CjjUKonUgCvUyKSfxze9qY4w04ERQv9bz3ZOSU9SZSNnh8/J6d5z8u2XmX/AJyY' +
                    'h07UlEunyTWL3VuwJWWKCCJ2jNCNnHwnNZgzyw6WRjzMq+x2uo08c2riJchG/tZB5u8w/l/+X35iWnlSy/KGHUJ3a2NrqUTyDmbmgBihdXD8WJX7XUeOU+JqMuKUjK4jm3+FpsOWMRGpHlzYj/zljJ6fnrQz46Sf' +
                    'H/lpk8Mzexvrl7nA7cNQh7y8OsrjleWy16yxjv8AzjN9qh+5n/VPd3PPaOX76H9Yd/e+vPz68p+ZvM3knQH8t6Xcaq9gVa5hs42mmVZY0VSI0q7bjfiDTqds5Hs+cYZgZGhv9z2naMJTwERFnb70p/5xz8reY9F0' +
                    '3znZ63ps+nahem2WCyu43t7j+5lUFo5QrAMT8JOxw9oTjPMTE2NkdmwlDCBIUd3lfljyB598vfmD5futb8t6lZafYa3bG5vZrScWwC3AWol4FGBJAUqx5dq1zP1GfGdIIg71HZ1+nw5BqzIx2uW+7JP+coZBH+Yu' +
                    'hKekmkpH/wAHeOtformN2fMwjkkOgcvtCAnLHE9ZM4/MtfIn5SW+j29v+WcXma3ljWFtUnne3YywrT94yoyNI4UuQFUeGQw5tTmJEZM82HTYQDKP3lCfntfpe/lr5Wv00saIkkwI0lRQW1Ep6dAFpxp4DIdnf38f' +
                    'j9zPtE1gl8PvY15XuUT/AJxm82hlZzcalcRqEFaGtu1T4Ci4NX/jB96dIb049zxqSf1YnjD8S6lQ1K0qKVods66cOKJHe8lDLwkHu976Dj/OmPXfKNhaa9+Wt35jvAUFxwBjsTLGpVpYJF5uAW6KdwKg5yw02aEr' +
                    'iR8w9QdThnGpA/IoL83NF8u2/kry15n0jy8PLV/eTSR3mnhmYgMv2ZOVTyVk+HpsTUV6X6HVZJZRGRsFq1umxwxGURRDxlbv3zoqef4vxuqrde+CmXF+N1Rbv3wUni/G6ot174KTxfjdVF1740y4lRbr3wUniVFu' +
                    'vfBSeJUW698FJ4lVLknpgpPEw/zP+afl/wAr6j+jLhZ729Va3EdoFb0TsQH5Mu5BrtmDm1kMUuE7nyczFpZ5BxDYMduvzr8oX8P1e70rUpISQxVeKbjpUpKpzGlr8UtiC5EdFkjuCE00/wDOzQ7uRLTTtH1e6mUA' +
                    'LDDCsz0GwqBIT9JycddA7CMmJ0cxuZBn2leYP0jZJeT2d3pruSDa3sRjmWhoCQOQ36jfM2E+IXRHvcWQo1YPuTUXRHUn8MspjxKi3Xv+rBSeJUW79/1YKTxKq3fv+rBSbVVu/f8AVgpNqi3Z8f1Y0m1Rbz3/AFYK' +
                    'Taqt37/qwUtqq3fv+rBSbYx+ZHnW48leUZvMFqqvcpPFbxrInqKTKT1AZfDxzHz5PDhbbihxzp4BJ/zkb5+klZ/rUEUXL4IorKH7NT1MjOa9M1f52f4DsfysfwUysv8AnJHzdBpU7Sy2dxqjXVLaO4t2ULalSeTm' +
                    'IBag0G2EayVdLYnSxvrSby/85G64tzKINR0qS0MDNAfqV4ri4CLRXqPsluX2e2TOrN9PkxGm9/zUm/5yR80oun/6Zo5Z2Yalxtbusa+pQFAaV+Dfqd8j+bltyZflh5sy/K789L3zX5jbQdeu7NpbtiulRWVtNGzB' +
                    'Fd29RpAVHwqO4y7DqOOVFhkw8MbD3Jbw+J/4XM7hcW1Vb0+J/wCFwcKeJVW8Pif+FwcKeJVW8Pif+FwcKeJVW8Pif+EwcKeJVW8Pif8AhMHCniVlvT4n/hMjwptVW9bxP/CYOFNqq3reJ/4TBwptWW+bxP8AwmDh' +
                    'Tast8fE/8Jg4U2rLfHxP/CZHhW27nV7XT+P6QuobMuCyC4lghLAdSodhWntgISJKtprFteR+rZ3MdzDWnqQPDKtfCqEiuCk2i1vT7/dHg4U2rLe/P7o8HCtvCv8AnMuVpfyPiY1p+nrHjUKNvSuP5cozD0s8f1/B' +
                    '+fOYLluxV2KuxV2Kv0b/AOcI7nj+SIQ/sa1fj4fTPVYTvy375fAbNcju+Vat/mc6gF5cxVbLUNS0rULPVtKnFtqenzx3VnOVWUJNEeStwcFTQ70IplWbGMseHkzw5Dilxc0w80ecPNnnXUodX836kNSvraD6rDKs' +
                    'ENtxh5mTiRCqqdyTWld8r02lGEkg3bZqdScwAIqvNl+gXf58XPlJ/LnlrT9QufJlyGVreDSPWjkWQ1NJzGXNadVfMXJo8ZmSZ1ZcjHrMggAIXQQGk+V/zl8jalF5p0Xy9q2l6hZJKqXkmmSTqiSrxclZI2X7NRuM' +
                    'y9RDHnAHFVe5w9PPJgJPDdsX1/zV5m8y65J5l1vUGfzIWjP1+BFtZEktwFQhYwFDKBTp8++Tx6KMcZgTYLDJrZyyjIBRDK9Q/Pn84dVsRpmoeapXsOJV4IYo7USKylCsrW4jZ1IJ5Kxocoj2VAcyfk3S7WmeUR8/' +
                    '2JB5r/MTzf54Fqvmm+hvFsRwsxFbRWvpp/IBCqgqPcZl6TQjBIyBJ27nC1mvOoiIkAb3zXv+ZXnN/KieR2v4T5VjFFsfq0QatSeXqgeoWqf5qe1MgOzQMvicR53ybD2mTi8PhHKuflSnpY89eS/0f540yzutNtyy' +
                    'mw1ee0L2kjMCV4NKhRvs1FPD55l6nFDUR8Piog24Wlyz00vE4bBFKGr+efNeueZY/Oeo6jXzTC8UkOpQxRwsskC8UYIgCggbbAfflMOzoDEcZN2bvub59pzOYZAKoVXeyXVPz7/N/WYVttR80TG3QHjDbItkjFip' +
                    '+MWvpcwCuwetO3fKI9jwF3I/JyJdtTNVED4sd82effNnny/t9S83X66he2sJt4JUgitqRFi/EiEKDuTvSuZuj0I05JBu/Jwdbr5akAEVXmkazkGoYqRuCCQQfEEdM2MoiQIPIusjIxII5h6Dp/58/m/pmmQaPZeZ' +
                    '+FjbRC3gD2drJKsaiij1Gj5VA2BrmgPYsL2kfk9EO3J1vEfNIPKvn/zr5Iu7i/8AK2tPZXd5GIbxpI47mOQK3IH05lZFap6qvt0y/L2TjmI0SKFe9x8PbGSBlYBs3z5JldfmV+Y3mPzFp2uXeqi+80WrwRaTPHaQ' +
                    'q6vFMZIlWKJVVz6jVAKmp8crHZEIxIMjv1rk2HtmcpxIiNul8/sTHznZfnP5sn/T3nvStUuG0+2aL662mPYrDbqxkJZoo0UBTVuR3HjktNpMOOxxiXEK6frY6rWZ8vCeDh4DfX9Trb88vzgt9Kg0WPzhcJp0Cxov' +
                    'oxxQXJSKnEG4iVZewqeW/fIR7GgDZkSPczl25MxoRAPv/YlusfmR538x6Va6Fr2qx3mkWbc7aD0I43RvH1VHNie/Nmrlun7LGHIJiRNeTTqe15ZsZgYgX5n9ShZ+efNth5buvJ9lqccXlq8leeaya3ikYyy0q/qM' +
                    'OddhQVp7YMvZYyZDPiO/l+1OHtc48YhwjYd5/UlYu9vhZa9uRJH0gUP45tZwJBA2+DqYZQCCd/iXoV/+fX5sX1jFpdv5jGk6XAESC20mL6n6cMZXjFGysWVaKFpX7O2aWPY8RIEyJ+H7Xey7bkYkAAfH9jFtR83e' +
                    'aNetdOsNf1h7+w0kOLC3KJEqPJXnIxQAu5qd2Pf5Uv0/ZscM+OyT7mjUdqSzQ4KAHv8A2IRbv3H3nNnwuuGTz+1UW79/xwcLIZPP7VVbv3/HBwsvE8/tVFu/f8cHCy8Tz+1UW798HCy4x3/aqrd++DhZcf4tUW7H' +
                    'jg4U8aqt2PHBwsuNu7uiNG1SValo7WdhQ0NRExFD2ynNtE+4t+E3Ie8PBdK06CzuY720lnlkl4oJJKOCHYGtAoP7HjnMQgAbD0k5kii3+m/WuY9KsYvW1CUtCjM/BFm4cASGU1oanr2weJZ4RzXw6HEeSfeT/LGk' +
                    '6tHa6jcebL3TNfvrSW+ufQdIljiWcxDnIXBFTQhT9GZGDDGVEzIkRf2tObNKNgQBiDX2MvsidLU2UH5n3HEVk5TW0VyRsCR6knM9N+Ncyo+nYZfscY+rfw/tTa2nvLiRYYPzFjmuI/jaO4srVFZQRUEnhsa02bLY' +
                    'k3/efYGuQFf3f2lmYugGK8lJABPEhhRhUHbsR0zY1bg3SvBK0rFU3IBb7sBCRJAadrsF9eanaxSq72E6wyKpqVLRK1GFBTfllcZCRI7i2SBAB702+twW1tLqF9Ktvp1spkubiT4URF6knwwyIiLKI3I0Hivm38+r' +
                    '+TUzpvlaIWmjwzcJNRjCTXVwitQmESK0aBh9nkrH9WaTNriZVHk7fFoxVy5sqg/PWzjgHq6FO3pKA5MxeUkDflxtgOXjTMkavb6T+Pg4/wCW3+ofj4qVz/zkLp4hHDyzfMH+yyuuxB7gxjI/nf6JZDSf0gyvyb+Y' +
                    'mn+bkliW3l07VYKvLptwD6qw1ULJXiooxbMvDmGTaqPc0ZcZhvdjvS7893ZvyrnYGga/tCRTqObbfhmPrh+7+IbdGf3nwfKGc87tH2dvM9uZRLGkXKlGRZHJ+kVpkwNmJKskEpcKLhBy/aECVB7eH68NItX9O6bp' +
                    'c8wNqm2hP4sa4d0Mw/JyOa2/MvQ/UP7pXmKn0owSwt5AKkGozI0o/ehp1B/dl9erd/50Gb+nUWqrd/58RgpPEqrd/wCfEYKXiVFu/wDPiMHCniQ3mHzPoXk/R4te8z6gmn6XLKtukxhkmJlcMQvGJWO4U5VknGAs' +
                    'tkAZGgwa/wD+ci/yrsLiOCPU7q9B5erLbWLlI6Db+8KciT/LmKdXjDeMEy1D/wA5L/lMUDy3moqf99/o74vv9QjB+bx/gMvAmsk/5yj/ACoik4oNYmj7yJZQgfc0wOROrh5p/LzdoX/OUH5Y3Noh12a/sb/4/UVL' +
                    'H1Iqc24cSkjmvDjy964I6qHVJwT6Jof+clvyfCMy6veFh9lG02YV+kVyX5nGjwZs48oee9C88aR+nPLkrz6d6z2/OWAwt6kVCw4tv+0MvhITFhrkDE0WW6ZMk97FFIvJGrVSopspOExY8T4n/wCcnvNt75j/ADZv' +
                    'fL+sRRNpnlhjp+miAi3f0p0jmJldxICQzHfiNs1GeVzo9HPwxqNjqlv5Tfnpr35V6TcaJp+j2uq6VcTSahIsjsksbOI4iS6BqACMbFe+DHlMBVMpwEi+sfz1/Nif8ovK3l/WdK0mDVbzXZGiH1uR44ogkKyluMVC' +
                    '1eVKchmZmycA5OLijxEvE/K3/OW/nXXfNOj6Lc6FpMFnqd/bWcjRC4Mkcc8ixsVLSEEipIrlEdQSQKDkHEALt7L/AM5bzCT/AJx/YgV/3KaevQChV5B/DLNQKi04frfnrmuc52KuxV2KuxV94/8AOHmv6dp35X2+' +
                    'i3t7bwapqOr38mmWEjxC5uEVIgzRRswdwCrfZHY5mYapx8nN4QYs3YLqjBr08lbAwer/APOOHlXSPNP5q6faa5brd2Nlb3GofVZQGiklt1Hph1OxUM3Kh60ynPMiGyceMcW70z84P+ckPzD8pfmDrHlTy2bC00rR' +
                    '3S2j9W3E8jn0kcsxZgBu1AqgUGU4dPCUQTe7ZPJIGgxby/8A85Yfmq2uadFqMmnXdjNcww3FuLUQs0csiq3F0aqmh2OWy0mOurWM07Tb/nL3yfomnebvLmuafbLbXWurNDqgiARZXt5IwspAFOZWSjHvQYdFkPCQ' +
                    'ejXqsYJBYR/zkP8AlR5Z/K3WdC0/yzJdyQalZy3Nwb2VZWDpKEHEqiUFMyNNnlkBvo4+o04iRTznyL5fs/Mnnby95e1FpFsNU1C3s7loWCyCKaQK3EkGhodtsysmThiSOgcaGHikAfvej+ffy5/LL8vvzni8pa7d' +
                    '6jD5BSziuLy5RxNfCSaF2XiUj6cwo+x0yjFnyTxcQA4mzJp8cMlEnhfQHnSy/JiT8ifKlr5h1HVYvy1jktjot3ApN87BJvT9VfTNKgvX4B2zX4jl8aRiBxdXPyxxHEBInhfLX5m2H5I2unWDflVqWq32pNOw1FNU' +
                    'Uoi2/D4SlYk35e+bjBLMSfEAA8nTaiGED0Ekst8i/kT5Yt/JcX5m/nLrknl/yrd8Tpdha0N5dK9Sjbq5HMAlERCxX4iQMqy6uXHwYhxHq2YtHEQ48poJppvl3/nEnzleR6BpGqa75c1S5YRWV/fkfV3lbZQxkDqK' +
                    'n+Yp88icmrgLIEgzGPSzNAkF5b+ZP5U67+V3nCHyzrpWe0u2STTtRhqsdzbNJwLAGpVh0ZT0PiKHM7BqI5ocQcHPppYp8Je6+fvyd/5xr/LK9stO836v5htrq/hNzbLARcAxq3AklLfbcdM1uHVanKCYiOzsc2l0' +
                    '+I+on8fBItF/Ln/nGHz1qMPlryj5w1ux8x3tY9P+vwj0pJqEhaPCgJNPs81J7b5bPPqsY4pRFNUdPpsh4YyNvGvNvlnzH+U/nqbRbyVU1rRLiK5s7yEco3AKzQTIGB2Io1GG3Q5scU45sdjkXW5ccsOSuofT/wCW' +
                    '/wCYPnD8wvyF/NDUvOGptqV7aW93b28rRxxcYjY8ytIlQdTXfNLnwQxajGIiv7XdYM08unmZGzv9z43V2oN86KnnHtvlSw/5xln8u6Y/mzWdfh80NAp1WCzjZoEnqahCIG2pTuc1mSWqEjwxjXR2uOOl4RxSlbLf' +
                    'L/5d/wDOM/nrVYPK/lTzJ5gt/MF8HFi11CRGXRC9DzgUHYE05CvjlE8+pxjilGNBvhg02Q8MZStin5f/AJOWt/8AnZfflV5zuJWh0+O6Mtxp8gjaQwxrJE6l1agZWBKkZkZtVWAZIDnXNxsGlvOccydu4vOPO+l2' +
                    '3lzzn5g0CwaRrHS9QubO2MrhpDHBKyLyIAqaDfbMzDLigJHqO5ws0eCZiDyPe9H/AOcefyz8u/mnq+vWHmSW7jh0yyjurc2cqxMXeQoeRZHqKZh67PLCAYgbnuc3QaeOYkSJ280F+S35UH81PMOp213fvpvl3RI/' +
                    'X1K5jo85VmZUSMMKAnixLHoB0yWr1HgxFCyWOk0xzSNkgDzZT9V/5xHjZo/8ReY5OBKmVYn4tTuP9HGxyi9X/Ni5FaQfxSWeafys8hav+W2qfmf+Tmv3eq6boLONX07Ul4ShIgrScCUjIZVYPQghl6GuVw1koz4M' +
                    'kRv3NmTRxlDjxyO3ek/5N6P+TH5h2th5Z8xazqumfmPqlxPDZw2y1tSqgtF8TROnIgHYsPow59TkgbiBwrg0+OYqUjxMt8yeR/8AnG38v9bbyf5v82+YJfM9vHE12LZB6fKZBIoASBlBKnlx5Gg75Xj1OfJvGMWe' +
                    'TT4MX1Sk8o88v5Gtde9L8vL28vfLf1eI+vqXw3H1klvUFCifCBxptmzwiZj+8AB8nW5ZwEvRKx5ljy3f+V+OW8P4pr8Tz+1VW79/xwcP4pl4nn9qvNc+poWuR1/48Z2rWv8AupxmLqY1jPuP3ObpJ3Me8PIkupUh' +
                    'RnQw8eFYASVWgYAchx6jvTOYvZ6it2GQ3M9rfpdW7mO4il5RyClQeXXfMAEg2HNIBFF6R5ih08anPBZWcNpb2JktLf0Fp+5QyH7RJJqd+ubPMBxUBVbOuxE8Nk3e6ASIeihqprE/Ku/SFen35XTZa25ggkMgJHwx' +
                    '1FF2qZFHY4JAJBLNvKPmaeG+TRbmjwyBvRnIpIChchWY7sKDivhm00eY3wF1mrxbcYeo29zFpscEswMt9e1Sys0IDysqGQqpYgA8VJJYgDNhkmBs4WOJO7CNHg13SPMOq3l9o8Fnaa3Mkz+heRXMsUyrQ+puuxqS' +
                    'AoqPfMPTiYmbiPV525ecxMBUvp+Cl+eepz2vkjS7GCiw6jcqJ2FQ1Ioy4AoQKEn4q5R2lIiAHeW/s8AyvuDyHyPpMet3ctvKpY2yiWFlbhwYupLHb4gOIPGvyp1zA0OEZZEHo5usynHEHvewxW8UUvqNGEKAN6yu' +
                    'wBduXL4STQfEetevtnUiIBedMiQxV/PcsXrxtBFK619CaKWsX2QQTuSR8XYjNcdeRYofNzxowa3Z55I1u31P15ojSVVCSxn7QIYgGnYNSozLjlGWNhxZYzjNFF/nWwP5SSk9WurRh9Mp/hmt1/8Adn3hz9Ef3g9z' +
                    '5VznHeqkMLStUJzUEcgGVTT2JwgIJWOoDMAvEAn4a1p7V74pW0HhgVm/5QMsf5jaG+wo81Pn6EmZmj/vouNqj+7L61W6/wA6Z0vC6HiVVuv86YOFPEqLckg0BNAWNFJ2G5O2AhIki2kig06LVry6gtLGZlWKWcsg' +
                    'YvutNj9rtlcpRjuWYBPJ5d+emu6L5u/LqDQvK+o2+saxYagt1eWdmxaSOC2ilMrlWANE5ry8K5rNXOM41E3u5+niYyuWz5i0nSrjVpDFa27TMimRysscYWMMoJ+MduWakC3YyNPX/wDlW/5Uh7mNNWvLh7fkiKt7' +
                    'aReo7IXi+J0KqrUoWPQ7dcy/Cx97h+Lk7mKfoP8ALhESS4fUIgYbWaRRPzI+svwZQRaUPp/aY/tD7NTlXDBu4p+X4+LC9esrXTtYu7OxlE9lE/8Ao8oLNWNgGFS6RmorQ1Rd+2UyFFuibG6XZFk+q/8AnHrzR5X0' +
                    'T8uvq+teYNL0u5bUbpxb311HDNxKx0bgxrQ02NM22lyQjDc9XX54SM9g9Uv/AM5PJOh6YbjylfW3mvzJLHOFt7CQyxW5iiLh5ggL8GYLGvAFnZgoy2eeP8O7SMcuuz4q/MLzEPOPnrW/Ms8tG1KYTOwiaMCQRIrI' +
                    'IyeQVWUqvL4qCp3zUZJcUiXZQFRASyH9EJbP62p3DXAkFvHDHb8o/qjMGd+TyrQ13WPjuepGDbvTv3PpTzlruk/m/wCQND8x+fNfj0byrpElwLPTNItF+vCNXFsJ5TPcS8nZVUeitBVgeVKnMyfrjxE7OHEmEuED' +
                    'dKY/yt8mpDoXnvyjqEFrpVg1vPDdO8t3zuLaUcmunXgoYuvxCKLivuN8RhG0gVOc2YkM1/MLzu/5wflXdeTdBaxkuVu7aRLr144IpLu2md5VVnkIZDE8ZQgBuVQQKjJTJyDakRIhKzb41zXOwdirsVcDQg0rTsem' +
                    'KvXfy48l6j5n0aPULbS9CuIprx7dDfwzGSsXp81JjYALRxTqa1zLxYzIXQcTLkETVlkOraB5i8paJc6+dL8v20OjsCHtLadrlBKWQ8OUi0Vv2iGFRk5QMRdBrjMSNWd1cx5suJgYtenkuJiYvbP+cU04/m0h/wC1' +
                    'Xe/8y8pzn0KI09M/Mb/nIe28n+d9a8tP5I0/U206YRG/mkVZJaxq/JgYG3+Kn2jlUMPEAbKlj1j/AM5S2l1fWlqPy80yMzzxQiQSpVfUcLyH+j9q1yz8v/SKL8kf/wA5i8Y9Q8kO5+CNrxmPsskBJ/DDpDsWGQXT' +
                    'X/OVHlLzJ5tvvKmv+WNLudZ0j6hJGbnT4zcgGWQSoSIwTRlNQ1KYdLMRsFjlhxU8i/LL8vvPFh+Y/lO9vfLWqW9nb6raSzzy2cyRxosoJZmKAADuTmVkyxMDuOTTHERIFOf+crY+X5wXZ/7V1j/xBsGkNY/iUZ4X' +
                    'Jn/nPQtX8y/84reRLTy9Yz6rcwPaSSw2UZnkVIxcRsSqAmisQDttlWOYjnkTsynAyxAB806r5D846RYy32raBqNhYpRXurq1lhiUueKgu6gCp2GbOOaJOxDgSwSHR9Kfm75f1T84vyi8jeaPy/jbU7fQoDBqWjWt' +
                    'Gmif0I4npH3eJoivEb8WqNs12nmMOSQl16uXqMZywBj0fO3lz8qvPvm7VY9F0fQb36zIwSWa4ge3ggBNC8skiqFC9fHwzay1EICyQ6waWcjQBe1/85S6ppv6X8geSYLxdQ1ryzAiatcggsryfV0VXP8AO3pGQr1F' +
                    'RXMHQA1KVUJOXrRZjHqGX/8AOUf5U+f/AMwvMfl6+8n6M+qWtlp8kF1IksMQSRpi4WkrqTtvtlWg1GPFEiRqyy1+nnlI4Rbzz8pP+cdfzW0j8xPL2va/ow0nRtHvI7+8u7i4gYcLc8+KrG7Ek0p4DqTmXqNdiOMi' +
                    'JslxNNosscgMhQHuYz+f14v5j/nRqv8AgeKXXfRggtF+oI1wZHs4gszRiMEsimo5Dbbwy/RDwsI49ve06397mPBu9W/JHyr5n0v8hvzO0nUtGvrPVL5Ln6lZT28kc83Kx4D00ZQWq22w65g6rJGWoxkEUP1ubpcU' +
                    '44Jgg2f1Pl/UvKHmfQEtpvMejX+kWdxIsK3F7bSwKT1YKZFFSFqaZu45YS+kguklhnH6gQH2f5/vfMv5P6H5a0v8lfI1prGiXFtyu9VSze+kZwF4F/QIYmQH1PUckHoM53CI55SOWZB7rp6LMZYYgYo2Pclf5afm' +
                    'x+dvmDz1o2i+avJMel6DdySLe366TdWxiRYnZT6sjFVqwA38cnqNPghAmMrPvYYM+eUwJRoe5jVv5l0fyv8A85jazfa5cpZ2NyWsRdTMFiSW4sYRHzY7AFhxqelcuOOU9GAB+LaBkENYb/GzGfzP/wCcdfzXv/Pu' +
                    'v6zoWjDVtI1a9nv7O7triBQY7lzIFZZHUhhWnh4HL9PrsIxgSNEDzaNTocpyExFgnyekf84x/ld59/L/AFvzJeecNGfTLa90+OG1keWGQPIkpYrSJ2IoN98w+0NRjyiIgbouZ2fp8mIy4xVjyY7/AM4eXFqdY896' +
                    'bIyvdXNvDJHalgHlijkmWTj06c1BPauXdqDaBauzDvMKF7ZflXaSyWVx/wA49eZzJGSkgT6y4qppsySkEe4OQlLKR/exZCOIH+6l9qQ/mH+YOraZ+Wmo+Rfy+/KzUvIvkq8q2t6hfQz82SQqGBZlovMhULvIxp8I' +
                    'pgw4AZiU5iRXNnkIGMIGIYF/zjt5U8wTfmp5N8xW2jXsugwalSXVEgle1TgjBuUoBQUJ3qcyNYYjHIdacbRiZyA9PcjP+cq/y08/ea/zp1i90Dyzf3enO1m0erW9nczx1S0iUgGIFWFRxNATmnlAzhCiBXm7yGQY' +
                    '5zsHfy8nletahF5WsEt57KWG8tmeO9juneOVLlah4irhyKMDsTt0zbDVjFCyL956/a6uWj8WdA1fcBy+xMkbkivuOQDUJXuK5txuL/W6Qij/AGKgr4/iMfx1T+OiYwwhtB1qR2oHtJ467bD0mJ/XmJqfoI8i7DRj' +
                    '1A+YeOQq4RQSRwRGKsSpIQOT2oe4zkw9YWIt/etvQczv4b5hdXM6M9n9JZGBBZt6ncAgK+42+nNiacANCoi5gEExsF+Lb+7X7NR75FKq/P8AffCAAlRvvQSL7YSoTDQppl8zWZDqWYsuzAA8zID1B8emZmkJ8UOF' +
                    'qx+6L2HzPdfV7rSwZTCIJoZ+Sox6TIhUFASOalk8DXfbM7MaIcTCNi881y6lh1Oea2n9CNbe+uFk3BaV5Y/TagB+JOTb9t8xBKpnetpOVKNwG3UO/Oi4F35I8qXINec7/E3WohofxGV9om4RPm2aAVIjyYF+XuqW' +
                    'GmTagb4ugmiVFkQkUG9RRTXkSRxbtlPZ2WMDLi6hv12OUwKZnq3mjT30tE0+cPMVAaKZBJ8IFDzMnUih3HU5tc2qhwek7+brcWnlx+oMAjYJxMiCWJGDOpLKXUcKioO1fbNKDX49ztju9A8ga2Yb+5iZpZLObjFF' +
                    'HXksLGWQgBeRJBFBVRt1NBm10mSyR0+7cus1WOgD1+/kzv8AOST1fyiLAdLizB+iUjI9oD92feGWhNzHufLmc279l+h6Vpl9p6RS2KS3ssTsk7PLy5MJ6MFQgfCYlG+2ZUIRI5b/ANrRKRB5pVpGnwTXy2d3ApLQ' +
                    '81YlwOdQu4qKip3p9GVwiLos5HZrzFp8WnTQRwrGY5VeRJYhItQJXj4lZGJ2KdffBkjRWBtOPyq5/wDKwNFEaGRzJKAqip/uZNwPbMjRf30fx0aNX/dF9ZaDaLql6YJSVjRebAbFqECnt1zp5bB56JsvMtY/O7SP' +
                    '8SXfljyzo8d2it9U03UriaWL1r7mFIYAGkZNUQ0+1StFNRp5a710BbtY6P02SnX5ffmvot/FqU/mO9stL1OC2nNtYQzNcGVY4JHlYsFIXjw2GWQ1YmDxUCwlpjEirL538xed/Meq30yjWbttLWb1rS0E8n1aI0IB' +
                    'jQmgpyahp3zSzySJ57O1jjAHJkflbSNauPJVzPBr2h2OlyyyxzQ3l3HDel3UVRgXWQBuNV4qa5OAPDzDXOQ4uRWflDeaVFf6hDfJIJ/qU7RSR20E56L1Z43dKEVqDgwkWucGhTO7zUvKkeoRI8d5cLM8R9b9FwBV' +
                    '5REGnC32IahoTQj4vfLyY3+xoAlX7UkGoyW9lbCTR5WK2Hl/g6TRUYQ3zUem5/e/ZUdup2yF7cu5nW/PqfuYV+YkN1qX5jalClmbK6v7mBYbJ5Fco06RqgLrRdycpy7zLfi2gGIXEEtrcS20w4zQO0Uq9aPGxVhX' +
                    '5jKi2g2iJI44tMtpkRfVuXnSVyAxpEYyvEn7P2j064eiOqGimmgbnBI8T9OUbFGp16qR4YErCSSSTUnck9a4EuxV9G+U9D02/wDyd8mGeO2e5n19DLBcIhaa3XUkWT42YAAJUFaEsNs2EIg44+/9LrpyIyS936Gf' +
                    '+d4vL+meS2lsbexgm0/T5Gt7SNkikaO3kLMFEZCLxAqf3e4bxNcvyUIuPjsy370dYQ/l/rF7pGmaVeafcWtvcai95FpjwSRLHeeoyet6KgLU8evUjvSuSHAaA80HjAJN9Hh+pf8AON/mS3+vTWWqWZtrZPVhNyJY' +
                    'Q6hwrVcpRQCdiRQ5hHSy73NGqj3PINW0u/0PU7vRtVhNtqVjK9vdQNSqSIaEbdcxSCDRcuJBFhCZFk7FXsfkXz9o3kz8u4ZZytzraaleS2GnIQXLcLVleX+WOq9epptXtmY8ghDztw8mMzn5Uw7W/wA0vOWv2V7p' +
                    'd5dxRaTf8RPZQQRpGERuSqDQtRSf5vnlMssiK6N0cMYm+r1zhm0tjwu4ZLiRwpx5Y80eYPJmqfpryzeGw1QRvALhUSQ+nJTkKSKw3oO2Jo7FiYobXNY1TzLq11rut3Bu9VvWEl1clVQuwULWiAAbAdBko0BQY8KB' +
                    'haS3mjuITxmhdZI2pWjoQwO/gRk7Y8LIvN/n7zj59a0bzbqbak1j6n1QvHFHw9WnOnpota8R1wQEY8mJijPLX5rfmR5PsRpnl3zFdWmmp/d2jcJokr14LMr8R7LTCYQlzCOEp1/0MJ+cv/U0zf8AIi2/6pYPBx9y' +
                    'KLB/NHmXX/OWrNrnmW8N/qrxpC1wyIhMcQoopGqjavhl8KiKDWY2mvlX8zvzB8kWr2HlfX7mwsHYubQcJYQ7dWVJVcKT340wShCfMIohEeZ/zg/Mjzdo8uheZtfe90edkeW3kigQM0TBkNUjU7EV65LHihE3Ebtc' +
                    'zQ3OyTeVPOvm/wAiXj3vlTVp9Mllp60cZDQy06epE4KNT3XLJxjP6hbEAx5M11X/AJyP/OXVrNrKTzALSNxxeWyt4beYg+EiryH+xplcdNiB5JMp97y2JpJdThvLuVpJXuEmuJ5TzdmMgZmZmqSe5JzM4tnFOPe3' +
                    '0H/zkj+bQvdd0Ob8uvOE36OjsZRftpN1LFEJhKSPUClfi4/hmDo8PpPHH5tmqy8JFE/B866j+beq6vavaap54vbyykFJLee/mkjYeDIWII+YzIjn08dwYtEsOeWxEl/k/wA6ax5R1iHXvKN7Lp+qCNoba9EClWjm' +
                    'X4gnqoVIKjwzIlPHlHDIWD793HjinjPFE0fhs9CP/ORP53k/8pXOT/zDWn/VLIjSYP5o+1Tnzfzj9jzX83fz3/MzXp9P0nzFrP6V0+2Bu4YZ4YVKXDBo+XKJFP2T0OavU5hpclYwBYdjpMP5rHeQk0WN+W/+ckfz' +
                    'z8o2RsdA85XltpjE+jaSCK5hhqa8YVuEkMajsq7ZpZ5JSJkeru4YYxiIgcmcWH/OUH/OQN3Cksnnq+VJmEayJZ6eyhiR4wDsffMzFgEhe+/uUwHckqeYvMP5gXt35i80XovdeupXF7eemkfqGA+ipKIAAeKDoM6b' +
                    'RT/cjyJHyLx2vxVnkPd3dz3zyTB5FXyvp8l5/wA5B3Hlq9MYW80VLlkjtJ96wisyioA6AbZr82rjxn93E0ebnYtLLgHrkLHJn/l/80fy1/K/S9b1K1/NG+/M7W7mH0LLTvVeeKN1qQRu6oCSOblumwGUCJ1JAjGM' +
                    'AG4n8uCZSMiXypoeravpGtW+raPdzWGqRyc47m1f0pF5H4gGUg0I6jOjnGMo0dw87jMoysWD8Hpdx+f/AOdKPwi823cMSfCoa3tn50J6FoDU7V65p5abFf0j7XcjNkI+o/Ykfmb85fzN826Bc6H5g80T3mh36ql3' +
                    'ZyQ2w9RUpKN0hQijBe+MIYoESEQxl4swYmR+xJIPzq/Mn8pPLKaV5X8wTWmkpcFxZRw25HOcqztWaMvuPxyrWTxR9coWfe2aTDll6Izoe5kjf85GfnlHpMWrHznII7i59GCMwWg/dksKsTD9r4egyJx4eDi4Bue8' +
                    'sx43Hw8Z2HcHiXmnzBd+bLm8vNWVLjULmup3sqyqs095MxldqKAACZG7Zh5ZiYquQc3FGUDe/P7Fv+M7yymjtp7l7aGS2jA9ejGNFBFE5RH49vidjU5MauUTRkQK/HRhLTCQJELN/jryVk88iNJZ5II7hQCZFU8T' +
                    'GK1V1FE5ch1Xt2y8doyAs7uOez4E1XDf4809s/OVhD5e1GDXporKS9gIsIgJCZPWtlY1KhwKFwMtnrYygeP0kjbn3LDRShMcHqAO/LvYDqus6JbvcPYTfXZ3leMD0gsZh4sBIHAT4jXpwFNvlmmyZIC63dxDHM89' +
                    'mNpBCs0F26vdWJKyXKxfu2B+1JEGNaED9qmYgAu+YcmzVcizK281pB5hhvrXSnbTpUEDQPLyflJQHnK8TDYbN8P05mjPU7EdnDOG4UTu1rusTGQW66fp3psGneayDRxxhlMfpMw5UPw7b0rjlyHlQ+CccOtn4ofT' +
                    '9Tsrq6t7WayWK6vZoIwRK4pDMy8jxKfbU03LfEOgyEZgkCubKUCBd8mWpYaXp9za38cfKaCWOVeZJWqD1aEADapzOhGMZA/jvcOZlIUzbzbcyXQ0u6kKIxCO6BvhqLpAtO5+yemZOc3R/HNowirH45MO1X1F1Isf' +
                    'hdbO4PMMCDSVd69/kcw5/V8HLhy+LzbzZrms6hqN3pl/fTXFhYXlytnbSNWOIeqy/CO222a7NklKRBOwJc7FCIAIG5CaeX4IF0u3laMF5GPI8ASQHk2Jpv8AZGZ2niOAH8dXEzyPGQm/CIj93EASQFPELvxTx92O' +
                    'ZVDoPxs49lUlhtxKwaNeAagBA7Ow7f6owkC0AmmkdYkX0v3ZRfUTieNHMasSPpNcQaCkWmfnDztcaj+XU3liW0lmlgngnn1N5V4BZLmb04+FORNIz0OY+rzmUDGvi3abCIyEvsePZpnavRfKF2lhYgj1DNd2LQ0j' +
                    'lKUUy3G5WnEiq/ZY0JzPwmh7x+txcgs/FL/K9r9Y8yW0NJay2E70k4u3JSxAUVoBUUHh1yvELn8Gcz6fil3miKE3dorS+nSCQFWBJFLqbavw13r2yGUbj8dSyhyZF+W9sqomq2Nmw1yzvoY7TU47iSJ0W4DoaKrU' +
                    'qKUqR+1l2njtYG982rMeh5UzWbzLc+Tzp3mm31e4sfMV3bSNqMV+81/FI7ok3oiOYsFLN0ZemZcp8AErIPnu44xiVihXyeVQmxj876dc6fcPfWsmoW07TrGY+UkkyyOqL1+EmgzW7cYrfdzd+A33Ify0rPrd0kKh' +
                    '3NnqnAN0oLKcmo+WRhz+f3Jny+SQDcCnTKmxWjnKRtH6UcgYEAuvJlr3U9jthRT0X8m9VmttavdOS8NhHcWN273IeGMDhHUKecZLVPbn9GZGA704+eO1vYE1q+/SlrbfWLe+uHltZDMl1BMxWKJkHxApU0NGHp0H' +
                    'Svjl8Rtw+EU8M1QRzwxi3o8P1KzMzj938Zm4uF5Ox7024+wAzBLnBD3sCaf+YOnREv6cV3p7Eyu0r05xndmJP0VxO00g3ApD5gAGv6sB0F9dD/ks+Vy5lsjyDrmOmh6bLyWjT3i8a/EOIgNSPA12xPIKOZS7IsnY' +
                    'q7FXrPl7VtH8r/lfp+pa3oEfmK31TVL+2ijmuDALd4IoiGX0wWqeVd/CozKiRGFkXZcSUTLJQNUFW5g8r+ZdI0OS31e00C9aE3F3bPdvcsJLi8eCNZDOD8dG5N4JVmpthPDIDekAyiTtaY+XtG/LfyvZXCa0Ztfj' +
                    'nFzNJcadq/1RfRsyYyPQiozO6yExhvtoT9n4hkoxhEb7/FjKU5Hbb4JvZ6nqGkeYJkbzUR5daV2ltrf0PrEsFpGLpoGumE3qKVlVebAmdgVHxDJAkHnsxIBHLf8AH48kn1nVfKXmDXSlzJbRTtffWLy7v4A9xfPq' +
                    'shZYZZ7cx8reFQAW+EpWldsjIxkfx1ZREoj8dFIaX+UupS3E1haQJP6ZdbETXkMUTIeHWd6kFhXjzLBW5UNKYKxnkm8g5vMvNsmmz6uLjSrdLOzmghk+pxqqCGTjSRPhJBowPxdxQnwzGnV7OVC63SLIM1yBS6hz' +
                    'xQkBmAqQK7mmKvou01LTb+R4bO6imnjAaWFXq6A9OS9Rm1PpJieYYQlGcRIciimCKKswUdKk0/XhBJSQBzWn0/51/wCCGS3YWO9sKG3Ug/I1yVrQPJ3DDaOFplVRViFHiTQZIG2JAHNjetea7bRI5LieEz26sI4h' +
                    'CfiZj7nYDY5dmAxYxM3fc4GLP4mYwFUOqa6bqFrqenW2pQ1jgulDIslAwJqKGhIrtkIS4xYcqXDHmVC81mysXIuOXphljVkBctIxoFAHXL5x4IcRcSOeMshgOnVSj8yeX5Egk+vxItwaRCQ8CaV3IP2Rsd2yk5Yi' +
                    'rPNyYjiuujCPPeqX1rPaC0vJIY5PVbkh+0AV4/gcHaGWeMR4TV9zgaLFDLKZmOKjtfxX+RvMVvY6beSa3ePxe5SOBpS0lGaNmO5rQbZi6TNUTxHq7HNEXsN65MlvPOOgWNwLa7maOQosoIQuvF9xute2+bHJnx4z' +
                    'Rl083Bx8WQWImrroiLPzJot+Ha2lYqjKvJ42TkWpuvKhIFd8MM0ZAkdGU4iJAPMq188FxayiB1kqkiHga7lSO2ZWOQlGVdzr9VHhlH3vJtO8s6gur2VnqEHpRzNWsgJjcIOTLUdyBnOYtJMZIxkObusurgccpRPJ' +
                    '6Pe2Wn6RZS31tbqJIOJTnJIq/aUCp5Hb6M6LJjhiiZAcvMugxTnlkIE7S8gwK/8AOWq/pKW5tpoyjIYgIw3phG3IAYA8gf2qVzRZdfk4yQfL8frd5DQYxARO6AhisZI5Lyb6yLgledJFapkoQSzCu/vlERAjiN37' +
                    '3PqtglVy6PIRHz9Jahebcj89tt8xZkE7MmV+UIGlhkubmO1ltoGqsl5JJH6QjFSYwoo331zZ6MWLNUO88vc63WZCCBEyB8qZnp1jDZvLc2mlLDM1ebR3MqtLRmo9FB+11Fc2uOAiSRGj/WO7qMszPaUr/wA0MO86' +
                    'WVvp956JsGt4Jh9ZklV3mDTtUN8b0r1H05qtbAQlXDQ59+7t9DIzjfFdbd2ytoWqT+W7SGCA2IuLk/DPLFKzn1grBC4UUFGU0yWDKcMQBw2eu/VjmxRzEkiVDzDJdY1i/wBG80aLZQRxLFfektzGV5BXZ+D8Dse+' +
                    'xzaajV5IZIR6S5/N1Wn0mOeOcuseXyZBO8izT1kUBZmozHYDk5+j3yyR3PvYRGw9ymj/ALtGVwzAMAFYFa+n7ntkL2/HczrdjP5kc/0EPjDKZlJ8a0FMwO0P7v4udofr+DK2vCPKlpIssVmJXMJYxchT94vwCuzm' +
                    'leXjmcZfuR0/BcMR/enq8TlnurkR8ZFMygB5FNGkP7HQkVCj29985okyegAEb7vuVZILxVa4kiklT1gkjP8AvWT4gRR6mjE7HJGMuddWsTiTV717kRe8mi1F1uZJfjQlnRyQnE/uzyoAV6V6+G2WT5S3asfOGwH4' +
                    '5q3m31Cti0khlrFHxJHEAfVrc7DanXwGDUdPx0Dfg6/jqWNZhuUiaodPNeJmSYBCSeYQqSQBWnGo8OuT6MeqeeVIJJ5hxd41JdXkQOw3aE0YR0bcV6EHL8As/jyaMxpnl5dXNl5sdm0821qtvqQjNxJMsEqiMFZC' +
                    'WJKrtsF2HbNhKRGTlW0nCiAcfPuYak0o8zaVDNSMfXyCvIvRRcAKgpyIpvTfMG/3g9/6XMr0H3foZjqutaPZlLS9uUhuPTVjGUZ2AaGgNFQ0zNlljE7n8U4kccpDZNtb1iIWmiXcMgWBoYpI5WFfVjnvGZSirRjQ' +
                    'CrfD9GWZMm0T+ObCENyPxyYX5xv7htdgt9Hv5dRiMHK6ktIJAvpzMGeLgRUgEU99sws8jx1E25WIDhsimAztI88rzAiZnZpAwoQxJJqO2+YB5uaOTMfLpJ0mCgfZyPh3FeUh8M22m+gfjvdbn+srr/XrC3ikETev' +
                    'OCVESmtGVUBLbDaqnHJqIgbblYYZE77JbD5qll5LcKsJb7DqvMCvLqCR3bMb83Jv/LBRe7ubm5IF/PwaigxsoWvEbKgPhttlZyyJ5ltGOIHJANd3cy/U7pvWWV1qzU9ZeJJABJAX7RND4nKTInm2CIHJCzQpFGnX' +
                    '1WJJ+JGXjTb7JJr88iQyZn5ceBLOImSNXW2BZXQOzsZLgKgoOhHUNtmVjqvx5tE+aA8u+k9/eySRApBDIAIyISEB5EVC0/D2yGPmWU+SK8wvaHUlC2zyS+k4dWYSEf6VMak/DuQexyWSr/HeiF0y78qLv0dGuEIB' +
                    'B1G3QjnRlEjgVIp0GZOkNR+LRnG/wSn81JGng06dZFaBzGV+ItLUwL/eV6nbY0yvVGwGeDqwDR2/3L6aCxCC7gJFdh+9WpzBjzDky5FX0eE3Ovw2iXX1P6zLJB9ZDcQolDJQk7UavE17HCOaJclDVxMupXCXHo+s' +
                    'pUMbZQkOyLTioAA267dcEuaY8kVoumNew3t0sskX1WP7URoTzB2PsQN8MRaJGmR/lRqek6Z5huZtRvl04y6fdQwXMvpGESMAQrCTYlgOK+++WYSAd+5rzAkbd70L/EunL5hsbybzJZ3HpyQBYIZligYCM8eXFdir' +
                    'fCx7/PL+IXzcfgPDyYnqumalNbQSQhXh/RVjMxV41URy3HABuIU/bNPi398qkD9jbEj7Uk80afd6Z+YcNneqBcw3FgJih5qGb02HxDbpkJips4G4JNrWn31/5l14WNtLcmG9u5JRChkKIJ2BYhQaDfrkZAmRZxIE' +
                    'RaH1GyvrLTrCK+gNs/qXRWGUMk4FYgS0bAECoop70PhgIICQQTsleQZuxV2KqjXNy9vHaPNI1rEzPFAXYxo705Mqk0BagqR1w2inv/k/Q9GufIWmSXulxTs9pZzo8GnQS3MjtqksUrNcNGWI4gKys3TM6ERwDb7P' +
                    'NwJyPGaP2+SjrVlH5btY7+00lUuWOtoCtklu3CKdUAJSNXp6b/ZLUA9sEhw713pieLa+5dZxXdvJ9RGmW0N1cNfC2imQTW6I1rHNC4orenxO6kEcT0puMI9yD7000jy1bWuoxNcWv6QvLwaRBNDcxo0USF6SxwM0' +
                    'jgxnkOatSp7E5KMd/kxlOx80zi03SNW0p7G7tYp+EXqzxSBpIQVeVq/vOXNqp8TKD0C1oBkqBDGyDb5888WUNhrcUNtaR2lu1hYzRLBvHIJbdHMo+FftEmu3XMDIKLsMZsMcytsdiqdaJdrpWrwah6/ptAS/PiH3' +
                    'II3Fd61y7EY8XqNBryGQj6ACXoV75y0/VNPWN45IriNuTqwqTxBBNO1eubjTTjCZPT7XWawnLjjGt7+DzO+vr03cojuJTEjlohzZuKnp322OazLmnxmpGr23czFhhwC4i632V7LXdetplMN9cFVZXeJZXAah6Gh6' +
                    'HpkBmmZAkmVNvhRjEiPpvuTRfPGtCWWWNzAzn7SD41BG61YNWvWtK5lz10pbEUHFx6MQPEDvXPvV/wDH+oyLDDcN61vHTn6nxOx7tUcd/bJw1/CQQGGTRGcaMj5KJ1i31ef6tMAxkJ4zXChYVQVYVFSfbJnUxzSo' +
                    '/M8moaaWGNj5DmsmjktSba01OcwxlI/RikVYzzHIlCXpwBNKnISBjtGZobbH7t+TKJ4t5QG++4+/bmgLlr22b6qJpmgQhkVZhIoJ71VyK75jzlOPps177/S5EIwl6qF+6v0IdEsrgvFNcNHIoKwtKpIKn9lqE0oa' +
                    'kfPKqhLYmve3EzjuBfuTnU7nTNYTS4LnUFjNrEY7icAklvh3Apv0zOzTx5RAGXIblwcMJ4jMiPM7BKDLbW1o1g5W4iM/r+tBIVbZSiijJ4Gp2zC4oxjw8xd7H9jmcJlLi5Gq3H7UPJLaOjs8UzzsPhlllrSnT9nf' +
                    '78qMonob97aIyHUV7maWGqaJb2cH+lRPPHAoMRG9eIqKkDvm6x5sUYjcXTpsmHKZHY1ai3nCC0upLaJY/qDKOUiCQuWK/sUYDYgDtXKhrYwkQK4fi3S0kskQZE8XwRzeZNMnhe4ttRMmoW0Lz28c8CIqyKhBAZqf' +
                    'arSlTmQdXCQsS9QFiw4w0k4mjH0k0aKzXvNNteeW3t1aGa5uAkcwjkBp0dvh+FhuKZHU6wSw1sSWem0hjmveg87YgmoAUeAr/HNAXfJ2i2CxATCUT1jUcaUBUA7ECnQ5nAQA3u9mKTT8fWk4ElOR4ltjSvfMKXMs' +
                    'kwsNYvtNt1iSj2ruzpG1CvIAqTQg+OX480oCujRkwxmb6povm/V4ODKVRG+M8Pgc8mYncb0Fdt/45kfm8gaDo4FBaxrEWqfV41j9J0Qwzz7sZFD8lNCx6e1MpzZhOh8C3YsXh3Rtk5Gn6slmbW0Rr6K1M9xeyiR1' +
                    'kMEfw8FikjoSIujIK7ZnnhyVQ3q79w8iO5144oXZ2vl7/eD3urq3mm+03WS8aTW8clxbcbdokrFMAQ5EhJNdxTG555Rn3bjbz961DBGUOh2O/l7mVwT3FzaRXs1uoa4AlcrLU/ErVPA7AVO2Z4kTESI5+bgmIBoH' +
                    'l5L47hmCglhGVJjboXLR9N9sRJeFi3nyZJtDQqW5LcUPKvSg8e2YGtN4/i5+jFT+DLLqO6i8n6ekMavN9cBKMCAVMsp7kde+ZsgRhFd/63DjRzG+79TxiaFVtbaQW4jaQmjCQuXoaGqkUFDt1znSPSDTvIyuRF8v' +
                    'JEkoxnmuCbd1nBVBKKq3IcqIBvSnXJ95O27XvsBvt3fpQ2otKLmVHYlGIcbuQ23wt8e9SDkMl224QOEFDPLLIFEkjOEFEDMWAHgK9MrJJbaC3AlWEMhtGuK/uhKsdK7cipPT5DJVtbG96TzyzBDMQ0sojVGf1O5V' +
                    'CYjz7dOJ2qK+OX4QD+Pc05TTOZtU0efVr1pQq20lvfn66oRq1CbkSxAh5KFAtfvzPM4mR9x/HJwhCQiPgwTVL+GfUzf6PcSK1mTIs1yylncNy/dihJFa0Dds185AyuJ5OdCJAqXVOdK8j+Z/Nc8eqLMptJoFljvb' +
                    'iRnVkB9L0S0S1DChqtKUy6GnyZTxdGieohjFdUy1zQ/OWkBbSzga7jtUjC6lauyFYrPdVoxHp+nUciv9csyY8sdhvXX3NePLjnuTV9Pe1BafmdriXMBmmhSUK18VkWCSRivwoW2O6nlQfDTERzzsfNTLBCj8mJ3/' +
                    'AJQ1jTYRLqHpQXDUKWskgWZq9wGoCKb1rmLLBKI3cuOeMjsyLQ9KnitLe3SeAvIBKkRercuLMalag0Jpmz0+M8IAIcDNkHESQWEXDPbX9z6bUKyyofAjkQQR3B7jNRPaR97s47xDVpFBM7LP6lApf91w2C7n7ZH4' +
                    'ZEAFkUfLpzpJCmnyvcxGRiqgjknp9WZQaCvVTX265Mx7mN96uuj3VrBW7tZFtGkq9zxZwY6GpUKCBQb7kdMlwEDcI4gUvuI9ISI+jLcG5Ut+7kRAhGxU8g1dx7DKyIshb0zy/oWgappyXdi19JA8IjpBplxPGsyM' +
                    '7svqJUFl9Tjse2bDHCMhYv5FxJykDvXzSzRvKuvQ6ldRX+l3pt5YmSGVLWcAqq0Q14Gh26HK4YpWbB+TOU41sUJ5in0lbWS8tFkluYJFhDMqW6iF5ro8QsfTcDqtchkMasfjmygDaF8q+dbXy3ZywPppu5ZblLnn' +
                    '63pcREwZR9k1ocGLOIDle6cmMyPNZ5n85Pr2jaVp31E2psQ6eqz+osgI4tQEDiRTrgy5uOIFclhj4STbFvU428XCiypIXDh/iGwp8NKilOtcx+jco+/fIpdiqK0zkdSs1XieU8Q4vvGauBRh3Xxwjmg8ns2nrp8U' +
                    'V19at7JJ2keCQW9vbxwSRAhk+B0atSKVzMFOEbWSSC4v7kmwt3mtBCls3pR+ojOpKUeNQeII2p06Y9U9GOPb6cyqktkOYtbJ3kTjvIZ6sxoteLLWvxVr3yug2WXpN5q3kbUPJ0/lnUJrPT9X+sQ6hp9472yuklrK' +
                    'SqytJMJVDIOG4NQageOQTExo83GEZiVjk8s84XXlJdRs9Y0G+t5rt9Sur29jtorhGNq90rwK5esbOFVnbi37QHUZjTMbsd7lQEqo9yUfmP5ot/OPnTVfMFmhSyuZW+q8l9N2hBJVnWpAYg/EAchlnxSJZ4ocEQGL' +
                    'ZU2uxV2KuxV7p5X8z6Npvk3R4rrWbE3UdhFENNd2SWN11YyD1DyC/ZPOg3AFTtmbCYERv+LcGcCZHbr+hGeZ9d8uXqB5vMgjpLrcKzWV1HcMyzurxt6cjD7W6oagU6HJTkD172MIyHTuQVzrXledpHl1a0nIlnnW' +
                    'NNSeFPTawSNIyojX4iVIqh2brkTKPf8Ab5MhGXd9nmjNK8w+SoLxEXUQqW8elK8st4rxesjx1cN6gBCAMZF3HtkhKN/JEoyrl3pTr/mrR4/Ll9PoeoRwazJHMS1tcqeSnUwvBY9mAaDegFOHXISmK25/tZRgeLcb' +
                    'fsedeeHt5dZt5rW6iuoH07TypgPwxlbZFMZFTRlKnkPHMfJz+DkY+XxLtO/L3z3q0MdzpnlrUrq3lXnFLHaylGTiH5BiACCDse/bEY5nkCpywHMhEj8q/wAzGFR5R1an/MJL/TJeDPuKPGh/ODGXhnc1K8dqHfKW' +
                    '5GtcODyERWvWrA7nw6ZknP5OMMHmrWF6tm0v1izS5jmFGV26CnaoPXJ4dRGBNx4gWGbTynVS4SG575mb/QLWGxiUUAQBpPi6nmQT8sE9Tv6IiI+35phptvXIyP2fJAMkxlMteTMatU9fnXMQm+blgVyUTby7mg39' +
                    '8VXRwSqakD78VVCCmxXc9gKnAlSMrAkcOnthQs9QBuRQcqeJH04q4zVAHAUHhXtiq5JDU8Y1JJqSf7cVVyvwhylWbcgb0p4YEqYddy6GgFRUbfhhQ4PbHizD4j9rY/wxVzXCqFWEDj3LDocVU3kBQqQhNeqihxVS' +
                    'IPQ9cVRAnFaBatyUiSpDCgAoKH2yziQpFXZ6uDVmoSeta7/ryPVKtdgRqltvygeVWBFDu236snPbbutC93lkt0tkjVgFElYyGIp1rQbHxyRJIqlUIIZJZkijqJGNFO9fw3yuMSTQVnPlPUtK0mLUrbVbj6u9xYpb' +
                    'qoRy5KCXkR8NOjCh9822lyQxiQkauNfe6vVYpzMTEXRv7lCfX49GW2j0C4W+ISW3ljnjkRlDy812rSnblXfK5Z/DoQN8xv72Qw8dnIK6/YpS+aPMthaxWs+nxRxcEjWTg9WVD8IJV6dT9OROpyxFGKxw4ZkkSS9f' +
                    'OGqwI1uIYUAUoylWqKih6nY5T+amNqDf+Wgd7Qep+Y9Q1W0WyuOC2yNzVUB67U6n2yrJnlMUeTbjwRgbHNlbfmhI2mxae+ntKYmLCd7lg5HxcR8KDoDT5DM89onh4a+1whoPVxX9jBpLlGCCOBE4sWJb42Yn+Ynr' +
                    'TNWZeTsBDzX2d3BbXXrzWiXNvvW1dmVSe3xDfbJQmIysix3McmMyjQlR73aheQ3s/rQ2kdoD9pIyzVY9SSxJ3xyTEjYFLixmAoyMkJlTc7FV4mkEBt6/ui4kI/ygCo/A4b2pFb23DO8HqcP92IUPXavfbwpiDSkW' +
                    'qG9naL0m+Kg3c1Lfa5bmu+574eIo4QoBmUEKxWuxoSOop+o4GTJdO8wSCKVJoGOnw8ZLn6qyQOU4CFE4uHUrzPLoTXfbMmOX5OLLF8151v1b22VY7t7OKOKa4iu54pXdYlLSOvqoU+JOgKn6cfE3HOl8PY8rUrnV' +
                    'Lua4R0Cxzxfv4IDwEqrUMlWjVQ7MhpQ7hdtgaYDMkpEAAtnkj1ldLmeWJYbWOQXau8Vuqn1pJAiKBSpWlOKUriTx15KBwX5oI3jaJqskmmPC5RfT9WMiaJuSAMVNFrX5ZGMzjlcWZgMkaklbsZHaRvtOSx+ZNTlJ' +
                    'NtoFLoWiSQNNH60Y3MfLhX6QDiFT2DzS1tEIbexjiQdArED9WXDLXINZhfVn+mXkqeW7TXL29trOxuuShGk3DBnUqVryJotaBczYy9AkSAHHkPVQYTqtz5bee31HTGRbyOeJ2hWN442VWBNQaAUpvQ98xJmF2G+I' +
                    'lyL1q0/Ny8uV53P6IsYKExpaXYViSd+S/WIqdPfNkNWTzofH9rhnAPNXvfzFlvND1xtO1OKK/tLCW6tXt7kPIJEZACF+szV691yR1FxlR3rv/agYaIsdXjXmPzRNr9nYpeMZtQWFfrdyQgMkgkkNW47k8WA3p8s1' +
                    'WTLxgXzc6EOEpXZX66ai8rS2u5HdJ0eUCQoFVhw2O1a1IPgMrjLh6BkRaLi1CzuZ7Sa60n1UhMZujCu8/EEMXIAqXJBO+SEgSLCKI6r/ADLdaLfTqdC0ibSUUkzW0jGQVNSDUiq7U+Hp4YchiT6RSwBHM2x+oJoD' +
                    'uegyhsVo7S6m2ht5ZDXjREZviJpTYda4aRaNXTdY0yeG8udOuoVgdZqzQSotInFSaqNgRQ4aI6IsHqyOfzzNDcTBrVpS8nqgs7xceVCRxdCd6da98s8RqGNVg/MGaCeS9fRVFtcNAGCSOikQBtgxRgS1SemHxPJf' +
                    'C81ml+fpIL1fUtIv0Y9j+jL2OY+tWD6wswmRTx/eoyhlC9/bEZN1OPZMdXt/yt13Vb3UJfMmrWPxbQjTUvfgU8Q3qi5UGu2SlwE3Z+TGJyAVQ+aXHRPypAYjzjqjGnwL+hQoJ9z9ab9WR4cfefky4sn80fNqLy/+' +
                    'XAjSW8806nDE4+F10mGQMfYLe8wP9ZRg4Yd5+X7V4p9w+f7EbZ6f+TlpBM9zr2paleCpt0k057WDboH9Kdn38QckBj7z8kE5D0HzQ8fmXyCL4zp+X0d1CgCm3j1O/wDQNK/EAfjqf8o/Rg44X9P2lPBOvq+wIfUI' +
                    '9G80XwTyz5UOkvMvGGztNQkuXjdSAZJ1uFYrHv1+Ae+A1I7Cki4jc38F8P5R/mDOYxFpBYTM8cLGaFVd41DMAWcbgEY+DPuR48O9m+m/kFdfVtKGtai9jfX0Mktyi20FzBavz4COWX1w3xJR0KowrtscvGn5WWk6' +
                    'nnQSXz3+UGteX7q3XRjL5kdhxcWMHMpHCoKl44izAFCDX6K5DJhMeW7PHnEuezCH8nebUeh0O9qUEtVt5GUIyh6lgCBQHep275RwS7m/xI96gNWvbu3FlDZwOBAYn9CCjuqhT6rhNmdApo5G1WPU1xsleEBOLHyN' +
                    '5y1nT0nsdHh+ryN6izeta28rLxAoVkmQ8duX2eu+SGORHJgckQdyqr+VHn6SKSVNJRoYhWWRb2xKoDtViJ6D6cPgz7l8aHe9h0H8wf8AnIHQNFs9Fi0nSHsrC1W3s5bua0V/Rt04L8S3iqxAXw3PXMuOTLEVQ/Hx' +
                    'cOWLDI3Z/HwUb788/wA9fWVI9FsLVYgolEcSTczQVbm07D4u3HbAdRl7kjT4u8v/2Q==';
                    '" />';

var running;                    // Is the autoplayer running?
var innerPageElt;               // The currently visible inner page
var cashNYElt;                  // NY cash DOM element
var cashCubaElt;                // Cuba cash DOM element
var cash;                       // Cash array of values by city
var healthElt, health;          // Health DOM element and value
var maxHealthElt, maxHealth;    // Maximum health DOM element and value
var energyElt, energy;          // Energy DOM element and value
var maxEnergyElt, maxEnergy;    // Maximum energy DOM element and value
var staminaElt, stamina;        // Stamina DOM element and value
var maxStaminaElt, maxStamina;  // Maximum stamina DOM element and value
var levelElt, level;            // Level DOM element and value
var curExpElt, curExp;          // Experience DOM element and value
var lvlExpElt, lvlExp;          // Level up experience DOM element and value
var energyPackElt, energyPack;  // Is an energy pack waiting?
var ptsToNextLevel;             // Experience to next level up
var mafia;                      // Mafia size
var invites;                    // Number of mafia invitations
var staminaFloor;               // Stamina to reserve for manual play
var stats;                      // Skill points
var city;                       // Current city (0=New York, 1=Cuba)
var autoStamBurnif;             // Can auto-burn be used now?
var skipStaminaSpend = false;   // Skip stamina actions for now?
var clickAction;                // Action being attempted with click simulation
var clickContext;               // Context for clickAction
var modificationTimer;          // Timer used to wait for content changes
var fightTmp = '';              // "tmp" PHP parameter for fighting
var idle = true;                // Is the script currently idle?

if (!initialized) {
  var settingsOpen = false;
  var statsOpen = false;
  var scratchpad = document.createElement('textarea');
  var defaultClans = ['{', '[', '(', '<', '◄', '«', '™', 'Ψ', 'Ξ'];

  var debug = GM_getValue('enableDebug') == 'checked';

  var useClickSimulation = true;

  // Regular expression for cash matching.
  const REGEX_CASH = /C?\$[\d,]*\d/;

  // Define property maintenance states.
  const PROP_OK      = 0;  // No damage.
  const PROP_PROTECT = 1;  // Needs protection.
  const PROP_REPAIR  = 2;  // Needs repairs & protection.

  // Define how stamina can be used.
  const STAMINA_HOW_FIGHT_RANDOM = 0;  // Random fighting.
  const STAMINA_HOW_FIGHT_LIST   = 1;  // List fighting.
  const STAMINA_HOW_ROB_RANDOM   = 2;  // Random robbing.
  const STAMINA_HOW_ROB_LIST     = 3;  // List robbing.
  const STAMINA_HOW_HITMAN       = 4;  // List robbing.
  var staminaSpendChoices = [];
  staminaSpendChoices[STAMINA_HOW_FIGHT_RANDOM] = 'Fight random opponents';
  staminaSpendChoices[STAMINA_HOW_FIGHT_LIST]   = 'Fight specific opponents';
  staminaSpendChoices[STAMINA_HOW_ROB_RANDOM]   = 'Rob random opponents';
  staminaSpendChoices[STAMINA_HOW_ROB_LIST]     = 'Rob specific opponents';
  staminaSpendChoices[STAMINA_HOW_HITMAN]       = 'Collect hitlist bounties';

  // Define cities.
  const NY     = 0;
  const CUBA   = 1;
  var cities   = [];
  cities[NY]   = 'New York';
  cities[CUBA] = 'Cuba';

  cash = new Array(cities.length);

  // Define all jobs. The array elements are:
  // job description, unadjusted energy cost, job number, tab number
  var missions = new Array(
    ['Mugging',1,1,1,NY],
    ['Corner Store Hold-up',3,2,1,NY],
    ['Warehouse Robbery',5,3,1,NY],
    ['Auto Theft',7,4,1,NY],
    ['Beat Up Rival Gangster',2,5,1,NY],
    ['Rob a Pimp',3,8,1,NY],
    ['Collect on a Loan',2,37,1,NY],
    ['Collect Protection Money',2,6,2,NY],
    ['Rough Up Dealers',2,7,2,NY],
    ['Take Out a Rogue Cop',3,9,2,NY],
    ['Perform a Hit',3,10,2,NY],
    ['Bank Heist',10,11,2,NY],
    ['Jewelry Store Job',15,12,2,NY],
    ['Hijack a Semi',8,38,2,NY],
    ['Destroy Enemy Mob Hideout',5,13,3,NY],
    ['Kill a Protected Snitch',5,14,3,NY],
    ['Bust a Made Man Out of Prison',5,15,3,NY],
    ['Museum Break-in',18,16,3,NY],
    ['Fight a Haitian Gang',6,17,3,NY],
    ['Clip the Irish Mob\'s Local Enforcer',10,39,3,NY],
    ['Steal a Tanker Truck',8,40,3,NY],
    ['Federal Reserve Raid',25,18,4,NY],
    ['Smuggle Across the Border',7,19,4,NY],
    ['Liquor Smuggling',30,22,4,NY],
    ['Run Illegal Poker Game',20,26,4,NY],
    ['Wiretap the Cops',30,28,4,NY],
    ['Rob an Electronics Store',24,41,4,NY],
    ['Burn Down a Tenement',18,42,4,NY],
    ['Distill Some Liquor',10,23,4,NY],
    ['Manufacture Tokens',10,24,4,NY],
    ['Get Cheating Deck',10,25,4,NY],
    ['Overtake Phone Central',10,27,4,NY],
    ['Repel the Yakuza',13,29,5,NY],
    ['Disrupt Rival Smuggling Ring',15,30,5,NY],
    ['Invade Tong-controlled Neighborhood',25,31,5,NY],
    ['Sell Guns to the Russian Mob',25,32,5,NY],
    ['Protect your City against a Rival Family',35,33,5,NY],
    ['Assassinate a Political Figure',35,34,5,NY],
    ['Exterminate a Rival Family',40,35,5,NY],
    ['Obtain Compromising Photos',28,43,5,NY],
    ['Frame a Rival Capo',26,44,5,NY],
    ['Steal an Air Freight Delivery',32,45,6,NY],
    ['Run a Biker Gang Out of Town',35,46,6,NY],
    ['Flip a Snitch',25,47,6,NY],
    ['Steal Bank Records',30,48,6,NY],
    ['Loot the Police Impound Lot',60,49,6,NY],
    ['Recruit a Rival Crew Member',30,50,6,NY],
    ['Dodge an FBI Tail',20,51,6,NY],
    ['Whack a Rival Crew Leader',28,52,6,NY],
    ['Influence a Harbor Official',50,53,7,NY],
    ['Move Stolen Merchandise',36,54,7,NY],
    ['Snuff a Rat',44,55,7,NY],
    ['Help a Fugitive Flee the Country',40,56,7,NY],
    ['Dispose of a Body',25,57,7,NY],
    ['Ransom a Businessman\'s Kids',60,58,7,NY],
    ['Fix the Big Game',50,59,7,NY],
    ['Steal an Arms Shipment',45,60,7,NY],
    ['Extort a Corrupt Judge',24,61,8,NY],
    ['Embezzle Funds Through a Phony Company',50,62,8,NY],
    ['Break Into the Armory',50,63,8,NY],
    ['Rip Off the Armenian Mob',50,64,8,NY],
    ['Muscle in on a Triad Operation',45,65,8,NY],
    ['Ambush a Rival at a Sit Down',55,66,8,NY],
    ['Order a Hit on a Public Official',35,67,8,NY],
    ['Take Over an Identity Theft Ring',36,68,8,NY],
    ['Settle a Beef... Permanently',40,69,9,NY],
    ['Buy Off a Federal Agent',35,70,9,NY],
    ['Make a Deal with the Mexican Cartel',40,71,9,NY],
    ['Blackmail the District Attorney',44,72,9,NY],
    ['Shake Down a City Council Member',85,73,9,NY],
    ['Make Arrangements for a Visiting Don',40,74,9,NY],
    ['Take Control of a Casino',70,75,9,NY],
    ['Travel to the Old Country',52,76,9,NY],
    ['Rob Your Cab Driver',12,1,1,CUBA],
    ['Secure A Safehouse',36,2,1,CUBA],
    ['Intimidate The Locals',52,3,1,CUBA],
    ['Silence a Noisy Neighbor',32,4,1,CUBA],
    ['Smuggle In Some Supplies',34,5,1,CUBA],
    ['Set Up A Numbers Racket',44,6,1,CUBA],
    ['Establish Contact With The FRG',38,7,1,CUBA],
    ['Take Out The Local Police Chief',41,8,1,CUBA],
    ['"Persuade" A Local To Talk',51,41,1,CUBA],
    ['Assault A Snitch\'s Hideout',56,42,1,CUBA],
    ['Transport A Shipment of US Arms',42,9,2,CUBA],
    ['Meet With The FRG Leadership',38,10,2,CUBA],
    ['Hold Up A Tour Bus',45,11,2,CUBA],
    ['Ambush A Military Patrol',51,12,2,CUBA],
    ['Capture An Army Outpost',56,13,2,CUBA],
    ['Sneak A Friend Of The Family Into The Country',35,14,2,CUBA],
    ['Ransack A Local Plantation',43,15,2,CUBA],
    ['Burn Down A Hacienda',58,16,2,CUBA],
    ['Offer "Protection" To A Nightclub',38,17,3,CUBA],
    ['Rob The Banco Nacional Branch',52,18,3,CUBA],
    ['Shake Down A Hotel Owner',40,19,3,CUBA],
    ['Bring The Local Teamsters Under Your Control',46,20,3,CUBA],
    ['Help The FRG Steal A Truckload Of Weapons',51,21,3,CUBA],
    ['Hijack A Booze Shipment',45,22,3,CUBA],
    ['Pillage A Shipyard',52,23,3,CUBA],
    ['Take Over The Docks',60,24,3,CUBA],
    ['Muscle In On A Local Casino',44,25,4,CUBA],
    ['Establish A Loansharking Business',49,26,4,CUBA],
    ['Eliminate A Rival Family\'s Agent',42,27,4,CUBA],
    ['Pass On Some Intel To The FRG',45,28,4,CUBA],
    ['Execute A Regional Arms Dealer',50,29,4,CUBA],
    ['Sink A Competing Smuggler\'s Ship',52,30,4,CUBA],
    ['Gun Down An Enemy Crew At The Airport',56,31,4,CUBA],
    ['Assassinate An Opposing Consigliere',62,32,4,CUBA],
    ['Raid The Arms Depot',53,33,5,CUBA],
    ['Supply The FRG With Some Extra Muscle',46,34,5,CUBA],
    ['Capture The Airport',56,35,5,CUBA],
    ['Knock Off A Visiting Head Of State',52,36,5,CUBA],
    ['Set Up A High Volume Smuggling Operation',55,37,5,CUBA],
    ['Blow Up A Rail Line',50,38,5,CUBA],
    ['Attack The Army Command Post',58,39,5,CUBA],
    ['Storm The Presidential Palace',70,40,5,CUBA],
    ['Arrange A New York Drug Shipment',62,43,6,CUBA],
    ['Launder Money Through A Resort',72,44,6,CUBA],
    ['Loot The National Museum',78,45,6,CUBA],
    ['Send Some Help Home To New York',64,46,6,CUBA],
    ['Take Over The Havana Reconstruction',82,47,6,CUBA],
    ['Help Get An Associate A No Bid Contract',56,48,6,CUBA],
    ['Trans-Ship A Container Full of Refugees',48,49,6,CUBA],
    ['Meet With "The Russian"',58,50,6,CUBA]
  );

  var missionTabs = [];
  missionTabs[NY] = new Array(
    'Street Thug (Levels 1-4)',
    'Associate (Levels 5-8)',
    'Soldier (Levels 9-12)',
    'Enforcer (Levels 13-17)',
    'Hitman (Levels 18-24)',
    'Capo (Levels 25-34)',
    'Consigliere (Levels 35-59)',
    'Underboss (Levels 60-99)',
    'Boss (Levels 100+)'
  );
  missionTabs[CUBA] = new Array(
    'El Soldado (Levels 35-59)',
    'El Capitan (Levels 60-84)',
    'El Jefe (Levels 85-109)',
    'El Patron (Levels 110-129)',
    'El Padrino (Levels 130-150)',
    'El Cacique (Levels 151+)'
  );

  var requirementJob = new Array(
    ['Liquor', 'Distill Some Liquor'],
    ['Tokens', 'Manufacture Tokens'],
    ['Wiretap Device', 'Overtake Phone Central'],
    ['1 Wiretap Device', 'Overtake Phone Central'],
    ['Cards', 'Get Cheating Deck'],
    ['Untraceable Cell Phone', 'Rob an Electronics Store'],
    ['Concealable Camera', 'Rob an Electronics Store'],
    ['Computer Set-Up', 'Rob an Electronics Store'],
    ['Blackmail Photos', 'Obtain Compromising Photos'],
    ['Illegal Transaction Records', 'Steal Bank Records'],
    ['.22 Pistol', 'Beat Up Rival Gangster'],
    ['Revolver', 'Beat Up Rival Gangster'],
    ['9mm Semi-Automatic', 'Rob a Pimp'],
    ['Butterfly Knife', 'Collect Protection Money'],
    ['Brass Knuckles', 'Rough Up Dealers'],
    ['Tactical Shotgun', 'Perform a Hit'],
    ['.45 Revolver', 'Take Out a Rogue Cop'],
    ['C4', 'Destroy Enemy Mob Hideout'],
    ['Stab-Proof Vest', 'Kill a Protected Snitch'],
    ['Automatic Rifle', 'Bust a Made Man Out of Prison'],
    ['Lucky Shamrock Medallion', 'Clip the Irish Mob\'s Local Enforcer'],
    ['Semi-Automatic Shotgun', 'Fight a Haitian Gang'],
    ['Firebomb', 'Steal a Tanker Truck'],
    ['Armored Truck', 'Smuggle Across the Border'],
    ['Grenade Launcher', 'Repel the Yakuza'],
    ['.50 Caliber Rifle', 'Disrupt Rival Smuggling Ring'],
    ['Armored Car', 'Invade Tong-controlled Neighborhood'],
    ['RPG Launcher', 'Sell Guns to the Russian Mob'],
    ['Bodyguards', 'Protect your City against a Rival Family'],
    ['Night Vision Goggles', 'Assassinate a Political Figure'],
    ['Napalm', 'Exterminate a Rival Family'],
    ['Prop plane', 'Steal an Air Freight Delivery'],
    ['Chopper', 'Run a Biker Gang Out of Town'],
    ['Luxury Yacht', 'Influence a Harbor Official'],
    ['GX9', 'Ransom a Businessman\'s Kids'],
    ['Bookie\'s Holdout Pistol', 'Fix the Big Game'],
    ['Multi-Purpose Truck', 'Break Into the Armory'],
    ['BA-12 Assault Rifle', 'Rip Off the Armenian Mob'],
    ['Falsified Documents', 'Take Over an Identity Theft Ring'],
    ['Federal Agent', 'Buy Off a Federal Agent'],
    ['Private Jet', 'Make a Deal with the Mexican Cartel'],
    ['Police Cruiser', 'Blackmail the District Attorney'],
    ['Armoured Limousine', 'Shake Down a City Council Member'],
    ['Cigarette Boat', 'Take Over The Docks'],
    ['TNT', 'Raid The Arms Depot'],
    ['Si-14 Cargo Plane', 'Capture The Airport'],
    ['Armored State Car', 'Storm The Presidential Palace']
  );

  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
  String.prototype.ltrim = function() {
    return this.replace(/^\s+/, '');
  }
  String.prototype.rtrim = function() {
    return this.replace(/\s+$/, '');
  }
  String.prototype.untag = function() {
    return this.replace(/<[^>]*>/g, '');
  }

  Array.prototype.searchArray = function(searchStr, index) {
    // searches a multidimensional array
    // searchStr can be a regex
    var returnArray = false;
    for (var i = 0; i<this.length; i++) {
      if (typeof(searchStr) == 'function') {
        if (searchStr.test(this[i][index])) {
          if (!returnArray) { returnArray = [] }
          returnArray.push(i);
        }
      } else {
        if (this[i][index] === searchStr) {
          if (!returnArray) { returnArray = [] }
          returnArray.push(i);
        }
      }
    }
    return returnArray;
  }

  // Array.unique() - Remove duplicate values
  Array.prototype.unique = function() {
    var a = [];
    var l = this.length;
    for(var i=0; i < l; i++) {
      for(var j = i + 1; j < l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

  // Set the initial run state.
  if (typeof GM_getValue('isRunning') != 'boolean') {
    // FIXME: Perhaps it should be false, and instead pop up an alert
    //        asking the user to check the settings?
    GM_setValue('isRunning', true);
  }
  running = GM_getValue('isRunning');

  // Check for a version change.
  if (GM_getValue('version') != SCRIPT.version ||
      GM_getValue('build') != SCRIPT.build) {
    handleVersionChange();
  }

  // Check for missing settings.
  if (GM_getValue('autoClick') == undefined) {
    saveDefaultSettings();
    addToLog('info Icon', 'If you want to perform jobs, fighting, and other actions automatically, please adjust your settings.');
  }

  var Reload = new Animate();
  Reload.desc = 'reload';
  var Autoplay = new Animate();
  Autoplay.desc = 'auto-play';
  Autoplay.fx = loadHome;

  // This line is optional, but it makes the menu display faster.
  customizeMasthead();

  // Add event listeners.
  setListenContent(true);
  setListenFBNotifications(true);
  setListenAutoSkip(true);

  // Make sure the modification timer goes off at least once.
  setModificationTimer();

  var initialized = true;
  DEBUG('Completed initialize.');
}

function Animate() {
  this.TOUT = null;
  this.desc = '';
  this.fx = null;
  this.delay = null;
}

Animate.prototype.clearTimeout = function() {
  if (this.TOUT) {
    DEBUG('Clearing ' + this.desc + ' timer ' + this.TOUT + '.');
    clearTimeout(this.TOUT);
    this.TOUT = null;
  }
}

Animate.prototype.setTimeout = function(fx, delay) {
  this.clearTimeout();
  this.fx = fx;
  this.delay = delay;
  // Make the handler clear TOUT. This prevents attempts
  // to clear timers that have already gone off.
  var obj = this;
  this.TOUT = window.setTimeout(function () { fx(); obj.TOUT = null; }, delay);
  DEBUG('Started ' + this.desc + ' timer ' + this.TOUT +
        ', delay=' + delay/1000 + ' sec.');
}

Animate.prototype.start = function() {
  if (running && settingsOpen === false) {
    this.setTimeout(this.fx, this.delay);
  } else if(settingsOpen === true) {
    DEBUG('Settings box open. Not starting ' + this.desc + ' timer.');
  } else {
    DEBUG('Autoplayer paused. Not starting ' + this.desc + ' timer.');
  }
}

if (!refreshGlobalStats()) {
  // Handle "try again" error pages.
  var tryAgainElt = document.getElementById('try_again_button');
  if (tryAgainElt) {
    var delay = 10;
    var p = document.createElement('p');
    var wait = function() {
      if (!delay) return tryAgainElt.click();
      p.innerHTML = 'You will automatically try again in ' +
                    delay-- + ' seconds.';
      window.setTimeout(wait, 1000);
    }
    DEBUG('Service interruption: "Try Again" button seen.');
    tryAgainElt.parentNode.appendChild(document.createElement('br'));
    tryAgainElt.parentNode.appendChild(p);
    wait();
    return;
  }

  // Start a timer to reload the page if nothing else happens.
  Autoplay.fx = function() {
    // Unrecognized page.
    if (!document.body) {
      DEBUG('No body. Possible redirect, white out or slow load?');
    } else {
      DEBUG('Can\'t read page. Possible white out?');
    }
    loadHome();
  }
  Autoplay.delay = 10000;
  Autoplay.start();

  // Stop the script. (The timer will still go off and reload.)
  return;
}

// Set up auto-reload (if enabled).
autoReload();

// Accept any waiting invitations.
// FIXME: Make this optional.
if (running && invites > 0) {
  addToLog('process Icon', 'Accepting ' + invites + (invites > 1 ? ' invites.' : ' invite.'));

  // FIXME: Add support for click simulation.
  window.location = 'http://apps.facebook.com/' + SCRIPT.name +
                    SCRIPT.controller + 'recruit' +
                    SCRIPT.action + 'accept' +
                    SCRIPT.user + 'all';
  return;
}

checkLanguage();

refreshSettings();

if (GM_getValue('logOpen') == 'open') {
  showMafiaLogBox();
}
return;
///////////////////////////////////////////////////////////////////////////////
//   End of top-level code. Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////


function doAutoPlay () {
  // Set the default auto-play timer function and delay.
  Autoplay.fx = goHome;
  Autoplay.delay = getAutoPlayDelay();

  var propertyDamage = GM_getValue('propertyDamage', PROP_OK);
  var previouslyIdle = idle;
  idle = false;

  // Auto-heal
  if (running &&
      GM_getValue('autoHeal') == 'checked' &&
      health < GM_getValue('healthLevel', 0) &&
      (health > 19 || autoStamBurnif ||
       GM_getValue('hideInHospital') != 'checked')) {
    autoHeal();
    return;
  }

  // Collect any property income.
  if (running && onPropertyNav()) {
    //FIXME: Assumes English.
    var elt = xpathFirst('.//a[contains(., "Collect take")]', innerPageElt);
    if (elt) {
      // FIXME: Quick fix. Should actually use an "action" to report the
      //        results to the log.
      Autoplay.fx = function() { clickElement(elt) };
      Autoplay.start();
      return;
    }
  }

  // Determine whether a job and/or fight/rob could be attempted.
  var autoMissionif = running && canMission();
  var autoStaminaSpendif = running && !skipStaminaSpend && canSpendStamina();
  var yield = (autoMissionif && energy >= maxEnergy) ||
              (autoStaminaSpendif && stamina >= maxStamina);

  // Auto-repair
  if (running && !yield &&
      GM_getValue('autoRepair') == 'checked' &&
      propertyDamage == PROP_REPAIR) {
    if (autoRepair()) return;
  }

  // Auto-protect
  if (running && !yield &&
      GM_getValue('autoProtect') == 'checked' &&
      propertyDamage == PROP_PROTECT) {
    if (autoProtect()) return;
  }

  // Player updates
  if (running && !yield && GM_getValue('logPlayerUpdates') == 'checked') {
    if (autoPlayerUpdates()) return;
  }

  // Auto-sell for business output.
  if (running && !yield && level >= 35 &&
      GM_getValue('autoSellCrates') == 'checked' &&
      GM_getValue('sellHour', -1) != new Date().getHours()) {
    if (autoSellCrates()) return;
  }

  // Auto-bank
  if (running &&
      city == NY &&
      GM_getValue('autoBank') == 'checked' &&
      cash[NY] >= parseInt(GM_getValue('bankConfig'))) {
    if (autoBankDeposit()) return;
  }
  if (running &&
      city == CUBA &&
      GM_getValue('autoBankCuba') == 'checked' &&
      cash[CUBA] >= parseInt(GM_getValue('bankConfigCuba'))) {
    if (autoBankDeposit()) return;
  }

  // Auto-stat
  if (running && !yield && stats > 0 && GM_getValue('autoStat') == 'checked') {
    if (autoStat()) return;
  }

  // Auto-buy properties
  if (running && !yield && GM_getValue('autoBuy') == 'checked') {
    if (propertyBuy()) return;
  }

  // Auto-lotto
  if (running && !yield && GM_getValue('autoLottoOpt') == 'checked') {
    if (autoLotto()) return;
  }

  // Auto-energypack
  var ptsFromEnergyPack = maxEnergy * 1.25 * getEnergyGainRate();
  var ptsToLevelProjStaminaUse = ptsToNextLevel - stamina*getStaminaGainRate();
  var autoEnergyPackWaiting = running && energyPack &&
                              ptsFromEnergyPack <= ptsToLevelProjStaminaUse &&
                              GM_getValue('autoEnergyPack') == 'checked';
  if (autoEnergyPackWaiting && energy <= 2) {
    //FIXME: Use click simulation instead of a URL.
    var link = 'http://apps.facebook.com/' + SCRIPT.name +
               SCRIPT.controller + 'index' +
               SCRIPT.action + 'use_and_energy_all' +
               SCRIPT.city + (city + 1);
    DEBUG('ptsToNextLevel=' + ptsToNextLevel +
          'ptsToLevelProjStaminaUse=' + ptsToLevelProjStaminaUse);
    addToLog('energyPack Icon', 'This energy pack should give you approximately ' + parseInt(ptsFromEnergyPack) + ' xp of your ' + parseInt(ptsToLevelProjStaminaUse) + ' projected remaining xp.' );
    takeAction(link, 'energypack');
    Autoplay.start();
    return;
  }

  // Do jobs or fight/rob. Give priority to spending stamina if it needs
  // to be burned and using one won't level up. Give priority to jobs if
  // within one stamina of leveling, or if an energy pack is waiting, or
  // if energy is fuller than than stamina (in percentage terms).
  if (autoMissionif &&
      !(autoStaminaSpendif && autoStamBurnif && ptsToNextLevel > 6) &&
      (ptsToNextLevel <= 6 ||
       autoEnergyPackWaiting ||
       energy/maxEnergy >= stamina/maxStamina)) {
    autoMission();
    return;
  }
  if (autoStaminaSpendif) {
    if (autoStaminaSpend()) return;

    // Attempt failed. Let some other action happen before trying again.
    skipStaminaSpend = true;
  }
  if (autoMissionif) {
    autoMission();
    return;
  }

  // Auto-send energy pack
  if (running && GM_getValue('sendEnergyPack') == 'checked') {
    if (autoSendEnergyPack()) return;
  }
  
  // If we reach this point, the script is considered to be idle. Anything the
  // script might do when there is nothing else to do should go below here.
  idle = true;

  // If not previously idle, check the home page.
  if (running && !previouslyIdle) {
    DEBUG('Now idle. Checking the home page.');
    Autoplay.start();
    return;
  }

  // Check for property damage. This way we are not adding any overhead, except
  // on pages that we are not doing anything anyways. All this does is go to
  // the Properties page, which causes the damage to be checked automatically.
  if (running &&
      ((GM_getValue('autoProtect') == 'checked' &&
        propertyDamage < PROP_PROTECT) ||
       (GM_getValue('autoRepair') == 'checked' &&
        propertyDamage < PROP_REPAIR))) {
    // Make sure we're in New York.
    if (city != NY) {
      Autoplay.fx = goNY;
      Autoplay.start();
      return;
    }

    // Go to the property page.
    if (!onPropertyNav()) {
      Autoplay.fx = goPropertyNav;
      Autoplay.start();
      return;
    }
  }

  // Absolutely nothing to do. If fight/rob is being skipped, turn it
  // back on and go to the home page.
  if (skipStaminaSpend) {
    skipStaminaSpend = false;
    Autoplay.start();
    return;
  }
}

// takes a string input in the form of 'MM:SS', 'HH:MM:SS', or 'MM minutes and SS seconds' and returns the number of seconds it represents
function timeLeft(timeToConvert) {
  if (!timeToConvert)
    return 0;

  var returnVal = 0;

  var temp = new Array();
  temp = timeToConvert.split(':');

  if (temp.length == 2)  // MM:SS
    returnVal = ((parseInt(temp[0]) * 60) + parseInt(temp[1]));
  else if (temp.length == 3) // HH:MM:SS
    returnVal = ((parseInt(temp[0]) * 60 * 60) + (parseInt(temp[1]) * 60) + parseInt(temp[2]));
  else if (temp.length == 1) {  // 'HH hours and MM minutes and SS seconds'
    temp = timeToConvert.split(' and ');
    for (i = 0; i < temp.length; i++) {
      spaceIndex = temp[i].indexOf(' ');
      if (spaceIndex != -1) {
        firstPart = temp[i].substring(0, spaceIndex);
        secondPart = temp[i].substring(spaceIndex+1, temp[i].length);
        if ((secondPart == 'minutes') || (secondPart == 'minute'))
          returnVal = returnVal + (parseInt(firstPart) * 60);
        else if ((secondPart == 'seconds') || (secondPart == 'second'))
          returnVal = returnVal + (parseInt(firstPart));
        else if ((secondPart == 'hours') || (secondPart == 'hour'))
          returnVal = returnVal + (parseInt(firstPart * 60 * 60));
      }
    }
  }

  return(returnVal);
}

// reads a date string from a stored GM value and converts it to seconds since 1970
function getTime(GMvalue) {
  var tempVal = GM_getValue(GMvalue, 0);
  var d = Date.parse(tempVal);
  return d/1000;
}

// takes a string input in the form of a countdown 'MM:SS', 'HH:MM:SS', 'MM minutes and SS seconds' and stores the
// time when the countdown is zero in a GM value.  Also takes an input of 'now' and stores the current time.
function setTime(GMvalue, countdownStr) {
  var d = new Date();
  d.setMilliseconds(0);

  if (countdownStr != 'now')
    d.setTime(d.getTime()+(timeLeft(countdownStr)*1000));

  GM_setValue(GMvalue, d.toString());
}

// returns the number of seconds left until a date stored in a GM value
function timeLeftGM(GMvalue) {
  var timeToCompare = getTime(GMvalue);

  var d = new Date();
  d.setMilliseconds(0);

  return (timeToCompare-(d.getTime()/1000));
}

function getAutoPlayDelay() {
  return Math.floor(parseFloat(GM_getValue('d1', '3')) + parseFloat((GM_getValue('d2', '5'))-parseFloat(GM_getValue('d1', '3')))*Math.random())*1000;
}

function autoReload() {
  if (GM_getValue('autoClick') == 'checked') {
    Reload.fx    = loadHome;
    Reload.delay = Math.floor(parseFloat(GM_getValue('r1', '30')) +
                   parseFloat((GM_getValue('r2', '110')) -
                   parseFloat(GM_getValue('r1', '30')))*Math.random())*1000;
    Reload.start();
  }
}

function autoRepair() {
  Autoplay.delay = getAutoPlayDelay();

  // Make sure we're in New York.
  if (city != NY) {
    Autoplay.fx = goNY;
    Autoplay.start();
    return true;
  }

  // Make sure we've got enough cash outside the bank.
  var cost = parseCash(GM_getValue('propertyDamageCost', 0));
  if (cost > cash[city]) {
    return autoBankWithdraw(cost - cash[city]);
  }

  if (!useClickSimulation) {
    var link = 'http://apps.facebook.com/' + SCRIPT.name +
               SCRIPT.controller + 'property' +
               SCRIPT.action + 'repair_all' +
               SCRIPT.city + (city + 1);
    takeAction(link, 'repair', { cost: cost });
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  // Make sure we're on the property page.
  if (!onPropertyNav()) {
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  // Repair the property.
  var elt = xpathFirst('.//a[contains(@onclick, "repair_all")]', innerPageElt);
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t find repair link.');
    return false;
  }
  Autoplay.fx = function() {
    clickAction = 'repair';
    clickContext = { cost : cost };
    clickElement(elt);
  };
  Autoplay.start();
  return true;
}

function autoProtect() {
  Autoplay.delay = getAutoPlayDelay();

  // Make sure we're in New York.
  if (city != NY) {
    Autoplay.fx = goNY;
    Autoplay.start();
    return true;
  }

  // Make sure we've got enough cash outside the bank.
  var cost = parseCash(GM_getValue('propertyDamageCost', 0));
  if (cost > cash[city]) {
    return autoBankWithdraw(cost - cash[city]);
  }

  if (!useClickSimulation) {
    var link = 'http://apps.facebook.com/' + SCRIPT.name +
               SCRIPT.controller + 'property' +
               SCRIPT.action + 'protect_all' +
               SCRIPT.city + (city + 1);
    takeAction(link, 'protect', { cost: cost });
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  // Make sure we're on the property page.
  if (!onPropertyNav()) {
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  // Protect the property.
  var elt = xpathFirst('.//a[contains(@onclick, "protect_all")]', innerPageElt);
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t find protection link.');
    return false;
  }
  Autoplay.fx = function() {
    clickAction = 'protect';
    clickContext = { cost : cost };
    clickElement(elt);
  };
  Autoplay.start();
  return true;
}

function autoSendEnergyPack() {
  if (!timeLeftGM('energyAllTimeLeft'))
    setTime('energyAllTimeLeft','1 hour');
  
  if (timeLeftGM('energyAllTimeLeft')>0)
    return false;
  
  var sendPackButton = xpathFirst('.//div[@class=\'send_all_box\']/a[contains(@onclick, "energy_all_prompt_wgt")]', innerPageElt);
  if (sendPackButton) {
    clickElement(sendPackButton);
    actualSendButton = xpathFirst('.//a[contains(@onclick, "energyall")]');
    if (actualSendButton) {
      clickElement(actualSendButton);
      setTime('energyAllTimeLeft','1 hour');
      addToLog('info Icon','You have sent energy packs to your Mafia.');
      return true;
    }
    else {
      DEBUG('WARNING: Can\'t find inner button to send mafia energy pack');
      return false;
    }
  }

  return false;
}

function autoHeal() {
  // NOTE: In the interest of time, delays are waived.
  Autoplay.delay = 0;

  // Make sure we're in the preferred city.
  var healLocation = GM_getValue('healLocationCuba') == 'checked' ? CUBA : NY;
  if (city != healLocation) {
    Autoplay.fx = function() { goLocation(healLocation); }
    Autoplay.start();
    return;
  }

  if (!useClickSimulation) {
    var link = 'http://apps.facebook.com/' + SCRIPT.name +
               SCRIPT.controller + 'hospital' +
               SCRIPT.action + 'heal' +
               SCRIPT.city + (city + 1);
    takeAction(link, 'heal');
    Autoplay.fx = goHome;
    Autoplay.start();
    return;
  }

  // Use our custom instant-heal element (if present).
  var healElt = document.getElementById('ap_heal');
  if (!healElt) {
    DEBUG('WARNING: Can\'t find instant-heal link.');
    healElt = xpathFirst('//a[contains(@onclick, "action=heal")]');
    if (!healElt) {
      // Go to the hospital.
      var hospitalElt = xpathFirst('//a[@class="heal_link"]');
      if (hospitalElt) {
        Autoplay.fx = function() {
          clickElement(hospitalElt);
          DEBUG('Clicked to go to hospital.');
        };
        Autoplay.start();
      } else {
        addToLog('warning Icon', 'WARNING: Can\'t find hospital link.');
      }
      return;
    }
  }

  // Found a heal link. Click it.
  Autoplay.fx = function() {
    clickAction = 'heal';
    clickElement(healElt);
    DEBUG('Clicked to heal.');
  };
  Autoplay.start();

  return;
}

function autoSellCrates() {
  // Go to the correct city.
  if (city != CUBA) {
    Autoplay.fx = goCuba;
    Autoplay.start();
    return true;
  }

  // Go to the businesses.
  if (!xpathFirst('.//div[@class="business_description"]', innerPageElt)) {
    Autoplay.fx = goBusinessesNav;
    Autoplay.start();
    return true;
  }

  // Sell anything we can.
  elt = xpathFirst('.//a[contains(@onclick, "business=") and contains(@onclick, "action=sell")]', innerPageElt);
  if (elt) {
    Autoplay.fx = function() {
      clickAction = 'sell output';
      clickElement(elt);
      DEBUG('Clicked to sell output.');
    };
    Autoplay.start();
    return true;
  }

  // Nothing to sell.
  GM_setValue('sellHour', new Date().getHours());
  DEBUG('All business output sold. Checking again in an hour.');
  return false;
}

function autoPlayerUpdates() {
  // Get the updates.
  var pUpdates = xpath('.//div[@class="update_item"]', innerPageElt);
  var pUpdatesLen = pUpdates.snapshotLength;
  var logPlayerUpdatesCount = GM_getValue('logPlayerUpdatesCount');
  if (logPlayerUpdatesCount == undefined) {
    // The settings must have been cleared. Assume all updates were read.
    logPlayerUpdatesCount = pUpdatesLen;
    GM_setValue('logPlayerUpdatesCount', logPlayerUpdatesCount);
  }

  // Are there are less updates than we've already seen?
  // FIXME: This could be better. Need to also detect the case where we are
  //        on the home page with zero updates showing and a non-zero count.
  if (pUpdatesLen > 0 && logPlayerUpdatesCount > pUpdatesLen) {
    // The player updates must have been cleared.
    DEBUG('Player updates were unexpectedly cleared.');
    logPlayerUpdatesCount = 0;
    GM_setValue('logPlayerUpdatesCount', 0);
  }

  // Process new updates.
  if (logPlayerUpdatesCount < pUpdatesLen) {
    DEBUG('Parsing new player updates.');
    for (var i = pUpdatesLen - logPlayerUpdatesCount - 1; i >= 0; i--) {
      if (!parsePlayerUpdates(pUpdates.snapshotItem(i))) return true;
      GM_setValue('logPlayerUpdatesCount', ++logPlayerUpdatesCount);
    }
  }

  // Clear the updates.
  if (pUpdatesLen > GM_getValue('logPlayerUpdatesMax', 20) &&
      logPlayerUpdatesCount == pUpdatesLen) {
    Autoplay.fx = goDeleteNews;
    Autoplay.start();
    return true;
  }

  return false;
}

function autoStat() {
  var link = 'http://apps.facebook.com/' + SCRIPT.name +
             SCRIPT.controller + 'stats' +
             SCRIPT.action + 'upgrade' +
             SCRIPT.city + (city + 1);

  if (GM_getValue('autoStatAttack') == 'checked') {
    link += '&upgrade_key=attack';
  } else if (GM_getValue('autoStatDefense') == 'checked') {
    link += '&upgrade_key=defense';
  } else if (GM_getValue('autoStatHealth') == 'checked') {
    link += '&upgrade_key=max_health';
  } else if (GM_getValue('autoStatEnergy') == 'checked') {
    link += '&upgrade_key=max_energy';
  } else if (GM_getValue('autoStatStamina') == 'checked') {
    if (stats < 2) return false;
    link += '&upgrade_key=max_stamina';
  } else {
    addToLog('warning Icon', 'Auto-stat cannot work because a statistic has not been selected in the General tab of the settings menu. Turning auto-stat off.');
    GM_setValue('autoStat', 0);
    return false;
  }
  DEBUG('Stats available.');

  takeAction(link, 'stats');
  Autoplay.start();
  return true;
}

function canMission() {
  if (GM_getValue('autoMission') != 'checked') return false;
  if (energy < calcEnergyCost()) {
    DEBUG('Skipping jobs: energy=' + energy + ', cost=' + calcEnergyCost());
    return false;
  }
  if (energy < maxEnergy && GM_getValue('waitForFull') == 'checked') {
    DEBUG('Skipping jobs: energy=' + energy + '/' + maxEnergy + ', waiting');
    return false;
  }
  return true;
}

function autoMission() {
  var jobno       = missions[GM_getValue('selectMission', 1)][2];
  var tabno       = missions[GM_getValue('selectMission', 1)][3];
  var cityno      = missions[GM_getValue('selectMission', 1)][4];

  // Go to the correct city.
  if (city != cityno) {
    Autoplay.fx = function() { goLocation(cityno); };
    Autoplay.start();
    return;
  }

  // Go to the correct job tab.
  if (!onJobTab(tabno)) {
    Autoplay.fx = function() { goJobTab(tabno); };
    Autoplay.start();
    return;
  }

  // Do the job.
  if (useClickSimulation) {
    Autoplay.fx = function() { goJob(jobno); };
    Autoplay.start();
  } else {
    var link = 'http://apps.facebook.com/' + SCRIPT.name +
               SCRIPT.controller + 'job' +
               SCRIPT.action + 'dojob' +
               SCRIPT.city + (city + 1) +
               '&job=' + jobno +
               '&tab=' + tabno;
    takeAction(link, 'job');
  }
}

function currentJobTab() {
  var elt = xpathFirst('.//ul[contains(@id, "' + SCRIPT.appID + '_jobs_bar")]/li[contains(@class, "tab_on")]//a', innerPageElt);
  if (!elt || !elt.getAttribute('onclick').match(/tab=(\d+)/)) {
    return -1;
  }
  return parseInt(RegExp.$1);
}

function onJobTab(tabno) {
  return currentJobTab() == tabno? true : false;
}

function canSpendStamina(minHealth) {
  if (!stamina) return false;
  if (GM_getValue('staminaSpend') != 'checked') return false;

  if (!minHealth) {
    var how = GM_getValue('staminaSpendHow');
    if (how == STAMINA_HOW_ROB_RANDOM) {
        // Up to 35 damage could be received in a failed rob attempt.
        minHealth = 36;
    } else if (how == STAMINA_HOW_ROB_LIST) {
        // Only up to 15 damage can be received in a successful rob attempt.
        // You didn't add someone that is too strong to your list, did you?
        minHealth = 20;
    } else {
        // Up to 28 damage can be received in a fight.
        minHealth = 29;
    }
  }
  if (health < minHealth) {
    DEBUG('Not spending stamina: health=' + health + ', minimum=' + minHealth);
    return false;
  }

  if (stamina <= staminaFloor && !autoStamBurnif) {
    DEBUG('Not spending stamina: stamina=' + stamina +
          ', floor=' + staminaFloor + ', burn=false');
    return false;
  }

  return true;
}

function autoFight(how) {
  // Go to the correct city.
  var loc = GM_getValue('fightLocation', NY);
  if (city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Get an opponent.
  var id;
  if (how == STAMINA_HOW_FIGHT_LIST) {
    id = parseInt(GM_getValue('fightList', ''));
    if (!id) {
      // The user-specified list is empty or invalid.
      addToLog('warning Icon', 'Can\'t fight because the list of opponents is empty or invalid. Turning automatic fighting off.');
      GM_setValue('staminaSpend', 0);
      return false;
    }
  } else {
    // Check for any new opponents.
    id = findFightOpponent(innerPageElt);

    // For stealth mode fights, if we don't have a new opponent then
    // choose one of the inactive opponents we've already fought.
    if ((!id || id == -1) && GM_getValue('fightStealth') == 'checked') {
      var opponentList = getSavedList('fightListInactive');
      id = opponentList[Math.floor(Math.random() * opponentList.length)];
    }

    if (id == -1) {
      DEBUG('No opponents even after seeing the fight list.');
      return false;
    }

    if (!id) {
      // Go to the fight list to find opponents.
      addToLog('process Icon', 'No opponents. Going to fight list.');
      //FIXME: Temporary fix. Should be using goFightNav instead.
      Autoplay.fx = loadFightNav;
      Autoplay.start();
      return true;
    }
  }
  if (!id) return false;

  // Attack!
  // NOTE: This line isn't needed if using click simulation.
  getDisplayedOpponents.opponents = undefined;
  var link = 'http://apps.facebook.com/' + SCRIPT.name +
             SCRIPT.controller + 'fight' +
             SCRIPT.action + 'attack' +
             SCRIPT.city + (city + 1) +
             '&tmp=' + fightTmp +
             SCRIPT.opponent + id;
  takeAction(link, 'fight', { id: String(id) });

  return true;
}

function autoRob(how) {
  if (city != NY) {
    // Robbing is only supported in New York.
    Autoplay.fx = goNY;
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Get an opponent.
  var id;
  if (how == STAMINA_HOW_ROB_LIST) {
    id = parseInt(GM_getValue('robList', ''));
    if (!id) {
      // The user-specified list is empty or invalid.
      addToLog('warning Icon', 'Can\'t rob because the list of opponents is empty or invalid. Turning automatic robbing off.');
      GM_setValue('staminaSpend', 0);
      return false;
    }
  } else {
    id = findRobOpponent(innerPageElt);
    if (id == -1) {
      addToLog('process Icon', 'No opponents even after seeing the rob list.');
      return false;
    }
    if (!id) {
      // Go to the rob list.
      //addToLog('process Icon', 'No opponents. Going to rob list.');
      Autoplay.fx = goRobTab;
      Autoplay.start();
      return true;
    }
  }
  if (!id) return false;

  // Rob the filthy animal
  DEBUG('Rob the filthy animal ' + id + '.');
  // NOTE: This line isn't needed if using click simulation.
  getDisplayedOpponents.opponents = undefined;
  var link = 'http://apps.facebook.com/'+ SCRIPT.name +
             SCRIPT.controller + 'racket' +
             SCRIPT.action + 'attack' +
             SCRIPT.city + (city + 1) +
             '&tmp=' + fightTmp +
             SCRIPT.opponent + id +
             '&property_id=' + parseInt(GM_getValue('propertyId', ''));
  takeAction(link, 'rob', { id: String(id) });
  setRobOpponentRobbed(id);

  return true;
}

function autoHitman() {
  if (!useClickSimulation) {
    addToLog('warning Icon', 'Hitlist bounty collection cannot work because click simulation is required. Turning off bounty collection.');
    GM_setValue('staminaSpend', 0);
  }

  // Go to the correct city.
  var loc = GM_getValue('hitmanLocation', NY);
  if (city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.start();
    return true;
  }

  // Make sure we're on the hitlist tab.
  if (!onHitlistTab()) {
    Autoplay.fx = goHitlistTab;
    Autoplay.start();
    return true;
  }

  // Get the list of targets.
  var opponents = getHitlist(innerPageElt);
  if (!opponents) return false;

  // Get the targets that are acceptable.
  DEBUG('Applying criteria to displayed targets.');
  var blacklist = getSavedList('hitmanListAvoid').concat(getSavedList('fightListAvoid'));
  var bountyMin = parseCash(GM_getValue('hitmanBountyMin', 0));
  var avoidNames = GM_getValue('hitmanAvoidNames') == 'checked';
  var blacklistCount = 0;
  var bountyCount = 0;
  var namesCount = 0;
  var opponentsQualified = [];
  for (var i = 0; i < opponents.length; i++) {
    var opponent = opponents[i];
    if (blacklist.indexOf(opponent.id) != -1) {
      blacklistCount++;
      continue;
    }
    var bounty = parseCash(opponent.bounty);
    if (bounty && bounty < bountyMin) {
      bountyCount++;
      continue;
    }
    if (avoidNames && isFamily(decodeHTMLEntities(opponent.name))) {
      namesCount++;
      continue;
    }
    opponentsQualified.push(opponent);
  }
  DEBUG(bountyCount + ' disqualified on bounty, ' +
        namesCount + ' on name, ' + blacklistCount + ' on blacklist.');

  if (!opponentsQualified.length) return false;

  // Pick a target and attack immediately.
  Autoplay.fx = function() {
    clickAction = 'hitman';
    clickContext = opponentsQualified[0];
    clickElement(clickContext.attack);
    DEBUG('Clicked to hit ' + clickContext.name +
          ' (' + clickContext.id + ').');
  };
  Autoplay.delay = 0;
  Autoplay.start();
  return true;
}

function autoStaminaSpend() {
  if (GM_getValue('staminaSpend') != 'checked') return false;

  if (staminaFloor &&
      GM_getValue('allowStaminaToLevelUp') == 'checked' &&
      GM_getValue('autoStamBurn') !== autoStamBurnif) {
    GM_setValue('autoStamBurn', autoStamBurnif);
    if (autoStamBurnif) {
      addToLog('process Icon', '<span style="color:#009966; font-weight: bold;">Burning through stamina reserve to level up.</span>');
    } else {
      DEBUG('Not within reach of a level up. Stamina burning is off.');
    }
  }

  var how = GM_getValue('staminaSpendHow');
  switch (GM_getValue('staminaSpendHow')) {
    case STAMINA_HOW_FIGHT_RANDOM:
    case STAMINA_HOW_FIGHT_LIST:
      return autoFight(how);

    case STAMINA_HOW_ROB_RANDOM:
    case STAMINA_HOW_ROB_LIST:
      return autoRob(how);

    case STAMINA_HOW_HITMAN:
      return autoHitman(how);

    default:
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized stamina setting: ' +
               'staminaSpendHow=' + how);
  }

  return false;
}

function autoBankDeposit(amount) {
  // Make sure we're at the bank.
  var formElt = xpathFirst('.//form[@id="' + SCRIPT.appID + '_bank_deposit"]', innerPageElt);
  if (!formElt) {
    Autoplay.fx = goBank;
    Autoplay.start();
    return true;
  }

  // Set the amount (if provided).
  if (amount) {
    var amountElt = xpathFirst('.//input[@type="text"]', formElt);
    if (!amountElt) {
      addToLog('warning Icon', 'BUG DETECTED: No text input at bank.');
      return false;
    }
    amountElt.value = amount;
  }

  // Make the deposit.
  var submitElt = xpathFirst('.//input[@type="submit"]', formElt);
  if (!submitElt) {
    addToLog('warning Icon', 'BUG DETECTED: No submit input at bank.');
    return false;
  }
  Autoplay.fx = function() {
    clickAction = 'deposit';
    submitElt.click();
    DEBUG('Clicked to deposit.');
  }
  Autoplay.start();
  return true;
}

function autoBankWithdraw(amount) {
  // Make sure we're at the bank.
  var formElt = xpathFirst('.//form[@id="' + SCRIPT.appID + '_bank_withdraw"]', innerPageElt);
  if (!formElt) {
    Autoplay.fx = goBank;
    Autoplay.start();
    return true;
  }

  // Set the amount (if provided).
  if (amount) {
    var amountElt = xpathFirst('.//input[@type="text"]', formElt);
    if (!amountElt) {
      addToLog('warning Icon', 'BUG DETECTED: No text input at bank.');
      return false;
    }
    amountElt.value = amount;
  }

  // Make the withdrawal.
  var submitElt = xpathFirst('.//input[@type="submit"]', formElt);
  if (!submitElt) {
    addToLog('warning Icon', 'BUG DETECTED: No submit input at bank.');
    return false;
  }
  Autoplay.fx = function() {
    clickAction = 'withdraw';
    submitElt.click();
    DEBUG('Clicked to withdraw.');
  }
  Autoplay.start();
  return true;
}

function placeBounty () {
  var depositBox = xpathFirst('.//input[@name="amount"]', innerPageElt);
  depositBox.value = GM_getValue('bountyAmount', 10000);
  var sform = xpathFirst('.//input[@type="submit"]', innerPageElt);
  sform.click();
  placeBountyCheck();
}

function placeBountyCheck () {
  if (xpathFirst('.//td[@class="message_body" and contains(text(), "You just set a")]', innerPageElt)) {
    DEBUG('Bounty set successfully.');
  } else {
    DEBUG('Bounty not set.');
  }
}

// Returns a non-empty array of the displayed opponents, or undefined.
function getHitlist(element, forceRefresh) {
  // If the list was already seen, don't read it again.
  if (!forceRefresh && getHitlist.opponents) {
    if (!getHitlist.opponents.length) return;
    return getHitlist.opponents;
  }
  getHitlist.opponents = [];

  // Get each target in the displayed list.
  var rows = $x('.//table[@class="hit_list"]//tr', element);
  for (var i = 0; i < rows.length; i++) {
    // Get the data cells in the row.
    var rowData = rows[i].getElementsByTagName('td');
    if (rowData.length < 5) continue;

    // Get the target's profile and attack links.
    var opponent = {
      attack:  xpathFirst('.//a', rowData[4]),
      payer:   xpathFirst('.//a', rowData[1]),
      profile: xpathFirst('.//a', rowData[0]),
      time:    rowData[3].innerHTML.untag().trim()
    };
    if (!opponent.profile || !opponent.attack) continue;

    // Get the target's id, name, title, and bounty.
    if (opponent.profile.getAttribute('onclick').match(/user=(\w+)/)) {
      opponent.id = RegExp.$1
    }
    opponent.name = opponent.profile.innerHTML;
    if (opponent.profile.previousSibling &&
        opponent.profile.previousSibling.nodeValue.match(/\w+(?: \w+)*/)) {
      opponent.title = RegExp.lastMatch;
    }
    if (rowData[2].innerHTML.match(REGEX_CASH)) {
      opponent.bounty = RegExp.lastMatch;
    }

    getHitlist.opponents.push(opponent);
  }
  DEBUG(getHitlist.opponents.length + ' hitlist target(s) found.');

  if (!getHitlist.opponents.length) return;

  //for (var i = 0; i < getHitlist.opponents.length; i++) {
  //  var opponent = getHitlist.opponents[i];
  //  GM_log('Saw id=' + opponent.id +
  //         ', title=' + opponent.title +
  //         ', name=' + opponent.name +
  //         ', bounty=' + opponent.bounty +
  //         ', time=' + opponent.time);
  //}

  return getHitlist.opponents;
}

// Returns a non-empty array of the displayed opponents, or undefined.
function getDisplayedOpponents(element, forceRefresh) {
  // If the list was already seen, don't read it again.
  if (!forceRefresh && getDisplayedOpponents.opponents) {
    if (!getDisplayedOpponents.opponents.length) return;
    return getDisplayedOpponents.opponents;
  }
  getDisplayedOpponents.opponents = [];
  var fight = !onRobTab();

  // First, look for a traditional fight table (one with real links).
  var links = $x('.//table[@class="main_table fight_table"]//a[contains(@href, "opponent_id") and not(contains(@href, "property"))]', element);

  // Thanks Liquidor for the loop code
  // Get each potential opponent in the displayed list.
  for (var i = 0; i < links.length; i++) {
    var linkElt = links[i];
    var opponent = {};
    var row     = linkElt.parentNode.parentNode;
    var rowData = row.getElementsByTagName('td');
    // We need this for robbing to go to the previous tr that contains the
    // name and level. (In the fight list it is all on one line.)
    if (!fight) {
      var nameAndLevel = row.previousSibling;
      while ( nameAndLevel.nodeType != 1 ) {
        nameAndLevel = nameAndLevel.previousSibling;
      }
    } else {
      nameAndLevel = row;
    }

    // Get the opponent's details.
    opponent.id      = parseInt(linkElt.href.split(SCRIPT.opponent)[1]);
    opponent.profile = nameAndLevel.getElementsByTagName('a')[0];
    if (!opponent.id || !opponent.profile) continue;
    opponent.attack  = linkElt;
    opponent.mafia   = rowData[1] ? parseInt(rowData[1].innerHTML) : 0;
    opponent.level   = parseInt(nameAndLevel.innerHTML.split('Level ')[1]);
    opponent.name    = opponent.profile.innerHTML;
    if (opponent.profile.previousSibling &&
        opponent.profile.previousSibling.nodeValue.match(/\w+(?: \w+)*/)) {
      opponent.title = RegExp.lastMatch;
    }
    if (!opponent.level) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read opponent level.');
      addToLog('warning Icon', 'Row contents: '+ row.innerHTML);
    } else if (!opponent.mafia) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read opponent mafia.');
      addToLog('warning Icon', 'Row contents: '+ row.innerHTML);
    } else {
      getDisplayedOpponents.opponents.push(opponent);
    }
  }

  if (!getDisplayedOpponents.opponents.length) {
    // No traditional list was found. Look for a newer-style list.

    //var ids = unsafeWindow['a10979261223_fight_list_ids'];
    //GM_log('ids=' + ids);

    // Find level elements.
    var levelElts = $x('.//table[@class="main_table fight_table"]//td/span[contains(@id, "' + SCRIPT.appID + '_fight_view_level_")]', element);
    for (var i = 0; i < levelElts.length; i++) {
      var levelElt = levelElts[i];
      if (!levelElt.innerHTML.match(/evel (\d+)/)) continue;

      // Found an opponent.
      var opponent = {};
      opponent.level = parseInt(RegExp.$1);
      var row = levelElt.id.match(/\d+$/);
      var rowElt = levelElt.parentNode.parentNode;
      opponent.profile = xpathFirst('.//*[@id="' + SCRIPT.appID + '_fight_view_namelink_' + row + '"]/a', rowElt);
      if (!opponent.profile) continue;
      opponent.name = opponent.profile.firstChild.innerHTML;
      opponent.title = xpathFirst('.//*[@id="' + SCRIPT.appID + '_fight_view_title_' + row + '"]', rowElt).innerHTML;
      opponent.mafia = parseInt(xpathFirst('.//*[@id="' + SCRIPT.appID + '_fight_view_groupsize_' + row + '"]', rowElt).innerHTML);
      opponent.attack = xpathFirst('.//*[@id="' + SCRIPT.appID + '_fight_view_action_' + row + '"]/a', rowElt);
      getDisplayedOpponents.opponents.push(opponent);
    }
  }

  if (!getDisplayedOpponents.opponents.length) return;

  DEBUG(getDisplayedOpponents.opponents.length + ' opponents listed.');
  //for (var i = 0; i < getDisplayedOpponents.opponents.length; i++) {
  //  var opponent = getDisplayedOpponents.opponents[i];
  //  GM_log('Saw id=' + opponent.id +
  //         ', mafia=' + opponent.mafia +
  //         ', level=' + opponent.level +
  //         ', title=' + opponent.title +
  //         ', name=' + opponent.name);
  //}

  return getDisplayedOpponents.opponents;
}

// Searches the fight table in the subtree of the given element for new
// random targets. Returns a new opponent, or undefined.
function findFightOpponent(element) {
  // Don't bother searching if we still have plenty.
  var newOpponents = getSavedList('fightListNew');
  var len = newOpponents.length;
  if (len >= 50) {
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Check the fight table.
  var opponents = getDisplayedOpponents(element);
  if (!opponents) {
    // No opponents displayed on this page.
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Get the user's criteria for opponents.
  var opponentLevelMax = parseInt(GM_getValue('fightLevelMax', 100));
  var opponentMafiaMax = parseInt(GM_getValue('fightMafiaMax', 501));
  var opponentMafiaMin = parseInt(GM_getValue('fightMafiaMin', 1));
  var avoidNames = GM_getValue('fightAvoidNames') == 'checked';

  // Make any relative adjustments (if enabled).
  if (GM_getValue('fightLevelMaxRelative', false)) {
    opponentLevelMax = opponentLevelMax + level;
  }
  if (GM_getValue('fightMafiaMaxRelative', false)) {
    opponentMafiaMax = opponentMafiaMax + mafia;
  }
  if (GM_getValue('fightMafiaMinRelative', false)) {
    opponentMafiaMin = mafia - opponentMafiaMin;
  }
  if (opponentMafiaMin > 501) {
    opponentMafiaMin = 501;
  }

  // Make a blacklist of opponents.
  var avoidList = getSavedList('fightListAvoid');
  DEBUG('new=' + newOpponents);
  DEBUG('avoid=' + avoidList);
  var blacklist = newOpponents.concat(avoidList);
  if (GM_getValue('fightStealth') == 'checked' || newOpponents.length) {
    var activeList   = getSavedList('fightListActive');
    var inactiveList = getSavedList('fightListInactive');
    blacklist = blacklist.concat(activeList, inactiveList);
    DEBUG('inactive=' + inactiveList);
    DEBUG('active=' + activeList);
  }

  // Figure out which opponents are acceptable.
  DEBUG('Applying criteria to displayed opponents.');
  var levelMaxCount = 0;
  var mafiaMaxCount = 0;
  var mafiaMinCount = 0;
  var namesCount = 0;
  var blacklistCount = 0;
  for (var i = 0; i < opponents.length; i++) {
    var opponent = opponents[i];
    if (opponent.level > opponentLevelMax) {
      levelMaxCount++;
      continue;
    }
    if (opponent.mafia > opponentMafiaMax) {
      mafiaMaxCount++;
      continue;
    }
    if (opponent.mafia < opponentMafiaMin) {
      mafiaMinCount++;
      continue;
    }
    if (avoidNames && isFamily(decodeHTMLEntities(opponent.name))) {
      namesCount++;
      continue;
    }
    if (!opponent.id) continue;

    // This opponent is acceptable. Save the ID (if new).
    var idString = opponent.id.toString();
    if (blacklist.indexOf(idString) != -1) {
      blacklistCount++;
      continue;
    }
    newOpponents.push(idString);
    DEBUG('Found new fight opponent ' + opponent.name + ' (' + idString + ').');
  }
  DEBUG(levelMaxCount + ' disqualified on max level, ' +
        mafiaMaxCount + ' on max mafia, ' +
        mafiaMinCount + ' on min mafia, ' +
        namesCount + ' on name, ' +
        blacklistCount + ' on blacklist.');

  if (!newOpponents.length) return -1;

  if (newOpponents.length > len) {
    setSavedList('fightListNew', newOpponents);
  }

  return newOpponents[Math.floor(Math.random() * newOpponents.length)];
}

// Searches the rob table in the subtree of the given element for new
// random targets. Returns a new opponent, or undefined.
function findRobOpponent(element) {
  // Don't bother searching if we still have plenty.
  var newOpponents = getSavedList('robListNew');
  var len = newOpponents.length;
  if (len >= 50) {
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Check the displayed rob list.
  var opponents = getDisplayedOpponents(element);
  if (!onRobTab() || !opponents) {
    // No opponents displayed on this page.
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Get the user's criteria for opponents.
  var opponentLevelMax = parseInt(GM_getValue('robLevelMax', 100));
  var opponentMafiaMax = parseInt(GM_getValue('robMafiaMax', 501));
  var opponentMafiaMin = parseInt(GM_getValue('robMafiaMin', 1));
  var avoidNames = GM_getValue('robAvoidNames') == 'checked';

  // Make any relative adjustments (if enabled).
  var mafiaForRob = level < mafia? level : mafia;
  if (GM_getValue('robLevelMaxRelative', false)) {
    opponentLevelMax = opponentLevelMax + level;
  }
  if (GM_getValue('robMafiaMaxRelative', false)) {
    opponentMafiaMax = opponentMafiaMax + mafiaForRob;
  }
  if (GM_getValue('robMafiaMinRelative', false)) {
    opponentMafiaMin = mafiaForRob - opponentMafiaMin;
  }
  if (opponentMafiaMin > 501) {
    opponentMafiaMin = 501;
  }

  // Make a blacklist of opponents.
  var avoidList = getSavedList('robListAvoid');
  var robbedList = getSavedList('robListRobbed');
  var blacklist = newOpponents.concat(avoidList, robbedList);
  DEBUG('new=' + newOpponents);
  DEBUG('avoid=' + avoidList);
  DEBUG('robbed=' + robbedList);

  // Figure out which opponents are acceptable.
  DEBUG('Applying criteria to displayed opponents.');
  var levelMaxCount = 0;
  var mafiaMaxCount = 0;
  var mafiaMinCount = 0;
  var namesCount = 0;
  var blacklistCount = 0;
  for (var i = 0; i < opponents.length; i++) {
    var opponent = opponents[i];
    if (opponent.level > opponentLevelMax) {
      levelMaxCount++;
      continue;
    }
    if (opponent.mafia > opponentMafiaMax) {
      mafiaMaxCount++;
      continue;
    }
    if (opponent.mafia < opponentMafiaMin) {
      mafiaMinCount++;
      continue;
    }
    if (avoidNames && isFamily(decodeHTMLEntities(opponent.name))) {
      namesCount++;
      continue;
    }
    if (!opponent.id) continue;

    // This opponent is acceptable. Save the ID (if new).
    var idString = opponent.id.toString();
    if (blacklist.indexOf(idString) != -1) {
      blacklistCount++;
      continue;
    }
    newOpponents.push(idString);
    DEBUG('Found new rob opponent ' + opponent.name + ' (' + idString + ').');
  }
  DEBUG(levelMaxCount + ' disqualified on max level, ' +
        mafiaMaxCount + ' on max mafia, ' +
        mafiaMinCount + ' on min mafia, ' +
        namesCount + ' on name, ' +
        blacklistCount + ' on blacklist.');

  if (!newOpponents.length) return -1;

  if (newOpponents.length > len) {
    setSavedList('robListNew', newOpponents);
  }

  return newOpponents[Math.floor(Math.random() * newOpponents.length)];
}

function setFightOpponentActive(opponent) {
  if (!opponent) return;

  // Add the opponent to the active list.
  DEBUG('Marking opponent ' + opponent + ' active.');
  addSavedListItem('fightListActive', opponent, 10);

  // Remove the opponent from the other fight lists.
  while(removeSavedListItem('fightListInactive', opponent));
  while(removeSavedListItem('fightListNew', opponent));
  while(removeSavedListItem('fightListAvoid', opponent));
}

function setFightOpponentInactive(opponent) {
  if (!opponent) return;

  // Add the opponent to the inactive list.
  DEBUG('Marking opponent ' + opponent + ' inactive.');
  addSavedListItem('fightListInactive', opponent, 10);

  // Remove the opponent from the other fight lists.
  while(removeSavedListItem('fightListActive', opponent));
  while(removeSavedListItem('fightListNew', opponent));
  while(removeSavedListItem('fightListAvoid', opponent));
}

function setRobOpponentRobbed(opponent) {
  if (!opponent) return;

  // Add the opponent to the robbed list.
  DEBUG('Marking rob opponent ' + opponent + ' as robbed.');
  addSavedListItem('robListRobbed', opponent, 10);

  // Remove the opponent from the other rob lists.
  while(removeSavedListItem('robListNew', opponent));
}

function setRobOpponentAvoid(opponent) {
  if (!opponent) return;

  // Add the opponent to the avoid list.
  DEBUG('Marking rob opponent ' + opponent + ' avoid.');
  addSavedListItem('robListAvoid', opponent, 50);

  // Remove the opponent from all other rob lists.
  while(removeSavedListItem('robListNew', opponent));
  // Only remove the first occurence from the user-supplied list.
  removeSavedListItem('robList', opponent);
}

function setHitmanOpponentAvoid(opponent) {
  if (!opponent) return;

  // Add the opponent to the avoid list.
  DEBUG('Marking hitlist opponent ' + opponent + ' avoid.');
  addSavedListItem('hitmanListAvoid', opponent, 100);
}

function setFightOpponentAvoid(opponent) {
  if (!opponent) return;

  // Add the opponent to the avoid list.
  DEBUG('Marking fight opponent ' + opponent + ' avoid.');
  addSavedListItem('fightListAvoid', opponent, 50);

  // Remove the opponent from all other fight lists.
  while(removeSavedListItem('fightListActive', opponent));
  while(removeSavedListItem('fightListInactive', opponent));
  while(removeSavedListItem('fightListNew', opponent));
  // Only remove the first occurence from the user-supplied list.
  removeSavedListItem('fightList', opponent);
}

function toggleSettings() {
  if (settingsOpen === false) {
    // Stop any running timers so the settings box won't disappear.
    Autoplay.clearTimeout();
    Reload.clearTimeout();

    settingsOpen = true;
    createSettingsBox();
    showSettingsBox();
  } else {
    settingsOpen = false;
    //hideSettingsBox();
    destroySettingsBox();

    // Restart the timers.
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload();
  }
}

function toggleStats() {
  if (settingsOpen === true) {
    toggleSettings();
  }
  if (statsOpen === false) {
    statsOpen = true;
    if(!document.getElementById('statsWindow')) {
      createStatWindow();
    }
    showStatsWindow();
    // Stop any running timers so the settings box won't disappear.
    Autoplay.clearTimeout();
    Reload.clearTimeout();
  } else {
    statsOpen = false;
    hideStatsWindow();
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload();
  }
}

function showSettingsBox() {
  var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
  if (settingsBoxContainer) {
    settingsBoxContainer.style.display = 'block';
  }
}

function showMafiaLogBox() {
  if (!document.getElementById('mafiaLogBox')) {
    createLogBox();
  } else {
    var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
    mafiaLogBoxDiv.style.display = 'block';
  }
  if (!debug && GM_getValue('logOpen') != 'open' &&
      GM_getValue('autoLog') != 'checked') {
    alert('Logging is not enabled. To see new activity here, please open your settings and check "Enable logging" in the General tab.');
  }
  GM_setValue('logOpen', 'open');
}

function showStatsWindow() {
  var statsWindowContainer = document.getElementById('sWindowGenDialogPopDialog');
  if (statsWindowContainer) {
    statsWindowContainer.style.display = 'block';
  }
}

function hideSettingsBox() {
  var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
  if (settingsBoxContainer) {
    settingsBoxContainer.style.display = 'none';
  }
}

function destroySettingsBox() {
  var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
  if (settingsBoxContainer) {
    settingsBoxContainer.parentNode.removeChild(settingsBoxContainer);
  }
}

function hideMafiaLogBox() {
  var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
  mafiaLogBoxDiv.style.display = 'none';
  GM_setValue('logOpen', 'closed');
}

function hideStatsWindow() {
  var statsWindowContainer = document.getElementById('sWindowGenDialogPopDialog');
  if (statsWindowContainer) {
    statsWindowContainer.style.display = 'none';
  }
}

function upgradeFightRobTab() {
  // Get the fight/rob tab settings that need to change.
  var autoFightOn = GM_getValue('autoFight') == 'checked';
  var autoRobOn = GM_getValue('autoRob') == 'checked';
  var useFightList = GM_getValue('rFightList') == 'checked';
  var loc = GM_getValue('fightLocationNY') == 'checked'? NY : CUBA;
  var list = GM_getValue('fightList', '');
  var levelMax = parseInt(GM_getValue('fightLevel', 100));
  var mafiaMax = parseInt(GM_getValue('fightmafiaSize', 501));
  var mafiaMin = parseInt(GM_getValue('fightmafiaMinSize', 1));
  var levelMaxRelative = GM_getValue('fightLevelRelative', 0);
  var mafiaMaxRelative = GM_getValue('fightMafiaRelative', 0);
  var mafiaMinRelative = GM_getValue('fightMafiaMinRelative', 0);
  var avoidNames = GM_getValue('clanMember', 0);
  var removeStronger = GM_getValue('fightRemoveStronger', 'checked');

  // Spend stamina automatically?
  if (autoFightOn || autoRobOn) {
    GM_setValue('staminaSpend', 'checked');
  }

  // How?
  if (autoRobOn) {
    if (useFightList) {
      GM_setValue('staminaSpendHow', STAMINA_HOW_ROB_LIST);
    } else {
      GM_setValue('staminaSpendHow', STAMINA_HOW_ROB_RANDOM);
    }
  } else {
    if (useFightList) {
      GM_setValue('staminaSpendHow', STAMINA_HOW_FIGHT_LIST);
    } else {
      GM_setValue('staminaSpendHow', STAMINA_HOW_FIGHT_RANDOM);
    }
  }

  // Other settings
  GM_setValue('fightLocation', loc);
  GM_setValue('fightLevelMax', levelMax);
  GM_setValue('fightLevelMaxRelative', levelMaxRelative);
  GM_setValue('fightMafiaMax', mafiaMax);
  GM_setValue('fightMafiaMaxRelative', mafiaMaxRelative);
  GM_setValue('fightMafiaMin', mafiaMin);
  GM_setValue('fightMafiaMinRelative', mafiaMinRelative);
  GM_setValue('fightAvoidNames', avoidNames);
  GM_setValue('fightList', list);
  GM_setValue('fightRemoveStronger', removeStronger);
  GM_setValue('robLevelMax', levelMax);
  GM_setValue('robLevelMaxRelative', levelMaxRelative);
  GM_setValue('robMafiaMax', mafiaMax);
  GM_setValue('robMafiaMaxRelative', mafiaMaxRelative);
  GM_setValue('robMafiaMin', mafiaMin);
  GM_setValue('robMafiaMinRelative', mafiaMinRelative);
  GM_setValue('robAvoidNames', avoidNames);
  GM_setValue('robList', list);
  GM_setValue('robRemoveStronger', removeStronger);
  GM_setValue('hitmanLocation', loc);
  GM_setValue('hitmanAvoidNames', avoidNames);
}

function handleVersionChange() {
  addToLog('updateGood Icon', 'Now running version ' + SCRIPT.version + ' build ' + SCRIPT.build);
  GM_setValue('version', SCRIPT.version);
  GM_setValue('build', SCRIPT.build);

  // Check for invalid settings and upgrade them.

  // In an old version, the bonus had been up to 15%.
  var val = GM_getValue('selectEnergyBonus');
  if (val > 11) {
    GM_setValue('selectEnergyBonus', 11);
  }

  // In an old version, there was no cap. But it definitely must be under 100,
  // and it probably wouldn't work properly with more than 75.
  var val = parseInt(GM_getValue('logPlayerUpdatesMax', '100'));
  if (isNaN(val) || val > 75) {
    GM_setValue('logPlayerUpdatesMax', '75');
  }

  // Upgrade fight/rob tab (builds 522 and under) to stamina tab settings.
  if (GM_getValue('staminaSpend') == undefined &&
      GM_getValue('autoFight') != undefined) {
    upgradeFightRobTab();
    addToLog('process Icon', 'Upgraded fight/rob tab settings.');
  }
}

function saveDefaultSettings() {
  // Assume all settings have been cleared and set defaults.
  // For groups of radio buttons, one must be checked and all others cleared.
  // For checkboxes, no need to default if the option should be off.

  // General tab.
  GM_setValue('autoClick', 'checked');
  GM_setValue('r1', '30');
  GM_setValue('r2', '110');
  GM_setValue('autoHeal', 'checked');
  GM_setValue('healthLevel', '50');
  GM_setValue('healLocationNY', 'checked');
  GM_setValue('healLocationCuba', 0);
  GM_setValue('bankConfig', '50000');
  GM_setValue('bankConfigCuba', '50000');
  GM_setValue('autoPauseBefore', 'checked');
  GM_setValue('autoPauseAfter', 0);
  GM_setValue('autoPauseExp', '50');
  GM_setValue('autoLog', 'checked');
  GM_setValue('autoLogLength', '300');
  GM_setValue('logPlayerUpdates', 'checked');
  GM_setValue('logPlayerUpdatesMax', '25');
  GM_setValue('autoStat', 0);
  GM_setValue('autoStatAttack', 0);
  GM_setValue('autoStatDefense', 0);
  GM_setValue('autoStatHealth', 0);
  GM_setValue('autoStatEnergy', 'checked');
  GM_setValue('autoStatStamina', 0);
  GM_setValue('d1', '3');
  GM_setValue('d2', '5');

  // Energy tab.
  GM_setValue('estimateJobRatio', '1');

  // Stamina tab.
  GM_setValue('staminaSpendHow', STAMINA_HOW_FIGHT_RANDOM);
  GM_setValue('fightLocation', NY);
  GM_setValue('fightLevelMax', 100);
  GM_setValue('fightMafiaMax', 501);
  GM_setValue('fightMafiaMin', 1);
  GM_setValue('fightStealth', 'checked');
  GM_setValue('fightAvoidBodyguards', 'checked');
  GM_setValue('fightAvoidNames', 'checked');
  GM_setValue('fightRemoveStronger', 'checked');
  GM_setValue('robLevelMax', 100);
  GM_setValue('robMafiaMax', 501);
  GM_setValue('robMafiaMin', 1);
  GM_setValue('robAvoidNames', 'checked');
  GM_setValue('robRemoveStronger', 'checked');
  GM_setValue('hitmanLocation', NY);
  GM_setValue('hitmanAvoidNames', 'checked');
  GM_setValue('clanName', defaultClans.join('\n'));
  GM_setValue('selectStaminaKeep', 10);

  // Property tab.
  GM_setValue('buyMinAmount', '0');

  // Other settings.
  GM_setValue('logOpen', 'open');

  addToLog('process Icon', 'Options reset to defaults.');
}

function helpSettings() {
  // Open the instructions page.
  // FIXME: Would be nice to jump to the relevant section of the instructions
  //        depending on which settings tab is currently active.
  window.open('http://docs.google.com/View?docid=dfwpt84g_21db9g8gcd');
}

function saveSettings() {
/*
  //FIXME: works once then crashes... not good

  // Transfer statLog to graphBox
  if (typeof(GM_getValue('statLog') != 'undefined')) {
    GM_setValue('graphBox', GM_getValue('statLog'));
    GM_deleteValue('statLog');
  }
*/

  // Validate the settings and alert the user if the settings are invalid.
  var logPlayerUpdates = (document.getElementById('logPlayerUpdates').checked === true);
  var logPlayerUpdatesMax = parseInt(document.getElementById('logPlayerUpdatesMax').value);
  if (logPlayerUpdates && (isNaN(logPlayerUpdatesMax) || logPlayerUpdatesMax < 0 || logPlayerUpdatesMax > 75)) {
    alert('The maximum number of player updates must be between 0 and 75.');
    return;
  }
  var autoBankOn      = (document.getElementById('autoBank').checked === true);
  var autoBankCubaOn  = (document.getElementById('autoBankCuba').checked === true);
  var bankConfig      = document.getElementById('bankConfig').value;
  var bankConfigCuba      = document.getElementById('bankConfigCuba').value;
  var bankConfigInt   = parseInt(bankConfig);
  var bankConfigCubaInt   = parseInt(bankConfigCuba);
  if (autoBankOn && (isNaN(bankConfigInt) || bankConfigInt < 1)) {
    alert('Minimum auto-bank amount must be 1 or higher.');
    return;
  }
  if (autoBankCubaOn && (isNaN(bankConfigCubaInt) || bankConfigCubaInt < 1)) {
    alert('Minimum Cuba auto-bank amount must be 1 or higher.');
    return;
  }
  var estimateJobRatio = parseFloat(document.getElementById('estimateJobRatio').value);
  var autoEnergyPackOn = (document.getElementById('autoEnergyPack').checked === true );

  // Validate the estimated job ratio setting.
  if (autoEnergyPackOn) {
    if (isNaN(estimateJobRatio)) {
      alert('Please enter a number between 0 and 3 for your estimated job xp to energy ratio');
      return;
    }
  }

  // Validate the auto-stat setting.
  var autoStatOn = (document.getElementById('autoStat').checked === true);
  var autoStatAttackOn  = (document.getElementById('autoStatAttack').checked === true);
  var autoStatDefenseOn = (document.getElementById('autoStatDefense').checked === true);
  var autoStatHealthOn  = (document.getElementById('autoStatHealth').checked === true);
  var autoStatEnergyOn  = (document.getElementById('autoStatEnergy').checked === true);
  var autoStatStaminaOn = (document.getElementById('autoStatStamina').checked === true);
  if (autoStatOn && !autoStatAttackOn && !autoStatDefenseOn &&
      !autoStatHealthOn && !autoStatEnergyOn && !autoStatStaminaOn) {
      alert('Please select a statistic to use with auto-stat.');
      return;
  }

  // Validate the stamina tab.
  var staminaTabSettings = validateStaminaTab();
  if (!staminaTabSettings) return;
  //var testStaminaTab = function() {
  //  var s = validateStaminaTab();
  //  GM_log('s='+s);
  //  for (var setting in s) {
  //    GM_log(setting + '=' + s[setting]);
  //  }
  //}
  //testStaminaTab();

  //
  // All settings are valid. Save them.
  //
  if (document.getElementById('autoClick').checked === true) {
    GM_setValue('autoClick', 'checked');
  } else {
    GM_setValue('autoClick', 0);
  }

  if (document.getElementById('autoLog').checked === true) {
    GM_setValue('autoLog', 'checked');
  } else {
    GM_setValue('autoLog', 0);
  }

  if (logPlayerUpdates) {
    GM_setValue('logPlayerUpdates', 'checked');
  } else {
    GM_setValue('logPlayerUpdates', 0);
  }

  if (document.getElementById('hideAttacks').checked === true) {
    GM_setValue('hideAttacks', 'checked');
  } else {
    GM_setValue('hideAttacks', 0);
  }

  if (document.getElementById('autoHitlist').checked === true) {
    GM_setValue('autoHitlist', 'checked');
  } else {
    GM_setValue('autoHitlist', 0);
  }

  if (document.getElementById('autoMission').checked === true) {
    GM_setValue('autoMission', 'checked');
  } else {
    GM_setValue('autoMission', 0);
  }

  if (document.getElementById('repeatJob').checked === true) {
    GM_setValue('repeatJob', 'checked');
  } else {
    GM_setValue('repeatJob', 0);
  }

  if (autoBankOn) {
    GM_setValue('autoBank', 'checked');
  } else {
    GM_setValue('autoBank', 0);
  }

  if (autoBankCubaOn) {
    GM_setValue('autoBankCuba', 'checked');
  } else {
    GM_setValue('autoBankCuba', 0);
  }

  if (document.getElementById('autoHeal').checked === true) {
    GM_setValue('autoHeal', 'checked');
  } else {
    GM_setValue('autoHeal', 0);
  }

  if (document.getElementById('hideInHospital').checked === true) {
    GM_setValue('hideInHospital', 'checked');
  } else {
    GM_setValue('hideInHospital', 0);
  }

  if (document.getElementById('healLocationNY').checked === true) {
    GM_setValue('healLocationNY', 'checked');
  } else {
    GM_setValue('healLocationNY', 0);
  }

  if (document.getElementById('healLocationCuba').checked === true) {
    GM_setValue('healLocationCuba', 'checked');
  } else {
    GM_setValue('healLocationCuba', 0);
  }

  GM_setValue('autoStat', autoStatOn? 'checked' : 0);
  GM_setValue('autoStatAttack', autoStatAttackOn? 'checked' : 0);
  GM_setValue('autoStatDefense', autoStatDefenseOn? 'checked' : 0);
  GM_setValue('autoStatHealth', autoStatHealthOn? 'checked' : 0);
  GM_setValue('autoStatEnergy', autoStatEnergyOn? 'checked' : 0);
  GM_setValue('autoStatStamina', autoStatStaminaOn? 'checked' : 0);

//ATK
  if (document.getElementById('hourlyStatsOpt').checked === true) {
    GM_setValue('hourlyStatsOpt', 'checked');
  } else {
    GM_setValue('hourlyStatsOpt', 0);
  }

  if (document.getElementById('autoGiftSkipOpt').checked === true) {
    GM_setValue('autoGiftSkipOpt', 'checked');
  } else {
    GM_setValue('autoGiftSkipOpt', 0);
  }

  var selectProperties = '';
  if (document.getElementById('abandoned').checked === true ) {
    GM_setValue('abandoned', 'checked');
    selectProperties += 'Abandoned Lot';
  } else {
    GM_setValue('abandoned', 0);
  }
  if (document.getElementById('commercial').checked === true ) {
    GM_setValue('commercial', 'checked');
    selectProperties += 'Commercial Block';
  } else {
    GM_setValue('commercial', 0);
  }
  if (document.getElementById('downtown').checked === true ) {
    GM_setValue('downtown', 'checked');
    selectProperties += 'Prime Downtown Lot';
  } else {
    GM_setValue('downtown', 0);
  }
  if (document.getElementById('beachfront').checked === true ) {
    GM_setValue('beachfront', 'checked');
    selectProperties += 'Beachfront Property';
  } else {
    GM_setValue('beachfront', 0);
  }
  if (document.getElementById('mike').checked === true ) {
    GM_setValue('mike', 'checked');
    selectProperties += 'Mafia Mike\'s';
  } else {
    GM_setValue('mike', 0);
  }
  if (document.getElementById('rent').checked === true ) {
    GM_setValue('rent', 'checked');
    selectProperties += 'Rent House';
  } else {
    GM_setValue('rent', 0);
  }
  if (document.getElementById('restaurant').checked === true ) {
    GM_setValue('restaurant', 'checked');
    selectProperties += 'Italian Restaurant';
  } else {
    GM_setValue('restaurant', 0);
  }
  if (document.getElementById('apartment').checked === true ) {
    GM_setValue('apartment', 'checked');
    selectProperties += 'Apartment Complex';
  } else {
    GM_setValue('apartment', 0);
  }
  if (document.getElementById('valu').checked === true ) {
    GM_setValue('valu', 'checked');
    selectProperties += 'Valu-Mart';
  } else {
    GM_setValue('valu', 0);
  }
  if (document.getElementById('tourist').checked === true ) {
    GM_setValue('tourist', 'checked');
    selectProperties += 'Marina Tourist Shops';
  } else {
    GM_setValue('tourist', 0);
  }
  if (document.getElementById('office').checked === true ) {
    GM_setValue('office', 'checked');
    selectProperties += 'Office Building';
  } else {
    GM_setValue('office', 0);
  }
  if (document.getElementById('hotel').checked === true ) {
    GM_setValue('hotel', 'checked');
    selectProperties += '5-Star Hotel';
  } else {
    GM_setValue('hotel', 0);
  }
  if (document.getElementById('casino').checked === true ) {
    GM_setValue('casino', 'checked');
    selectProperties += 'Mega Casino';
  } else {
    GM_setValue('casino', 0);
  }
  GM_setValue('selectProperties', selectProperties);

  if(document.getElementById('autoBuy').checked === true ) {
    GM_setValue('autoBuy', 'checked');
  } else { GM_setValue('autoBuy', 0); }

  if(document.getElementById('autoRepair').checked === true ) {
    GM_setValue('autoRepair', 'checked');
  } else { GM_setValue('autoRepair', 0); }

  if(document.getElementById('autoProtect').checked === true ) {
    GM_setValue('autoProtect', 'checked');
  } else { GM_setValue('autoProtect', 0); }

  if(document.getElementById('autoSellCrates').checked === true ) {
    GM_setValue('autoSellCrates', 'checked');
  } else { GM_setValue('autoSellCrates', 0); }

  if(document.getElementById('autoEnergyPack').checked === true ) {
    GM_setValue('autoEnergyPack', 'checked');
  } else { GM_setValue('autoEnergyPack', 0); }

  GM_setValue('estimateJobRatio', document.getElementById('estimateJobRatio').value);

  if(document.getElementById('hasHelicopter').checked === true ) {
    GM_setValue('hasHelicopter', 'checked');
  } else { GM_setValue('hasHelicopter', 0); }

  if(document.getElementById('hasGoldenThrone').checked === true ) {
    GM_setValue('hasGoldenThrone', 'checked');
  } else { GM_setValue('hasGoldenThrone', 0); }

  if(document.getElementById('isManiac').checked === true ) {
    GM_setValue('isManiac', 'checked');
  } else { GM_setValue('isManiac', 0); }

  if(document.getElementById('sendEnergyPack').checked === true ) {
    GM_setValue('sendEnergyPack', 'checked');
  } else { GM_setValue('sendEnergyPack', 0); }
  
  if(document.getElementById('autoAskJobHelp').checked === true ) {
    GM_setValue('autoAskJobHelp', 'checked');
  } else {
    GM_setValue('autoAskJobHelp', 0);
  }

  if (document.getElementById('autoPause').checked === true) {
    GM_setValue('autoPause', 'checked');
  } else {
    GM_setValue('autoPause', 0);
  }

  if (document.getElementById('autoPauseBefore').checked === true) {
    GM_setValue('autoPauseBefore', 'checked');
    GM_setValue('autoPauselvlExp', lvlExp);
    GM_setValue('autoPauseActivated', false);
  } else {
    GM_setValue('autoPauseBefore', 0);
  }

  if (document.getElementById('autoPauseAfter').checked === true) {
    GM_setValue('autoPauseAfter', 'checked');
    GM_setValue('autoPauselvlExp', lvlExp);
  } else {
    GM_setValue('autoPauseAfter', 0);
  }

  if (document.getElementById('hideAds').checked === true) {
    GM_setValue('hideAds', 'checked');
  } else {
    GM_setValue('hideAds', 0);
  }

  if (document.getElementById('moveEmailBar').checked === true) {
    GM_setValue('moveEmailBar', 'checked');
  } else {
    GM_setValue('moveEmailBar', 0);
  }

  GM_setValue('notificationHandle', document.getElementById('notificationHandle').selectedIndex);

  if (document.getElementById('autoLottoOpt').checked === true) {
    GM_setValue('autoLottoOpt', 'checked');
  } else {
    GM_setValue('autoLottoOpt', 0);
  }

  if (document.getElementById('leftAlign').checked === true) {
    GM_setValue('leftAlign', 'checked');
  } else {
    GM_setValue('leftAlign', 0);
  }

  if (document.getElementById('waitForFull').checked === true) {
    GM_setValue('waitForFull', 'checked');
  } else {
    GM_setValue('waitForFull', 0);
  }

  GM_setValue('selectMission', document.getElementById('selectMission').selectedIndex);
  GM_setValue('bankConfig', bankConfig);
  GM_setValue('bankConfigCuba', bankConfigCuba);
  GM_setValue('r1', document.getElementById('r1').value);
  GM_setValue('r2', document.getElementById('r2').value);
  GM_setValue('d1', document.getElementById('d1').value);
  GM_setValue('d2', document.getElementById('d2').value);
  GM_setValue('propertyId', '12');
  GM_setValue('healthLevel', document.getElementById('healthLevel').value);
  GM_setValue('selectEnergyBonus', document.getElementById('selectEnergyBonus').selectedIndex );
  GM_setValue('selectStaminaKeep', document.getElementById('selectStaminaKeep').selectedIndex );
  GM_setValue('autoPauseExp', document.getElementById('autoPauseExp').value);
  GM_setValue('autoLogLength', document.getElementById('autoLogLength').value);
  GM_setValue('logPlayerUpdatesMax', logPlayerUpdatesMax);
  GM_setValue('bountyAmount', document.getElementById('bountyAmount').value);
  GM_setValue('buyMinAmount', document.getElementById('buyMinAmount').value);
  GM_setValue('autoAskJobHelpMinExp', document.getElementById('autoAskJobHelpMinExp').value);
  GM_setValue('autoAskJobHelpMessage', document.getElementById('autoAskJobHelpMessage').value);

  // Save the stamina tab settings.
  for (var key in staminaTabSettings) {
    //GM_log('Setting GM value \'' + key + '\'=' + staminaTabSettings[key]);
    GM_setValue(key, staminaTabSettings[key]);
  }

  // Clear the job state.
  setSavedList('jobsToDo', []);
  setSavedList('itemList', []);

  // Clear the fight/rob state.
  setSavedList('fightListNew', []);
  fightTmp = '';
  skipStaminaSpend = false;

  toggleSettings();
}

function updateMastheadMenu() {
  var menuElt = document.getElementById('ap_menu');
  if (!menuElt) return;

  var elt = document.getElementById('pauseButton');
  if (running) {
    if (elt) return;

    // Remove the resume button and paused image.
    elt = document.getElementById('resumeButton');
    if (elt) {
      menuElt.removeChild(elt);
    }
    elt = document.getElementById('ap_pause_img');
    if (elt) {
      menuElt.removeChild(elt);
    }

    // Show a pause button.
    elt = makeElement('span', menuElt, {'id':'pauseButton', 'style':'top: 18px'});
    elt.appendChild(document.createTextNode('pause'));
    elt.addEventListener('click', pause, false);
  } else {
    // Remove the pause button.
    if (elt) {
      menuElt.removeChild(elt);
    }

    // Show a resume button and paused image.
    elt = document.getElementById('resumeButton');
    if (elt) return;
    elt = makeElement('span', menuElt, {'id':'resumeButton', 'style':'top: 18px'});
    elt.appendChild(document.createTextNode('resume'));
    elt.addEventListener('click', unPause, false);
    makeElement('div', menuElt, {'id':'ap_pause_img', 'style':'background: transparent url(' + stripURI(pausedMessageImage) + ') no-repeat scroll 20px; position: absolute; top: 0; left: 0; bottom: 0; width: 250px'});
  }
}

function pause() {
  if (GM_getValue('isRunning') === false) {
    // Must have been paused already. Make sure the log is current.
    refreshLog();
  }

  // Update the running state.
  GM_setValue('isRunning', false);
  running = false;

  // Clear all timers.
  Autoplay.clearTimeout();
  Reload.clearTimeout();

  addToLog('pause Icon', 'Autoplayer is paused... (Log & stats do not track manual activity.)');
  updateMastheadMenu();
}

function unPause() {
  if (GM_getValue('isRunning') === true) {
    // Must have been resumed already. Make sure the log is current.
    refreshLog();
  }

  // Update the running state.
  GM_setValue('isRunning', true);
  running = true;

  addToLog('play Icon', 'Autoplayer resuming...');
  updateMastheadMenu();

  // Kick off play.
  Autoplay.fx = goHome;
  Autoplay.delay = 150;
  Autoplay.start();
}

function calcEnergyCost() {
  var cost = missions[GM_getValue('selectMission', 1)][1];
  if (cost > 5) {
    // Adjust for energy bonus.
    cost = Math.floor(cost * (1 - GM_getValue('selectEnergyBonus', 0)/100));
  }
  return cost;
}

function isFamily(username) {
  var patterns = getSavedList('clanName');
  for (var i = 0; i < patterns.length; i++) {
    if (patterns[i] && username.indexOf(patterns[i]) != -1) {
      return true;
    }
  }
  return false;
}

// Converts a link element to an HTML string with an optional CSS class.
function linkToString(link, className) {
  if (!link) return;

  var str = '<a';
  if (className)
    str += ' class="' + className + '"';
  var onclick = link.getAttribute('onclick');
  if (onclick)
    str += ' onclick="' + onclick + '"';
  str += ' href="' + link.href + '">' + link.innerHTML + '</a>';

  return str;
}

function addToLog(icon, line) {
  if (!debug && GM_getValue('autoLog') != 'checked') {
    // Logging is turned off.
    return;
  }

  // Create a datestamp, formatted for the log.
  var currentTime = new Date();
  var m_names = new Array('Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec');
  var timestampdate = m_names[currentTime.getMonth()] + ' ' + currentTime.getDate();

  // Create a timestamp, formatted for the log.
  var hours = currentTime.getHours();
  if (hours >= 12) {
    hours = hours - 12;
    var ampm = ' PM';
  } else {
    var ampm = ' AM';
  }
  if (hours == 0) {
    hours = 12;
  }
  var timestamptime = hours + ':' +
    (currentTime.getMinutes() < 10 ? 0 : '') +
    currentTime.getMinutes() + ':' +
    (currentTime.getSeconds() < 10 ? 0 : '') +
    currentTime.getSeconds() +
    ampm;

  // Get a log box to work with.
  var logBox = document.getElementById('logBox');
  if (!logBox) {
    if (!addToLog.logBox) {
      // There's no log box, so create one.
      addToLog.logBox = document.createElement('div');
      addToLog.logBox.innerHTML = GM_getValue('itemLog', '');
    }
    logBox = addToLog.logBox;
  }

  // Add the new log entry.
  var lineToAdd = document.createElement('div');
  lineToAdd.className = 'logEvent ' + icon;
  lineToAdd.innerHTML = '<div class="eventTime">' + timestampdate + '<br/>' + timestamptime + '</div><div class="eventBody">' + line + '</div><div class="clear"></div>';
  logBox.insertBefore(lineToAdd, logBox.firstChild);

  // If the log is too large, trim it down.
  var logLen = logBox.childNodes.length;
  var logMax = parseInt(GM_getValue('autoLogLength', 300));
  //GM_log('logLen=' + logLen + ', logMax=' + logMax);
  if (logMax > 0) {
    while (logLen-- > logMax) {
      logBox.removeChild(logBox.lastChild);
    }
  }

  // Save the log.
  GM_setValue('itemLog', logBox.innerHTML);
}


function updateLogStats() {
  var fightCount = document.getElementById('fightCount');
  if (!fightCount) return;
    fightCount.firstChild.nodeValue = makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0));

  document.getElementById('fightWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('fightWinCountInt', 0));

  var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('fightWinPct').firstChild.nodeValue =  (isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%';

  document.getElementById('fightLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('fightLossCountInt', 0));

  var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1)
    document.getElementById('fightLossPct').firstChild.nodeValue =  (isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%';

  document.getElementById('robCount').firstChild.nodeValue = makeCommaValue(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0));

  document.getElementById('robWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('robWinCountInt', 0));

  var robWinPct = (GM_getValue('robWinCountInt', 0)/(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('robWinPct').firstChild.nodeValue =  (isNaN(robWinPct)) ? '0.0%' : robWinPct + '%';

  document.getElementById('robLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('robLossCountInt', 0));

  var robLossPct = (GM_getValue('robLossCountInt', 0)/(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('robLossPct').firstChild.nodeValue =  (isNaN(robLossPct)) ? '0.0%' : robLossPct + '%';

  document.getElementById('totalWinDollars').firstChild.nodeValue = '$' + makeCommaValue(GM_getValue('totalWinDollarsInt', 0));  //Accomodates up to $999,999,999,999

  document.getElementById('totalLossDollars').firstChild.nodeValue = '$' + makeCommaValue(GM_getValue('totalLossDollarsInt', 0));

  document.getElementById('totalExp').firstChild.nodeValue = makeCommaValue(GM_getValue('totalExpInt', 0));

  var rate = getStaminaGainRate();
  document.getElementById('expRate').firstChild.nodeValue = rate.toFixed(2);

  document.getElementById('expToNext').firstChild.nodeValue = makeCommaValue(ptsToNextLevel);

  document.getElementById('stamToNext').firstChild.nodeValue = rate? (ptsToNextLevel / rate).toFixed(0): 'n/a';
}

function debugOnOff() {
  var debugElt = document.getElementById('ap_debug_log');
  if (GM_getValue('enableDebug') == 'checked') {
    addToLog('info Icon', 'Debug logging disabled.');
    GM_setValue('enableDebug', 0);
    debug = false;
    if (GM_getValue('logOpen') != 'open') {
      alert('Debug logging disabled.');
    } else if (debugElt) {
      debugElt.style.display = 'none';
    }
  } else {
    GM_setValue('enableDebug', 'checked');
    debug = true;
    showMafiaLogBox();
    addToLog('info Icon', 'Debug logging enabled.');
    if (debugElt) {
      debugElt.style.display = 'block';
    }
    debugDumpSettings();
    checkLanguage();
  }
}

function DEBUG(line, level) {
  var level = (level == null) ? 0 : level;
  if (debug) {
    addToLog('info Icon', line);
    GM_log(line, level);
  }
}

// Parse a monetary value such as "C$50,000" and return an integer.
function parseCash(cash) {
  var c = cash;
  if (typeof(c) == 'string') {
    c = c.trim().replace(/[C$,]/g, '');
  }
  return parseInt(c);
}

function makeCommaValue(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

function showIfUnchecked(setting) {
  if (setting == '0') {
    setting = 'unchecked';
  }
  return setting;
}

function showIfSelected(setting) {
  if (setting == '0') {
    setting = 'not selected';
  } else {
    setting = 'selected';
  }
  return setting;
}

function showIfRelative(key) {
  return GM_getValue(key) == 'checked'? 'relative' : 'absolute';
}

// Save an array of strings. The strings must not contain "\n".
function setSavedList(listName, list) {
  GM_setValue(listName, list.join('\n'));
}

// Get an array of strings that was saved with setSavedList().
function getSavedList(listName) {
  var savedList = GM_getValue(listName, '');
  return savedList? savedList.split('\n') : [];
}

// Add an item to a list saved with setSavedList().
// If the size of the list is greater than the "max"
// parameter, the first item in the list is removed.
function addSavedListItem(listName, item, max) {
  var savedList = getSavedList(listName);

  // Only add if it isn't already there.
  if (savedList.indexOf(item) != -1) {
    return;
  }

  savedList.push(item);
  if (max > 0) {
    while (max < savedList.length) {
      var item = savedList.shift();
      DEBUG('Removing ' + item + ' from ' + listName + '.');
    }
  }
  setSavedList(listName, savedList);
}

// Remove an item from a list saved with setSavedList().
function removeSavedListItem(listName, item) {
  var savedList = getSavedList(listName);
  var idx = savedList.indexOf(item);
  if (idx != -1) {
    savedList.splice(idx, 1);
    setSavedList(listName, savedList);
    return true;
  }
  // No matches.
  return false;
}

function cycleSavedList(listName) {
  // Move the first item to the end of the list.
  var opponents = GM_getValue(listName, '').split('\n');
  var first = opponents.shift();
  if (first) {
    opponents.push(first);
  }
  GM_setValue(listName, opponents.join('\n'));
}

function CyclePropertyList() {
  DEBUG('CyclePropertyList(): '+ GM_getValue('propertyId', ''));
  if (GM_getValue('propertyId') <= 6) {
    CycleRobList();
    var i = 12; //back to casinos
  } else {
    var i = GM_getValue('propertyId') - 1;
  }
  GM_setValue('propertyId', i);
}

function refreshLog() {
  var logBox = document.getElementById('logBox');
  if (logBox) {
    logBox.innerHTML = GM_getValue('itemLog', '');
  }
}

function clearLog() {
  GM_setValue('itemLog', '');

  //reset the log box
  var logBox = document.getElementById('logBox');
    logBox.innerHTML = '';
}

function clearStats() {
  //reset log statistics
  GM_setValue('fightWinCountInt', 0);

  GM_setValue('fightLossCountInt', 0);

  GM_setValue('robWinCountInt', 0);

  GM_setValue('robLossCountInt', 0);

  GM_setValue('totalExpInt', 0);

  GM_setValue('totalWinDollarsInt', 0);

  GM_setValue('totalLossDollarsInt', 0);

  GM_setValue('lastHitXp', 0);
  GM_setValue('totalHits', 0);
  GM_setValue('totalXp', 0);
  GM_setValue('currentHitXp', 0);

  //ATK
  //New tracking stats for NY
  GM_setValue('hourlyStats', '0');
  GM_setValue('fightExpNY', 0);          //Number of exper. points earned from fights in NY
  GM_setValue('fightWinsNY', 0);         //Count of fights won in NY
  GM_setValue('fightWin$NY', 0);         //$ won from fights in NY
  GM_setValue('fightLossesNY', 0);       //Count of fights lost in NY
  GM_setValue('fightLoss$NY', 0);        //$ lost from fights in NY
  GM_setValue('fightLossBGCHNY', 0);     //NY Bodyguard Critical Hit losses
  GM_setValue('fightLossBGCH$NY', 0);    //NY$ lost by Bodyguard Critical Hit
  GM_setValue('fightLossCHNY', 0);       //NY Critical Hit fight losses
  GM_setValue('fightLossCH$NY', 0);      //$ lost from Critical Hit in NY fights
  GM_setValue('fightLossStrongNY', 0);   //Too Strong loss type count from NY fights
  GM_setValue('fightLossStrong$NY', 0);  //$ lost from Too Strong in NY fights
  //New tracking stats for Cuba
  GM_setValue('fightExpCuba', 0);        //Number of exper. points earned from fights in Cuba
  GM_setValue('fightWinsCuba', 0);       //Count of fights won in Cuba
  GM_setValue('fightWin$Cuba', 0);       //Cuban pesos won from fights
  GM_setValue('fightLossesCuba', 0);     //Count of fights lost in Cuba
  GM_setValue('fightLoss$Cuba', 0);      //Cuban pesos lost from fights
  GM_setValue('fightLossBGCHCuba', 0);   //Bodyguard Critical Hit loss type count from Cuba fights
  GM_setValue('fightLossBGCH$Cuba', 0);  //$ lost from Bodyguard Critical Hit in Cuba fights
  GM_setValue('fightLossCHCuba', 0);     //Critical Hit loss type count from Cuba fights
  GM_setValue('fightLossCH$Cuba', 0);    //$ lost from Critical Hit in Cuba fights
  GM_setValue('fightLossStrongCuba', 0); //Too Strong loss type count from Cuba fights
  GM_setValue('fightLossStrong$Cuba', 0);//$ lost from Too Strong in Cuba fights

  updateLogStats();
}

function clearHitlistArray () {
  GM_setValue('onHitlist', 0);
}

function clearHitStats () {
  GM_setValue('lastHitXp', 0);
  GM_setValue('totalHits', 0);
  GM_setValue('totalXp', 0);
  GM_setValue('currentHitXp', 0);
}

function minBankCheck() {
  // Don't allow zero value in autobank setting.
  var amount = parseInt(document.getElementById('bankConfig').value);
  if (isNaN(amount) || amount < 1) {
    alert('Minimum auto-bank amount must be 1 or higher');
    document.getElementById('bankConfig').focus();
  }

  var amountCuba = parseInt(document.getElementById('bankConfigCuba').value);
  if (isNaN(amountCuba) || amountCuba < 1) {
    alert('Minimum Cuba auto-bank amount must be 1 or higher');
    document.getElementById('bankConfigCuba').focus();
  }
}

function takeAction(link, action, context) {
  if (!link) {
    addToLog('warning Icon', 'BUG DETECTED: No link passed to takeAction().');
    return;
  }

  DEBUG('Action set to: ' + action);
  GM_xmlhttpRequest({ method: 'GET',
    url: link,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    onload: function(responseDetails) { handleResponse(responseDetails, action, context); },
    onerror: function(responseDetails) { addToLog('warning Icon', 'error status '+ responseDetails.status); }
  });
}

function createLogBox() {
  // Define CSS styles.
  makeElement('style', document.getElementsByTagName('head')[0], {'type':'text/css'}).appendChild(document.createTextNode(
    '#mafiaLogBox div.mouseunderline:hover{text-decoration:underline}' +
    '#mafiaLogBox .logEvent{border-bottom:1px solid #333; padding:4px 0px}' +
    '#mafiaLogBox .eventTime{color:#888; font-size: 11px; width:75px;  float:left}' +
    '#mafiaLogBox .eventBody{width:315px; float:right}' +
    '#mafiaLogBox .eventTime,#mafiaLogBox .eventIcon,#mafiaLogBox .eventBody{}' +
    '#mafiaLogBox .eventBody .good {color:#52E259;font-weight:bold;}' +
    '#mafiaLogBox .eventBody .bad {color:#EC2D2D;font-weight:bold;}' +
    '#mafiaLogBox .eventBody .warn {color:#EC2D2D;}' +
    '#mafiaLogBox .eventBody .money {color:#00CC00;font-weight:bold;}' +
    '#mafiaLogBox .eventBody .expense {color:#FFD927;}' +
    '#mafiaLogBox .eventBody .loot {color:#FF6633;}' +
    '#mafiaLogBox .eventBody .user {color:#FFD927;}' +
    '#mafiaLogBox .eventBody .attacker {color:#EC2D2D;}' +
    '#mafiaLogBox .eventBody .job {color:#52E259;font-weight:bold;}' +
    '#mafiaLogBox .clear{clear:both}' +
    '#mafiaLogBox .logEvent.Icon{background-repeat: no-repeat; background-position: 75px}' +
    '#mafiaLogBox .logEvent.process.Icon{background-image:url(' + stripURI(processIcon) + ')}' +
    '#mafiaLogBox .logEvent.search.Icon{background-image:url(' + stripURI(searchIcon) + ')}' +
    '#mafiaLogBox .logEvent.warning.Icon{background-image:url(' + stripURI(warningIcon) + ')}' +
    '#mafiaLogBox .logEvent.info.Icon{background-image:url(' + stripURI(infoIcon) + ')}' +
    '#mafiaLogBox .logEvent.lootbag.Icon{background-image:url(' + stripURI(lootbagIcon) + ')}' +
    '#mafiaLogBox .logEvent.found.Icon{background-image:url(' + stripURI(lootbagIcon) + ')}' +
    '#mafiaLogBox .logEvent.updateGood.Icon{background-image:url(' + stripURI(updateGoodIcon) + ')}' +
    '#mafiaLogBox .logEvent.updateBad.Icon{background-image:url(' + stripURI(updateBadIcon) + ')}' +
    '#mafiaLogBox .logEvent.pause.Icon{background-image:url(' + stripURI(pauseIcon) + ')}' +
    '#mafiaLogBox .logEvent.play.Icon{background-image:url(' + stripURI(playIcon) + ')}' +
    '#mafiaLogBox .logEvent.good.Icon{background-image:url(' + stripURI(goodIcon) + ')}' +
    '#mafiaLogBox .logEvent.bad.Icon{background-image:url(' + stripURI(badIcon) + ')}' +
    '#mafiaLogBox .logEvent.experience.Icon{background-image:url(' + stripURI(experienceIcon) + ')}' +
    '#mafiaLogBox .logEvent.experience.Icon{background-image:url(' + stripURI(experienceIcon) + ')}' +
    '#mafiaLogBox .logEvent.health.Icon{background-image:url(' + stripURI(healthIcon) + ')}' +
    '#mafiaLogBox .logEvent.cash.Icon{background-image:url(' + stripURI(cashIcon) + ')}' +
    '#mafiaLogBox .logEvent.cashCuba.Icon{background-image:url(' + stripURI(cashCubaIcon) + ')}' +
    '#mafiaLogBox .logEvent.energyPack.Icon{background-image:url(' + stripURI(energyPackIcon) + ')}'
  ));


  var mafiaLogBox = makeElement('div', document.body, {'id':'mafiaLogBox', 'style':'position: fixed; right: 5px; top: 30px; bottom: 30px; width: 427px; background: black url(http://mwdirectfb3.static.zynga.com/mwfb/graphics/MW_FB_Background_760.gif); text-align: left; padding: 5px; border: 1px solid; border-color: #FFFFFF; z-index: 98; font-size: 10pt;'});

  var logClrButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; left: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    logClrButton.appendChild(document.createTextNode('clear log'));
    logClrButton.addEventListener('click', clearLog, false);

  var logClrStatsButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; left: 85px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    logClrStatsButton.appendChild(document.createTextNode('clear stats'));
    logClrStatsButton.addEventListener('click', clearStats, false);

  var closeLogButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; right: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    closeLogButton.appendChild(document.createTextNode('close'));
    closeLogButton.addEventListener('click', hideMafiaLogBox, false);

  var debugElt = makeElement('div', mafiaLogBox, {'id':'ap_debug_log', 'style':'display: none; position: absolute; left: 180px; top: 0px; font-weight: 600;color: rgb(255, 0, 0);'});
  debugElt.appendChild(document.createTextNode('Debug Log'));
  if (debug) {
    debugElt.style.display = 'block';
  }

  var logBox = makeElement('div', mafiaLogBox, {'id':'logBox', 'style':'position: absolute; overflow: auto; right: 0px; top: 20px; bottom: 68px; width: 425px; background-color: #111111; font-size:11px; color: #BCD2EA; text-align: left; padding: 5px; border: 1px solid;'});
    logBox.innerHTML = GM_getValue('itemLog', '');

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fights:'));

  makeElement('div', mafiaLogBox, {'id':'fightCount', 'style':'position: absolute; right: 335px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0))));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Won:'));

  makeElement('div', mafiaLogBox, {'id':'fightWinCount', 'style':'position: absolute; right: 335px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0))));

  var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'fightWinPct', 'style':'position: absolute; right: 280px; bottom: 18px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; bottom: 3px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Lost:'));

  makeElement('div', mafiaLogBox, {'id':'fightLossCount', 'style':'position: absolute; right: 335px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightLossCountInt', 0))));

  var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'fightLossPct', 'style':'position: absolute; right: 280px; bottom: 3px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 165px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Robs:'));

  makeElement('div', mafiaLogBox, {'id':'robCount', 'style':'position: absolute; right: 185px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue((GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)))));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 165px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Succ:'));

  makeElement('div', mafiaLogBox, {'id':'robWinCount', 'style':'position: absolute; right: 185px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('robWinCountInt', 0))));

  var robWinPct = (GM_getValue('robWinCountInt', 0)/(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'robWinPct', 'style':'position: absolute; right: 130px; bottom: 18px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(robWinPct)) ? '0.0%' : robWinPct + '%'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 165px; bottom: 3px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fail:'));

  makeElement('div', mafiaLogBox, {'id':'robLossCount', 'style':'position: absolute; right: 185px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('robLossCountInt', 0))));

  var robLossPct = (GM_getValue('robLossCountInt', 0)/(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'robLossPct', 'style':'position: absolute; right: 130px; bottom: 3px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(robLossPct)) ? '0.0%' : robLossPct + '%'));

  makeElement('div', mafiaLogBox, {'id':'totalWinDollars', 'style':'position: absolute; right: 5px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode('$' + makeCommaValue(GM_getValue('totalWinDollarsInt', 0))));  //Accomodates up to $999,999,999,999

  makeElement('div', mafiaLogBox, {'id':'totalLossDollars', 'style':'position: absolute; right: 5px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode('$' + makeCommaValue(GM_getValue('totalLossDollarsInt', 0))));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; bottom: 50px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Exp Gained:'));

  makeElement('div', mafiaLogBox, {'id':'totalExp', 'style':'position: absolute; right: 329px; bottom: 50px; font-size: 11px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('totalExpInt', 0))));

  makeElement('hr', mafiaLogBox, {'style':'position: absolute; left: 0; bottom: 42px; height: 1px; border: 0px; width: 90%; margin-left: 5%; color: #666666; background-color: #666666'});

  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 5px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Total $ Won/Lost'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 267px; bottom: 50px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Gain Rate:'));

  var rate = getStaminaGainRate();
  makeElement('div', mafiaLogBox, {'id':'expRate', 'style':'position: absolute; right: 240px; bottom: 50px; font-size: 11px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(rate.toFixed(2)));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 175px; bottom: 50px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Nxt Lvl In:'));

  makeElement('div', mafiaLogBox, {'id':'expToNext', 'style':'position: absolute; right: 141px; bottom: 50px; font-size: 11px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(makeCommaValue(ptsToNextLevel)));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 36px; bottom: 50px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Stam Req\'d to Lvl:'));

  makeElement('div', mafiaLogBox, {'id':'stamToNext', 'style':'position: absolute; right: 2px; bottom: 50px; font-size: 11px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(rate? (ptsToNextLevel / rate).toFixed(0) : 'n/a'));
}

function createSettingsBox() {
  if (document.getElementById('settingsBox')) return;

  if (!document.getElementById('ap_settings_css')) {
    makeElement('style', document.getElementsByTagName('head')[0], {'id':'ap_settings_css', 'type':'text/css'}).appendChild(document.createTextNode(
      '#settingsBox #tabNav div{border-right:1px solid #000;float:left;padding:0 7px;position:static;text-align:center}' +
      '#settingsBox #tabNav div.selected{background-image:url(' + stripURI(tabSelectedImage) + ')}' +
      '#settingsBox #tabNav div a{color:#fff;font-weight:700}' +
      '#settingsBox .sexy_button{position:absolute;background-image:url(' + stripURI(redBgImage) + ');border:1px solid #FFD927;color:#FFD927;cursor:pointer;display:block;float:left;font-size:14px;font-weight:700;padding:5px;text-decoration:none;width:auto}' +
      '#settingsBox .sexy_button button{background:transparent;border:medium none #FFF;color:#FFD927;cursor:pointer;font-size:14px;font-weight:700;margin:0}' +
      '#settingsBox .sexy_button button:hover{color:#BCD2EA;font-weight:700;text-decoration:none}' +
      '#settingsBox .tabcontent{display:none;height:420px;top:110px;width:600px}' +
      '#settingsBox div,#settingsBox select,#settingsBox textarea{position:absolute}' +
      '#settingsBox label {font-weight: normal; color: #BCD2EA}' +
      '#settingsBox #staminaTab div {position: static;}' +
      '#settingsBox #staminaTab select {position: static;}' +
      '#settingsBox #staminaTab textarea {position: static;}' +
      '#settingsBox #staminaTab input {position: static; margin: 0;}' +
      '#settingsBox #staminaTab .lhs {position: static; width: 40%; float: left; text-align: right; padding: 5px;}' +
      '#settingsBox #staminaTab .rhs {position: static; float: left; padding: 5px;}' +
      '#settingsBox #staminaTab .single {position: static; text-align: center}' +
      '#settingsBox #staminaTab .hide {clear: both; visibility: hidden;}'
    ));
  }

  // This creates the settings box just like a facebook popup
  var elt = makeElement('div', document.body, {'class':'generic_dialog pop_dialog', 'id':'GenDialogPopDialog'});
  elt = makeElement('div', elt, {'class':'generic_dialog_popup', 'style':'top: 30px; width: 620px;'});
  elt = makeElement('div', elt, {'class':'pop_content popcontent_advanced', 'id':'pop_content'});
  var settingsBox = makeElement('div', elt, {'style':'position: relative; width: 600px; height: 580px; font-size: 14px; color: #BCD2EA; background: black no-repeat scroll 0 110px', 'id':'settingsBox'});
  //End settings box

  var settingsBoxTopBG = makeElement('div', settingsBox, {'style':'background: black; position: static; height: 80px;'});

    var settingsBoxTitle = makeElement('div', settingsBoxTopBG, {'style':'font-size: 18px; font-weight: bold;'});
    makeElement('img', settingsBoxTopBG, {'src':stripURI(mwapLogo), 'style':'position: absolute; top: 0px; left: 0px;'});
    makeElement('img', settingsBoxTopBG, {'src':stripURI(closeButtonIcon), 'style':'position: absolute; top: 0px; right: 0px; cursor: pointer;'}).addEventListener('click', toggleSettings, false);


  // NOTE: Use the 1st line below to center the button bar, or the 2nd line
  //       to put the bar on the left side.
  //elt = makeElement('div', settingsBox, {'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; text-align: center'});
  elt = makeElement('div', settingsBox, {'style':'position: static; width: 100%; text-align: left'});

  var tabNav = makeElement('div', elt, {'id':'tabNav', 'style':'position: static; display: inline-block; background: transparent url(' + stripURI(redBgImage) + ') repeat-x scroll 0 0; border: 1px solid #FFFFFF; fontsize: 13px; line-height: 28px; height: 30px;'});
    var generalTabLink = makeElement('div', tabNav, {'class':'selected'});
      makeElement('a', generalTabLink, {'href':'#', 'rel':'generalTab'}).appendChild(document.createTextNode('General'));
    var energyTabLink = makeElement('div', tabNav);
      makeElement('a', energyTabLink, {'href':'#', 'rel':'energyTab'}).appendChild(document.createTextNode('Energy'));
    var staminaTabLink = makeElement('div', tabNav);
      makeElement('a', staminaTabLink, {'href':'#', 'rel':'staminaTab'}).appendChild(document.createTextNode('Stamina'));
    var hitlistTabLink = makeElement('div', tabNav);
      makeElement('a', hitlistTabLink, {'href':'#', 'rel':'hitlistTab'}).appendChild(document.createTextNode('Hitlist'));
    var propertyTabLink = makeElement('div', tabNav);
      makeElement('a', propertyTabLink, {'href':'#', 'rel':'propertyTab'}).appendChild(document.createTextNode('Property'));
    var aboutTabLink = makeElement('div', tabNav);
      makeElement('a', aboutTabLink, {'href':'#', 'rel':'aboutTab'}).appendChild(document.createTextNode('About'));

  var generalTab = makeElement('div', settingsBox, {'id':'generalTab', 'class':'tabcontent'});

  var autoClick = makeElement('div', generalTab, {'style':'top: 25px;'});
  makeElement('input', autoClick, {'type':'checkbox', 'id':'autoClick', 'value':'checked'}, 'autoClick', 'checked');
  autoClick.appendChild(document.createTextNode('Enable auto-refresh '));
  makeElement('img', autoClick, {'style':'position: absolute; top: 5px; left: 200px', 'src':stripURI(energyIcon)});

  var refreshTimes = makeElement('div', generalTab, {'style':'left: 20px; top: 50px;'});
  refreshTimes.appendChild(document.createTextNode('Refresh every '));
  makeElement('input', refreshTimes, {'type':'text', 'value':GM_getValue('r1', '30'), 'id':'r1', 'size':'2'});
  refreshTimes.appendChild(document.createTextNode(' to '));
  makeElement('input', refreshTimes, {'type':'text', 'value':GM_getValue('r2', '110'), 'id':'r2', 'size':'2'});
  refreshTimes.appendChild(document.createTextNode(' seconds'));

  var autoHeal = makeElement('div', generalTab, {'style':'top:75px;'});
  makeElement('input', autoHeal, {'type':'checkbox', 'id':'autoHeal', 'value':'checked'}, 'autoHeal', 'checked');
  autoHeal.appendChild(document.createTextNode('Enable auto-heal '));
  makeElement('img', autoHeal, {'src':stripURI(healthIcon)});

  var healthLevel = makeElement('div', generalTab, {'style':'top: 100px; left: 20px;'});
  healthLevel.appendChild(document.createTextNode('Minimum health: '));
  makeElement('input', healthLevel, {'type':'text', 'style':'width: 30px;', 'value':GM_getValue('healthLevel', '50'), 'id':'healthLevel', 'size':'1'});

  elt = makeElement('div', generalTab, {'style':'top: 100px; left: 180px'});
  title = 'Prevent others from being able to attack you by suspending auto-heal below 20 health. If this is set, adjust auto-heal accordingly (try ~29) or you may never end up in hospital.';
  id = 'hideInHospital';
  var hideInHospital = makeElement('input', elt, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'hideInHospital');
  label = makeElement('label', elt, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Hide in hospital'));
  makeElement('img', elt, {'src':stripURI(hideIcon)});

  // Select location
  elt = makeElement('div', generalTab, {'style':'top: 125px; left: 20px'});
  elt.appendChild(document.createTextNode('Heal in: '));
  title = 'New York';
  id = 'healLocationNY';
  label = makeElement('label', elt, {'for':id, 'title':title});
  makeElement('input', label, {'type':'radio', 'name':'r4', 'id':id, 'title':title, 'style':'vertical-align:top', 'value':'checked'}, 'healLocationNY');
  label.appendChild(document.createTextNode(title));
  title = 'Cuba';
  id = 'healLocationCuba';
  label = makeElement('label', elt, {'for':id, 'title':title});
  makeElement('input', label, {'type':'radio', 'name':'r4', 'id':id, 'title':title, 'style':'vertical-align:top', 'value':'checked'}, 'healLocationCuba');
  label.appendChild(document.createTextNode(title));

  var autoBank = makeElement('div', generalTab, {'style':'top: 150px;'});
  makeElement('input', autoBank, {'type':'checkbox', 'id':'autoBank', 'value':'checked'}, 'autoBank');
  autoBank.appendChild(document.createTextNode('Enable NY banking '));
  makeElement('img', autoBank, {'src':stripURI(cashIcon)});
  makeElement('input', autoBank, {'type':'text', 'style':'width: 80px;margin-left:5px;', 'title':'Minimum size for each deposit in New York', 'value':GM_getValue('bankConfig', '50000'), 'id':'bankConfig', 'size':'5'});
  autoBank.addEventListener('change', minBankCheck, false);

  var autoBankCuba = makeElement('div', generalTab, {'style':'top: 175px;'});
  makeElement('input', autoBankCuba, {'type':'checkbox', 'id':'autoBankCuba', 'value':'checked'}, 'autoBankCuba');
  autoBankCuba.appendChild(document.createTextNode('Enable Cuba banking '));
  makeElement('img', autoBankCuba, {'src':stripURI(cashCubaIcon)});
  makeElement('input', autoBankCuba, {'type':'text', 'style':'width: 80px;margin-left:5px;', 'title':'Minimum size for each deposit in Cuba', 'value':GM_getValue('bankConfigCuba', '50000'), 'id':'bankConfigCuba', 'size':'5'});
  autoBankCuba.addEventListener('change', minBankCheck, false);

  var autoPause = makeElement('div', generalTab, {'style':'top: 200px;'});
  makeElement('input', autoPause, {'type':'checkbox', 'id':'autoPause', 'value':'checked'}, 'autoPause');
  autoPause.appendChild(document.createTextNode('Enable auto-pause'));
  autoPause.addEventListener('click', clickAutoPause, false);

  var autoPauseBefore = makeElement('div', generalTab, {'style':'top: 225px; left: 20px;'});
  makeElement('input', autoPauseBefore, {'type':'radio', 'name':'r3', 'id':'autoPauseBefore', 'value':'checked'}, 'autoPauseBefore');
  autoPauseBefore.appendChild(document.createTextNode('Before level up'));

  var autoPauseAfter = makeElement('div', generalTab, {'style':'top: 225px; left: 150px;'});
  makeElement('input', autoPauseAfter, {'type':'radio', 'name':'r3', 'id':'autoPauseAfter', 'value':'checked'}, 'autoPauseAfter');
  autoPauseAfter.appendChild(document.createTextNode('After level up'));

  var autoPauseExp = makeElement('div', generalTab, {'style':'top: 250px; left: 20px;'});
  autoPauseExp.appendChild(document.createTextNode('Experience left to pause at '));
  makeElement('input', autoPauseExp, {'type':'text', 'value':GM_getValue('autoPauseExp', '50'), 'id':'autoPauseExp', 'size':'2'});

  lottoTitle = 'Plays free auto-generated lottery ticket daily'
  var autoLottoOpt = makeElement('div', generalTab, {'style':'top: 275px;'});
  makeElement('input', autoLottoOpt, {'type':'checkbox', 'id':'autoLottoOpt', 'title':lottoTitle, 'value':'checked'}, 'autoLottoOpt');
  autoLottoOpt.appendChild(document.createTextNode('Enable auto-lotto'));

  var leftAlign = makeElement('div', generalTab, {'style':'top: 300px;'});
  makeElement('input', leftAlign, {'type':'checkbox', 'id':'leftAlign', 'value':'checked'}, 'leftAlign');
  leftAlign.appendChild(document.createTextNode('Align game to the left'));

  var hideAds = makeElement('div', generalTab, {'style':'top: 325px;'});
  makeElement('input', hideAds, {'type':'checkbox', 'id':'hideAds', 'value':'checked'}, 'hideAds');
  hideAds.appendChild(document.createTextNode('Hide advertising'));

  var moveEmailBar = makeElement('div', generalTab, {'style':'top: 350px;'});
  makeElement('input', moveEmailBar, {'type':'checkbox', 'id':'moveEmailBar', 'value':'checked'}, 'moveEmailBar');
  moveEmailBar.appendChild(document.createTextNode('Move email options to the bottom'));

  notificationStopTitle = 'Handles undoing notification pop-ups alerting other users.';
  notificationID = 'notificationHandle';
  notificationLabel = makeElement('div', generalTab, {'id':'notificationLabel', 'title':notificationStopTitle, 'style':'top: 375px; float: left; margin-left: 100px'});
  notificationLabel.appendChild(document.createTextNode('Undo which notifications'));
  var notificationHandle = makeElement('select', generalTab, {'id':notificationID, 'title':notificationStopTitle, 'style':'top: 375px; width: 8em; display: block'}, 'notificationLabel');
  var choice = document.createElement('option');
  choice.value = 0;
  choice.appendChild(document.createTextNode('None'));
  notificationHandle.appendChild(choice);
  choice = document.createElement('option');
  choice.value = 1;
  choice.appendChild(document.createTextNode('Fight/Rob'));
  notificationHandle.appendChild(choice);
  choice = document.createElement('option');
  choice.value = 2;
  choice.appendChild(document.createTextNode('All'));
  notificationHandle.appendChild(choice);
  if (GM_getValue('notificationHandle', 'unk') == 'unk') {
    GM_setValue('notificationHandle', 1);
  }
  notificationHandle.selectedIndex = GM_getValue('notificationHandle', 1);

  var autoLog = makeElement('div', generalTab, {'style':'top: 25px; right: 10px;'});
  autoLog.appendChild(document.createTextNode('Enable logging '));
  makeElement('input', autoLog, {'type':'checkbox', 'id':'autoLog', 'value':'checked'}, 'autoLog');

  var logLength = makeElement('div', generalTab, {'style':'top: 50px; right: 10px;'});
  logLength.appendChild(document.createTextNode('Max # of messages in Log '));
  makeElement('input', logLength, {'type':'text', 'id':'autoLogLength', 'value':GM_getValue('autoLogLength', '300'), 'size':'2'});

  var logPlayerUpdates = makeElement('div', generalTab, {'style':'top: 75px; right: 10px;'});
  logPlayerUpdates.appendChild(document.createTextNode('Log Player Updates '));
  makeElement('input', logPlayerUpdates, {'type':'checkbox', 'id':'logPlayerUpdates', 'title':'Send Player Updates to Mafia Log', 'value':'checked'}, 'logPlayerUpdates');

  var logPlayerUpdatesMax = makeElement('div', generalTab, {'style':'top: 100px; right: 10px;'});
  logPlayerUpdatesMax.appendChild(document.createTextNode('Max # of updates '));
  makeElement('input', logPlayerUpdatesMax, {'type':'text', 'id':'logPlayerUpdatesMax', 'value':GM_getValue('logPlayerUpdatesMax', '25'), 'size':'2'});

  var autoStats = makeElement('div', generalTab, {'style':' text-align: right; top: 150px; right: 10px;'});
  makeElement('img', autoStats, {'src':stripURI(plussignIcon)});
  autoStats.appendChild(document.createTextNode('Enable auto-stat '));
  makeElement('input', autoStats, {'type':'checkbox', 'id':'autoStat', 'value':'checked'}, 'autoStat');
  autoStats.addEventListener('click', clickStats, false);

  var autoStatAttack = makeElement('div', generalTab, {'style':' top: 175px; right: 200px;'});
  makeElement('input', autoStatAttack, {'type':'radio', 'name':'r2', 'id':'autoStatAttack', 'value':'checked'}, 'autoStatAttack');
  autoStatAttack.appendChild(document.createTextNode('Attack'));

  var autoStatHealth = makeElement('div', generalTab, {'style':' top: 175px; right: 120px;'});
  makeElement('input', autoStatHealth, {'type':'radio', 'name':'r2', 'id':'autoStatHealth', 'value':'checked'}, 'autoStatHealth');
  autoStatHealth.appendChild(document.createTextNode('Health'));

  var autoStatEnergy = makeElement('div', generalTab, {'style':' top: 175px; right: 40px;'});
  makeElement('input', autoStatEnergy, {'type':'radio', 'name':'r2', 'id':'autoStatEnergy', 'value':'checked'}, 'autoStatEnergy');
  autoStatEnergy.appendChild(document.createTextNode('Energy'));

  var autoStatStamina = makeElement('div', generalTab, {'style':' top: 195px; right: 30px;'});
  makeElement('input', autoStatStamina, {'type':'radio', 'name':'r2', 'id':'autoStatStamina', 'value':'checked'}, 'autoStatStamina');
  autoStatStamina.appendChild(document.createTextNode('Stamina'));

  var autoStatDefense = makeElement('div', generalTab, {'style':' top: 195px; right: 110px;'});
  makeElement('input', autoStatDefense, {'type':'radio', 'name':'r2', 'id':'autoStatDefense', 'value':'checked'}, 'autoStatDefense');
  autoStatDefense.appendChild(document.createTextNode('Defense'));

  var delayTimes = makeElement('div', generalTab, {'style':'right: 10px; top: 225px; text-align:right;'});
  delayTimes.appendChild(document.createTextNode('Delay '));
  makeElement('input', delayTimes, {'type':'text', 'value':GM_getValue('d1', '3'), 'id':'d1', 'size':'2'});
  delayTimes.appendChild(document.createTextNode(' to '));
  makeElement('input', delayTimes, {'type':'text', 'value':GM_getValue('d2', '5'), 'id':'d2', 'size':'2'});
  delayTimes.appendChild(document.createTextNode(' seconds'));
  makeElement('br', delayTimes);
  delayTimes.appendChild(document.createTextNode('in-between actions'));

//ATK
  var autoLog = makeElement('div', generalTab, {'style':'top: 300px; right: 10px;'});
  autoLog.appendChild(document.createTextNode('Enable Hourly Stats Updates [Beta]'));
  makeElement('input', autoLog, {'type':'checkbox', 'id':'hourlyStatsOpt', 'value':'checked'}, 'hourlyStatsOpt');

  var autoGiftSkip = makeElement('div', generalTab, {'style':'top: 325px; right: 10px;'});
  autoGiftSkip.appendChild(document.createTextNode('Skip Gift Wall Posts'));
  makeElement('input', autoGiftSkip, {'type':'checkbox', 'id':'autoGiftSkipOpt', 'value':'checked'}, 'autoGiftSkipOpt');

  title = 'Check if you want to ask for help automatically with jobs.';
  var autoAskJobHelp = makeElement('div', generalTab, {'style':' right: 10px; top: 350px;'});
  autoAskJobHelp.appendChild(document.createTextNode('Automatically ask for job help'));
  makeElement('input', autoAskJobHelp, {'type':'checkbox', 'id':'autoAskJobHelp', 'title':title, 'value':'checked'}, 'autoAskJobHelp');

  title = 'Enter the minimum experience to ask for job help, or 0 for no minimum.';
  var autoAskJobHelpMinExp = makeElement('div', generalTab, {'style':' right: 10px; top: 375px;'});
  autoAskJobHelpMinExp.appendChild(document.createTextNode('Minimum experience for job help '));
  makeElement('input', autoAskJobHelpMinExp, {'type':'text', 'value':GM_getValue('autoAskJobHelpMinExp', '0'), 'id':'autoAskJobHelpMinExp', 'size':'2'});

  title = 'Enter a message to publish to your wall when asking for help with a job. If you don\'t want to publish to your wall, leave this blank.';
  var autoAskJobHelpMessage = makeElement('div', generalTab, {'style':' right: 10px; top: 400px;'});
  autoAskJobHelpMessage.appendChild(document.createTextNode('Message to post on Wall for job help '));
  makeElement('input', autoAskJobHelpMessage, {'type':'text', 'value':GM_getValue('autoAskJobHelpMessage', ''), 'id':'autoAskJobHelpMessage', 'size':'10'});

  var energyTab = makeElement('div', settingsBox, {'id':'energyTab', 'class':'tabcontent'});

  var waitForFull = makeElement('div', energyTab, {'style':'top: 25px; right: 10px;'});
  waitForFull.appendChild(document.createTextNode('Wait until energy is full to run jobs'));
  makeElement('input', waitForFull, {'type':'checkbox', 'id':'waitForFull', 'value':'checked'}, 'waitForFull');

  var autoEnergyPack = makeElement('div', energyTab, {'style':' top: 50px; right: 10px;'});
  autoEnergyPack.appendChild(document.createTextNode('Enable auto-energy pack'));
  makeElement('input', autoEnergyPack, {'type':'checkbox', 'id':'autoEnergyPack', 'title':'Allows script to accept an energy pack if it calculates that you will not be wasting XP based on the Estimate Job Ratio and your stamina statistics', 'value':'checked'}, 'autoEnergyPack');

  var estimateJobRatio = makeElement('div', energyTab, {'style':' top: 75px; right: 10px;'});
  estimateJobRatio.appendChild(document.createTextNode('Estimate Job Ratio'));
  makeElement('input', estimateJobRatio, {'type':'text', 'style':'width: 30px;', 'title':'Please estimate your ratio by dividing your Job XP by the Energy Points needed, considering prerequisite jobs and loot success rates. Enter 0 if you would like it to fire as soon as you get it, regardless of waste.', 'value':GM_getValue('estimateJobRatio', '1'), 'id':'estimateJobRatio', 'size':'2'});

  title = 'Check if you received the helicopter for completing Level 3 mastery of the Consigliere job tab';
  var hasHelicopter = makeElement('div', energyTab, {'style':' top: 100px; right: 10px;'});
  hasHelicopter.appendChild(document.createTextNode('Have helicopter job mastery loot item'));
  makeElement('input', hasHelicopter, {'type':'checkbox', 'id':'hasHelicopter', 'title':title, 'value':'checked'}, 'hasHelicopter');

  title = 'Check if you received the golden throne for completing Level 3 mastery of the Boss tier';
  var hasGoldenThrone = makeElement('div', energyTab, {'style':' top: 125px; right: 10px;'});
  hasGoldenThrone.appendChild(document.createTextNode('Have golden throne job mastery loot item'));
  makeElement('input', hasGoldenThrone, {'type':'checkbox', 'id':'hasGoldenThrone', 'title':title, 'value':'checked'}, 'hasGoldenThrone');

  title = 'Check if you are a Maniac profile type';
  var isManiac = makeElement('div', energyTab, {'style':' top: 150px; right: 10px;'});
  isManiac.appendChild(document.createTextNode('Are a Maniac'));
  makeElement('input', isManiac, {'type':'checkbox', 'id':'isManiac', 'title':title, 'value':'checked'}, 'isManiac');

  var selectText = makeElement('div', energyTab, {'style':' right: 60px; top: 175px;'});
  makeElement('img', selectText, {'src':stripURI(energyIcon)});
  selectText.appendChild(document.createTextNode(' Wheelman Energy Savings %'));

  var selectEnergyBonus = makeElement('select', energyTab, {'style':' right: 10px; top: 175px;', 'id':'selectEnergyBonus'});
  for (i = 0; i < 12; i++) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(i));
    selectEnergyBonus.appendChild(choice);
  }
  selectEnergyBonus.selectedIndex = (GM_getValue('selectEnergyBonus', 0)>11) ? 0 : GM_getValue('selectEnergyBonus', 0);

  title = 'Send your mafia an energy pack every hour';
  var sendEnergyPack = makeElement('div', energyTab, {'style':' top: 200px; right: 10px;'});
  sendEnergyPack.appendChild(document.createTextNode('Auto Send Energy Pack'));
  makeElement('input', sendEnergyPack, {'type':'checkbox', 'id':'sendEnergyPack', 'title':title, 'value':'checked'}, 'sendEnergyPack');
  
  var autoMission = makeElement('div', energyTab, {'style':' top: 25px;'});
  makeElement('input', autoMission, {'type':'checkbox', 'id':'autoMission', 'value':'checked'}, 'autoMission');
  autoMission.appendChild(document.createTextNode('Enable auto-mission '));
  makeElement('img', autoMission, {'src':stripURI(experienceIcon)});

  var selectMission = makeElement('select', energyTab, {'style':'top: 50px; left:5px;', 'id':'selectMission'});
  var cityno = -1;
  var tabno = -1;
  var choice;
  for (var i = 0; i < missions.length; i++) {
    var mission = missions[i];
    if (mission[4] != cityno) {
      // Add a row for the city.
      cityno = mission[4];
      choice = document.createElement('optgroup');
      choice.label = cities[cityno].toUpperCase() + ' MISSIONS';
      choice.className = 'ap_optgroup1';
      selectMission.appendChild(choice);
    }
    if (mission[3] != tabno) {
      // Add a row for the tab.
      tabno = mission[3];
      choice = document.createElement('optgroup');
      choice.label = missionTabs[cityno][tabno - 1];
      choice.className = 'ap_optgroup2';
      selectMission.appendChild(choice);
    }
    var choice = document.createElement('option');
    choice.text = mission[0];
    selectMission.appendChild(choice);
  }
  selectMission.selectedIndex = GM_getValue('selectMission', 1);

  var repeatJob = makeElement('div', energyTab, {'style':' top: 75px;'});
  makeElement('input', repeatJob, {'type':'checkbox', 'id':'repeatJob', 'value':'checked'}, 'repeatJob');
  repeatJob.appendChild(document.createTextNode('Repeat Job'));

  // Create stamina tab.
  var staminaTab = createStaminaTab();
  settingsBox.appendChild(staminaTab);

  // Create Hitlist tab.
  var hitlistTab = createHitlistTab();
  settingsBox.appendChild(hitlistTab);

  // Create Property tab.
  var propertyTab = makeElement('div', settingsBox, {'id':'propertyTab', 'class':'tabcontent'});

  var autoBuy = makeElement('div', propertyTab, {'style':'top: 25px;'});
  makeElement('input', autoBuy, {'type':'checkbox', 'id':'autoBuy', 'value':'checked'}, 'autoBuy');
  autoBuy.appendChild(document.createTextNode('Enable Auto-buy'));

  var selectProperties = makeElement('div', propertyTab, {'style':'top: 50px;'});
  selectPropertiesTitle = makeElement('span', selectProperties, {'style':'margin-left:6px;'});
  selectPropertiesTitle.appendChild(document.createTextNode('Select the properties you want to buy:'));
  makeElement('br', selectProperties);
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'abandoned', 'value':'checked'}, 'abandoned', 'checked');
  selectProperties.appendChild(document.createTextNode('Abandoned Lot *'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'commercial', 'value':'checked'}, 'commercial', 'checked');
  selectProperties.appendChild(document.createTextNode('Commercial Block *'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'downtown', 'value':'checked'}, 'downtown', 'checked');
  selectProperties.appendChild(document.createTextNode('Prime Downtown Lot *'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'beachfront', 'value':'checked'}, 'beachfront', 'checked');
  selectProperties.appendChild(document.createTextNode('Beachfront Property *'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'mike', 'value':'checked'}, 'mike', 'checked');
  selectProperties.appendChild(document.createTextNode('Mafia Mike\'s *'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'rent', 'value':'checked'}, 'rent', 'checked');
  selectProperties.appendChild(document.createTextNode('Rent House *'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'restaurant', 'value':'checked'}, 'restaurant');
  selectProperties.appendChild(document.createTextNode('Italian Restaurant'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'apartment', 'value':'checked'}, 'apartment');
  selectProperties.appendChild(document.createTextNode('Apartment Complex'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'valu', 'value':'checked'}, 'valu');
  selectProperties.appendChild(document.createTextNode('Valu-Mart'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'tourist', 'value':'checked'}, 'tourist');
  selectProperties.appendChild(document.createTextNode('Marina Tourist Shops'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'office', 'value':'checked'}, 'office');
  selectProperties.appendChild(document.createTextNode('Office Building'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'hotel', 'value':'checked'}, 'hotel');
  selectProperties.appendChild(document.createTextNode('5-Star Hotel'));
  makeElement('br', selectProperties);
  makeElement('input', selectProperties, {'type':'checkbox', 'id':'casino', 'value':'checked'}, 'casino');
  selectProperties.appendChild(document.createTextNode('Mega Casino'));
  makeElement('br', selectProperties);
  makeElement('br', selectProperties);
  selectPropertiesNote = makeElement('span', selectProperties, {'style':'margin-left:21px'});
  selectPropertiesNote.appendChild(document.createTextNode('* Properties that cannot be robbed'));

  title = 'Never spend below this amount of cash';
  var buyMinAmount = makeElement('div', propertyTab, {'style':'top: 50px; right: 10px;'});
  buyMinAmount.appendChild(document.createTextNode('Minimum cash: '));
  makeElement('input', buyMinAmount, {'type':'text', 'style':'width: 80px;', 'title':title, 'value':GM_getValue('buyMinAmount', '0'), 'id':'buyMinAmount', 'size':'5'});

  var autoRepair = makeElement('div', propertyTab, {'style':'top: 100px; right: 10px;'});
  autoRepair.appendChild(document.createTextNode('Enable auto-repair property'));
  makeElement('input', autoRepair, {'type':'checkbox', 'id':'autoRepair', 'value':'checked'}, 'autoRepair');

  var autoProtect = makeElement('div', propertyTab, {'style':'top: 125px; right: 10px;'});
  autoProtect.appendChild(document.createTextNode('Enable auto-protect property'));
  makeElement('input', autoProtect, {'type':'checkbox', 'id':'autoProtect', 'value':'checked'}, 'autoProtect');

  var autoSellCrates = makeElement('div', propertyTab, {'style':'top: 150px; right: 10px;'});
  autoSellCrates.appendChild(document.createTextNode('Sell Cuban business output'));
  makeElement('input', autoSellCrates, {'type':'checkbox', 'id':'autoSellCrates', 'value':'checked'}, 'autoSellCrates');

  var aboutTab = makeElement('div', settingsBox, {'id':'aboutTab', 'class':'tabcontent'});
    var versionInfo = makeElement('div', aboutTab, {'style':'top: 25px;font-size: 18px; font-weight: bold;'});
      versionInfo.appendChild(document.createTextNode('Version '+ SCRIPT.version));
      makeElement('br', versionInfo);
      versionInfo.appendChild(document.createTextNode('Build '+SCRIPT.build));

    var devs = makeElement('div', aboutTab, {'style':'top: 75px; left: 10px; font-size: 12px; font-weight: bold;'});
      devs.appendChild(document.createTextNode('Contributors:'));
      devList = makeElement('span', devs, {'style':'position: relative; left: 15px;'});
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('StevenD'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('CharlesD'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('Eric Ortego'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('Jeremy'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('Liquidor'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('AK17710N'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('Fragger'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('<x51>'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('CyB'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('int1'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('Janos112'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('int2str'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('Doonce'));
      makeElement('br', devList);
      devList.appendChild(document.createTextNode('Eric Layne'));

  // Create save button
  var saveButton = makeElement('span', settingsBox, {'class':'sexy_button', 'style':'left: 10px; bottom: 10px;'});
  makeElement('button', saveButton).appendChild(document.createTextNode('Save Settings'));
  saveButton.addEventListener('click', saveSettings, false);

  // Create Help button
  var helpButton = makeElement('span', settingsBox, {'class':'sexy_button', 'style':'left: 260px; bottom: 10px;'});
  makeElement('button', helpButton).appendChild(document.createTextNode('Help'));
  helpButton.addEventListener('click', helpSettings, false);

  // Create Update button
  var updateButton = makeElement('span', settingsBox, {'class':'sexy_button', 'style':'right: 10px; bottom: 10px;'});
  makeElement('button', updateButton).appendChild(document.createTextNode('Check for Updates'));
  updateButton.addEventListener('click', updateScript, false);

//Tab code from:http://www.dynamicdrive.com/dynamicindex17/tabcontent.htm converted into a data URI
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript', 'src':
    "data:application/x-javascript;base64,Ly8qKiBUYWIgQ29udGVudCBzY3JpcHQgdjIuMC0gqSBEeW5hbWljIERyaXZlIERIVE1MIGNvZGUgbGlicmFyeSAoaHR0cDovL3d3dy5keW5hbWljZHJpdmUuY29tKQ0KLy8qKiBVcGRhdGVkIE9jdCA3dGgsIDA3IHRvIHZlcnNpb24gMi4wLiBDb250YWlucyBudW1lcm91cyBpbXByb3ZlbWVudHM6DQovLyAgIC1BZGRlZCBBdXRvIE1vZGU6IFNjcmlwdCBhdXRvIHJvdGF0ZXMgdGhlIHRhYnMgYmFzZWQgb24gYW4gaW50ZXJ2YWwsIHVudGlsIGEgdGFiIGlzIGV4cGxpY2l0bHkgc2VsZWN0ZWQNCi8vICAgLUFiaWxpdHkgdG8gZXhwYW5kL2NvbnRyYWN0IGFyYml0cmFyeSBESVZzIG9uIHRoZSBwYWdlIGFzIHRoZSB0YWJiZWQgY29udGVudCBpcyBleHBhbmRlZC8gY29udHJhY3RlZA0KLy8gICAtQWJpbGl0eSB0byBkeW5hbWljYWxseSBzZWxlY3QgYSB0YWIgZWl0aGVyIGJhc2VkIG9uIGl0cyBwb3NpdGlvbiB3aXRoaW4gaXRzIHBlZXJzLCBvciBpdHMgSUQgYXR0cmlidXRlIChnaXZlIHRoZSB0YXJnZXQgdGFiIG9uZSAxc3QpDQovLyAgIC1BYmlsaXR5IHRvIHNldCB3aGVyZSB0aGUgQ1NTIGNsYXNzbmFtZSAic2VsZWN0ZWQiIGdldCBhc3NpZ25lZC0gZWl0aGVyIHRvIHRoZSB0YXJnZXQgdGFiJ3MgbGluayAoIkEiKSwgb3IgaXRzIHBhcmVudCBjb250YWluZXINCi8vKiogVXBkYXRlZCBGZWIgMTh0aCwgMDggdG8gdmVyc2lvbiAyLjE6IEFkZHMgYSAidGFiaW5zdGFuY2UuY3ljbGVpdChkaXIpIiBtZXRob2QgdG8gY3ljbGUgZm9yd2FyZCBvciBiYWNrd2FyZCBiZXR3ZWVuIHRhYnMgZHluYW1pY2FsbHkNCi8vKiogVXBkYXRlZCBBcHJpbCA4dGgsIDA4IHRvIHZlcnNpb24gMi4yOiBBZGRzIHN1cHBvcnQgZm9yIGV4cGFuZGluZyBhIHRhYiB1c2luZyBhIFVSTCBwYXJhbWV0ZXIgKGllOiBodHRwOi8vbXlzaXRlLmNvbS90YWJjb250ZW50Lmh0bT90YWJpbnRlcmZhY2VpZD0wKSANCg0KLy8vL05PIE5FRUQgVE8gRURJVCBCRUxPVy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLw0KDQpmdW5jdGlvbiBkZHRhYmNvbnRlbnQodGFiaW50ZXJmYWNlaWQpew0KCXRoaXMudGFiaW50ZXJmYWNlaWQ9dGFiaW50ZXJmYWNlaWQgLy9JRCBvZiBUYWIgTWVudSBtYWluIGNvbnRhaW5lcg0KCXRoaXMudGFicz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJpbnRlcmZhY2VpZCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImEiKSAvL0dldCBhbGwgdGFiIGxpbmtzIHdpdGhpbiBjb250YWluZXINCgl0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlPXRydWUNCgl0aGlzLmhvdHRhYnNwb3NpdGlvbnM9W10gLy9BcnJheSB0byBzdG9yZSBwb3NpdGlvbiBvZiB0YWJzIHRoYXQgaGF2ZSBhICJyZWwiIGF0dHIgZGVmaW5lZCwgcmVsYXRpdmUgdG8gYWxsIHRhYiBsaW5rcywgd2l0aGluIGNvbnRhaW5lcg0KCXRoaXMuY3VycmVudFRhYkluZGV4PTAgLy9JbmRleCBvZiBjdXJyZW50bHkgc2VsZWN0ZWQgaG90IHRhYiAodGFiIHdpdGggc3ViIGNvbnRlbnQpIHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkNCgl0aGlzLnN1YmNvbnRlbnRpZHM9W10gLy9BcnJheSB0byBzdG9yZSBpZHMgb2YgdGhlIHN1YiBjb250ZW50cyAoInJlbCIgYXR0ciB2YWx1ZXMpDQoJdGhpcy5yZXZjb250ZW50aWRzPVtdIC8vQXJyYXkgdG8gc3RvcmUgaWRzIG9mIGFyYml0cmFyeSBjb250ZW50cyB0byBleHBhbmQvY29udGFjdCBhcyB3ZWxsICgicmV2IiBhdHRyIHZhbHVlcykNCgl0aGlzLnNlbGVjdGVkQ2xhc3NUYXJnZXQ9ImxpbmsiIC8va2V5d29yZCB0byBpbmRpY2F0ZSB3aGljaCB0YXJnZXQgZWxlbWVudCB0byBhc3NpZ24gInNlbGVjdGVkIiBDU1MgY2xhc3MgKCJsaW5rcGFyZW50IiBvciAibGluayIpDQp9DQoNCmRkdGFiY29udGVudC5nZXRDb29raWU9ZnVuY3Rpb24oTmFtZSl7IA0KCXZhciByZT1uZXcgUmVnRXhwKE5hbWUrIj1bXjtdKyIsICJpIik7IC8vY29uc3RydWN0IFJFIHRvIHNlYXJjaCBmb3IgdGFyZ2V0IG5hbWUvdmFsdWUgcGFpcg0KCWlmIChkb2N1bWVudC5jb29raWUubWF0Y2gocmUpKSAvL2lmIGNvb2tpZSBmb3VuZA0KCQlyZXR1cm4gZG9jdW1lbnQuY29va2llLm1hdGNoKHJlKVswXS5zcGxpdCgiPSIpWzFdIC8vcmV0dXJuIGl0cyB2YWx1ZQ0KCXJldHVybiAiIg0KfQ0KDQpkZHRhYmNvbnRlbnQuc2V0Q29va2llPWZ1bmN0aW9uKG5hbWUsIHZhbHVlKXsNCglkb2N1bWVudC5jb29raWUgPSBuYW1lKyI9Iit2YWx1ZSsiO3BhdGg9LyIgLy9jb29raWUgdmFsdWUgaXMgZG9tYWluIHdpZGUgKHBhdGg9LykNCn0NCg0KZGR0YWJjb250ZW50LnByb3RvdHlwZT17DQoNCglleHBhbmRpdDpmdW5jdGlvbih0YWJpZF9vcl9wb3NpdGlvbil7IC8vUFVCTElDIGZ1bmN0aW9uIHRvIHNlbGVjdCBhIHRhYiBlaXRoZXIgYnkgaXRzIElEIG9yIHBvc2l0aW9uKGludCkgd2l0aGluIGl0cyBwZWVycw0KCQl0aGlzLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCXZhciB0YWJyZWY9IiINCgkJdHJ5ew0KCQkJaWYgKHR5cGVvZiB0YWJpZF9vcl9wb3NpdGlvbj09InN0cmluZyIgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiaWRfb3JfcG9zaXRpb24pLmdldEF0dHJpYnV0ZSgicmVsIikpIC8vaWYgc3BlY2lmaWVkIHRhYiBjb250YWlucyAicmVsIiBhdHRyDQoJCQkJdGFicmVmPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmlkX29yX3Bvc2l0aW9uKQ0KCQkJZWxzZSBpZiAocGFyc2VJbnQodGFiaWRfb3JfcG9zaXRpb24pIT1OYU4gJiYgdGhpcy50YWJzW3RhYmlkX29yX3Bvc2l0aW9uXS5nZXRBdHRyaWJ1dGUoInJlbCIpKSAvL2lmIHNwZWNpZmllZCB0YWIgY29udGFpbnMgInJlbCIgYXR0cg0KCQkJCXRhYnJlZj10aGlzLnRhYnNbdGFiaWRfb3JfcG9zaXRpb25dDQoJCX0NCgkJY2F0Y2goZXJyKXthbGVydCgiSW52YWxpZCBUYWIgSUQgb3IgcG9zaXRpb24gZW50ZXJlZCEiKX0NCgkJaWYgKHRhYnJlZiE9IiIpIC8vaWYgYSB2YWxpZCB0YWIgaXMgZm91bmQgYmFzZWQgb24gZnVuY3Rpb24gcGFyYW1ldGVyDQoJCQl0aGlzLmV4cGFuZHRhYih0YWJyZWYpIC8vZXhwYW5kIHRoaXMgdGFiDQoJfSwNCg0KCWN5Y2xlaXQ6ZnVuY3Rpb24oZGlyLCBhdXRvcnVuKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gbW92ZSBmb3dhcmQgb3IgYmFja3dhcmRzIHRocm91Z2ggZWFjaCBob3QgdGFiICh0YWJpbnN0YW5jZS5jeWNsZWl0KCdmb3dhcmQvYmFjaycpICkNCgkJaWYgKGRpcj09Im5leHQiKXsNCgkJCXZhciBjdXJyZW50VGFiSW5kZXg9KHRoaXMuY3VycmVudFRhYkluZGV4PHRoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGgtMSk%2FIHRoaXMuY3VycmVudFRhYkluZGV4KzEgOiAwDQoJCX0NCgkJZWxzZSBpZiAoZGlyPT0icHJldiIpew0KCQkJdmFyIGN1cnJlbnRUYWJJbmRleD0odGhpcy5jdXJyZW50VGFiSW5kZXg%2BMCk%2FIHRoaXMuY3VycmVudFRhYkluZGV4LTEgOiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoLTENCgkJfQ0KCQlpZiAodHlwZW9mIGF1dG9ydW49PSJ1bmRlZmluZWQiKSAvL2lmIGN5Y2xlaXQoKSBpcyBiZWluZyBjYWxsZWQgYnkgdXNlciwgdmVyc3VzIGF1dG9ydW4oKSBmdW5jdGlvbg0KCQkJdGhpcy5jYW5jZWxhdXRvcnVuKCkgLy9zdG9wIGF1dG8gY3ljbGluZyBvZiB0YWJzIChpZiBydW5uaW5nKQ0KCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zW2N1cnJlbnRUYWJJbmRleF1dKQ0KCX0sDQoNCglzZXRwZXJzaXN0OmZ1bmN0aW9uKGJvb2wpeyAvL1BVQkxJQyBmdW5jdGlvbiB0byB0b2dnbGUgcGVyc2lzdGVuY2UgZmVhdHVyZQ0KCQkJdGhpcy5lbmFibGV0YWJwZXJzaXN0ZW5jZT1ib29sDQoJfSwNCg0KCXNldHNlbGVjdGVkQ2xhc3NUYXJnZXQ6ZnVuY3Rpb24ob2Jqc3RyKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gc2V0IHdoaWNoIHRhcmdldCBlbGVtZW50IHRvIGFzc2lnbiAic2VsZWN0ZWQiIENTUyBjbGFzcyAoImxpbmtwYXJlbnQiIG9yICJsaW5rIikNCgkJdGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PW9ianN0ciB8fCAibGluayINCgl9LA0KDQoJZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldDpmdW5jdGlvbih0YWJyZWYpeyAvL1JldHVybnMgdGFyZ2V0IGVsZW1lbnQgdG8gYXNzaWduICJzZWxlY3RlZCIgQ1NTIGNsYXNzIHRvDQoJCXJldHVybiAodGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PT0oImxpbmtwYXJlbnQiLnRvTG93ZXJDYXNlKCkpKT8gdGFicmVmLnBhcmVudE5vZGUgOiB0YWJyZWYNCgl9LA0KDQoJdXJscGFyYW1zZWxlY3Q6ZnVuY3Rpb24odGFiaW50ZXJmYWNlaWQpew0KCQl2YXIgcmVzdWx0PXdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cCh0YWJpbnRlcmZhY2VpZCsiPShcXGQrKSIsICJpIikpIC8vY2hlY2sgZm9yICI%2FdGFiaW50ZXJmYWNlaWQ9MiIgaW4gVVJMDQoJCXJldHVybiAocmVzdWx0PT1udWxsKT8gbnVsbCA6IHBhcnNlSW50KFJlZ0V4cC4kMSkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXgsIHdoZXJlIGluZGV4IChpbnQpIGlzIHRoZSBzZWxlY3RlZCB0YWIncyBpbmRleA0KCX0sDQoNCglleHBhbmR0YWI6ZnVuY3Rpb24odGFicmVmKXsNCgkJdmFyIHN1YmNvbnRlbnRpZD10YWJyZWYuZ2V0QXR0cmlidXRlKCJyZWwiKSAvL0dldCBpZCBvZiBzdWJjb250ZW50IHRvIGV4cGFuZA0KCQkvL0dldCAicmV2IiBhdHRyIGFzIGEgc3RyaW5nIG9mIElEcyBpbiB0aGUgZm9ybWF0ICIsam9obixnZW9yZ2UsdHJleSxldGMsIiB0byBlYXNpbHkgc2VhcmNoIHRocm91Z2gNCgkJdmFyIGFzc29jaWF0ZWRyZXZpZHM9KHRhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpKT8gIiwiK3RhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpLnJlcGxhY2UoL1xzKy8sICIiKSsiLCIgOiAiIg0KCQl0aGlzLmV4cGFuZHN1YmNvbnRlbnQoc3ViY29udGVudGlkKQ0KCQl0aGlzLmV4cGFuZHJldmNvbnRlbnQoYXNzb2NpYXRlZHJldmlkcykNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMudGFicy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIGFsbCB0YWJzLCBhbmQgYXNzaWduIG9ubHkgdGhlIHNlbGVjdGVkIHRhYiB0aGUgQ1NTIGNsYXNzICJzZWxlY3RlZCINCgkJCXRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT0odGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIik9PXN1YmNvbnRlbnRpZCk%2FICJzZWxlY3RlZCIgOiAiIg0KCQl9DQoJCWlmICh0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlKSAvL2lmIHBlcnNpc3RlbmNlIGVuYWJsZWQsIHNhdmUgc2VsZWN0ZWQgdGFiIHBvc2l0aW9uKGludCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlkZHRhYmNvbnRlbnQuc2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQsIHRhYnJlZi50YWJwb3NpdGlvbikNCgkJdGhpcy5zZXRjdXJyZW50dGFiaW5kZXgodGFicmVmLnRhYnBvc2l0aW9uKSAvL3JlbWVtYmVyIHBvc2l0aW9uIG9mIHNlbGVjdGVkIHRhYiB3aXRoaW4gaG90dGFic3Bvc2l0aW9uc1tdIGFycmF5DQoJfSwNCg0KCWV4cGFuZHN1YmNvbnRlbnQ6ZnVuY3Rpb24oc3ViY29udGVudGlkKXsNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMuc3ViY29udGVudGlkcy5sZW5ndGg7IGkrKyl7DQoJCQl2YXIgc3ViY29udGVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnN1YmNvbnRlbnRpZHNbaV0pIC8vY2FjaGUgY3VycmVudCBzdWJjb250ZW50IG9iaiAoaW4gZm9yIGxvb3ApDQoJCQlzdWJjb250ZW50LnN0eWxlLmRpc3BsYXk9KHN1YmNvbnRlbnQuaWQ9PXN1YmNvbnRlbnRpZCk%2FICJibG9jayIgOiAibm9uZSIgLy8ic2hvdyIgb3IgaGlkZSBzdWIgY29udGVudCBiYXNlZCBvbiBtYXRjaGluZyBpZCBhdHRyIHZhbHVlDQoJCX0NCgl9LA0KDQoJZXhwYW5kcmV2Y29udGVudDpmdW5jdGlvbihhc3NvY2lhdGVkcmV2aWRzKXsNCgkJdmFyIGFsbHJldmlkcz10aGlzLnJldmNvbnRlbnRpZHMNCgkJZm9yICh2YXIgaT0wOyBpPGFsbHJldmlkcy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIHJldiBhdHRyaWJ1dGVzIGZvciBhbGwgdGFicyBpbiB0aGlzIHRhYiBpbnRlcmZhY2UNCgkJCS8vaWYgYW55IHZhbHVlcyBzdG9yZWQgd2l0aGluIGFzc29jaWF0ZWRyZXZpZHMgbWF0Y2hlcyBvbmUgd2l0aGluIGFsbHJldmlkcywgZXhwYW5kIHRoYXQgRElWLCBvdGhlcndpc2UsIGNvbnRyYWN0IGl0DQoJCQlkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbGxyZXZpZHNbaV0pLnN0eWxlLmRpc3BsYXk9KGFzc29jaWF0ZWRyZXZpZHMuaW5kZXhPZigiLCIrYWxscmV2aWRzW2ldKyIsIikhPS0xKT8gImJsb2NrIiA6ICJub25lIg0KCQl9DQoJfSwNCg0KCXNldGN1cnJlbnR0YWJpbmRleDpmdW5jdGlvbih0YWJwb3NpdGlvbil7IC8vc3RvcmUgY3VycmVudCBwb3NpdGlvbiBvZiB0YWIgKHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkpDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoOyBpKyspew0KCQkJaWYgKHRhYnBvc2l0aW9uPT10aGlzLmhvdHRhYnNwb3NpdGlvbnNbaV0pew0KCQkJCXRoaXMuY3VycmVudFRhYkluZGV4PWkNCgkJCQlicmVhaw0KCQkJfQ0KCQl9DQoJfSwNCg0KCWF1dG9ydW46ZnVuY3Rpb24oKXsgLy9mdW5jdGlvbiB0byBhdXRvIGN5Y2xlIHRocm91Z2ggYW5kIHNlbGVjdCB0YWJzIGJhc2VkIG9uIGEgc2V0IGludGVydmFsDQoJCXRoaXMuY3ljbGVpdCgnbmV4dCcsIHRydWUpDQoJfSwNCg0KCWNhbmNlbGF1dG9ydW46ZnVuY3Rpb24oKXsNCgkJaWYgKHR5cGVvZiB0aGlzLmF1dG9ydW50aW1lciE9InVuZGVmaW5lZCIpDQoJCQljbGVhckludGVydmFsKHRoaXMuYXV0b3J1bnRpbWVyKQ0KCX0sDQoNCglpbml0OmZ1bmN0aW9uKGF1dG9tb2RlcGVyaW9kKXsNCgkJdmFyIHBlcnNpc3RlZHRhYj1kZHRhYmNvbnRlbnQuZ2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQpIC8vZ2V0IHBvc2l0aW9uIG9mIHBlcnNpc3RlZCB0YWIgKGFwcGxpY2FibGUgaWYgcGVyc2lzdGVuY2UgaXMgZW5hYmxlZCkNCgkJdmFyIHNlbGVjdGVkdGFiPS0xIC8vQ3VycmVudGx5IHNlbGVjdGVkIHRhYiBpbmRleCAoLTEgbWVhbmluZyBub25lKQ0KCQl2YXIgc2VsZWN0ZWR0YWJmcm9tdXJsPXRoaXMudXJscGFyYW1zZWxlY3QodGhpcy50YWJpbnRlcmZhY2VpZCkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXggZnJvbTogdGFiY29udGVudC5odG0%2FdGFiaW50ZXJmYWNlaWQ9aW5kZXgNCgkJdGhpcy5hdXRvbW9kZXBlcmlvZD1hdXRvbW9kZXBlcmlvZCB8fCAwDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLnRhYnMubGVuZ3RoOyBpKyspew0KCQkJdGhpcy50YWJzW2ldLnRhYnBvc2l0aW9uPWkgLy9yZW1lbWJlciBwb3NpdGlvbiBvZiB0YWIgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIikpew0KCQkJCXZhciB0YWJpbnN0YW5jZT10aGlzDQoJCQkJdGhpcy5ob3R0YWJzcG9zaXRpb25zW3RoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGhdPWkgLy9zdG9yZSBwb3NpdGlvbiBvZiAiaG90IiB0YWIgKCJyZWwiIGF0dHIgZGVmaW5lZCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQkJdGhpcy5zdWJjb250ZW50aWRzW3RoaXMuc3ViY29udGVudGlkcy5sZW5ndGhdPXRoaXMudGFic1tpXS5nZXRBdHRyaWJ1dGUoInJlbCIpIC8vc3RvcmUgaWQgb2Ygc3ViIGNvbnRlbnQgKCJyZWwiIGF0dHIgdmFsdWUpDQoJCQkJdGhpcy50YWJzW2ldLm9uY2xpY2s9ZnVuY3Rpb24oKXsNCgkJCQkJdGFiaW5zdGFuY2UuZXhwYW5kdGFiKHRoaXMpDQoJCQkJCXRhYmluc3RhbmNlLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCQkJCXJldHVybiBmYWxzZQ0KCQkJCX0NCgkJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmV2IikpeyAvL2lmICJyZXYiIGF0dHIgZGVmaW5lZCwgc3RvcmUgZWFjaCB2YWx1ZSB3aXRoaW4gInJldiIgYXMgYW4gYXJyYXkgZWxlbWVudA0KCQkJCQl0aGlzLnJldmNvbnRlbnRpZHM9dGhpcy5yZXZjb250ZW50aWRzLmNvbmNhdCh0aGlzLnRhYnNbaV0uZ2V0QXR0cmlidXRlKCJyZXYiKS5zcGxpdCgvXHMqLFxzKi8pKQ0KCQkJCX0NCgkJCQlpZiAoc2VsZWN0ZWR0YWJmcm9tdXJsPT1pIHx8IHRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHBhcnNlSW50KHBlcnNpc3RlZHRhYik9PWkgfHwgIXRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT09InNlbGVjdGVkIil7DQoJCQkJCXNlbGVjdGVkdGFiPWkgLy9TZWxlY3RlZCB0YWIgaW5kZXgsIGlmIGZvdW5kDQoJCQkJfQ0KCQkJfQ0KCQl9IC8vRU5EIGZvciBsb29wDQoJCWlmIChzZWxlY3RlZHRhYiE9LTEpIC8vaWYgYSB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIHRhYiBpbmRleCBpcyBmb3VuZA0KCQkJdGhpcy5leHBhbmR0YWIodGhpcy50YWJzW3NlbGVjdGVkdGFiXSkgLy9leHBhbmQgc2VsZWN0ZWQgdGFiIChlaXRoZXIgZnJvbSBVUkwgcGFyYW1ldGVyLCBwZXJzaXN0ZW50IGZlYXR1cmUsIG9yIGNsYXNzPSJzZWxlY3RlZCIgY2xhc3MpDQoJCWVsc2UgLy9pZiBubyB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIGluZGV4IGZvdW5kDQoJCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zWzBdXSkgLy9KdXN0IHNlbGVjdCBmaXJzdCB0YWIgdGhhdCBjb250YWlucyBhICJyZWwiIGF0dHINCgkJaWYgKHBhcnNlSW50KHRoaXMuYXV0b21vZGVwZXJpb2QpPjUwMCAmJiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoPjEpew0KCQkJdGhpcy5hdXRvcnVudGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXt0YWJpbnN0YW5jZS5hdXRvcnVuKCl9LCB0aGlzLmF1dG9tb2RlcGVyaW9kKQ0KCQl9DQoJfSAvL0VORCBpbnQoKSBmdW5jdGlvbg0KDQp9IC8vRU5EIFByb3RvdHlwZSBhc3NpZ25tZW50"
  }).appendChild(document.createTextNode(
    '/***********************************************\n' +
    '* Tab Content script v2.2- © Dynamic Drive DHTML code library (www.dynamicdrive.com)\n' +
    '* This notice MUST stay intact for legal use\n' +
    '* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code\n' +
    '***********************************************/\n'
  ));
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript'}).appendChild(document.createTextNode(
    'var tabs=new ddtabcontent("tabNav"); //enter ID of Tab Container\n' +
    'tabs.setpersist(true); //toogle persistence of the tabs\' state\n' +
    'tabs.setselectedClassTarget("linkparent"); //"link" or "linkparent"\n' +
    'tabs.init();'
  ));


  DEBUG('Menu created.');
}

function createStaminaTab() {
  var elt, title, id, label;
  var staminaTab = makeElement('div', null, {'id':'staminaTab', 'class':'tabcontent'});

  // Container for a list of settings.
  var list = makeElement('div', staminaTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:125%;'});

  //
  // How to spend stamina (fight/rob/hitlist).
  //
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});

  title = 'Spend stamina automatically.';
  id = 'staminaSpend';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, 'staminaSpend');
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend stamina to:'));

  title = 'Suspend automatic play below this level of stamina.';
  id = 'staminaSpendHow';
  var staminaSpendHow = makeElement('select', rhs, {'id':id, 'title':title});
  for (var i = 0; i < staminaSpendChoices.length; i++) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(staminaSpendChoices[i]));
    staminaSpendHow.appendChild(choice);
  }

  // Bordered container for varying settings content.
  var staminaTabSub = makeElement('div', list, {'id':'staminaTabSub', 'style':'position: static; border: 1px inset #FFD927; margin-left: auto; margin-right: auto; margin-top: 5px; margin-bottom: 5px;'});

  // Stamina to reserve for manual play.
  var item = makeElement('div', list, {'class':'single'});
  title = 'Suspend automatic play below this level of stamina.';
  id = 'selectStaminaKeep';
  item.appendChild(document.createTextNode('Reserve '));
  var elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 100; i >= 0; i = i - 10) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(i + '%'));
    elt.appendChild(choice);
  }
  if (GM_getValue('selectStaminaKeep', 'NotSet') == 'NotSet' ||
      GM_getValue('selectStaminaKeep', 0) > elt.length - 1) {
    GM_setValue('selectStaminaKeep', elt.length - 1);
  }
  elt.selectedIndex = GM_getValue('selectStaminaKeep', 0);
  item.appendChild(document.createTextNode(' of stamina for manual play.'));

  // Level up
  var item = makeElement('div', list, {'class':'single'});
  title = 'Ignore minimum stamina settings if a level up is within reach.';
  id = 'allowStaminaToLevelUp';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, 'allowStaminaToLevelUp');
  label = makeElement('label', item, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Don\'t reserve stamina if within reach of the next level.'));


  //
  // Settings for random fighting
  //

  // Container for a list of settings.
  var list = makeElement('div', staminaTabSub, {'id':'fightRandomSub', 'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; line-height:125%; display: none;'});

  // Location setting.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  var loc = GM_getValue('fightLocation', NY);
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Fight in:'));
  title = ' New York';
  id = 'fightRandomNY';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  elt = makeElement('input', label, {'type':'radio', 'name':'staminar1', 'id':id, 'title':title, 'style':'vertical-align: baseline', 'value':'checked'});
  if (loc == NY) {
    elt.setAttribute('checked', 'checked');
  }
  label.appendChild(document.createTextNode(title));
  makeElement('br', rhs);
  title = ' Cuba';
  id = 'fightRandomCuba';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  elt = makeElement('input', label, {'type':'radio', 'name':'staminar1', 'id':id, 'title':title, 'style':'vertical-align: baseline', 'value':'checked'});
  if (loc == CUBA) {
    elt.setAttribute('checked', 'checked');
  }
  label.appendChild(document.createTextNode(title));

  // Maximum level.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Avoid opponents higher than this level.';
  id = 'fightLevelMax';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Maximum level:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':5, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('fightLevelMax', '100'), 'size':'1'});

  // Maximum level relative?
  title = 'Make the maximum level be relative to your own. For example, if your level is 10, and maximum level is set to 5, opponents higher than level 15 will be avoided.';
  id = 'fightLevelMaxRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'fightLevelMaxRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Add my level'));

  // Maximum mafia size.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'fightMafiaMax';
  title = 'Avoid opponents with mafia sizes larger than this.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Maximum mafia:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('fightMafiaMax', '501'), 'size':'1'});

  // Maximum mafia relative?
  title = 'Make the maximum mafia size be relative to your own. For example, if you have 300 mafia members, and maximum mafia is set to 50, opponents with more than 350 mafia members will be avoided.';
  id = 'fightMafiaMaxRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'fightMafiaMaxRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Add my mafia size'));

  // Minimum mafia size.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'fightMafiaMin';
  title = 'Avoid opponents with mafia sizes smaller than this.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Minimum mafia:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('fightMafiaMin', '1'), 'size':'1'});

  // Maximum mafia relative?
  title = 'Make the minimum mafia size be relative to your own. For example, if you have 300 mafia members, and minimum mafia is set to 50, opponents with less than 250 mafia members will be avoided.';
  id = 'fightMafiaMinRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'fightMafiaMinRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Subtract from my mafia size'));

  // Use stealth fighting?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Prefer opponents who won\'t be notified of your attacks.';
  id = 'fightStealth';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightStealth', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Use fight stealth'));

  // Avoid Top Mafia bodyguards?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Avoid opponents known to be Top Mafia bodyguards. This may ' +
          'decrease the frequency of losses due to critical hits.';
  id = 'fightAvoidBodyguards';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightAvoidBodyguards', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Avoid Top Mafia bodyguards'));

  // Family names
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Avoid random opponents whose names contain specific patterns.';
  id = 'fightAvoidNames';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightAvoidNames', 0);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Avoid mafia families:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 8em;', 'id':'fightClanName', 'title':'Enter each pattern (such as a clan name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('clanName', defaultClans.join('\n'))));;
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: small;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));
  // End of options specific to random fighting


  //
  // Settings for list fighting
  //

  // Container for a list of settings.
  var list = makeElement('div', staminaTabSub, {'id':'fightListSub', 'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; line-height:125%; display: none'});

  // Location setting
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  var loc = GM_getValue('fightLocation', NY);
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Fight in:'));
  title = ' New York';
  id = 'fightListNY';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  elt = makeElement('input', label, {'type':'radio', 'name':'staminar2', 'id':id, 'title':title, 'style':'vertical-align: baseline', 'value':'checked'});
  if (loc == NY) {
    elt.setAttribute('checked', 'checked');
  }
  label.appendChild(document.createTextNode(title));
  makeElement('br', rhs);
  title = ' Cuba';
  id = 'fightListCuba';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  elt = makeElement('input', label, {'type':'radio', 'name':'staminar2', 'id':id, 'title':title, 'style':'vertical-align: baseline', 'value':'checked'});
  if (loc == CUBA) {
    elt.setAttribute('checked', 'checked');
  }
  label.appendChild(document.createTextNode(title));

  // Opponent list
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Fight these opponents:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 180px; height: 105px;', 'id':'fightList', 'title':'Enter each opponent\'s ID (not their name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('fightList', '')));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: small;'}).appendChild(document.createTextNode('Enter each Facebook ID on a separate line.'));

  // Remove stronger opponents?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Remove stronger opponents from the list automatically.';
  id = 'fightRemoveStronger';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightRemoveStronger', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Remove stronger opponents'));

  // End of options specific to list fighting


  //
  // Settings for random robbing
  //

  // Container for a list of settings.
  var list = makeElement('div', staminaTabSub, {'id':'robRandomSub', 'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; line-height:125%; display: none'});

  // Maximum level.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Don\'t rob opponents higher than this level.';
  id = 'robLevelMax';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Maximum level:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':5, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('robLevelMax', '100'), 'size':'1'});

  // Maximum level relative?
  title = 'Make the maximum level be relative to your own. For example, if your level is 10, and maximum level is set to 5, opponents higher than level 15 will be avoided.';
  id = 'robLevelMaxRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'robLevelMaxRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Add my level'));

  // Maximum mafia size.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'robMafiaMax';
  title = 'Don\'t rob opponents with mafia sizes larger than this.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Maximum mafia:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('robMafiaMax', '501'), 'size':'1'});

  // Maximum mafia relative?
  title = 'Make the maximum mafia size be relative to your own. For example, if you have 300 mafia members, and maximum mafia is set to 50, opponents with more than 350 mafia members will be avoided. However, if your mafia size is larger than your level, the limit is set relative to your level instead.';
  id = 'robMafiaMaxRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'robMafiaMaxRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Add my mafia size'));

  // Minimum mafia size.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'robMafiaMin';
  title = 'Avoid opponents with mafia sizes smaller than this.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Minimum mafia:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('robMafiaMin', '1'), 'size':'1'});

  // Maximum mafia relative?
  title = 'Make the minimum mafia size be relative to your own. For example, if you have 300 mafia members, and minimum mafia is set to 50, opponents with less than 250 mafia members will be avoided. However, if your mafia size is larger than your level, the limit is set relative to your level instead.';
  id = 'robMafiaMinRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'robMafiaMinRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Subtract from my mafia size'));

  // Family names
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Avoid random opponents whose names contain specific patterns.';
  id = 'robAvoidNames';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'robAvoidNames', 0);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Avoid mafia families:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 8em;', 'id':'robClanName', 'title':'Enter each pattern (such as a clan name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('clanName', defaultClans.join('\n'))));;
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: small;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));
  // End of options specific to random robbing


  //
  // Settings for list robbing
  //

  // Container for a list of settings.
  var list = makeElement('div', staminaTabSub, {'id':'robListSub', 'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; line-height:125%; display: none'});

  // Opponent list
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Rob these opponents:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 180px; height: 105px;', 'id':'robList', 'title':'Enter each opponent\'s ID (not their name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('robList', '')));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: small;'}).appendChild(document.createTextNode('Enter each Facebook ID on a separate line.'));

  // Remove stronger opponents?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Remove stronger opponents from the list automatically.';
  id = 'robRemoveStronger';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'robRemoveStronger', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Remove stronger opponents'));
  // End of options specific to list robbing


  //
  // Settings for hitman
  //

  // Container for a list of settings.
  var list = makeElement('div', staminaTabSub, {'id':'hitmanSub', 'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; line-height:125%; display: none'});

  // Location setting
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  var loc = GM_getValue('hitmanLocation', NY);
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Collect bounties in:'));
  title = ' New York';
  id = 'hitmanNY';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  elt = makeElement('input', label, {'type':'radio', 'name':'staminar3', 'id':id, 'title':title, 'style':'vertical-align: baseline', 'value':'checked'});
  if (loc == NY) {
    elt.setAttribute('checked', 'checked');
  }
  label.appendChild(document.createTextNode(title));
  makeElement('br', rhs);
  title = ' Cuba';
  id = 'hitmanCuba';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  elt = makeElement('input', label, {'type':'radio', 'name':'staminar3', 'id':id, 'title':title, 'style':'vertical-align: baseline', 'value':'checked'});
  if (loc == CUBA) {
    elt.setAttribute('checked', 'checked');
  }
  label.appendChild(document.createTextNode(title));

  // Minimum bounty
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'hitmanBountyMin';
  title = 'Ignore targets with bounties below this measly amount.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Minimum bounty:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 7em; border: 1px solid #781351', 'value':GM_getValue('hitmanBountyMin', '0')});

  // Family names
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Avoid random opponents whose names contain specific patterns.';
  id = 'hitmanAvoidNames';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'hitmanAvoidNames', 0);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Avoid mafia families:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 8em;', 'id':'hitmanClanName', 'title':'Enter each pattern (such as a clan name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('clanName', defaultClans.join('\n'))));;
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: small;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));

  // More options coming soon.
  var item = makeElement('div', list);
  makeElement('br', item);
  makeElement('div', item, {'style':'font-size: small; text-align: center; border: 1px solid #781351;'}).appendChild(document.createTextNode('More options coming soon!'));
  makeElement('br', item);
  // End of options specific to hitman


  // Handler for switching sub-areas.
  var handleSpendChanged = function() {
    // Hide all but the selected sub-area.
    for (i = 0; i < staminaSpendHow.length; i++) {
      if (i != staminaSpendHow.selectedIndex) {
        staminaTabSub.childNodes[i].style.display = 'none';
      }
    }
    staminaTabSub.childNodes[staminaSpendHow.selectedIndex].style.display = 'block';
  }
  staminaSpendHow.selectedIndex = GM_getValue('staminaSpendHow', 0);
  handleSpendChanged();
  staminaSpendHow.addEventListener('change', handleSpendChanged, false);

  return staminaTab;
}

// Validates the settings on the stamina tab. If all settings are valid, an
// object containing each key and value to be saved is returned.
function validateStaminaTab() {
  var elt, id;

  var checked = function(id) {
    return document.getElementById(id).checked === true? 'checked' : 0;
  }

  // Create an empty object to hold the settings.
  var s = {};

  // Get the common settings.
  s.staminaSpend = checked('staminaSpend');
  s.staminaSpendHow = document.getElementById('staminaSpendHow').selectedIndex;
  s.selectStaminaKeep = document.getElementById('selectStaminaKeep').selectedIndex;
  s.allowStaminaToLevelUp = checked('allowStaminaToLevelUp');

  // The method of getting and verifying the rest of the settings depends
  // on how stamina will be spent.
  switch (s.staminaSpendHow) {
    case STAMINA_HOW_FIGHT_RANDOM: // Random fighting
      // Get the settings.
      s.fightLocation = document.getElementById('fightRandomNY').checked === true? NY: CUBA;
      s.fightLevelMax = parseInt(document.getElementById('fightLevelMax').value);
      s.fightLevelMaxRelative = checked('fightLevelMaxRelative');
      s.fightMafiaMax = parseInt(document.getElementById('fightMafiaMax').value);
      s.fightMafiaMaxRelative = checked('fightMafiaMaxRelative');
      s.fightMafiaMin = parseInt(document.getElementById('fightMafiaMin').value);
      s.fightMafiaMinRelative = checked('fightMafiaMinRelative');
      s.fightStealth = checked('fightStealth');
      s.fightAvoidBodyguards = checked('fightAvoidBodyguards');
      s.fightAvoidNames = checked('fightAvoidNames');
      s.clanName = document.getElementById('fightClanName').value;

      // Validate the maximum level settings.
      if (isNaN(s.fightLevelMax)) {
        alert('Please enter a maximum level for fighting.');
        return;
      } else if (s.fightLevelMaxRelative && s.fightLevelMax < 0) {
        alert('Please enter a maximum relative level of zero or more.');
        return;
      } else if (!s.fightLevelMaxRelative && s.fightLevelMax < level) {
        alert('Please enter a fight level of ' + level +
              ' (your current level) or more for fighting.');
        return;
      } else if (!s.fightLevelMaxRelative && level >= 180 &&
                 s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a maximum fight level of 200 at the very least. If necessary, lower the maximum mafia size to compensate.');
        return;
      } else if (s.fightLevelMaxRelative && level >= 180 &&
                level + s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a relative fight level of at least ' + (200 - s.fightLevelMax) + '. If necessary, lower the maximum mafia size to compensate.');
        return;
      }

      // Validate the maximum mafia size settings.
      if (isNaN(s.fightMafiaMax)) {
        alert('Please enter a maximum mafia size for fighting.');
        return;
      } else if (!s.fightMafiaMaxRelative && (s.fightMafiaMax < 1)) {
        alert('Please enter a maximum mafia size of one or more for fighting.');
        return;
      } else if (s.fightMafiaMaxRelative && (s.fightMafiaMax + mafia < 1)) {
        alert('Please enter a larger relative mafia size for fighting.');
        return;
      }

      // Validate the minimum mafia size settings.
      if (isNaN(s.fightMafiaMin)) {
        alert('Please enter a minimum mafia size for fighting.');
        return;
      } else if (!s.fightMafiaMinRelative && (s.fightMafiaMin < 1)) {
        alert('Please enter a minimum mafia size of one or more for fighting.');
        return;
      } else if (s.fightMafiaMinRelative && (mafia - s.fightMafiaMin < 1)) {
        alert('Please enter a smaller relative mafia size for fighting.');
        return;
      }
      break;

    case STAMINA_HOW_FIGHT_LIST: // List fighting
      // Get the settings.
      s.fightLocation = document.getElementById('fightListNY').checked === true? NY: CUBA;
      s.fightList = document.getElementById('fightList').value;
      s.fightRemoveStronger = document.getElementById('fightRemoveStronger').checked === true? 'checked' : 0;

      // Validate the fight list.
      var list = s.fightList.split('\n');
      if (!list[0]) {
        alert('Enter the Facebook ID of at least one opponent to fight.');
        return;
      }
      break;

    case STAMINA_HOW_ROB_RANDOM: // Random robbing
      // Get the settings.
      s.robLevelMax = parseInt(document.getElementById('robLevelMax').value);
      s.robLevelMaxRelative = checked('robLevelMaxRelative');
      s.robMafiaMax = parseInt(document.getElementById('robMafiaMax').value);
      s.robMafiaMaxRelative = checked('robMafiaMaxRelative');
      s.robMafiaMin = parseInt(document.getElementById('robMafiaMin').value);
      s.robMafiaMinRelative = checked('robMafiaMinRelative');
      s.robAvoidNames = checked('robAvoidNames');
      s.clanName = document.getElementById('robClanName').value;

      // Validate the maximum level settings.
      if (isNaN(s.robLevelMax)) {
        alert('Please enter a maximum level for robbing.');
        return;
      } else if (s.robLevelMaxRelative && (s.robLevelMax < 0)) {
        alert('Please enter a maximum relative level of zero or more.');
        return;
      } else if (!s.robLevelMaxRelative && (s.robLevelMax < level)) {
        alert('Please enter a maximum level of ' + level +
              ' (your current level) or more for robbing.');
        return;
      }

      // Validate the maximum mafia size settings.
      var mafiaForRob = level < mafia? level : mafia;
      if (isNaN(s.robMafiaMax)) {
        alert('Please enter a maximum mafia size for robbing.');
        return;
      } else if (!s.robMafiaMaxRelative && (s.robMafiaMax < 1)) {
        alert('Please enter a maximum mafia size of one or more for robbing.');
        return;
      } else if (s.robMafiaMaxRelative && (s.robMafiaMax + mafiaForRob < 1)) {
        alert('Please enter a larger relative mafia size for robbing.');
        return;
      }

      // Validate the minimum mafia size settings.
      if (isNaN(s.robMafiaMin)) {
        alert('Please enter a minimum mafia size for robbing.');
        return;
      } else if (!s.robMafiaMinRelative && (s.robMafiaMin < 1)) {
        alert('Please enter a minimum mafia size of one or more for robbing.');
        return;
      } else if (s.robMafiaMinRelative && (mafiaForRob - s.robMafiaMin < 1)) {
        alert('Please enter a smaller relative mafia size for robbing.');
        return;
      }
      break;

    case STAMINA_HOW_ROB_LIST: // List robbing
      // Get the settings.
      s.robList = document.getElementById('robList').value;
      s.robRemoveStronger = document.getElementById('robRemoveStronger').checked === true? 'checked' : 0;

      // Validate the rob list.
      var list = s.robList.split('\n');
      if (!list[0]) {
        alert('Enter the Facebook ID of at least one opponent to rob.');
        return;
      }
      break;

    case STAMINA_HOW_HITMAN: // Hitlist bounty collection ("auto-hitman")
      // Get the settings.
      s.hitmanLocation = document.getElementById('hitmanNY').checked === true? NY: CUBA;
      s.hitmanBountyMin = document.getElementById('hitmanBountyMin').value;
      s.hitmanAvoidNames = checked('hitmanAvoidNames');
      s.clanName = document.getElementById('hitmanClanName').value;

      // Validate the minimum bounty.
      var min = parseCash(s.hitmanBountyMin);
      if (isNaN(min) || min < 0) {
        alert('Please enter a minimum bounty amount.');
        return;
      }
      break;

    default:
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized stamina setting: ' +
               'staminaSpendHow=' + s.staminaSpendHow);
  }

  return s;
}

function createHitlistTab() {
  var elt, title, id, label;
  var eltStack = [];
  var hitlistTab = makeElement('div', null, {'id':'hitlistTab', 'class':'tabcontent'});

  //
  // First column of options.
  //
  elt = makeElement('div', hitlistTab,
                    {'style':'top: 25px; text-decoration: line-through;'});
  title = 'Keep Players on Hitlist.';
  id = 'autoHitlist';
  var autoHitlistCheckbox = makeElement('input', elt, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'autoHitlist');
  label = makeElement('label', elt, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Enable auto-hitlist '));

  elt = makeElement('div', elt, {'style':'position: static; margin-left: 13px'});
  title = 'Use a custom list of opponents. Enter each opponent\'s ID' +
          ' (not their name) on a separate line.';
  id = 'toHitlist';
  makeElement('textarea', elt, {'style':'position: static; width: 180px; height: 105px;', 'id':id, 'title':title}).appendChild(document.createTextNode(GM_getValue(id, '')));

  elt = makeElement('div', hitlistTab,
                    {'style':'top: 175px;'});
  title = 'Only Show Summary of Attacks.';
  id = 'hideAttacks';
  var hideAttacksCheckbox = makeElement('input', elt, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, 'hideAttacks');
  label = makeElement('label', elt, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Summarize Attacks From Player Updates '));

  //second column of Hitlist Tab
  elt = makeElement('div', hitlistTab, {'style':'top: 25px; right: 10px; text-decoration: line-through;'});
  title = 'This will be the bounty amount for all auto-hitlists.';
  id = 'bountyAmount';
  label = makeElement('label', elt, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Bounty Amount: '));
  var bountyAmountCheckbox = makeElement('input', elt, {'type':'text', 'style':'width: 80px;', 'title':title, 'value':GM_getValue(id, '10000'), 'id':id, 'size':'1'});

  makeElement('br', elt);
  elt = makeElement('div', elt, {'style':'position: static; margin-right: 10px'});
  title = 'Players currently on hitlist';
  id = 'onHitlist';
  makeElement('textarea', elt, {'style':'position: static; width: 180px; height: 105px;', 'id':id, 'title':title}).appendChild(document.createTextNode(GM_getValue(id, '')));

  title = 'Press this button to clear all the names and return them to the auto-hitlist array.';
  id = 'clrHitlistArray';
  var clearHitlistButton = makeElement('span', elt, {'class':'sexy_button', 'title':title});
  makeElement('button', clearHitlistButton).appendChild(document.createTextNode('Clear Players'));
  clearHitlistButton.addEventListener('click', clearHitlistArray, false);

  return hitlistTab;
}

function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
}

function stripURI(img) {
  img = img.split('"')[1];
  return img.replace('" />', '');
}

function createStatWindow() {
  if(settingsOpen === true) {
    toggleSettings()
  };

  makeElement('style', document.getElementsByTagName('head')[0], {'type':'text/css'}).appendChild(document.createTextNode(
    '#statsWindow #sWindowTabNav div{border-right:1px solid #000;float:left;padding:0 7px;position:static;text-align:center}' +
    '#statsWindow #sWindowTabNav div.selected{background-image:url(' + stripURI(tabSelectedImage) + ')}' +
    '#statsWindow #sWindowTabNav div a{color:#fff;font-weight:700}' +
    '#statsWindow .sexy_button{position:absolute;background-image:url(' + stripURI(redBgImage) + ');border:1px solid #FFD927;color:#FFD927;cursor:pointer;display:block;float:left;font-size:14px;font-weight:700;padding:5px;text-decoration:none;width:auto}' +
    '#statsWindow .sexy_button button{background:transparent;border:medium none #FFF;color:#FFD927;cursor:pointer;font-size:14px;font-weight:700;margin:0}' +
    '#statsWindow .sexy_button button:hover{color:#BCD2EA;font-weight:700;text-decoration:none}' +
    '#statsWindow .tabcontent{display:none;}' +
    '#statsWindow label {font-weight: normal; color: #BCD2EA}'
  ));

  // This creates the stats box just like a facebook popup
  var elt = makeElement('div', document.body, {'class':'generic_dialog pop_dialog', 'id':'sWindowGenDialogPopDialog'});
  elt = makeElement('div', elt, {'class':'generic_dialog_popup', 'style':'top: 30px; width: 620px;'});
  elt = makeElement('div', elt, {'class':'pop_content popcontent_advanced', 'id':'pop_content'});
  var statsWindow = makeElement('div', elt, {'style':'position: relative; width: 600px; height: 580px; font-size: 14px; color: #BCD2EA; background: black no-repeat scroll 0 110px', 'id':'statsWindow'});
  //End settings box

  var statsWindowTopBG = makeElement('div', statsWindow, {'style':'background: black; height: 80px;'});
    var statsWindowTitle = makeElement('div', statsWindowTopBG, {'style':'font-size: 18px; font-weight: bold;'});
      statsWindowTitle.appendChild(document.createTextNode('Facebook Mafia Wars Autoplayer'));
      makeElement('br', statsWindowTitle);
      statsWindowTitle.appendChild(document.createTextNode('Player Stats '));
      makeElement('br', statsWindowTitle);
    makeElement('img', statsWindowTopBG, {'src':stripURI(mwLogoSmall), 'style':'position: absolute; top: 0px; right: 25px;'});
    makeElement('img', statsWindowTopBG, {'src':stripURI(closeButtonIcon), 'style':'position: absolute; top: 0px; right: 0px; cursor: pointer;'}).addEventListener('click', toggleStats, false);


  // NOTE: This container is for placing the buttons horizontally.
  elt = makeElement('div', statsWindow, {'style':'text-align: left'});
  // Make the button bar.
  var sWindowTabNav = makeElement('div', elt, {'id':'sWindowTabNav', 'style':'position: static; display: inline-block; background: transparent url(' + stripURI(redBgImage) + ') repeat-x scroll 0 0; border: 1px solid #FFFFFF; fontsize: 13px; line-height: 28px; height: 30px;'});
    var graphTabLink = makeElement('div', sWindowTabNav, {'class':'selected'} );
      makeElement('a', graphTabLink, {'href':'#', 'rel':'graphTab'}).appendChild(document.createTextNode('Graphs'));
    var statTabLink = makeElement('div', sWindowTabNav );
      makeElement('a', statTabLink, {'href':'#', 'rel':'statTab'}).appendChild(document.createTextNode('Stats'));


  var graphTab = makeElement('div', statsWindow, {'id':'graphTab', 'class':'tabcontent'});
    var graphBox = makeElement('div', graphTab, {'id':'graphBox', 'style':'position: static; overflow: auto; height: 443px; width: 578px; background-color: #111111; font-size:11px; color: #BCD2EA; text-align: center; margin: 5px; padding: 5px; border: 1px inset;'});
      graphBox.innerHTML = GM_getValue('graphBox', 'Enable Stats with the Checkbox on the General tab of the AutopPlay settings.<br><br>Stats will populate after the 2nd hour of running.');

  var statTab = makeElement('div', statsWindow, {'id':'statTab', 'class':'tabcontent'});
    var autoClick = makeElement('div', statTab, {'style':'top: 25px;'});
    makeElement('img', autoClick, {'style':'position: absolute; top: 5px; left: 200px', 'src':stripURI(energyIcon)});


//Tab code from:http://www.dynamicdrive.com/dynamicindex17/tabcontent.htm converted into a data URI
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript', 'src':
    "data:application/x-javascript;base64,Ly8qKiBUYWIgQ29udGVudCBzY3JpcHQgdjIuMC0gqSBEeW5hbWljIERyaXZlIERIVE1MIGNvZGUgbGlicmFyeSAoaHR0cDovL3d3dy5keW5hbWljZHJpdmUuY29tKQ0KLy8qKiBVcGRhdGVkIE9jdCA3dGgsIDA3IHRvIHZlcnNpb24gMi4wLiBDb250YWlucyBudW1lcm91cyBpbXByb3ZlbWVudHM6DQovLyAgIC1BZGRlZCBBdXRvIE1vZGU6IFNjcmlwdCBhdXRvIHJvdGF0ZXMgdGhlIHRhYnMgYmFzZWQgb24gYW4gaW50ZXJ2YWwsIHVudGlsIGEgdGFiIGlzIGV4cGxpY2l0bHkgc2VsZWN0ZWQNCi8vICAgLUFiaWxpdHkgdG8gZXhwYW5kL2NvbnRyYWN0IGFyYml0cmFyeSBESVZzIG9uIHRoZSBwYWdlIGFzIHRoZSB0YWJiZWQgY29udGVudCBpcyBleHBhbmRlZC8gY29udHJhY3RlZA0KLy8gICAtQWJpbGl0eSB0byBkeW5hbWljYWxseSBzZWxlY3QgYSB0YWIgZWl0aGVyIGJhc2VkIG9uIGl0cyBwb3NpdGlvbiB3aXRoaW4gaXRzIHBlZXJzLCBvciBpdHMgSUQgYXR0cmlidXRlIChnaXZlIHRoZSB0YXJnZXQgdGFiIG9uZSAxc3QpDQovLyAgIC1BYmlsaXR5IHRvIHNldCB3aGVyZSB0aGUgQ1NTIGNsYXNzbmFtZSAic2VsZWN0ZWQiIGdldCBhc3NpZ25lZC0gZWl0aGVyIHRvIHRoZSB0YXJnZXQgdGFiJ3MgbGluayAoIkEiKSwgb3IgaXRzIHBhcmVudCBjb250YWluZXINCi8vKiogVXBkYXRlZCBGZWIgMTh0aCwgMDggdG8gdmVyc2lvbiAyLjE6IEFkZHMgYSAidGFiaW5zdGFuY2UuY3ljbGVpdChkaXIpIiBtZXRob2QgdG8gY3ljbGUgZm9yd2FyZCBvciBiYWNrd2FyZCBiZXR3ZWVuIHRhYnMgZHluYW1pY2FsbHkNCi8vKiogVXBkYXRlZCBBcHJpbCA4dGgsIDA4IHRvIHZlcnNpb24gMi4yOiBBZGRzIHN1cHBvcnQgZm9yIGV4cGFuZGluZyBhIHRhYiB1c2luZyBhIFVSTCBwYXJhbWV0ZXIgKGllOiBodHRwOi8vbXlzaXRlLmNvbS90YWJjb250ZW50Lmh0bT90YWJpbnRlcmZhY2VpZD0wKSANCg0KLy8vL05PIE5FRUQgVE8gRURJVCBCRUxPVy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLw0KDQpmdW5jdGlvbiBkZHRhYmNvbnRlbnQodGFiaW50ZXJmYWNlaWQpew0KCXRoaXMudGFiaW50ZXJmYWNlaWQ9dGFiaW50ZXJmYWNlaWQgLy9JRCBvZiBUYWIgTWVudSBtYWluIGNvbnRhaW5lcg0KCXRoaXMudGFicz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJpbnRlcmZhY2VpZCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImEiKSAvL0dldCBhbGwgdGFiIGxpbmtzIHdpdGhpbiBjb250YWluZXINCgl0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlPXRydWUNCgl0aGlzLmhvdHRhYnNwb3NpdGlvbnM9W10gLy9BcnJheSB0byBzdG9yZSBwb3NpdGlvbiBvZiB0YWJzIHRoYXQgaGF2ZSBhICJyZWwiIGF0dHIgZGVmaW5lZCwgcmVsYXRpdmUgdG8gYWxsIHRhYiBsaW5rcywgd2l0aGluIGNvbnRhaW5lcg0KCXRoaXMuY3VycmVudFRhYkluZGV4PTAgLy9JbmRleCBvZiBjdXJyZW50bHkgc2VsZWN0ZWQgaG90IHRhYiAodGFiIHdpdGggc3ViIGNvbnRlbnQpIHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkNCgl0aGlzLnN1YmNvbnRlbnRpZHM9W10gLy9BcnJheSB0byBzdG9yZSBpZHMgb2YgdGhlIHN1YiBjb250ZW50cyAoInJlbCIgYXR0ciB2YWx1ZXMpDQoJdGhpcy5yZXZjb250ZW50aWRzPVtdIC8vQXJyYXkgdG8gc3RvcmUgaWRzIG9mIGFyYml0cmFyeSBjb250ZW50cyB0byBleHBhbmQvY29udGFjdCBhcyB3ZWxsICgicmV2IiBhdHRyIHZhbHVlcykNCgl0aGlzLnNlbGVjdGVkQ2xhc3NUYXJnZXQ9ImxpbmsiIC8va2V5d29yZCB0byBpbmRpY2F0ZSB3aGljaCB0YXJnZXQgZWxlbWVudCB0byBhc3NpZ24gInNlbGVjdGVkIiBDU1MgY2xhc3MgKCJsaW5rcGFyZW50IiBvciAibGluayIpDQp9DQoNCmRkdGFiY29udGVudC5nZXRDb29raWU9ZnVuY3Rpb24oTmFtZSl7IA0KCXZhciByZT1uZXcgUmVnRXhwKE5hbWUrIj1bXjtdKyIsICJpIik7IC8vY29uc3RydWN0IFJFIHRvIHNlYXJjaCBmb3IgdGFyZ2V0IG5hbWUvdmFsdWUgcGFpcg0KCWlmIChkb2N1bWVudC5jb29raWUubWF0Y2gocmUpKSAvL2lmIGNvb2tpZSBmb3VuZA0KCQlyZXR1cm4gZG9jdW1lbnQuY29va2llLm1hdGNoKHJlKVswXS5zcGxpdCgiPSIpWzFdIC8vcmV0dXJuIGl0cyB2YWx1ZQ0KCXJldHVybiAiIg0KfQ0KDQpkZHRhYmNvbnRlbnQuc2V0Q29va2llPWZ1bmN0aW9uKG5hbWUsIHZhbHVlKXsNCglkb2N1bWVudC5jb29raWUgPSBuYW1lKyI9Iit2YWx1ZSsiO3BhdGg9LyIgLy9jb29raWUgdmFsdWUgaXMgZG9tYWluIHdpZGUgKHBhdGg9LykNCn0NCg0KZGR0YWJjb250ZW50LnByb3RvdHlwZT17DQoNCglleHBhbmRpdDpmdW5jdGlvbih0YWJpZF9vcl9wb3NpdGlvbil7IC8vUFVCTElDIGZ1bmN0aW9uIHRvIHNlbGVjdCBhIHRhYiBlaXRoZXIgYnkgaXRzIElEIG9yIHBvc2l0aW9uKGludCkgd2l0aGluIGl0cyBwZWVycw0KCQl0aGlzLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCXZhciB0YWJyZWY9IiINCgkJdHJ5ew0KCQkJaWYgKHR5cGVvZiB0YWJpZF9vcl9wb3NpdGlvbj09InN0cmluZyIgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiaWRfb3JfcG9zaXRpb24pLmdldEF0dHJpYnV0ZSgicmVsIikpIC8vaWYgc3BlY2lmaWVkIHRhYiBjb250YWlucyAicmVsIiBhdHRyDQoJCQkJdGFicmVmPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmlkX29yX3Bvc2l0aW9uKQ0KCQkJZWxzZSBpZiAocGFyc2VJbnQodGFiaWRfb3JfcG9zaXRpb24pIT1OYU4gJiYgdGhpcy50YWJzW3RhYmlkX29yX3Bvc2l0aW9uXS5nZXRBdHRyaWJ1dGUoInJlbCIpKSAvL2lmIHNwZWNpZmllZCB0YWIgY29udGFpbnMgInJlbCIgYXR0cg0KCQkJCXRhYnJlZj10aGlzLnRhYnNbdGFiaWRfb3JfcG9zaXRpb25dDQoJCX0NCgkJY2F0Y2goZXJyKXthbGVydCgiSW52YWxpZCBUYWIgSUQgb3IgcG9zaXRpb24gZW50ZXJlZCEiKX0NCgkJaWYgKHRhYnJlZiE9IiIpIC8vaWYgYSB2YWxpZCB0YWIgaXMgZm91bmQgYmFzZWQgb24gZnVuY3Rpb24gcGFyYW1ldGVyDQoJCQl0aGlzLmV4cGFuZHRhYih0YWJyZWYpIC8vZXhwYW5kIHRoaXMgdGFiDQoJfSwNCg0KCWN5Y2xlaXQ6ZnVuY3Rpb24oZGlyLCBhdXRvcnVuKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gbW92ZSBmb3dhcmQgb3IgYmFja3dhcmRzIHRocm91Z2ggZWFjaCBob3QgdGFiICh0YWJpbnN0YW5jZS5jeWNsZWl0KCdmb3dhcmQvYmFjaycpICkNCgkJaWYgKGRpcj09Im5leHQiKXsNCgkJCXZhciBjdXJyZW50VGFiSW5kZXg9KHRoaXMuY3VycmVudFRhYkluZGV4PHRoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGgtMSk%2FIHRoaXMuY3VycmVudFRhYkluZGV4KzEgOiAwDQoJCX0NCgkJZWxzZSBpZiAoZGlyPT0icHJldiIpew0KCQkJdmFyIGN1cnJlbnRUYWJJbmRleD0odGhpcy5jdXJyZW50VGFiSW5kZXg%2BMCk%2FIHRoaXMuY3VycmVudFRhYkluZGV4LTEgOiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoLTENCgkJfQ0KCQlpZiAodHlwZW9mIGF1dG9ydW49PSJ1bmRlZmluZWQiKSAvL2lmIGN5Y2xlaXQoKSBpcyBiZWluZyBjYWxsZWQgYnkgdXNlciwgdmVyc3VzIGF1dG9ydW4oKSBmdW5jdGlvbg0KCQkJdGhpcy5jYW5jZWxhdXRvcnVuKCkgLy9zdG9wIGF1dG8gY3ljbGluZyBvZiB0YWJzIChpZiBydW5uaW5nKQ0KCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zW2N1cnJlbnRUYWJJbmRleF1dKQ0KCX0sDQoNCglzZXRwZXJzaXN0OmZ1bmN0aW9uKGJvb2wpeyAvL1BVQkxJQyBmdW5jdGlvbiB0byB0b2dnbGUgcGVyc2lzdGVuY2UgZmVhdHVyZQ0KCQkJdGhpcy5lbmFibGV0YWJwZXJzaXN0ZW5jZT1ib29sDQoJfSwNCg0KCXNldHNlbGVjdGVkQ2xhc3NUYXJnZXQ6ZnVuY3Rpb24ob2Jqc3RyKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gc2V0IHdoaWNoIHRhcmdldCBlbGVtZW50IHRvIGFzc2lnbiAic2VsZWN0ZWQiIENTUyBjbGFzcyAoImxpbmtwYXJlbnQiIG9yICJsaW5rIikNCgkJdGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PW9ianN0ciB8fCAibGluayINCgl9LA0KDQoJZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldDpmdW5jdGlvbih0YWJyZWYpeyAvL1JldHVybnMgdGFyZ2V0IGVsZW1lbnQgdG8gYXNzaWduICJzZWxlY3RlZCIgQ1NTIGNsYXNzIHRvDQoJCXJldHVybiAodGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PT0oImxpbmtwYXJlbnQiLnRvTG93ZXJDYXNlKCkpKT8gdGFicmVmLnBhcmVudE5vZGUgOiB0YWJyZWYNCgl9LA0KDQoJdXJscGFyYW1zZWxlY3Q6ZnVuY3Rpb24odGFiaW50ZXJmYWNlaWQpew0KCQl2YXIgcmVzdWx0PXdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cCh0YWJpbnRlcmZhY2VpZCsiPShcXGQrKSIsICJpIikpIC8vY2hlY2sgZm9yICI%2FdGFiaW50ZXJmYWNlaWQ9MiIgaW4gVVJMDQoJCXJldHVybiAocmVzdWx0PT1udWxsKT8gbnVsbCA6IHBhcnNlSW50KFJlZ0V4cC4kMSkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXgsIHdoZXJlIGluZGV4IChpbnQpIGlzIHRoZSBzZWxlY3RlZCB0YWIncyBpbmRleA0KCX0sDQoNCglleHBhbmR0YWI6ZnVuY3Rpb24odGFicmVmKXsNCgkJdmFyIHN1YmNvbnRlbnRpZD10YWJyZWYuZ2V0QXR0cmlidXRlKCJyZWwiKSAvL0dldCBpZCBvZiBzdWJjb250ZW50IHRvIGV4cGFuZA0KCQkvL0dldCAicmV2IiBhdHRyIGFzIGEgc3RyaW5nIG9mIElEcyBpbiB0aGUgZm9ybWF0ICIsam9obixnZW9yZ2UsdHJleSxldGMsIiB0byBlYXNpbHkgc2VhcmNoIHRocm91Z2gNCgkJdmFyIGFzc29jaWF0ZWRyZXZpZHM9KHRhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpKT8gIiwiK3RhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpLnJlcGxhY2UoL1xzKy8sICIiKSsiLCIgOiAiIg0KCQl0aGlzLmV4cGFuZHN1YmNvbnRlbnQoc3ViY29udGVudGlkKQ0KCQl0aGlzLmV4cGFuZHJldmNvbnRlbnQoYXNzb2NpYXRlZHJldmlkcykNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMudGFicy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIGFsbCB0YWJzLCBhbmQgYXNzaWduIG9ubHkgdGhlIHNlbGVjdGVkIHRhYiB0aGUgQ1NTIGNsYXNzICJzZWxlY3RlZCINCgkJCXRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT0odGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIik9PXN1YmNvbnRlbnRpZCk%2FICJzZWxlY3RlZCIgOiAiIg0KCQl9DQoJCWlmICh0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlKSAvL2lmIHBlcnNpc3RlbmNlIGVuYWJsZWQsIHNhdmUgc2VsZWN0ZWQgdGFiIHBvc2l0aW9uKGludCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlkZHRhYmNvbnRlbnQuc2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQsIHRhYnJlZi50YWJwb3NpdGlvbikNCgkJdGhpcy5zZXRjdXJyZW50dGFiaW5kZXgodGFicmVmLnRhYnBvc2l0aW9uKSAvL3JlbWVtYmVyIHBvc2l0aW9uIG9mIHNlbGVjdGVkIHRhYiB3aXRoaW4gaG90dGFic3Bvc2l0aW9uc1tdIGFycmF5DQoJfSwNCg0KCWV4cGFuZHN1YmNvbnRlbnQ6ZnVuY3Rpb24oc3ViY29udGVudGlkKXsNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMuc3ViY29udGVudGlkcy5sZW5ndGg7IGkrKyl7DQoJCQl2YXIgc3ViY29udGVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnN1YmNvbnRlbnRpZHNbaV0pIC8vY2FjaGUgY3VycmVudCBzdWJjb250ZW50IG9iaiAoaW4gZm9yIGxvb3ApDQoJCQlzdWJjb250ZW50LnN0eWxlLmRpc3BsYXk9KHN1YmNvbnRlbnQuaWQ9PXN1YmNvbnRlbnRpZCk%2FICJibG9jayIgOiAibm9uZSIgLy8ic2hvdyIgb3IgaGlkZSBzdWIgY29udGVudCBiYXNlZCBvbiBtYXRjaGluZyBpZCBhdHRyIHZhbHVlDQoJCX0NCgl9LA0KDQoJZXhwYW5kcmV2Y29udGVudDpmdW5jdGlvbihhc3NvY2lhdGVkcmV2aWRzKXsNCgkJdmFyIGFsbHJldmlkcz10aGlzLnJldmNvbnRlbnRpZHMNCgkJZm9yICh2YXIgaT0wOyBpPGFsbHJldmlkcy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIHJldiBhdHRyaWJ1dGVzIGZvciBhbGwgdGFicyBpbiB0aGlzIHRhYiBpbnRlcmZhY2UNCgkJCS8vaWYgYW55IHZhbHVlcyBzdG9yZWQgd2l0aGluIGFzc29jaWF0ZWRyZXZpZHMgbWF0Y2hlcyBvbmUgd2l0aGluIGFsbHJldmlkcywgZXhwYW5kIHRoYXQgRElWLCBvdGhlcndpc2UsIGNvbnRyYWN0IGl0DQoJCQlkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbGxyZXZpZHNbaV0pLnN0eWxlLmRpc3BsYXk9KGFzc29jaWF0ZWRyZXZpZHMuaW5kZXhPZigiLCIrYWxscmV2aWRzW2ldKyIsIikhPS0xKT8gImJsb2NrIiA6ICJub25lIg0KCQl9DQoJfSwNCg0KCXNldGN1cnJlbnR0YWJpbmRleDpmdW5jdGlvbih0YWJwb3NpdGlvbil7IC8vc3RvcmUgY3VycmVudCBwb3NpdGlvbiBvZiB0YWIgKHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkpDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoOyBpKyspew0KCQkJaWYgKHRhYnBvc2l0aW9uPT10aGlzLmhvdHRhYnNwb3NpdGlvbnNbaV0pew0KCQkJCXRoaXMuY3VycmVudFRhYkluZGV4PWkNCgkJCQlicmVhaw0KCQkJfQ0KCQl9DQoJfSwNCg0KCWF1dG9ydW46ZnVuY3Rpb24oKXsgLy9mdW5jdGlvbiB0byBhdXRvIGN5Y2xlIHRocm91Z2ggYW5kIHNlbGVjdCB0YWJzIGJhc2VkIG9uIGEgc2V0IGludGVydmFsDQoJCXRoaXMuY3ljbGVpdCgnbmV4dCcsIHRydWUpDQoJfSwNCg0KCWNhbmNlbGF1dG9ydW46ZnVuY3Rpb24oKXsNCgkJaWYgKHR5cGVvZiB0aGlzLmF1dG9ydW50aW1lciE9InVuZGVmaW5lZCIpDQoJCQljbGVhckludGVydmFsKHRoaXMuYXV0b3J1bnRpbWVyKQ0KCX0sDQoNCglpbml0OmZ1bmN0aW9uKGF1dG9tb2RlcGVyaW9kKXsNCgkJdmFyIHBlcnNpc3RlZHRhYj1kZHRhYmNvbnRlbnQuZ2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQpIC8vZ2V0IHBvc2l0aW9uIG9mIHBlcnNpc3RlZCB0YWIgKGFwcGxpY2FibGUgaWYgcGVyc2lzdGVuY2UgaXMgZW5hYmxlZCkNCgkJdmFyIHNlbGVjdGVkdGFiPS0xIC8vQ3VycmVudGx5IHNlbGVjdGVkIHRhYiBpbmRleCAoLTEgbWVhbmluZyBub25lKQ0KCQl2YXIgc2VsZWN0ZWR0YWJmcm9tdXJsPXRoaXMudXJscGFyYW1zZWxlY3QodGhpcy50YWJpbnRlcmZhY2VpZCkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXggZnJvbTogdGFiY29udGVudC5odG0%2FdGFiaW50ZXJmYWNlaWQ9aW5kZXgNCgkJdGhpcy5hdXRvbW9kZXBlcmlvZD1hdXRvbW9kZXBlcmlvZCB8fCAwDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLnRhYnMubGVuZ3RoOyBpKyspew0KCQkJdGhpcy50YWJzW2ldLnRhYnBvc2l0aW9uPWkgLy9yZW1lbWJlciBwb3NpdGlvbiBvZiB0YWIgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIikpew0KCQkJCXZhciB0YWJpbnN0YW5jZT10aGlzDQoJCQkJdGhpcy5ob3R0YWJzcG9zaXRpb25zW3RoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGhdPWkgLy9zdG9yZSBwb3NpdGlvbiBvZiAiaG90IiB0YWIgKCJyZWwiIGF0dHIgZGVmaW5lZCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQkJdGhpcy5zdWJjb250ZW50aWRzW3RoaXMuc3ViY29udGVudGlkcy5sZW5ndGhdPXRoaXMudGFic1tpXS5nZXRBdHRyaWJ1dGUoInJlbCIpIC8vc3RvcmUgaWQgb2Ygc3ViIGNvbnRlbnQgKCJyZWwiIGF0dHIgdmFsdWUpDQoJCQkJdGhpcy50YWJzW2ldLm9uY2xpY2s9ZnVuY3Rpb24oKXsNCgkJCQkJdGFiaW5zdGFuY2UuZXhwYW5kdGFiKHRoaXMpDQoJCQkJCXRhYmluc3RhbmNlLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCQkJCXJldHVybiBmYWxzZQ0KCQkJCX0NCgkJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmV2IikpeyAvL2lmICJyZXYiIGF0dHIgZGVmaW5lZCwgc3RvcmUgZWFjaCB2YWx1ZSB3aXRoaW4gInJldiIgYXMgYW4gYXJyYXkgZWxlbWVudA0KCQkJCQl0aGlzLnJldmNvbnRlbnRpZHM9dGhpcy5yZXZjb250ZW50aWRzLmNvbmNhdCh0aGlzLnRhYnNbaV0uZ2V0QXR0cmlidXRlKCJyZXYiKS5zcGxpdCgvXHMqLFxzKi8pKQ0KCQkJCX0NCgkJCQlpZiAoc2VsZWN0ZWR0YWJmcm9tdXJsPT1pIHx8IHRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHBhcnNlSW50KHBlcnNpc3RlZHRhYik9PWkgfHwgIXRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT09InNlbGVjdGVkIil7DQoJCQkJCXNlbGVjdGVkdGFiPWkgLy9TZWxlY3RlZCB0YWIgaW5kZXgsIGlmIGZvdW5kDQoJCQkJfQ0KCQkJfQ0KCQl9IC8vRU5EIGZvciBsb29wDQoJCWlmIChzZWxlY3RlZHRhYiE9LTEpIC8vaWYgYSB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIHRhYiBpbmRleCBpcyBmb3VuZA0KCQkJdGhpcy5leHBhbmR0YWIodGhpcy50YWJzW3NlbGVjdGVkdGFiXSkgLy9leHBhbmQgc2VsZWN0ZWQgdGFiIChlaXRoZXIgZnJvbSBVUkwgcGFyYW1ldGVyLCBwZXJzaXN0ZW50IGZlYXR1cmUsIG9yIGNsYXNzPSJzZWxlY3RlZCIgY2xhc3MpDQoJCWVsc2UgLy9pZiBubyB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIGluZGV4IGZvdW5kDQoJCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zWzBdXSkgLy9KdXN0IHNlbGVjdCBmaXJzdCB0YWIgdGhhdCBjb250YWlucyBhICJyZWwiIGF0dHINCgkJaWYgKHBhcnNlSW50KHRoaXMuYXV0b21vZGVwZXJpb2QpPjUwMCAmJiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoPjEpew0KCQkJdGhpcy5hdXRvcnVudGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXt0YWJpbnN0YW5jZS5hdXRvcnVuKCl9LCB0aGlzLmF1dG9tb2RlcGVyaW9kKQ0KCQl9DQoJfSAvL0VORCBpbnQoKSBmdW5jdGlvbg0KDQp9IC8vRU5EIFByb3RvdHlwZSBhc3NpZ25tZW50"
  }).appendChild(document.createTextNode(
    '/***********************************************\n' +
    '* Tab Content script v2.2- © Dynamic Drive DHTML code library (www.dynamicdrive.com)\n' +
    '* This notice MUST stay intact for legal use\n' +
    '* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code\n' +
    '***********************************************/\n'
  ));
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript'}).appendChild(document.createTextNode(
    'var statTabs=new ddtabcontent("sWindowTabNav"); //enter ID of Tab Container\n' +
    'statTabs.setpersist(true); //toogle persistence of the tabs\' state\n' +
    'statTabs.setselectedClassTarget("linkparent"); //"link" or "linkparent"\n' +
    'statTabs.init();'
  ));
  DEBUG('Stat Menu Created.');
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function clickStats() {
  if (this.checked) {
    // check to ensure at least one radio box is checked
    // enable energy by default
    if (document.getElementById('autoStatAttack').checked === false && document.getElementById('autoStatDefense').checked === false &&
        document.getElementById('autoStatEnergy').checked === false && document.getElementById('autoStatHealth').checked === false &&
        document.getElementById('autoStatStamina').checked === false) {
      document.getElementById('autoStatEnergy').checked = true;
    }
  }
}

function clickAutoPause() {
  if (this.checked) {
    // check to ensure at least one radio box is checked
    // enable Before level up by default
    if (document.getElementById('autoPauseBefore').checked === false &&
        document.getElementById('autoPauseAfter').checked === false) {
      document.getElementById('autoPauseBefore').checked = true;
    }
  }
}

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function $x(p, c) {
  var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while (i = x.iterateNext()) r.push(i);
  return r;
}

window.addEventListener( 'load', function( e ) {

  if (document.body.innerHTML.indexOf('Try Again') >= 0) {
    // error
    window.setTimeout(function() {
      window.history.go(0);
    }, 2*60*1000);
    DEBUG('Reloading from Try Again error.');
    return;
  }
}, false);

function ignoreElement(element) {
  var parentElt = element.parentNode;
  if (parentElt) {
    var id = parentElt.id;
    if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
      return true;
  }

  var id = element.id;
  if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
    return true;

  return false;
}

function logElement(element, heading) {
  if (!element) return;

  // Write information about the element to the javascript console.
  var elt = element;
  GM_log((heading? heading + ' ' : '') +
         'tag=' + elt.tagName +
         ', id=' + elt.id +
         ', class=' + elt.className +
         ', value=' + elt.nodeValue
  );
  elt = element.parentNode;
  if (elt) {
    GM_log((heading? heading + ' ' : '') +
           'parent tag=' + elt.tagName +
           ', id=' + elt.id +
           ', class=' + elt.className +
           ', value=' + elt.nodeValue
    );
  }
}

function handleModificationTimer() {
  // The timer has gone off, so assume that page updates have finished.
  //GM_log('Changes finished.');
  modificationTimer = undefined;

  if (!document.getElementById(SCRIPT.appID + '_mw_masthead')) return;

  refreshGlobalStats();
  refreshSettings();

  // Find the visible inner page.
  var pageChanged = false;
  var prevPageElt = innerPageElt;
  var contentRowElt = document.getElementById(SCRIPT.appID + '_content_row');
  var result = xpath('./*[contains(@id, "' + SCRIPT.appID + '_inner_page")]', contentRowElt);
  for (var i = 0; i < result.snapshotLength; i++) {
    var elt = result.snapshotItem(i);
    if (elt.style.display != 'none') {
      innerPageElt = elt;
      break;
    }
  }
  if (!innerPageElt) return;

  // Make sure our private AJAX page exists and isn't visible.
  var ajaxID = SCRIPT.appID + '_' + SCRIPT.ajaxPage;
  var elt = xpathFirst('//div[@id="' + ajaxID + '"]');
  if (!elt) {
    elt = makeElement('div', innerPageElt.parentNode, {'id':ajaxID});
  }
  elt.style.display = 'none';

  // Determine if the displayed page has changed.
  if (!xpathFirst('./div[@id="ap_inner"]', innerPageElt)) {
    setListenContent(false);
    makeElement('div', innerPageElt, {'id':'ap_inner', 'style':'display: none'});
    setListenContent(true);
    DEBUG('New inner page content: ' + innerPageElt.id);
    pageChanged = true;
  } else if (prevPageElt != innerPageElt) {
    DEBUG('Switched inner page to:' + innerPageElt.id);
    pageChanged = true;
  }

  // Handle changes to the inner page.
  if (pageChanged) {
    try {
      innerPageChanged();
    } catch(ex) {
      addToLog('warning Icon', ex);
    }
  }
}

function setModificationTimer() {
  if (modificationTimer) window.clearTimeout(modificationTimer);
  modificationTimer = window.setTimeout(handleModificationTimer, 500);
  //GM_log('Modification timer set.');
}

function handleDOMSubtreeModified(e) {
  if (ignoreElement(e.target)) return;
  logElement(e.target, 'subtree');
}

function handleContentModified(e) {
  if (ignoreElement(e.target)) return;
  //logElement(e.target, 'content');
  setModificationTimer();
}

function handlePublishNotificationsInternal(e) {
  //if (!ignoreElement(e.target)) logElement(e.target, 'handlePublishNotifications');

  var popup = e.target;

  if (popup.id == 'pop_content') {
    // Close "No Network" popups.
    if (popup.innerHTML.match(/no network/i)) {
      var elt = xpathFirst('.//input[@value="Okay"]', popup);
      if (elt) {
        clickElement(elt);
        DEBUG('Clicked to skip network popup.');
      }
    }

    var skipPost = xpathFirst('.//input[@value="Skip"]', popup);
    if (skipPost) {
      // Gift skipping.
      var giftCheck = xpathFirst('.//div[@class="CopyTitle" and contains(text(), "sent")]/a[contains(@href, "sendgiftshort")]', popup);
      if (giftCheck && GM_getValue('autoGiftSkipOpt') == 'checked') {
        clickElement(skipPost);
        DEBUG('Clicked to skip gift publishing.');
        return;
      }

      // Job Help skipping.
      var jobHelpCheck = xpathFirst('.//div[@class="CopyTitle" and contains(text(),"requested help")]', popup);
      if (jobHelpCheck && GM_getValue('autoAskJobHelp') == 'checked') {
        var msg = GM_getValue('autoAskJobHelpMessage');
        var msgElt = document.getElementById("feedform_user_message");
        var publishPost = xpathFirst('.//input[@value="Publish"]', popup);
        if (msg && msgElt && publishPost) {
          msgElt.value = msg;
          clickElement(publishPost);
          DEBUG('Clicked to publish job help request.');
          return;
        } else {
          clickElement(skipPost);
          DEBUG('Clicked to skip job help request publishing.');
          return;
        }
      }

      // Lotto skipping.
      var lottoCheck = xpathFirst('.//div[@class="CopyTitle"]/text()[contains(., "prizes are given away each week")]', popup);
      if (lottoCheck && GM_getValue('autoLottoOpt') == 'checked') {
        clickElement(skipPost);
        DEBUG('Clicked to skip lotto publishing.');
        return;
      }
    }
  }
}

function handlePublishNotifications(e) {
  // Wrapping the call with setTimeout is necessary to make Greasemonkey
  // API calls available (such as GM_getValue).
  setTimeout(function() { handlePublishNotificationsInternal(e) }, 0);
}

function handleFBNotificationsInternal(e) {
  //logElement(e.target, 'handleFBNotifications');

  var parentElt = e.target.parentNode;
  if (!parentElt) return;

  // Watch for sent notifications and get rid of some of them.
  if (parentElt.className == 'Beeps') {
    filterNotifications(e.target);
  }
}

function handleFBNotifications(e) {
  // Wrapping the call with setTimeout is necessary to make Greasemonkey
  // API calls available (such as GM_getValue).
  setTimeout(function() { handleFBNotificationsInternal(e) }, 0);
}

// Turns on/off the high-level event listener for the game.
function setListenContent(on) {
  var elt = document.getElementById('app_content_10979261223');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMSubtreeModified', handleContentModified, false);
  } else {
    elt.removeEventListener('DOMSubtreeModified', handleContentModified, false);
  }
}

// Turns on/off the event listener for publish pop-ups.
function setListenAutoSkip(on) {
  if (!document.body) return;
  if (on) {
    document.body.addEventListener('DOMNodeInserted', handlePublishNotifications, false);
  } else {
    document.body.removeEventListener('DOMNodeInserted', handlePublishNotifications, false);
  }
}

// Turns on/off the event listener for Facebook notifications.
function setListenFBNotifications(on) {
  var elt = document.getElementById('presence_bar_right');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMNodeInserted', handleFBNotifications, false);
  } else {
    elt.removeEventListener('DOMNodeInserted', handleFBNotifications, false);
  }
}

// Turns on/off the event listener for the stats section of the page.
function setListenStats(on) {
  var elt = document.getElementById(SCRIPT.appID + '_game_stats');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMNodeInserted', statsInserted, false);
  } else {
    elt.removeEventListener('DOMNodeInserted', statsInserted, false);
  }
}

function statsInserted(e) {
  //if (!ignoreElement(e.target)) logElement(e.target, 'statsInserted');

  // Check for a change in a particular statistic. This is where we'll
  // notice some types of changes that happen without user or script
  // actions, such as earning energy.
  var parentElt = e.target.parentNode;
  if (!parentElt) return;
  if (parentElt == energyElt) {
    energy = parseInt(e.target.nodeValue);
    energyElt.style.textDecoration = (energy == maxEnergy)? 'blink' : 'none';
    setLevelUpRatio();
  } else if (parentElt == staminaElt) {
    stamina = parseInt(e.target.nodeValue);
    staminaElt.style.textDecoration = (stamina == maxStamina)? 'blink' : 'none';
  } else if (parentElt == cashNYElt && city == NY) {
    cash[NY] = parseCash(e.target.nodeValue);
  } else if (parentElt == cashCubaElt && city == CUBA) {
    cash[CUBA] = parseCash(e.target.nodeValue);
  } else if (parentElt == healthElt) {
    // NOTE: At one time, health was updated on with a timer. Leave
    //       this here in case it goes back to being that way.
    health = parseInt(e.target.nodeValue);
    healthElt.style.textDecoration = (health > 19 && health < 29)? 'blink' : 'none';
  }
}

function innerPageChanged() {
  // Reset auto-reload (if enabled).
  autoReload();

  // Don't watch while making customizations.
  setListenContent(false);

  customizeMasthead();
  customizeStats();
  customizeNames();
  customizeHome();
  customizeProfile();
  customizeJobs();
  customizeFight();
  customizeHitlist();

  // Property
  if (onPropertyNav()) {
    propertyGetDamage(innerPageElt);
    propertyGet();
  }

  // Customizations finished.
  setListenContent(true);

  // Check for deleted news.
  if (xpathFirst('.//td[text()="News deleted"]', innerPageElt)) {
    addToLog('info Icon', 'The player updates were cleared.');
    GM_setValue('logPlayerUpdatesCount', 0);
  }

  // If a click action was taken, check the response.
  if (clickAction) {
    var action = clickAction;
    var context = clickContext;
    clickAction = undefined;
    clickContext = undefined;
    if (!logResponse(innerPageElt, action, context)) {
      // No further action was taken. Kick off auto-play.
      doAutoPlay();
    }
  } else {
    // Kick off auto-play.
    doAutoPlay();
  }
}

function refreshGlobalStats() {
  var cityElt = document.getElementById(SCRIPT.appID + '_mw_city_wrapper');
  if (!cityElt) return false;

  // Set all the element globals. They change.
  cashNYCElt = document.getElementById(SCRIPT.appID+'_user_cash_nyc');
  cashCubaElt = document.getElementById(SCRIPT.appID+'_user_cash_cuba');
  healthElt = document.getElementById(SCRIPT.appID+'_user_health');
  maxHealthElt = document.getElementById(SCRIPT.appID+'_user_max_health');
  energyElt = document.getElementById(SCRIPT.appID+'_user_energy');
  maxEnergyElt = document.getElementById(SCRIPT.appID+'_user_max_energy');
  staminaElt = document.getElementById(SCRIPT.appID+'_user_stamina');
  maxStaminaElt = document.getElementById(SCRIPT.appID+'_user_max_stamina');
  levelElt = document.getElementById(SCRIPT.appID+'_user_level');
  curExpElt = document.getElementById(SCRIPT.appID+'_user_experience');
  lvlExpElt = document.getElementById(SCRIPT.appID+'_exp_for_next_level');

  // Update basic player information.
  city = (cityElt.className == 'mw_city1')? NY : CUBA;
  if (city == NY) {
    cash[NY] = parseCash(cashNYCElt.innerHTML);
  } else {
    cash[CUBA] = parseCash(cashCubaElt.innerHTML);
  }
  health = parseInt(healthElt.innerHTML);
  maxHealth = parseInt(maxHealthElt.innerHTML);
  energy = parseInt(energyElt.firstChild.nodeValue);
  maxEnergy = parseInt(maxEnergyElt.innerHTML);
  stamina = parseInt(staminaElt.firstChild.nodeValue);
  maxStamina = parseInt(maxStaminaElt.innerHTML);
  level = parseInt(levelElt.innerHTML);
  curExp = parseInt(curExpElt.innerHTML);
  lvlExp = parseInt(lvlExpElt.innerHTML);
  ptsToNextLevel = lvlExp - curExp;

  // Get the mafia size and pending invites.
  // NOTE: Using contains() for compatibility with "Exp Remaining" script.
  var mafiaLinks = xpath('//div[contains(@class, "mafia_link")]/a');
  mafia = mafiaLinks.snapshotItem(1);
  mafia = document.getElementById(SCRIPT.appID + '_user_group_size');
  if (mafia) {
    mafia = parseInt(mafia.innerHTML);
  }
  if (!mafia || mafia < 1) {
    addToLog('warning Icon', 'BUG DETECTED: Unable to read mafia size.');
  }
  invites = mafiaLinks.snapshotItem(2);
  if (invites) {
    invites = invites.innerHTML.split('+')[1];
    if (invites) {
      invites = parseInt(invites);
      if (isNaN(invites)) {
        addToLog('warning Icon', 'BUG DETECTED: Unable to read invites.');
        invites = 0;
      }
    }
  }
  if (!invites) {
    invites = 0;
  }

  // Get the skill points waiting to be spent.
  var skillElt = document.getElementById(SCRIPT.appID+'_user_skill');
  if (skillElt) {
    stats = parseInt(skillElt.innerHTML);
    if (isNaN(stats)) {
      stats = 0;
    }
  } else {
    stats = 0;
  }

  // Show congratulations if level has increased.
  if (running && level > GM_getValue('currentLevel')) {
    GM_setValue('currentLevel', level);
    addToLog('experience Icon', '<span style="color:#00FFCC;"> Congratulations on reaching level <strong>' + level + '</strong>!</span>');
  }

  // Trick auto-buy into checking the property page if mafia has grown.
  if (running && mafia && mafia != GM_getValue('currentMafia')) {
    GM_setValue('currentMafia', mafia);
    GM_setValue('buyCost', 1);
  }

  //ATK
  // Check if hourly stats need updating.
  if (GM_getValue('hourlyStatsOpt') == 'checked') {
    var currentTime = new Date();
    if (GM_getValue('hourOfDay') != currentTime.getHours()) {
      updateHourlyStats();
    }
  }

  return true;
}

function refreshSettings() {
  // Determine the minimum stamina to keep on hand.
  staminaFloor = (maxStamina * (1 - parseInt(GM_getValue('selectStaminaKeep', 0)) * .10)).toFixed(0);
  if (staminaFloor >= maxStamina) {
    // Subtract one or else fight/rob will never run.
    staminaFloor--;
  }
  if (GM_getValue('staminaSpend') == 'checked') {
    if (staminaFloor == 0 &&
        GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHT_RANDOM &&
        GM_getValue('fightStealth') == 'checked') {
      // Stealth mode requires 2+ stamina to work properly.
      staminaFloor = 1;
    }
    if (running && staminaFloor != GM_getValue('staminaFloorLast')) {
      GM_setValue('staminaFloorLast', staminaFloor);
      if (staminaFloor > 1) {
        addToLog('info Icon', staminaIcon + '<span style="color:#04B4AE;";> Stamina is set to keep above <strong>' + staminaFloor + '</strong>.</span>');
      }
    }
  }

  // Set if auto-burn can be used.
  autoStamBurnif = GM_getValue('allowStaminaToLevelUp') == 'checked' &&
                   ptsToNextLevel < stamina * getStaminaGainRate() +
                                    energy * getEnergyGainRate();

  // Auto-pause reset
  if (GM_getValue('autoPauseActivated') === true &&
      GM_getValue('autoPauseBefore') == 'checked' &&
      GM_getValue('autoPauselvlExp') < lvlExp) {
    GM_setValue('autoPauselvlExp', lvlExp);
    GM_setValue('autoPauseActivated', false);
  }

  // Auto-pause logic
  if (running && GM_getValue('autoPause') == 'checked') {
    if (GM_getValue('autoPauseBefore') == 'checked' &&
        GM_getValue('autoPauseExp', '') >= lvlExp - curExp &&
        GM_getValue('autoPauseActivated', false) === false) {
      addToLog('pause Icon', 'Auto-pause in effect. Experience threshold reached.');
      GM_setValue('autoPauseActivated', true);
      pause();
    } else if (GM_getValue('autoPauseAfter') == 'checked' &&
               GM_getValue('autoPauselvlExp', '') < lvlExp) {
      addToLog('pause Icon', 'Auto-pause in effect. Leveled up.');
      GM_setValue('autoPauselvlExp', lvlExp);
      pause();
    }
  }
}

function getStaminaGainRate() {
  var expGained    = GM_getValue('totalExpInt', 0);
  var staminaSpent = GM_getValue('fightWinCountInt', 0) +
                     GM_getValue('fightLossCountInt', 0) +
                     GM_getValue('robWinCountInt', 0) +
                     GM_getValue('robLossCountInt', 0);
  if (!expGained || !staminaSpent) return 0;

  return expGained / staminaSpent;
}

function getEnergyGainRate() {
  var rate = parseFloat(GM_getValue('estimateJobRatio', '1.0'));
  return rate? rate : 0;
}

function checkLanguage() {
  if (document.documentElement.lang == 'en') return;

  DEBUG('Language is "' + document.documentElement.lang + '".');
  DEBUG('Unfortunately, only the English version of the game is fully supported. If you experience problems, set your Facebook language to English and try again.');
}

function customizeLayout() {
  // Left align.
  if (GM_getValue('leftAlign') == 'checked') {
    var mainFrame = xpathFirst('//div[@class="UIStandardFrame_Container clearfix"]');
    if (mainFrame) {
      mainFrame.setAttribute("style", "margin:0", 0);
    }
  }

  // Deal with ads.
  if (GM_getValue('hideAds') == 'checked') {
    var adsTop = xpathFirst('//iframe[contains(@src, "zbar")]');
    if (adsTop) {
      adsTop.setAttribute("style", "margin:0; height:0; display:none", 0);
    }
    var adsRight = xpathFirst('//div[@class="UIStandardFrame_SidebarAds"]');
    if (adsRight) {
      adsRight.setAttribute("style", "margin:0; height:0; display:none", 0);
    }
  }

  // Deal with the email bar.
  if (GM_getValue('moveEmailBar') == 'checked') {
    var emailBar = xpathFirst('//table[@class="fb_email_prof_header"]');
    var layoutElt = xpathFirst('//div[@class="UIStandardFrame_Content"]');
    if (emailBar && layoutElt)
      layoutElt.appendChild(emailBar);
  }
}

function customizeMasthead() {
  if (document.getElementById('ap_menu')) return;

  // Get the masthead.
  var mastheadElt = document.getElementById(SCRIPT.appID + '_mw_masthead');
  if (!mastheadElt) return;

  // Move the travel button.
  var elt = xpathFirst('.//*[@class="sexy_travel"]', mastheadElt);
  while (elt && elt.tagName != 'DIV') {
    elt = elt.parentNode;
  }
  if (elt) {
    elt.style.top='25px';
    elt.style.left='481px';
  }

  // Set custom styles with CSS.
  if(!document.getElementById('nodeInsertedCss')) {
    makeElement('style', document.getElementsByTagName('head')[0], {'id':'nodeInsertedCss', 'type':'text/css'}).appendChild(document.createTextNode(
      '#ap_menu span:hover{text-decoration:underline}'+
      '#ap_menu span{position: absolute; left: 320px; font-family: tahoma; font-size: 10pt; font-weight: 600;cursor: pointer; color: rgb(255, 217, 39)}' +
      '.ap_optgroup1 {background-color: #FFD927; text-align: center;}' +
      '.ap_optgroup2 {background-color: #CCCCCC;}'
    ));
  }

  // Make a container for the autoplayer menu.
  var menuElt = makeElement('div', mastheadElt, {'id':'ap_menu'});

  // Settings Link
  var lobjAutoPlay = makeElement('span', menuElt, {'id':'autoPlay', 'style':'top: 3px'});
    lobjAutoPlay.appendChild(document.createTextNode('AutoPlay settings'));
    lobjAutoPlay.addEventListener('click', toggleSettings, false);

  // Show resume or paused based on if we are running or not.
  updateMastheadMenu();

  // View log button.
  var lobjViewLogButton = makeElement('span', menuElt, {'style':'top: 35px'});
    lobjViewLogButton.appendChild(document.createTextNode('view mafia log'));
    lobjViewLogButton.addEventListener('click', showMafiaLogBox, false);
}

function customizeStats() {
  // Don't watch the stats area while we're making changes to it.
  setListenStats(false);

  // Make health icon clickable for instant healing.
  var healLinkElt = document.getElementById('ap_heal');
  var healImgElt = xpathFirst('//img[@alt="Health"]');
  if (healImgElt && !healLinkElt) {
    healLinkElt = makeElement('a', null, {'id':'ap_heal', 'title':'Click to heal immediately.'})
    healImgElt.parentNode.insertBefore(healLinkElt, healImgElt);
    healLinkElt.appendChild(healImgElt);
  }
  if (healLinkElt) {
    healLinkElt.href = 'http://apps.facebook.com/' + SCRIPT.name +
                       SCRIPT.controller + 'hospital' +
                       SCRIPT.action + 'heal' +
                       SCRIPT.city + (city + 1);

    // Substitute the "hide" icon if currently hiding in the hospital.
    var hideImgElt = healLinkElt.childNodes[1];
    if (running && healImgElt && health < 20 &&
        GM_getValue('hideInHospital') == 'checked') {
      healImgElt.style.display = 'none';
      if (!hideImgElt) {
        hideImgElt = makeElement('img', healLinkElt, {'class':'icon', 'width':'16', 'height':'16', 'title':'Currently hiding in the hospital. Click to heal immediately.', 'src':stripURI(hideIcon)});
      }
      hideImgElt.style.display = '';
    } else if (hideImgElt) {
      hideImgElt.style.display = 'none';
      healImgElt.style.display = '';
    }

    // Substitute AJAX navigation if code is available.
    var hospitalElt = xpathFirst('//a[@class="heal_link"]');
    if (hospitalElt) {
      healLinkElt.setAttribute("onclick", hospitalElt.getAttribute("onclick").replace(/view/, 'heal'));
      if (!running) {
        // Make instant heal work without switching pages.
        healLinkElt.setAttribute("onclick", healLinkElt.getAttribute("onclick").replace(/'inner_page'/, "'" + SCRIPT.ajaxPage + "'"));
      }
    }
  }

  // Show points until next level.
  // FIXME: Assumes English.
  var elt = xpathFirst('//span[@class="stat_title" and contains(text(), "Experience")]');
  if (elt) {
    elt.innerHTML = 'Experience (' + (ptsToNextLevel > 0? '-' : '+') +
                    Math.abs(ptsToNextLevel) + ')';
  }

  // Blink maxed out energy or stamina.
  energyElt.style.textDecoration = (energy == maxEnergy)? 'blink' : 'none';
  staminaElt.style.textDecoration = (stamina == maxStamina)? 'blink' : 'none';

  // Blink dangerous health levels.
  healthElt.style.textDecoration = (health > 19 && health < 29)? 'blink' : 'none';

  setListenStats(true);
}

function customizeNames() {
  var elts = $x('.//a[contains(@onclick, "controller=stats") and contains(@onclick, "action=view")]', innerPageElt);
  for (var i = 0; i < elts.length; i++) {
    if (!elts[i].innerHTML.trim()) {
      if (elts[i].getAttribute('onclick').match(/user=(\d+)/)) {
        elts[i].innerHTML = chickenIcon + ' Chicken ' + RegExp.$1;
      } else {
        elts[i].innerHTML = chickenIcon + ' Chicken';
      }
    }
  }

  var elts = $x('.//span[contains(@id, "_fight_view_name_")]', innerPageElt);
  for (var i = 0; i < elts.length; i++) {
    if (!elts[i].innerHTML.untag().trim()) {
      elts[i].innerHTML = chickenIcon + ' Chicken';
    }
  }
}

function customizeHome() {
  if (!onHome()) return;

  // Is an energy pack waiting to be used?
  energyPackElt = xpathFirst('.//span[@class="sexy_pack_use" and contains(text(), "Use energy pack")]', innerPageElt);
  energyPack = energyPackElt? true : false;

  // Display a message next to the energy pack button.
  if (energyPackElt) {
    var energyGainRate = getEnergyGainRate();
    var ptsFromEnergyPack = maxEnergy * 1.25 * energyGainRate;
    var ptsNeeded = ptsToNextLevel - energy * energyGainRate -
                    stamina * getStaminaGainRate();
    var txt = ' XP from Energy Pack = ' + parseInt(ptsFromEnergyPack) +
              ', Projected XP needed = ' + parseInt(ptsNeeded);
    var linkElt = energyPackElt.parentNode;
    linkElt.parentNode.appendChild(document.createElement('br'));
    linkElt.parentNode.appendChild(document.createTextNode(txt));
  }
}

function customizeProfile() {
  // Extra options for the profile page.
  var statsDiv = xpathFirst('.//td[@class="stats_left"]/div', innerPageElt);
  if (statsDiv) {
    statsDiv.innerHTML.match(/opponent_id=(\d+)/);
    var id = RegExp.lastParen;
    if (id) {
      makeElement('br', statsDiv);
      makeElement('a', statsDiv, {'href':'http://www.facebook.com/profile.php?id=' + id}).appendChild(document.createTextNode('Facebook Profile'));
      statsDiv.appendChild(document.createTextNode(' | '));
      makeElement('a', statsDiv, {'href':'http://www.facebook.com/addfriend.php?id=' + id}).appendChild(document.createTextNode('Add as Friend'));
      statsDiv.appendChild(document.createTextNode(' | '));
      makeElement('a', statsDiv, {'href':'http://apps.facebook.com/' + SCRIPT.name + '/status_invite.php?from=' + id}).appendChild(document.createTextNode('Add to Mafia'));
      statsDiv.appendChild(document.createTextNode(' | '));
      makeElement('a', statsDiv, {'href':'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'group' + SCRIPT.action + 'view' + SCRIPT.city + (city + 1) + '&promote=yes&uid=' + id}).appendChild(document.createTextNode('Promote'));
      makeElement('br', statsDiv);
      var el = makeElement('a', statsDiv, {'id':id});
      var fightList = getSavedList('fightList');
      if (fightList.indexOf(id) != -1) {
        el.appendChild(document.createTextNode('Remove from Fight List'));
        el.addEventListener('click', clickFightListRemove, false);
      } else {
        el.appendChild(document.createTextNode('Add to Fight List'));
        el.addEventListener('click', clickFightListAdd, false);
      }
      statsDiv.appendChild(document.createTextNode(' | '));
      var el = makeElement('a', statsDiv, {'id':id});
      var robList = getSavedList('robList');
      if (robList.indexOf(id) != -1) {
        el.appendChild(document.createTextNode('Remove from Rob List'));
        el.addEventListener('click', clickRobListRemove, false);
      } else {
        el.appendChild(document.createTextNode('Add to Rob List'));
        el.addEventListener('click', clickRobListAdd, false);
      }

      makeElement('br', statsDiv);
      el = makeElement('a', statsDiv, {'id':'gift' + id});
      el.appendChild(document.createTextNode('Add as gift recipient'));
      el.addEventListener('click', saveRecipientInfo, false);

      statsDiv.appendChild(document.createTextNode(' | '));
      makeElement('a', statsDiv, {'href':'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'group' + SCRIPT.action + 'energy' + SCRIPT.city + (city + 1) + '&fid=' + id}).appendChild(document.createTextNode('Send Energy Pack'));
    }
  }

  // Other profile customizations: add counts of weapons, armor, and
  // vehicles if on our own profile page.
  var currentPageText = xpath('.//ul[@class="nice_list items_list clearfix"]', innerPageElt);
  var otherPerson = xpath('.//span[@class="levels"]', innerPageElt);
  if ((otherPerson.snapshotLength > 0) && (otherPerson.snapshotLength < 5)) {
    for (zz = 0; zz < otherPerson.snapshotLength; zz++) {
      if ((otherPerson.snapshotItem(zz).innerHTML == '(Your Character)') && (currentPageText.snapshotLength > 0)) {
        profileFix();
        break;
      }
    }
  }
}

function customizeJobs() {
  // Extras for jobs pages.
  var jobTable = xpathFirst('.//table[@class="job_list"]', innerPageElt);
  if (!jobTable) return;

  // Display an experience to energy payoff ratio for each job.
  var bestJobs = [], worstJobs = [];
  var bestRatio = 0, worstRatio = 10;
  var energies = xpath('.//td[@class="job_energy"]/span[@class="bold_number"]', innerPageElt);
  var rewards = xpath('.//td[@class="job_reward"]/span[@class="bold_number"]', innerPageElt);
  var jobButton = xpath('.//td[@class="job_action"]', innerPageElt);
  for (var i = 0; i < energies.snapshotLength; i++) {
    elt = energies.snapshotItem(i);
    var cost = parseInt(elt.firstChild.nodeValue);
    var reward = parseInt(rewards.snapshotItem(i).firstChild.nodeValue);
    var ratio = Math.round(reward / cost * 100) / 100;
    makeElement('br', elt.parentNode);
    makeElement('span', elt.parentNode, {'style':'color:#666666; font-size: 11px'}).appendChild(document.createTextNode('Pays ' + ratio + 'x'));

    // Keep track of the best & worst payoffs.
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestJobs = [elt];
    } else if (ratio == bestRatio) {
      bestJobs.push(elt);
    }
    if (ratio < worstRatio) {
      worstRatio = ratio;
      worstJobs = [elt];
    } else if (ratio == worstRatio) {
      worstJobs.push(elt);
    }

    // Calculate time left for each job and display under the do job button
    var timePerEnergy = GM_getValue('isManiac') == 'checked' ? 3 : 5;
    timePerEnergy = GM_getValue('hasHelicopter') == 'checked' ? timePerEnergy - .5: timePerEnergy;
    timePerEnergy = GM_getValue('hasGoldenThrone') == 'checked' ? timePerEnergy/2: timePerEnergy;
    if (cost > energy) {
      jobTimeLeft = (cost - energy) * timePerEnergy;
      if (jobTimeLeft < 60)
        jobTimeLeftText = 'Time: < ' + (Math.round((jobTimeLeft) * 10) / 10) + ' min';
      else {
        jobTimeLeft = Math.round((jobTimeLeft/60) * 100) / 100;
        if (jobTimeLeft < 24)
          jobTimeLeftText = 'Time: < ' + jobTimeLeft + ' hr';
        else
          jobTimeLeftText = 'Time: < ' + Math.round(jobTimeLeft/24) + ' days';
      }
    } else {
      jobTimeLeftText = 'Time: 0 min';
    }
    makeElement('br', jobButton.snapshotItem(i));
    makeElement('span', jobButton.snapshotItem(i), {'style':'color:#666666; font-size: 11px'}).appendChild(document.createTextNode(jobTimeLeftText));
  }

  // Highlight the best and worst jobs.
  if (worstRatio != bestRatio) {
    while (bestJobs.length) {
      elt = bestJobs.pop().parentNode;
      makeElement('br', elt);
      elt = makeElement('span', elt, {'style':'color:#52E259; font-size: 11px'});
      makeElement('img', elt, {'src':stripURI(goodIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      elt.appendChild(document.createTextNode(' BEST'));
    }
    while (worstJobs.length) {
      elt = worstJobs.pop().parentNode;
      makeElement('br', elt);
      elt = makeElement('span', elt, {'style':'color:#EC2D2D; font-size: 11px'});
      makeElement('img', elt, {'src':stripURI(badIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      elt.appendChild(document.createTextNode(' WORST'));
    }
  }

  // Show the experience to energy ratio needed to level up.
  elt = makeElement('div', null, {'id':'level_up_ratio', 'style':'text-align:center; display:none'});
  makeElement('img', elt, {'src':stripURI(infoIcon), 'style':'vertical-align:middle'});
  elt.appendChild(document.createTextNode(''));
  jobTable.parentNode.insertBefore(elt, jobTable);
  setLevelUpRatio();
}

function customizeFight() {
  var opponents = getDisplayedOpponents(innerPageElt, true);
  if (!opponents) return false;

  // Customize the opponent list.
  var blacklist = getSavedList('fightListAvoid');
  for (var i = 0; i < opponents.length; i++) {
    var opponent = opponents[i];
    if (!opponent.profile || !opponent.id) continue;

    // Mark targets that should be avoided.
    if (blacklist.indexOf(opponent.id) != -1) {
      var parentElt = opponent.profile.parentNode;
      var elt = makeElement('img', null, {'src':stripURI(badIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already lost to this opponent during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }
  }
}

function customizeHitlist() {
  // Extras for hitlist.
  if (!onHitlistTab()) return;

  // Get the displayed opponents.
  var opponents = getHitlist(innerPageElt, true);
  if (!opponents) return false;

  // Customize the opponent list.
  var blacklist = getSavedList('hitmanListAvoid').concat(getSavedList('fightListAvoid'));
  var kills = getSavedList('hitmanListKilled');
  for (var i = 0; i < opponents.length; i++) {
    var opponent = opponents[i];
    if (!opponent.profile) continue;

    // Mark targets that should be avoided.
    if (blacklist.indexOf(opponent.id) != -1) {
      var parentElt = opponent.profile.parentNode;
      var elt = makeElement('img', null, {'src':stripURI(badIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already lost to this opponent during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }

    // Mark targets on which bounties have already been collected.
    if (kills.indexOf(opponent.id) != -1) {
      var parentElt = opponent.profile.parentNode;
      var elt = makeElement('img', null, {'src':stripURI(lootbagIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already collected a bounty on this target during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }
  }
}

function filterNotifications(elt) {
  var handleCheck = GM_getValue('notificationHandle', 1);
  if (!handleCheck) return;

  // Get all beeps (pop-ups about notifications).
  var beeps = xpath('.//div[@class="UIBeep_Title"]', elt);
  for (var i = 0; i < beeps.snapshotLength; i++) {
    var beepElt = beeps.snapshotItem(i);
    if (beepElt && beepElt.innerHTML.indexOf('You sent a notification')) {
      // A notification was sent.
      var undoElt = xpathFirst('.//a[@class="undo_link"]', beepElt);
      if (!undoElt) continue;

      // Cancel certain types of notifications.
      if (beepElt.innerHTML.match(/fought you/)) {
          clickElement(undoElt);
          addToLog('info Icon', 'Canceled attack notification.');
      } else if (beepElt.innerHTML.match(/robbed you/)) {
          clickElement(undoElt);
          addToLog('info Icon', 'Canceled rob notification.');
      } else if (handleCheck == 2) {
          //FIXME: Should make sure it is a Mafia Wars notification.
          clickElement(undoElt);
          addToLog('info Icon', 'Canceled notification.');
      }
    }
  }
}

function setLevelUpRatio() {
  var elt = document.getElementById('level_up_ratio');
  if (elt) {
    if (energy) {
      var ratio = Math.round((lvlExp - curExp) / energy * 100) / 100;
      elt.childNodes[1].nodeValue = ' A ' + (ratio > 10? '>10' : ratio) + 'x pay ratio would be needed to level up on energy alone.';
      elt.style.display = 'block';
    } else {
      elt.style.display = 'none';
    }
  }
}

// Callback for clicking 'Add to Fight List' on profile page.
function clickFightListAdd() {
  addSavedListItem('fightList', this.id);
  this.firstChild.nodeValue = 'Remove from Fight List';
  this.removeEventListener('click', clickFightListAdd, false);
  this.addEventListener('click', clickFightListRemove, false);
  var el = document.getElementById('fightList');
  if (el) {
    el.value = GM_getValue('fightList', '');
  }
}

// Callback for clicking 'Remove from Fight List' on profile page.
function clickFightListRemove() {
  while(removeSavedListItem('fightList', this.id));
  this.firstChild.nodeValue = 'Add to Fight List';
  this.removeEventListener('click', clickFightListRemove, false);
  this.addEventListener('click', clickFightListAdd, false);
  var el = document.getElementById('fightList');
  if (el) {
    el.value = GM_getValue('fightList', '');
  }
}

// Callback for clicking 'Add to Rob List' on profile page.
function clickRobListAdd() {
  addSavedListItem('robList', this.id);
  this.firstChild.nodeValue = 'Remove from Rob List';
  this.removeEventListener('click', clickRobListAdd, false);
  this.addEventListener('click', clickRobListRemove, false);
  var el = document.getElementById('robList');
  if (el) {
    el.value = GM_getValue('robList', '');
  }
}

// Callback for clicking 'Remove from Rob List' on profile page.
function clickRobListRemove() {
  while(removeSavedListItem('robList', this.id));
  this.firstChild.nodeValue = 'Add to Rob List';
  this.removeEventListener('click', clickRobListRemove, false);
  this.addEventListener('click', clickRobListAdd, false);
  var el = document.getElementById('robList');
  if (el) {
    el.value = GM_getValue('robList', '');
  }
}

function getJobRow(jobName, contextNode) {
  // WARNING: Call for xpath differs based on quoting. This won't work if
  //          the job name has both double quotes (") and apostrophes (').
  var xQuote = (jobName.indexOf('"') != -1) ?  '\'' : '"';
  var rowElt = xpathFirst('.//tr[contains(., ' + xQuote + jobName + xQuote + ') and contains(., "Do Job")]', contextNode);
  if (!rowElt) {
    addToLog('warning Icon', 'Unable to find job row for ' + jobName + '.');
  }
  return rowElt;
}

function jobReqs (element) {
  // If we are here then we have already failed the job.
  addToLog('process Icon', 'Getting job requirements.');

  // Find the job row.
  var currentJob = missions[GM_getValue('selectMission', 1)][0];
  var currentJobRow = getJobRow(currentJob, element);
  if (!currentJobRow) return;

  // Do we need to buy something?
  var buyElt = xpathFirst('.//a[contains(., "Buy Item")]', element);
  if (buyElt) {
    addToLog('search Icon', 'Attempting to purchase required items.');
    Autoplay.fx = function() { goLinkElement(buyElt); };
    return;
  }
  DEBUG('Nothing to buy; moving to prerequisite job.');

  var items = getSavedList('itemList');
  var jobs = getSavedList('jobsToDo', '');
  var necessaryItems = $x('.//div[@class="req_item need_item"]//img', currentJobRow);

  // Save the current job for later. The current job should not already
  // exist in the list, so check first.
  if (jobs.indexOf(currentJob) == -1) {
    jobs.push(currentJob);
    DEBUG('Saving ' + currentJob + ' for later.');
    setSavedList('jobsToDo', jobs);
  } else {
    DEBUG(currentJob + ' is already in the jobs to-do list.');
  }

  // Figure out which loot items are needed before this job can be attempted
  // again and, consequently, which jobs will have to be done to get them.
  if (necessaryItems.length > 0) {
    necessaryItems.forEach(
      function(i){
        DEBUG('Missing : ' +i.alt);
        requirementJob.forEach(
          function(j){
            if (j[0] == i.alt) {
              jobs.push(j[1]);
              items.push(i.alt);
            }
          }
        );
      }
    );
  } else { addToLog('warning Icon', 'BUG DETECTED: Broken item detection.'); }

  // Set the very next job to perform.
  var doJob = jobs.pop();
  setSavedList('jobsToDo', jobs);
  setSavedList('itemList', items.unique());
  var i = 0;
  DEBUG('Will do job ' + doJob + ' next.');
  missions.forEach(
    function(f) {
        // Help locate name mismatches.
        //DEBUG(f[0] +'  :<<f>>: ' + missions[i][0]);
      if (f[0] == doJob) {
        GM_setValue('selectMission', i);
        addToLog('process Icon', 'Switching job to ' + doJob + '.');
      }
      i++;
    }
  );

  return;
}

function jobProgress(element) {
  if (GM_getValue('repeatJob') == 'checked' ) {
    DEBUG('Exiting jobProgress function; repeatJob is checked.');
    return;
  }

  var currentJob = missions[GM_getValue('selectMission', 1)][0];
  var jobno      = missions[GM_getValue('selectMission', 1)][2];
  var tabno      = missions[GM_getValue('selectMission', 1)][3];
  var cityno     = missions[GM_getValue('selectMission', 1)][4];
  DEBUG('Calculating progress for ' + currentJob + '.');
  // WARNING: Call for xpath differs based on quoting. This won't work if
  //          the job name has both double quotes (") and apostrophes (').
  var xQuote = (currentJob.indexOf('"') != -1) ?  '\'' : '"';
  var currentJobRow = xpath('.//tr[contains(., ' + xQuote + currentJob + xQuote + ') and contains(., \'Do Job\')]', element);
  if (!currentJobRow.snapshotLength) {
    addToLog('warning Icon', 'Unable to find Job Row for ' + currentJob + '.');
    var tierJobs = $x('.//tr/td[@class="job_name"]', element);
    if (typeof(tierJobs[0]) == 'undefined') {
      addToLog('warning Icon', 'No jobs found in result. Checking page contents.');
      if (element.innerHTML.indexOf('Try Again')>0) {
        addToLog('warning Icon', "We are on the 'Try Again' error page.");
      }
    } else {
      addToLog('process Icon', tierJobs.length + ' jobs found in result page.');
      tierJobs.forEach(
        function(i) {
          var jobName = f.innerHTML.split('job_name">')[1].split('<br>')[0];
          DEBUG("Found job: " + jobName.trim());
        });
    }
    return;
  }

  // Calculate tier mastery.
  DEBUG("Checking mastery for each job.");
  var currentJobRowIndex = currentJobRow.snapshotLength - 1;
  var tierLevel = currentJobRow.snapshotItem(currentJobRowIndex).innerHTML.split('Level ')[1].match(/\d+/);
  var tierJobs = $x('.//tr/td[@class="job_name"]', element);
  var tierPercent = 0;
  tierJobs.forEach(
    function(f) {
      if (f.innerHTML.indexOf('Mastered') != -1) {
        tierPercent += 100;
      } else {
        tierPercent += parseInt(f.innerHTML.split('Mastery ')[1].split('%')[0]);
      }
    }
  );
  if (tierJobs.length != 0) {
    tierPercent = Math.floor(tierPercent / tierJobs.length);
  }
  tierPercent = tierPercent + '';  //convert to string
  if (GM_getValue('tierCompleteStatus') != (tierLevel + '|' + String(tierPercent))) {
    GM_setValue('tierCompleteStatus', (tierLevel + '|' + String(tierPercent)));
    addToLog('info Icon', 'Job tier level ' + tierLevel + ' is ' + tierPercent + '% complete.');
  }

  // Calculate job mastery.
  DEBUG("Checking current job mastery.");
  var currentJobMastered = currentJobRow.snapshotItem(currentJobRowIndex).innerHTML.indexOf('Mastered');
  if (currentJobMastered > 0) {
    var jobs = getSavedList('jobsToDo');
    if (jobs.length == 0 || typeof(jobs.length) == 'undefined') {
      addToLog('info Icon', 'You have mastered "' + currentJob + '".');
      DEBUG('Checking job tier mastery.');
      if (tierPercent == '100' ) {
        // Find the first job of the next tier.
        // NOTE: This assumes that the missions array is sorted by city and
        //       then by tier.
        var nextTierJob;
        for (var i=GM_getValue('selectMission', 1)+1; i<missions.length; i++) {
          if (missions[i][4] != cityno) {
            nextTierJob = i;
            addToLog('info Icon', 'You have mastered the final job tier in ' +
                     cities[cityno] + '! Moving to the next tier in ' +
                     cities[missions[nextTierJob][4]] + '.');
            break;
          }
          if (missions[i][3] != tabno) {
            nextTierJob = i;
            addToLog('info Icon', 'Current job tier is mastered. Moving to next tier in ' + cities[cityno] + '.');
            break;
          }
        }
        if (!nextTierJob) {
          addToLog('info Icon', 'You have mastered all jobs!');
        } else {
          GM_setValue('selectMission', nextTierJob);
          addToLog('info Icon', 'Job switched to ' + missions[GM_getValue('selectMission', 1)][0] + '.');
        }
      } else {
          var findMastery = function(v, i, a) { return (a[i].innerHTML.indexOf('Mastery') > 0)? 1:0; };
          var nonMasteredJobs = tierJobs.filter(findMastery);
          var missionName = nonMasteredJobs[0].innerHTML.split('<br>')[0];
          GM_setValue('selectMission', missions.searchArray(missionName.trim(), 0) + '');
          addToLog('info Icon', 'Job switched to ' + missions[GM_getValue('selectMission', 1)][0] + '.');
      }
    } else {
      DEBUG("There are jobs in the to-do list.");
    }
  } else {
    DEBUG("Job is not mastered. Checking percent of mastery.");
    var jobPercentComplete = currentJobRow.snapshotItem(currentJobRowIndex).innerHTML.split('Mastery ')[1].split('%')[0];
    if (GM_getValue('jobCompleteStatus') != (currentJob + '|' + String(jobPercentComplete))) {
      GM_setValue('jobCompleteStatus', (currentJob + '|' + String(jobPercentComplete)));
      addToLog('info Icon', '"' + currentJob + '" is ' + jobPercentComplete + '% complete.');
    }
  }
  return;
}

function jobLoot(element) {
  var lootbag = [];

  // See what loot was gained.
  var messages = $x('.//td[@class="message_body"]', element);
  var numMessages = messages.length;
  for (var i = 1; i < numMessages; i++) {
    var innerNoTags = messages[i].innerHTML.untag();
    if (innerNoTags.match(/You\s+gained(?:\s+an?)?\s+(.+)\./) ||
        innerNoTags.match(/found(?:\s+an?)?\s+(.*?)\s+on\s+the/)) {
      var loot = RegExp.$1;
      addToLog('lootbag Icon', '<span class="loot">'+' Found ' + loot + ' in the job.' + '</span>');
      lootbag.push(loot);
    }
  }

  var items = getSavedList('itemList');
  if (typeof(items[0]) == 'undefined' || items.length == 0) {
    DEBUG('No items in required item list.');
    return;
  }
  DEBUG('Found ' + lootbag.length + ' item(s) on this job.');

  var itemFound = false;
  var itemName;
  // NOTE: The single equal sign is intentional in this while() condition.
  while (itemName = lootbag.pop()) {
    DEBUG('Looking for ' + itemName + ' in needed items list.');
    DEBUG('We need ' + items.length + ' item(s).');
    for (var j = 0; j < items.length; j++) {
      if (itemName.indexOf(items[j]) != -1 ) {
        // we found some needed loot
        itemFound = true;
        addToLog('found Icon', itemName + ' is the item we were looking for!');
        removeSavedListItem('itemList', itemName);
        var jobList = getSavedList('jobsToDo');
        var doJob = jobList.pop();
        setSavedList('jobsToDo', jobList);

        for (var k = 0; k < missions.length; k++) {
          if (missions[k][0] == doJob) {
            addToLog('info Icon', 'Switching job to ' + doJob + '.');
            GM_setValue('selectMission', k);
            break;
          }
        }
      }
    }
  }
  if (!itemFound) {
    var jobResult;
    for (var i = 0; i < items.length; i++) {
      jobResult = requirementJob.searchArray(items[i], 0);
      if (jobResult === false) {
        addToLog('warning Icon', 'BUG DETECTED: ' + items[i] + ' not found in requirementJob array.');
      } else {
        if (missions[GM_getValue('selectMission', 1)][0] != requirementJob[jobResult][1]) {
          DEBUG(items[i] + ' cannot be found doing this job.');
        }
      }
      DEBUG(items[i] + ' not found.');
    }
  }
}

function debugDumpSettings() {
  // Use showIfUnchecked() to show 0 value as "un-checked", or showIfSelected()
  // to show 0 value as "not selected" (for radio buttons).
  DEBUG('>  >  >  >  >  BEGIN SETTINGS DUMP  <  <  <  <  <<br>' +
        'Script Version: <strong>' + SCRIPT.version + ' build ' + SCRIPT.build + '</strong><br>' +
        'Language: <strong>' + document.documentElement.lang + '</strong><br>' +
        'Player current level: <strong>' + level + '</strong><br>' +
        'Player points to next level: <strong>' + ptsToNextLevel + '</strong><br>' +
        'Player mafia size: <strong>' + mafia + '</strong><br>' +
        'Player health: <strong>' + health + '/' + maxHealth + '</strong><br>' +
        'Player energy: <strong>' + energy + '/' + maxEnergy + '</strong><br>' +
        'Player stamina: <strong>' + stamina + '/' + maxStamina + '</strong><br>' +
        'Player skill points: <strong>' + stats + '</strong><br>' +
        'Energy pack waiting? <strong>' + energyPack + '</strong><br>' +
        'Current location: <strong>' + cities[city] + '</strong><br>' +
        'Player NY cash: <strong>' + (cash[NY] == undefined? 'unknown' : '$' + makeCommaValue(cash[NY])) + '</strong><br>' +
        'Player Cuba cash: <strong>' + (cash[CUBA] == undefined? 'unknown' : 'C$' + makeCommaValue(cash[CUBA])) + '</strong><br>' +
        '-------------------General Tab-------------------<br>' +
        'Enable auto-refresh: <strong>' + showIfUnchecked(GM_getValue('autoClick'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate low: <strong>'+ GM_getValue('r1') + '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate high: <strong>' + GM_getValue('r2') + '</strong><br>' +
        'Enable auto-heal: <strong>' + showIfUnchecked(GM_getValue('autoHeal')) + '</strong><br>' +
        '&nbsp;&nbsp;-Heal in NY: <strong>' + showIfSelected(GM_getValue('healLocationNY')) + '</strong><br>' +
        '&nbsp;&nbsp;-Heal in Cuba: <strong>' + showIfSelected(GM_getValue('healLocationCuba')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum health: <strong>' + GM_getValue('healthLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Hide in hospital: <strong>' + showIfUnchecked(GM_getValue('hideInHospital')) + '</strong><br>' +
        'Enable auto-bank in NY: <strong>' + showIfUnchecked(GM_getValue('autoBank')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: $<strong>' + GM_getValue('bankConfig') + '</strong><br>' +
        'Enable auto-bank in Cuba: <strong>' + showIfUnchecked(GM_getValue('autoBankCuba')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: C$<strong>' + GM_getValue('bankConfigCuba') + '</strong><br>' +
        'Enable auto-pause: <strong>' + showIfUnchecked(GM_getValue('autoPause')) + '</strong><br>' +
        '&nbsp;&nbsp;-After level up: <strong>' + showIfSelected(GM_getValue('autoPauseAfter')) + '</strong><br>' +
        '&nbsp;&nbsp;-Before level up: <strong>' + showIfSelected(GM_getValue('autoPauseBefore')) + '</strong><br>' +
        '&nbsp;&nbsp;-Exp to pause at: <strong>'+ GM_getValue('autoPauseExp') + '</strong><br>' +
        'Left-align main frame: <strong>'+ showIfUnchecked(GM_getValue('leftAlign')) + '</strong><br>' +
        'Hide ads: <strong>'+ showIfUnchecked(GM_getValue('hideAds')) + '</strong><br>' +
        'Move email options: <strong>'+ showIfUnchecked(GM_getValue('moveEmailBar')) + '</strong><br>' +
        'Undo notifications: <strong>'+ GM_getValue('notificationHandle') + '</strong><br>' +
        'Enable logging: <strong>' + showIfUnchecked(GM_getValue('priorLogSetting')) + '</strong><br>' +
        '&nbsp;&nbsp;-Logging length: <strong>' + GM_getValue('autoLogLength') + '</strong><br>' +
        'Log player updates: <strong>' + showIfUnchecked(GM_getValue('logPlayerUpdates')) + '</strong><br>' +
        '&nbsp;&nbsp;-Updates length: <strong>' + GM_getValue('logPlayerUpdatesMax') + '</strong><br>' +
        'Enable auto-stat: <strong>' + showIfUnchecked(GM_getValue('autoStat')) + '</strong><br>' +
        '&nbsp;&nbsp;-Attack: <strong>' + showIfSelected(GM_getValue('autoStatAttack')) + '</strong><br>' +
        '&nbsp;&nbsp;-Defense: <strong>' + showIfSelected(GM_getValue('autoStatDefense')) + '</strong><br>' +
        '&nbsp;&nbsp;-Health: <strong>' + showIfSelected(GM_getValue('autoStatHealth')) + '</strong><br>' +
        '&nbsp;&nbsp;-Energy: <strong>' + showIfSelected(GM_getValue('autoStatEnergy')) + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina: <strong>' + showIfSelected(GM_getValue('autoStatStamina')) + '</strong><br>' +
        'Delay rate low: <strong>'+ GM_getValue('d1') + '</strong><br>' +
        'Delay rate high: <strong>' + GM_getValue('d2') + '</strong><br>' +
        'Skip gift wall posts: <strong>' + GM_getValue('autoGiftSkipOpt') + '</strong><br>' +
        'Enable auto-lotto: <strong>' + GM_getValue('autoLottoOpt') + '</strong><br>' +
        'Automatically asks for job help: <strong>' + showIfUnchecked(GM_getValue('autoAskJobHelp')) + '</strong><br>' +
        'Minimum experience for job help: <strong>' + GM_getValue('autoAskJobHelpMinExp') + '</strong><br>' +
        'Message to post on wall for job help: <strong>' + GM_getValue('autoAskJobHelpMessage') + '</strong><br>' +
        '-------------------Energy Tab--------------------<br>' +
        'Enable auto-mission: <strong>' + showIfUnchecked(GM_getValue('autoMission')) + '</strong><br>' +
        '&nbsp;&nbsp;-Job selected: <strong>' + missions[GM_getValue('selectMission')][0] + '</strong><br>' +
        '&nbsp;&nbsp;-Repeat Job: <strong>' + showIfUnchecked(GM_getValue('repeatJob')) + '</strong><br>' +
        'Wheelman savings: <strong>' + GM_getValue('selectEnergyBonus') + '%</strong><br>' +
        'Wait until energy full: <strong>' + showIfUnchecked(GM_getValue('waitForFull')) + '</strong><br>' +
        'Enable auto-energy pack: <strong>' + showIfUnchecked(GM_getValue('autoEnergyPack')) + '</strong><br>' +
        'Estimated job ratio: <strong>' + GM_getValue('estimateJobRatio') + '</strong><br>' +
        'Has helicopter: <strong>' + showIfUnchecked(GM_getValue('hasHelicopter')) + '</strong><br>' +
        'Has golden throne: <strong>' + showIfUnchecked(GM_getValue('hasGoldenThrone')) + '</strong><br>' +
        'Is Maniac: <strong>' + showIfUnchecked(GM_getValue('isManiac')) + '</strong><br>' +
        'Auto send energy pack: <strong>' + showIfUnchecked(GM_getValue('sendEnergyPack')) + '</strong><br>' + 
        '-------------------Stamina Tab-------------------<br>' +
        'Spend stamina: <strong>' + showIfUnchecked(GM_getValue('staminaSpend')) + '</strong><br>' +
        'How: <strong>' + staminaSpendChoices[GM_getValue('spendStaminaHow'), 0] + '</strong><br>' +
        '&nbsp;&nbsp;-Fight in: <strong>' + cities[GM_getValue('fightLocation', 0)] + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight max level: <strong>' + GM_getValue('fightLevelMax') + ' (' + showIfRelative('fightLevelMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight max mafia: <strong>' + GM_getValue('fightMafiaMax') + ' (' + showIfRelative('fightMafiaMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight min mafia: <strong>' + GM_getValue('fightMafiaMin') + ' (' + showIfRelative('fightMafiaMinRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight stealth: <strong>' + showIfUnchecked(GM_getValue('fightStealth')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight avoid bodyguards: <strong>' + showIfUnchecked(GM_getValue('fightAvoidBodyguards')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight avoid names: <strong>' + showIfUnchecked(GM_getValue('fightAvoidNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-List fight opponents: <strong>' + GM_getValue('fightList') + '</strong><br>' +
        '&nbsp;&nbsp;-List fight remove stronger: <strong>' + showIfUnchecked(GM_getValue('fightRemoveStronger')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random rob max level: <strong>' + GM_getValue('robLevelMax') + ' (' + showIfRelative('robLevelMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random rob max mafia: <strong>' + GM_getValue('robMafiaMax') + ' (' + showIfRelative('robMafiaMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random rob min mafia: <strong>' + GM_getValue('robMafiaMin') + ' (' + showIfRelative('robMafiaMinRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random rob avoid names: <strong>' + showIfUnchecked(GM_getValue('robAvoidNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-List rob opponents: <strong>' + GM_getValue('robList') + '</strong><br>' +
        '&nbsp;&nbsp;-List rob remove stronger: <strong>' + showIfUnchecked(GM_getValue('robRemoveStronger')) + '</strong><br>' +
        '&nbsp;&nbsp;-Collect hitman bounties in: <strong>' + cities[GM_getValue('hitmanLocation', 0)] + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman min bounty: <strong>' + parseCash(GM_getValue('hitmanBountyMin')) + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman avoid names: <strong>' + showIfUnchecked(GM_getValue('hitmanAvoidNames')) + '</strong><br>' +
        'Families list: <strong>' + GM_getValue('clanName') + '</strong><br>' +
        'Stamina reserve: <strong>' + (100-(GM_getValue('selectStaminaKeep')*10)) + '% (keep above ' + staminaFloor + ')</strong><br>' +
        'Ignore reserve to level-up: <strong>' + showIfUnchecked(GM_getValue('allowStaminaToLevelUp')) + '</strong><br>' +
        '-------------------Hitlist Tab-------------------<br>' +
        'Enable auto-hitlist: <strong>' + showIfUnchecked(GM_getValue('autoHitlist')) + '</strong><br>' +
        '&nbsp;&nbsp;-Bounty amount: <strong>' + GM_getValue('bountyAmount') + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Hitlist: <strong>' + '' + '</strong><br>' +
        'Ride Hitlist: <strong>' + showIfUnchecked(GM_getValue('hideAttacks')) + '</strong><br>' +
        '------------------Property Tab-------------------<br>' +
        'Enable auto-buy <strong>' + showIfUnchecked(GM_getValue('autoBuy')) + '</strong><br>' +
        '&nbsp;&nbsp;-Min cash: <strong>' + GM_getValue('buyMinAmount') + '</strong><br>' +
        'Enable auto-repair property <strong>' + showIfUnchecked(GM_getValue('autoRepair')) + '</strong><br>' +
        'Enable auto-protect property <strong>' + showIfUnchecked(GM_getValue('autoProtect')) + '</strong><br>' +
        'Sell Cuban business output <strong>' + showIfUnchecked(GM_getValue('autoSellCrates')) + '</strong><br>' +
        '>  >  >  >  >  END SETTINGS DUMP  <  <  <  <  <');
}

// This function returns false if some further action has been taken and the
// caller should not make additional calls until that action has completed.
function parsePlayerUpdates(messagebox) {
  // Get the timestamp (e.g. "3 minutes ago")
  var minutesAgo = xpathFirst('div[@class="update_timestamp"]', messagebox);
  minutesAgo = minutesAgo? minutesAgo.innerHTML + ' ' : '';
  minutesAgo = minutesAgo.indexOf('0') == 0? '' : minutesAgo;

  // Get the text and links.
  var messageTextElt = xpathFirst('div[@class="update_txt"]', messagebox);
  if (!messageTextElt) {
    addToLog('warning Icon', 'BUG DETECTED: Unable to read update text.');
    return true;
  }
  var messageText = messageTextElt.innerHTML;
  var messageTextNoTags = messageText.untag();
  var links = messageTextElt.getElementsByTagName('a');

  if (messageTextNoTags.indexOf('attacked by') != -1) {
    // Attacked by some fool with a death wish.
    var user = linkToString(links[0], 'user');
    var result = 'Attacked';
    if (links[0] && links[0].nextSibling.nodeValue.match(/\d+ times/)) {
      result += ' ' + RegExp.lastMatch;
    }
    result += ' by ' + user;
    if (messageTextNoTags.match(/You won.*You gained .*(\d+) experience points?.*?(C?\$[\d,]*\d)/)) {
      // The fight was won.
      var cost = RegExp.$2;
      var experience = RegExp.$1;
      result += '<span class="good">' + ' WON ' + cost + '</span>' + ' and ' +
                '<span class="good">' + experience +' experience.</span>';
      cost = parseCash(cost);
      experience = parseInt(experience);

      if (GM_getValue('hideAttacks') == 'checked') {
        DEBUG('Riding Hitlist fight won.');
        GM_setValue('currentHitXp', parseInt((GM_getValue('currentHitXp', 0)) + experience));
        GM_setValue('currentHitDollars', parseInt((GM_getValue('currentHitDollars', 0)) + cost));
        DEBUG(result);
        if (experience == 0) {
          DEBUG('Zero experience detected; turning off auto-heal.');
          GM_setValue('autoHeal', 0);
        }
      } else {
        addToLog('updateGood Icon', minutesAgo + result);
      }

//      NEEDS FIX - player updates need their own stats and a place to put them in the log (tabbed log
//      perhaps?)
//      The setValue commands below should not be updating auto-fight/auto-rob stats as it thows off
//      the gain rate, stamina req'd to level and ultimately  the auto-burn stamina for level up action.
//      Leaving in as placeholders. --AK17710N
//
//      GM_setValue('fightWinCountInt', (GM_getValue('fightWinCountInt', 1) + 1));
//      GM_setValue('fightWinCountDisp', makeCommaValue(GM_getValue('fightWinCountInt', 1)));
//      GM_setValue('totalExpInt', (GM_getValue('totalExpInt', 1) + experience));
//      GM_setValue('totalExpDisp', makeCommaValue(GM_getValue('totalExpInt', 1)));
//      GM_setValue('totalWinDollarsInt', (GM_getValue('totalWinDollarsInt', 1) + cost));
//      GM_setValue('totalWinDollarsDisp', '$' + makeCommaValue(GM_getValue('totalWinDollarsInt', 1)));
    } else if (messageTextNoTags.match(/You lost.*and losing .*?(C?\$[\d,]*\d)/)) {
      // The fight was lost.
      var cost   = RegExp.$1;
      result += '<span class="bad">' + ' LOST ' + cost + '.</span>';
      cost = parseCash(cost);

      if (GM_getValue('hideAttacks') == 'checked') {
        DEBUG('Ride Hitlist fight lost.');
        GM_setValue('currentHitDollars', parseInt((GM_getValue('currentHitDollars', 0)) - cost));
        DEBUG(result);
      } else {
        addToLog('updateBad Icon', minutesAgo + result);
      }

//      NEEDS FIX - player updates need their own stats and a place to put them in the log (tabbed log
//      perhaps?)
//      The setValue commands below should not be updating auto-fight/auto-rob stats as it thows off
//      the gain rate, stamina req'd to level and ultimately  the auto-burn stamina for level up action.
//      Leaving in as placeholders. --AK17710N
//
//      GM_setValue('fightLossCountInt', (GM_getValue('fightLossCountInt', 1) + 1));
//      GM_setValue('fightLossCountDisp', makeCommaValue(GM_getValue('fightLossCountInt', 1)));
//      GM_setValue('totalLossDollarsInt', (GM_getValue('totalLossDollarsInt', 1) + cost));
//      GM_setValue('totalLossDollarsDisp', '$' + makeCommaValue(GM_getValue('totalLossDollarsInt', 1)));
    } else {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read update win/loss.');
    }

  } else if (messageTextNoTags.indexOf('You were snuffed') != -1) {
    // Death. Ouch.
    addToLog('updateBad Icon', minutesAgo + 'You <span class="bad">' + 'DIED' + '</span>.');

  } else if (messageTextNoTags.indexOf('You were knocked out') != -1) {
    // Hitlist ride has ended.
    var hitman = linkToString(links[0], 'user');
    var user = linkToString(links[1], 'attacker');
    var bounty = parseCash(messageTextNoTags.split(' who claimed the ')[1]);
    var result = 'Whacked by '+ hitman + ' who claimed the $' +
                 makeCommaValue(parseInt(bounty)) + ' bounty set by ' +
                 user + '.';

    if (GM_getValue('hideAttacks') == 'checked') {
      DEBUG('Whacked riding hitlist.');
      GM_setValue('currentHitXp', parseInt((GM_getValue('currentHitXp', 0) - 6)));
      GM_setValue('totalHits', parseInt(GM_getValue('totalHits', 0)) + 1);
      GM_setValue('totalXp', parseInt(GM_getValue('totalXp', 0)) + parseInt(GM_getValue('currentHitXp', 0)));
      GM_setValue('lastHitXp', parseInt(GM_getValue('currentHitXp', 0)));
      GM_setValue('totalHitDollars', parseInt((GM_getValue('currentHitDollars', 0)) + parseInt(GM_getValue('totalHitDollars', 0))));
      if (GM_getValue('currentHitXp', 0) < 0) {
        var currentHitXp = '<span class="bad">LOST ' + GM_getValue('currentHitXp', 0) + '</span>';
      } else {
        var currentHitXp = '<span class="good">GAINED ' + GM_getValue('currentHitXp', 0) + '</span>';
      }
      if (GM_getValue('currentHitDollars', 0) < 0) {
        var currentHitDollars = '<span class="bad">' +
                                ' LOST $' + makeCommaValue(parseInt(GM_getValue('currentHitDollars', 0))) + '</span>';
        addToLog('updateBad Icon', minutesAgo + currentHitXp + ' experience and ' + currentHitDollars + ' on the hitlist.');
      } else {
        var currentHitDollars = '<span class="good">' +
                                ' WON $' + makeCommaValue(parseInt(GM_getValue('currentHitDollars', 0))) + '</span>';
        addToLog('updateGood Icon', minutesAgo + currentHitXp + ' experience and ' + currentHitDollars + ' on the hitlist.');
      }

      DEBUG('Hitlist total values set; now clearing current values.');
      GM_setValue('currentHitXp', 0);
      GM_setValue('currentHitDollars', 0);
      DEBUG('Ensure that autoHeal is enabled.');
      GM_setValue('autoHeal', 'checked');

    }
    addToLog('updateBad Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('You were punched') != -1) {
    // Punched by some wuss.
    var user = linkToString(links[0], 'attacker');
    var result = 'You were punched in the face by ' + user + '.';
    addToLog('updateBad Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('You fought as') != -1) {
    // Helped a fellow mafia member in a fight.
    var capo = linkToString(links[0], 'user');
    var user = linkToString(links[1], 'user');
    var cost = messageTextNoTags.match(REGEX_CASH);
    var result = 'You fought as ' + capo + "'s Capo and defeated " +
                 user + ', receiving ' + '<span class="good">' +
                 cost + '</span> for your efforts.';
    addToLog('updateGood Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('needs your help on a job') != -1) {
    // Help requested by a fellow mafia member.
    if (!useClickSimulation) {
      messageText.split(/target_id=(\d+)/);
      var targetid = RegExp.$1;
      if (targetid) {
        var link = 'http://apps.facebook.com/' + SCRIPT.name +
                   SCRIPT.controller + 'job' +
                   SCRIPT.action + 'give_help' +
                   SCRIPT.city + (city + 1) +
                   '&target_id=' + RegExp.$1 +
                   '&skip_interstitial=1';
        takeAction(link, 'help');
        return false;
      } else {
        addToLog('warning Icon','BUG DETECTED: Unable to read help target id.');
      }
    } else {
      var userElt = xpathFirst('.//a[contains(@onclick, "controller=stats")]', messagebox);
      var elt = xpathFirst('.//a[contains(text(), "Click here to help")]', messagebox);
      if (elt) {
        // Help immediately.
        Autoplay.fx = function() {
          clickAction = 'help';
          clickContext = {
            user: linkToString(userElt, 'user'),
            help: linkToString(elt)
          };
          clickElement(elt);
          DEBUG('Clicked to help with a job.');
        };
        Autoplay.delay = 0;
        Autoplay.start();
        return false;
      } else {
        addToLog('warning Icon', 'BUG DETECTED: Unable to find help element.');
      }
    }

  } else if (messageTextNoTags.indexOf('claimed your $') != -1) {
    // Bounty claimed. Whoever was hitlisted is sleeping with the fishes.
    var hitman = linkToString(links[0], 'user');
    var user = linkToString(links[1], 'attacker');
    var result = hitman + ' claimed your ' +
                 messageTextNoTags.match(REGEX_CASH)[0] +
                 ' bounty on ' + user + '.';
    addToLog('updateGood Icon', minutesAgo + result);

  } else if (messageTextNoTags.match(/tried\s+to\s+rob\s+you\s*(\d+ times)?/)) {
    // Robbery.
    var thief = linkToString(links[0], 'attacker');
    var result = thief + ' tried to rob you';
    if (RegExp.$1) {
      result += ' <span class="attacker">' + RegExp.$1 + '</span>';
    }
    result += '!';
    if (messageTextNoTags.match(/dealing (\d+)/)) {
      var damage = RegExp.$1;
      result += ' You taught \'em a lesson and spanked \'em for ' +
                 damage + ' damage.';
    }
    addToLog('updateGood Icon', minutesAgo + result);

  } else if (messageTextNoTags.match(/You earned.*achievement/)) {
    // You earned an achievement.
    addToLog('updateGood Icon', minutesAgo + messageText);

  } else if (messageTextNoTags.match(/earned some great items/)) {
    // Social reward, no need to collect. Ignore it.
    DEBUG(minutesAgo + messageText);

  } else if (messageTextNoTags.match(/earned the.*achievement/)) {
    // Someone else earned an achievement. Who cares!
    DEBUG(minutesAgo + messageText);

  } else {
    // Just copy the update text straight into the log.
    addToLog('info Icon', minutesAgo + messageText);
  }

  return true;
}

function profileFix() {
  var lists = $x('.//ul[@class="nice_list items_list clearfix"]', innerPageElt);
  if (lists.length < 3) return;

  // Count the number of items in each item list.
  var itemCount = [];
  for (var whichblock = 0; whichblock < 3; whichblock++) {
    itemCount[whichblock] = 0;
    var i = 0;
    var nexti = 0;
    while ((i != -1) && (nexti < lists[whichblock].innerHTML.length)) {
      i = lists[whichblock].innerHTML.indexOf('X&nbsp;',nexti);
      if (i != -1) {
        var nextwhitespace = lists[whichblock].innerHTML.indexOf('</div>', i);
        itemCount[whichblock] += parseInt(lists[whichblock].innerHTML.substring(i+7, nextwhitespace));
        nexti = i + 1;
      }
    }
  }

  var findWeapons = xpath('.//div[@class="title"]', innerPageElt);
  var greenText = 'color:#52E259;';
  var redText = 'color:#EC2D2D;';
  if ((findWeapons.snapshotLength > 5) && (findWeapons.snapshotLength < 10)) {
    for (locateBlock = 0; locateBlock < findWeapons.snapshotLength; locateBlock++) {
      if (findWeapons.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Weapons')
        break;
    }

    if (findWeapons.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Weapons') {
      if ((mafia <= itemCount[0]) || (itemCount[0] > 500))
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':greenText});
      else
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':redText});
      j.appendChild(document.createTextNode('(' + itemCount[0] + ')'));
    }

    locateBlock = locateBlock + 1;
    if (findWeapons.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Armor') {
      if ((mafia <= itemCount[1]) || (itemCount[1] > 500))
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':greenText});
      else
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':redText});
      j.appendChild(document.createTextNode(' (' + itemCount[1] + ')'));
    }

    locateBlock = locateBlock + 1;
    if (findWeapons.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Vehicles') {
      if ((mafia <= itemCount[2]) || (itemCount[2] > 500))
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':greenText});
      else
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':redText});
      j.appendChild(document.createTextNode('(' + itemCount[2] + ')'));
    }
  }
}

function autoLotto() {
  Autoplay.delay = getAutoPlayDelay();

  var lottoButton = xpathFirst('.//a[contains(@onclick, "lotto")]/span[contains(@class, "sexy_lotto") and contains(text(), "Play Now and Win Big")]', innerPageElt);
  if (lottoButton) {
    Autoplay.fx = function() {
      clickElement(lottoButton);
      DEBUG('Clicked to go to lotto.');
    };
    Autoplay.start();
    return true;
  }

  var weeklylottoCheck = xpathFirst('.//a[contains(@onclick, "lotto")]/span[contains(@class, "sexy_lotto") and contains(text(), "See if you won")]', innerPageElt);
  if (weeklylottoCheck) {
    Autoplay.fx = function() {
      clickElement(weeklylottoCheck);
      DEBUG('Clicked to see lotto results.');
    };
    Autoplay.start();
    return true;
  }

  var randomTicket = xpathFirst('.//div[@class="sexy_button" and contains(text(), "Auto-Select Numbers")]', innerPageElt);
  if (randomTicket) {
    clickElement(randomTicket);
    var submitTicket = xpathFirst('.//span[@class="sexy_button"]/input[@class="sexy_lotto" and @type="submit" and @value="Submit Ticket(s)"]', innerPageElt);

    if (submitTicket) {
      var ticket = ' ';
      for (var i = 1; i < 6; i++) {
        var searchstring = './/div[@id="' + SCRIPT.appID + '_ticket_1_selected_' + i + '"]';
        lottonum = xpathFirst(searchstring, innerPageElt);
        ticket = ticket + lottonum.innerHTML;
        if (i<5)
          ticket = ticket + '-';
      }
      Autoplay.fx = function() {
        clickElement(submitTicket);
        addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Lotto</span>: Played ticket' + ticket + '.');
      };
      Autoplay.start();
      return true;
    }
    // FIXME: It is a bug to reach this point?
    Autoplay.fx = goHome;
    Autoplay.start();
    return true;
  }

  var lottoResults = xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(text(), "Results")]', innerPageElt);
  if (lottoResults) {
    var totalwinning = 0;
    var lottotable = xpath('.//table//tbody//tr//td[contains(text(), "Ticket #")]', innerPageElt);
    if (lottotable.snapshotLength == 0) {
      var noticketsEntered = xpath('.//center//div', innerPageElt);
      if ((noticketsEntered) && (noticketsEntered.snapshotLength>0) &&
         (noticketsEntered.snapshotItem(1).parentNode.innerHTML.indexOf("You didn't enter any tickets")!=-1))
        addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Lotto</span>: No tickets entered for the last drawing.');
      else
        addToLog('warning Icon', 'BUG DETECTED: Can\'t find lotto results.');
      return false;
    }
    var winningtickets = [0, 0, 0, 0, 0, 0];
    for (var j = 0; j < lottotable.snapshotLength; j++) {
      var eachticket = lottotable.snapshotItem(j).parentNode.innerHTML;
      var count = 0;
      for (var k = 0; k < eachticket.length; k++) {
        if (eachticket.substr(k, 'gold'.length) == 'gold')
          count++;
      }
      winningtickets[count] = winningtickets[count] + 1;
    }
    var lottoLog = '<span style="font-weight:bold;color:rgb(255,217,39);">Lotto winners</span>: ';
    var atleastOneWinner = false;
    for (var j = 1; j < 6; j++)
      if (winningtickets[j]>0) {
        atleastOneWinner = true;
        if (winningtickets[j] == 1)
          lottoLog = lottoLog + winningtickets[j] + ' ticket';
        else
          lottoLog = lottoLog + winningtickets[j] + ' tickets';
        if (j == 1)
          lottoLog = lottoLog +  ' matching ' + j + ' number;';
        else
          lottoLog = lottoLog + ' matching ' + j + ' numbers;';
      }
    if (lottoLog[lottoLog.length-1]==';')
      lottoLog = lottoLog.substring(0, lottoLog.length-1)+'.';
    else if (!atleastOneWinner)
      lottoLog = lottoLog + 'no winning tickets.';
    addToLog('info Icon', lottoLog);

    // Log any displayed prizes.
    if (atleastOneWinner) {
      var prizes = $x('.//table[@class="messages"]//center', innerPageElt);
      for (var i = 0; i < prizes.length; i++) {
        var description = prizes[i].innerHTML.untag().trim();
        if (description) {
          addToLog('good Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Prize</span>: ' + description);
        }
      }
    }

    Autoplay.fx = goHome;
    Autoplay.start();
    return true;
  }

  return false;
}

// This function returns false if nothing was done, true otherwise.
function propertyBuy() {
  var buyCost = parseInt(GM_getValue('buyCost', 0));
  var buyMinAmount = parseInt(GM_getValue('buyMinAmount', 0));

  // Make sure there something to buy and the amounts are valid.
  if (!buyCost || isNaN(buyMinAmount) || !cash[NY]) return false;

  // Make sure enough cash will be left over.
  if (buyCost > cash[NY] - buyMinAmount) return false;

  // Make sure we're in New York.
  if (city != NY) {
    Autoplay.fx = goNY;
    Autoplay.start();
    return true;
  }

  if (!onPropertyNav()) {
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  var buyType = GM_getValue('buyType', 0);
  var buyName = GM_getValue('buyName', '');
  var buySelection = GM_getValue('selectProperties', '');
  var buyRequired  = GM_getValue('buyRequired', '');
  var buySuccess = false;
  DEBUG('Auto-buy: name=' + buyName + ', id=' + buyType + ', cost=' + buyCost + ', req=' + buyRequired + ', mafia=' + mafia);
  if (buyType > 0 && (buyRequired || buySelection.indexOf(buyName) > -1)) {
    var buyamountSelects = xpathFirst('.//form[@id="'+SCRIPT.appID+'_propBuy_' + buyType + '"]/table/tbody/tr/td/select[@name="amount"]', innerPageElt);
    if (buyamountSelects && buyamountSelects.length) {
      buyamountSelects[buyamountSelects.length - 1].selected = true;
      var buyform = xpathFirst('.//form[@id="'+SCRIPT.appID+'_propBuy_' + buyType + '"]/table/tbody/tr/td[2]/span/input', innerPageElt);
      if (buyform) {
        buySuccess = true;
        buyform.click();
        return true;
      }
    }
  } else {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t buy ' + buyName + '.');
  }

  return false;
}

function onHome() {
  // Return true if we're on the home page, false otherwise.
  if (xpathFirst('.//div[@class="playerupdate_box"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onPropertyNav() {
  // Return true if we're on the property nav, false otherwise.
  if (city == NY && xpathFirst('.//input[@name="buy_props"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onHitlistTab() {
  // Return true if we're on the hitlist tab, false otherwise.
  if (xpathFirst('.//table[@class="hit_list"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onRobTab() {
  // Return true if we're on the rob tab, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(@onclick, "controller=racket")]', innerPageElt)) {
    return true;
  }

  return false;
}

function propertyGetDamage(rootElt) {
  // Check for a protection offer.
  var protect = xpathFirst('.//a[contains(@onclick, "action=protect_all")]', rootElt);
  if (protect && protect.innerHTML.untag().match(REGEX_CASH)) {
    var cost = RegExp.lastMatch;
    DEBUG('Property is not fully protected, need ' + cost);
    GM_setValue('propertyDamage', PROP_PROTECT);
    GM_setValue('propertyDamageCost', cost);
    return;
  }

  // See if repairs are needed.
  var repair = xpathFirst('.//a[contains(@onclick, "action=repair_all")]', rootElt);
  if (repair && repair.innerHTML.untag().match(REGEX_CASH)) {
    var cost = RegExp.lastMatch;
    DEBUG('Property is not fully repaired, need ' + cost);
    GM_setValue('propertyDamage', PROP_REPAIR);
    GM_setValue('propertyDamageCost', cost);
    return;
  }

  // Fully repaired and protected.
  GM_setValue('propertyDamage', PROP_OK);
  GM_setValue('propertyDamageCost', 0);
}

function propertyGet() {
//FIXME: Why is reloading necessary? If it is, then the caller should be
//       checking this function's return value. If it isn't necessary
//       then it should be removed.
  var reloadProperty = false;

  if (running) {
    // check for messages
    var messageCheck = xpathFirst('.//div[@class="message_float"]', innerPageElt);

    if (messageCheck) {
      messageCheck = messageCheck.innerHTML.untag();
      if (messageCheck.match(/You just bought (.*) for (C?\$[\d,]*\d)/)) {
        addToLog('cash Icon', '<strong>Bought</strong> ' +
                 '<span class="good">' +
                 RegExp.$1 + '</span>' + ' for ' +
                 '<span class="expense">' + RegExp.$2 + '</span>.');
      } else {
        addToLog('warning Icon', 'Auto-buy error: ' + messageCheck);
      }
      reloadProperty = true;

    } else {
      var messageCheck = xpathFirst('.//td[@class="message_body"]', innerPageElt);
      if (messageCheck) {
        messageCheck = messageCheck.innerHTML.untag();
        if (messageCheck.match(/You successfully sold (.*) for (C?\$[\d,]*\d)/)) {
          addToLog('cash Icon', '<strong>Sold</strong> ' +
                   '<span class="bad">' +
                   RegExp.$1 + '</span>' + ' for ' +
                   '<span class="money">' + RegExp.$2 + '</span>.');
        } else {
          addToLog('info Icon', messageCheck);
        }
        reloadProperty = true;
      }
    }
  }

  var allPropertyRowsPath = './/table[@class="main_table"]/tbody/tr';
  var allPropertyRows = xpath(allPropertyRowsPath, innerPageElt);

  // get number of payments per day
  var tempObj = xpathFirst('.//div[contains(text(), "Cash Flow")]', innerPageElt);
  if (tempObj && tempObj.innerHTML.match(/every (.+) minutes/)) {
    var payments = 1440 / parseInt(RegExp.$1);
  } else {
    var payments = 24;
  }

  if (allPropertyRows.snapshotLength > 0) {
    var allProperties = new Array();
    var bestProperty = { id:false, roi:0, row:0 };
    var selectProperties = GM_getValue('selectProperties');
    if (!selectProperties && GM_getValue('autoBuy') == 'checked') {
      addToLog('warning Icon', 'Auto-buy cannot work because no properties have been selected in the Properties tab of the settings menu. Turning auto-buy off.');
      GM_setValue('autoBuy', 0);
    }

    for (var currentRow = 0; currentRow < allPropertyRows.snapshotLength; currentRow++) {
      var currentRowHtml = allPropertyRows.snapshotItem(currentRow).innerHTML;

      if (/prop_[\w\d]+\.jpg/.test(currentRowHtml)) {
        var currentProperty = { id:0, roi:0, cost:0, name:'', row:0, path:'', income:0, mobsize:0, amount:0, owned:0, requiredId:0, requiredCost:0, requiredName:'' }
        var currentRowXpath = allPropertyRowsPath + "[" + (currentRow+1) + "]/";

        // get id
        var tempObj = xpathFirst(currentRowXpath + 'td[3]/table/tbody/tr/td[2]/form/table/tbody/tr/td/input[@name="property"]', innerPageElt);
        if (tempObj) {
          currentProperty.id = tempObj.value;
        }

        // get required mafia size
        tempObj = xpathFirst(currentRowXpath + "td[3]/table/tbody/tr[1]/td[1]", innerPageElt);
        if (tempObj) {
          currentProperty.mobsize = tempObj.innerHTML.match(/<strong>(\d+)<\/strong>/) ? parseInt(RegExp.$1) : 0;
        }

        // get max buy amount and select
        tempObj = xpathFirst('.//form[@id="'+SCRIPT.appID+'_propBuy_' + currentProperty.id + '"]/table/tbody/tr/td/select[@name="amount"]', innerPageElt);
        if (tempObj) {
          if (tempObj.length) {
            currentProperty.amount = tempObj.length;
            tempObj[currentProperty.amount - 1].selected = true;
          }
        }

        // get name & income
        tempObj = xpath(currentRowXpath + "td[2]/strong | " + currentRowXpath + "td[2]/div/strong", innerPageElt);
        if (tempObj.snapshotLength > 1) {
          currentProperty.name = tempObj.snapshotItem(0).innerHTML;
          currentProperty.income = parseCash(tempObj.snapshotItem(1).innerHTML);
        }

        //tempObj = xpath(currentRowXpath + "/td[3]/table/tbody/tr[2]/td | " + currentRowXpath + "td[2]/div/strong", innerPageElt);

        // get cost
        tempObj = xpathFirst(currentRowXpath + "td[3]/table/tbody/tr[1]/td", innerPageElt);
        if (tempObj) {
          tempObj = tempObj.innerHTML;
          if (tempObj) {
            // cost of required undeveloped space
            if (tempObj.match(/Built on: ([\w\s]+)/i)) {
              for (var j = 0; j < allProperties.length; j++) {
                if (allProperties[j].name == RegExp.$1) {
                  currentProperty.requiredCost = allProperties[j].cost;
                  if (allProperties[j].owned < currentProperty.amount) {
                    currentProperty.requiredId   = allProperties[j].id;
                    currentProperty.requiredName = allProperties[j].name;
                  }
                  break;
                }
              }
            }
            // cost of property
            if (tempObj.match(REGEX_CASH)) {
              currentProperty.cost = parseCash(RegExp.lastMatch);
            }
          }
        }

        // get number of owned
        tempObj = xpathFirst(currentRowXpath + "td[3]/table/tbody/tr[2]/td", innerPageElt);
        if (tempObj && tempObj.innerHTML.match(/(\d+)/)) {
          currentProperty.owned = RegExp.$1;
        } else {
          tempObj = xpathFirst(currentRowXpath + "td[2]/div/strong[2]", innerPageElt);
          if (tempObj && tempObj.innerHTML.match(/(\d+)/)) {
            currentProperty.owned = RegExp.$1;
          }
        }

        // calculate roi and check if its the highest
        if (currentProperty.income > 0 && currentProperty.cost > 0) {
          currentProperty.roi = currentProperty.income / (currentProperty.cost + currentProperty.requiredCost);
          if (selectProperties.indexOf(currentProperty.name) != -1 && bestProperty.roi < currentProperty.roi && mafia >= currentProperty.mobsize) {
            bestProperty = currentProperty;
            bestProperty.row  = currentRow;
            bestProperty.path = xpathFirst(currentRowXpath + "td[3]/table/tbody/tr[1]/td/strong", innerPageElt);
          }
        }

        // display roi & total income on page
        if (currentProperty.roi > 0) {
          var tempItem = xpath(currentRowXpath + 'td[2]/strong', innerPageElt).snapshotLength == 1 ? 0 : 1;
          var roiText = xpath(currentRowXpath + 'td[2]/div', innerPageElt);
          roiText = makeElement('div', roiText.snapshotItem(tempItem), {'style':'margin:10px 0 10px 0; font-size:13px'});
          roiText.appendChild(document.createTextNode('Total Income: $' + makeCommaValue(currentProperty.owned * currentProperty.income)));
          roiText.appendChild(document.createElement("br"));
          roiText.appendChild(document.createTextNode('ROI: '));
          makeElement('strong', roiText, { 'style':'color:#FFD927'}).appendChild(document.createTextNode(''+Math.round(currentProperty.roi*100000000)/100000));
          var roiTime = (1/currentProperty.roi) / payments; // days
          if (roiTime > 3652.5) { // display years
            roiTime /= 365.25;
            var roiTimeText = ' years)';
          } else if (roiTime > 365.25) { // display months
            roiTime /= 30.4375;
            var roiTimeText = ' months)';
          } else {
            var roiTimeText = ' days)';
          }
          roiText.appendChild(document.createTextNode(' (' + (Math.round(roiTime * 100) / 100) + roiTimeText));
        }

        allProperties.push(currentProperty);
      }
    }

    // highlight best property
    if (bestProperty.row > 0) {
      allPropertyRows.snapshotItem(bestProperty.row).style.backgroundColor="#020";
      best = makeElement('div', bestProperty.path, {'style':'color:#52E259; font-size: 11px; margin-top:10px'});
      makeElement('img', best, {'src':stripURI(goodIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      best.appendChild(document.createTextNode(' BEST'));
    }

    if (GM_getValue('autoBuy') == 'checked') {
      if (bestProperty.amount) {
        // Display next property for auto-buy.
        if (bestProperty.requiredId > 0) {
          makeElement('div', xpathFirst('.//div[@class="text"]', innerPageElt), {'style':'margin-top:12px'}).appendChild(document.createTextNode('Next auto-buy property: ' + bestProperty.amount + 'x ' + bestProperty.requiredName + ' ($' + makeCommaValue(bestProperty.requiredCost * bestProperty.amount) + ') to build ' + bestProperty.name));
        } else {
          makeElement('div', xpathFirst('.//div[@class="text"]', innerPageElt), {'style':'margin-top:12px'}).appendChild(document.createTextNode('Next auto-buy property: ' + bestProperty.amount + 'x ' + bestProperty.name + ' ($' + makeCommaValue(bestProperty.cost * bestProperty.amount) + ')'));
        }

        // Remember the next property for auto-buy.
        if (bestProperty.requiredId > 0 && (GM_getValue('buyType', 0) != bestProperty.requiredId || GM_getValue('buyCost', 0) != bestProperty.requiredCost * bestProperty.amount)) {
          GM_setValue('buyName', bestProperty.requiredName);
          GM_setValue('buyType', bestProperty.requiredId);
          // Save as a string because 32-bit integers aren't big enough.
          GM_setValue('buyCost', '' + bestProperty.requiredCost * bestProperty.amount);
          GM_setValue('buyRequired', true);
          addToLog('process Icon', 'Next auto-buy property: ' + bestProperty.amount + 'x <span class="good">' + bestProperty.requiredName + '</span> (<span class="expense">$' + makeCommaValue(bestProperty.requiredCost * bestProperty.amount) + '</span>) to build ' + bestProperty.name);
        } else if (GM_getValue('buyType', 0) != bestProperty.id || GM_getValue('buyCost', 0) != bestProperty.cost * bestProperty.amount) {
          GM_setValue('buyName', bestProperty.name);
          GM_setValue('buyType', bestProperty.id);
          // Save as a string because 32-bit integers aren't big enough.
          GM_setValue('buyCost', '' + bestProperty.cost * bestProperty.amount);
          GM_setValue('buyRequired', false);
          addToLog('process Icon', 'Next auto-buy property: ' + bestProperty.amount + 'x <span class="good">' + bestProperty.name + '</span> (<span class="expense">$' + makeCommaValue(bestProperty.cost * bestProperty.amount) + '</span>)');
        }

        DEBUG('Next auto-buy: name=' + GM_getValue('buyName', '') + ', id=' + GM_getValue('buyType', '') + ', cost=' + GM_getValue('buyCost', '') + ', req=' + GM_getValue('buyRequired', '') + ', reqMafia=' + bestProperty.mobsize + ', mafia=' + mafia);
      } else {
        // Nothing available to buy.
        GM_setValue('buyCost', 0);
        makeElement('div', xpathFirst('.//div[@class="text"]', innerPageElt), {'style':'margin-top:12px'}).appendChild(document.createTextNode('Next auto-buy property: Nothing available for purchase.'));
        addToLog('process Icon', 'Next auto-buy property: Nothing available for purchase.');
      }
    }
  }

  if (reloadProperty == true) {
    Autoplay.fx = goPropertyNav;
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  return false;
}

function loadHome() {
  document.location = 'http://apps.facebook.com/inthemafia/index.php';
}

function loadBank() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'bank' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadJobTab(tabno) {
  DEBUG('Switching to job tab ' + tabno + '.');
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'job' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1) +
                      '&tab=' + tabno +
                      '&bar=' + (tabno < 6? '0' : '1');
}

function loadFightNav() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'fight' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadRobTab() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'racket' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadPropertyNav() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'property' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadBusinessesNav() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'business' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadDeleteNews() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'index' +
                      SCRIPT.action + 'deletenews' +
                      SCRIPT.city + (city + 1);
}

function loadLocation(toCity) {
  if (toCity < 0 || toCity >= cities.length) {
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized destination "' + toCity + '".');
      return;
  }

  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'travel' +
                      SCRIPT.action + 'travel' +
                      SCRIPT.city + (city + 1) +
                      '&destination=' + (toCity + 1) +
                      '&from=index';
}

function clickElement(elt) {
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Null element passed to clickElement().');
    return;
  }

  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

function goLinkElement(elt) {
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Null element passed to goLinkElement().');
    return;
  }

  if (!useClickSimulation) {
    document.location = elt.href;
  } else {
    clickElement(elt);
    DEBUG('Clicked element.');
  }
}

function goHome() {
  if (!useClickSimulation) {
    loadHome();
    return;
  }

  // Find the visible home link.
  var elts = $x('//div[@class="nav_link home_link"]//a');
  var elt;
  for (var i = 0; i < elts.length; i++) {
    if (elts[i].scrollWidth) {
      elt = elts[i];
      break;
    }
  }
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find home link to click. Using fallback method.');
    loadHome();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go home.');
}

function goBank() {
  if (!useClickSimulation) {
    loadBank();
    return;
  }

  var elt = xpathFirst('//a[@class="bank_deposit"]');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find bank link to click. Using fallback method.');
    loadBank();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to bank.');
}

function goJobsNav() {
  var elt = xpathFirst('//div[@class="nav_link jobs_link"]/a');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find jobs nav link to click.');
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to jobs.');
}

function goJobTab(tabno) {
  if (!useClickSimulation) {
    loadJobTab(tabno);
    return;
  }

  var currentTab = currentJobTab();
  if (currentTab == -1) {
    // We're not even on a jobs page yet. Go there.
    goJobsNav();
    return;
  }
  if (currentTab == tabno) {
    DEBUG('Already on job tab ' + tabno + '.');
    return;
  }

  // No job tab. Make sure we're on the correct job bar.
  var barno = city == NY? (tabno < 6? 0 : 1) : 0;
  var currentBar = city == NY? (currentTab < 6? 0 : 1) : 0;
  if (currentBar != barno) {
    var elt = xpathFirst('.//ul[@id="' + SCRIPT.appID + '_jobs_bar' + barno + '"]//a[contains(@onclick, "&bar=' + barno + '")]', innerPageElt);
    if (!elt) {
      addToLog('warning Icon', 'BUG DETECTED: Can\'t find jobs bar ' + barno + ' link to click. Currently on job bar ' + currentBar + ', tab ' + currentTab + '.');
      return;
    }
    clickElement(elt);
    DEBUG('Clicked to go to job bar ' + barno + '.');
    return;
  }

  var elt = xpathFirst('.//ul[@id="' + SCRIPT.appID + '_jobs_bar' + barno + '"]//a[contains(@onclick, "&tab=' + tabno + '")]', innerPageElt);
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t find jobs tab link to click.');
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to job tab ' + tabno + '.');
}

function goJob(jobno, context) {
  var elt = xpathFirst('.//table[@class="job_list"]//a[contains(@onclick, "job=' + jobno + '&")]', innerPageElt);
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t find job ' + jobno + ' link to click.');
    return;
  }
  clickAction = 'job';
  clickContext = context;
  clickElement(elt);
  DEBUG('Clicked job ' + jobno + '.');
}

function goFightNav() {
  if (!useClickSimulation) {
    loadFightNav();
    return;
  }

  var elts = $x('//div[@class="nav_link fight_link"]//a');
  var elt;
  for (var i = 0; i < elts.length; i++) {
    if (elts[i].scrollWidth) {
      elt = elts[i];
      break;
    }
  }
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find fight nav link to click. Using fallback method.');
    loadFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to fights.');
}

function goRobTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(@onclick, "controller=racket")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to robbing.');
}

function goHitlistTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(@onclick, "controller=hitlist")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to hitlist.');
}

function goPropertyNav() {
  if (!useClickSimulation) {
    loadPropertyNav();
    return;
  }

  var elts = $x('//div[@class="nav_link properties_link"]//a');
  var elt;
  for (var i = 0; i < elts.length; i++) {
    if (elts[i].scrollWidth) {
      elt = elts[i];
      break;
    }
  }
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find properties nav link to click. Using fallback method.');
    loadPropertyNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to properties.');
}

function goBusinessesNav() {
  if (!useClickSimulation) {
    loadBusinessesNav();
    return;
  }

  var elt = xpathFirst('//*[@id="' + SCRIPT.appID + '_nav_link_businesses"]//a');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find businesses nav link to click. Using fallback method.');
    loadBusinessesNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to businesses.');
}

function goDeleteNews() {
  if (!useClickSimulation) {
    loadDeleteNews();
    return;
  }

  var elt = xpathFirst('//a[contains(text(), "clear all updates")]');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find delete news link to click. Using fallback method.');
    loadDeleteNews();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to delete news.');
}

function goNY() {
  goLocation(0);
}

function goCuba() {
  goLocation(1);
}

function goLocation(toCity) {
  if (toCity == city) {
    DEBUG('Already in ' + cities[toCity] + '.');
    return;
  }
  if (!useClickSimulation) {
    loadLocation(toCity);
    return;
  }

  // Find and click the travel element for the given destination.
  var elt;
  if (toCity == NY) {
    elt = document.getElementById(SCRIPT.appID + '_button_travel_nyc');
  } else if (toCity == CUBA) {
    elt = document.getElementById(SCRIPT.appID + '_button_travel_cuba');
  }
  if (elt) {
    clickElement(elt);
    DEBUG('Clicked to travel to ' + cities[toCity] + '.');
    return;
  }

  addToLog('warning Icon', 'Unable to find ' + cities[toCity] +
           ' travel link. Using fallback method.');
  loadLocation(toCity);
}

function decodeHTMLEntities(str) {
  if (!str) return str;

  scratchpad.innerHTML = str;
  return scratchpad.value;
}


function handleResponse(responseDetails, action, context) {
  //  DEBUG('handleResponse: status='+ responseDetails.status);
  //  DEBUG('handleResponse: statusText='+ responseDetails.statusText);
  //  DEBUG('handleResponse: responseHeaders='+ responseDetails.responseHeaders);
  //  DEBUG('handleResponse: responseText='+ responseDetails.responseText);

  // Check for error pages.
  if (responseDetails.responseText.indexOf('Error while loading page') != -1) {
    DEBUG('Response: "Error while loading page..." (service interruption)');
    return;
  }
  if (responseDetails.responseText.indexOf('request was not processed') != -1) {
    DEBUG('Request was not processed.');
    return;
  }
  if (responseDetails.responseText.indexOf('Login to Facebook') != -1) {
    addToLog('warning Icon', '<span class="warn">WARNING:</span> Reached the Mafia Wars login page.');
    addToLog('warning Icon', '<span class="warn">Please adjust your browser\'s settings to allow third-party cookies.</span>');
    addToLog('warning Icon', '<span class="warn">Or is this Facebook user logged in on another computer?</span>');
    return;
  }

  // Interpret the response.
  var doc = document.createElement('div');
  doc.innerHTML = responseDetails.responseText;
  logResponse(doc, action, context);
}

//ATK
//Hourly Stats Tracking - Experimental Work in Progress
function updateHourlyStats() {
//Planned data package order:  [0]Hour of the Day |
//  [1]NY Fight Exp | [2]NY Fight Win Count   | [3]NY Fight Loss Count | [4]NY Fight $ Won | [5]NY Fight $Lost |
//  [6]NY Rob Exp   | [7]NY Rob Success Count | [8]NY Rob Fail Count   | [9]NY Rob $Won    | [10]NY Rob $Lost  |
//  [11]NY Fight Loss Crit Hit Count | [12]NY Fight Loss Bodyguard Count | [13]NY Fight Loss Too Strong Count |
//  Variables below not yet created
//  [x]NY Capo $US | [x]NY Assist Exp | [x]NY Assist $US |
//  [x]NY Attacked Exp(net after deaths) | [x]NY Attacked $Won | [x]NY Attacked $Lost |
//  [x]NY Robbed Exp                     | [x]NY Robbed $Won   | [x]NY Robbed $Lost   |
//  [x]NY Job Count | [x]NY Job Exp | [x]NY Job $Made |
//  >>> BEGIN CUBA <<<
//  [x]Cuba Fight Exp | [x]Cuba Fight Win Count | [x]Cuba Fight Loss Count | [x]Cuba Fight $C Won | [x]Cuba Fight $C Lost |
//  [x]Cuba Fight Loss Crit Hit Count | [x]Cuba Fight Loss Bodyguard Count | [x]Cuba Fight Loss Too Strong Count |
//  [x]Cuba Capo $C | [x]Cuba Assist Exp | [x]Cuba Assist $C |
//  [x]Cuba Attacked Exp(net after deaths) | [x]Cuba Attacked $C Won | [x]Cuba Attacked $C Lost |
//  [x]Cuba Robbed Exp                     | [x]Cuba Robbed $C Won   | [x]Cuba Robbed $C Lost   |
//  [x]Cuba Job Count | [x]Cuba Job Exp | [x]Cuba Job $C Made

//  Max potential storage 41 * 24 = 984 elements

  var currentTime = new Date();
  var currentHour = currentTime.getHours();

  var hrDataPack = "";
  hrDataPack = currentHour + '|' + GM_getValue('fightExpNY', 0) + '|' + GM_getValue('fightWinsNY', 0) + '|' +
     GM_getValue('fightLossesNY', 0) + '|' + GM_getValue('fightWin$NY', 0) + '|' + GM_getValue('fightLoss$NY', 0) + '|' +
     GM_getValue('fightLossCHNY', 0) + '|' + GM_getValue('fightLossBGCHNY', 0) + '|'+ GM_getValue('fightLossStrongNY', 0);

  if (GM_getValue('hourlyStats', '0') == '0') {
    GM_setValue('hourlyStats', hrDataPack);
  } else {
    //pull existing stored hourly stats
    var splitValues = GM_getValue('hourlyStats', '').split(',');
    if (splitValues.length < 24) {
      splitValues.push(currentHour + '|0|0|0|0|0|0|0|0');
    }else {
      if ((GM_getValue('hourOfDay')*1 == 23 && currentHour != 0 )|| currentHour -1 != GM_getValue('hourOfDay')*1 && GM_getValue('hourOfDay') != isNaN(GM_getValue('hourOfDay'))){
        //We missed some hours so we need to carry the last good values forward
        if (GM_getValue('hourOfDay')*1 > currentHour){
          var tempHour = currentHour + 24;
        }else{
          var tempHour = currentHour;
        }

        for (var i = GM_getValue('hourOfDay')*1 + 1; i < GM_getValue('hourOfDay')*1 + (tempHour - GM_getValue('hourOfDay')*1); i++){
          var valString = splitValues[GM_getValue('hourOfDay')];
          valString = valString.substring(valString.indexOf('|'), valString.length);
          if (i > 23){
            splitValues.push(String(i-24) + valString);
          }else {
            splitValues.push(i + valString);
          }
        }
      }
    }
    //create temp arrays
    var hourlyFightExpNY = new Array(24);     //position [1]
    var hourlyFightWinsNY = new Array(24);    //position [2]
    var hourlyFightLossesNY = new Array(24);  //position [3]
    var hourlyFightWin$NY = new Array(24);    //position [4]
    var hourlyFightLoss$NY = new Array(24);   //position [5]
    var hourlyLossCrHitNY = new Array(24);    //position [6]
    var hourlyLossBgCrHitNY = new Array(24);  //position [7]
    var hourlyLossStrongNY = new Array(24);   //position [8]

    // Organize Hourly stat data into ordered sets
    for (var i = 0; i < splitValues.length; i++){
      //check length of each datapack to ensure it is the right size and fills missing with zeroes
      //this addresses issues when adding new metrics to the datapackage
      if (splitValues[i].split('|').length < 9) {
        for (var n = splitValues[i].split('|').length; n < 9; n++){
          splitValues[i] += '|0';
        }
      }
      if (splitValues[i].split('|')[0] == currentHour) {
        //pull data from same time day prior for "25th" hour
        var fightExpNY25 = splitValues[i].split('|')[1]*1;
        var fightWinsNY25 = splitValues[i].split('|')[2]*1;
        var fightLossesNY25 = splitValues[i].split('|')[3]*1;
        var fightWin$NY25 = splitValues[i].split('|')[4]*1;
        var fightLoss$NY25 = splitValues[i].split('|')[5]*1;
        var fightLossCrHitNY25 = splitValues[i].split('|')[6];
        var fightLossBgCrHitNY25 = splitValues[i].split('|')[7];
        var fightLossStrongNY25 = splitValues[i].split('|')[8];
        //Insert current hour values
        hourlyFightExpNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[1]*1;
        hourlyFightWinsNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[2]*1;
        hourlyFightLossesNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[3]*1;
        hourlyFightWin$NY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[4]*1;
        hourlyFightLoss$NY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[5]*1;
        hourlyLossCrHitNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[6]*1;
        hourlyLossBgCrHitNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[7]*1;
        hourlyLossStrongNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[8]*1;
      } else {
        //populate other hourly data
        hourlyFightExpNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[1]*1;
        hourlyFightWinsNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[2]*1;
        hourlyFightLossesNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[3]*1;
        hourlyFightWin$NY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[4]*1;
        hourlyFightLoss$NY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[5]*1;
        hourlyLossCrHitNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[6]*1;
        hourlyLossBgCrHitNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[7]*1;
        hourlyLossStrongNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[8]*1;
      }
    }

//Prep Arrays for hourly graphing
    var fightExpNY = prepStatsArray(hourlyFightExpNY, currentHour);
    var fightWinsNY = prepStatsArray(hourlyFightWinsNY, currentHour);
    var fightLossesNY = prepStatsArray(hourlyFightLossesNY, currentHour);
    var fightWin$NY = prepStatsArray(hourlyFightWin$NY, currentHour);
    var fightLoss$NY = prepStatsArray(hourlyFightLoss$NY, currentHour);
    var fightLossCHNY = prepStatsArray(hourlyLossCrHitNY, currentHour);
    var fightLossBGCHNY = prepStatsArray(hourlyLossBgCrHitNY, currentHour);
    var fightLossStrongNY = prepStatsArray(hourlyLossStrongNY, currentHour);

//Add 25th hour data to beginning of graphing arrays
    fightExpNY.unshift(fightExpNY25);
    fightWinsNY.unshift(fightWinsNY25);
    fightLossesNY.unshift(fightLossesNY25);
    fightWin$NY.unshift(fightWin$NY25);
    fightLoss$NY.unshift(fightLoss$NY25);
    fightLossCHNY.unshift(fightLossCrHitNY25);
    fightLossBGCHNY.unshift(fightLossBgCrHitNY25);
    fightLossStrongNY.unshift(fightLossStrongNY25);

//create hour labels based on current hour
    var hourLabels = "";
    for (i = 0; i < 24; i += 2) {
      var ind;
      var hrdisp;
      ind = (currentHour *1) - i;
      if (ind < 0) {ind = 24 + ind;}
      if (ind > 11) {hrdisp = String((12 - ind) * -1) + 'p';} else {hrdisp = String(ind) + 'a';}
      hrdisp = (hrdisp == '0a') ? '12a' : hrdisp;
      hrdisp = (hrdisp == '0p') ? '12p' : hrdisp;
      hourLabels = '|' + hrdisp + hourLabels;
    }
    hourLabels = '|' + hourLabels.split('|')[12] + hourLabels;

//lets make some graphs!
    //statSpecs Array Format: [0]Min, [1]Max. [2]Avg [3]Sum [4]Valid Data Count
    var statSpecsArrayA = [];
    var statSpecsArrayB = [];

    var graphOutput = "";

    //Gain rate per hour
    gainRateNY = [];
    for (var i = 0; i < fightWinsNY.length; i++) {
      gainRateNY[i] = fightExpNY[i]/(fightWinsNY[i] + fightLossesNY[i]);
      if (isNaN(gainRateNY[i])) { gainRateNY[i] = 0; }
      gainRateNY[i] = Math.round(gainRateNY[i] * Math.pow(10,2))/Math.pow(10,2);
    }
    statSpecsArrayA = getStatSpecs(gainRateNY, 0);
    graphOutput = '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=NY+Fight+Gain+Rate+per+Hr+of+Day|Min.+=+' + String(statSpecsArrayA[0]) + '+++Max.+=+' +String(statSpecsArrayA[1]) + '+++Avg+=+' + String(statSpecsArrayA[2]) + '/hr&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,04B4AE,0,0,4|o,05E6DE,0,-1.0,6&chd=t:' + String(gainRateNY) + '"/>';

    //NY Fight XP gains per hour
    var diffArrayA = getStatDiffs(fightExpNY);
    statSpecsArrayA = getStatSpecs(diffArrayA, 0);
    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=Total+NY+Fight+XP+Gained+per+Hr+of+Day|Min.+=+' + String(statSpecsArrayA[0]) + '+++Max.+=+' +String(statSpecsArrayA[1]) + '+++Avg+=+' + String(statSpecsArrayA[2]) + '/hr&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,92ED97,0,0,4|o,25DA2E,0,-1.0,6&chd=t:' + String(diffArrayA) + '"/>';

    //NY Fight Wins/Losses since reset chart
    var NYfightWinPct = (GM_getValue('fightWinsNY', 0)/(GM_getValue('fightWinsNY', 0) + GM_getValue('fightLossesNY', 0)))*100;
    if (isNaN(NYfightWinPct)){NYfightWinPct = 0;} else {NYfightWinPct = Math.round(NYfightWinPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYfightLosePct = (GM_getValue('fightLossesNY', 0)/(GM_getValue('fightWinsNY', 0) + GM_getValue('fightLossesNY', 0)))*100;
    if (isNaN(NYfightLosePct)) {NYfightLosePct = 0; } else {NYfightLosePct = Math.round(NYfightLosePct * Math.pow(10, 1))/Math.pow(10, 1);}

    //NY Fight Loss Type breakdown pie
    var NYStrongLossPct = (GM_getValue('fightLossStrongNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYStrongLossPct)){NYStrongLossPct = 0;}else{NYStrongLossPct = Math.round(NYStrongLossPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYCHLossPct = (GM_getValue('fightLossCHNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYCHLossPct)){NYCHLossPct = 0;}else{NYCHLossPct = Math.round(NYCHLossPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYBGCHLossPct = (GM_getValue('fightLossBGCHNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYBGCHLossPct)){NYBGCHLossPct = 0;}else{NYBGCHLossPct = Math.round(NYBGCHLossPct * Math.pow(10, 1))/Math.pow(10, 1);}

    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=p3&chf=bg,s,111111&chts=BCD2EA,12&chco=52E259|EC2D2D&chdl=' + String(NYfightWinPct) + '%|'+ String(NYfightLosePct) + '%&chdlp=t&chtt=NY+Fight+Wins+vs+Losses|since+stats+reset&chs=157x150&chd=t:' + String(NYfightWinPct) + ',' + String(NYfightLosePct) + '"/>' +
                          '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=p3&chf=bg,s,111111&chts=BCD2EA,12&chco=EC2D2D&chdl=CH:' + String(NYCHLossPct) + '%|BG:'+ String(NYBGCHLossPct) + '%|TS:'+ String(NYStrongLossPct) + '%&chdlp=t&chtt=NY+Fight+Losses+by+Type&chs=157x150&chd=t:' + String(NYCHLossPct) + ',' + String(NYBGCHLossPct) + ',' + String(NYStrongLossPct) + '"/><br>' +
                          '<span style="color:#888888;">CH = Critical Hit &#166; BG = Bodyguard Critical Hit &#166; TS = Too Strong</span>';

    //NY Fight $ Won/lost line graph
    statSpecsArrayA = getStatSpecs(fightWin$NY, 0);
    statSpecsArrayB = getStatSpecs(fightLoss$NY, 0);
    if (statSpecsArrayB[0]*1 < statSpecsArrayA[0]*1) {
      statSpecsArrayA[0] = statSpecsArrayB[0];
    }
    if (statSpecsArrayB[1]*1 > statSpecsArrayA[1]*1) {
      statSpecsArrayA[1] = statSpecsArrayB[1];
    }
    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=Total+NY+Fight+$+Won+vs.+Lost+by+Hr+of+Day&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,92ED97,0,0,4|o,25DA2E,0,-1.0,6|D,F05C5C,1,0,4|o,D21414,1,-1.0,6&chd=t:' + String(fightWin$NY) + '|' + String(fightLoss$NY) + '"/>';

    //addToLog('info Icon', graphOutput);
    graphOutput = '<span style="color:#669999;">Stats as of: ' + currentTime.toLocaleString() + '</span><br>' + graphOutput;
    GM_setValue('graphBox', graphOutput);

//re-pack hourly stats and save to GM variable
    hrDataPack = []
    for (i = 0; i < 24; i++){
      hrDataPack[i]= i + '|' + hourlyFightExpNY[i] + '|' + hourlyFightWinsNY[i] + '|' + hourlyFightLossesNY[i] + '|' +
          hourlyFightWin$NY[i] + '|' + hourlyFightLoss$NY[i] + '|' + hourlyLossCrHitNY[i] + '|' + hourlyLossBgCrHitNY[i] +
          '|' + hourlyLossStrongNY[i];
    }
    GM_setValue('hourlyStats', String(hrDataPack));

  }
  GM_setValue('hourOfDay', String(currentHour));
}

function prepStatsArray(workingArray, currentHour){
  for (var i = 0; i < workingArray.length; i++){
    if (isNaN(workingArray[i])) {
      workingArray[i] = 0;
    }
  }
  currentHour = currentHour * 1;
  var outputVals = [];
  for (i = 0; i < 24; i++){
    var ind;
    ind = currentHour - i;
    if (ind < 0) {ind = 24 + ind}
      outputVals.unshift(workingArray[ind]);
  }
  return outputVals;
}

//statSpecs Array
//Return Format: [0]Min, [1]Max. [2]Avg [3]Sum [4]Valid Count
function getStatSpecs(workingArray, includeZeroVals){
  var tempArray = [];
  var runningSum = 0;
  for (var i = 0; i < workingArray.length; i++) {
    if (workingArray[i] != 0 && includeZeroVals == 0) {
      tempArray.push(workingArray[i]);
      runningSum += workingArray[i];
    }else {
      runningSum += workingArray[i];
    }
  }
  if (includeZeroVals == 0) {
    tempArray.sort( function (a, b) { return a-b});
    var dataLen = tempArray.length;
    var dataMin = tempArray[0];
    var dataMax = tempArray[dataLen - 1];
  } else {
    workingArray.sort( function (a, b) { return a-b});
    var dataLen = workingArray.length;
    var dataMin = workingArray[0];
    var dataMax = workingArray[dataLen - 1];
  }
  var dataAvg = runningSum/dataLen;
  dataAvg = Math.round(dataAvg*Math.pow(10, 2))/Math.pow(10, 2);
//  alert("Sum: " + runningSum + "    len: " + dataLen + "   avg: " + dataAvg);
  return[dataMin, dataMax, dataAvg, runningSum, dataLen];
}

function getStatDiffs(workingArray) {
  diffArray = [];
  for (var i = 1; i < workingArray.length; i++) {
    if (workingArray[i] - workingArray[i-1] < 0) {
      diffArray.push(0)
    } else {
      diffArray.push(workingArray[i] - workingArray[i-1]);
    }
  }
  diffArray.unshift(0);
  return diffArray;
}

// This function gets the users gift ID and also sets the ID of
// the recipient of gifts.
function saveRecipientInfo() {
  var giftKey = document.body.innerHTML.match(/gift_key=([0-9a-f]+)/) ? RegExp.$1 : 'Not Found';
  GM_setValue("giftKey", giftKey);

  var recipientID = document.body.innerHTML.match(/recipients\[0\]=([0-9]+)/) ? RegExp.$1 : 'Not Found';
  GM_setValue("recipientID", recipientID);
  alert('Recipient:' + recipientID + '  Gift key:' + giftKey);
}

function takeFightStatistics(experience, cashStr, resultType) {
  var loc = cashStr.search(/C\$/) != -1? CUBA : NY;
  var xp = parseInt(experience);
  var cashInt = parseCash(cashStr);

  if (xp) {
    // WON the fight.
    GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + xp);
    GM_setValue('fightWinCountInt', GM_getValue('fightWinCountInt', 0) + 1);
    GM_setValue('totalWinDollarsInt', GM_getValue('totalWinDollarsInt', 0) + cashInt);

    //ATK New Stats
    if (loc == CUBA) {
      // Fight Win Cuba Stats
      GM_setValue('fightWinsCuba', GM_getValue('fightWinsCuba', 0) + 1);
      GM_setValue('fightExpCuba', GM_getValue('fightExpCuba', 0) + xp);
      GM_setValue('fightWin$Cuba', GM_getValue('fightWin$Cuba', 0) + cashInt);
    } else {
      // Fight Win NY Stats
      GM_setValue('fightWinsNY', GM_getValue('fightWinsNY', 0) + 1);
      GM_setValue('fightExpNY', GM_getValue('fightExpNY', 0) + xp);
      GM_setValue('fightWin$NY', GM_getValue('fightWin$NY', 0) + cashInt);
    }
  } else {
    // LOST the fight.
    GM_setValue('fightLossCountInt', GM_getValue('fightLossCountInt', 0) + 1);
    GM_setValue('totalLossDollarsInt', GM_getValue('totalLossDollarsInt', 0) + cashInt);

    //ATK New Stats
    if (loc == CUBA) {
      //Fight Loss Cuba Stats
      GM_setValue('fightLossesCuba', GM_getValue('fightLossesCuba', 0) + 1);
      GM_setValue('fightLoss$Cuba', GM_getValue('fightLoss$Cuba', 0) + cashInt);
      if (resultType == 2) {
        GM_setValue('fightLossBGCHCuba', GM_getValue('fightLossBGCHCuba', 0) + 1);
        GM_setValue('fightLossBGCH$Cuba', GM_getValue('fightLossBGCH$Cuba', 0) + cashInt);
      } else if (resultType == 1) {
        GM_setValue('fightLossCHCuba', GM_getValue('fightLossCHCuba', 0) + 1);
        GM_setValue('fightLossCH$Cuba', GM_getValue('fightLossCH$Cuba', 0) + cashInt);
      } else {
        GM_setValue('fightLossStrongCuba', GM_getValue('fightLossStrongCuba', 0) + 1);
        GM_setValue('fightLossStrong$Cuba', GM_getValue('fightLossStrong$Cuba', 0) + cashInt);
      }
    } else {
      //Fight Loss NY Stats
      GM_setValue('fightLossesNY', (GM_getValue('fightLossesNY', 0) + 1));
      GM_setValue('fightLoss$NY', (GM_getValue('fightLoss$NY', 0) + cashInt));
      if (resultType == 2) {
        GM_setValue('fightLossBGCHNY', GM_getValue('fightLossBGCHNY', 0) + 1);
        GM_setValue('fightLossBGCH$NY', GM_getValue('fightLossBGCH$NY', 0) + cashInt);
      } else if (resultType == 1) {
        GM_setValue('fightLossCHNY', GM_getValue('fightLossCHNY', 0) + 1);
        GM_setValue('fightLossCH$NY', GM_getValue('fightLossCH$NY', 0) + cashInt);
      } else {
        GM_setValue('fightLossStrongNY', GM_getValue('fightLossStrongNY', 0) + 1);
        GM_setValue('fightLossStrong$NY', GM_getValue('fightLossStrong$NY', 0) + cashInt);
      }
    }
  }
}

function logFightResponse(rootElt, resultElt, context) {
  var how = GM_getValue('staminaSpendHow');
  var inner = resultElt? resultElt.innerHTML : '';
  var innerNoTags = inner.untag();
  var messages = $x('.//td[@class="message_body"]', resultElt);
  var elt = messages[0]? messages[0].firstChild : undefined;

  if (resultElt.className == "fight_results") {
    // A fight took place. Results are in the "VS" format.

    if (how == STAMINA_HOW_FIGHT_RANDOM) {
      // Look for any new opponents in the displayed list.
      findFightOpponent(rootElt);
    } else if (how == STAMINA_HOW_FIGHT_LIST) {
      cycleSavedList('fightList');
    }

    // Determine whether the opponent is alive and may see future attacks.
    if (inner.indexOf('Attack Again') != -1) {
      setFightOpponentActive(context.id);
    } else {
      setFightOpponentInactive(context.id);
    }

    // Get the experience & cash.
    if (!innerNoTags.match(/(\d+)\s*experience/i)) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read win or loss.');
      addToLog('warning Icon', 'Result content: ' + inner);
      return false;
    }
    var experience = parseInt(RegExp.$1);
    var cost = innerNoTags.match(REGEX_CASH)? RegExp.lastMatch : undefined;

    // Get the opponent.
    var userElts = $x('.//div[@class="fightres_name"]/a', resultElt);
    var user = linkToString(userElts[1], 'user');
    var sizeElts = $x('.//div[contains(@class, "fightres_group_size")]', resultElt);
    var userSize = sizeElts[1]? sizeElts[1].innerHTML.untag().trim():undefined;
    var resultType;

    // Did we win or lose?
    var result = 'Fought ' + user + '\'s mafia of ' + userSize;
    if (experience) {
      result += ' <span class="good">' + 'WON ' + cost + '</span>' + ' and ' +
                '<span class="good">' + experience + ' experience</span>.';
      addToLog('good Icon', result);
    } else {
      result += ' <span class="bad">' +
                'LOST ' + cost + '</span>.';
      resultType = 0;
      // Check for a critical hit.
      if (innerNoTags.match(/critical hit/i)) {
        resultType++;
        if (innerNoTags.match(/bodyguard/i)) {
          resultType++;
          result += ' <span class="warn">(bodyguard critical hit)</span>';
          if (how == STAMINA_HOW_FIGHT_RANDOM &&
              GM_getValue('fightAvoidBodyguards') == 'checked') {
            setFightOpponentAvoid(context.id);
          }
        } else {
          result += ' <span class="warn">(critical hit)</span>';
        }
      } else {
        // Don't fight this opponent again.
        result += ' Too strong!';
        if (how == STAMINA_HOW_FIGHT_RANDOM ||
            GM_getValue('fightRemoveStronger') == 'checked') {
          result += ' Avoiding.';
          setFightOpponentAvoid(context.id);
        }
      }
      addToLog('bad Icon', result);
    }

    // Check for any fatalities.
    if (innerNoTags.match(/body\s+count\s+to\s+(\d+)/)) {
      addToLog('info Icon', killedMobsterIcon + ' You <span class="bad">' + 'KILLED' + '</span> ' + user + '. Your body count is now <span class="bad">' + RegExp.$1 + '</span>.');
    }
    if (innerNoTags.indexOf('You were snuffed') != -1) {
      addToLog('bad Icon', 'You <span class="bad">' + 'DIED' + '</span> in the fight.');
    }

    // Look for any loot.
    if (innerNoTags.match(/found (an? .*) while fighting/)) {
      addToLog('lootbag Icon', '<span class="loot">'+' Found '+
               RegExp.$1 + ' in the fight.</span>');
    }

    // Update the statistics.
    takeFightStatistics(experience, cost, resultType);
    updateLogStats();

  } else if (elt && elt.nodeValue.indexOf(' fought against ') != -1) {
    // First, look for any new opponents in the displayed list.
    // NOTE: This is at the top because putting it lower would risk
    //       it not getting called at all if an error occurs. This
    //       can lead to fighting the same opponents over and over.
    if (how == STAMINA_HOW_FIGHT_RANDOM) {
      findFightOpponent(rootElt);
    }

    // If fighting from the user-specified list, cycle it.
    if (how == STAMINA_HOW_FIGHT_LIST) {
      cycleSavedList('fightList');
    }

    // Determine whether the opponent is alive and may see future attacks.
    if (inner.indexOf('Attack Again') != -1) {
      setFightOpponentActive(context.id);
    } else {
      setFightOpponentInactive(context.id);
    }

    // Get the opponent.
    var user = linkToString(elt.nextSibling, 'user');
    var userSize;
    if (messages[1] && messages[1].innerHTML.match(/<\/a>'s mafia of (\d+)/i)) {
      userSize = RegExp.$1;
    }

    if (innerNoTags.match(/You WON.*You gained .*?(C?\$[\d,]*\d).*(\d+) experience points/)) {
      // The fight was won.
      var cost = RegExp.$1;
      var experience = RegExp.$2;
      var result = 'Fought ' + user + '\'s mafia of ' + userSize +
                   ' <span class="good">' + 'WON ' + cost + '</span>' +
                   ' and ' + '<span class="good">' + experience +
                   ' experience</span>.';

      // Check for a lucky win.
      if (innerNoTags.indexOf('against all odds') != -1) {
        result += ' <span class="warn">(against all odds)</span>';
        if (how == STAMINA_HOW_FIGHT_RANDOM ||
            GM_getValue('fightRemoveStronger') == 'checked') {
          result += ' Avoiding.';
          setFightOpponentAvoid(context.id);
        }
      }

      // Record the result.
      addToLog('good Icon', result);
      takeFightStatistics(experience, cost);
    } else if (innerNoTags.match(/You LOST.*along with .*?(C?\$[\d,]*\d)/)) {
      // The fight was lost.
      var fightLossType = 0;
      var cost   = RegExp.$1;
      var result = 'Fought ' + user + '\'s mafia of ' + userSize +
                   ' <span class="bad">' + 'LOST ' + cost + '.</span>';

      // Check for a critical hit.
      if (innerNoTags.indexOf('critical hit') != -1) {
        fightLossType += 1;
        if (innerNoTags.indexOf('Top Mafia Bodyguard') != -1) {
          fightLossType += 1;
          result += ' <span class="warn">(bodyguard critical hit)</span>';
          if (how == STAMINA_HOW_FIGHT_RANDOM &&
              GM_getValue('fightAvoidBodyguards') == 'checked') {
            setFightOpponentAvoid(context.id);
          }
        } else {
          result += ' <span class="warn">(critical hit)</span>';
        }
      } else {
        // Don't fight this opponent again.
        result += ' Too strong!';
        if (how == STAMINA_HOW_FIGHT_RANDOM ||
            GM_getValue('fightRemoveStronger') == 'checked') {
          result += ' Avoiding.';
          setFightOpponentAvoid(context.id);
        }
      }

      // Record the result.
      addToLog('bad Icon', result);
      takeFightStatistics(experience, cost, fightLossType);
    } else {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read win or loss.');
      addToLog('warning Icon', 'Message box content: ' + inner);
    }

    // Check for any fatalities.
    if (innerNoTags.indexOf('took out your opponent') != -1) {
      addToLog('info Icon', killedMobsterIcon + ' You <span class="bad">' + 'KILLED' + '</span> ' + user + '.');
    }
    if (innerNoTags.indexOf('You were snuffed') != -1) {
      addToLog('bad Icon', 'You <span class="bad">' + 'DIED' + '</span> in the fight.');
    }

    // Look for any loot.
    if (innerNoTags.match('found an? (.*) while fighting')) {
      addToLog('lootbag Icon', '<span class="loot">'+' Found '+
               RegExp.$1 + ' in the fight.</span>');
    }

    // Update fight log tracking statistics.
    updateLogStats();
  } else if (innerNoTags.indexOf('too weak') != -1) {
    addToLog('info Icon', '<span style="color:#FF9999;">' + 'Too weak to fight.'+ '</span>');
  } else if (innerNoTags.indexOf('You cannot fight') != -1) {
    if (context.id) {
      setFightOpponentAvoid(context.id);
    }
  } else {
    DEBUG('Unrecognized fight response.');
  }
  Autoplay.start();
  return true;
}

// Interprets the response to an action that was taken.
//
// rootElt: An element whose descendents compose the response to interpret.
// action:  The action taken, such as 'rob', 'fight', 'heal', etc.
// context: (optional) Any further data needed to describe the action
// Returns: true if something has been done that will cause the inner page
//          to change, such as clicking somewhere or loading another page.
function logResponse(rootElt, action, context) {
  // Set default timer properties.
  Autoplay.fx = goHome;
  Autoplay.delay = getAutoPlayDelay();

  var messagebox = xpathFirst('.//table[@class="messages"]', rootElt);
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@class="fight_results"]', rootElt);
  }

  if (action == 'fight' || action == 'rob') {
    // Get the "tmp" PHP parameter.
    var elt = xpathFirst('.//a[contains(@onclick, "xw_action=attack")]', rootElt);
    if (elt && elt.getAttribute('onclick').match(/tmp=([^&"'<]+)/)) {
      var fightTmpOld = fightTmp;
      fightTmp = RegExp.$1;
      if (fightTmp != fightTmpOld) {
        DEBUG('"tmp" parameter for ' + action + ' is: ' + fightTmp);
      }
      if (!messagebox && !fightTmpOld) {
          Autoplay.start();
          return true;
      }
    }
  }

  if (!messagebox) {
    DEBUG('logResponse: HTML=' + rootElt.innerHTML);
    DEBUG('Unexpected response page: no message box found!');

    // If fighting/robbing from a user-specified list, cycle it.
    // Otherwise, the problem might repeat indefinitely.
    if (action == 'fight' &&
        GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHT_LIST) {
      addToLog('warning Icon', 'Opponent ' + context.id +
               ' in your fight list may be invalid.');
      cycleSavedList('fightList');
    } else if (action == 'rob' &&
               GM_getValue('staminaSpendHow') == STAMINA_HOW_ROB_LIST) {
      addToLog('warning Icon', 'Opponent ' + context.id +
               ' in your rob list may be invalid.');
      cycleSavedList('robList');
    }

    return false;
  }

  // Since the attempted action received a response, stop skipping fight/rob.
  skipStaminaSpend = false;

  var inner = messagebox? messagebox.innerHTML : '';
  var innerNoTags = inner.untag();
  //var xw_time = rootElt.innerHTML.match(/xw_time=[^&]*/i);
  //var xw_exp_sig = rootElt.innerHTML.match(/xw_exp_sig=[^&]*/i);

  switch (action) {
    case 'fight':
      return logFightResponse(rootElt, messagebox, context);
      break;

    case 'heal':
      if (innerNoTags.indexOf('doctor healed') != -1) {
        var addHealth = inner.split('doctor healed <strong>')[1].split('health')[0];
        var cost = innerNoTags.match(REGEX_CASH);
        addToLog('health Icon', '<span style="color:#FF9999;">' + ' Health +'+ addHealth + ' for <span class="expense">' + cost + '</span>.</span>');
      } else if (innerNoTags.indexOf('You cannot heal so fast') != -1) {
        addToLog('warning Icon', '<span style="color:#FF9999;">' + 'Attempted to heal too quickly.' + '</span>');
      }
      break;

    case 'job':
      xpGainElt = xpathFirst('.//dd[@class="message_experience"]', messagebox);
      if (xpGainElt) {
        // Job completed successfully.
        var result = 'You performed ' + '<span class="job">' +
                     missions[GM_getValue('selectMission')][0] +
                     '</span> earning <span class="good">' +
                     xpGainElt.innerHTML.toLowerCase() + '</span>';
        var cashGainElt = xpathFirst('.//dd[@class="message_cash"]', messagebox);
        if (cashGainElt) {
          result += ' and <span class="good">' + cashGainElt.innerHTML + '</span>';
        }
        result += '.';
        if (innerNoTags.indexOf('you spent no energy') != -1) {
          result += ' You spent 0 energy on this job.';
        }
        addToLog('process Icon', result);
        jobProgress(rootElt);
        jobLoot(rootElt);
        // Add message if job tier prize found.
        if (innerNoTags.match(/.*(An* .+ was added to your inventory[^.]*.)/)) {
          addToLog('lootbag Icon', RegExp.$1);
        }

        // Ask for help if auto ask is on and enough experience was gained.
        var xpGain = parseInt(xpGainElt.innerHTML);
        var xpGainMin = parseInt(GM_getValue('autoAskJobHelpMinExp'));
        if (GM_getValue('autoAskJobHelp') == 'checked' &&
            (!xpGainMin || xpGain >= xpGainMin)) {
          var elt = xpathFirst('.//div[@class="message_buttons"]//input[@class="sexy_jobhelp"]', messagebox);
          if (elt) {
            Autoplay.fx = function() {
              clickElement(elt);
              addToLog('process Icon', 'Asked for help with <span class="job">' + missions[GM_getValue('selectMission')][0] + '</span>.');
            }
            Autoplay.start();
            return true;
          }
        }

        if (useClickSimulation) return false;
      } else if (innerNoTags.indexOf('You don\'t have the necessary items to perform this job') != -1) {
        addToLog('info Icon', 'You don\'t have the items necessary to do ' + missions[GM_getValue('selectMission', 1)][0] + '.');
        jobReqs(rootElt);
      } else if (innerNoTags.indexOf('You are not high enough level to do this job') != -1) {
        addToLog('warning Icon', 'You are not high enough level to do ' + missions[GM_getValue('selectMission', 1)][0] + '.');
        addToLog('warning Icon', 'Job processing will stop');
        GM_setValue('autoMission', 0);
      } else if (innerNoTags.match(/You need.*more energy.*requires.*?(\d+).*you only have.*?(\d+)/)) {
        addToLog('warning Icon', missions[GM_getValue('selectMission', 1)][0] +
                 ' requires ' + RegExp.$1 + ' energy. You only have ' +
                 RegExp.$2 + '.');
        addToLog('warning Icon', 'Is your wheelman bonus set correctly?');
      } else {
        DEBUG('Unrecognized job response.');
      }
      Autoplay.start();
      return true;
      break;

    case 'rob':
      var how = GM_getValue('staminaSpendHow');
      // NOTE: This is at the top because putting it lower would risk
      //       it not getting called at all if an error occurs. This
      //       can lead to robbing the same opponent over and over.
      if (how == STAMINA_HOW_ROB_LIST) {
          cycleSavedList('robList');
      }

      if (innerNoTags.indexOf('You successfully robbed') != -1) {
        var user = linkToString(xpathFirst('.//td[@class="message_body"]//a', messagebox), 'user');
        if (inner.match(/<\/a>('s mafia of \d+)/i)) {
          user += RegExp.$1;
        }
        innerNoTags.match(/taking\s.*?(\d+\s+damage).*dealing\s.*?([\d.]+%\s+damage).*?(C?\$[\d,]*\d).*?(\d+\s+experience)/);
        var damage_taken = RegExp.$1;
        var damage_dealt = RegExp.$2;
        var gained       = RegExp.$3;
        var experience   = RegExp.$4;
        addToLog('good Icon', 'Robbed ' + user +
                 ', taking ' + '<span class="bad">' + damage_taken + '</span>' +
                 ', dealing ' + '<span class="good">' + damage_dealt+'</span>' +
                 ' and gaining ' + '<span class="good">' + gained + '</span>'+
                 ' and ' + '<span class="good">' + experience + '</span>.');
        if (innerNoTags.match(/You put .* out of business!/)) {
          addToLog('good Icon', '<span class="good">' + RegExp.lastMatch + '<span>');
        }

        GM_setValue('robWinCountInt', (GM_getValue('robWinCountInt', 0) + 1));
        GM_setValue('totalExpInt', (GM_getValue('totalExpInt', 0) + parseInt(experience)));
        GM_setValue('totalWinDollarsInt', (GM_getValue('totalWinDollarsInt', 0) + parseCash(gained.split('$')[1])));
        setRobOpponentRobbed(context.id);
      } else if (innerNoTags.indexOf('police investigation') != -1) {
        addToLog('process Icon', 'Police investigation. Moving on quietly...');
        setRobOpponentRobbed(context.id);
      } else if (innerNoTags.indexOf('You failed to rob') != -1) {
        var user = linkToString(xpathFirst('.//td[@class="message_body"]//a', messagebox), 'user');
        if (inner.match(/<\/a>('s mafia of \d+)/i)) {
         user += RegExp.$1;
        }
        var damage_taken;
        var loss;
        if (innerNoTags.match(/taking\s.*?(\d+\s+damage).*losing.*?(C?\$[\d,]*\d)/)) {
          damage_taken = RegExp.$1;
          loss         = RegExp.$2;
        } else {
          DEBUG('BUG DETECTED: Can\'t read rob failure damage or cash loss.');
          DEBUG('Untagged message: ' + innerNoTags);
        }
        var result = '<strong>Failed</strong> to rob ' + user +
                     ' taking <span class="bad">' + damage_taken + '</span>' +
                     ' losing <span class="bad">' + loss + '</span>.';
        if (how == STAMINA_HOW_ROB_LIST &&
            GM_getValue('robRemoveStronger') == 'checked') {
          result += ' Avoiding.';
          setRobOpponentAvoid(context.id);
        }
        if (innerNoTags.match(/used\s+an?\s+(.*?)\s+to\s+boost\s+their/)) {
          result += '<span class="warn">(' + RegExp.$1 + ' boost)</span>';
        }
        addToLog('bad Icon', result);

        // Update statistics.
        if (loss) {
          loss = parseCash(loss.split('$')[1]);
          GM_setValue('totalLossDollarsInt', (GM_getValue('totalLossDollarsInt', 0) + loss));
        }
        GM_setValue('robLossCountInt', (GM_getValue('robLossCountInt', 0) + 1));
      } else if (innerNoTags.indexOf('You cannot rob') != -1) {
        if (context.id) {
          addToLog('process Icon', 'Removing family member from target list.');
          setRobOpponentAvoid(context.id);
        }
      } else {
        // not enough stam or health
        DEBUG('Rob response: ' + innerNoTags);
        DEBUG('Stamina or health may be too low. Or robbing a nonexistent casino.');
      }

      if (innerNoTags.indexOf('You were snuffed') != -1) {
        addToLog('bad Icon', 'You <span class="bad">DIED</span>.');
      }

      // Refresh statistics display.
      updateLogStats();

      Autoplay.start();
      return true;
      break;

    case 'hitman':
      // If the target is gone, there is nothing to do.
      if (innerNoTags.indexOf('someone else took out') != -1) {
        DEBUG(inner);
        return false;
      }

      // Default action is to reload the hitlist.
      if (stamina) {
        Autoplay.fx = goHitlistTab;
      }

      var targetKilled = (innerNoTags.indexOf('You knocked out') != -1);
      if (innerNoTags.indexOf('You WON') != -1) {
        var cashGain = innerNoTags.match(REGEX_CASH);
        var experience = innerNoTags.match(/\d+\s+experience\s+points?/);
        addToLog('good Icon', 'Hit ' + linkToString(context.profile, 'user') +
                 ', <span class="good">WON ' + cashGain + '</span> and ' +
                 '<span class="good">' + experience + '</span>.');
        if (!targetKilled && canSpendStamina() && ptsToNextLevel > 6) {
          var elt = xpathFirst('.//a[contains(@onclick,"attack")]', messagebox);
          if (elt) {
            // Attack again immediately.
            Autoplay.fx = function() {
              clickAction = action;
              clickContext = context;
              clickElement(elt);
              DEBUG('Clicked to repeat the hit on ' + clickContext.name +
                    ' (' + clickContext.id + ').');
            }
            Autoplay.delay = 0;
          }
        }
        // FIXME: take statistics?
      } else if (innerNoTags.indexOf('You LOST') != -1) {
        var cashLoss = innerNoTags.match(REGEX_CASH);
        var result = 'Hit ' + linkToString(context.profile, 'user') +
                     ' <span class="bad">LOST ' + cashLoss + '.</span>';
        if (context.id) {
          // Add the opponent to the avoid list.
          setHitmanOpponentAvoid(context.id);
          result += ' Avoiding.';
        }
        addToLog('bad Icon', result);
        // FIXME: take statistics?
      } else if (innerNoTags.indexOf('You cannot fight') != -1) {
        if (context.id) {
          setHitmanOpponentAvoid(context.id);
        }
      } else {
        DEBUG(inner);
      }
      if (innerNoTags.indexOf('You were snuffed') != -1) {
        addToLog('updateBad Icon', 'You <span class="bad">DIED</span>.');
      }
      if (targetKilled) {
        if (context.id) {
          addSavedListItem('hitmanListKilled', context.id, 100);
        }
        addToLog('lootbag Icon', killedMobsterIcon +
                 ' You <span class="bad">KILLED</span> ' +
                 linkToString(context.profile, 'user') +
                 ' and collected the <span class="money">' +
                 context.bounty + '</span> bounty set by ' +
                 linkToString(context.payer, 'user') + '.');
      }
      Autoplay.start();
      return true;
      break;

    case 'stats':
      if (innerNoTags.match(/You just upgraded your (\w+)/)) {
        var stat = RegExp.$1.toLowerCase();
        switch (stat) {
          case 'attack':
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ attackIcon + ' attack.</span>');
            break;
          case 'defense':
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ defenseIcon + ' defense.</span>');
            break;
          case 'health':
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ healthIcon + ' health.</span>');
            break;
          case 'energy':
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ energyIcon + ' energy.</span>');
            break;
          case 'stamina':
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ staminaIcon + ' stamina.</span>');
            break;
          default:
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded ' + stat + '.</span>');
        }
      } else {
        DEBUG('Failed to increment stat.');
      }
      break;

    case 'repair':
      if (innerNoTags.indexOf('You need more cash') != -1) {
        addToLog('warning Icon', 'Someone must have robbed you again before we could repair...');
      } else {
        addToLog('process Icon', 'For <span class="expense">$' +
                 makeCommaValue(context.cost) +
                 '</span>, you repaired all of your properties.');
        DEBUG(inner);
      }
      propertyGetDamage(rootElt);
      break;

    case 'protect':
      if (innerNoTags.indexOf('You need more cash') != -1) {
        addToLog('warning Icon', 'Someone must have robbed you again before we could protect...');
      } else {
        addToLog('process Icon', 'For <span class="expense">$' +
                 makeCommaValue(context.cost) +
                 '</span>, you protected all of your properties.');
        DEBUG(inner);
      }
      propertyGetDamage(rootElt);
      break;

    case 'energypack':
      addToLog('energyPack Icon', 'Used an <span class="good">Energy Pack</span>.');
      DEBUG(inner);
      break;

    case 'help':
      DEBUG('Parsing job help.');

      // Help attempt was processed. Increment the update count.
      GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));

      var user = linkToString(messagebox.getElementsByTagName('a')[0], 'user');
      if (context && !user) {
        user = context.user;
      }
      if (innerNoTags.indexOf('not your friend') != -1 ||
          innerNoTags.indexOf('You need to be friends') != -1) {
        addToLog('info Icon', 'Failed to help' + (user? ' ' + user : '') +
                 ' with job. Reason: not friends.');
      } else if (innerNoTags.indexOf('You are too late') != -1) {
          addToLog('info Icon', 'You are too late to help ' +
                   (user? ' ' + user : '') + ' with this job.');
      } else if (innerNoTags.indexOf('Not Again') != -1) {
          addToLog('info Icon', 'Already helped ' + user + ' with this job.');
      } else if (innerNoTags.indexOf('You received') != -1) {
          var cost = innerNoTags.match(REGEX_CASH);
          var experience = parseInt(innerNoTags.match(/\d+\s+experience\s+points?/));
          if (innerNoTags.indexOf('Special Bonus') != -1) {
            var loot = innerNoTags.split('gained a ')[1];
            addToLog('lootbag Icon', '<span class="loot">'+' Found a '+ loot.split('.<span')[0] + ' while helping on a job.</span>');
          }
          var result = 'You received ' + '<span class="good">' +
                   cost + '</span>' + ' and ' +
                   '<span class="good">' + experience + ' experience</span>' +
                   ' for helping ' + user + ' complete the job.';
          addToLog('updateGood Icon', result);
      } else {
        addToLog('info Icon', 'BUG DETECTED: Not sure what happened when ' +
                 'trying to help' + (user? ' ' + user : '') + '.' +
                 (context? ' ' + context.help : ''));
      }
      Autoplay.start();
      return true;
      break;

    case 'sell output':
      // Log any message from a sale of Cuban business output.
      if (inner.match(/sold|collected/)) {
        addToLog('cashCuba Icon', inner);
      } else {
        DEBUG(inner);
      }
      break;

    case 'deposit':
      if (innerNoTags.match(/deposited/i)) {
        addToLog(city == CUBA? 'cashCuba Icon' : 'cash Icon', inner);
      } else {
        DEBUG(inner);
      }
      break;

    case 'withdraw':
      if (innerNoTags.match(/withdrew/i)) {
        addToLog(city == CUBA? 'cashCuba Icon' : 'cash Icon', inner);
      } else {
        DEBUG(inner);
      }
      break;

    default:
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized action "' +
               action + '".');
      DEBUG(inner);
  }

  return false;
}

//update the script (by Richard Gibson; changed by ms99 and blannie)
function updateScript() {
  try {
    if (!GM_getValue) {
      return;
    }
    GM_xmlhttpRequest({
      method: 'GET',
      url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
      onload: function(result) {
        if (result.status != 200) {
          return;
        }
        if (!result.responseText.match(/build:\s+'(\d+)/)) return;
        var theOtherBuild = parseInt(RegExp.$1);
        var runningBuild = parseInt(SCRIPT.build);
        var theOtherVersion = result.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 : '';
        if (theOtherBuild < runningBuild) {
          if (window.confirm('You have a beta version (build ' + runningBuild + ') installed.\n\nDo you want to DOWNGRADE to the most recent official release (version ' + theOtherVersion + ')?\n')) {
            //clearSettings();
            window.location.href = SCRIPT.url;
          }
          return;
        } else if (theOtherBuild > runningBuild ||
                   theOtherVersion != SCRIPT.version) {
          if (window.confirm('Version ' + theOtherVersion + ' is available!\n\n' + 'Do you want to upgrade?' + '\n')) {
            //clearSettings();
            window.location.href = SCRIPT.url;
          }
        } else {
          alert('You already have the latest version.');
          return;
        }
      }
    });
  } catch (ex) {
    addToLog('warning Icon', ex);
  }
}
