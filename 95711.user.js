// ==UserScript==
// @name           Google Cache Text
// @namespace      Concepto de valmen / Concept by valmen
// @description    Auto-redirige al modo Solo Texto de la cache de resultados de Google / Redirects automatically to Google Search Cache text-only mode
// @include        *webcache*google*
// @exclude        *strip=1*
// ==/UserScript==

window.location=window.location+'&strip=1'