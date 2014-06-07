<mason>
Charset=UTF-8
Author=AyuanX
Created=2013/01/25
Updated=2013/01/25
Version=1.0
Website=http://ayuanx.web.fc2.com/
Description=(Youku.com) Unblock IP
Comment=Unlock video originally restricted to mainland China for any IP
Usage=Just import this script into mason
Url=^http://v\.youku\.com/player/getPlayList/
</mason>

<parts>
part1=^@@@L3
</parts>
<part1>
function _masonRedirect(spec)
{
return 'http://yo.uku.im/proxy.php?url=' + btoa(spec.replace(/\/timezone\/.\d+\//, '/timezone/+08/'));
//return 'http://www.xn--yuk-6na13b.com/proxy.php?url=' + btoa(spec.replace(/\/timezone\/.\d+\//, '/timezone/+08/'));
}
</part1>
// ==UserScript==
// @name (Youku.com) Unblock IP
// @description Unlock video originally restricted to mainland China for any IP
// ==/UserScript==
