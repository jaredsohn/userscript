// ==UserScript==
// @name           Enable Kindle Personal Documents Delivery for All Devices
// @namespace      http://xiaobinbin.com/
// @include        https://www.amazon.com/gp/digital/fiona/*
// ==/UserScript==


(function() {
    function GM_wait() {
        if(typeof unsafeWindow.Devices == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            main();
        }
    }
    GM_wait();

    function main() {
        var oldFunc = unsafeWindow.Devices.prototype.filterDevicesByCapabilities;  
        unsafeWindow.Devices.prototype.filterDevicesByCapabilities = function() {
            var deviceList = oldFunc.apply(this, arguments);
            for (var i = 0; i < deviceList.length; i++) {
                deviceList[i].excludeDevice = 0;
            };
            return deviceList;
        }
    }
})();