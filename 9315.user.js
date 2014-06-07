// ==UserScript==
// @name           customize meebo backgrounds
// @namespace      pArAlLeL_LiNeS
// @description    set awesome backgrounds on meebo
// @include        http://www*.meebo.com/
// @include        http://www*.meebo.com/index*.html
// @include        https://www*.meebo.com/
// @include        https://www*.meebo.com/index*.html
// @include        http://classic.meebo.com/index-en.html
// @include        https://classic.meebo.com/index-en.html
// ==/UserScript==
 
// user script commands menu thing
function setImage() {
    // prompt alert box
    var image=prompt("enter url for background image:",GM_getValue("image"));
    if (image!=null && image!="") {
        // save the url
        GM_setValue("image", image);
        // set the background
        setBackground();
    }
}

// function to set the backgrounf image
function setBackground() {
    // add the background style
    GM_addStyle('body { background: #000 url("'+GM_getValue("image",picture)+'") repeat center !important;}');
}

// the cool default background 8)
picture = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0"+
          "iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys%2FRD84QzQ5Ojf%2F2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc"+
          "3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf%2FwAARCAAyADIDASIAAhEBAxEB%2F8QAGwAAAwEBAAMAAAAAAAAAAAA"+
          "AAAQGBQMBAgf%2FxAA%2FEAABAgUABAkHCwUAAAAAAAABAgUAAwQGERITITEHFBUiIzNTYWJBUVJVY9HSFhclMkJDcZKTotMmVFa"+
          "Co%2F%2FEABgBAAMBAQAAAAAAAAAAAAAAAAECAwAE%2F8QAHhEAAgIDAQEBAQAAAAAAAAAAAAIBEQMSMRMhQmH%2F2gAMAwEAAhE"+
          "DEQA%2FAK1V9UQJBbXHIONiUxOy7wpZnCXSTOJVqRqDsKU%2BSUrviuLlfoJwy0JGdnPH8kS5r70VwjUxW00YVqdo0xgdGr2kc6I"+
          "tlJmaPS1rwpRfr8BR1yjpTBjRTs6UDzwnwf3tRy6KvzQV68z0nYEkjmmNO1K68De72JjbSBGZmOcO0Hj82Y4cH7lfHFK4y2iiUdc"+
          "nIKxs2H2n4Q7ouosTNm%2Bi%2BqIrSOTHHf6KffCLLfNGltlgtziekm7QlOOsVG2lyvwqALLQgZ36Y%2FkhBlcr95OQUs1Cekm5y"+
          "sdor2kS0UptNHn5d0Xqxx%2FKn3wQ5ylfvqWh%2FOP5YIGim2kVNvP5JxdlSNp7T4onEMbynhMpELuSoWdRtyV7eiV4ovS8tQJBc"+
          "qTIJHWCJYuzb85tMvj9MU8XxnWDslxsbtYWxzXBa0GlzF%2FP%2Bk%2BTlp0l4QSrZ0g8UZtgMT3No68y7nqEET0g7ZhzsPijftR"+
          "1bkX2%2FTFV9MEKKwCZgx1ghfg7dW2XROGscKZOZ6SMzN%2FNMPkadQKk3w0027cGkn%2BrKjfu6T4oSaGB9W3oVLumoSCuZszM9"+
          "NXiinS8tWmn6SpN43TBCDI7tiWyWFONKCJk3fMHaKiO7FYxzXBP5PXB%2FldT%2FwBPigja5ZavWVJ%2BoII27C%2BX8HiACeagf"+
          "6iJUgfOhS81ODTj7I7JcdSi%2FMnFHQYJOzmbP3RNBN5p4R6ZUylo9MSMEjQx1avFFMaTZNm%2BFJaaQb%2Ff8gb5nk9oIX4ONHi"+
          "LjkJzxhO9I8xjItIXcL7fVTKekSklfOGj2g787s74V4PkXwmjrxKpKPOvTnJl%2BY%2BZX4QzpMqBW%2Bn1BITppGijf6IjPYtHk"+
          "uXlKOsm%2FZHaKjLQm%2FApJNJQgA5P1PijPZUX2G1ATSUOyZNz9TfrFeKJebFYeKLPm%2Bij8ogib0L9%2FtKH9nxQQPNgbwQhe"+
          "XTWKHKVZjJ2a9Xf3xjyHVxVf1KouFWVaneZys9UrvggjoTpJuHa13OvF8vJFdU5KpmTrlbelHfCFlurlLpa0IcKtIMxBOJ6h5D3w"+
          "QQ7cFjpRIeXTTH0lWbx9%2Br3wk0PDoG6XhyrB0kz79XaK74IIkW%2FI5yy6esqz9dXvgggjCH%2F2Q%3D%3D"

// put the alert box in the user script command menu thing
GM_registerMenuCommand("set background image..", setImage);
// set the background on load
setBackground()