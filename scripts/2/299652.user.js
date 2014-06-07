// ==UserScript==
// @name        Account & Thank
// @namespace   Account & Thank!
// @description Account & Thank.
// @version     1.0.1
// @author      Patta Chang
// @authorURL   https://www.facebook.com/patta.chang
// @include     https://www.facebook.com/*
// @include     https://www.facebook.com/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


(function() {
    var d = new Date(),
        today = d.getDay(),
        recivedMessage = (today == 6 || today == 0) 
            ? 'รับทราบการโอนค่ะ\n' +
                'จัดส่งสินค้าวันจันทร์นะคะ ขอบคุณมากค่ะ ได้ของแล้ว ชอบไม่ชอบ มาบอกบ้างนะคะ จะได้เอามาปรับปรุงค่าา ^_^\n\n' +
                'ดาวให้ Track ไว้เลยนะคะ\n จะเข้าระบบจันทร์นะคะ\n ขอบคุณมากคร้าาา '
            : 'รับทราบการโอนค่ะ\n' +
                'จัดส่งสินค้าวันพรุ่งนี้นะคะ ขอบคุณมากค่ะ ได้ของแล้ว ชอบไม่ชอบ มาบอกบ้างนะคะ จะได้เอามาปรับปรุงค่าา ^_^\n\n' +
                'ดาวให้ Track ไว้เลยนะคะ\n จะเข้าระบบพรุ่งนี้นะคะ\n ขอบคุณมากคร้าาา ';
    
    var messages = [
        {
            title: 'สรุปยอด',
            message: 'สรุปยอด + EMS =  บาทค่ะ\n\n' +
                            'ธนาคารที่โอนได้ ดังนี้คะ\n\n' +
                            '- ธ.กสิกรไทย สาขา สวนจตุจักร กทม. \n' +
                            'ชื่อ สาธิยา อยู่สำราญ 782-2-04447-0\n' +
                            '-ธ.กรุงไทย สาขา รามอินทรา กม.2 \n' +
                            'ชื่อ สาธิยา อยู่สำราญ 060-0-65732-9 \n' +
                            '-ธ.ไทยพาณิชย์ สาขา คาร์ฟูร์ ลาดพร้าว\n' +
                            'ชื่อ ภัทรไชย ช้างแรงการ 928-202337-3\n\n' +
                            'ระยะเวลาการจัดส่งแบบ EMS กทม. 1-2 วัน ต่างจังหวัด 2-3 วัน นับจากวันที่ส่งสินค้านะค่า\n\n' +
                            '^_^  สินค้าซื้อแล้วไม่รับเปลี่ยนหรือคืน \n' +
                            '-ดังนั้นกรุณาเช็ครายละเอียดสินค้า และขนาด โดยละเอียด ก่อนสั่งซื้อ \n' +
                            '-ยกเว้นสินค้ามีตำหนิชำรุด รับเปลี่ยนคืนภายใน 3 วันหลังได้รับสินค้าแล้ว  ทางร้านจะเปลี่ยนสินค้าแบบเดิมไปให้คะ**\n\n' +
                            'หากโอนมาแล้ว รบกวนแจ้งข้อมูลดังนี้นะคะ\n' +
                            ' - ชื่อที่อยู่ \n' +
                            ' - ธนาคารที่โอนเงินเข้า\n' +
                            ' - เวลาที่โอน\n' +
                            '- รูปถ่ายสลิปที่โอนมา\n' +
                            'ขอบคุณมากค่ะ'
        }, {
            title: 'Promotion',
            message: 'Promotion \n' +
                            '1 ตัว EMS 30 บาท\n' +
                            '2 ตัว ขึ้นไปส่ง ems ฟรี\n' +
                            '3 ตัว ขึ้นไป ลดตัวละ 50 บาท ส่ง ems ฟรีค่ะ\n' +
                            '*โปรโมชั่นนี้ใช้ได้ต่อรอบการสั่งซื้อและต่อ 1 สถานที่จัดส่งนะคะ'
        }, {
            title: 'ขอบคุณ+แจกแทร็ค',
            message: recivedMessage
        }, {
            title: 'Send Inbox',
            message: 'สนใจสั่งซื้อสินค้า ส่งรูป หรือ ส่งรหัส มาที่นี่เลยค่าา \n' +
                        'http://www.facebook.com/messages/MyDahliaShop\n' +
                        'Line ID : sathiya_daw'
        }
    ];
    // Active only in main frame
    if (!document.querySelector("#pageNav")) {
        return;
    }

    // = Variables =======
    lastActiveElement = document.activeElement;

    // = Functions =======
    function createElement(html) {
        var outerHTML = document.createElement("div");
        outerHTML.innerHTML = html;
        return outerHTML.firstChild;
    }

    function isInstanceOfTextInput(element) {
        return (element instanceof HTMLInputElement && element.type == "text")
                || element instanceof HTMLTextAreaElement;
    }

    function isFlyoutOpen(flyout) {
        return flyout.className == "openToggler";
    }

    function openFlyout(flyout, open) {
        if (open === undefined) {
            open = !isFlyoutOpen(flyout); // Toggle
        }

        if (open) {
            flyout.className = "openToggler";
        } else {
            flyout.removeAttribute("class");
        }
    }

    function createTab(titleContainer, bodyContainer) {
        var html;
        // Tab; default = inactive
        html = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';
        html += '<div class="jewelFlyout">';
        html += '</div>';
        html += '</li>';
        var title = createElement(html);
        titleContainer.appendChild(title);

        // Manual input
        html = '<div style="display: none;">';
        html += '</div>';
        var body = createElement(html);
        bodyContainer.appendChild(body);

        // Change tab listener
        (function(body) {
            title.addEventListener("click", function() {
                // Change tab
                var titles = this.parentNode.childNodes; // tab.tabContainer.childNodes
                for ( var t = 0; t < titles.length; t++) {
                    if (titles[t] === this) { // Active

                    } else { // Inactive
                        titles[t].style.background = "";
                        titles[t].firstChild.style.color = "";
                    }
                }

                // Change body
                var bodies = body.parentNode.childNodes; // body.bodyContainer.childNodes
                for ( var b = 0; b < bodies.length; b++) {
                    if (bodies[b] === body) { // Show
                        body.style.display = "";
                    } else { // Hide
                        bodies[b].style.display = "none";
                    }
                }
            });
        })(body);

        return {
            "title" : title.firstChild,
            "body" : body
        };
    }

    function createTabListBody(filter) {
        var html;

        html = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';
        html += '<div style="padding: 10px; width: 200px; font-size: 15px;">';
        html += '</div>';
        html += '</div>';
        var body = createElement(html).firstChild;

        for (var key in messages) {
            html = '<p><span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';
            html += '<a>' + messages[key].title + '</a>';
            html += '<span></p>';
            cell = createElement(html);
            body.appendChild(cell);

            var message = cell.firstChild;

            (function(key) {
                message.addEventListener("click", function() {
                    if (isInstanceOfTextInput(lastActiveElement)) {
                        lastActiveElement.focus();
                        lastActiveElement.value = messages[key].message;
                        //alert($("#js_2"));
                    }

                    openFlyoutCommand = false; // Close flyout
                });
            })(key);

            console.debug(messages[key]);
        }

        return body.parentNode;
    }

    // = Construct UI =======
    var html;

    // Menu item
    // var navItem
    html = '<li class="navItem middleItem notifNegativeBase">';
    html += '<div class="fbJewel">';
    // {

    // Toggler
    html += '<a class="navLink" title="Show Facebook Extra Emoticons">'; // var navLink
    html += '<span style="vertical-align: middle;"><img src="http://winti.pte.co.th/up_share/d_logo20x20.png"></img></span>';
    html += '</a>';

    
    // Flyout
    html += '<div>'; // openToggler; var flyout
    html += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';
    // {

    
    // Beeper
    html += '<div class="jewelBeeperHeader">';
    html += '<div class="beeperNubWrapper">';
    html += '<div class="beeperNub" style="left: 4px;"></div>';
    html += '</div>';
    html += '</div>';

    // Tabs
    // var titleContainer
    html += '<ul style="display: text-align: center;">';
    html += '</ul>';

    // Bodies
    html += '<div>'; // var bodyContainer
    html += '</div>';

    // Footer
    html += '<div class="jewelFooter">';
    html += '<a class="jewelFooter" href="https://www.facebook.com/sameerkhanlovers" target="_blank"> _ _ _ </a>';
    html += '</div>';

    // }
    html += '</div>'; // emoticonsPanel
    html += '</div>'; // openToggler

    // }
    html += '</div>'; // fbJewel
    html += '</li>'; // navItem

    var navItem = createElement(html);
    var pageNav = document.querySelector("#pageNav");
    pageNav.insertBefore(navItem, pageNav.firstChild);

    // Maintain active element
    navItem.addEventListener("click", function() {
        if (isInstanceOfTextInput(lastActiveElement)) {
            lastActiveElement.focus();
        }

        openFlyoutCommand = undefined; // Do nothing
    }, true);

    var navLink = navItem.firstChild.firstChild;
    var flyout = navLink.nextSibling;
    var titleContainer = flyout.firstChild.childNodes[1];
    var bodyContainer = titleContainer.nextSibling;

    // Toggle listener
    navLink.addEventListener("click", function() {
        openFlyoutCommand = !isFlyoutOpen(flyout);
    });

    // Picture emoticon tab
    var picEmoTab = createTab(titleContainer, bodyContainer);
    picEmoTab.title.click(); // Default tab
    
    picEmoTab.body.appendChild(createTabListBody(null, function(emoticon) {
        if (emoticon.class === undefined) { // No picture
            return false;
        }

        // [Bug] 2 characters unicode emoticons
        if (emoticon.chars.length == 2) {
            return false;
        }

        return true;

            }));

    // = Other listener =======

    document.addEventListener("click", function() {
        // Get active textarea
        lastActiveElement = document.activeElement;

        // Toggle flyout
        if (openFlyoutCommand !== undefined) {
            openFlyout(flyout, openFlyoutCommand);
        }
        openFlyoutCommand = false;
    });
})();