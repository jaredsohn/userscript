// ==UserScript==
// @name        Bodybuilding.com Dev Info Box
// @namespace   http://www.bodybuilding.com
// @description Show machine and code tag info all the time to avoid confusion during development
// @include     http://*.bodybuilding.*
// @include     https://*.bodybuilding.*
// @version     1
// @grant       none
// ==/UserScript==
//

var devInfo = document.getElementsByClassName('devInfoSectionContainer'),
    buildInfoStr = "Build Information",
    buildInfo,
    infoBox = document.createElement('div'),
    mobileContainer = document.getElementById('main-con'),
    i;

infoBox.setAttribute('id', 'infoBox');

for (var i=0; i < devInfo.length; i++) {
    var checkDiv = devInfo[i];
    if (checkDiv.textContent.match(buildInfoStr)) {
        var buildInfo = checkDiv.textContent;
    }
}

if (buildInfo.match('qa_')) {
    var hostMachine = "QA1",
        buildDetails = buildInfo,
        buildInfo = hostMachine;
}

if (buildInfo.match('qa2')) {
    var hostMachine = "QA2",
        buildDetails = buildInfo,
        buildInfo = hostMachine;
}

if (buildInfo.match('qa3')) {
    var hostMachine = "QA3",
        buildDetails = buildInfo,
        buildInfo = hostMachine;
}

if (buildInfo.match('stage_commerce')) {
    var hostMachine = "Stage",
        buildDetails = buildInfo,
        buildInfo = hostMachine,
        onStage = true;
}

if (document.getElementById('infoBox') == null && devInfo.length && !mobileContainer) {
    document.body.appendChild(infoBox);
    infoBox.appendChild(document.createTextNode(buildInfo));
    infoBox.style.padding="10px";
    infoBox.style.backgroundColor="#0A6790";
    infoBox.style.color="#FFFFFF";
    infoBox.style.fontFamily="Helvetica, Arial, sans-serif";
    infoBox.style.fontSize="40px";
    if (typeof onStage != "undefined") {
        infoBox.style.fontSize="30px";
    }
    infoBox.style.textAlign="center";
    infoBox.style.lineHeight="45px";
    infoBox.style.position="fixed";
    infoBox.style.textShadow="0px 2px 1px #333333";
    infoBox.style.top="5px";
    infoBox.style.left="10px";
    infoBox.style.width="80px";
    infoBox.style.height="40px";
    infoBox.style.opacity="0.35";
    infoBox.style.wordWrap="break-word";
    infoBox.style.zIndex="10001";
    infoBox.style.borderRadius="10px 10px 10px 10px";
    infoBox.style.overflow="auto";

    infoBox.onmouseover = function () {
        infoBox.style.opacity="0.85";
        infoBox.textContent = buildDetails;
        infoBox.style.fontSize="12px";
        infoBox.style.height="auto";
        infoBox.style.textAlign="left";
        infoBox.style.lineHeight="normal";

        if (typeof scrollAnchor == "undefined" && typeof closeInfoBtn == "undefined") {
            var scrollAnchor = document.createElement('a'),
                    scrollTopTxt = '⇧ Scroll to top',
                    closeInfoBtn = document.createElement('a'),
                    closeTxt = "&#8855;";
            infoBox.appendChild(scrollAnchor);
            infoBox.style.height="auto";
            scrollAnchor.appendChild(document.createTextNode(scrollTopTxt));
            scrollAnchor.onclick = function () {
                window.scrollTo(0,0);
            };
            scrollAnchor.style.color="#FFFFFF";
            scrollAnchor.style.position="absolute";
            scrollAnchor.style.bottom="10px";
            scrollAnchor.style.left="10px";
            infoBox.appendChild(closeInfoBtn);
            closeInfoBtn.innerHTML=closeTxt;
            closeInfoBtn.style.fontSize="22px";
            closeInfoBtn.style.fontWeight="100";
            closeInfoBtn.style.textShadow="none";
            closeInfoBtn.style.position="absolute";
            closeInfoBtn.style.top="0";
            closeInfoBtn.style.right="5px";
            closeInfoBtn.onclick = function () {
                document.body.removeChild(infoBox);
            };
        }
        infoBox.style.paddingBottom="35px";

    };

    infoBox.onmouseout = function (event) {
        infoBox.style.opacity="0.35";
        infoBox.style.padding="10px";
        infoBox.textContent = buildInfo;
        infoBox.style.fontSize="40px";
        if (typeof onStage != "undefined") {
            infoBox.style.fontSize="30px";
        }
        infoBox.style.height="40px";
        infoBox.style.textAlign="center";
        infoBox.style.lineHeight="45px";
    };
}
