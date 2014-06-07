// ==UserScript==
// @name Hypem Downloader
// @namespace tag:phr33ksho@gmail.com,2010:sherog
// @description Script to download hypem songs
// @include http://hypem.com/*
// @include http://www.hypem.com/*
// ==/UserScript==
function main() {

var iconHtml = '<a href="#" onclick="return false;" id="getTrack" ><img id="getTrack2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAAXNSR0IArs4c6QAAAAZiS0dEAJ8A5QBUaTqMGAAAAAlwSFlzAAAbrwAAG68BXhqRHAAAAAd0SU1FB9sBCw8nEeVlPVcAAASDSURBVFjDvZfNbhxFFIW/e6tmev4ySWzFiRU7IjiJ+RFK1hbsACHeAbY8BBvegXfgCViwQQKJCBQpBKIkICdKJhISiuxgxx7b0z2uKhbV3dM9thMWTFoqTVd1d9Wpc889t0YAPbe8/HkrSdZ6vd4pUQXAOccsLmMMAMG5sLO7+/f44OA7OXfx4mdvXL789cKF8/0kSSSEgOk0WHz/j5mAGN/9AGsMIsLGxka4fevWbdvudNYWLpzvP3++KdvbL1AV+m/OceNK738H8OzRkN29IU3bQFW4dOmSpGl63Xa73TNnz5yV9955lyeDAQ/+fICIMKtLVTGqvH1tlbFzzM/PqxVV9vb3WH+4zsbmJiI6YxACAhvPNwkBrLVYABFh/eE6qgbV2YIQVay17AyHNBoWVZ2AUDWoiVT1Qp+Ll5mJJoyYcrOqBmFcBaFlMxiuPvuS1dW3EEAig4hIvZ+P8bJ38j7B4/UbftZf4zomroUIWoLIWVA1M9dEAaAIfclEAWCmmsgZN2U44lp6JBxmxtkhWgs9kIMoWDA68+yoAig2bOuaeD0pGgGYUn+1cIjOlgkBtBJ6c1QTJhfn7IUZWZhoop4dr0kTptSFOSE78geHh4f/O4BsPK6tU/OJSZzigyxL+eGnHxk8HWDzQ0hBjkyYBSbuOOlN3JKKo45GB6w/fkySJBXbVqDMjhinkibgtzu3ufv7HVQUUSl/RRQVyUU81ReJNq1TY/m8zWaTdqs1cWejiHBc7TCRGcBMqbl0O1N5t2L35TsV4RUiNFP9Vzrm5CNT83n9DwCmF6mb09FnHKkd5qTJ8t2YqR3XFtdamhdzHMdAlU1Bji/lqor3nmajgTU2iksEQZAQCN7jQwDvcYUOKo18UZGoG2sM7VaLdqdTB65mShNTVBk1fPrRxywtLuKcwzmH975sRd85h/MeX+n/s7vLX1tbqLXxhD0ec5BldHu9IyGv144petutFtdWVmhYy71Hjxju7dFKElaWlmi3WiWw45ptNHg2HEKe3ohwmGW1MJhpnxDNQVibp6Pkhw/D5vY29weDmPzeM9fv0+10CCGc2Ao7rjt2XHycm2C300XNlG2rKqfmziII+zsvSrpCYVAihNx4VPWlII6zfdE4tp+mOO9pJy202aiHo5kkdPun8c6RHeznKRg9o1oFC+N5FQgRIdSYEHwIHDqHF+HQ+7JElCC882SjEYQQS67GtJU8l6uTFcyFEPDeHwF1LBMiJEmTJGviQ4jOWbVtlegB+zs7NV84rqJqBYBM3ZfnkhNAGGNoNxN8CDSbzfxdsFmWjYbDId1ejzQdIUFqpiQiBO/jTCGUZ4KXhQMRnHPld957GiIYNZzu93NAceOjUYrd2dr6/v69ex9ev3FjqdPt4r1DRem026gIy4uLfLK2VnrAwtzcqzURAo0QIuY8y9qdLsZO/vgYVQiBwZPHYwFYWF7+YuXKla+urq7OdzsdIIgRZXVlRay1E4cMIfj8vhjz3sf7yvhBmrKXpthGI2oKieVdpLzP0pTB06fjX27e/PZfIrr+kZtSgOcAAAAASUVORK5CYII=" width="33" height="32" style="float:right; position:fixed; bottom:0; right:0; z-index:99999;"></a>';
jQuery('#player-container').append(iconHtml);
jQuery('#getTrack').click(getTrack);
jQuery('#getTrack').ajaxError(function(e, xhr, settings, error) { alert(settings.url);});
var icon = document.getElementById("getTrack");
function getTrack() {
window.open('http://hypem.com/serve/play/' + trackList[activeList][currentTrack].id + '/' + trackList[activeList][currentTrack].key + '.mp3');
}
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);