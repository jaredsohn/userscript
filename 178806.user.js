// ==UserScript==
// @id             plwiza
// @name           plwiza
// @version        008
// @author         olecom
// @description    pl wiza automat
// @match          https://*.e-konsulat.gov.pl/*
// ==/UserScript==

/*
 * To have instant updates of the main functionality `ak.js` is loaded
 * by this user script.
 *
 * Setup for Firefox and Chrome.
 * =============================
 * `ak.js` is being loaded directly into main page by cross-site cap. of <script/>(0)
 * via HTTPS(1) hub site with corrected "Content-type"(2) https://rawgithub.com
 * (0), (1), (2) are must for such configuration.
 *
 * Setup without rawgithub.com
 * ========
 * - Firefox & Chrome: setup own https repository for serving `ak.js` + <script/>.
 * - Firefox: GM_xmlhttpRequest + eval(res.responseText)
 *
 * Last option is to have all scripting here, thus no instant updates.
 */

var plwiza_ak = document.createElement('script')
plwiza_ak.setAttribute('type','application/javascript')
plwiza_ak.setAttribute('src' ,localStorage['plwizadev'] ?
 'https://localhost/ak.js' :
 'https://rawgithub.com/olecom/plwiza.user.js/master/ak.js'
)
document.head.appendChild(plwiza_ak)
plwiza_ak = undefined

//olecom: plwiza.user.js ends here
