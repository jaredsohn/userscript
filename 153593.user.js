<mason>
Charset=UTF-8
Author=AyuanX
Created=2011/2/27
Updated=2013/2/03
Version=1.2
Website=http://ayuanx.web.fc2.com/
Description=(GetChu.com / DLSite.com) Auto Age Attestation
Comment=No need to click age attestation manually
Usage=Just import this script into mason
Url=^http://www\.(?:getchu\.com/soft\.phtml\?id=\d+$|dlsite\.com/maniax/adultcheck/=)
</mason>

<parts>
part1=www\.getchu\.com@@@L3
part2=www\.dlsite\.com
</parts>
<part1>
function _masonRedirect(spec)
{ return spec+'&gc=gc'; }
</part1>
<part2>
<script>
function _AgeAtest()
{ document.adult_check.submit(); }
window.addEventListener('DOMContentLoaded', _AgeAtest, false);
</script>
</part2>
// ==UserScript==
// @name (GetChu.com / DLSite.com) Auto Age Attestation
// @description No need to click age attestation manually
// ==/UserScript==
