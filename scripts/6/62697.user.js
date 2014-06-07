// ==UserScript==
// @name Fuck China Telecom
// @description 为防止中国电信对用户的一些无耻并侵犯用户权益的行为,如:劫持DNS,强迫用户接受电信的广告。本脚本的作用就是屏蔽114,屏蔽中国电信等相关的网站！
// @include *

// ==/UserScript==

(function(){
    if(/ct10000\.com|\.chinatelecom\.|\.118114\.|\.114\.|\/114\/114\.htm|vnet\.cn/.test(window.location.href)){
        document.body.innerHTML="<div style='margin:10px 0 0 10px;color:#ccf;'><h1>已屏蔽中国电信网站或广告!</h1><p>你正访问电信集团的网站或者被电信劫持强迫让你接受他们的广告！Fuck China Telecom脚本已经帮您屏蔽其内容。如果真的要显示原始页面，请禁用此脚本。:)</p></div>";
    }
})();