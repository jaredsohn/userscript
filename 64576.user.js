// ==UserScript==
// @name           Castle Age Autoplayer
// @namespace      caap
// @description    Auto player for Castle Age
// @version        139.27
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http*://apps.*facebook.com/castle_age/*
// @include        http://www.facebook.com/common/error.html
// @include        http://www.facebook.com/reqs.php#confirm_46755028429_0
// @include        http://www.facebook.com/home.php
// @include        http://www.facebook.com/*filter=app_46755028429*
// @exclude        *#iframe*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatability  Firefox 3.0+, Chrome 4+, Flock 2.0+
// ==/UserScript==

/*jslint white: true, browser: true, devel: true, undef: true, nomen: true, bitwise: true */
/*global window,unsafeWindow,$,GM_log,console,GM_getValue,GM_setValue,GM_xmlhttpRequest,GM_openInTab,GM_registerMenuCommand,XPathResult,GM_deleteValue,GM_listValues,GM_addStyle */

///////////////////////////
// Define our global object
///////////////////////////

var caapGlob = {};
caapGlob.thisVersion = "139.27";
caapGlob.gameName = 'castle_age';
caapGlob.SUC_script_num = 57917;
caapGlob.discussionURL = 'http://senses.ws/caap/index.php';
caapGlob.debug = false;
caapGlob.newVersionAvailable = false;
caapGlob.documentTitle = document.title;
caapGlob.is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1 ? true : false;
caapGlob.is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1  ? true : false;
caapGlob.os = '\n'; // Object separator - used to separate objects
caapGlob.vs = '\t'; // Value separator - used to separate name/values within the objects
caapGlob.ls = '\f'; // Label separator - used to separate the name from the value
caapGlob.savedTarget = {};
caapGlob.savedTarget.style = {};
caapGlob.savedTarget.style.left = null;
caapGlob.savedTarget.style.top = null;
caapGlob.dragXoffset = null;
caapGlob.dragYoffset = null;
caapGlob.dragOK = false;
caapGlob.quest_name = null;
caapGlob.attackButton = null;
caapGlob.currentColor = null;
caapGlob.ColorDiv = null;
caapGlob.arrows = null;
caapGlob.circle = null;
//Images scr
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_1.jpg
caapGlob.symbol_tiny_1 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAIQAAQADAQAAAAAAAAAAAAAAAAgFBgcJAQEBAQAAAAAAAAAAAAAAAAAGBwUQAAEEAQMCBAQHAAAAAAAAAAIBAwQFBhESBxMIACExCXEjFBZBUYEiMhUYEQABAgMFBwEJAAAAAAAAAAABEQIAAwQxQVESBfAhYYHBEwYikaGx0eEyQiMU/9oADAMBAAIRAxEAPwDmv2BdhuJ8oYbZ9yXcRauVnE8Ga1V1rGiuP2VlKNehEjtuIQKSj8xwzEgbb0XQiJNmxomlirnS5btwcQpwC7zBzyjW36dSTp8oZnsY4taSmZwBIC4G+EbcUPt45C9I4pzfAr3Ha2OZ1p5PW3y2zjDrZK0Ug62fHRhQ3Ju2t7SRPRdfCSt8TdLLmscHISACEsOOPKDekeYf0yJU57cudjXFDYSATyXjBwyP2x52J99uPdu0/IIw8Q5THk30LKjfkDXLSxa1+7KaJISuq0saKZI2pIe4Sb3aojijnUiTA1LSiXrhDltcDKL1sCrwjY+OLn729uHDX8KLqMYdcynsgYY8ya+uiR47EoxTz2g7GJlS9EX4+FXjE1oel7mhOV22EEvKJLnDfvAJXnt74jcx5Hhcg4+w/OKJCyaPMluN18JohOQ3KGMoqKCiqZK4JqpEuqr5J+SOaiszENeircMdr4m+laN/C89vM5pa0KSqZV9gQhAIunPVVe22e8GdvcRVPmerxe+CVDRfnip0l1YpAX8eoLL4N7PXU9PE+dVSxXib+Jf0ResU+XTzDQOZfl6gp0gn+3pcd5mO5bYTO22n+4cYUpCWsN+TFiQ0aRNX1dcslbY6W3Tf1EUPgvn4OUjpgHpCjayE1e2UfvKQj7LmHlSwmRoXFnEmOQuYPr4SwZVNb4sMj+wGSKtJFVq1lj+400Xptaaa66J436mZW9v9jX5eNnP6wcp5VD3PQ9q8Afl8IKE+d3l/7Hg29vCe/wBKdZw6qqMz6nU3H1AA0P8Alpv1VXN2v6J4PudM7gJG+EzWyu0QD6Y//9k%3D";
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_2.jpg
caapGlob.symbol_tiny_2 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAIUAAQADAAAAAAAAAAAAAAAAAAgFBgkBAAIDAQEAAAAAAAAAAAAAAAMEAgUGCAcQAAIBAgUCBAUFAAAAAAAAAAIDAQQFERITBggAByExQSJRMkIUFVIjZBYXEQACAQIFAgQFBQAAAAAAAAABAhESAwAhMQQFQRNRYYEicbEyFAbwoWIjM//aAAwDAQACEQMRAD8Ax8438d29wjdu3dD2qsYMzE0gmoFYMJ0KEEm1Qte6UHkEigREZIsfbE0fIcglgVXJW2CAzAaE+PgvQkdT0x6V+Ifh1/lXO32YS5vWtm5btOYqVTogOT3SJZUYgFBPuJACRsvFzsjv3bNSior7tZ6dITjcbgduuNMJeQ6lGqioiwmfDBTRKPSZ6LuxttraN92pUdQT6RrM9BnOEfx61zXO79OK2lvvXnJHbZFAEfVVkO2FzqaVpjUHBzruIO+rZyIoez00tQR3NTqmKSXMGAWigi7SzUn3SiaaIdE4Z8mMYZ46gN45slipqC1RAqI+ExVHSdY+GD3PxvajlF263rRtG6bTNW3aW4Mge5TV2SxBDxNAbwqKC4m2zb28OOz3JcoTtLkXOsUbAURU50aLXmGTmMZXU0RjMfFgfrjGQvLasXKwDBMg9ZMgddQchGemFbexvbzlNt9u7IXS2VdRmlCBS2qwEZDU0ikAnFjud/RtSoXCCL7EDJtMFVEQxjYnT/eGZGBMZjwzeXr7sMcptbBsOl26pNoFqEJ/ygwS2RyHrRoJGeOgOc5teV2252WzvLb37JaG63KIAd8GQsEswwILQCR7fuACzUkBTEdx91VNbyK7f0tO2B3zT2+sQ0dSIYTEWq7VRozep5K9SMPPPiHnGHW1ZgdwCOimfUiPkccyWbbJx1xWBl7qBRGpRXqy8q1Hrgz8Tbh35s28qR3au3KvNIy6iu3076impZXcp8c9K24RpxMBhq5wJWXDUj5eg7hUa4sEB8tRI8p89YzB1jDvGXdym1cMjNYNU0mGAyrIifZ9NYZSmkw0HCY333B5CtRWJqNg20N1gp8vMLntVZlgM6mmxVVUCRT/AB1Ac/TMT0ZjfIg0geOZ/Yx88JWk49HDI152kQoVVMzlDAuZnSFnwwTKur71/wC00l2u1LR/277QnWu1uJf4/wDH6ZyalHJ6eXT1ImYZnz4+Op0qq2OwVU+3qf10iOkR5Yttxf5D7+3cuW/7M6FkzMmQDNXcqmc+53P5QMf/2Q%3D%3D";
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_3.jpg
caapGlob.symbol_tiny_3 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAIIAAQEBAAAAAAAAAAAAAAAAAAgHCQEBAQEBAQAAAAAAAAAAAAAABgUHAAEQAAAGAQQCAQMFAAAAAAAAAAECAwQFBhESFQcIExQAISJCMTJDFwkRAAIBAgQEAgkFAQAAAAAAAAECERIDACExQVFxBAVhIoGRoTJCghMjFLHB0WJyBv/aAAwDAQACEQMRAD8AzJ6k9Y4NoyjbjdEkH3Is4VOWab22NJR9fjnay6UaIRah0038pImbKKoJOR9VFsBVVCqisQqZrunXMtp7izRbgGDBZiQIDfConMjOZAiM7fbeiF66ttjBYEyRIUAEzGUkxkCQNJ1yc/Kf+fPaCj8Zq2nmKaO64y0kK9jJlnVJ2Oik1FCoFM4im0LGlImJjgBhjXRFUw+pDDjPwB03/UIbp+2sf1Zww+ZiQ/JlUHDBux2bgCI7hjAlghUk8VEFB4hnIwIbB0WbxPaev16Cr/u1aWfPYWbpyk46RjYuWaxm8IrbvoO6Ug3LUSvkjYK6MgRdvq86XmNpyNdJbp2YBxBDRqvGNKhmDtMGIMYAmiBdA8u4nQ8J4e3UbTi9cIPYKTbxHJrUFHVfjUqBc1SMkvIopBs61C1V0oQgCAmTZyVeetFMftNgPzDMbrrVfbr1uCWVmmP91A8oIPLFbtrR1tsggVLAnIe4VieM5DacLLsNz7ykXiezueUeWIud6vyDCYLxc2iW5d7n3E4r5kkpEchpJEBlMpvp+oasGDHzMbHRWiyhLbfUMBtx8vEvr4csK+nN9bpLMKUk55RB+LgF08ecYIk7aXZX7FBY5k7i+eQ0MxQNgFnMhA123ykggXIhlVu2srFAxQyOtYpMZyAbTd83VoB8KNPzFY9dJ9WM9TKyxO7CPRM/qMHfo3Y+0FdYxbKp1t3ZeOJCWlkau4hpJpFzca9K1SNLrx6r9JwmaPFHwg/I7bKMjfYBxTVEhw8uJVemy1NwATlII2q0z1jMHmMscphPuCUnLYg7x++UenFxczYtJh+9r8bNS1z1a9pjWdGgTisQfvIwlAnp9IFDH/JrHicTY0AQcYgdvNs9S30BbFwznLEDjQCFHOlvZhF3H8n8Vfr1G2I2UE5eWsgltPdqGDZcrl2B/vqoXq9VGI2ba3i9JpKztbatt8rsjtBB0m99rc/a85jmM4973cfzaC/Ltq0lLojNXUKmjzVZRlGmm1NPhOD7s0hmApjIbR/PpmfHH//Z";
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_4.jpg
caapGlob.symbol_tiny_4 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAIUAAQEAAAAAAAAAAAAAAAAAAAgJAQACAgMAAAAAAAAAAAAAAAAEBgEDBQcIEAABBAEEAgECBwAAAAAAAAADAQIEBQYREhMHFAgAMhUxIkJjFhcJEQACAQIEAwUFCQEAAAAAAAABAhESAwAhMQRBYQVRsSJSE/BxwdFCgZGh4fEyYhQVBv/aAAwDAQACEQMRAD8AlB6l+qd/2bJNdtiksLgYfvEhxI6zh1sIpnjitHCK8Y5M6VxuINhl4hhTe5pFe1rVjqPVrNpgL9z0rc0z5miSJ+kDidZykRmJf3ABhmhZj3n4YSOG+tNH2/HPhzbW8iSxo8T0vQ01rXhc38qoesZWQVG1FTRfHKN7f0rr8I3O32O2tf2HahfPUeOmcmqeAznsxLJbQVTHOT7HBnsfT3IYHs5XdUQa5TOnzT082mfOmDgxZQQeaOSkvjWS+tKDSSxdqHUbSC15Gciir1pDtjca4AoAYPTqsxNPmGYIiJgxBjELufASW4TPKezt/XDA/wAsJCZDdBHjUmMMzn1VhOSWJxmkqT4/X0vI1jCCVeCfTHjKuujXqmv1Jqt/9jt7b9FveoGLWnY5EAyWMEyDkQ4J5YD3yg2GnVSe/wCRxQCwh+tcrL+wca6zHHh91QYsCTey5bHFjkcQGg3I1j2aoxdqG2qi7tNV1+aFf/UTabS5uyx2rM1ABg658Dmc6ZnKYywun1giF/2GY9u7E0Mwz+2me0+NWEcoG9gjdHiOaqKgiz4NfkdocCN13KogXEYKs13akRn1Jp86du9LtMibMA0LYZT5oakDlJpPKRhsNkGLY0Cn8Y+WDF6c2Ps3VZTXh6XrJ9uSTPmso34/KSHaxZCMGs0kV5RkasZW8SSUOJ8dV2I7a/a5COqpt2W4bjAAJ46hKFP56c4ghveMWbhUJaSBlnOkc/hxwprjK/cYtrbgxnHLB3ao48tbv+ONx+BcFCip5SOlBubZUVXablFDRyr+G1dPgO7ey21tC8thbMrQSaln6KRC/Z4tNcpxU8FBVSFyjiOUCB34Gdzc9x/3DUZDkNRF+6eOYlBQEMfh4+cqGGMrTc/mc/IrlUvk+R+5tT5mbVpaXRGauoVNHiqyjKNNOFNPKcEKgggEzOZ4z935Rj//2Q%3D%3D";
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_5.jpg
caapGlob.symbol_tiny_5 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAGsAAQEAAAAAAAAAAAAAAAAAAAgJAQEBAQAAAAAAAAAAAAAAAAABAgMQAAEDAgUCBAYDAAAAAAAAAAIBAwQFBhESEwcIABQxIhUJIUEyQmIWM0QXEQEBAQADAAAAAAAAAAAAAAABABEhQQL/2gAMAwEAAhEDEQA/AI58ethnb+kS7muKYUSgQybdmTnm+67dJJuJGjx4zhgD0p9GjNEcXTbbTOSEpCPUgZUtQmkeyg5upxKp3J7ba7JFZ20lNKNZkxKhT6y9bcgSVsm6zRXKZAJsRVMSKM6mAqhCuCoqmkQKkcMNzInKuPxvbZYW5Jb5xXAOe8FLBoI3qQzxl4K6UE4grJT4auQTb/kHFVCRml7Hd+bQ29cb8vda2ot47bNSDC8qBLjsSXDoNaokOjJPjg+ipnhS6caIqYKhYChCpovQmkdyZ5Pcsmvbkvxqwfb8u+3K9wfuejzQl0ZuSFWkTptRh+nzv2lpQizYzzSGgxQzNoIj5kVVLqPPnGVgPflyy6tyusymwHsLzp1DKmzFzojpyW6XXagUfH5ugxUWW8vjmPL4ph1qwR64hv8AJWDudETjzHkzrncfmDC9MeBh5oEbRZhEUsCY7XTypISQCsYYZsFyr0DxKSOu+8eXs15+E1alIj30KFqSaa5bLEwzRP67hVWe1qL9uhHQsfowXp2MiJJlbpf6jGqVRjJ+4ec6fTiORn1O4LOAGha3caubFVPV1fzwToWcv//Z";
///////////////////////////

var style = {};

if (caapGlob.is_chrome) {
    CM_Listener();
}

if (!caapGlob.is_chrome) {
    if (!GM_log) {
        GM_log = console.debug;
    }
}

/////////////////////////////////////////////////////////////////////
//                          gm OBJECT
// this object is used for setting/getting GM specific functions.
/////////////////////////////////////////////////////////////////////

var gm = {
    // use to log stuff
    log: function (mess) {
        GM_log('v' + caapGlob.thisVersion + ': ' + mess);
    },

    debug: function (mess) {
        if (caapGlob.debug) {
            gm.log(mess);
        }
    },

    // use these to set/get values in a way that prepends the game's name
    setValue: function (n, v) {
        gm.debug('Set ' + n + ' to ' + v);
        GM_setValue(caapGlob.gameName + "__" + n, v);
        return v;
    },

    getValue: function (n, v) {
        gm.debug('Get ' + n + ' value ' + GM_getValue(caapGlob.gameName + "__" + n, v));
        return GM_getValue(caapGlob.gameName + "__" + n, v);
    },

    deleteValue: function (n) {
        gm.debug('Delete ' + n + ' value ');
        return GM_deleteValue(caapGlob.gameName + "__" + n);
    },

    IsArray: function (testObject) {
        return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
    },

    setList: function (n, v) {
        if (!gm.IsArray(v)) {
            gm.log('Attempted to SetList ' + n + ' to ' + v.toString() + ' which is not an array.');
            return;
        }

        return GM_setValue(caapGlob.gameName + "__" + n, v.join(caapGlob.os));
    },

    getList: function (n) {
        var getTheList = GM_getValue(caapGlob.gameName + "__" + n, '');
        gm.debug('GetList ' + n + ' value ' + GM_getValue(caapGlob.gameName + "__" + n));
        return (getTheList) ? getTheList.split(caapGlob.os) : [];
    },

    listAddBefore: function (listName, addList) {
        var newList = addList.concat(gm.getList(listName));
        gm.setList(listName, newList);
        return newList;
    },

    listPop: function (listName) {
        var popList = gm.getList(listName);
        if (!popList.length) {
            return '';
        }

        var popItem = popList.pop();
        gm.setList(listName, popList);
        return popItem;
    },

    listPush: function (listName, pushItem, max) {
        var list = gm.getList(listName);

        // Only add if it isn't already there.
        if (list.indexOf(pushItem) != -1) {
            return;
        }

        list.push(pushItem);
        if (max > 0) {
            while (max < list.length) {
                pushItem = list.shift();
                gm.debug('Removing ' + pushItem + ' from ' + listName + '.');
            }
        }

        gm.setList(listName, list);
    },

    listFindItemByPrefix: function (list, prefix) {
        var itemList = list.filter(function (item) {
            return item.indexOf(prefix) === 0;
        });

        //gm.log('List: ' + list + ' prefix ' + prefix + ' filtered ' + itemList);
        if (itemList.length) {
            return itemList[0];
        }
    },

    setObjVal: function (objName, label, value) {
        var objStr = gm.getValue(objName);
        if (!objStr) {
            gm.setValue(objName, label + caapGlob.ls + value);
            return;
        }

        var itemStr = gm.listFindItemByPrefix(objStr.split(caapGlob.vs), label + caapGlob.ls);
        if (!itemStr) {
            gm.setValue(objName, label + caapGlob.ls + value + caapGlob.vs + objStr);
            return;
        }

        var objList = objStr.split(caapGlob.vs);
        objList.splice(objList.indexOf(itemStr), 1, label + caapGlob.ls + value);
        gm.setValue(objName, objList.join(caapGlob.vs));
    },

    getObjVal: function (objName, label, defaultValue) {
        var objStr;
        if (objName.indexOf(caapGlob.ls) < 0) {
            objStr = gm.getValue(objName);
        } else {
            objStr = objName;
        }

        if (!objStr) {
            return defaultValue;
        }

        var itemStr = gm.listFindItemByPrefix(objStr.split(caapGlob.vs), label + caapGlob.ls);
        if (!itemStr) {
            return defaultValue;
        }

        return itemStr.split(caapGlob.ls)[1];
    },

    getListObjVal: function (listName, objName, label, defaultValue) {
        var gLOVlist = gm.getList(listName);
        if (!(gLOVlist.length)) {
            return defaultValue;
        }

        //gm.log('have list '+gLOVlist);
        var objStr = gm.listFindItemByPrefix(gLOVlist, objName + caapGlob.vs);
        if (!objStr) {
            return defaultValue;
        }

        //gm.log('have obj ' + objStr);
        var itemStr = gm.listFindItemByPrefix(objStr.split(caapGlob.vs), label + caapGlob.ls);
        if (!itemStr) {
            return defaultValue;
        }

        //gm.log('have val '+itemStr);
        return itemStr.split(caapGlob.ls)[1];
    },

    setListObjVal: function (listName, objName, label, value, max) {
        var objList = gm.getList(listName);
        if (!(objList.length)) {
            gm.setValue(listName, objName + caapGlob.vs + label + caapGlob.ls + value);
            return;
        }

        var objStr = gm.listFindItemByPrefix(objList, objName + caapGlob.vs);
        if (!objStr) {
            gm.listPush(listName, objName + caapGlob.vs + label + caapGlob.ls + value, max);
            return;
        }

        var valList = objStr.split(caapGlob.vs);
        var valStr = gm.listFindItemByPrefix(valList, label + caapGlob.ls);
        if (!valStr) {
            valList.push(label + caapGlob.ls + value);
            objList.splice(objList.indexOf(objStr), 1, objStr + caapGlob.vs + label + caapGlob.ls + value);
            gm.setList(listName, objList);
            return;
        }

        valList.splice(valList.indexOf(valStr), 1, label + caapGlob.ls + value);
        objList.splice(objList.indexOf(objStr), 1, valList.join(caapGlob.vs));
        gm.setList(listName, objList);
    },

    deleteListObj: function (listName, objName) {
        var objList = gm.getList(listName);
        if (!(objList.length)) {
            return false;
        }

        var objStr = gm.listFindItemByPrefix(objList, objName);
        if (objStr) {
            objList.splice(objList.indexOf(objStr), 1);
            gm.setList(listName, objList);
        }
    }
};

/////////////////////////////////////////////////////////////////////
//                          userscript updater
// Used by browsers other than Chrome (namely Firefox and Flock)
// to get updates from userscripts.org
// Needs to be modifed to work from GitHub instead
/////////////////////////////////////////////////////////////////////

if (!caapGlob.is_chrome) {
    if (parseInt(gm.getValue('SUC_remote_version', 0), 10) > caapGlob.thisVersion) {
        caapGlob.newVersionAvailable = true;
    }

    // update script from: http://userscripts.org/scripts/review/57917
    try {
        function updateCheck(forced) {
            if ((forced) || (parseInt(gm.getValue('SUC_last_update', '0'), 10) + (86400000 * 1) <= (new Date().getTime()))) {
                try {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'http://userscripts.org/scripts/source/' + caapGlob.SUC_script_num + '.meta.js?' + new Date().getTime(),
                        headers: {'Cache-Control': 'no-cache'},
                        onload: function (resp) {
                            var rt = resp.responseText;
                            var remote_version = parseInt(/@version\s*(.*?)\s*$/m.exec(rt)[1], 10);
                            var script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            gm.setValue('SUC_last_update', new Date().getTime() + '');
                            gm.setValue('SUC_target_script_name', script_name);
                            gm.setValue('SUC_remote_version', remote_version);
                            gm.log('remote version ' + remote_version);
                            if (remote_version > caapGlob.thisVersion) {
                                caapGlob.newVersionAvailable = true;
                                if (forced) {
                                    if (confirm('There is an update available for the Greasemonkey script "' + script_name + '."\nWould you like to go to the install page now?')) {
                                        GM_openInTab('http://userscripts.org/scripts/show/' + caapGlob.SUC_script_num);
                                    }
                                }
                            } else if (forced) {
                                alert('No update is available for "' + script_name + '."');
                            }
                        }
                    });
                } catch (err) {
                    if (forced) {
                        alert('An error occurred while checking for updates:\n' + err);
                    }
                }
            }
        }

        GM_registerMenuCommand(gm.getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function () {
            updateCheck(true);
        });

        updateCheck(false);
    } catch (err) {}
}

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};

/////////////////////////////////////////////////////////////////////
//                          HTML TOOLS
// this object contains general methods for wading through the DOM and dealing with HTML
/////////////////////////////////////////////////////////////////////

var nHtml = {
    xpath: {
        string : XPathResult.STRING_TYPE,
        unordered: XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        first : XPathResult.FIRST_ORDERED_NODE_TYPE
    },

    FindByAttrContains: function (obj, tag, attr, className, subDocument) {
        if (attr == "className") {
            attr = "class";
        }

        if (!subDocument) {
            subDocument = document;
        }

        var q = subDocument.evaluate(".//" + tag + "[contains(translate(@" +
            attr + ",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" +
            className.toLowerCase() + "')]", obj, null, this.xpath.first, null);

        if (q && q.singleNodeValue) {
            return q.singleNodeValue;
        }

        return null;
    },

    FindByAttrXPath: function (obj, tag, className, subDocument) {
        var q = null;
        var xp = ".//" + tag + "[" + className + "]";
        try {
            if (obj === null) {
                gm.log('Trying to find xpath with null obj:' + xp);
                return null;
            }

            if (!subDocument) {
                subDocument = document;
            }

            q = subDocument.evaluate(xp, obj, null, this.xpath.first, null);
        } catch (err) {
            gm.log("XPath Failed:" + xp + "," + err);
        }

        if (q && q.singleNodeValue) {
            return q.singleNodeValue;
        }

        return null;
    },

    FindByAttr: function (obj, tag, attr, className, subDocument) {
        if (className.exec === undefined) {
            if (attr == "className") {
                attr = "class";
            }

            if (!subDocument) {
                subDocument = document;
            }

            var q = subDocument.evaluate(".//" + tag + "[@" + attr + "='" + className + "']", obj, null, this.xpath.first, null);

            if (q && q.singleNodeValue) {
                return q.singleNodeValue;
            }

            return null;
        }

        var divs = obj.getElementsByTagName(tag);
        for (var d = 0; d < divs.length; d++) {
            var div = divs[d];
            if (className.exec !== undefined) {
                if (className.exec(div[attr])) {
                    return div;
                }
            } else if (div[attr] == className) {
                return div;
            }
        }

        return null;
    },

    FindByClassName: function (obj, tag, className) {
        return this.FindByAttr(obj, tag, "className", className);
    },

    spaceTags: {
        'td': 1,
        'br': 1,
        'hr': 1,
        'span': 1,
        'table': 1
    },

    GetText: function (obj) {
        var txt = ' ';
        if (obj.tagName !== undefined && this.spaceTags[obj.tagName.toLowerCase()]) {
            txt += " ";
        }

        if (obj.nodeName == "#text") {
            return txt + obj.textContent;
        }

        for (var o = 0; o < obj.childNodes.length; o++) {
            var child = obj.childNodes[o];
            txt += this.GetText(child);
        }

        return txt;
    },

    htmlRe: new RegExp('<[^>]+>', 'g'),

    StripHtml: function (html) {
        return html.replace(this.htmlRe, '').replace(/&nbsp;/g, '');
    },

    timeouts: {},

    setTimeout: function (func, millis) {
        var t = window.setTimeout(function () {
            func();
            nHtml.timeouts[t] = undefined;
        }, millis);

        this.timeouts[t] = 1;
    },

    clearTimeouts: function () {
        for (var t in this.timeouts) {
            if (this.timeouts.hasOwnProperty(t)) {
                window.clearTimeout(t);
            }
        }

        this.timeouts = {};
    },

    getX: function (path, parent, type) {
        var evaluate = null;
        switch (type) {
        case this.xpath.string :
            evaluate = document.evaluate(path, parent, null, type, null).stringValue;
            break;
        case this.xpath.first :
            evaluate = document.evaluate(path, parent, null, type, null).singleNodeValue;
            break;
        case this.xpath.unordered :
            evaluate = document.evaluate(path, parent, null, type, null);
            break;
        default :
            break;
        }

        return evaluate;
    },

    getHTMLPredicate: function (HTML) {
        for (var x = HTML.length; x > 1; x--) {
            if (HTML.substr(x, 1) == '/') {
                return HTML.substr(x + 1);
            }
        }

        return HTML;
    },

    OpenInIFrame: function (url, key) {
        //if (!iframe = document.getElementById(key))
        var iframe = document.createElement("iframe");
        //gm.log ("Navigating iframe to " + url);
        iframe.setAttribute("src", url);
        iframe.setAttribute("id", key);
        iframe.setAttribute("style", "width:0;height:0;");
        document.documentElement.appendChild(iframe);
    },

    ResetIFrame: function (key) {
        var iframe = document.getElementById(key);
        if (iframe) {
            gm.log("Deleting iframe = " + key);
            iframe.parentNode.removeChild(iframe);
        } else {
            gm.log("Frame not found = " + key);
        }

        if (document.getElementById(key)) {
            gm.log("Found iframe");
        }
    },

    Gup: function (name, href) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(href);
        if (results === null) {
            return "";
        } else {
            return results[1];
        }
    },

    ScrollToBottom: function () {
        //gm.log("Scroll Height: " + document.body.scrollHeight);
        if (document.body.scrollHeight) {
            if (caapGlob.is_chrome) {
                var dh = document.body.scrollHeight;
                var ch = document.body.clientHeight;
                if (dh > ch) {
                    var moveme = dh - ch;
                    gm.log("Scrolling down by: " + moveme + "px");
                    window.scroll(0, moveme);
                    gm.log("Scrolled ok");
                } else {
                    gm.log("Not scrolling to bottom. Client height is greater than document height!");
                }
            } else {
                window.scrollBy(0, document.body.scrollHeight);
            }
        }// else if (screen.height) {}
    },

    ScrollToTop: function () {
        if (caapGlob.is_chrome) {
            gm.log("Scrolling to top");
            window.scroll(0, 0);
            gm.log("Scrolled ok");
        } else {
            window.scrollByPages(-1000);
        }
    },

    CountInstances: function (string, word) {
        var substrings = string.split(word);
        return substrings.length - 1;
    }
};

/////////////////////////////////////////////////////////////////////
//                          move OBJECT
/////////////////////////////////////////////////////////////////////

var Move = {
    moveHandler: function (e) {
        caapGlob.savedTarget.style.position = 'absolute';
        if (e === null) {
            return;
        }

        if (e.button <= 1 && caapGlob.dragOK) {
            caapGlob.savedTarget.style.left = e.clientX - caapGlob.dragXoffset + 'px';
            caapGlob.savedTarget.style.top = e.clientY - caapGlob.dragYoffset + 'px';
            return false;
        }
    },

    cleanup: function (e) {
        document.removeEventListener('mousemove', Move.moveHandler, false);
        document.removeEventListener('mouseup', Move.cleanup, false);
        if (caapGlob.savedTarget.style.left && caapGlob.savedTarget.style.top) {
            gm.setValue('menuLeft', caapGlob.savedTarget.style.left);
            gm.setValue('menuTop',  caapGlob.savedTarget.style.top);
        }
        caapGlob.dragOK = false; //its been dragged now
    },

    dragHandler: function (e) {
        if (e === null) {
            return;// {{ e = window.event;}  // htype='move';}
        }

        var target = document.getElementById("caap_div");// != null ? e.target : e.srcElement;
        if (target.nodeName != 'DIV') {
            return;
        }

        caapGlob.savedTarget = target;
        caapGlob.dragOK = true;
        caapGlob.dragXoffset = e.clientX - target.offsetLeft;
        caapGlob.dragYoffset = e.clientY - target.offsetTop;

        //set the left before removing the right
        target.style.left = e.clientX - caapGlob.dragXoffset + 'px';
        target.style.right = null;
        document.addEventListener('mousemove', Move.moveHandler, false);
        document.addEventListener('mouseup', Move.cleanup, false);
        return false;
    }
};

////////////////////////////////////////////////////////////////////
//                          caap OBJECT
// this is the main object for the game, containing all methods, globals, etc.
/////////////////////////////////////////////////////////////////////

var caap = {
    stats: {},
    lastReload: new Date(),
    autoReloadMilliSecs: 15 * 60 * 1000,

    userRe: new RegExp("(userId=|user=|/profile/|uid=)([0-9]+)"),
    levelRe: new RegExp('Level\\s*:\\s*([0-9]+)', 'i'),
    rankRe: new RegExp(',\\s*level\\s*:?\\s*[0-9]+\\s+([a-z ]+)', 'i'),
    armyRe: new RegExp('My Army\\s*\\(?([0-9]+)', 'i'),
    statusRe: new RegExp('([0-9\\.]+)\\s*/\\s*([0-9]+)', 'i'),
    htmlJunkRe: new RegExp("\\&[^;]+;", "g"),
    energyRe: new RegExp("([0-9]+)\\s+(energy)", "i"),
    gameNameRe: new RegExp("^/([^/]+)/"),
    experienceRe: new RegExp("\\+([0-9]+)"),
    influenceRe: new RegExp("([0-9]+)%"),
    gainLevelRe: new RegExp("gain\\s+level\\s+([0-9]+)\\s+in", "i"),
    moneyRe: new RegExp("\\$([0-9,]+)\\s*-\\s*\\$([0-9,]+)", "i"),
    firstNumberRe: new RegExp("([0-9]+)"),

    /////////////////////////////////////////////////////////////////////
    //                          UTILITY FUNCTIONS
    // Small functions called a lot to reduce duplicate code
    /////////////////////////////////////////////////////////////////////

    Click: function (obj, loadWaitTime) {
        if (!obj) {
            gm.log('ERROR: Null object passed to Click');
            return;
        }

        this.waitMilliSecs = (loadWaitTime) ? loadWaitTime : 5000;
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return !obj.dispatchEvent(evt);
    },

    ClickWait: function (obj, loadWaitTime) {
        this.setTimeout(function () {
            this.Click(obj, loadWaitTime);
        }, 1000 + Math.floor(Math.random() * 1000));
    },

    VisitUrl: function (url, loadWaitTime) {
        this.waitMilliSecs = (loadWaitTime) ? loadWaitTime : 5000;
    //  this.setTimeout(function () {
        document.location.href = url;
    //  },1000+Math.floor(Math.random()*1000));
    },

    GetCurrentGeneral: function () {
        var webSlice = nHtml.FindByAttrContains(document.body, "div", "class", 'general_name_div3');
        if (!webSlice) {
            gm.log("Couldn't find current general div");
            return false;
        }

        return webSlice.innerHTML.trim();
    },

    UpdateGeneralList: function () {
        if (!this.CheckForImage('tab_generals_on.gif')) {
            return false;
        }

        var gens = nHtml.getX('//div[@class=\'generalSmallContainer2\']', document, nHtml.xpath.unordered);
        gm.setValue('AllGenerals', '');
        gm.setValue('GeneralImages', '');
        gm.setValue('LevelUpGenerals', '');
        for (var x = 0; x < gens.snapshotLength; x++) {
            var gen = nHtml.getX('./div[@class=\'general_name_div3\']/text()', gens.snapshotItem(x), nHtml.xpath.string).replace(/[\t\r\n]/g, '');
            var img = nHtml.getX('.//input[@class=\'imgButton\']/@src', gens.snapshotItem(x), nHtml.xpath.string);
            img = nHtml.getHTMLPredicate(img);
    //      var atk = nHtml.getX('./div[@class=\'generals_indv_stats\']/div[1]/text()', gens.snapshotItem(x), nHtml.xpath.string);
    //      var def = nHtml.getX('./div[@class=\'generals_indv_stats\']/div[2]/text()', gens.snapshotItem(x), nHtml.xpath.string);
    //      var skills = nHtml.getX('.//table//td[1]/div/text()', gens.snapshotItem(x), nHtml.xpath.string).replace(/[\t\r\n]/gm,'');
            var level = nHtml.getX('./div[4]/div[2]/text()', gens.snapshotItem(x), nHtml.xpath.string).replace(/Level /gi, '').replace(/[\t\r\n]/g, '');
    //      var genatts = gen + ":" + atk + "/" + def + ":L" + level + ":" + img + ","
            gm.listPush('AllGenerals', gen);
            gm.listPush('GeneralImages', gen + ':' + img);
            if (level < 4) {
                gm.listPush('LevelUpGenerals', gen);
            }
        }
        gm.setList('AllGenerals', gm.getList('AllGenerals').sort());
    //  gm.log("All Generals: " + gm.getList('AllGenerals'));
    },

    ClearGeneral: function (whichGeneral) {
        gm.log('Setting ' + whichGeneral + ' to "Use Current"');
        gm.setValue(whichGeneral, 'Use Current');
        this.SetControls(true);
    },

    SelectGeneral: function (whichGeneral) {
        var general = gm.getValue(whichGeneral, '');
        if (!general) {
            return false;
        }

        if (!general || /use current/i.test(general)) {
            return false;
        }

        if (/under level 4/i.test(general)) {
            if (!gm.getList('LevelUpGenerals').length) {
                return this.ClearGeneral(whichGeneral);
            }

            if (gm.getValue('ReverseLevelUpGenerals')) {
                general = gm.getList('LevelUpGenerals').reverse().pop();
            }
            else {
                general = gm.getList('LevelUpGenerals').pop();
            }
        }

        var getCurrentGeneral = this.GetCurrentGeneral();
        if (!getCurrentGeneral) {
            this.ReloadCastleAge();
        }

        var currentGeneral = getCurrentGeneral.replace('**', '');
        if (general.indexOf(currentGeneral) >= 0) {
            return false;
        }

        gm.log('Changing from ' + currentGeneral + ' to ' + general);
        if (this.NavigateTo('mercenary,generals', 'tab_generals_on.gif')) {
            return true;
        }

        if (/get general list/i.test(general)) {
            return this.ClearGeneral(whichGeneral);
        }

        var hasGeneral = function (genImg) {
            return (genImg.indexOf(general.replace(/:.+/, '')) >= 0);
        };

        var generalImage = gm.getList('GeneralImages').filter(hasGeneral).toString().replace(/.+:/, '');
        if (this.CheckForImage(generalImage)) {
            return this.NavigateTo(generalImage);
        }

        this.SetDivContent('Could not find ' + general);
        gm.log('Could not find ' + generalImage);
        return this.ClearGeneral(whichGeneral);
    },

    oneMinuteUpdate: function (funcName) {
        if (!gm.getValue('reset' + funcName) && !this.WhileSinceDidIt(funcName + 'Timer', 60)) {
            return false;
        }

        this.JustDidIt(funcName + 'Timer');
        gm.setValue('reset' + funcName, false);
        return true;
    },

    NavigateTo: function (pathToPage, imageOnPage) {
        var content = document.getElementById('content');
        if (!content) {
            gm.log('No content to Navigate to ' + imageOnPage + ' using ' + pathToPage);
            return false;
        }

        if (imageOnPage && this.CheckForImage(imageOnPage)) {
            return false;
        }

        var pathList = pathToPage.split(",");
        for (var s = pathList.length - 1; s >= 0; s--) {
            var a = nHtml.FindByAttrXPath(content, 'a', "contains(@href,'/" + pathList[s] + ".php') and not(contains(@href,'" + pathList[s] + ".php?'))");
            if (a) {
                gm.log('Go to ' + pathList[s]);
                caap.Click(a);
                return true;
            }

            var imageTest = pathList[s];
            if (imageTest.indexOf(".") == -1) {
                imageTest = imageTest + '.';
            }

            var input = nHtml.FindByAttrContains(document.body, "input", "src", imageTest);
            if (input) {
                gm.log('Click on image ' + input.src.match(/[\w.]+$/));
                caap.Click(input);
                return true;
            }

            var img = nHtml.FindByAttrContains(document.body, "img", "src", imageTest);
            if (img) {
                gm.log('Click on image ' + img.src.match(/[\w.]+$/));
                caap.Click(img);
                return true;
            }
        }
        gm.log('Unable to Navigate to ' + imageOnPage + ' using ' + pathToPage);
        return false;
    },

    CheckForImage: function (image, webSlice, subDocument) {
        if (!webSlice) {
            if (!subDocument) {
                webSlice = document.body;
            } else {
                webSlice = subDocument.body;
            }
        }

        var imageSlice = nHtml.FindByAttrContains(webSlice, 'input', 'src', image, subDocument);
        if (imageSlice) {
            return imageSlice;
        }

        imageSlice = nHtml.FindByAttrContains(webSlice, 'img', 'src', image, subDocument);
        if (imageSlice) {
            return imageSlice;
        }

        imageSlice = nHtml.FindByAttrContains(webSlice, 'div', 'style', image, subDocument);
        if (imageSlice) {
            return imageSlice;
        }

        return false;
    },

    WhileSinceDidIt: function (name, seconds) {
        var now = (new Date().getTime());
        return (!gm.getValue(name) || (parseInt(gm.getValue(name), 10) < (now - 1000 * seconds)));
    },

    JustDidIt: function (name) {
        var now = (new Date().getTime());
        gm.setValue(name, now.toString());
    },

    DeceiveDidIt: function (name) {
        gm.log("Deceive Did It");
        var now = (new Date().getTime()) - 6500000;
        gm.setValue(name, now.toString());
    },

    // Returns true if timer is passed, or undefined
    CheckTimer: function (name) {
        var nameTimer = gm.getValue(name);
        if (!nameTimer) {
            return true;
        }

        var now = new Date().getTime();
        return (nameTimer < now);
    },

    FormatTime: function (time) {
        var d_names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var t_day = time.getDay();
        var t_hour = time.getHours();
        var t_min = time.getMinutes();

        if (gm.getValue("use24hr", true)) {
            return d_names[t_day] + " " + t_hour + ":" + t_min;
        } else {
            var a_p = "PM";
            if (t_hour < 12) {
                a_p = "AM";
            }

            if (t_hour === 0) {
                t_hour = 12;
            }

            if (t_hour > 12) {
                t_hour = t_hour - 12;
            }

            t_min = t_min + "";
            if (t_min.length === 1) {
                t_min = "0" + t_min;
            }

            return d_names[t_day] + " " + t_hour + ":" + t_min + " " + a_p;
        }
    },

    DisplayTimer: function (name) {
        var nameTimer = gm.getValue(name);
        if (!nameTimer) {
            return false;
        }

        var newTime = new Date();
        newTime.setTime(parseInt(nameTimer, 10));
        return this.FormatTime(newTime);
    },

    SetTimer: function (name, time) {
        var now = (new Date().getTime());
        now += time * 1000;
        gm.setValue(name, now.toString());
    },

    NumberOnly: function (num) {
        var numOnly = parseFloat(num.toString().replace(/[^0-9\.]/g, ""));
        return numOnly;
    },

    RemoveHtmlJunk: function (html) {
        return html.replace(this.htmlJunkRe, '');
    },

    /////////////////////////////////////////////////////////////////////
    //                          DISPLAY FUNCTIONS
    // these functions set up the control applet and allow it to be changed
    /////////////////////////////////////////////////////////////////////

    SetupDivs: function () {
        if (document.getElementById('caap_div')) {
            return false;
        }

        var div = document.createElement('div');
        //var b=nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_Container clearfix');
        div.id = 'caap_div';
        if (gm.getValue('menuTop', '') && gm.getValue('menuLeft', '')) {
            div.style.position = 'absolute';
            div.style.top = gm.getValue('menuTop');
            div.style.left = gm.getValue('menuLeft');
        } else {
            div.style.top = '100px';
            div.style.left = '940px';
        }

        div.style.width = '180px';
        div.style.padding = '4px';
        div.style.border = '2px solid #444';
        div.style.background = gm.getValue('StyleBackgroundLight', '#E0C691');
        div.style.opacity = gm.getValue('StyleOpacityLight', '1');
        div.style.color = '#000';
        div.style.cssFloat = 'right';
        if (gm.getValue('HideAds', false)) {
            nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds').style.display = 'none';
        }

        var divList = ['activity_mess', 'idle_mess', 'quest_mess', 'battle_mess', 'heal_mess', 'demipoint_mess', 'demibless_mess', 'level_mess', 'control'];
        for (var divID in divList) {
            if (divList.hasOwnProperty(divID)) {
                var addDiv = document.createElement('div');
                addDiv.id = 'caap_' + divList[divID];
                div.appendChild(addDiv);
            }
        }

    //check these out to see which one actually works on CA and remove the rest
        var b = nHtml.FindByAttrContains(document.body, 'div', 'className', 'UIStandardFrame_Container');
        if (b) {
            b.insertBefore(div, b.childNodes[1]);
        } else {
            var app = document.getElementById('fb_sell_profile');
            if (!app) {
                app = nHtml.FindByAttr(document.body, 'div', 'className', 'app');
            }

            if (!app) {
                app = nHtml.FindByAttr(document.body, 'div', 'id', /^app.*header$/);
            }

            if (app) {
                if (app.parentNode.parentNode) {
                    // some ajax games won't reload before the app's area, let's insert the div there.
                    app.parentNode.parentNode.insertBefore(div, app.parentNode);
                } else {
                    app.insertBefore(div, app.childNodes[0]);
                }
            } else {
                gm.log('cannot find app div');
            }
        }

        return true;
    },

    AppendTextToDiv: function (divName, text) {
        var d = document.getElementById('caap_' + divName);
        if (d) {
            d.innerHTML += text;
            return true;
        } else {
            return false;
        }
    },

    MakeDropDown: function (idName, dropDownList, instructions, formatParms) {
        var selectedItem = gm.getValue(idName, 'defaultValue');
        if (selectedItem == 'defaultValue') {
            selectedItem = gm.setValue(idName, dropDownList[0]);
        }

        var htmlCode = " <select id='caap_" + idName + "' " + formatParms + "'><option>" + selectedItem;
        for (var item in dropDownList) {
            if (dropDownList.hasOwnProperty(item)) {
                if (selectedItem != dropDownList[item]) {
                    if (instructions) {
                        htmlCode += "<option" + ((instructions[item]) ? " title='" + instructions[item] + "'" : '') + ">" + dropDownList[item];
                    } else {
                        htmlCode += "<option>" + dropDownList[item];
                    }
                }
            }
        }

        htmlCode += '</select>';
        return htmlCode;
    },

    MakeCheckBox: function (idName, defaultValue, varClass, instructions, tableTF) {
        var checkItem = gm.getValue(idName, 'defaultValue');
        if (checkItem == 'defaultValue') {
            gm.setValue(idName, defaultValue);
        }

        var htmlCode = "<input type='checkbox' id='caap_" + idName + "' title=" + '"' + instructions + '"' + ((varClass) ? " class='" + varClass + "'" : '') + (gm.getValue(idName) ? 'checked' : '') + ' />';
        if (varClass) {
            if (tableTF) {
                htmlCode += "</td></tr></table>";
            } else {
                htmlCode += '<br />';
            }

            htmlCode += this.AddCollapsingDiv(idName, varClass);
        }

        return htmlCode;
    },

    MakeNumberForm: function (idName, instructions, initDefault, formatParms) {
        if (gm.getValue(idName, 'defaultValue') == 'defaultValue') {
            gm.setValue(idName, initDefault);
        }

        if (!initDefault) {
            initDefault = '';
        }

        if (!formatParms) {
            formatParms = "size='4'";
        }

        var htmlCode = " <input type='text' id='caap_" + idName + "' " + formatParms + " title=" + '"' + instructions + '"' + " />";
        return htmlCode;
    },

    AddCollapsingDiv: function (parentId, subId) {
        var htmlCode = "<div id='caap_" + subId + "' style='display: " + (gm.getValue(parentId, false) ? 'block' : 'none') + "'>";
        return htmlCode;
    },

    ToggleControl: function (controlId, staticText) {
        var currentDisplay = gm.getValue('Control_' + controlId, "none");
        var displayChar = "-";
        if (currentDisplay == "none") {
            displayChar = "+";
        }

        var toggleCode = '<b><a id="caap_Switch_' + controlId + '" href="javascript:;" style="text-decoration: none;"> ' + displayChar + ' ' + staticText + '</a></b> <br />';
        toggleCode += "<div id='caap_" + controlId + "' style='display: " + currentDisplay + "'>";
        return toggleCode;
    },

    GetNumber: function (name, defaultValue) {
        if (!gm.getValue(name)) {
            return defaultValue || '';
        }

        return Number(gm.getValue(name));
    },

    MakeTextBox: function (idName, instructions, formatParms) {
        var checkItem = gm.getValue(idName, '');
        // if (idName == 'BattleTargets' && checkItem == '') {
            // gm.log('Freshmeat set.' + idName + ' checkItem ' + checkItem);
            // gm.setValue(idName,'freshmeat');
        // }
        var htmlCode = "<textarea title=" + '"' + instructions + '"' + " type='text' id='caap_" + idName + "' " + formatParms + ">" + gm.getValue(idName, '') + "</textarea><br />";
        return htmlCode;
    },

    SaveBoxText: function (idName) {
        var boxText = document.getElementById('caap_' + idName);
        gm.setValue(idName, boxText.value);
    },

    SetDivContent: function (idName, mess) {
        this.SetupDivs();
        var d = document.getElementById('caap_' + idName);
        if (d) {
            d.innerHTML = mess;
        }
    },

    SetQuestControl: function () {
        this.SetupDivs();
        var htmlCode = '';
        this.SetDivContent('quest_control', htmlCode);
    },

    SetControls: function (force) {
        var controlDiv = document.getElementById('caap_control');
        if (controlDiv && controlDiv.innerHTML.length > 0 && !force) {
            // we already have the controls
            return;
        }

        this.CheckLastAction(gm.getValue('LastAction', 'none'));

        var htmlCode = '';
        if (caapGlob.is_chrome) {
            htmlCode += "<div id='caapPausedDiv' style='display: none'><a href='javascript:;' id='caapPauseA' >Pause</a></div>";
        }

        htmlCode += "<div id='caapPaused' style='display: " + gm.getValue('caapPause', 'block') + "'><b>Paused on mouse click.</b><br /><a href='javascript:;' id='caapRestart' >Click here to restart </a></div>";
        var autoRunInstructions = "Disable auto running of CAAP. Stays persistent even on page reload and the autoplayer will not autoplay.";
        htmlCode += '<hr /><table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Disable Autoplayer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td><td>' + this.MakeCheckBox('Disabled', false, '', autoRunInstructions) + '</td></tr></table>';
        var bankInstructions0 = "Minimum cash to keep in the bank. Press tab to save";
        var bankInstructions1 = "Minimum cash to have on hand, press tab to save";
        var bankInstructions2 = "Maximum cash to have on hand, bank anything above this, press tab to save(leave blank to disable)";
        var healthInstructions = "Minimum health to have before healing, press tab to save(leave blank to disable): ";
        var healthStamInstructions = "Minimum Stamina to have before healing, press tab to save(leave blank to disable): ";
        var bankImmedInstructions = "Bank as soon as possible. May interrupt player and monster battles.";
        var autobuyInstructions = "Automatically buy lands in groups of 10 based on best Return On Investment value.";
        var autosellInstructions = "Automatically sell off any excess lands above your level allowance.";
        htmlCode += '<hr />' + this.ToggleControl('CashandHealth', 'CASH and HEALTH');
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Bank Immediately</td><td> ' + this.MakeCheckBox('BankImmed', false, '', bankImmedInstructions) + '</td></tr>';
        htmlCode += '<tr><td>Auto Buy Lands</td><td> ' + this.MakeCheckBox('autoBuyLand', false, '', autobuyInstructions) + '</td></tr>';
        htmlCode += '<tr><td>Auto Sell Excess Lands</td><td> ' + this.MakeCheckBox('SellLands', true, '', autosellInstructions) + '</td></tr></table>';
        htmlCode += "Always Keep&nbsp$" + this.MakeNumberForm('minInStore', bankInstructions0, 100000, "type='text'  size='12' style='font-size: 10px'") + " In Bank<br />";
        htmlCode += "Bank Above&nbsp;&nbsp$" + this.MakeNumberForm('MaxInCash', bankInstructions2, '', "type='text' size='7' style='font-size: 10px'") + "<br />";
        htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But Keep&nbsp;$" + this.MakeNumberForm('MinInCash', bankInstructions1, '', "type='text' size='7' style='font-size: 10px'") + " On Hand <br /><br />";
        htmlCode += "Heal If Below&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('MinToHeal', healthInstructions, 10, "size='1'  style='font-size: 10px'") + " Health<br />";
        htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But Not If Below" + this.MakeNumberForm('MinStamToHeal', healthStamInstructions, '', "size='1' style='font-size: 10px'") + ' Stamina<br />';
        htmlCode += "<hr/> </div>";

        var forceSubGen = "Always do a quest with the Subquest General you selected under the Generals section. NOTE: This will keep the script from automatically switching to the required general for experience of primary quests.";
        htmlCode += this.ToggleControl('Quests', 'QUEST');
        var questList = ['Energy Available', 'At Max Energy', 'Not Fortifying', 'Never'];
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td width=80>Quest When:</td><td>' + this.MakeDropDown('WhenQuest', questList, '', "style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
        htmlCode += "<div id='caap_WhenQuestHide' style='display: " + (gm.getValue('WhenQuest', false) != 'Never' ? 'block' : 'none') + "'>";
        questList = ['Quest', 'Demi Quests', 'Atlantis'];
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Pick Quest Area:</td><td>' + this.MakeDropDown('QuestArea', questList, '', "style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
        switch (gm.getValue('QuestArea', questList[0])) {
        case 'Quest' :
            questList = ['Land of Fire', 'Land of Earth', 'Land of Mist', 'Land of Water', 'Demon Realm', 'Undead Realm', 'Underworld'];
            htmlCode += '<tr><td>Pick Sub Area:</td><td>' + this.MakeDropDown('QuestSubArea', questList, '', "style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
            break;
        case 'Demi Quests' :
            questList = ['Ambrosia', 'Malekus', 'Corvintheus', 'Aurora', 'Azeron'];
            htmlCode += '<tr><td>Pick Sub Area:</td><td>' + this.MakeDropDown('QuestSubArea', questList, '', "style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
            break;
        default :
            gm.deleteValue('QuestSubArea');
            htmlCode += "<div id='AutoSubArea'></div>";
            break;
        }
        questList = ['Max Influence', 'Max Gold', 'Max Experience', 'Manual'];
        htmlCode += '<tr><td>Quest For:</td><td>' + this.MakeDropDown('WhyQuest', questList, '', "style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Switch Quest Area</td><td> ' + this.MakeCheckBox('swithQuestArea', false, '', 'Allows switching quest area') +  "</td></tr>";
        htmlCode += '<tr><td>Use Only Subquest General</td><td> ' + this.MakeCheckBox('ForceSubGeneral', false, '', forceSubGen) +  "</td></tr></table>";
        htmlCode += "</div>";
        var autoQuestName = gm.getObjVal('AutoQuest', 'name');
        if (autoQuestName) {
            htmlCode += "<a id='stopAutoQuest' href='javascript:;'>Stop auto quest: " + autoQuestName + " (energy: " + gm.getObjVal('AutoQuest', 'energy') + ")" + "</a><br />";
        }
        htmlCode += "<hr/> </div>";

        var XBattleInstructions = "Start battling if stamina is above this points";
        var XMinBattleInstructions = "Don't battle if stamina is below this points";
        var userIdInstructions = "User IDs(not user name).  Click with the right mouse button on the link to the users profile & copy link.  Then paste it here and remove everything but the last numbers. (ie. 123456789)";
        var chainBPInstructions = "Number of battle points won to initiate a chain attack. Specify 0 to always chain attack.";
        var chainGoldInstructions = "Amount of gold won to initiate a chain attack. Specify 0 to always chain attack.";
        var FMRankInstructions = "The lowest relative rank below yours that you are willing to spend your stamina on. Leave blank to attack any rank.";
        var FMARBaseInstructions = "This value sets the base for your army ratio calculation. It is basically a multiplier for the army size of a player at your equal level. A value of 1 means you will battle an opponent the same level as you with an army the same size as you or less. Default .5";
        var dontbattleInstructions = "Remember an opponents id after a loss and don't battle him again";
        var plusonekillsInstructions = "Force +1 kill scenario if 80% or more of targets are withn freshmeat settings. Note: Since Castle Age choses the target, selecting this option could result in a greater chance of loss.";
        var raidOrderInstructions = "List of search words that decide which raids to participate in first.  Use words in player name or in raid name. To specify max damage follow keyword with :max token and specifiy max damage values. Use 'k' and 'm' suffixes for thousand and million.";
        var ignorebattlelossInstructions = "Ignore battle losses and attack regardless.  This will also delete all battle loss records.";
        htmlCode += this.ToggleControl('Battling', 'BATTLE');
        var battleList = ['Stamina Available', 'At Max Stamina', 'At X Stamina', 'No Monster', 'Not Hiding', 'Never'];
        var battleInst = ['Stamina Available will battle whenever you have enough stamina',
                          'At Max Stamina will battle when stamina is at max and will burn down all stamina when able to level up',
                          'At X Stamina you can set maximum and minimum stamina to battle',
                          'No Monster will battle only when there are no active monster battles',
                          'Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted',
                          'Never - disables player battles'];
        var typeList = ['Invade', 'Duel'];
        var typeInst = ['Battle using Invade button', 'Battle using Duel button - no guarentee you will win though'];
        var targetList = ['Freshmeat', 'Userid List', 'Raid','Arena'];
        var targetInst = ['Use settings to select a target from the Battle Page', 'Select target from the supplied list of userids', 'Raid Battles'];
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Battle When:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('WhenBattle', battleList, battleInst, "style='font-size: 10px min-width: 90px; max-width: 90px; width : 90px;'") + '</td></tr></table>';
        htmlCode += "<div id='caap_WhenBattleXStamina' style='display: " + (gm.getValue('WhenBattle', false) != 'At X Stamina' ? 'none' : 'block') + "'>";
        htmlCode += '<tr><td>Start Battles with</td><td>' + this.MakeNumberForm('XBattleStamina', XBattleInstructions, 1, "size='1' style='font-size: 10px'") + ' Stamina</td></tr><br/>';
        htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;Keep</td><td>' + this.MakeNumberForm('XMinBattleStamina', XMinBattleInstructions, 0, "size='1'  style='font-size: 10px'") + ' Stamina Points</td></tr>';
        htmlCode += "</div>";
        htmlCode += "<div id='caap_WhenBattleHide' style='display: " + (gm.getValue('WhenBattle', false) != 'Never' ? 'block' : 'none') + "'>";
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Battle Type:</td><td>' + this.MakeDropDown('BattleType', typeList, typeInst, "style='font-size: 10px min-width: 60px; max-width: 60px; width : 60px;'") + '</td></tr>';
        htmlCode += '<tr><td>Clear Complete Raids</td><td>' + this.MakeCheckBox('clearCompleteRaids', false, '') + '</td></tr>';
        htmlCode += '<tr><td>Ignore Battle Losses</td><td>' + this.MakeCheckBox('IgnoreBattleLoss', false, '', ignorebattlelossInstructions) + '</td></tr>';
        htmlCode += '<tr><td>Chain:Battle Points Won &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('ChainBP', chainBPInstructions, '', "size='5' style='font-size: 10px; text-align: right' ") + '</td></tr>';
        htmlCode += '<tr><td>Chain:Gold Won</td><td>' + this.MakeNumberForm('ChainGold', chainGoldInstructions, '', "size='5' style='font-size: 10px; text-align: right' ") + '</td></tr></table>';
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Target Type: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('TargetType', targetList, targetInst, "style='font-size: 10px min-width: 90px; max-width: 90px; width : 90px;'") + '</td></tr></table>';
        htmlCode += "<div id='caap_FreshmeatSub' style='display: " + (gm.getValue('TargetType', false) != 'Userid List' ? 'block' : 'none') + "'>";
        htmlCode += "<div id='caap_RaidSub' style='display: " + (gm.getValue('TargetType', false) == 'Raid' ? 'block' : 'none') + "'>";
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Attempt +1 Kills</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('PlusOneKills', false, '', plusonekillsInstructions) + '</td></tr></table>';
        htmlCode += "Join Raids in this order: <a href='http://userscripts.org/topics/43757' target='_blank'><font color='red'>?</font></a><br />";
        htmlCode += this.MakeTextBox('orderraid', raidOrderInstructions, " rows='3'");
        htmlCode += "</div>";
        htmlCode += 'Attack targets that are:';		
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Not Lower Than Rank Minus </td><td>' + this.MakeNumberForm('FreshMeatMinRank', FMRankInstructions, '', "size='2' style='font-size: 10px; text-align: right'") + '</td></tr>';
        htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Not Higher Than X*Army </td><td>' + this.MakeNumberForm('FreshMeatARBase', FMARBaseInstructions, "0.5", "size='2' style='font-size: 10px; text-align: right'") + '</td></tr></table>';
        htmlCode += "</div>";
        htmlCode += "<div align=right id='caap_UserIdsSub' style='display: " + (gm.getValue('TargetType', false) == 'Userid List' ? 'block' : 'none') + "'>";
        htmlCode += this.MakeTextBox('BattleTargets', userIdInstructions, " rows='2'");
        htmlCode += "</div>";
        htmlCode += "</div>";
        htmlCode += "<hr/> </div>";

        var XMonsterInstructions = "Start attacking if stamina is above this points";
        var XMinMonsterInstructions = "Don't attack if stamina is below this points";
        var attackOrderInstructions = "List of search words that decide which monster to attack first.  Use words in player name or in monster name. To specify max damage follow keyword with :max token and specifiy max damage values. Use 'k' and 'm' suffixes for thousand and million. To override achievement use the ach: token and specify damage values.";
        var fortifyInstructions = "Fortify if ship health is below this % (leave blank to disable)";
        var questFortifyInstructions = "Do Quests if ship health is above this % and quest mode is set to Not Fortify (leave blank to disable)";
        var stopAttackInstructions = "Don't attack if ship health is below this % (leave blank to disable)";
        var monsterachieveInstructions = "Check if monsters have reached achievement damage level first. Switch when achievement met.";
        var demiPointsFirstInstructions = "Don't attack monsters until you've gotten all your demi points from battling.";
        var powerattackInstructions = "Use power attacks. Only do normal attacks if power attack not possible";
        var dosiegeInstructions = "Turns on or off automatic siege assist for all monsters and raids.";
        htmlCode += this.ToggleControl('Monster', 'MONSTER');
        var mbattleList = ['Stamina Available', 'At Max Stamina', 'At X Stamina', 'Not Hiding', 'Never'];
        var mbattleInst = ['Stamina Available will attack whenever you have enough stamina',
                           'At Max Stamina will attack when stamina is at max and will burn down all stamina when able to level up',
                           'At X Stamina you can set maximum and minimum stamina to battle',
                           'Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted',
                           'Never - disables attacking monsters'];
        htmlCode += '<table width=189 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Attack When:</td><td>' + this.MakeDropDown('WhenMonster', mbattleList, mbattleInst, "style='font-size: 10px min-width: 105px; max-width: 105px; width : 105px;'") + '</td></tr></table>';
        htmlCode += "<div id='caap_WhenMonsterXStamina' style='display: " + (gm.getValue('WhenMonster', false) != 'At X Stamina' ? 'none' : 'block') + "'>";
        htmlCode += '<tr><td>Start Battles with</td><td>' + this.MakeNumberForm('XMonsterStamina', XMonsterInstructions, 1, "size='1' style='font-size: 10px'") + ' Stamina</td></tr><br/>';
        htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;Keep </td><td>' + this.MakeNumberForm('XMinMonsterStamina', XMinMonsterInstructions, 0, "size='1' style='font-size: 10px'") + ' Stamina Points</td></tr>';
        htmlCode += "</div>";
        htmlCode += "<div id='caap_WhenMonsterHide' style='display: " + (gm.getValue('WhenMonster', false) != 'Never' ? 'block' : 'none') + "'>";
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += "<tr><td>Monster delay secs</td><td>" + this.MakeNumberForm('seedTime', 'Max random delay to battle monsters', 300, "type='text' size='4' style='font-size: 10px'") + "</td></tr>";
        htmlCode += '<tr><td>Power Attack Only</td><td> ' + this.MakeCheckBox('PowerAttack', true, '', powerattackInstructions) + '</td></tr>';
        htmlCode += '<tr><td>Siege weapon assist</td><td> ' + this.MakeCheckBox('DoSiege', true, '', dosiegeInstructions) + '</td></tr>';
        htmlCode += '<tr><td>Clear Complete Monsters</td><td> ' + this.MakeCheckBox('clearCompleteMonsters', false, '') + '</td></tr>';
        htmlCode += '<tr><td>Achievement Mode</td><td> ' + this.MakeCheckBox('AchievementMode', true, '', monsterachieveInstructions) + '</td></tr>';
        htmlCode += '<tr><td>Get Demi Points First</td><td> ' + this.MakeCheckBox('DemiPointsFirst', false, 'DemiList', demiPointsFirstInstructions, true) + '</td></tr>';
        var demiPoint = ['Ambrosia', 'Malekus', 'Corvintheus', 'Aurora', 'Azeron'];
        var demiPtList = ['<img src="' + caapGlob.symbol_tiny_1 + '" height="15" width="14"/>', '<img src="' + caapGlob.symbol_tiny_2 + '" height="15" width="14"/>', '<img src="' + caapGlob.symbol_tiny_3 + '" height="15" width="14"/>', '<img src="' + caapGlob.symbol_tiny_4 + '" height="15" width="14"/>', '<img src="' + caapGlob.symbol_tiny_5 + '" height="15" width="14"/>'];
        for (var demiPtItem in demiPtList) {
            if (demiPtList.hasOwnProperty(demiPtItem)) {
                htmlCode += demiPtList[demiPtItem] + this.MakeCheckBox('DemiPoint' + demiPtItem, true, '', demiPoint[demiPtItem]);
            }
        }
        htmlCode += "</div>";
        htmlCode += '</table><table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Fortify If Under</td><td>' + this.MakeNumberForm('MaxToFortify', fortifyInstructions, 50, "size='1' style='font-size: 10px'") + '%</td></tr>';
        htmlCode += '<tr><td>   Quest If Over</td><td>' + this.MakeNumberForm('MaxHealthtoQuest', questFortifyInstructions, 60, "size='1' style='font-size: 10px'") + '%</td></tr>';
        htmlCode += '<tr><td>No Attack Under</td><td>' + this.MakeNumberForm('MinFortToAttack', stopAttackInstructions, 10, "size='1' style='font-size: 10px'") + '%</td></tr></table>';
        htmlCode += "Attack Monsters in this order: <a href='http://userscripts.org/topics/43757' target='_blank'><font color='red'>?</font></a><br />";
        htmlCode += this.MakeTextBox('orderbattle_monster', attackOrderInstructions, " rows='3'");
        htmlCode += "</div>";
        htmlCode += "<hr/> </div>";

        //Monster finder controls
        var monsterFinderInstructions = "When monsters are over max damage, use Monster Finder?";
        var monsterFinderStamInstructions = "Don't find new monster if stamina under this amount";
        var monsterFinderFeedMinInstructions = "Wait at least this many minutes before checking the Castle Age feed (in Facebook) (Max 120)";
        var monsterFinderFeedMaxInstructions = "If this much time has passed, always Castle Age feed (in Facebook) (argument is in minutes)";
        var monsterFinderOrderInstructions = "List of search words that decide which monster to attack first.  Can be names or monster types.";
        htmlCode += this.ToggleControl('MonsterFinder', 'MONSTER FINDER');
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Use Monster Finder?</td><td> ' + this.MakeCheckBox('MonsterFinderUse', true, '', monsterFinderInstructions) + '</td></tr>';
        htmlCode += '<tr><td>Monster Find Min Stam</td><td>' + this.MakeNumberForm('MonsterFinderMinStam', monsterFinderStamInstructions, 50, "size='1' style='font-size: 10px'") + '</td></tr>';
        htmlCode += '<tr><td>Min-Check Feed (minutes)</td><td>' + this.MakeNumberForm('MonsterFinderFeedMin', monsterFinderFeedMinInstructions, 15, "size='1' style='font-size: 10px'") + '</td></tr>';
        htmlCode += "Find Monster Priority: <a href='http://senses.ws/caap/index.php?topic=66.0' target='_blank'><font color='red'>?</font></a>";
        htmlCode += this.MakeTextBox('MonsterFinderOrder', monsterFinderOrderInstructions, " rows='3'");
        htmlCode += "</div>";
        htmlCode += "</table><hr/> </div>";

        //Recon Controls
        var PReconInstructions = "Enable player battle reconnaissance to run as an idle background task. Battle targets will be collected and can be displayed using the 'Target List' selection on the dashboard.";
        var PRRankInstructions = "Provide the number of ranks below you which recon will use to filter targets. This value will be subtracted from your rank to establish the minimum rank that recon will consider as a viable target. Default 3.";
        var PRLevelInstructions = "Provide the number of levels above you which recon will use to filter targets. This value will be added to your level to establish the maximum level that recon will consider as a viable target. Default 10.";
        var PRARBaseInstructions = "This value sets the base for your army ratio calculation. It is basically a multiplier for the army size of a player at your equal level. For example, a value of .5 means you will battle an opponent the same level as you with an army half the size of your army or less. Default 1.";
        htmlCode += this.ToggleControl('Recon', 'RECON');
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Enable Player Recon </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('DoPlayerRecon', false, 'PlayerReconControl', PReconInstructions, true) + '</td></tr></table>';
        htmlCode += 'Find battle targets that are:';
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Not Lower Than Rank Minus </td><td>' + this.MakeNumberForm('ReconPlayerRank', PRRankInstructions, '3', "size='2' style='font-size: 10px; text-align: right'") + '</td></tr>';
        htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Not Higher Than Level Plus </td><td>' + this.MakeNumberForm('ReconPlayerLevel', PRLevelInstructions, '10', "size='2' style='font-size: 10px; text-align: right'") + '</td></tr>';
        htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Not Higher Than X*Army </td><td>' + this.MakeNumberForm('ReconPlayerARBase', PRARBaseInstructions, '1', "size='2' style='font-size: 10px; text-align: right'") + '</td></tr></table>';
        htmlCode += "</div>";
        htmlCode += "<hr/> </div>";

        // Add General Comboboxes
        var generalList = ['Get General List', 'Use Current', 'Under Level 4'].concat(gm.getList('AllGenerals'));
        var crossList = function (checkItem) {
            return (generalList.indexOf(checkItem) >= 0);
        };

        var generalIncomeList = ['Get General List', 'Mercedes', 'Cid', 'Use Current'].filter(crossList);
        var generalBankingList = ['Get General List', 'Aeris', 'Use Current'].filter(crossList);
        var reverseGenInstructions = "This will make the script level Generals under level 4 from Top-down instead of Bottom-up";
        htmlCode += this.ToggleControl('Generals', 'GENERALS');
        var dropDownList = ['Idle', 'Monster', 'Fortify', 'Battle', 'SubQuest', 'Buy'];
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        for (var dropDownItem in dropDownList) {
            if (dropDownList.hasOwnProperty(dropDownItem)) {
                htmlCode += '<tr><td>' + dropDownList[dropDownItem] + '</td><td>' + this.MakeDropDown(dropDownList[dropDownItem] + 'General', generalList, '', "style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
            }
        }

        //<input type='button' id='caap_resetGeneralList' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>'
        htmlCode += '<tr><td>Income</td><td>' + this.MakeDropDown('IncomeGeneral', generalIncomeList, '', "style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
        htmlCode += '<tr><td>Banking</td><td>' + this.MakeDropDown('BankingGeneral', generalBankingList, '', "style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
        htmlCode += '<tr><td colspan="2">' + this.MakeCheckBox('ReverseLevelUpGenerals', false, '', reverseGenInstructions) + '  Reverse Under Level 4 Order</td></tr></table>';
        htmlCode += "<hr/> </div>";

        var statusInstructions = "Automatically increase attributes when upgrade skill points are available.";
        var statusAdvInstructions = "USE WITH CAUTION: You can use numbers or formulas(ie. level * 2 + 10). Variable keywords include energy, health, stamina, attack, defense, and level. JS functions can be used (Math.min, Math.max, etc) !!!Remember your math class: 'level + 20' not equals 'level * 2 + 10'!!!";
        var statImmedInstructions = "Update Stats Immediately";
        var attrList = ['', 'energy', 'attack', 'defense', 'stamina', 'health'];
        htmlCode += this.ToggleControl('Status', 'UPGRADE SKILL POINTS');
        htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Auto Add Upgrade Points</td><td> ' + this.MakeCheckBox('AutoStat', false, '', statusInstructions) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
        htmlCode += '<tr><td>Upgrade Immediately</td><td> ' + this.MakeCheckBox('StatImmed', false, '', statImmedInstructions) + "</td></tr>";
        htmlCode += '<tr><td>Advanced Settings</td><td> ' + this.MakeCheckBox('AutoStatAdv', false, '', statusAdvInstructions) + " <a href='http://userscripts.org/posts/207279' target='_blank'><font color='red'>?</font></a></td></tr></table>";
        htmlCode += "<div id='caap_Status_Normal' style='display: " + (gm.getValue('AutoStatAdv', false) ? 'none' : 'block') + "'>";
        htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
        htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1', attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue1', statusInstructions, 0, "type='text' size='2' style='font-size: 10px '") + " </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2', attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue2', statusInstructions, 0, "type='text' size='2' style='font-size: 10px'") + " </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3', attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue3', statusInstructions, 0, "type='text' size='2' style='font-size: 10px'") + " </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4', attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue4', statusInstructions, 0, "type='text' size='2' style='font-size: 10px'") + " </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5', attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue5', statusInstructions, 0, "type='text' size='2' style='font-size: 10px'") + " </td></tr></table>";
        htmlCode += "</div>";
        htmlCode += "<div id='caap_Status_Adv' style='display: " + (gm.getValue('AutoStatAdv', false) ? 'block' : 'none') + "'>";
        htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
        htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1', attrList) + " using </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue1', statusInstructions, 0, "type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2', attrList) + " using </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue2', statusInstructions, 0, "type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3', attrList) + " using </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue3', statusInstructions, 0, "type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4', attrList) + " using </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue4', statusInstructions, 0, "type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5', attrList) + " using </td></tr></table>";
        htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue5', statusInstructions, 0, "type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
        htmlCode += "</div>";
        htmlCode += "<hr/> </div>";

        var giftInstructions = "Automatically receive and send return gifts.";
        var titleInstructions = "Set the title bar to the player name.";
        var hideAdsInstructions = "Hides the sidebar adverts.";
        htmlCode += this.ToggleControl('Other', 'OTHER OPTIONS');
        var giftChoiceList = ['Same Gift As Received', 'Random Gift'];
        giftChoiceList = giftChoiceList.concat(gm.getList('GiftList'));
        giftChoiceList.push('Get Gift List');
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Set Title</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('SetTitle', false, '', titleInstructions) + "</td></tr>";
        htmlCode += '<tr><td>Hide Sidebar Adverts</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('HideAds', false, '', hideAdsInstructions) + "</td></tr>";
        htmlCode += '<tr><td>Auto Elite Army</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('AutoElite', true, 'AutoEliteControl', 'Enable or disable Auto Elite function', true) + " </td><td><input type='button' id='caap_resetElite' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>' + this.MakeTextBox('EliteArmyList', "Try these UserIDs first. Use ',' between each UserID", " rows='2'") + '</td></tr></table>';
        htmlCode += '</div>';
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Auto Return Gifts</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('AutoGift', false, 'GiftControl', giftInstructions, true) + "</td></tr></table>";
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Give&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('GiftChoice', giftChoiceList) + '</td></tr></table>';
        htmlCode += '</div>';
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += '<tr><td>Auto bless&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('AutoBless', ['None', 'Energy', 'Attack', 'Defense', 'Stamina', 'Health']) + '</td></tr>';
        htmlCode += '<tr><td>Style&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('DisplayStyle', ['CA Skin', 'Original', 'Custom', 'None']) + '</td></tr>';
        htmlCode += "</table><div id='caap_StyleSub' style='display: " + (gm.getValue('DisplayStyle', false) == 'Custom' ? 'block' : 'none') + "'>";
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += "<tr><td><b>Started</b></td><td><input type='button' id='StartedColorSelect' value='Select' style='font-size: 10px; width:50; height:50'></td></tr>";
        htmlCode += '<tr><td>RGB Color</td><td>' + this.MakeNumberForm('StyleColorStarted', 'FFF or FFFFFF', '', "type='text' size='5' style='font-size: 10px; text-align: right'") + '</td></tr>';
        htmlCode += '<tr><td>Transparency</td><td>' + this.MakeNumberForm('StyleTransparencyStarted', '0 ~ 1', '', "type='text' size='5' style='font-size: 10px; text-align: right'") + '</td></tr>';
        htmlCode += "<tr><td><b>Stoped</b></td><td><input type='button' id='StopedColorSelect' value='Select' style='font-size: 10px; width:50; height:50'></td></tr>";
        htmlCode += '<tr><td>RGB Color</td><td>' + this.MakeNumberForm('StyleColorStoped', 'FFF or FFFFFF', '', "type='text' size='5' style='font-size: 10px; text-align: right'") + '</td></tr>';
        htmlCode += '<tr><td>Transparency</td><td>' + this.MakeNumberForm('StyleTransparencyStoped', '0 ~ 1', '', "type='text' size='5' style='font-size: 10px; text-align: right'") + '</td></tr>';
        htmlCode += "</table></div>";
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += "<tr><td></td><td></td><td>&nbsp;&nbsp;&nbsp;<input type='button' id='caap_FillArmy' value='Fill Army' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
        htmlCode += '</table></div>';
        htmlCode += "<hr/></div>";
        htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
        htmlCode += "<tr><td><input type='checkbox' id='unlockMenu' /></td><td>Unlock Menu</td><td><input type='button' id='caap_ResetMenuLocation' value='Reset' style='font-size: 10px; width:50; height:50'></td></tr></table>";
        htmlCode += "Version: " + caapGlob.thisVersion + "  -  <a href='" + caapGlob.discussionURL + "' target='_blank'>Discussion Boards</a><br />";
        if (caapGlob.newVersionAvailable) {
            htmlCode += "<a href='http://userscripts.org/scripts/source/" + caapGlob.SUC_script_num + ".user.js'>Install new autoplayer version: " + gm.getValue('SUC_remote_version') + "!</a>";
        }

        this.SetDivContent('control', htmlCode);

        // Add a timer here to make sure user has a pause before script starts
        caap.JustDidIt('newControlPanelLoaded');

        this.AddListeners('caap_div');

        var SetTitleBox = document.getElementById('caap_SetTitle');
        var SetTitle = gm.getValue('SetTitle', false);
        SetTitleBox.checked = SetTitle ? true : false;
        SetTitleBox.addEventListener('change', function (e) {
            if (gm.getValue('SetTitle')) {
                document.title = gm.getValue('PlayerName', 'CAAP') + " - " + caapGlob.documentTitle;
            } else {
                document.title = caapGlob.documentTitle;
            }
        }, false);

        var HideAdsBox = document.getElementById('caap_HideAds');
        var HideAds = gm.getValue('HideAds', false);
        HideAdsBox.checked = HideAds ? true : false;
        HideAdsBox.addEventListener('change', function (e) {
            if (gm.getValue('HideAds')) {
                nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds').style.display = 'none';
            } else {
                nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds').style.display = 'block';
            }
        }, false);

        var DoSiegeBox = document.getElementById('caap_DoSiege');
        var DoSiege = gm.getValue('DoSiege', true);
        DoSiegeBox.checked = DoSiege ? true : false;
        DoSiegeBox.addEventListener('change', function (e) {
        }, false);

        var SellLandsBox = document.getElementById('caap_SellLands');
        var SellLands = gm.getValue('SellLands', true);
        SellLandsBox.checked = SellLands ? true : false;
        SellLandsBox.addEventListener('change', function (e) {
        }, false);

        var IgnoreBattleLossBox = document.getElementById('caap_IgnoreBattleLoss');
        var IgnoreBattleLoss = gm.getValue('IgnoreBattleLoss', false);
        IgnoreBattleLossBox.checked = IgnoreBattleLoss ? true : false;
        IgnoreBattleLossBox.addEventListener('change', function (e) {
            if (gm.getValue('IgnoreBattleLoss')) {
                gm.log("Ignore Battle Losses has been enabled.");
                gm.setValue("BattlesLostList", '');
                gm.log("Battle Lost List has been cleared.");
            }
        }, false);

        var unlockMenuBox = document.getElementById('unlockMenu');
        unlockMenuBox.addEventListener('change', function (e) {
            var div = document.getElementById("caap_div");
            if (unlockMenuBox.checked) {
                $(":input[id^='caap_']").attr({disabled: true});
                div.style.cursor = 'move';
                div.addEventListener('mousedown', Move.dragHandler, false);
            } else {
                $(":input[id^='caap_']").attr({disabled: false});
                div.style.cursor = '';
                div.removeEventListener('mousedown', Move.dragHandler, false);
            }

        }, false);

        var FillArmyButton = document.getElementById('caap_FillArmy');
        FillArmyButton.addEventListener('click', function (e) {
            gm.setValue("FillArmy", true);
        }, false);

        var StartedColorSelectButton = document.getElementById('StartedColorSelect');
        StartedColorSelectButton.addEventListener('click', function (e) {
            style.LoadMenu('Start');
        }, false);

        var StopedColorSelectButton = document.getElementById('StopedColorSelect');
        StopedColorSelectButton.addEventListener('click', function (e) {
            style.LoadMenu('Stop');
        }, false);

        var resetMenuLocation = document.getElementById('caap_ResetMenuLocation');
        resetMenuLocation.addEventListener('click', function (e) {
            var div = document.getElementById("caap_div");
            div.style.cursor = '';
            div.style.position = '';
            div.removeEventListener('mousedown', Move.dragHandler, false);
            div.style.top = '100px';
            div.style.left = '940px';
            document.getElementById('unlockMenu').checked = false;
            $(":input[id^='caap_']").attr({disabled: false});
            gm.deleteValue('menuLeft', caapGlob.savedTarget.style.left);
            gm.deleteValue('menuTop',  caapGlob.savedTarget.style.top);
        }, false);

        var resetElite = document.getElementById('caap_resetElite');
        resetElite.addEventListener('click', function (e) {
            gm.setValue('AutoEliteGetList', 0);
        }, false);

        var caapRestart = document.getElementById('caapRestart');
        var caapPaused = document.getElementById('caapPaused');
        caapRestart.addEventListener('click', function (e) {
            var div = document.getElementById("caap_div");
            caapPaused.style.display = 'none';
            document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundLight', '#efe');
            document.getElementById("caap_div").style.background = div.style.opacity = gm.getValue('StyleOpacityLight', '1');
            gm.setValue('caapPause', 'none');
            if (caapGlob.is_chrome) {
                CE_message("paused", null, gm.getValue('caapPause', 'none'));
            }

            caap.SetControls(true);
            gm.setValue('ReleaseControl', true);
            gm.setValue('resetselectMonster', true);
            gm.setValue('resetmonsterEngage', true);
            gm.setValue('resetmonsterDamage', true);
            div.style.cursor = '';
            div.removeEventListener('mousedown', Move.dragHandler, false);
            document.getElementById('unlockMenu').checked = false;
            $(":input[id*='caap_']").attr({disabled: false});
    //      caap.ReloadOccasionally();
    //      caap.WaitMainLoop();
        }, false);

        controlDiv.addEventListener('mousedown', function (e) {
            var div = document.getElementById("caap_div");
            document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark', '#fee');
            document.getElementById("caap_div").style.opacity = div.style.transparency = gm.getValue('StyleOpacityDark', '1');
    //      nHtml.clearTimeouts();
            gm.setValue('caapPause', 'block');
            caapPaused.style.display = 'block';
            if (caapGlob.is_chrome) {
                CE_message("paused", null, gm.getValue('caapPause', 'block'));
            }
        }, false);

        if (caapGlob.is_chrome) {
            var caapPauseDiv = document.getElementById('caapPauseA');
            caapPauseDiv.addEventListener('click', function (e) {
                var div = document.getElementById("caap_div");
                document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark', '#fee');
                document.getElementById("caap_div").style.opacity = div.style.transparency = gm.getValue('StyleOpacityDark', '1');
    //          nHtml.clearTimeouts();
                gm.setValue('caapPause', 'block');
                caapPaused.style.display = 'block';
                if (caapGlob.is_chrome) {
                    CE_message("paused", null, gm.getValue('caapPause', 'block'));
                }
            }, false);
        }

        if (gm.getObjVal('AutoQuest', 'name')) {
            var stopA = document.getElementById('stopAutoQuest');
            stopA.addEventListener('click', function () {
                gm.setValue('AutoQuest', '');
                gm.setValue('WhyQuest', 'Manual');
                gm.log('Change: setting stopAutoQuest and go to Manual');
                caap.SetControls(true);
            }, false);
        }

        if (gm.getValue('WhenBattle') == 'Not Hiding' && gm.getValue('WhenMonster') != 'Not Hiding') {
            gm.setValue('WhenMonster', 'Not Hiding');
            this.SetControls(true);
        }

        var globalContainer = document.getElementById('app46755028429_globalContainer');
        if (!globalContainer) {
            gm.log('Global Container not found');
            return;
        }

        globalContainer.addEventListener('DOMNodeInserted', function (event) {
            var $target = $(event.target);

            /*
            if (event.type && event.type != undefined && event.target.id && event.target.id != undefined) {
                gm.log("Event type: " + event.type);
                gm.log("Event target id: " + event.target.id);
            }
            */

            if ($target.is("#app46755028429_app_body")) {
                nHtml.setTimeout(caap.checkMonsterDamage, 0);
                //gm.log("Listener did: checkMonsterDamage");
            }

            if ($target.is("#app46755028429_index") ||
               $target.is("#app46755028429_keep") ||
               $target.is("#app46755028429_generals") ||
               $target.is("#app46755028429_battle_monster") ||
               $target.is("#app46755028429_battle") ||
               $target.is("#app46755028429_battlerank") ||
               $target.is("#app46755028429_battle_train") ||
               $target.is("#app46755028429_quests") ||
               $target.is("#app46755028429_raid") ||
               $target.is("#app46755028429_symbolquests") ||
               $target.is("#app46755028429_alchemy") ||
               $target.is("#app46755028429_soldiers") ||
               $target.is("#app46755028429_item") ||
               $target.is("#app46755028429_land") ||
               $target.is("#app46755028429_magic") ||
               $target.is("#app46755028429_oracle") ||
               $target.is("#app46755028429_symbols") ||
               $target.is("#app46755028429_treasure_chest") ||
               $target.is("#app46755028429_gift") ||
               $target.is("#app46755028429_apprentice") ||
               $target.is("#app46755028429_news") ||
               $target.is("#app46755028429_friend_page") ||
               $target.is("#app46755028429_comments") ||
               $target.is("#app46755028429_army") ||
               $target.is("#app46755028429_army_reqs")) {
                nHtml.setTimeout(caap.addExpDisplay, 0);
                //gm.log("Listener did: addExpDisplay");
            }
        }, true);

        globalContainer.addEventListener('click', function (event) {
            var obj = event.target;
            while (obj && !obj.href) {
                obj = obj.parentNode;
            }

            if (obj && obj.href) {
                gm.setValue('clickUrl', obj.href);
            }
    //      gm.log('global container ' + caap.clickUrl);
        }, true);

    },

    /////////////////////////////////////////////////////////////////////
    //                      MONSTERS DASHBOARD
    // Display the current monsters and stats
    /////////////////////////////////////////////////////////////////////

    makeCommaValue: function (nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return x1;
    },

    makeTd: function (text, color) {
        if (gm.getObjVal(color, 'color')) {
            color = gm.getObjVal(color, 'color');
        }

        if (!color) {
            color = 'black';
        }

        return "<td><font size=1 color='" + color + "'>" + text + "</font></td>";
    },

    monsterDashboard: function () {
        if ($("#caap_infoMonster") && !this.oneMinuteUpdate('dashboard')) {
            return;
        }

        // if not on an individual monster page, delete any monsters without the page info from Engage
        if (!caap.CheckForImage('dragon_title_owner.jpg')) {
            gm.getList('monsterOl').forEach(function (monsterObj) {
                if (monsterObj.indexOf(caapGlob.vs + 'page' + caapGlob.ls) < 0) {
                    gm.deleteListObj('monsterOl', monsterObj.split(caapGlob.vs)[0]);
                }
            });
        }

        caap.selectMonster();
    /*-------------------------------------------------------------------------------------\
     Here is where we construct the HTML for our dashboard. We start by building the outer
     container and position it within the main container.
    \-------------------------------------------------------------------------------------*/
        var layout = "<div id='caap_top' style='position:absolute;top:" + (document.getElementById('app46755028429_main_bn_container').offsetTop - 11) + "px;left:0px;'>";
    /*-------------------------------------------------------------------------------------\
     Next we put in our Refresh Monster List button which will only show when we have
     selected the Monster display.
    \-------------------------------------------------------------------------------------*/
        layout += "<div id='caap_buttonMonster' style='position:absolute;top:0px;left:250px;display:" + (gm.getValue('DBDisplay', 'Monster') == 'Monster' ? 'block' : 'none') + "'> <input type='button' id='caap_refreshMonsters' value='Refresh Monster List' style='font-size: 10px; width:50; height:50'></div>";
    /*-------------------------------------------------------------------------------------\
     Next we put in the Clear Target List button which will only show when we have
     selected the Target List display
    \-------------------------------------------------------------------------------------*/
        layout += "<div id='caap_buttonTargets' style='position:absolute;top:0px;left:250px;display:" + (gm.getValue('DBDisplay', 'Monster') == 'Target List' ? 'block' : 'none') + "'> <input type='button' id='caap_clearTargets' value='Clear Targets List' style='font-size: 10px; width:50; height:50'></div>";
    /*-------------------------------------------------------------------------------------\
     Then we put in the Live Feed link since we overlay the Castle Age link.
    \-------------------------------------------------------------------------------------*/
        if (caapGlob.is_chrome) {
            layout += "<div style='font-size: 9px'<a href='http://apps.facebook.com/?filter=app_46755028429&show_hidden=true&ignore_self=true&sk=lf'><b>LIVE FEED!</b> Your friends are calling.</a></div>";
        } else {
            layout += "<div style='font-size: 9px'<a href='http://www.facebook.com/?filter=app_46755028429&show_hidden=true&ignore_self=true&sk=lf'><b>LIVE FEED!</b> Your friends are calling.</a></div>";
        }
    /*-------------------------------------------------------------------------------------\
     We install the display selection box that allows the user to toggle through the
     available displays.
    \-------------------------------------------------------------------------------------*/
        var displayList = ['Monster', 'Target List'];
        layout += "<div style='font-size: 10px;position:absolute;top:0px;right:0px;'>Display: " + this.DBDropDown('DBDisplay', displayList, '', "style='font-size: 9px min-width: 120px; max-width: 120px; width : 120px;'") + "</div>";
    /*-------------------------------------------------------------------------------------\
    And here we build our empty content divs.  We display the appropriate div
    depending on which display was selected using the control above
    \-------------------------------------------------------------------------------------*/
        layout += "<div id='caap_infoMonster' style='width:610px;height:175px;overflow:auto;display:" + (gm.getValue('DBDisplay', 'Monster') == 'Monster' ? 'block' : 'none') + "'></div>";
        layout += "<div id='caap_infoTargets1' style='width:610px;height:175px;overflow:auto;display:" + (gm.getValue('DBDisplay', 'Monster') == 'Target List' ? 'block' : 'none') + "'></div>";
        layout += "<div id='caap_infoTargets2' style='width:610px;height:175px;overflow:auto;display:" + (gm.getValue('DBDisplay', 'Monster') == 'Target Stats' ? 'block' : 'none') + "'></div>";
        layout += "</div>";
    /*-------------------------------------------------------------------------------------\
     No we apply our CSS to our container
    \-------------------------------------------------------------------------------------*/
        if (!$("#caap_top").length) {
            $(layout).css({
                background: gm.getValue("StyleBackgroundLight", "white"),
    //          background : "url('http://image2.castleagegame.com/1357/graphics/bg_jobs_tile.jpg')",
                padding: "5px",
                width: " 610px",
                margin: "0 auto",
                opacity: "1"
            }).insertBefore("#app46755028429_globalContainer");
        }

        var html = "<table width=570 cellpadding=0 cellspacing=0 ><tr>";
        var displayItemList = ['Name', 'Damage', 'Damage%', 'Fort%', 'TimeLeft', 'T2K', 'Phase', 'Link'];
        for (var p in displayItemList) {
            if (displayItemList.hasOwnProperty(p)) {
                html += "<td><b><font size=1>" + displayItemList[p] + '</font></b></td>';
            }
        }

        html += '</tr>';
        displayItemList.shift();
        var monsterList = gm.getList('monsterOl');
        monsterList.forEach(function (monsterObj) {
            var monster = monsterObj.split(caapGlob.vs)[0];
            var color = '';
            html += "<tr>";
            if (monster == gm.getValue('targetFromraid') || monster == gm.getValue('targetFrombattle_monster')) {
                color = 'green';
            } else if (monster == gm.getValue('targetFromfortify')) {
                color = 'blue';
            } else {
                color = gm.getObjVal(monsterObj, 'color', 'black');
            }

            html += caap.makeTd(monster, color);
            displayItemList.forEach(function (displayItem) {
    //          gm.log(' displayItem '+ displayItem + ' value '+ gm.getObjVal(monster,displayItem));
                if (displayItem == 'Phase' && color == 'grey') {
                    html += caap.makeTd(gm.getObjVal(monsterObj, 'status'), color);
                } else {
                    var value = gm.getObjVal(monsterObj, displayItem);
                    if (value) {
                        if (parseInt(value, 10).toString() == value) {
                            value = caap.makeCommaValue(value);
                        }
                        html += caap.makeTd(value + (displayItem.match(/%/) ? '%' : ''), color);
                    } else {
                        html += '<td></td>';
                    }
                }
            });
            html += '</tr>';
        });
        html += '</table>';
        $("#caap_infoMonster").html(html);

    /*-------------------------------------------------------------------------------------\
    Next we build the HTML to be included into the 'caap_infoTargets1' div. We set our
    table and then build the header row.
    \-------------------------------------------------------------------------------------*/
        html = "<table width=570 cellpadding=0 cellspacing=0 ><tr>";
        var headers = ['UserId', 'Name', 'Deity#', 'Rank', 'Rank#', 'Level', 'Army', 'Last Alive'];
        var values = ['nameStr', 'deityNum', 'rankStr', 'rankNum', 'levelNum', 'armyNum', 'aliveTime'];
        for (var pp in headers) {
            if (headers.hasOwnProperty(pp)) {
                html += "<td><b><font size=1>" + headers[pp] + '</font></b></td>';
            }
        }
    /*-------------------------------------------------------------------------------------\
    This div will hold data drom the targetsOl repository.  We step through the entries
    in targetOl and build each table row.  Our userid is 'key' so it's the first parameter
    \-------------------------------------------------------------------------------------*/
        var targetList = gm.getList('targetsOl');
        for (var i in targetList) {
            if (targetList.hasOwnProperty(i)) {
                var targetObj = targetList[i];
                var userid = targetObj.split(caapGlob.vs)[0];
                html += "<tr>";
                var link = "<a href='http://apps.facebook.com/castle_age/keep.php?user=" + userid + "'>" + userid + "</a>";
                html += caap.makeTd(link, 'blue');
    /*-------------------------------------------------------------------------------------\
    We step through each of the additional values we include in the table. If a value is
    null then we build an empty td
    \-------------------------------------------------------------------------------------*/
                for (var j in values) {
                    if (values.hasOwnProperty(j)) {
                        var value = gm.getObjVal(targetObj, values[j]);
                        if (!value) {
                            html += '<td></td>';
                            continue;
                        }
    /*-------------------------------------------------------------------------------------\
    We format the values based on the names. Names ending with Num are numbers, ending in
    Time are date/time counts, and Str are strings. We then end the row, and finally when
    all done end the table.  We then add the HTML to the div.
    \-------------------------------------------------------------------------------------*/
                        if (/.+Num/.test(values[j])) {
                            value = caap.makeCommaValue(value);
                        }

                        if (/.+Time/.test(values[j])) {
                            var newTime = new Date(parseInt(value, 10));
                            value = (newTime.getMonth() + 1) + '/' + newTime.getDate() + ' ' + newTime.getHours() + ':' + (newTime.getMinutes() < 10 ? '0' : '') + newTime.getMinutes();
                        }

                        html += caap.makeTd(value, 'black');
                    }
                }
                html += '</tr>';
            }
        }

        html += '</table>';
        $("#caap_infoTargets1").html(html);
    /*-------------------------------------------------------------------------------------\
    We add our listener for the Display Select control.
    \-------------------------------------------------------------------------------------*/
        caap.AddDBListener();
    },

    /*-------------------------------------------------------------------------------------\
    AddDBListener creates the listener for our dashboard controls.
    \-------------------------------------------------------------------------------------*/
    AddDBListener: function () {
        var selectDiv = document.getElementById('caap_DBDisplay');
        if (!selectDiv) {
            this.ReloadCastleAge();
        }

        selectDiv.addEventListener('change', function (e) {
            var value = e.target.options[e.target.selectedIndex].value;
            gm.setValue('DBDisplay', value);
            switch (value) {
            case "Target List" :
                caap.SetDisplay('infoMonster', false);
                caap.SetDisplay('infoTargets1', true);
                caap.SetDisplay('infoTargets2', false);
                caap.SetDisplay('buttonMonster', false);
                caap.SetDisplay('buttonTargets', true);
                break;
            case "Target Stats" :
                caap.SetDisplay('infoMonster', false);
                caap.SetDisplay('infoTargets1', false);
                caap.SetDisplay('infoTargets2', true);
                caap.SetDisplay('buttonMonster', false);
                caap.SetDisplay('buttonTargets', true);
                break;
            default :
                caap.SetDisplay('infoMonster', true);
                caap.SetDisplay('infoTargets1', false);
                caap.SetDisplay('infoTargets2', false);
                caap.SetDisplay('buttonMonster', true);
                caap.SetDisplay('buttonTargets', false);
                break;
            }

            gm.setValue('resetdashboard', true);
        }, false);

        var refreshMonsters = document.getElementById('caap_refreshMonsters');
        refreshMonsters.addEventListener('click', function (e) {
            gm.setValue('monsterReview', 0);
            gm.setValue('monsterReviewCounter', -3);
        }, false);

        var clearTargets = document.getElementById('caap_clearTargets');
        clearTargets.addEventListener('click', function (e) {
            gm.setValue('targetsOl', '');
            gm.setValue('resetdashboard', true);
        }, false);
    },

    /*-------------------------------------------------------------------------------------\
    DBDropDown is used to make our drop down boxes for dash board controls.  These require
    slightly different HTML from the side controls.
    \-------------------------------------------------------------------------------------*/
    DBDropDown: function (idName, dropDownList, instructions, formatParms) {
        var selectedItem = gm.getValue(idName, 'defaultValue');
        if (selectedItem == 'defaultValue') {
            selectedItem = gm.setValue(idName, dropDownList[0]);
        }

        var htmlCode = " <select id='caap_" + idName + "' " + formatParms + "'><option>" + selectedItem;
        for (var item in dropDownList) {
            if (dropDownList.hasOwnProperty(item)) {
                if (selectedItem != dropDownList[item]) {
                    if (instructions) {
                        htmlCode += "<option value='" + dropDownList[item] + "' " + ((instructions[item]) ? " title='" + instructions[item] + "'" : '') + ">"  + dropDownList[item];
                    } else {
                        htmlCode += "<option value='" + dropDownList[item] + "'>" + dropDownList[item];
                    }
                }
            }
        }

        htmlCode += '</select>';
        return htmlCode;
    },

    shortenURL: function (long_url, callback) {
    // Called too frequently, the delay can cause the screen to flicker, so disabled by returning for now:
        callback(long_url);
        return;
    /*
        GM_xmlhttpRequest({
            method : 'GET',
            url    : 'http://api.bit.ly/shorten?version=2.0.1&longUrl=' + encodeURIComponent(long_url) + '&login=castleage&apiKey=R_438eea4a725a25d92661bce54b17bee1&format=json&history=1',
            onload : function (response) {
                var result = eval("("+response.responseText+")");
                callback(result.results ? result.results[long_url].shortUrl : long_url);
            }
        });
    */
    },

    addExpDisplay: function () {
        if (/\(/.test($("#app46755028429_st_2_5 strong").text())) {
            return false;
        }

        var arrExp = $("#app46755028429_st_2_5 strong").text().split("/");
        $("#app46755028429_st_2_5 strong").append(" (<span style='color:red'>" + (arrExp[1] - arrExp[0]) + "</span>)");
    },

    /////////////////////////////////////////////////////////////////////
    //                          EVENT LISTENERS
    // Watch for changes and update the controls
    /////////////////////////////////////////////////////////////////////

    SetDisplay: function (idName, setting) {
        var div = document.getElementById('caap_' + idName);
        if (!div) {
            gm.log('Unable to find div: ' + idName);
            return;
        }

        if (setting === true) {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    },


    AddListeners: function (topDivName) {
        var div = document.getElementById(topDivName);
        if (!div) {
            return false;
        }

        var s = 0;
        var ss = document.evaluate("//input[contains(@id,'caap_')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (ss.snapshotLength <= 0) {
            gm.log('no inputs');
        }

        for (s = 0; s < ss.snapshotLength; s++) {
            var inputDiv = ss.snapshotItem(s);
            if (inputDiv.type == 'checkbox') {
                inputDiv.addEventListener('change', function (e) {
                    var idName = e.target.id.replace(/caap_/i, '');
                    var value = e.target.value;
                    gm.setValue(idName, e.target.checked);
                    if (e.target.className) {
                        caap.SetDisplay(e.target.className, e.target.checked);
                    } else if (idName == 'AutoStatAdv') {
                        if (value) {
                            caap.SetDisplay('Status_Normal', false);
                            caap.SetDisplay('Status_Adv', true);
                            for (var n = 1; n <= 5; n++) {
                                gm.setValue('AttrValue' + n, '');
                            }
                        } else {
                            caap.SetDisplay('Status_Normal', true);
                            caap.SetDisplay('Status_Adv', false);
                        }
                        caap.SetControls(true);
                    }
                }, false);
            } else if (inputDiv.type == 'text') {
                var idName = inputDiv.id.replace(/caap_/i, '');
                inputDiv.value = gm.getValue(idName, '').toString();
                inputDiv.addEventListener('change', function (e) {
                    var idName = e.target.id.replace(/caap_/i, '');
                    if (/Style.*/.test(idName)) {
                        gm.setValue("StyleBackgroundLight", "#" + gm.getValue("StyleColorStarted", "FFF"));
                        gm.setValue("StyleOpacityLight", gm.getValue("StyleTransparencyStarted", "1"));
                        gm.setValue("StyleBackgroundDark", "#" + gm.getValue("StyleColorStoped", "FFF"));
                        gm.setValue("StyleOpacityDark", gm.getValue("StyleTransparencyStoped", "1"));
                    }
                    gm.setValue(idName, e.target.value);
                }, false);
            }
        }

        ss = document.evaluate("//select[contains(@id,'caap_')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (ss.snapshotLength <= 0) {
            gm.log('no selects');
        }

        for (s = 0; s < ss.snapshotLength; s++) {
            var selectDiv = ss.snapshotItem(s);
            selectDiv.addEventListener('change', function (e) {
                if (e.target.selectedIndex > 0) {
                    var idName = e.target.id.replace(/caap_/i, '');
                    var value = e.target.options[e.target.selectedIndex].value;
                    gm.log('Change: setting ' + idName + ' to ' + value);
                    gm.setValue(idName, value);
                    e.target.options[0].value = value;
                    if (idName == 'WhenQuest' || idName == 'WhenBattle' || idName == 'WhenMonster') {
                        caap.SetDisplay(idName + 'Hide', (value != 'Never'));
                    } else if (idName == 'QuestArea' || idName == 'QuestSubArea' || idName == 'WhyQuest') {
                        gm.setValue('AutoQuest', '');
                    } else if (idName == 'IdleGeneral') {
                        gm.setValue('MaxIdleEnergy', 0);
                        gm.setValue('MaxIdleStamina', 0);
                    } else if (idName == 'TargetType') {
                        switch (value) {
                        case "Freshmeat" :
                            caap.SetDisplay('FreshmeatSub', true);
                            caap.SetDisplay('UserIdsSub', false);
                            break;
                        case "Userid List" :
                            caap.SetDisplay('FreshmeatSub', false);
                            caap.SetDisplay('UserIdsSub', true);
                            break;
                        default :
                            caap.SetDisplay('FreshmeatSub', true);
                            caap.SetDisplay('UserIdsSub', false);
                            break;
                        }
                    } else if (/Attribute./.test(idName)) {
                        gm.setValue("SkillPointsNeed", 1);
                    } else if (idName == 'DisplayStyle') {
                        switch (value) {
                        case "CA Skin" :
                            gm.setValue("StyleBackgroundLight", "#E0C691");
                            gm.setValue("StyleBackgroundDark", "#B09060");
                            gm.setValue("StyleOpacityLight", "1");
                            gm.setValue("StyleOpacityDark", "1");
                            if (nHtml.FindByAttr(document.body, 'div', 'id', 'caap_top')) {
                                nHtml.FindByAttr(document.body, 'div', 'id', 'caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight", "white");
                            }
                            break;
                        case "None" :
                            gm.setValue("StyleBackgroundLight", "white");
                            gm.setValue("StyleBackgroundDark", "");
                            gm.setValue("StyleOpacityLight", "1");
                            gm.setValue("StyleOpacityDark", "1");
                            if (nHtml.FindByAttr(document.body, 'div', 'id', 'caap_top')) {
                                nHtml.FindByAttr(document.body, 'div', 'id', 'caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight", "white");
                            }
                            break;
                        case "Custom" :
                            gm.setValue("StyleBackgroundLight", "#" + gm.getValue("StyleColorStarted", "FFF"));
                            gm.setValue("StyleOpacityLight", gm.getValue("StyleTransparencyStarted", "1"));
                            gm.setValue("StyleBackgroundDark", "#" + gm.getValue("StyleColorStoped", "FFF"));
                            gm.setValue("StyleOpacityDark", gm.getValue("StyleTransparencyStoped", "1"));
                            if (nHtml.FindByAttr(document.body, 'div', 'id', 'caap_top')) {
                                nHtml.FindByAttr(document.body, 'div', 'id', 'caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight", "white");
                            }
                            break;
                        default :
                            gm.setValue("StyleBackgroundLight", "#efe");
                            gm.setValue("StyleBackgroundDark", "#fee");
                            gm.setValue("StyleOpacityLight", "1");
                            gm.setValue("StyleOpacityDark", "1");
                            if (nHtml.FindByAttr(document.body, 'div', 'id', 'caap_top')) {
                                nHtml.FindByAttr(document.body, 'div', 'id', 'caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight", "white");
                            }
                            break;
                        }
                    }
                }
                caap.SetControls(true);
            }, false);
        }

        ss = document.evaluate("//textarea[contains(@id,'caap_')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //  if (ss.snapshotLength<=0) gm.log('no textareas');
        for (s = 0; s < ss.snapshotLength; s++) {
            var textareaDiv = ss.snapshotItem(s);
            textareaDiv.addEventListener('change', function (e) {
                var idName = e.target.id.replace(/caap_/i, '');
                gm.log('Change: setting ' + idName + ' to something new');
                if (idName == 'orderbattle_monster' || idName == 'orderraid') {
                    gm.setValue('monsterReview', 0);
                    gm.setValue('monsterReviewCounter', -3);
                }
                caap.SaveBoxText(idName);
            }, false);
        }

        ss = document.evaluate("//a[contains(@id,'caap_Switch_')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (s = 0; s < ss.snapshotLength; s++) {
            var switchDiv = ss.snapshotItem(s);
            switchDiv.addEventListener('click', function (e) {
                var subId = e.target.id.replace(/_Switch/i, '');
                var subDiv = document.getElementById(subId);
                if (subDiv.style.display == "block") {
                    subDiv.style.display = "none";
                    e.target.innerHTML = e.target.innerHTML.replace(/-/, '+');
                    gm.setValue('Control_' + subId.replace(/caap_/i, ''), "none");
                } else {
                    subDiv.style.display = "block";
                    e.target.innerHTML = e.target.innerHTML.replace(/\+/, '-');
                    gm.setValue('Control_' + subId.replace(/caap_/i, ''), "block");
                }
            }, false);
        }
    },

    /////////////////////////////////////////////////////////////////////
    //                          GET STATS
    // Functions that records all of base game stats, energy, stamina, etc.
    /////////////////////////////////////////////////////////////////////

    GetStatusNumbers: function (node) {
        var txt = nHtml.GetText(node);
        var staminam = this.statusRe.exec(txt);
        if (staminam) {
            return {'num': parseInt(staminam[1], 10), 'max': parseInt(staminam[2], 10)};
        } else {
            gm.log('Cannot find status:' + txt);
        }

        return null;
    },

    GetStats: function () {
        try {
            this.stats = {};
            if (!caapGlob.is_firefox) {
                if (document.getElementById('app46755028429_healForm')) {
                    // Facebook ID
                    var webSlice = nHtml.FindByAttrContains(document.body, "a", "href", "party.php");
                    if (webSlice) {
                        var fbidm = this.userRe.exec(webSlice.getAttribute('href'));
                        if (fbidm) {
                            var txtFBID = fbidm[2];
                            gm.setValue('FBID', txtFBID);
                        }
                    }
                }
            }

            // rank
            var attrDiv = nHtml.FindByAttrContains(document.body, "div", "class", 'keep_stat_title');
            if (attrDiv) {
                var txtRank = nHtml.GetText(attrDiv);
                var rankm = this.rankRe.exec(txtRank);
                if (rankm) {
                    var rank = this.rankTable[rankm[1].toString().toLowerCase().trim()];
                    if (rank !== undefined) {
                        this.stats.rank = rank;
                        gm.setValue('MyRank', this.stats.rank);
                        this.JustDidIt('MyRankLast');
                    } else {
                        gm.log("Unknown rank " + rank + ':' + rankm[1].toString());
                    }
                }
                var userName = txtRank.match(/"(.+)"/);
                gm.setValue('PlayerName', userName[1]);
            }

            // health
            var health = nHtml.FindByAttrContains(document.body, "span", "id", '_current_health');
            var healthMess = '';
            if (!health) {
                health = nHtml.FindByAttrXPath(document.body, 'span', "contains(@id,'_health') and not(contains(@id,'health_time'))");
            }

            this.stats.health = this.GetStatusNumbers(health.parentNode);
            if (this.stats.health) {
                healthMess = "Health: " + this.stats.health.num;
            }

            // stamina
            this.stats.stamina = null;
            var stamina = nHtml.FindByAttrContains(document.body, "span", "id", '_current_stamina');
            var staminaMess = '';
            if (!stamina) {
                stamina = nHtml.FindByAttrXPath(document.body, 'span', "contains(@id,'_stamina') and not(contains(@id,'stamina_time'))");
            }

            this.stats.stamina = this.GetStatusNumbers(stamina.parentNode);
            if (this.stats.stamina) {
                staminaMess = "Stamina: " + this.stats.stamina.num;
                if ((gm.getValue('IdleGeneral', '').indexOf(this.GetCurrentGeneral()) >= 0) ||
                    (gm.getValue('IdleGeneral', '').match(/use current/i))) {
                    gm.setValue('MaxIdleStamina', this.stats.stamina.max);
                }
            }

            // energy
            var energyMess = '';
            var energy = nHtml.FindByAttrContains(document.body, "span", "id", '_current_energy');
            if (!energy) {
                energy = nHtml.FindByAttrXPath(document.body, 'span', "contains(@id,'_energy') and not(contains(@id,'energy_time'))");
            }

            this.stats.energy = this.GetStatusNumbers(energy.parentNode);
            if (this.stats.energy !== null) {
                energyMess = "Energy: " + this.stats.energy.num;
                //if current general == idle general
                if ((gm.getValue('IdleGeneral', '').indexOf(this.GetCurrentGeneral()) >= 0) ||
                    (gm.getValue('IdleGeneral', '').match(/use current/i)) ||
                    (gm.getValue('IdleGeneral', '').match(/under level 4/i))) {
                    gm.setValue('MaxIdleEnergy', this.stats.energy.max);
                }
            }

            // level
            var level = nHtml.FindByAttrContains(document.body, "div", "title", 'experience points');
            var levelMess = '';
            var txtlevel = nHtml.GetText(level);
            var levelm = this.levelRe.exec(txtlevel);
            if (levelm) {
                this.stats.level = parseInt(levelm[1], 10);
                levelMess = "Level: " + this.stats.level;
                if (gm.getValue('Level', 0) != this.stats.level) {
                    gm.deleteValue('BestPropCost');
                }

                gm.setValue('Level', this.stats.level);
            } else {
                gm.log('Could not find level re');
            }

            this.stats.rank = parseInt(gm.getValue('MyRank'), 10);

            // army
            var td = nHtml.FindByAttrContains(document.body, "div", "id", "main_bntp");
            var a = nHtml.FindByAttrContains(td, "a", "href", "army");
            var txtArmy = nHtml.GetText(a);
            var armym = this.armyRe.exec(txtArmy);
            if (armym) {
                var army = parseInt(armym[1], 10);
                army = Math.min(army, 501);
                this.stats.army = army;
                var armyMess = "Army: " + this.stats.army;
            } else {
                gm.log("Can't find armyRe in " + txtArmy);
            }

            // gold
            var cashObj = nHtml.FindByAttrXPath(document.body, "strong", "contains(string(),'$')");
            var cashTxt = nHtml.GetText(cashObj);
            var cash = this.NumberOnly(cashTxt);
            this.stats.cash = cash;

            // experience
            var exp = nHtml.FindByAttrContains(document.body, 'div', 'id', 'st_2_5');
            this.stats.exp = this.GetStatusNumbers(exp);

            // time to next level
            if (this.stats.exp) {
                var expPerStamina = 2.3;
                var expPerEnergy = parseFloat(gm.getObjVal('AutoQuest', 'expRatio')) || 1.2;
                var minutesToLevel = (this.stats.exp.max - this.stats.exp.num - this.stats.stamina.num * expPerStamina - this.stats.energy.num * expPerEnergy) / (expPerStamina + expPerEnergy) / 12 * 60;
                this.stats.levelTime = new Date();
                var minutes = this.stats.levelTime.getMinutes();
                minutes += minutesToLevel;
                this.stats.levelTime.setMinutes(minutes);
                this.SetDivContent('level_mess', 'Expected next level: ' + this.FormatTime(this.stats.levelTime));
            }

            if (this.DisplayTimer('DemiPointTimer')) {
                if (this.CheckTimer('DemiPointTimer')) {
                    this.SetDivContent('demipoint_mess', 'Battle demipoints cleared');
                } else {
                    this.SetDivContent('demipoint_mess', 'Next Battle DemiPts: ' + this.DisplayTimer('DemiPointTimer'));
                }
            }

            if (this.DisplayTimer('BlessingTimer')) {
                if (this.CheckTimer('BlessingTimer')) {
                    this.SetDivContent('demibless_mess', 'Demi Blessing = none');
                } else {
                    this.SetDivContent('demibless_mess', 'Next Demi Blessing: ' + this.DisplayTimer('BlessingTimer'));
                }
            }

            // time to next paycheck
            var paytime = nHtml.FindByAttrContains(document.body, "span", "id", '_gold_time_value');
            if (paytime) {
                this.stats.paytime = nHtml.GetText(paytime).trim();
                this.stats.payminute = this.stats.paytime.substr(0, this.stats.paytime.indexOf(':'));
            }

            // return true if probably working
            return cashObj && (health !== null);
        } catch (e) {
            gm.log("ERROR GetStats: " + e);
            return false;
        }
    },

    /////////////////////////////////////////////////////////////////////
    //                          CHECK RESULTS
    // Called each iteration of main loop, this does passive checks for
    // results to update other functions.
    /////////////////////////////////////////////////////////////////////

    SetCheckResultsFunction: function (resultsFunction) {
        this.JustDidIt('SetResultsFunctionTimer');
        gm.setValue('ResultsFunction', resultsFunction);
    },

    pageSpecificCheckFunctions: {'battle_monster': 'checkMonsterEngage', 'raid': 'checkMonsterEngage'},

    CheckResults: function () {
        // Check for new gifts
        if (!gm.getValue('HaveGift')) {
            if (nHtml.FindByAttrContains(document.body, 'a', 'href', 'reqs.php#confirm_')) {
                gm.log('We have a gift waiting!');
                gm.setValue('HaveGift', true);
            } else {
                var beepDiv = nHtml.FindByAttrContains(document.body, 'div', 'class', 'UIBeep_Title');
                if (beepDiv) {
                    var beepText = nHtml.GetText(beepDiv).trim();
                    if (beepText.match(/sent you a gift/) && !beepText.match(/notification/)) {
                        gm.log('We have a gift waiting');
                        gm.setValue('HaveGift', true);
                    }
                }
            }
        }

        if (this.stats.level < 10) {
            this.battlePage = 'battle_train,battle_off';
        } else {
            this.battlePage = 'battle';
        }

        //Check for Elite Guard Add image
        if (this.CheckForImage('elite_guard_add')) {
            if (gm.getValue('AutoEliteEnd', 'NoArmy') != 'NoArmy') {
                gm.setValue('AutoEliteGetList', 0);
            }
        }

        // Check for Gold Stored
        if (nHtml.FindByAttrContains(document.body, "div", "class", 'keep_main_section')) {
            var goldStored = nHtml.FindByAttrContains(document.body, "b", "class", 'money').firstChild.data.replace(/[^0-9]/g, '');
            gm.setValue('inStore', goldStored);
        }

        var resultsDiv = nHtml.FindByAttrContains(document.body, 'span', 'class', 'result_body');
        var resultsText = '';
        if (resultsDiv) {
            resultsText = nHtml.GetText(resultsDiv).trim();
        }

        // If set and still recent, go to the function specified in 'ResultsFunction'
        var resultsFunction = gm.getValue('ResultsFunction', '');
        if ((resultsFunction) && !caap.WhileSinceDidIt('SetResultsFunctionTimer', 20)) {
            caap[resultsFunction](resultsText);
        }

        // Check page to see if we should go to a page specific check function
        // todo find a way to verify if a function exists, and replace the array with a check_functionName exists check
        var page = gm.getValue('clickUrl');
        if (!page) {
            return;
        }

        gm.log('Clicked page is ' + page);
        if (page.match(/\/[^\/]+.php/i)) {
            page = page.match(/\/[^\/]+.php/i)[0].replace('/', '').replace('.php', '');
        }

        if (this.pageSpecificCheckFunctions[page]) {
            this[this.pageSpecificCheckFunctions[page]]();
        }

        gm.setValue('clickUrl', '');
    },

    /////////////////////////////////////////////////////////////////////
    //                          QUESTING
    // Quest function does action, DrawQuest sets up the page and gathers info
    /////////////////////////////////////////////////////////////////////

    MaxEnergyQuest: function () {
        if (!gm.getValue('MaxIdleEnergy', 0)) {
            gm.log("Changing to idle general to get Max energy");
            return this.PassiveGeneral();
        }

        if (this.stats.energy.num >= gm.getValue('MaxIdleEnergy')) {
            return this.Quests();
        }

        return false;
    },

    baseQuestTable : { 'Land of Fire': 'land_fire', 'Land of Earth': 'land_earth', 'Land of Mist': 'land_mist', 'Land of Water': 'land_water', 'Demon Realm': 'land_demon_realm', 'Undead Realm': 'land_undead_realm', 'Underworld': 'tab_underworld'},

    demiQuestTable : { 'Ambrosia': 'energy', 'Malekus': 'attack', 'Corvintheus': 'defense', 'Aurora': 'health', 'Azeron': 'stamina'},

    Quests: function () {
        if (gm.getValue('storeRetrieve', '') !== '') {
            if (gm.getValue('storeRetrieve') == 'general') {
                if (this.SelectGeneral('BuyGeneral')) {
                    return true;
                }

                gm.setValue('storeRetrieve', '');
                return true;
            } else {
                return this.RetrieveFromBank(gm.getValue('storeRetrieve', ''));
            }
        }

        this.SetDivContent('quest_mess', '');
        if (gm.getValue('WhenQuest', '') == 'Never') {
            this.SetDivContent('quest_mess', 'Questing off');
            return false;
        }

        if (gm.getValue('WhenQuest', '') == 'Not Fortifying') {
            var maxHealthtoQuest = this.GetNumber('MaxHealthtoQuest');
            if (!maxHealthtoQuest) {
                this.SetDivContent('quest_mess', '<b>No valid over fortify %</b>');
                return false;
            }

            var fortMon = gm.getValue('targetFromfortify');
            if (fortMon) {
                this.SetDivContent('quest_mess', 'No questing until attack target ' + fortMon + " health exceeds " + this.GetNumber('MaxToFortify') + '%');
                return false;
            }

            var targetFrombattle_monster = gm.getValue('targetFrombattle_monster');
            if (!targetFrombattle_monster) {
                var targetFort = gm.getListObjVal('monsterOl', targetFrombattle_monster, 'ShipHealth');
                if (!targetFort) {
                    if (targetFort < maxHealthtoQuest) {
                        this.SetDivContent('quest_mess', 'No questing until fortify target ' + targetFrombattle_monster + ' health exceeds ' + maxHealthtoQuest + '%');
                        return false;
                    }
                }
            }
        }

        if (!gm.getObjVal('AutoQuest', 'name')) {
            if (gm.getValue('WhyQuest', '') == 'Manual') {
                this.SetDivContent('quest_mess', 'Pick quest manually.');
                return false;
            }

            this.SetDivContent('quest_mess', 'Searching for quest.');
        } else {
            if (!this.IsEnoughEnergyForAutoQuest()) {
                return false;
            }
        }

        if (gm.getObjVal('AutoQuest', 'general') == 'none' || gm.getValue('ForceSubGeneral')) {
            if (this.SelectGeneral('SubQuestGeneral')) {
                return true;
            }
        }

        switch (gm.getValue('QuestArea', 'Quest')) {
        case 'Quest' :
            var subQArea = gm.getValue('QuestSubArea', 'Land of Fire');
            var landPic = this.baseQuestTable[subQArea];
            if (landPic == 'tab_underworld') {
                if (this.NavigateTo('quests,jobs_tab_more.gif,' + landPic + '_small.gif', landPic + '_big')) {
                    return true;
                }
            } else if ((landPic == 'land_demon_realm') || (landPic == 'land_undead_realm')) {
                if (this.NavigateTo('quests,jobs_tab_more.gif,' + landPic + '.gif', landPic + '_sel')) {
                    return true;
                }
            } else {
                if (this.NavigateTo('quests,jobs_tab_back.gif,' + landPic + '.gif', landPic + '_sel')) {
                    return true;
                }
            }

            break;
        case 'Demi Quests' :
            if (this.NavigateTo('quests,symbolquests', 'demi_quest_on.gif')) {
                return true;
            }

            var subDQArea = gm.getValue('QuestSubArea', 'Ambrosia');
            var picSlice = nHtml.FindByAttrContains(document.body, 'img', 'src', 'deity_' + this.demiQuestTable[subDQArea]);
            if (picSlice.style.height != '160px') {
                return this.NavigateTo('deity_' + this.demiQuestTable[subDQArea]);
            }

            break;
        case 'Atlantis' :
            if (!this.CheckForImage('tab_atlantis_on.gif')) {
                return this.NavigateTo('quests,monster_quests');
            }

            break;
        default :
            break;
        }

        var button = this.CheckForImage('quick_switch_button.gif');
        if (button && !gm.getValue('ForceSubGeneral', false)) {
            gm.log('Clicking on quick switch general button.');
            this.Click(button);
            return true;
        }

        var costToBuy = '';
        //Buy quest requires popup
        var itemBuyPopUp = nHtml.FindByAttrContains(document.body, "form", "id", 'itemBuy');
        if (itemBuyPopUp) {
            gm.setValue('storeRetrieve', 'general');
            if (this.SelectGeneral('BuyGeneral')) {
                return true;
            }

            gm.setValue('storeRetrieve', '');
            costToBuy = itemBuyPopUp.textContent.replace(/.*\$/, '').replace(/[^0-9]{3,}.*/, '');
            gm.log("costToBuy = " + costToBuy);
            if (this.stats.cash < costToBuy) {
                //Retrieving from Bank
                if (this.stats.cash + (gm.getValue('inStore') - this.GetNumber('minInStore')) >= costToBuy) {
                    gm.log("Trying to retrieve: " + (costToBuy - this.stats.cash));
                    gm.setValue("storeRetrieve", costToBuy - this.stats.cash);
                    return this.RetrieveFromBank(costToBuy - this.stats.cash);
                } else {
                    gm.setValue('AutoQuest', '');
                    gm.setValue('WhyQuest', 'Manual');
                    gm.log("Cant buy requires, stopping quest");
                    caap.SetControls(true);
                    return false;
                }
            }

            button = this.CheckForImage('quick_buy_button.jpg');
            if (button) {
                gm.log('Clicking on quick buy button.');
                this.Click(button);
                return true;
            }

            gm.log("Cant find buy button");
            return false;
        }

        button = this.CheckForImage('quick_buy_button.jpg');
        if (button) {
            gm.setValue('storeRetrieve', 'general');
            if (this.SelectGeneral('BuyGeneral')) {
                return true;
            }

            gm.setValue('storeRetrieve', '');
            costToBuy = button.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.data.replace(/[^0-9]/g, '');
            gm.log("costToBuy = " + costToBuy);
            if (this.stats.cash < costToBuy) {
                //Retrieving from Bank
                if (this.stats.cash + (gm.getValue('inStore') - this.GetNumber('minInStore')) >= costToBuy) {
                    gm.log("Trying to retrieve: " + (costToBuy - this.stats.cash));
                    gm.setValue("storeRetrieve", costToBuy - this.stats.cash);
                    return this.RetrieveFromBank(costToBuy - this.stats.cash);
                } else {
                    gm.setValue('AutoQuest', '');
                    gm.setValue('WhyQuest', 'Manual');
                    gm.log("Cant buy General, stopping quest");
                    caap.SetControls(true);
                    return false;
                }
            }

            gm.log('Clicking on quick buy general button.');
            this.Click(button);
            return true;
        }

        var autoQuestDivs = this.DrawQuests(true);
        if (!gm.getObjVal('AutoQuest', 'name')) {
            gm.log('Could not find autoquest.');
            this.SetDivContent('quest_mess', 'Could not find autoquest.');
            return false;
        }

        var autoQuestName = gm.getObjVal('AutoQuest', 'name');
        if (gm.getObjVal('AutoQuest', 'name') != autoQuestName) {
            gm.log('New AutoQuest found.');
            this.SetDivContent('quest_mess', 'New AutoQuest found.');
            return true;
        }

        //if found missing requires, click to buy
        var background = nHtml.FindByAttrContains(autoQuestDivs.tr, "div", "style", 'background-color');
        if (background) {
            if (background.style.backgroundColor == 'rgb(158, 11, 15)') {
                gm.log(" background.style.backgroundColor = " + background.style.backgroundColor);
                gm.setValue('storeRetrieve', 'general');
                if (this.SelectGeneral('BuyGeneral')) {
                    return true;
                }

                gm.setValue('storeRetrieve', '');
                if (background.firstChild.firstChild.title) {
                    gm.log("Clicking to buy " + background.firstChild.firstChild.title);
                    this.Click(background.firstChild.firstChild);
                    return true;
                }
            }
        }

        var general = gm.getObjVal('AutoQuest', 'general');
        if (general == 'none' || gm.getValue('ForceSubGeneral', false)) {
            if (this.SelectGeneral('SubQuestGeneral')) {
                return true;
            }
        } else if ((general) && general != this.GetCurrentGeneral()) {
            gm.log('Clicking on general ' + general);
            this.Click(autoQuestDivs.genDiv);
            return true;
        }

        gm.log('Clicking auto quest: ' + autoQuestName);
        gm.setValue('ReleaseControl', true);
        caap.Click(autoQuestDivs.click, 10000);
        return true;
    },

    DrawQuests: function (pickQuestTF) {
        var whyQuest = gm.getValue('WhyQuest', '');
        if (pickQuestTF && whyQuest != 'Manual') {
            gm.setValue('AutoQuest', '');
        }

        var bestReward = 0;
        var rewardRatio = 0;
        var div = document.body;
        var ss = null;
        var s = 0;
        if (this.CheckForImage('demi_quest_on.gif')) {
            ss = document.evaluate(".//div[contains(@id,'symbol_displaysymbolquest')]", div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (s = 0; s < ss.snapshotLength; s++) {
                div = ss.snapshotItem(s);
                if (div.style.display != 'none') {
                    break;
                }
            }
        }

        ss = document.evaluate(".//div[contains(@class,'quests_background')]", div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (ss.snapshotLength === 0) {
    //      gm.log("Failed to find quests_background");
            return;
        }

        var autoQuestDivs = {};
        for (s = 0; s < ss.snapshotLength; s++) {
            div = ss.snapshotItem(s);

            caapGlob.quest_name = this.GetQuestName(div);
            if (!caapGlob.quest_name) {
                continue;
            }

            var reward = null;
            var energy = null;
            var experience = null;
            var divTxt = nHtml.GetText(div);
            var expM = this.experienceRe.exec(divTxt);
            if (expM) {
                experience = this.NumberOnly(expM[1]);
            } else {
                var expObj = nHtml.FindByAttr(div, 'div', 'className', 'quest_experience');
                if (expObj) {
                    experience = (this.NumberOnly(nHtml.GetText(expObj)));
                } else {
                    gm.log('cannot find experience:' + caapGlob.quest_name);
                }
            }

            var idx = caapGlob.quest_name.indexOf('<br>');
            if (idx >= 0) {
                caapGlob.quest_name = caapGlob.quest_name.substring(0, idx);
            }

            var energyM = this.energyRe.exec(divTxt);
            if (energyM) {
                energy = this.NumberOnly(energyM[1]);
            } else {
                var eObj = nHtml.FindByAttrContains(div, 'div', 'className', 'quest_req');
                if (eObj) {
                    energy = eObj.getElementsByTagName('b')[0];
                }
            }

            if (!energy) {
                gm.log('cannot find energy for quest:' + caapGlob.quest_name);
                continue;
            }

            var moneyM = this.moneyRe.exec(this.RemoveHtmlJunk(divTxt));
            if (moneyM) {
                var rewardLow = this.NumberOnly(moneyM[1]);
                var rewardHigh = this.NumberOnly(moneyM[2]);
                reward = (rewardLow + rewardHigh) / 2;
            } else {
                gm.log('no money found:' + caapGlob.quest_name + ' in ' + divTxt);
            }

            var click = nHtml.FindByAttr(div, "input", "name", /^Do/);
            if (!click) {
                gm.log('no button found:' + caapGlob.quest_name);
                continue;
            }
            var influence = null;
            var bossList = ["Gift of Earth", "Eye of the Storm", "A Look into the Darkness", "The Rift", "Undead Embrace", "Confrontation"];
            if (bossList.indexOf(caapGlob.quest_name) >= 0 && nHtml.FindByClassName(document.body, 'div', 'quests_background_sub')) {
                //if boss and found sub quests
                influence = "100";
            } else {
                var influenceList = this.influenceRe.exec(divTxt);
                if (influenceList) {
                    influence = influenceList[1];
                } else {
                    gm.log("Influence div not found.");
                }
            }

            if (!influence) {
                gm.log('no influence found:' + caapGlob.quest_name + ' in ' + divTxt);
            }

            var general = 'none';
            var genDiv = null;
            if (influence && influence < 100) {
                genDiv = nHtml.FindByAttrContains(div, 'div', 'className', 'quest_act_gen');
                if (genDiv) {
                    genDiv = nHtml.FindByAttrContains(genDiv, 'img', 'src', 'jpg');
                    if (genDiv) {
                        general = genDiv.title;
                    }
                }
            }

            this.LabelQuests(div, energy, reward, experience, click);
            if (this.CheckCurrentQuestArea(gm.getValue('QuestSubArea', 'Atlantis'))) {
                switch (whyQuest) {
                case 'Max Influence' :
                    if (influence) {
                        if (!gm.getObjVal('AutoQuest', 'name') && this.NumberOnly(influence) < 100) {
                            gm.setObjVal('AutoQuest', 'name', caapGlob.quest_name);
                        }
                    } else {
                        gm.log('cannot find influence:' + caapGlob.quest_name + ': ' + influence);
                    }
                    break;
                case 'Max Experience' :
                    rewardRatio = (Math.floor(experience / energy * 100) / 100);
                    if (bestReward < rewardRatio) {
                        gm.setObjVal('AutoQuest', 'name', caapGlob.quest_name);
                    }
                    break;
                case 'Max Gold' :
                    rewardRatio = (Math.floor(reward / energy * 10) / 10);
                    if (bestReward < rewardRatio) {
                        gm.setObjVal('AutoQuest', 'name', caapGlob.quest_name);
                    }
                    break;
                default :
                    break;
                }

                if (gm.getObjVal('AutoQuest', 'name') == caapGlob.quest_name) {
                    bestReward = rewardRatio;
                    var expRatio = experience / energy;
                    gm.setValue('AutoQuest', 'name' + caapGlob.ls + caapGlob.quest_name + caapGlob.vs + 'energy' + caapGlob.ls + energy + caapGlob.vs + 'general' + caapGlob.ls + general + caapGlob.vs + 'expRatio' + caapGlob.ls + expRatio);
                    autoQuestDivs = {'click': click, 'tr': div, 'genDiv': genDiv};
                }
            }
        }

        if (pickQuestTF) {
            if (gm.getObjVal('AutoQuest', 'name')) {
                this.SetControls(true);
                return autoQuestDivs;
            }

            if (whyQuest == 'Max Influence' && gm.getValue('swithQuestArea', false)) { //if not find quest, probably you already maxed the subarea, try another area
                var SubAreaQuest = gm.getValue('QuestSubArea');
                switch (SubAreaQuest) {
                case 'Land of Fire':
                    gm.setValue('QuestSubArea', 'Land of Earth');
                    break;
                case 'Land of Earth':
                    gm.setValue('QuestSubArea', 'Land of Mist');
                    break;
                case 'Land of Mist':
                    gm.setValue('QuestSubArea', 'Land of Water');
                    break;
                case 'Land of Water':
                    gm.setValue('QuestSubArea', 'Demon Realm');
                    break;
                case 'Demon Realm':
                    gm.setValue('QuestSubArea', 'Undead Realm');
                    break;
                case 'Undead Realm':
                    gm.setValue('QuestSubArea', 'Underworld');
                    break;
                case 'Underworld':
                    gm.setValue('QuestArea', 'Demi Quests');
                    gm.setValue('QuestSubArea', 'Ambrosia');
                    break;
                case 'Ambrosia':
                    gm.setValue('QuestSubArea', 'Malekus');
                    break;
                case 'Malekus':
                    gm.setValue('QuestSubArea', 'Corvintheus');
                    break;
                case 'Corvintheus':
                    gm.setValue('QuestSubArea', 'Aurora');
                    break;
                case 'Aurora':
                    gm.setValue('QuestSubArea', 'Azeron');
                    break;
                case 'Azeron':
                    gm.setValue('QuestArea', 'Quest');
                    gm.setValue('QuestSubArea', 'Land of Fire');
                    break;
                default :
                    gm.setValue('AutoQuest', '');
                    gm.setValue('WhyQuest', 'Manual');
                    this.SetControls(true);
                    return false;
                }

                return false;
            }

            gm.setValue('AutoQuest', '');
            gm.setValue('WhyQuest', 'Manual');
            this.SetControls(true);
        }
    },

    CheckCurrentQuestArea: function (SubAreaQuest) {
        switch (SubAreaQuest) {
        case 'Land of Fire':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_1')) {
                return true;
            }
            break;
        case 'Land of Earth':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_2')) {
                return true;
            }
            break;
        case 'Land of Mist':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_3')) {
                return true;
            }
            break;
        case 'Land of Water':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_4')) {
                return true;
            }
            break;
        case 'Demon Realm':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_5')) {
                return true;
            }
            break;
        case 'Undead Realm':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_6')) {
                return true;
            }
            break;
        case 'Underworld':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_7')) {
                return true;
            }
            break;
        case 'Ambrosia':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_1')) {
                return true;
            }
            break;
        case 'Malekus':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_2')) {
                return true;
            }
            break;
        case 'Corvintheus':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_3')) {
                return true;
            }
            break;
        case 'Aurora':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_4')) {
                return true;
            }
            break;
        case 'Azeron':
            if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_5')) {
                return true;
            }
            break;
        case 'Atlantis':
            if (this.CheckForImage('tab_atlantis_on.gif')) {
                return true;
            }
            break;
        default :
            gm.log("Error: cant find SubQuestArea: " + SubAreaQuest);
            return false;
        }
    },

    GetQuestName: function (questDiv) {
        var item_title = nHtml.FindByAttrXPath(questDiv, 'div', "@class='quest_desc' or @class='quest_sub_title'");
        if (!item_title) {
        //  gm.log("Can't find quest description or sub-title");
            return false;
        }

        if (item_title.innerHTML.toString().match(/LOCK/)) {
            return false;
        }

        var firstb = item_title.getElementsByTagName('b')[0];
        if (!firstb) {
            gm.log("Can't get bolded member out of " + item_title.innerHTML.toString());
            return false;
        }

        caapGlob.quest_name = nHtml.StripHtml(firstb.innerHTML.toString()).trim();
        if (!caapGlob.quest_name) {
            //gm.log('no quest name for this row: ' + div.innerHTML);
            gm.log('no quest name for this row: ');
            return false;
        }

        return caapGlob.quest_name;
    },

    IsEnoughEnergyForAutoQuest: function () {
        var energy = gm.getObjVal('AutoQuest', 'energy');
        if (!this.stats.energy || !energy) {
            return false;
        }

        var whenQuest = gm.getValue('WhenQuest', '');
        if (whenQuest == 'Energy Available' || whenQuest == 'Not Fortifying') {
            if (this.stats.energy.num >= energy) {
                return true;
            }

            this.SetDivContent('quest_mess', 'Waiting for more energy: ' + this.stats.energy.num + "/" + (energy ? energy : ""));
            return false;
        } else if (whenQuest == 'At Max Energy') {
            if (!gm.getValue('MaxIdleEnergy', 0)) {
                gm.log("Changing to idle general to get Max energy");
                this.PassiveGeneral();
            }

            if (this.stats.energy.num >= gm.getValue('MaxIdleEnergy')) {
                return true;
            }

            if (this.InLevelUpMode() && this.stats.energy.num >= energy) {
                this.SetDivContent('quest_mess', 'Burning all energy to level up');
                return true;
            }

            this.SetDivContent('quest_mess', 'Waiting for max energy:' + this.stats.energy.num + "/" + gm.getValue('MaxIdleEnergy'));
            return false;
        }
        return false;
    },

    LabelQuests: function (div, energy, reward, experience, click) {
        if (nHtml.FindByAttr(div, 'div', 'className', 'autoquest')) {
            return;
        }

        //var div=document.createElement('div');
        div = document.createElement('div');
        div.className = 'autoquest';
        div.style.fontSize = '10px';
        div.innerHTML = "$ per energy: " +
            (Math.floor(reward / energy * 10) / 10) +
            "<br />Exp per energy: " +
            (Math.floor(experience / energy * 100) / 100) +
            "<br />";

        if (gm.getObjVal('AutoQuest', 'name') == caapGlob.quest_name) {
            var b = document.createElement('b');
            b.innerHTML = "Current auto quest";
            div.appendChild(b);
        } else {
            var setAutoQuest = document.createElement('a');
            setAutoQuest.innerHTML = 'Auto run this quest.';
            setAutoQuest.quest_name = caapGlob.quest_name;

            var quest_nameObj = document.createElement('span');
            quest_nameObj.innerHTML = caapGlob.quest_name;
            quest_nameObj.style.display = 'none';
            setAutoQuest.appendChild(quest_nameObj);

            var quest_energyObj = document.createElement('span');
            quest_energyObj.innerHTML = energy;
            quest_energyObj.style.display = 'none';
            setAutoQuest.appendChild(quest_energyObj);
            setAutoQuest.addEventListener("click", function (e) {
                var sps = e.target.getElementsByTagName('span');
                if (sps.length > 0) {
                    gm.setValue('AutoQuest', 'name' + caapGlob.ls + sps[0].innerHTML.toString() + caapGlob.ls + 'energy' + caapGlob.ls + sps[1].innerHTML.toString());
                    gm.setValue('WhyQuest', 'Manual');
                    if (caap.CheckForImage('tab_quest_on.gif')) {
                        gm.setValue('QuestArea', 'Quest');
                        if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_1')) {
                            gm.setValue('QuestSubArea', 'Land of Fire');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_2')) {
                            gm.setValue('QuestSubArea', 'Land of Earth');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_3')) {
                            gm.setValue('QuestSubArea', 'Land of Mist');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_4')) {
                            gm.setValue('QuestSubArea', 'Land of Water');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_5')) {
                            gm.setValue('QuestSubArea', 'Demon Realm');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_6')) {
                            gm.setValue('QuestSubArea', 'Undead Realm');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'quests_stage_7')) {
                            gm.setValue('QuestSubArea', 'Underworld');
                        }
                        gm.log('Seting SubQuest Area to: ' + gm.getValue('QuestSubArea'));
                    } else if (caap.CheckForImage('demi_quest_on.gif')) {
                        gm.setValue('QuestArea', 'Demi Quests');
                        // Set Sub Quest Area
                        if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_1')) {
                            gm.setValue('QuestSubArea', 'Ambrosia');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_2')) {
                            gm.setValue('QuestSubArea', 'Malekus');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_3')) {
                            gm.setValue('QuestSubArea', 'Corvintheus');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_4')) {
                            gm.setValue('QuestSubArea', 'Aurora');
                        } else if (nHtml.FindByAttrContains(document.body, "div", "class", 'symbolquests_stage_5')) {
                            gm.setValue('QuestSubArea', 'Azeron');
                        }
                        gm.log('Seting SubQuest Area to: ' + gm.getValue('QuestSubArea'));
                    } else if (caap.CheckForImage('tab_atlantis_on.gif')) {
                        gm.setValue('QuestArea', 'Atlantis');
                        gm.deleteValue('QuestSubArea');
                    }

                    caap.SetControls(true);
                } else {
                    gm.log('what did we click on?');
                }
            }, false);

            div.appendChild(setAutoQuest);
        }

        div.style.position = 'absolute';
        div.style.background = '#B09060';
        div.style.right = "144px";
        click.parentNode.insertBefore(div, click);
    },

    /////////////////////////////////////////////////////////////////////
    //                          AUTO BLESSING
    /////////////////////////////////////////////////////////////////////

    deityTable: {'energy': 1, 'attack': 2, 'defense': 3, 'health': 4, 'stamina': 5},

    BlessingResults: function (resultsText) {
        // Check time until next Oracle Blessing
        if (resultsText.match(/Please come back in: /)) {
            var hours = parseInt(resultsText.match(/ \d+ hour/), 10);
            var minutes = parseInt(resultsText.match(/ \d+ minute/), 10);
            this.SetTimer('BlessingTimer', (hours * 60 + minutes + 1) * 60);
            gm.log('Recorded Blessing Time.  Scheduling next click!');
        }

        // Recieved Demi Blessing.  Wait 24 hours to try again.
        if (resultsText.match(/You have paid tribute to/)) {
            this.SetTimer('BlessingTimer', 24 * 60 * 60 + 60);
            gm.log('Received blessing.  Scheduling next click!');
        }

        this.SetCheckResultsFunction('');
    },

    AutoBless: function () {
        var autoBless = gm.getValue('AutoBless', 'none').toLowerCase();
        if (autoBless == 'none') {
            return false;
        }

        if (!this.CheckTimer('BlessingTimer')) {
            return false;
        }

        if (this.NavigateTo('quests,demi_quest_off', 'demi_quest_bless')) {
            return true;
        }

        var picSlice = nHtml.FindByAttrContains(document.body, 'img', 'src', 'deity_' + autoBless);
        if (!picSlice) {
            gm.log('No diety pics for deity_' + autoBless);
            return false;
        }

        if (picSlice.style.height != '160px') {
            return this.NavigateTo('deity_' + autoBless);
        }

        picSlice = nHtml.FindByAttrContains(document.body, 'form', 'id', '_symbols_form_' + this.deityTable[autoBless]);
        if (!picSlice) {
            gm.log('No form for deity blessing.');
            return false;
        }

        picSlice = this.CheckForImage('demi_quest_bless', picSlice);
        if (!picSlice) {
            gm.log('No image for deity blessing.');
            return false;
        }

        gm.log('Click deity blessing for ' + autoBless);
        this.SetTimer('BlessingTimer', 60 * 60);
        this.SetCheckResultsFunction('BlessingResults');
        caap.Click(picSlice);
        return true;
    },

    /////////////////////////////////////////////////////////////////////
    //                          LAND
    // Displays return on lands and perfom auto purchasing
    /////////////////////////////////////////////////////////////////////

    LandsGetNameFromRow: function (row) {
        // schoolofmagic, etc. <div class=item_title
        var infoDiv = nHtml.FindByAttrXPath(row, 'div', "contains(@class,'land_buy_info') or contains(@class,'item_title')");
        if (!infoDiv) {
            gm.log("can't find land_buy_info");
        }

        if (infoDiv.className.indexOf('item_title') >= 0) {
            return infoDiv.textContent.trim();
        }

        var strongs = infoDiv.getElementsByTagName('strong');
        if (strongs.length < 1) {
            return null;
        }

        return strongs[0].textContent.trim();
    },

    bestProp: {prop: '', roi: ''},

    DrawLands: function () {
        if (!this.CheckForImage('tab_land_on.gif') || nHtml.FindByAttrXPath(document, 'div', "contains(@class,'caap_propDone')")) {
            return null;
        }

        gm.deleteValue('BestPropCost');
        this.sellProp = '';
        this.bestProp.roi = 0;
        var propByName = this.IterateLands(function (prop) {
            this.SelectLands(prop.row, 2);
            var roi = (parseInt((prop.income / prop.totalCost) * 240000, 10) / 100);
            var selects = prop.row.getElementsByTagName('select');
            var div = null;
            if (!nHtml.FindByAttrXPath(prop.row, 'input', "@name='Buy'")) {
                roi = 0;
                // Lets get our max allowed from the land_buy_info div
                div = nHtml.FindByAttrXPath(prop.row, 'div', "contains(@class,'land_buy_info') or contains(@class,'item_title')");
                var maxText = nHtml.GetText(div).match(/:\s+\d+/i).toString().trim();
                var maxAllowed = Number(maxText.replace(/:\s+/, ''));
                // Lets get our owned total from the land_buy_costs div
                div = nHtml.FindByAttrXPath(prop.row, 'div', "contains(@class,'land_buy_costs')");
                var ownedText = nHtml.GetText(div).match(/:\s+\d+/i).toString().trim();
                var owned = Number(ownedText.replace(/:\s+/, ''));
                // If we own more than allowed we will set land and selection
                var selection = [1, 5, 10];
                for (var s = 2; s >= 0; s--) {
                    if (owned - maxAllowed >= selection[s]) {
                        this.sellProp = prop;
                        this.sellProp.selection = s;
                        break;
                    }
                }
            }

            div = nHtml.FindByAttrXPath(prop.row, 'div', "contains(@class,'land_buy_info') or contains(@class,'item_title')").getElementsByTagName('strong');
            div[0].innerHTML += " | " + roi + "% per day.";
            if (!prop.usedByOther) {
                if (!(this.bestProp.roi || roi === 0) || roi > this.bestProp.roi) {
                    this.bestProp.roi = roi;
                    this.bestProp.prop = prop;
                    gm.setValue('BestPropCost', this.bestProp.prop.cost);
                }
            }

            if (prop.row.className == "land_buy_row_unique") {
                if (nHtml.GetText(prop.row).match(/each consecutive day/i) !== null) {
                    gm.log("Found unique land, checking timer");
                    if (nHtml.GetText(prop.row.childNodes[1].childNodes[7].childNodes[5])) {
                        var resultsText = nHtml.GetText(prop.row.childNodes[1].childNodes[7].childNodes[5]).trim();
                        if (resultsText.match(/([0-9]{1,2}:)?([0-9]{2}:)?[0-9]{2}/)) {
                            resultsText = resultsText.match(/([0-9]{1,2}:)?([0-9]{2}:)?[0-9]{2}/).toString().split(',')[0];
                            resultsText = resultsText.split(':');
                            var time = [];
                            for (var x = 2; x >= 0 ; x--) {
                                time[x] = 0;
                                if (resultsText[x]) {
                                    time[x] = resultsText[resultsText.length - 1 - x];
                                }
                            }

                            var hours = time[2];
                            var minutes = time[1];
                            var seconds = time[0];
                            gm.log("hours:" + hours + " minutes:" + minutes + " seconds:" + seconds);
                            if (gm.getValue('LandTimer', 9999999999999999999999999) > (new Date().getTime()) * 1000 + hours * 3600 + minutes * 60 + seconds) {
                                gm.log("Setting Land Timer");
                                this.SetTimer('LandTimer', hours * 3600 + minutes * 60 + seconds);
                            }
                            //prop.row.childNodes[1].childNodes[7].childNodes[5].childNodes[5].childNodes[1]
                        } else {
                            gm.log("You need to buy a prop first");
                            this.SetTimer('LandTimer', 9999999999999999999999999);
                        }
                    } else {
                        gm.log("Error");
                    }
                }
            }
        });

        gm.log("BestPropCost:" + gm.getValue('BestPropCost'));
        if (!gm.getValue('BestPropCost')) {
            gm.setValue('BestPropCost', 'none');
        }

        var div = document.createElement('div');
        div.className = 'caap_propDone';
        div.style.display = 'none';
        nHtml.FindByAttrContains(document.body, "tr", "class", 'land_buy_row').appendChild(div);
        return null;
    },

    IterateLands: function (func) {
        var content = document.getElementById('content');
        var ss = document.evaluate(".//tr[contains(@class,'land_buy_row')]", content, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (!ss || (ss.snapshotLength === 0)) {
            //gm.log("Can't find land_buy_row");
            return null;
        }

        var builtOnRe = new RegExp('(Built On|Consumes|Requires):\\s*([^<]+)', 'i');
        var propByName = {};
        var propNames = [];

        //gm.log('forms found:'+ss.snapshotLength);
        for (var s = 0; s < ss.snapshotLength; s++) {
            var row = ss.snapshotItem(s);
            if (!row) {
                continue;
            }

            var name = this.LandsGetNameFromRow(row);
            if (name === null || name === '') {
                gm.log("Can't find land name");
                continue;
            }

            var moneyss = document.evaluate(".//*[contains(@class,'gold') or contains(@class,'currency')]", row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (moneyss.snapshotLength < 2) {
                gm.log("Can't find 2 gold instances");
                continue;
            }

            var income = 0;
            var nums = [];
            var numberRe = new RegExp("([0-9,]+)");
            for (var sm = 0; sm < moneyss.snapshotLength; sm++) {
                income = moneyss.snapshotItem(sm);
                if (income.className.indexOf('label') >= 0) {
                    income = income.parentNode;
                    var m = numberRe.exec(income.textContent);
                    if (m && m.length >= 2 && m[1].length > 1) {
                        // number must be more than a digit or else it could be a "? required" text
                        income = this.NumberOnly(m[1]);
                    } else {
                        //gm.log('Cannot find income for: '+name+","+income.textContent);
                        income = 0;
                        continue;
                    }
                } else {
                    income = this.NumberOnly(income.textContent);
                }
                nums.push(income);
            }

            income = nums[0];
            var cost = nums[1];
            if (!income || !cost) {
                gm.log("Can't find income or cost for " + name);
                continue;
            }

            if (income > cost) {
                // income is always less than the cost of land.
                income = nums[1];
                cost = nums[0];
            }

            var totalCost = cost;
            var prop = {'row': row, 'name': name, 'income': income, 'cost': cost, 'totalCost': totalCost, 'usedByOther': false};
            propByName[name] = prop;
            propNames.push(name);
        }

        for (var p = 0; p < propNames.length; p++) {
            func.call(this, propByName[propNames[p]]);
        }

        return propByName;
    },

    SelectLands: function (row, val) {
        var selects = row.getElementsByTagName('select');
        if (selects.length < 1) {
            return false;
        }

        var select = selects[0];
        select.selectedIndex = val;
        return true;
    },

    BuyLand: function (prop) {
        //this.DrawLands();
        this.SelectLands(prop.row, 2);
        var button = nHtml.FindByAttrXPath(prop.row, 'input', "@type='submit' or @type='image'");
        if (button) {
    //      gm.log("Clicking buy button:" +button);
            gm.log("Buying Prop: " + prop.name);
            this.Click(button, 13000);
            gm.setValue('BestPropCost', '');
            this.bestProp.roi = '';
            return true;
        }

        return false;
    },

    SellLand: function (prop, select) {
        //this.DrawLands();
        this.SelectLands(prop.row, select);
        var button = nHtml.FindByAttrXPath(prop.row, 'input', "@type='submit' or @type='image'");
        if (button) {
    //      gm.log("Clicking sell button:" +button);
            gm.log("Selling Prop: " + prop.name);
            this.Click(button, 13000);
            this.sellProp = '';
            return true;
        }

        return false;
    },

    Lands: function () {
        /*if (gm.getValue('LandTimer') && this.CheckTimer('LandTimer')) {
            if (this.NavigateTo('soldiers,land','tab_land_on.gif')) return true;
        }*/
        var autoBuyLand = gm.getValue('autoBuyLand', 0);
        if (autoBuyLand) {
            // Do we have lands above our max to sell?
            if (this.sellProp && gm.getValue('SellLands', true)) {
                this.SellLand(this.sellProp, this.sellProp.selection);
                return true;
            }

            if (!gm.getValue('BestPropCost')) {
                gm.log("Going to land to get Best Land Cost");
                if (this.NavigateTo('soldiers,land', 'tab_land_on.gif')) {
                    return true;
                }
            }

            if (gm.getValue('BestPropCost') == 'none') {
                //gm.log("No Lands avaliable");
                return false;
            }

            if (!gm.getValue('inStore')) {
                gm.log("Going to keep to get Stored Value");
                if (this.NavigateTo('keep')) {
                    return true;
                }
            }

            //Retrieving from Bank
            if (this.stats.cash + (gm.getValue('inStore') - this.GetNumber('minInStore')) >= 10 * gm.getValue('BestPropCost') && this.stats.cash < 10 * gm.getValue('BestPropCost')) {
                if (this.PassiveGeneral()) {
                    return true;
                }

                gm.log("Trying to retrieve: " + (10 * gm.getValue('BestPropCost') - this.stats.cash));
                return this.RetrieveFromBank(10 * gm.getValue('BestPropCost') - this.stats.cash);
            }

    // Need to check for enough moneys + do we have enough of the builton type that we already own.
            if (gm.getValue('BestPropCost') && this.stats.cash >= 10 * gm.getValue('BestPropCost')) {
                if (this.PassiveGeneral()) {
                    return true;
                }

                this.NavigateTo('soldiers,land');
                if (this.CheckForImage('tab_land_on.gif')) {
                    gm.log("Buying land: " + caap.bestProp.name);
                    if (this.BuyLand(caap.bestProp.prop)) {
                        return true;
                    }
                } else {
                    return this.NavigateTo('soldiers,land');
                }
            }
        }

        return false;
    },

    /////////////////////////////////////////////////////////////////////
    //                          BATTLING PLAYERS
    /////////////////////////////////////////////////////////////////////

    // Doesn't appear to be implemented in CA
    /*
    IterateBattleLinks: function (func) {
        var content = document.getElementById('content');
        if(!content) { return; }
        var ss=document.evaluate(".//a[(contains(@href,'xw_controller=stats') and contains(@href,'xw_action=view')) "+
            "or (contains(@href,'/profile/'))"+
            "or (contains(@href,'/"+this.gameName+"/profile.php?userId='))"+
            "or (contains(@href,'/stats.php?user='))"+
            "]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for(var s=0; s<ss.snapshotLength; s++) {
            var userLink=ss.snapshotItem(s);
            if(userLink.innerHTML.indexOf('<img')>=0) { continue; }
            var m=this.userRe.exec(userLink.getAttribute('href'));
            if(!m) { continue; }
            var user=m[2];
            func.call(this,userLink,user);
        }
    },

    AddBattleLinks: function () {
        if(document.getElementById('addBattleLink')) {
            return;
        }
        this.IterateBattleLinks(function (userLink,user) {
        if(nHtml.FindByAttr(userLink.parentNode,'a','class','addBattle')) { return; }
            var addBattle=document.createElement('a');
            addBattle.className='addBattle';
            addBattle.id='addBattleLink';
            addBattle.innerHTML='(Auto Battle)';
            addBattle.addEventListener('click',function () {
                var battleTarget=document.getElementById('caap_BattleTargets');
                if(battleTarget.value=="freshmeat") { battleTarget.value=''; }
                if(battleTarget.value!="") { battleTarget.value+="\n"; }
                battleTarget.value+=user;
                caap.SaveBoxText('BattleTargets');
            },false);
            userLink.parentNode.insertBefore(addBattle,userLink.nextSibling);
            userLink.parentNode.insertBefore(document.createTextNode(' '),userLink.nextSibling);
        });
    },
    */

    CheckBattleResults: function () {
        var nameLink = null;
        var userId = null;
        var userName = null;
        var now = null;
        var newelement = null;

        // Check for Battle results
        var resultsDiv = nHtml.FindByAttrContains(document.body, 'span', 'class', 'result_body');
        if (resultsDiv) {
            var resultsText = nHtml.GetText(resultsDiv).trim();
            if (resultsText.match(/Your opponent is dead or too weak to battle/)) {
				gm.log("This opponent is dead or hiding: " + this.lastBattleID);
                if (!this.doNotBattle) {
                    this.doNotBattle = this.lastBattleID;
                } else {
                    this.doNotBattle += " " + this.lastBattleID;
                }
            }
        }
		
		if (webSlice = nHtml.FindByAttrContains(document.body, 'img', 'src', 'arena_arena_guard')) {
			gm.log('Checking Arena Guard');
			webSlice = webSlice.parentNode.parentNode;
			var ss = document.evaluate(".//img[contains(@src,'profile.ak.fbcdn.net')]", webSlice, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			gm.log('Arena Guard Slots Filled: ' + ss.snapshotLength);
			if ((ss.snapshotLength < 10) & gm.getValue('ArenaEliteEnd', 'NoArmy') != 'NoArmy') {
				gm.setValue('ArenaEliteNeeded', true);
				gm.log('Arena Guard Needs To Be Filed.' + ss.snapshotLength);
			}
		}	
		
		

        if (nHtml.FindByAttrContains(document.body, "img", "src", 'battle_victory.gif')) {
			if (this.CheckForImage('tab_arena_on')) {
				resultsDiv = nHtml.FindByAttrContains(document.body, 'div', 'id', 'app_body');
				nameLink = nHtml.FindByAttrContains(resultsDiv.parentNode.parentNode, "a", "href", "keep.php?user=");
				userId = nameLink.href.match(/user=\d+/i);
				userId = String(userId).substr(5);	
				gm.setValue("ArenaChainId", userId);
                gm.log("Chain Attack: " + userId + "  Arena Battle");				
			} else {	
				var winresults = nHtml.FindByAttrContains(document.body, 'span', 'class', 'positive');
				var bptxt = nHtml.GetText(winresults.parentNode).toString().trim();
				var bpnum = ((/\d+\s+Battle Points/i.test(bptxt)) ? this.NumberOnly(bptxt.match(/\d+\s+Battle Points/i)) : 0);
				var goldtxt = nHtml.FindByAttrContains(document.body, "b", "class", 'gold').innerHTML;
				var goldnum = Number(goldtxt.substring(1).replace(/,/, ''));
				resultsDiv = nHtml.FindByAttrContains(document.body, 'div', 'id', 'app_body');
				nameLink = nHtml.FindByAttrContains(resultsDiv.parentNode.parentNode, "a", "href", "keep.php?user=");
				userId = nameLink.href.match(/user=\d+/i);
				userId = String(userId).substr(5);
				userName = nHtml.GetText(nameLink).trim();
				var wins = 1;
				gm.log("We Defeated " + userName + "!!");
				//Test if we should chain this guy
				gm.setValue("BattleChainId", '');
				if (this.GetNumber('ChainBP') !== '') {
					if (bpnum >= Number(this.GetNumber('ChainBP'))) {
						gm.setValue("BattleChainId", userId);
						gm.log("Chain Attack: " + userId + "  Battle Points:" + bpnum);
					} else {
						if (!this.doNotBattle) {
							this.doNotBattle = this.lastBattleID;
						} else {
							this.doNotBattle += " " + this.lastBattleID;
						}
					}
				}

				if (this.GetNumber('ChainGold') !== '') {
					if (goldnum >= Number(this.GetNumber('ChainGold'))) {
						gm.setValue("BattleChainId", userId);
						gm.log("Chain Attack " + userId + " Gold:" + goldnum);
					} else {
						if (!this.doNotBattle) {
							this.doNotBattle = this.lastBattleID;
						} else {
							this.doNotBattle += " " + this.lastBattleID;
						}
					}
				}

				if (gm.getValue("BattleChainId", '')) {
					var chainCount = this.GetNumber('ChainCount', 0) + 1;
					if (chainCount >= this.GetNumber('MaxChains', 4)) {
						gm.log("Lets give this guy a break.");
						if (!this.doNotBattle) {
							this.doNotBattle = this.lastBattleID;
						} else {
							this.doNotBattle += " " + this.lastBattleID;
						}

						gm.setValue("BattleChainId", '');
						chainCount = 0;
					}

					gm.setValue('ChainCount', chainCount);
				} else {
					gm.setValue('ChainCount', 0);
				}

		/*  Not ready for primtime.   Need to build SliceList to extract our element
				if (gm.getValue('BattlesWonList','').indexOf(caapGlob.os+userId+caapGlob.os) >= 0) {
					element = gm.sliceList('BattlesWonList',caapGlob.os+userId+caapGlob.os);
					elementArray = element.split(caapGlob.vs);
					prevWins = Number(elementArray[3]);
					prevBPs = Number(elementArray[4]);
					prevGold = Number(elementArray[5]);
					wins = prevWins + wins;
					bpnum = prevBPs + bpnum;
					goldnum  = prevGold + goldnum
				}
		*/

				if (gm.getValue('BattlesWonList', '').indexOf(caapGlob.vs + userId + caapGlob.vs) == -1 &&
					(bpnum >= gm.getValue('ReconBPWon', 0) || (goldnum >= gm.getValue('ReconGoldWon', 0)))) {
					now = (new Date().getTime()).toString();
					newelement = now + caapGlob.vs + userId + caapGlob.vs + userName + caapGlob.vs + wins + caapGlob.vs + bpnum + caapGlob.vs + goldnum;
					gm.listPush('BattlesWonList', newelement, 100);
				}

				this.SetCheckResultsFunction('');
			}	
        } else if (this.CheckForImage('battle_defeat.gif')) {
            resultsDiv = nHtml.FindByAttrContains(document.body, 'div', 'id', 'app_body');
            nameLink = nHtml.FindByAttrContains(resultsDiv.parentNode.parentNode, "a", "href", "keep.php?user=");
            userId = nameLink.href.match(/user=\d+/i);
            userId = String(userId).substr(5);
            userName = nHtml.GetText(nameLink).trim();

            gm.log("We Were Defeated By " + userName + ".");
            gm.setValue('ChainCount', 0);
            if (gm.getValue('BattlesLostList', '').indexOf(caapGlob.vs + userId + caapGlob.vs) == -1) {
                now = (new Date().getTime()).toString();
                newelement = now + caapGlob.vs + userId + caapGlob.vs + userName;
                if (!gm.getValue('IgnoreBattleLoss', false)) {
                    gm.listPush('BattlesLostList', newelement, 100);
                }
            }

    /*  Not ready for primtime.   Need to build SliceList to yank our elemment out of the win list as well
            if (gm.getValue('BattlesWonList','').indexOf(caapGlob.os+userId+caapGlob.os) >= 0) {
                trash = gm.sliceList('BattlesWonList',caapGlob.os+userId+caapGlob.os);
                elementArray = element.split(caapGlob.vs);
            }
    */

            this.SetCheckResultsFunction('');
        } else {
            gm.setValue('ChainCount', 0);
        }
    },

    FindBattleForm: function (obj, withOpponent) {
        var ss = document.evaluate(".//form[contains(@onsubmit,'battle.php')]", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var battleForm = null;
        for (var s = 0; s < ss.snapshotLength; s++) {
            battleForm = ss.snapshotItem(s);

            // ignore forms in overlays
            var p = battleForm;
            while (p) {
                if (p.id && p.id.indexOf('verlay') >= 0) {
                    battleForm = null;
                    break;
                }

                p = p.parentNode;
            }

            if (!battleForm) {
                continue;
            }

            var inviteButton = nHtml.FindByAttrXPath(battleForm, "input", "(@type='submit' or @name='submit') and (contains(@value,'Invite') or contains(@value,'Notify'))");
            if (inviteButton) {
                // we only want "attack" forms not "attack and invite", "attack & notify"
                continue;
            }

            var submitButton = nHtml.FindByAttrXPath(battleForm, "input", "@type='image'");
            if (!submitButton) {
                // we only want forms that have a submit button
                continue;
            }

            if (withOpponent) {
                var inp = nHtml.FindByAttrXPath(battleForm, "input", "@name='target_id'");
                if (!inp) {
                    continue;
                } else {
                    gm.log('inp.name is:' + inp.name);
                }
            }

            if (gm.getValue("BattleType", "Invade") == "Duel") {
                var inputDuel = nHtml.FindByAttrXPath(battleForm, "input", "@name='duel'");
                if (inputDuel) {
                    if (inputDuel.value == "false") {
                        continue;
                    } else {
                        gm.log('dueling form found');
                    }
                }
            }

            if (battleForm) {
                break;
            }
        }

        return battleForm;
    },

    battleLinkXPath: "(contains(@onclick,'xw_controller=battle') and contains(@onclick,'xw_action=attack')) " +
        "or contains(@onclick,'directAttack')" +
        "or contains(@onclick,'_battle_battle(')",

    BattleUserId: function (userid) {
        gm.log('Battle user:' + userid);
        var target = '';
		if (gm.getValue('TargetType', '') == 'Arena') {
			if (gm.getValue('BattleType', 'Invade') == "Duel") {
				target = "arena_duel.gif";
			} else {
				target = "arena_invade.gif";
			}		
		} else {
			if (gm.getValue('BattleType', 'Invade') == "Duel") {
				target = "battle_02.gif";
			} else {
				target = "battle_01.gif";
			}
		}	
        var battleButton = nHtml.FindByAttrContains(document.body, "input", "src", target);
        if (battleButton) {
            var form = battleButton.parentNode.parentNode;
            var inp = nHtml.FindByAttrXPath(form, "input", "@name='target_id'");
            if (inp) {
                inp.value = userid;
                this.lastBattleID = userid;
                this.ClickBattleButton(battleButton);
                this.notSafeCount = 0;
                return true;
            } else {
                gm.log("target_id not found in battleForm");
            }
        } else {
            gm.log("battleButton not found");
        }

        return false;
    },

    rankTable: {'acolyte': 0, 'scout': 1, 'soldier': 2, 'elite soldier': 3, 'squire': 4, 'knight': 5, 'first knight': 6, 'legionnaire': 7, 'centurion': 8, 'champion': 9, 'lieutenant commander': 10, 'commander': 11, 'high commander': 12, 'lieutenant general': 13, 'general': 14, 'high general': 15, 'baron': 16, 'earl': 17, 'duke': 18, 'prince': 19, 'king': 20, 'high king': 21},
	
    arenaTable: {'brawler': 1, 'swordsman': 2, 	'warrior': 3, 'gladiator': 4, 'hero': 5, 'legend': 6},	

    ClickBattleButton: function (battleButton) {
        gm.setValue('ReleaseControl', true);
        gm.setValue('resetmonsterDamage', true);
        this.SetCheckResultsFunction('CheckBattleResults');
        this.Click(battleButton);
    },
    // raid_attack_middle2.gif

    battles: {
        'Raid': {
            Invade : 'raid_attack_button.gif',
            Duel : 'raid_attack_button2.gif',
            regex : new RegExp('Rank: ([0-9]+) ([^0-9]+) ([0-9]+) ([^0-9]+) ([0-9]+)', 'i'),
            refresh : 'raid',
            image : 'tab_raid_on.gif'
        },
        'Freshmeat' : {
            Invade: 'battle_01.gif',
            Duel : 'battle_02.gif',
            regex : new RegExp('Level ([0-9]+)\\s*([A-Za-z ]+)', 'i'),
            refresh : 'battle_on.gif',
            image : 'battle_on.gif'
        },
        'Arena': {
            Invade : 'arena_invade.gif',
            Duel : 'arena_duel.gif',
            regex : new RegExp('Level ([0-9]+)\\s*([A-Za-z ]+)', 'i'),
            refresh : 'tab_arena_on.gif',
            image : 'tab_arena_on.gif'
        },		
    },

    BattleFreshmeat: function (type) {
        try {
            var invadeOrDuel = gm.getValue('BattleType');
            var target = "//input[contains(@src,'" + this.battles[type][invadeOrDuel] + "')]";
            gm.log('target ' + target);
            var ss = document.evaluate(target, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (ss.snapshotLength <= 0) {
                gm.log('Not on battlepage');
                return false;
            }

            var plusOneSafe = false;
            var bestScore = -10000;
            var bestID = 0;
            var safeTargets = [];
            var count = 0;
			
			if (type == 'Arena') {
				var chainId = gm.getValue('ArenaChainId', '');
				var chainAttack = false;
				var inp = null;
				gm.setValue('ArenaChainId', '');			
			} else {
				var chainId = gm.getValue('BattleChainId', '');
				var chainAttack = false;
				var inp = null;
				gm.setValue('BattleChainId', '');
			}	

        //  gm.log("my army/rank/level:" + this.stats.army + "/" + this.stats.rank + "/" + this.stats.level);
            for (var s = 0; s < ss.snapshotLength; s++) {
                var button = ss.snapshotItem(s);
                var tr = button;
                if (!tr) {
                    gm.log('No tr parent of button?');
                    continue;
                }

                var rank = 0;
                var level = 0;
                var army = 0;
                var txt = '';
                var levelm = '';
                if (type == 'Raid') {
                    tr = tr.parentNode.parentNode.parentNode.parentNode.parentNode;
                    txt = tr.childNodes[3].childNodes[3].textContent;
                    levelm = this.battles.Raid.regex.exec(txt);
                    if (!levelm) {
                        gm.log("Can't match battleRaidRe in " + txt);
                        continue;
                    }

                    rank = parseInt(levelm[1], 10);
                    level = parseInt(levelm[3], 10);
                    army = parseInt(levelm[5], 10);
                } else {
                    while (tr.tagName.toLowerCase() != "tr") {
                        tr = tr.parentNode;
                    }

                    //  If looking for demi points, and already full, continue
                    if (gm.getValue('DemiPointsFirst', '') && !gm.getValue('DemiPointsDone', true)) {
                        var deityNumber = this.NumberOnly(this.CheckForImage('symbol_', tr).src.match(/\d+\.jpg/i).toString()) - 1;
                        var demiPointList = gm.getList('DemiPointList');
                        if (parseInt(demiPointList[deityNumber], 10) == 10 || !gm.getValue('DemiPoint' + deityNumber)) {
                            continue;
                        }
                    }

                    txt = nHtml.GetText(tr).trim();
                    levelm = this.battles.Freshmeat.regex.exec(txt);
                    if (!levelm) {
                        gm.log("Can't match battleLevelRe in " + txt);
                        continue;
                    }

                    level = parseInt(levelm[1], 10);
                    var rankStr = levelm[2].toLowerCase().trim();
					if (type == 'Arena') {
						rank = this.arenaTable[rankStr];
						if (webSlice = nHtml.FindByAttrContains(document.body, 'div', 'id', 'arena_body')) {
							var txtRank = nHtml.GetText(webSlice);
							yourRankStrObj = /:([A-Za-z ]+)/.exec(txtRank)
							yourRankStr = yourRankStrObj[1].toLowerCase().trim();;
							yourRank = this.arenaTable[yourRankStr];
							// gm.log('Your rank: ' + yourRankStr + ' ' + yourRank);
						}
						else {
							gm.log('Unable To Find Your Arena Rank');
							yourRank = 0;
						}	
					} else {	
						rank = this.rankTable[rankStr];
						yourRank = this.stats.rank;
					}					
                    var subtd = document.evaluate("td", tr, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    army = parseInt(nHtml.GetText(subtd.snapshotItem(2)).trim(), 10);
                }

                // Lets get our Freshmeat user settings
                var minRank = this.GetNumber("FreshMeatMinRank", 99);
                var maxLevel = this.GetNumber("FreshMeatMaxLevel", ((invadeOrDuel == 'Invade') ? 1000 : 15));
                var ARBase = this.GetNumber("FreshMeatARBase", 0.5);
                var ARMax = this.GetNumber("FreshMeatARMax", 1000);
                var ARMin = this.GetNumber("FreshMeatARMin", 0);

                if (level - this.stats.level > maxLevel) {
                    continue;
                }

		
				if (yourRank && (yourRank - rank  > minRank)) {
					continue;
				}
				

                var levelMultiplier = this.stats.level / level;
                var armyRatio = ARBase * levelMultiplier;
                armyRatio = Math.min(armyRatio, ARMax);
                armyRatio = Math.max(armyRatio, ARMin);
                if (armyRatio <= 0) {
                    gm.log("Bad ratio");
                    continue;
                }

				gm.log("Army Ratio:" + armyRatio + " Level:" + level + " Rank:" + rank + " Army: " + army)

                // if we know our army size, and this one is larger than armyRatio, don't battle
                if (this.stats.army && (army > (this.stats.army * armyRatio))) {
                    continue;
                }

                inp = nHtml.FindByAttrXPath(tr, "input", "@name='target_id'");
                var id = inp.value;
                var dfl = gm.getValue('BattlesLostList', '');
                // don't battle people we recently lost to
                if (dfl.indexOf(caapGlob.vs + id + caapGlob.vs) >= 0) {
					gm.log("We lost to this id before: "+id);
                    continue;
                }

                // don't battle people we've already battled too much
				
				if (this.doNotBattle && this.doNotBattle.indexOf(id) >= 0) {
					gm.log("We attacked this id before: "+id); 
					continue;
				}


                var thisScore = rank - (army / levelMultiplier / this.stats.army);
                if (id == chainId) {
                    chainAttack = true;
                }

                var temp = {};
                temp.id = id;
                temp.score = thisScore;
                temp.button = button;
                temp.targetNumber = s + 1;
                safeTargets[count] = temp;
                count++;
                if (s === 0 && type == 'Raid') {
                    plusOneSafe = true;
                }

                for (var x = 0; x < count; x++) {
                    for (var y = 0 ; y < x ; y++) {
                        if (safeTargets[y].score < safeTargets[y + 1].score) {
                            temp = safeTargets[y];
                            safeTargets[y] = safeTargets[y + 1];
                            safeTargets[y + 1] = temp;
                        }
                    }
                }
            }

            if (count > 0) {
                var anyButton = null;
                var form = null;
                if (chainAttack) {
                    anyButton = ss.snapshotItem(0);
                    form = anyButton.parentNode.parentNode;
                    inp = nHtml.FindByAttrXPath(form, "input", "@name='target_id'");
                    if (inp) {
                        inp.value = chainId;
                        gm.log("Chain attacking: " + chainId);
                        this.ClickBattleButton(anyButton);
                        this.lastBattleID = chainId;
                        this.SetDivContent('battle_mess', 'Attacked: ' + this.lastBattleID);
                        this.notSafeCount = 0;
                        return true;
                    } else {
                        gm.log("Could not find 'target_id' input");
                    }
                } else if (gm.getValue('PlusOneKills', false) && type == 'Raid') {
                    if (plusOneSafe) {
                        anyButton = ss.snapshotItem(0);
                        form = anyButton.parentNode.parentNode;
                        inp = nHtml.FindByAttrXPath(form, "input", "@name='target_id'");
                        if (inp) {
                            var firstId = inp.value;
                            inp.value = '200000000000001';
                            gm.log("Target ID Overriden For +1 Kill. Expected Defender: " + firstId);
                            this.ClickBattleButton(anyButton);
                            this.lastBattleID = firstId;
                            this.SetDivContent('battle_mess', 'Attacked: ' + this.lastBattleID);
                            this.notSafeCount = 0;
                            return true;
                        } else {
                            gm.log("Could not find 'target_id' input");
                        }
                    } else {
                        gm.log("Not safe for +1 kill.");
                    }
                } else {
                    for (var z = 0; z < count; z++) {
                        //gm.log("safeTargets["+z+"].id = "+safeTargets[z].id+" safeTargets["+z+"].score = "+safeTargets[z].score);
                        if (!this.lastBattleID && this.lastBattleID == safeTargets[z].id && z < count - 1) {
                            continue;
                        }

                        var bestButton = safeTargets[z].button;
                        if (bestButton !== null) {
                            gm.log('Found Target score: ' + safeTargets[z].score + ' id: ' + safeTargets[z].id + ' Number: ' + safeTargets[z].targetNumber);
                            this.ClickBattleButton(bestButton);
                            this.lastBattleID = safeTargets[z].id;
                            this.SetDivContent('battle_mess', 'Attacked: ' + this.lastBattleID);
                            this.notSafeCount = 0;
                            return true;
                        } else {
                            gm.log('Attack button is null');
                        }
                    }
                }
            }

            this.notSafeCount++;
            if (this.notSafeCount > 100) {
                this.SetDivContent('battle_mess', 'Leaving Battle. Will Return Soon.');
                gm.log('No safe targets limit reached. Releasing control for other processes.');
                this.notSafeCount = 0;
                return false;
            }

            this.SetDivContent('battle_mess', 'No targets matching criteria');
            gm.log('No safe targets. ' + this.notSafeCount);

            if (type == 'Raid') {
                var engageButton = this.monsterEngageButtons[gm.getValue('targetFromraid', '')];
                if (engageButton) {
                    caap.Click(engageButton);
                } else {
                    this.NavigateTo(this.battlePage + ',raid');
                }
            } else if (type == 'Arena')  {
                this.NavigateTo(this.battlePage + ',arena_on.gif');
			} else {
                this.NavigateTo(this.battlePage + ',battle_on.gif');
            }

            return true;

        } catch (e) {
            gm.log("ERROR Raid: " + e);
            window.location = 'http://apps.facebook.com/castle_age/raid.php';
        }
    },

    Battle: function (mode) {
		if (this.stats.health.num < 10) {
			return false;
		}	
	
        var target = this.GetCurrentBattleTarget(mode);
        if (!target) {
            return false;
        }
        target = target.toLowerCase();
        	
        if (!this.CheckNotHiding("Battle")) {
    //      gm.log("Not Hiding Mode: Safe To Wait For Monster.")
            this.SetDivContent('battle_mess', 'Safe To Wait For Monster');
            return false;
        }

        if (gm.getValue('WhenBattle') == 'No Monster' && mode != 'DemiPoints') {
            if ((gm.getValue('WhenMonster', '') != 'Never') && gm.getValue('targetFrombattle_monster') && !gm.getValue('targetFrombattle_monster').match(/the deathrune siege/i)) {
                return false;
            }
        }	
			
        if (!this.CheckStamina('Battle',((target == 'arena')?5:1))) {
            return false;
        }

        if (this.WhileSinceDidIt('MyRankLast', 60 * 60)) {
            gm.log('Visiting keep to get new rank');
            this.NavigateTo('keep');
            return true;
        }

        // Check if we should chain attack
        if (nHtml.FindByAttrContains(document.body, "img", "src", 'battle_victory.gif')) {
            if (this.SelectGeneral('BattleGeneral')) {
                return true;
            }

            var chainButton = null;
            if (gm.getValue('BattleType') == 'Invade') {
                chainButton = this.CheckForImage('battle_invade_again.gif');
            } else {
                chainButton = this.CheckForImage('battle_duel_again.gif');
            }

			if (chainButton) {
				if (target != 'arena' && gm.getValue("BattleChainId", '')) {
					this.SetDivContent('battle_mess', 'Chain Attack In Progress');
					gm.log('Chaining Target: ' + gm.getValue("BattleChainId", ''));	
					this.ClickBattleButton(chainButton);
					gm.setValue("BattleChainId", '');
					return true;
				}
			
				if (target == 'arena' && gm.getValue("ArenaChainId", '') && this.CheckStamina('Battle',5)) {
					this.SetDivContent('battle_mess', 'Chain Attack In Progress');
					gm.log('Chaining Target: ' + gm.getValue("ArenaChainId", ''));	
					this.ClickBattleButton(chainButton);
					gm.setValue("ArenaChainId", '');
					return true;
				}
			}	
        }
		gm.log('Battle Target: ' + target);	

        if (!this.notSafeCount) {
            this.notSafeCount = 0;
        }

        if (this.SelectGeneral('BattleGeneral')) {
            return true;
        }

        switch (target) {
        case 'raid' :
            this.SetDivContent('battle_mess', 'Joining the Raid');
            if (this.NavigateTo(this.battlePage + ',raid', 'tab_raid_on.gif')) {
                gm.setValue('resetmonsterEngage', true);
                return true;
            }

            if (gm.getValue('clearCompleteRaids', false) && this.completeButton.raid) {
                caap.Click(this.completeButton.raid, 1000);
                this.completeButton.raid = '';
                gm.log('Cleared a completed raid');
                gm.setValue('resetmonsterEngage', true);
                return true;
            }

            var raidName = gm.getValue('targetFromraid', '');
            var webSlice = caap.CheckForImage('dragon_title_owner.jpg');
            if (!webSlice) {
                var engageButton = this.monsterEngageButtons[raidName];
                if (engageButton) {
                    caap.Click(engageButton);
                    gm.setValue('resetmonsterDamage', true);
                    return true;
                } else {
                    gm.log('Unable to engage raid ' + raidName);
                    return false;
                }
            }

            if (this.monsterConfirmRightPage(webSlice, raidName)) {
                return true;
            }

            // The user can specify 'raid' in their Userid List to get us here. In that case we need to adjust NextBattleTarget when we are done
            if (gm.getValue('TargetType', '') == "Userid List") {
                if (this.BattleFreshmeat('Raid')) {
                    if (nHtml.FindByAttrContains(document.body, 'span', 'class', 'result_body')) {
                        this.NextBattleTarget();
                    }

                    if (this.notSafeCount > 10) {
                        this.notSafeCount = 0;
                        this.NextBattleTarget();
                    }

                    return true;
                } else {
                    return false;
                }
            }

            return this.BattleFreshmeat('Raid');
        case 'freshmeat' :
            if (this.NavigateTo(this.battlePage, 'battle_on.gif')) {
                return true;
            }

            this.SetDivContent('battle_mess', 'Battling ' + target);
            // The user can specify 'freshmeat' in their Userid List to get us here. In that case we need to adjust NextBattleTarget when we are done
            if (gm.getValue('TargetType', '') == "Userid List") {
                if (this.BattleFreshmeat('Freshmeat')) {
                    if (nHtml.FindByAttrContains(document.body, 'span', 'class', 'result_body')) {
                        this.NextBattleTarget();
                    }

                    if (this.notSafeCount > 10) {
                        this.notSafeCount = 0;
                        this.NextBattleTarget();
                    }

                    return true;
                } else {
                    return false;
                }
            }

            return this.BattleFreshmeat('Freshmeat');
        case 'arena' :
            if (this.NavigateTo(this.battlePage+',arena', 'arena_on.gif')) {
                return true;
            }

            this.SetDivContent('battle_mess', 'Arena Battle');
            // The user can specify 'arena' in their Userid List to get us here. In that case we need to adjust NextBattleTarget when we are done
            if (gm.getValue('TargetType', '') == "Userid List") {
                if (this.BattleFreshmeat('Arena')) {
                    if (nHtml.FindByAttrContains(document.body, 'span', 'class', 'result_body')) {
                        this.NextBattleTarget();
                    }

                    if (this.notSafeCount > 10) {
                        this.notSafeCount = 0;
                        this.NextBattleTarget();
                    }

                    return true;
                } else {
                    return false;
                }
            }

            return this.BattleFreshmeat('Arena');			
        default:
            var dfl = gm.getValue('BattlesLostList', '');
            if (dfl.indexOf(caapGlob.vs + target + caapGlob.vs) >= 0) {
                gm.log('Avoiding Losing Target: ' + target);
                this.NextBattleTarget();
                return true;
            }
			
			if (gm.getValue('TargetType', '') == 'Arena') {
				navigate = this.battlePage + ',arena';
				image = 'tab_arena_on.gif';
				chainid = 'ArenaChainId';
			} else {
				navigate = this.battlePage;
				image = 'battle_on.gif';
				chainid = 'BattleChainId';	
			}		
			
            if (this.NavigateTo(navigate, image)) {
                return true;
            }

            gm.setValue(chainid, '');
            this.SetDivContent('battle_mess', 'Battling User ' + target);
            if (this.BattleUserId(target)) {
                this.NextBattleTarget();
                return true;
            }

            return false;
        }
    },

    NextBattleTarget: function () {
        var battleUpto = gm.getValue('BattleTargetUpto', 0);
        gm.setValue('BattleTargetUpto', battleUpto + 1);
    },

    GetCurrentBattleTarget: function (mode) {
        if (mode == 'DemiPoints') {
            if (gm.getValue('targetFromraid', '') && gm.getValue('TargetType', '') == 'Raid') {
                return 'Raid';
            } else {
                return 'Freshmeat';
            }
        }

        if (gm.getValue('TargetType', '') == 'Raid') {
            if (gm.getValue('targetFromraid', '')) {
                return 'Raid';
            } else {
                this.SetDivContent('battle_mess', 'No Raid To Attack');
                return false;
            }
        }

        if (gm.getValue('TargetType', '') == 'Freshmeat') {
            return 'Freshmeat';
        }
		

        if (gm.getValue('TargetType', '') == 'Arena') {
			if ((this.stats.health.num < this.GetNumber("ArenaMaxHealth", 20)) || (this.stats.stamina.num > this.GetNumber("ArenaMinStamina", 45))) {
				return 'Arena';
			} else {
				return 'Freshmeat';
			}	
        }	

		
        var target = gm.getValue('BattleChainId');
        if (target) {
            return target;
        }		

        target = gm.getValue('BattleTargets', '');
        if (!target) {
            return false;
        }

        var targets = target.split(/[\n,]/);
        var battleUpto = gm.getValue('BattleTargetUpto', 0);
        if (battleUpto > targets.length - 1) {
            battleUpto = 0;
            gm.setValue('BattleTargetUpto', 0);
        }

        if (!targets[battleUpto]) {
            return false;
        }

        if (targets[battleUpto].toLowerCase() == 'raid') {
            if (gm.getValue('targetFromraid', '')) {
                return 'Raid';
            } else {
                this.SetDivContent('battle_mess', 'No Raid To Attack');
                this.NextBattleTarget();
                return false;
            }
        }

        gm.log('nth battle target: ' + battleUpto + ':' + targets[battleUpto]);
        return targets[battleUpto];
    },

    /////////////////////////////////////////////////////////////////////
    //                          ATTACKING MONSTERS
    /////////////////////////////////////////////////////////////////////

    group: function (label, max) {
        return {
            'label'   : label,
            'max'     : max,
            'count'   : 0
        };
    },

    //http://castleage.wikidot.com/monster for monster info
    bosses: {
        'Deathrune' : {
            duration : 168,
            ach : 1000000,
            siege : 5,
            siegeClicks : [30, 60, 90, 120, 200],
            siegeDam : [6600000, 8250000, 9900000, 13200000, 16500000],
            siege_img : '/graphics/death_siege_small',
            fort : true,
            staUse : 5,
            general : 'Orc King'
        },
        'Ice Elemental' : {
            duration : 168,
            ach : 1000000,
            siege : 5,
            siegeClicks : [30, 60, 90, 120, 200],
            siegeDam : [7260000, 9075000, 10890000, 14520000, 18150000],
            siege_img : '/graphics/water_siege_small',
            fort : true,
            staUse : 5,
            general: 'Orc King'
    /*
            , levels : {
            'Levels 90+'   : caap.group('90+: '  ,40),
            'Levels 60-90' : caap.group('60-90: ',30),
            'Levels 30-60' : caap.group('30-60: ',30),
            'Levels 1-30'  : caap.group('01-30: ',30)}
    */
        },
        'Earth Elemental' : {
            duration : 168,
            ach : 1000000,
            siege : 5,
            siegeClicks : [30, 60, 90, 120, 200],
            siegeDam : [6600000, 8250000, 9900000, 13200000, 16500000],
            siege_img : '/graphics/earth_siege_small',
            fort : true,
            staUse : 5,
            general: 'Orc King'
    /*
            , levels : {
            'Levels 90+'   : caap.group('90+: '  ,40),
            'Levels 60-90' : caap.group('60-90: ',30),
            'Levels 30-60' : caap.group('30-60: ',30),
            'Levels 1-30'  : caap.group('01-30: ',30)}
    */
        },
        'Hydra' : {
            duration : 168,
            ach : 500000,
            siege : 6,
            siegeClicks : [10, 20, 50, 100, 200, 300],
            siegeDam : [1340000, 2680000, 5360000, 14700000, 28200000, 37520000],
            siege_img : '/graphics/monster_siege_small'
    /*
            , levels : {
            'Levels 90+'   : caap.group('90+: '  ,30),
            'Levels 60-90' : caap.group('60-90: ',30),
            'Levels 30-60' : caap.group('30-60: ',30),
            'Levels 1-30'  : caap.group('01-30: ',40)}
    */
        },
        'Legion' : {
            duration : 168,
            ach : 1000,
            siege : 6,
            siegeClicks : [10, 20, 40, 80, 150, 300],
            siegeDam : [3000, 4500, 6000, 9000, 12000, 15000],
            siege_img : '/graphics/castle_siege_small',
            fort : true,
            staUse : 5,
            general : 'Orc King'
        },
        'Dragon' : {
            duration : 72,
            ach : 100000,
            siege : 0
        },
        'King' : {
            duration : 72,
            ach : 15000,
            siege : 0
        },
        'Terra' : {
            duration : 72,
            ach : 20000,
            siege : 0
        },
        'Queen' : {
            duration : 48,
            ach : 50000,
            siege : 1,
            siegeClicks : [11],
            siegeDam : [500000],
            siege_img : '/graphics/boss_sylvanas_drain_icon.gif'
        },
        'Ravenmoore' : {
            duration : 48,
            ach : 500000,
            siege : 0
        },
        'Knight' : {
            duration : 48,
            ach : 30000,
            siege : 0
        },
        'Serpent' : {
            duration : 72,
            ach : 250000,
            siege : 0,
            fort : true,
            staUse : 5,
            general : 'Orc King'
        },
        'Raid I' : {
            duration : 88,
            ach : 50,
            siege : 2,
            siegeClicks : [30, 50],
            siegeDam : [200, 500],
            siege_img : '/graphics/monster_siege_',
            staUse : 1
        },
        'Raid II' : {
            duration : 144,
            ach : 50,
            siege : 2,
            siegeClicks : [80, 100],
            siegeDam : [300, 1500],
            siege_img : '/graphics/monster_siege_',
            staUse : 1
        },
        'Mephistopheles' : {
            duration : 48,
            ach : 200000,
            siege : 0
        }
    },

    monster: {},

    monsterEngageButtons: {},

    completeButton: {},

    parseCondition: function (type, conditions) {
        if (!conditions || conditions.toLowerCase().indexOf(':' + type) < 0) {
            return 0;
        }

        var value = conditions.substring(conditions.indexOf(':' + type) + 4).replace(/:.+/, '');
        if (/k$/i.test(value) || /m$/i.test(value)) {
            var first = /\d+k/i.test(value);
            var second = /\d+m/i.test(value);
            value = parseInt(value, 10) * 1000 * (first + second * 1000);
        }

        return parseInt(value, 10);
    },

    getMonstType: function (name) {
        var words = name.split(" ");
        var count = words.length - 1;
        if (words[count] == 'Elemental') {
            return words[count - 1] + ' ' + words[count];
        }

        return words[count];
    },

    checkMonsterEngage: function () {
        if (!this.oneMinuteUpdate('monsterEngage')) {
            return;
        }

        // get all buttons to check monsterObjectList
        var ss = document.evaluate(".//img[contains(@src,'dragon_list_btn_')]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (ss.snapshotLength === 0) {
            return false;
        }

        var page = '';
        if (caap.CheckForImage('tab_monster_on.jpg')) {
            page = 'battle_monster';
        } else if (caap.CheckForImage('tab_raid_on.gif')) {
            page = 'raid';
        } else {
            return;
        }

        gm.log('In check ' + page + ' engage');

        var firstMonsterButtonDiv = caap.CheckForImage('dragon_list_btn_');
        if (!caapGlob.is_firefox) {
            if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user=' + gm.getValue('FBID', 'x')) ||
                                             firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
                gm.log('On another player\'s keep.');
                return false;
            }
        } else {
            if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user=' + unsafeWindow.Env.user) ||
                                             firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
                gm.log('On another player\'s keep.');
                return false;
            }
        }

        // Review monsters and find attack and fortify button
        var monsterList = [];
        for (var s = 0; s < ss.snapshotLength; s++) {
            var engageButtonName = ss.snapshotItem(s).src.match(/dragon_list_btn_\d/i)[0];
            var monsterRow = ss.snapshotItem(s).parentNode.parentNode.parentNode.parentNode;
            var monsterFull = nHtml.GetText(monsterRow).trim();
            var monster = monsterFull.replace('Completed!', '').replace(/Fled!/i, '').trim();
            monsterList.push(monster);
            // Make links for easy clickin'
            var url = ss.snapshotItem(s).parentNode.href;
            if (!(url && url.match(/user=/) && (url.match(/mpool=/) || url.match(/raid\.php/)))) {
                continue;
            }

            gm.setListObjVal('monsterOl', monster, 'page', page);
            switch (engageButtonName) {
            case 'dragon_list_btn_2' :
                gm.setListObjVal('monsterOl', monster, 'status', 'Collect Reward');
                gm.setListObjVal('monsterOl', monster, 'color', 'grey');
                break;
            case 'dragon_list_btn_3' :
                caap.monsterEngageButtons[monster] = ss.snapshotItem(s);
                break;
            case 'dragon_list_btn_4' :
                if (page == 'raid' && !(/!/.test(monsterFull))) {
                    caap.monsterEngageButtons[monster] = ss.snapshotItem(s);
                    break;
                }

                if (!caap.completeButton[page]) {
                    caap.completeButton[page] = this.CheckForImage('cancelButton.gif', monsterRow);
                }

                gm.setListObjVal('monsterOl', monster, 'status', 'Complete');
                gm.setListObjVal('monsterOl', monster, 'color', 'grey');
                break;
            default :
                break;
            }

            var mpool = ((url.match(/mpool=\d+/i)) ? '&mpool=' + url.match(/mpool=\d+/i)[0].split('=')[1] : '');
            var monstType = this.getMonstType(monster);
            var siege = '';
            if (monstType == 'Siege') {
                siege = "&action=doObjective";
            } else {
                var boss = caap.bosses[monstType];
                siege = (boss && boss.siege) ? "&action=doObjective" : '';
            }

            var link = "<a href='http://apps.facebook.com/castle_age/" + page + ".php?user=" + url.match(/user=\d+/i)[0].split('=')[1] + mpool + siege + "'>Link</a>";
            gm.setListObjVal('monsterOl', monster, 'Link', link);
        }

        gm.getList('monsterOl').forEach(function (monsterObj) {
            var monster = monsterObj.split(caapGlob.vs)[0];
            if (monsterObj.indexOf(caapGlob.vs + 'page' + caapGlob.ls) < 0) {
                gm.deleteListObj('monsterOl', monster);
            } else if (monsterList.indexOf(monster) < 0 && monsterObj.indexOf('page' + caapGlob.ls + page) >= 0) {
                gm.deleteListObj('monsterOl', monster);
            }
        });

        gm.setValue('resetdashboard', true);
    },

    checkMonsterDamage: function () {
        // Check if on monster page
        var webSlice = caap.CheckForImage('dragon_title_owner.jpg');
        if (!webSlice) {
            return;
        }

        if (!caap.oneMinuteUpdate('monsterDamage')) {
            return;
        }

        gm.log('Checking monster damage');
        // Get name and type of monster
        var monster = nHtml.GetText(webSlice);
        monster = monster.substring(0, monster.indexOf('You have (')).trim();
        var fort = null;
        var monstType = '';
        if (caap.CheckForImage('raid_1_large.jpg')) {
            monstType = 'Raid I';
        } else if (caap.CheckForImage('raid_b1_large.jpg')) {
            monstType = 'Raid II';
        } else {
            monstType = caap.getMonstType(monster);
        }

        if (!caapGlob.is_firefox) {
            if (nHtml.FindByAttrContains(webSlice, 'a', 'href', 'id=' + gm.getValue('FBID', 'x'))) {
                monster = monster.replace(/.+'s /, 'Your ');
            }
        } else {
            if (nHtml.FindByAttrContains(webSlice, 'a', 'href', 'id=' + unsafeWindow.Env.user)) {
                monster = monster.replace(/.+'s /, 'Your ');
            }
        }

        var lastDamDone = gm.getListObjVal('monsterOl', monster, 'Damage', 0);
        gm.setListObjVal('monsterOl', monster, 'Type', monstType);
        // Extract info
        var time = [];
        var boss_name = '';
        var boss = '';
        var group_name = '';
        var attacker = '';
        var phase = '';
        // Check for mana forcefield
        var img = caap.CheckForImage('bar_dispel');
        if (img) {
            var manaHealth = img.parentNode.style.width;
            manaHealth = manaHealth.substring(0, manaHealth.length - 1);
            manaHealth = 100 - Number(manaHealth);
            gm.setListObjVal('monsterOl', monster, 'Fort%', (Math.round(manaHealth * 10)) / 10);
        }

        // Check fortify stuff
        img = caap.CheckForImage('seamonster_ship_health');
        if (img) {
            var shipHealth = img.parentNode.style.width;
            shipHealth = shipHealth.substring(0, shipHealth.length - 1);
            if (monstType == "Legion" || monstType.indexOf('Elemental') >= 0) {
                img = caap.CheckForImage('repair_bar_grey');
                if (img) {
                    var extraHealth = img.parentNode.style.width;
                    extraHealth = extraHealth.substring(0, extraHealth.length - 1);
                    shipHealth = Math.round(Number(shipHealth) * (100 / (100 - Number(extraHealth))));
                }
            }

            gm.setListObjVal('monsterOl', monster, 'Fort%', (Math.round(shipHealth * 10)) / 10);
        }

        var damDone = 0;
        // Get damage done to monster
        webSlice = nHtml.FindByAttrContains(document.body, "td", "class", "dragonContainer");
        if (webSlice) {
            webSlice = nHtml.FindByAttrContains(webSlice, "td", "valign", "top");
            if (webSlice) {
                if (!caapGlob.is_firefox) {
                    webSlice = nHtml.FindByAttrContains(webSlice, "a", "href", "keep.php?user=" + gm.getValue('FBID', 'x'));
                } else {
                    webSlice = nHtml.FindByAttrContains(webSlice, "a", "href", "keep.php?user=" + unsafeWindow.Env.user);
                }

                if (webSlice) {
                    if (monstType == "Serpent" || monstType.indexOf('Elemental') >= 0 || monstType == "Deathrune") {
                        var damList = nHtml.GetText(webSlice.parentNode.nextSibling.nextSibling).trim().split("/");
                        gm.setListObjVal('monsterOl', monster, 'Damage', caap.NumberOnly(damList[0]));
                        fort = caap.NumberOnly(damList[1]);
                        gm.setListObjVal('monsterOl', monster, 'Fort', fort);
                    } else {
                        gm.setListObjVal('monsterOl', monster, 'Damage', caap.NumberOnly(nHtml.GetText(webSlice.parentNode.nextSibling.nextSibling).trim()));
                    }

                    damDone = gm.getListObjVal('monsterOl', monster, 'Damage');
                    //if (damDone) gm.log("Damage done = " + gm.getListObjVal('monsterOl',monster,'Damage'));
                } else {
                    gm.log("Player hasn't done damage yet");
                }
            } else {
                gm.log("couldn't get top table");
            }
        } else {
            gm.log("couldn't get dragoncontainer");
        }

        var monsterTicker = nHtml.FindByAttrContains(document.body, "div", "id", "app46755028429_monsterTicker");
        if (monsterTicker) {
            //gm.log("Monster ticker found.");
            time = $("#app46755028429_monsterTicker").text().split(":");
        } else {
            gm.log("Could not locate Monster ticker.");
        }

        var monsterConditions = gm.getListObjVal('monsterOl', monster, 'conditions', '');
        if (/:ac\b/.test(monsterConditions)) {
            var counter = parseInt(gm.getValue('monsterReviewCounter', -3), 10);
            var monsterList = gm.getList('monsterOl');
            if (counter >= 0 && monsterList[counter].indexOf(monster) >= 0 &&
                (nHtml.FindByAttrContains(document.body, 'a', 'href', '&action=collectReward') ||
                 nHtml.FindByAttrContains(document.body, 'input', 'alt', 'Collect Reward'))) {
                gm.log('Collecting Reward');
                gm.setValue('monsterReviewCounter', counter - 1);
                gm.setListObjVal('monsterOl', monster, 'status', 'Collect Reward');
                if (monster.indexOf('Siege') >= 0) {
                    if (nHtml.FindByAttrContains(document.body, 'a', 'href', '&rix=1')) {
                        gm.setListObjVal('monsterOl', monster, 'rix', 1);
                    } else {
                        gm.setListObjVal('monsterOl', monster, 'rix', 2);
                    }
                }
            }
        }

        var hp = 0;
        if (time.length == 3  && caap.CheckForImage('monster_health_background.jpg')) {
            gm.setListObjVal('monsterOl', monster, 'TimeLeft', time[0] + ":" + time[1]);
            var hpBar = null;
            var imgHealthBar = nHtml.FindByAttrContains(document.body, "img", "src", "monster_health_background.jpg");
            if (imgHealthBar) {
                //gm.log("Found monster health div.");
                var divAttr = imgHealthBar.parentNode.getAttribute("style").split(";");
                var attrWidth = divAttr[1].split(":");
                hpBar = attrWidth[1].trim();
            } else {
                gm.log("Could not find monster health div.");
            }

            if (hpBar) {
                hp = Math.round(hpBar.replace(/%/, '') * 10) / 10; //fix two 2 decimal places
                gm.setListObjVal('monsterOl', monster, 'Damage%', hp);
                boss = caap.bosses[monstType];
                if (!boss) {
                    gm.log('Unknown monster');
                    return;
                }

                var T2K = (100 / (100 - hp)) * (boss.duration - (parseInt(time[0], 10) + (parseInt(time[1], 10) * 0.0166)));
                T2K = Math.round(T2K * 10) / 10; //fix two 1 decimal place
                gm.setListObjVal('monsterOl', monster, 'T2K', T2K.toString() + ' hr');
            }

            if (boss && boss.siege) {
                var miss = '';
                if (monstType.indexOf('Raid') >= 0) {
                    miss = $("img[src*=" + boss.siege_img + "]").parent().parent().text().replace(/.*:\s*Need (\d+) more to launch/, "$1").trim();
                } else {
                    miss = $.trim($("#app46755028429_action_logs").prev().children().eq(3).children().eq(2).children().eq(1).text().replace(/.*:\s*Need (\d+) more answered calls to launch/, "$1"));
                }

                var currentPhase = 0;
                var divSeigeLogs = document.getElementById("app46755028429_siege_log").getElementsByTagName("div").length;
                if (divSeigeLogs) {
                    //gm.log("Found siege logs.");
                    currentPhase = Math.round(divSeigeLogs / 4) + 1;
                } else {
                    gm.log("Could not find siege logs.");
                }

                var phaseText = Math.min(currentPhase, boss.siege) + "/" + boss.siege + " need " + (isNaN(+miss) ? 0 : miss);
                gm.setListObjVal('monsterOl', monster, 'Phase', phaseText);
            }
        } else {
            gm.log('Monster is dead?');
            gm.setValue('resetselectMonster', true);
            return;
        }

        boss = caap.bosses[monstType];
        var achLevel = null;
        if (boss) {
            achLevel = caap.parseCondition('ach', monsterConditions) || boss.ach;
        } else {
            achLevel = caap.parseCondition('ach', monsterConditions);
        }

        var maxDamage = caap.parseCondition('max', monsterConditions);
        var fortPct = gm.getListObjVal('monsterOl', monster, 'Fort%', '');
        var isTarget = (monster == gm.getValue('targetFromraid', '') || monster == gm.getValue('targetFrombattle_monster', ''));
        if (maxDamage && damDone >= maxDamage) {
            gm.setListObjVal('monsterOl', monster, 'color', 'red');
            gm.setListObjVal('monsterOl', monster, 'over', 'max');
            if (isTarget) {
                gm.setValue('resetselectMonster', true);
            }
        } else if ((fortPct) && fortPct < caap.GetNumber('MinFortToAttack', 1) && hp && fortPct < hp) {
            gm.setListObjVal('monsterOl', monster, 'color', 'purple');
            if (isTarget) {
                gm.setValue('resetselectMonster', true);
            }
        } else if (damDone >= achLevel && gm.getValue('AchievementMode')) {
            gm.setListObjVal('monsterOl', monster, 'color', 'orange');
            gm.setListObjVal('monsterOl', monster, 'over', 'ach');
            if (isTarget && lastDamDone < achLevel)	{
                gm.setValue('resetselectMonster', true);
            }
        } else {
            gm.setListObjVal('monsterOl', monster, 'color', 'black');
        }

        gm.setValue('resetdashboard', true);
    },

    selectMonster: function () {
        if (!this.oneMinuteUpdate('selectMonster')) {
            return;
        }

    //  gm.log('Selecting monster');
        // First we forget everything about who we already picked.
        gm.setValue('targetFrombattle_monster', '');
        gm.setValue('targetFromfortify', '');
        gm.setValue('targetFromraid', '');

        // Next we get our monster objects from the reposoitory and break them into separarte lists
        // for monster or raid.  If we are serializing then we make one list only.
        var monsterList = {};
        monsterList.battle_monster = [];
        monsterList.raid = [];
        monsterList.any = [];
        var monsterFullList = gm.getList('monsterOl', '');
        var monstPage = '';
        monsterFullList.forEach(function (monsterObj) {
            gm.setListObjVal('monsterOl', monsterObj.split(caapGlob.vs)[0], 'conditions', 'none');
            monstPage = gm.getObjVal(monsterObj, 'page');
            if (gm.getValue('SerializeRaidsAndMonsters', false)) {
                monsterList.any.push(monsterObj);
            } else if ((monstPage == 'raid') || (monstPage == 'battle_monster')) {
                monsterList[monstPage].push(monsterObj);
            }
        });

        //PLEASE NOTE BEFORE CHANGING
        //The Serialize Raids and Monsters dictates a 'single-pass' because we only need select
        //one "targetFromxxxx" to fill in. The other MUST be left blank. This is what keeps it
        //serialized!!! Trying to make this two pass logic is like trying to fit a square peg in
        //a round hole. Please reconsider before doing so.
        var selectTypes = [];
        if (gm.getValue('SerializeRaidsAndMonsters', false)) {
            selectTypes = ['any'];
        } else {
            selectTypes = ['battle_monster', 'raid'];
        }

        // We loop through for each selection type (only once if serialized between the two)
        // We then read in the users attack order list
        for (var s in selectTypes) {
            if (selectTypes.hasOwnProperty(s)) {
                var selectType = selectTypes[s];
                var firstOverAch = '';
                var firstUnderMax = '';
                var attackOrderList = [];
                // The extra apostrophe at the end of attack order makes it match any "soandos's monster" so it always selects a monster if available
                if (selectType == 'any') {
                    var attackOrderList1 = gm.getValue('orderbattle_monster', '').split(/[\n,]/);
                    var attackOrderList2 = gm.getValue('orderraid', '').split(/[\n,]/).concat('your', "'");
                    attackOrderList = attackOrderList1.concat(attackOrderList2);
                } else {
                    attackOrderList = gm.getValue('order' + selectType, '').split(/[\n,]/).concat('your', "'");
                }

                var monster = '';
                var monsterConditions = '';
                // Next we step through the users list getting the name and conditions
                for (var p in attackOrderList) {
                    if (attackOrderList.hasOwnProperty(p)) {
                        if (!(attackOrderList[p].trim())) {
                            continue;
                        }

                        var attackOrderName = attackOrderList[p].match(/^[^:]+/).toString().trim().toLowerCase();
                        monsterConditions = attackOrderList[p].replace(/^[^:]+/, '').toString().trim();
                        var monsterListCurrent = monsterList[selectType];
                        // Now we try to match the users name agains our list of monsters
                        for (var m in monsterListCurrent) {
                            if (monsterListCurrent.hasOwnProperty(m)) {
                                var monsterObj = monsterListCurrent[m];
                                monster = monsterObj.split(caapGlob.vs)[0];
                                monstPage = gm.getObjVal(monsterObj, 'page');

                                // If we set conditions on this monster already then we do not reprocess
                                if (gm.getListObjVal('monsterOl', monster, 'conditions') != 'none') {
                                    continue;
                                }

                                //If this monster does not match, skip to next one
                                // Or if this monster is dead, skip to next one
                                // Or if this monster is not the correct type, skip to next one
                                if ((monster.toLowerCase().indexOf(attackOrderName) < 0) || (selectType != 'any' && monstPage != selectType)) {
                                    continue;
                                }

                                //Monster is a match so we set the conditions
                                gm.setListObjVal('monsterOl', monster, 'conditions', monsterConditions);

                                // If it's complete or collect rewards, no need to process further
                                if (gm.getObjVal(monsterObj, 'status')) {
                                    continue;
                                }

                                // checkMonsterDamage would have set our 'color' and 'over' values. We need to check
                                // these to see if this is the monster we should select/
                                var color = gm.getObjVal(monsterObj, 'color', '');
                                var over = gm.getObjVal(monsterObj, 'over', '');
                                if (!firstUnderMax) {
                                    if (over != 'max' && color != 'purple') {
                                        if (over != 'ach') {
                                            firstUnderMax = monster;
                                        } else if (!firstOverAch) {
                                            firstOverAch = monster;
                                        }
                                    }
                                }

                                // If this a monster we need to fortify we check to see if it is under our threshold.
                                var monsterFort = parseFloat(gm.getObjVal(monsterObj, 'Fort%', 100));
                                var maxToFortify = caap.parseCondition('f%', monsterConditions) || caap.GetNumber('MaxToFortify', 0);
                                if (monsterFort < maxToFortify && !gm.getValue('targetFromfortify', '')) {
                                    gm.setValue('targetFromfortify', monster);
                                }
                            }
                        }
                    }
                }

                // Now we use the first under max/under achivment that we found. If we didn't find any under
                // achievement then we use the first over achievement
                monster = firstUnderMax;
                if (!monster) {
                    monster = firstOverAch;
                }

                // If we've got a monster for this selection type then we set the GM variables for the name
                // and stamina requirements
                if (monster) {
                    monstPage = gm.getListObjVal('monsterOl', monster, 'page');
                    gm.setValue('targetFrom' + monstPage, monster);
                    monsterConditions = gm.getListObjVal('monsterOl', monster, 'conditions');
                    var monstType = gm.getListObjVal('monsterOl', monster, 'Type', 'Dragon');
                    if (monstPage == 'battle_monster') {
                        if (caap.bosses[monstType] && caap.bosses[monstType].staUse) {
                            gm.setValue('MonsterStaminaReq', caap.bosses[monstType].staUse);
                        } else if ((caap.InLevelUpMode() && caap.stats.stamina.num >= 10) || monsterConditions.match(/:pa/i)) {
                            gm.setValue('MonsterStaminaReq', 5);
                        } else if (monsterConditions.match(/:sa/i)) {
                            gm.setValue('MonsterStaminaReq', 1);
                        } else if (gm.getValue('PowerAttack')) {
                            gm.setValue('MonsterStaminaReq', 5);
                        } else {
                            gm.setValue('MonsterStaminaReq', 1);
                        }

                        if (gm.getValue('MonsterGeneral') == 'Orc King' && gm.getValue('OrcKingPowerAttack', false)) {
                            gm.setValue('MonsterStaminaReq', gm.getValue('MonsterStaminaReq') * 5);
                        }
                    } else {
                        // Switch RaidPowerAttack
                        if (gm.getValue('RaidPowerAttack', false) || monsterConditions.match(/:pa/i)) {
                            gm.setValue('RaidStaminaReq', 5);
                        } else if (caap.bosses[monstType] && caap.bosses[monstType].staUse) {
                            gm.setValue('RaidStaminaReq', caap.bosses[monstType].staUse);
                        } else {
                            gm.setValue('RaidStaminaReq', 1);
                        }
                    }
                }
            }
        }

        gm.setValue('resetdashboard', true);
    },

    monsterConfirmRightPage: function (webSlice, monster) {
        // Confirm name and type of monster
        var monsterOnPage = nHtml.GetText(webSlice);
        monsterOnPage = monsterOnPage.substring(0, monsterOnPage.indexOf('You have (')).trim();
        if (!caapGlob.is_firefox) {
            if (nHtml.FindByAttrContains(webSlice, 'a', 'href', 'id=' + gm.getValue('FBID', 'x'))) {
                monsterOnPage = monsterOnPage.replace(/.+'s /, 'Your ');
            }
        } else {
            if (nHtml.FindByAttrContains(webSlice, 'a', 'href', 'id=' + unsafeWindow.Env.user)) {
                monsterOnPage = monsterOnPage.replace(/.+'s /, 'Your ');
            }
        }

        if (monster != monsterOnPage) {
            gm.log('Looking for ' + monster + ' but on ' + monsterOnPage + '. Going back to select screen');
            var monstPage = gm.getListObjVal('monsterOl', monster, 'page');
            return this.NavigateTo('keep,' + monstPage);
        }
    },

    MonsterReview: function () {
        // Review all active monsters, try siege weapons on the way
        var counter = parseInt(gm.getValue('monsterReviewCounter', -3), 10);
        //gm.log("this.WhileSinceDidIt('monsterReview',60*60) && counter >=-1   && (this.CheckStamina('Monster',1) || gm.getValue('monsterReview')==0) " + this.WhileSinceDidIt('monsterReview',60*60) +' '+ counter +' '+ this.stats.stamina.num > 0 +' '+ gm.getValue('monsterReview'));
        if (this.WhileSinceDidIt('monsterReview', 60 * 60) && counter >= -1 && (this.stats.stamina.num > 0 || gm.getValue('monsterReview') === 0)) {
            // Check raids and monster individual pages
            var monsterObjList = gm.getList('monsterOl');
            while (++counter < monsterObjList.length) {
                var monsterObj = monsterObjList[counter];
                if (!monsterObj) {
                    continue;
                }

                var monster = monsterObj.split(caapGlob.vs)[0];
                this.SetDivContent('battle_mess', 'Reviewing/sieging ' + counter + '/' + monsterObjList.length + ' ' + monster);
                gm.setValue('monsterReviewCounter', counter);
                var link = gm.getObjVal(monsterObj, 'Link');
                if (/href/.test(link)) {
                    link = link.split("'")[1];
                    var conditions = gm.getObjVal(monsterObj, 'conditions');
                    if ((conditions) && (/:ac\b/.test(conditions)) && gm.getObjVal(monsterObj, 'status') == 'Collect Reward') {
                        link += '&action=collectReward';
                        if (monster.indexOf('Siege') >= 0) {
                            link += '&rix=' + gm.getObjVal(monsterObj, 'rix', '2');
                        }
                    } else if (((conditions) && (conditions.match(':!s'))) || !gm.getValue('DoSiege', true) || this.stats.stamina.num === 0) {
                        link = link.replace('&action=doObjective', '');
                    }

                    gm.log('MonsterObj ' + counter + '/' + monsterObjList.length + ' monster ' + monster + ' conditions ' + conditions + ' link ' + link);
                    gm.setValue('resetmonsterDamage', true);
                    gm.setValue('ReleaseControl', true);
                    caap.VisitUrl(link);
                    return true;
                }
            }

            this.JustDidIt('monsterReview');
            gm.setValue('resetselectMonster', true);
            gm.log('Done with monster/raid review.');
            gm.setValue('monsterReviewCounter', -3);
        }

        return false;
    },

    Monsters: function () {
    ///////////////// Reivew/Siege all monsters/raids \\\\\\\\\\\\\\\\\\\\\\

        if (!this.CheckNotHiding("Monster") && this.CheckStamina('Monster', 1)) {
            gm.log("Not Hiding Mode: We're not safe. Go battle.");
            this.SetDivContent('battle_mess', 'Not Safe For Monster. Battle!');
            return false;
        }

        var counter = parseInt(gm.getValue('monsterReviewCounter', -3), 10);
        if (this.WhileSinceDidIt('monsterReview', 60 * 60) && counter < -1 && (this.stats.stamina.num > 0 || gm.getValue('monsterReview') === 0)) {
            // Check Monster page
            if (counter == -3) {
                gm.setValue('monsterOl', '');
                gm.setValue('resetmonsterEngage', true);
                gm.setValue('monsterReviewCounter', ++counter);
                return this.NavigateTo('battle_monster');
            }

            if (counter == -2) {
                if (this.NavigateTo(this.battlePage + ',raid', 'tab_raid_on.gif')) {
                    gm.setValue('resetmonsterEngage', true);
                    return true;
                }

                // Read in conditions like no siege and auto collect
                gm.setValue('monsterReviewCounter', ++counter);
                gm.setValue('resetselectMonster', true);
            }
        }

        if (!this.WhileSinceDidIt('NotargetFrombattle_monster', 60)) {
            return false;
        }

    ///////////////// Individual Monster Page \\\\\\\\\\\\\\\\\\\\\\

    // Establish a delay timer when we are 1 stamina below attack level. Timer includes 5 min for stamina tick plus user defined random interval
        if (!this.InLevelUpMode() && this.stats.stamina.num == (gm.getValue('MonsterStaminaReq', 1) - 1) && this.CheckTimer('battleTimer') && gm.getValue('seedTime', 0) > 0) {
            this.SetTimer('battleTimer', 5 * 60 + Math.floor(Math.random() * gm.getValue('seedTime', 0)));
            this.SetDivContent('battle_mess', 'Monster Delay Until ' + this.DisplayTimer('battleTimer'));
            return false;
        }

        if (!this.CheckTimer('battleTimer')) {
            if (this.stats.stamina.num < gm.getValue('MaxIdleStamina', this.stats.stamina.max)) {
                this.SetDivContent('fight_mess', 'Monster Delay Until ' + this.DisplayTimer('battleTimer'));
                return false;
            }
        }

        var fightMode = '';
        // Check to see if we should fortify, attack monster, or battle raid
        var monster = gm.getValue('targetFromfortify');
        if (monster && this.stats.energy.num >= 10) {
            fightMode = gm.setValue('fightMode', 'Fortify');
        } else {
            monster = gm.getValue('targetFrombattle_monster');
            if (monster && this.CheckStamina('Monster', gm.getValue('MonsterStaminaReq', 1)) && gm.getListObjVal('monsterOl', monster, 'page') == 'battle_monster') {
                fightMode = gm.setValue('fightMode', 'Monster');
            } else {
                return false;
            }
        }

        // Set right general
        var monstType = gm.getListObjVal('monsterOl', monster, 'Type', 'Dragon');
        if (this.SelectGeneral(fightMode + 'General')) {
            return true;
        }

        // Check if on engage monster page
        var webSlice = this.CheckForImage('dragon_title_owner.jpg');
        if (webSlice) {
            if (this.monsterConfirmRightPage(webSlice, monster)) {
                return true;
            }

            var attackButton = null;
            // Find the attack or fortify button
            if (fightMode == 'Fortify') {
                attackButton = this.CheckForImage('seamonster_fortify.gif');
                if (!attackButton) {
                    attackButton = this.CheckForImage('button_dispel.gif');
                    if (!attackButton) {
                        attackButton = this.CheckForImage('attack_monster_button3.jpg');
                    }
                }
            } else if (gm.getValue('MonsterStaminaReq', 1) == 1) {
                // not power attack only normal attacks
                attackButton = this.CheckForImage('attack_monster_button.jpg');
                if (!attackButton) {
                    attackButton = this.CheckForImage('event_attack1.gif');
                    if (!attackButton) {
                        attackButton = this.CheckForImage('seamonster_power.gif');
                        if (!attackButton) {
                            attackButton = this.CheckForImage('event_attack2.gif');
                            if (!attackButton) {
                                attackButton = this.CheckForImage('attack_monster_button2.jpg');
                            }

                            if (attackButton) {
                                gm.setValue('MonsterStaminaReq', 5);
                            }
                        }
                    }
                }
            } else {
                // power attack or if not seamonster power attack or if not regular attack - need case for seamonster regular attack?
                attackButton = this.CheckForImage('attack_monster_button2.jpg');
                if (!attackButton) {
                    attackButton = this.CheckForImage('event_attack2.gif');
                    if (!attackButton) {
                        attackButton = this.CheckForImage('seamonster_power.gif');
                        if (!attackButton) {
                            attackButton = this.CheckForImage('event_attack1.gif');
                            if (!attackButton) {
                                attackButton = this.CheckForImage('attack_monster_button.jpg');
                            }

                            if (attackButton) {
                                gm.setValue('MonsterStaminaReq', 1);
                            }
                        }
                    }
                }
            }

            if (attackButton) {
                var attackMess = '';
                if (fightMode == 'Fortify') {
                    attackMess = 'Fortifying ' + monster;
                } else {
                    attackMess = (gm.getValue('MonsterStaminaReq', 1) >= 5 ? 'Power' : 'Single') + ' Attacking ' + monster;
                }

                gm.log(attackMess);
                this.SetDivContent('battle_mess', attackMess);
                gm.setValue('ReleaseControl', true);
                gm.setValue('resetmonsterDamage', true);
                caap.Click(attackButton, 8000);
                return true;
            }
        }

    ///////////////// Check For Monster Page \\\\\\\\\\\\\\\\\\\\\\

        if (this.NavigateTo('keep,battle_monster', 'tab_monster_on.jpg')) {
            gm.setValue('resetmonsterEngage', true);
            return true;
        }

        if (gm.getValue('clearCompleteMonsters', false) && this.completeButton.battle_monster) {
            caap.Click(this.completeButton.battle_monster, 1000);
            gm.log('Cleared a completed monster');
            this.completeButton.battle_monster = '';
            gm.setValue('resetmonsterEngage', true);
            return true;
        }

        var firstMonsterButtonDiv = this.CheckForImage('dragon_list_btn_');
        if (!caapGlob.is_firefox) {
            if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user=' + gm.getValue('FBID', 'x')) ||
                                             firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
                gm.log('On another player\'s keep.');
                return this.NavigateTo('keep,battle_monster');
            }
        } else {
            if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user=' + unsafeWindow.Env.user) ||
                                             firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
                gm.log('On another player\'s keep.');
                return this.NavigateTo('keep,battle_monster');
            }
        }

        var engageButton = this.monsterEngageButtons[monster];
        if (engageButton) {
            this.SetDivContent('battle_mess', 'Opening ' + monster);
            caap.Click(engageButton);
            gm.setValue('resetmonsterDamage', true);
            return true;
        } else {
            this.JustDidIt('NotargetFrombattle_monster');
            gm.log('No "Engage" button for ' + monster);
            return false;
        }
    },

    /////////////////////////////////////////////////////////////////////
    //                          COMMON FIGHTING FUNCTIONS
    /////////////////////////////////////////////////////////////////////

    DemiPoints: function () {
        if (!gm.getValue('DemiPointsFirst')) {
            return false;
        }

        if (this.CheckForImage('battle_on.gif')) {
            var smallDeity = this.CheckForImage('symbol_tiny_1.jpg');
            if (smallDeity) {
                var demiPointList = nHtml.GetText(smallDeity.parentNode.parentNode.parentNode).match(/\d+ \/ 10/g);
                gm.setList('DemiPointList', demiPointList);
                gm.log('DemiPointList: ' + demiPointList);
                if (this.CheckTimer('DemiPointTimer')) {
                    gm.log('Set DemiPointTimer to 24 hours, and check if DemiPoints done');
                    this.SetTimer('DemiPointTimer', 6 * 60 * 60);
                }

                gm.setValue('DemiPointsDone', true);
                for (var demiPtItem in demiPointList) {
                    if (demiPointList.hasOwnProperty(demiPtItem)) {
                        if (demiPointList[demiPtItem] != '10 / 10' && gm.getValue('DemiPoint' + demiPtItem)) {
                            gm.setValue('DemiPointsDone', false);
                            break;
                        }
                    }
                }

                gm.log('Demi Point Timer ' + this.DisplayTimer('DemiPointTimer') + ' demipoints done is  ' + gm.getValue('DemiPointsDone', false));
            }
        }

        if (this.CheckTimer('DemiPointTimer')) {
            return this.NavigateTo(this.battlePage, 'battle_on.gif');
        }

        if (!gm.getValue('DemiPointsDone', true)) {
            return this.Battle('DemiPoints');
        }
    },

    minutesBeforeLevelToUseUpStaEnergy : 5,

    InLevelUpMode: function () {
        if (!gm.getValue('EnableLevelUpMode', true)) {
            return false;
        }

        if (!(this.stats.levelTime)) {
            return false;
        }

        var now = new Date();
        if ((this.stats.levelTime.getTime() - now.getTime()) < this.minutesBeforeLevelToUseUpStaEnergy * 60 * 1000) {
            return true;
        }

        return false;
    },

    CheckStamina: function (battleOrBattle, attackMinStamina) {
        if (!attackMinStamina) {
            attackMinStamina = 1;
        }

        var when = gm.getValue('When' + battleOrBattle, '');
        if (when == 'Never') {
            return false;
        }

        if (!this.stats.stamina || !this.stats.health) {
            this.SetDivContent('battle_mess', 'Health or stamina not known yet.');
            return false;
        }

        if (this.stats.health.num < 10) {
            this.SetDivContent('battle_mess', "Need health to " + battleOrBattle.toLowerCase() + ": " + this.stats.health.num + "/10");
            return false;
        }

        if (when == 'At X Stamina') {
            var staminaMF = battleOrBattle + 'Stamina';
            if (gm.getValue('BurnMode_' + staminaMF, false) || this.stats.stamina.num >= gm.getValue('X' + staminaMF, 1)) {
                if (this.stats.stamina.num < attackMinStamina || this.stats.stamina.num <= gm.getValue('XMin' + staminaMF, 0)) {
                    gm.setValue('BurnMode_' + staminaMF, false);
                    return false;
                }

                this.SetDivContent('battle_mess', 'Burning stamina');
                gm.setValue('BurnMode_' + staminaMF, true);
                return true;
            } else {
                gm.setValue('BurnMode_' + staminaMF, false);
            }

            if (this.InLevelUpMode() && this.stats.stamina.num >= attackMinStamina) {
                this.SetDivContent('battle_mess', 'Burning stamina to level up');
                return true;
            }

            this.SetDivContent('battle_mess', 'Waiting for stamina: ' + this.stats.stamina.num + "/" + gm.getValue('X' + staminaMF, 1));
            return false;
        }

        if (when == 'At Max Stamina') {
            if (!gm.getValue('MaxIdleStamina', 0)) {
                gm.log("Changing to idle general to get Max Stamina");
                this.PassiveGeneral();
            }

            if (this.stats.stamina.num >= gm.getValue('MaxIdleStamina')) {
                this.SetDivContent('battle_mess', 'Using max stamina');
                return true;
            }

            if (this.InLevelUpMode() && this.stats.stamina.num >= attackMinStamina) {
                this.SetDivContent('battle_mess', 'Burning all stamina to level up');
                return true;
            }

            this.SetDivContent('battle_mess', 'Waiting for max stamina: ' + this.stats.stamina.num + "/" + gm.getValue('MaxIdleStamina'));
            return false;
        }

        if (this.stats.stamina.num >= attackMinStamina) {
            return true;
        }

        this.SetDivContent('battle_mess', 'Waiting for more stamina: ' + this.stats.stamina.num + "/" + attackMinStamina);
        return false;
    },

    CheckNotHiding: function (attackType) {
        if ((gm.getValue('WhenBattle') != "Not Hiding") || (gm.getValue('WhenMonster') != "Not Hiding")) {
            return true;
        }

        var chainButton = null;
        if (gm.getValue('BattleType') == 'Invade') {
            chainButton = this.CheckForImage('battle_invade_again.gif');
        } else {
            chainButton = this.CheckForImage('battle_duel_again.gif');
        }

        if (chainButton) {
            if (attackType == "Monster") {
                return false;
            }

            if (attackType == "Battle") {
                return true;
            }
        }

        if (gm.getValue('TargetType') == 'Raid' && !gm.getValue('targetFromraid', '')) {
            if (attackType == "Monster") {
                return true;
            }

            if (attackType == "Battle") {
                return false;
            }
        }

        // The lower the risk constant, the more you stay in hiding
        var riskConstant = 1.7;
        // Formula to calculate when to use your stamina for hiding
        // If (health - (estimated dmg from next atack) puts us below 10)  AND (current stamina can reach 5 using staminatime/healthtime ratio) then stamina can be used/saved for Monster

        if ((this.stats.health.num - ((this.stats.stamina.num - 1) * riskConstant) < 10) && (this.stats.stamina.num * (5 / 3) >= 5)) {
            if (attackType == "Monster") {
                return true;
            }

            if ((attackType == "Battle") && (!gm.getValue('targetFrombattle_monster'))) {
                return true;
            }

            return false;
        } else {
            if (attackType == "Battle") {
                return true;
            }

            return false;
        }
    },

    /////////////////////////////////////////////////////////////////////
    //                          MONSTER FINDER
    /////////////////////////////////////////////////////////////////////

    monstArgs: {
        'doaid': {
            fname: 'Any Weapon Aid',
            sname: 'Aid',
            urlid: 'doObjective'
        },
        'urlix': {
            fname: 'Any Monster',
            sname: 'Any',
            urlid: 'user'
        },
        'legio': {
            fname: 'Battle of the Dark Legion',
            sname: 'Legion',
            nname: 'castle',
            imgid: 'cta_castle_',
            twt2: 'corc_'
        },
        'hydra': {
            fname: 'Cronus, The World Hydra ',
            sname: 'Cronus',
            nname: 'hydra',
            imgid: 'twitter_hydra_objective',
            twt2: 'hydra_'
        },
        /*
        'elems': {
            fname: 'Any Elemental',
            sname:'Elemental',
            nname:'elems',
            imgid:'',
            twt2: ''
        },
        */
        'earth': {
            fname: 'Genesis, The Earth Elemental ',
            sname: 'Genesis',
            nname: 'earthelemental',
            imgid: 'cta_earth_',
            twt2: 'earth_'
        },
        'ice': {
            fname: 'Ragnarok, The Ice Elemental ',
            sname: 'Ragnarok',
            nname: 'iceelemental',
            imgid: 'cta_water_',
            twt2: 'water_'
        },
        'kull': {
            fname: 'Kull, the Orc Captain',
            sname: 'Kull',
            nname: 'captain',
            imgid: 'cta_orc_captain.gif',
            twt2: 'bosscaptain'
        },
        'gilda': {
            fname: 'Gildamesh, the Orc King',
            sname: 'Gildamesh',
            nname: 'king',
            imgid: 'cta_orc_king.gif',
            twt2: 'bossgilda'
        },
        'colos': {
            fname: 'Colossus of Terra',
            sname: 'Colossus',
            nname: 'stone',
            imgid: 'cta_stone.gif',
            twt2: 'bosscolossus'
        },
        'sylva': {
            fname: 'Sylvanas the Sorceress Queen',
            sname: 'Sylvanas',
            nname: 'sylvanas',
            imgid: 'cta_sylvanas.gif',
            twt2: 'bosssylvanus'
        },
        'mephi': {
            fname: 'Mephistophles',
            sname: 'Mephisto',
            nname: 'mephi',
            imgid: 'cta_mephi.gif',
            twt2: 'bossmephistopheles'
        },
        'keira': {
            fname: 'Keira',
            sname: 'keira',
            nname: 'keira',
            imgid: 'cta_keira.gif',
            twt2: 'boss_img'
        },
        'lotus': {
            fname: 'Lotus Ravenmoore',
            sname: 'Ravenmoore',
            nname: 'lotus',
            imgid: 'cta_lotus.gif',
            twt2: 'bosslotus_'
        },
        'skaar': {
            fname: 'Skaar Deathrune',
            sname: 'Deathrune',
            nname: 'skaar',
            imgid: 'cta_death_',
            twt2: 'death_',
            deadimg: 'cta_death_dead.gif'
        },
        'serps': {
            fname: 'Any Serpent',
            sname: 'Serpent',
            nname: 'seamonster',
            imgid: 'twitter_seamonster_',
            twt2: 'sea_'
        },
        'eserp': {
            fname: 'Emerald Serpent',
            sname: 'Emerald Serpent',
            nname: 'greenseamonster',
            imgid: 'twitter_seamonster_green_1',
            twt2: 'sea_'
        },
        'sserp': {
            fname: 'Saphire Serpent',
            sname: 'Saphire Serpent',
            nname: 'blueseamonster',
            imgid: 'twitter_seamonster_blue_1',
            twt2: 'sea_'
        },
        'aserp': {
            fname: 'Amethyst Serpent',
            sname: 'Amethyst Serpent',
            nname: 'purpleseamonster',
            imgid: 'twitter_seamonster_purple_1',
            twt2: 'sea_'
        },
        'rserp': {
            fname: 'Ancient Serpent',
            sname: 'Ancient Serpent',
            nname: 'redseamonster',
            imgid: 'twitter_seamonster_red_1',
            twt2: 'sea_'
        },
        'drags': {
            fname: 'Any Dragon',
            sname: 'Dragon',
            nname: 'drag',
            imgid: '_dragon.gif',
            twt2: 'dragon_'
        },
        'edrag': {
            fname: 'Emerald Dragon',
            sname: 'Emerald Dragon',
            nname: 'greendragon',
            imgid: 'cta_green_dragon.gif',
            twt2: 'dragon_'
        },
        'fdrag': {
            fname: 'Frost Dragon',
            sname: 'Frost Dragon',
            nname: 'bluedragon',
            imgid: 'cta_blue_dragon.gif',
            twt2: 'dragon_'
        },
        'gdrag': {
            fname: 'Gold Dragon',
            sname: 'Gold Dragon',
            nname: 'yellowdragon',
            imgid: 'cta_yellow_dragon.gif"',
            twt2: 'dragon_'
        },
        'rdrag': {
            fname: 'Ancient Red Dragon',
            sname: 'Red Dragon',
            nname: 'reddragon',
            imgid: 'cta_red_dragon.gif',
            twt2: 'dragon_'
        },
        'deas': {
            fname: 'Any Deathrune Raid',
            sname: 'Deathrune Raid',
            nname: 'deathrune',
            imgid: 'raid_deathrune_',
            twt2: 'deathrune_'
        },
        'a1dea': {
            fname: 'Deathrune Raid I Part 1',
            sname: 'Deathrune Raid A1',
            nname: 'deathrunea1',
            imgid: 'raid_deathrune_a1.gif',
            twt2: 'deathrune_'
        },
        'a2dea': {
            fname: 'Deathrune Raid I Part 2',
            sname: 'Deathrune Raid A2',
            nname: 'deathrunea2',
            imgid: 'raid_deathrune_a2.gif',
            twt2: 'deathrune_'
        },
        'b1dea': {
            fname: 'Deathrune Raid II Part 1',
            sname: 'Deathrune Raid B1',
            nname: 'deathruneb1',
            imgid: 'raid_deathrune_b1.gif',
            twt2: 'deathrune_'
        },
        'b2dea': {
            fname: 'Deathrune Raid II Part 2',
            sname: 'Deathrune Raid B2',
            nname: 'deathruneb2',
            imgid: 'raid_deathrune_b2.gif',
            twt2: 'deathrune_'
        }
    },

    monstGroups: {
        'doaid': {
            monst: 'legio~hydra~earth~ice~sylva~skaar~a1dea~a2dea~b1dea~b2dea'
        },
        'world': {
            monst: 'legio~hydra~earth~ice',
            max: '5'
        },
        'serps': {
            monst: 'eserp~sserp~aserp~rserp'
        },
        'drags': {
            monst: 'edrag~fdrag~gdrag~rdrag'
        },
        'deas': {
            monst: 'a1dea~a2dea~b1dea~b2dea'
        },
        'elems': {
            monst: 'earth~ice'
        }
    },

    MonsterFinder: function () {
        if (!gm.getValue("MonsterFinderUse", true) || this.stats.stamina.num < gm.getValue("MonsterFinderMinStam", 20) || this.stats.health.num < 10) {
            return false;
        }

        var urlix = gm.getValue("urlix", "").replace("~", "");
        if (urlix === "" && gm.getValue("mfStatus", "") != "OpenMonster") {
            gm.setValue("mfStatus", "");
            gm.log("Resetting monster finder history");
            this.clearLinks();
        }

        gm.log("All checks passed to enter Monster Finder");
        if (window.location.href.indexOf("filter=app_46755028429") < 0) {
            var mfstatus = gm.getValue("mfStatus", "");
            if (mfstatus == "OpenMonster") {
                caap.CheckMonster();
                return true;
            } else if (mfstatus == "MonsterFound") {
                caap.VisitUrl("http://apps.facebook.com/castle_age" + gm.getValue("navLink"));
                gm.setValue("mfStatus", "");
                return true;
            } else if ((mfstatus == "TestMonster" && this.WhileSinceDidIt('checkedFeed', 60 * 60 * 2)) || (!this.WhileSinceDidIt('checkedFeed', 60 * gm.getValue("MonsterFinderFeedMin", 5)))) {
                caap.selectMonst();
            } else {
                if (caapGlob.is_chrome) {
                    caap.VisitUrl("http://apps.facebook.com/?filter=app_46755028429&show_hidden=true&ignore_self=true&sk=lf", 0);
                } else {
                    caap.VisitUrl("http://www.facebook.com/?filter=app_46755028429&show_hidden=true&ignore_self=true&sk=lf", 0);
                }

                gm.setValue("mfStatus", "MFOFB");
                return false;
            }
        }
    },

    MonsterFinderOnFB: function () {
        if (gm.getValue("mfStatus", "") != "MFOFB") {
            return false;
        }

        gm.setValue("mfStatus", "Running");
        var delayPer = 10000;
        var iterations = 2;
        gm.setValue("delayPer", delayPer);
        gm.setValue("iterations", iterations);
        gm.setValue("iterationsRun", 0);
        gm.log("Set mostRecentFeed");
        this.JustDidIt("checkedFeed");
        gm.setValue("monstersExhausted", false);
        this.bottomScroll();
    },

    CheckMonster: function () {
        //Look for Attack Button
        if (gm.getValue("mfStatus") != "OpenMonster") {
            return false;
        }

        gm.log("Checking Monster: " + gm.getValue("navLink"));
        caapGlob.attackButton = this.CheckForImage('attack_monster_button.jpg');
        if (!caapGlob.attackButton) {
            caapGlob.attackButton = this.CheckForImage('seamonster_power.gif');
            if (!caapGlob.attackButton) {
                caapGlob.attackButton = this.CheckForImage('attack_monster_button2.jpg');
                if (!caapGlob.attackButton) {
                    caapGlob.attackButton = this.CheckForImage('seamonster_power.gif');
                    if (!caapGlob.attackButton) {
                        caapGlob.attackButton = this.CheckForImage('attack_monster_button.jpg');
                        if (!caapGlob.attackButton) {
                            caapGlob.attackButton = this.CheckForImage('event_attack1.gif');
                            if (!caapGlob.attackButton) {
                                caapGlob.attackButton = this.CheckForImage('event_attack2.gif');
                                if (!caapGlob.attackButton) {
                                    caapGlob.attackButton = this.CheckForImage('raid_attack_button.gif');
                                }
                            }
                        }
                    }
                }
            }
        }

        if (caapGlob.attackButton) {
            var dam = this.checkMonsterDamage();
            //var dam = this.monstDamage();
            gm.log("Found Attack Button.  Dam: " + dam);
            if (!dam) {
                gm.log("No Damage to monster, Attacking");
                caap.Click(caapGlob.attackButton);
                window.setTimeout(function () {
                    gm.log("Hand off to Monsters section");
                    gm.setValue("urlixc", gm.getValue("urlixc", "~") + "~" + gm.getValue("navLink").replace("http://apps.facebook.com/castle_age", ""));
                    //caap.maintainUrl(gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
                    gm.setValue("mfStatus", "MonsterFound");
                    //caap.DeceiveDidIt("NotargetFrombattle_monster");
                    gm.setValue("navLink", "");
                    //caap.VisitUrl("http://apps.facebook.com/castle_age/battle_monster.php");
                    gm.setValue('resetmonsterEngage', true);
                    caap.NavigateTo('battle_monster');
                    gm.log("Navigate to battle_monster");
                    window.setTimeout(function () {
                        gm.setValue('resetselectMonster', true);
                        gm.setValue('LastAction', "Idle");
                        gm.log("resetselectMonster");
                        return true;
                    }, 4000);

                }, 4000);
                return false;
            } else {
                gm.log("Already attacked this monster, find new one");
                gm.setValue("urlixc", gm.getValue("urlixc", "~") + "~" + gm.getValue("navLink").replace("http://apps.facebook.com/castle_age", ""));
                //this.maintainUrl(gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
                gm.setValue("mfStatus", "TestMonster");
                gm.setValue("waitMonsterLoad", 0);
                return true;
            }
        } else {
            gm.log("No Attack Button");
            if (gm.getValue("waitMonsterLoad", 0) < 2) {
                gm.log("No Attack Button, Pass" + gm.getValue("waitMonsterLoad"));
                gm.setValue("waitMonsterLoad", gm.getValue("waitMonsterLoad", 0) + 1);
                gm.setValue("LastAction", "Idle");
                return true;
            } else {
                gm.log("No Attack Button, Find New Monster");
                gm.setValue("urlixc", gm.getValue("urlixc", "~") + gm.getValue("navLink").replace("http://apps.facebook.com/castle_age", ""));
                //this.maintainUrl(gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
                gm.setValue("mfStatus", "TestMonster");
                gm.setValue("waitMonsterLoad", 0);
                return true;
            }
        }
    },

    monstDamage: function () {    // Get damage done to monster
        var damDone = 0;
        var webSlice = this.CheckForImage('dragon_title_owner.jpg');
        if (webSlice && caapGlob.attackButton) {
            // Get name and type of monster
            var monsterName = nHtml.GetText(webSlice);
            monsterName = monsterName.substring(0, monsterName.indexOf('You have (')).trim();
            var monstType = this.getMonstType(monsterName);
            webSlice = nHtml.FindByAttrContains(document.body, "td", "class", "dragonContainer");
            if (webSlice) {
                webSlice = nHtml.FindByAttrContains(webSlice, "td", "valign", "top");
                if (webSlice) {
                    webSlice = nHtml.FindByAttrContains(webSlice, "a", "href", "keep.php?user=" + unsafeWindow.Env.user);
                    if (webSlice) {
                        if (monstType == "Serpent") {
                            var damList = nHtml.GetText(webSlice.parentNode.parentNode).trim().split("/");
                            damDone = this.NumberOnly(damList[0]) + this.NumberOnly(damList[1]);
                        } else {
                            damDone = this.NumberOnly(nHtml.GetText(webSlice.parentNode.parentNode).trim());
                        }

                        gm.log("Damage done = " + damDone);
                    } else {
                        gm.log("couldn't get Damage done slice");
                    }
                } else {
                    gm.log("couldn't get top table");
                }
            } else {
                gm.log("couldn't get dragoncontainer");
            }
        }

        return damDone;
    },

    mfMain: function () {
        gm.log("Do Stuff " + new Date());
        if (gm.getValue("urlix", "") === "") {
            this.clearLinks();
        }

        //this.maintainAllUrl();
        //this.redirectLinks();
        this.handleCTA();
        gm.log("Scroll Up");
        nHtml.ScrollToTop();
        gm.log("Select Monster");
        this.selectMonst();
    },

    redirectLinks: function () {
        for (var x = 0; x < document.getElementsByTagName("a").length; x++) {
            document.getElementsByTagName('a')[x].target = "child_frame";
        }
    },

    bottomScroll: function () {
        nHtml.ScrollToBottom();
        //gm.log("Scroll To Bottom " + new Date() );
        nHtml.setTimeout(function () {
            caap.olderPosts();
        }, gm.getValue("delayPer", 60000));
    },

    olderPosts: function () {
        var itRun = gm.getValue("iterationsRun", 0);
        if (itRun > 0) {
            //var showMore = nHtml.getX('//a[@class=\'PagerMoreLink\']', document, nHtml.xpath.unordered);
            var showMore = nHtml.FindByAttrContains(document, "a", "class", "PagerMoreLink");
            if (showMore) {
                gm.log("Showing more ...");
                caap.Click(showMore);
                gm.log("Link clicked.");
            } else {
                gm.log("PagerMoreLink not found!");
            }
        }

        //this.NavigateTo("Older Posts");
        gm.setValue("iterationsRun", ++itRun);
        gm.log("Get More Iterations " + gm.getValue("iterationsRun") + " of " + gm.getValue("iterations") + " " + new Date());
        if (gm.getValue("iterationsRun") < gm.getValue("iterations")) {
            nHtml.setTimeout(function () {
                caap.bottomScroll();
            }, gm.getValue("delayPer", 60000));
        } else {
            //gm.log("Made it Here, Try mfMain");
            nHtml.setTimeout(function () {
                caap.mfMain();
            }, gm.getValue("delayPer", 120000));
        }
    },

    selectMonst: function () {
        if (gm.getValue("monstersExhausted", false) === true) {
            return false;
        }

        gm.log("Select Monst Function");
        var monstPriority = gm.getValue("MonsterFinderOrder");

        gm.log("Monst Priority: " + monstPriority);

        var monstArray = monstPriority.split("~");
        gm.log("MonstArray: " + monstArray[0]);
        for (var x = 0; x < monstArray.length; x++) {
            if (gm.getValue(monstArray[x], "~") == "~") {
                gm.setValue(monstArray[x], "~");
            }

            gm.log("monstArray[x]: " + monstArray[x]);
            var monstType = monstArray[x];
            var monstList = gm.getValue(monstArray[x], "~");
            var monstLinks = monstList.replace(/~~/g, "~").split("~");
            var numlinks = 0;
            gm.log("Inside MonstArray For Loop " + monstArray[x] + " - Array[" + (monstLinks.length - 1) + "] " + gm.getValue(monstArray[x]).replace("~", "~\n"));
            for (var z = 0; z < monstLinks.length; z++) {
                if (monstLinks[z]) {
                    var link = monstLinks[z].replace("http://apps.facebook.com/castle_age", "");
                    var urlixc = gm.getValue("urlixc", "~");
                    // + "  UrlixC: " + urlixc);
                    if (urlixc.indexOf(link) == -1) {
                        gm.log("Navigating to Monst: " + monstArray[x] + "  Link: " + link);
                        link = "http://apps.facebook.com/castle_age" + link;
                        gm.setValue("navLink", link);
                        this.VisitUrl(link);
                        gm.setValue("mfStatus", "OpenMonster");
                        gm.setValue("LastAction", "Monsters");
                        this.waitMilliSecs =  10000;
                        return true;
                    } else {
                        numlinks += 1;
                        gm.log("Trimming already checked URL, Monst Type: " + monstType);
                        //var newVal = gm.getValue(monstArray[x],"~").replace("~" + link, "");
                        gm.setValue(monstType, gm.getValue(monstType).replace("~" + link, "").replace(/~~/g, "~"), "~");
                    }
                }
            }

            gm.log("Links Already Visited: " + monstArray[x] + " #:" + numlinks);
        }

        gm.log("All Monsters Tested");
        gm.setValue("monstersExhausted", true);
        gm.setValue("mfStatus", "");
        var numurl = gm.getValue("urlix", "~");
        if (nHtml.CountInstances(numurl) > 100) {
            gm.log("Idle- Resetting Monster Searcher Values, #-" + numurl);
            caap.clearLinks(true);
            gm.setValue("LastAction", "");
        }

        this.VisitUrl("http://apps.facebook.com/castle_age/index.php?bm=1");
        return false;
    },

    clearLinks: function (resetall) {
        gm.log("Clear Links");
        if (resetall === true) {
            gm.setValue("navLink", "");
            gm.setValue("mfStatus", "");
            gm.setValue("waitMonsterLoad", 0);
            gm.setValue("urlixc", "~");
        }

        gm.setValue("urlix", "~");
        gm.setValue('doaid', '~');
        gm.setValue('legio', '~');
        gm.setValue('hydra', '~');
        gm.setValue('earth', '~');
        gm.setValue('ice', '~');
        gm.setValue('kull', '~');
        gm.setValue('gilda', '~');
        gm.setValue('colos', '~');
        gm.setValue('sylva', '~');
        gm.setValue('mephi', '~');
        gm.setValue('keira', '~');
        gm.setValue('lotus', '~');
        gm.setValue('skaar', '~');
        gm.setValue('serps', '~');
        gm.setValue('eserp', '~');
        gm.setValue('sserp', '~');
        gm.setValue('aserp', '~');
        gm.setValue('rserp', '~');
        gm.setValue('drags', '~');
        gm.setValue('edrag', '~');
        gm.setValue('fdrag', '~');
        gm.setValue('gdrag', '~');
        gm.setValue('rdrag', '~');
        gm.setValue('deas', '~');
        gm.setValue('a1dea', '~');
        gm.setValue('a2dea', '~');
        gm.setValue('b1dea', '~');
        gm.setValue('b2dea', '~');

        this.JustDidIt("clearedMonsterFinderLinks");
    },

    handleCTA: function () {
        var ctas = nHtml.getX('//div[@class=\'GenericStory_Body\']', document, nHtml.xpath.unordered);
        gm.log("Number of entries- " + ctas.snapshotLength);
        for (var x = 0; x < ctas.snapshotLength; x++) {
            var url = nHtml.getX('./div[2]/div/div/a/@href', ctas.snapshotItem(x), nHtml.xpath.string).replace("http://apps.facebook.com/castle_age", "");
            var fid = nHtml.Gup("user", url);
            var mpool = nHtml.Gup("mpool", url);
            var action = nHtml.Gup("action", url);
            var src = nHtml.getX('./div[2]/div/div/a/div/img/@src', ctas.snapshotItem(x), nHtml.xpath.string);
            var time = nHtml.getX('./form/span/span/a/abbr/@title', ctas.snapshotItem(x), nHtml.xpath.string);
            var monst = '';
            var urlixc = gm.getValue("urlixc", "~");
            if (src) {
                if (urlixc.indexOf(url) >= 0) {
                    //gm.log("Monster Already Checked");
                } else if (src.indexOf("cta_hydra_") >= 0 || src.indexOf("twitter_hydra_objective") >= 0) { //Hydra
                    monst = gm.getValue("hydra", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("hydra", gm.getValue("hydra", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_castle_") >= 0) { //Battle of the Dark Legion (Orcs)
                    monst = gm.getValue("legio", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("legio", gm.getValue("legio", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_earth_") >= 0) { //Genesis, the Earth Elemental
                    monst = gm.getValue("earth", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("earth", gm.getValue("earth", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_water_") >= 0) { //Ragnarok, the Ice Elemental
                    monst = gm.getValue("ice", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("ice", gm.getValue("ice", "") + "~" + url);
                    }
                } else if (src.indexOf("raid_deathrune_") >= 0) { //Deathrune Raids
                    monst = gm.getValue("deas", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("deas", gm.getValue("deas", "") + "~" + url);
                    }
                    if (src.indexOf("raid_deathrune_a1.gif") >= 0) { // Deathrune Raid Part 1 Under Level 50 Summoner (a1)
                        monst = gm.getValue("a1dea", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("a1dea", gm.getValue("a1dea", "") + "~" + url);
                        }
                    } else if (src.indexOf("raid_deathrune_a2.gif") >= 0) { // Deathrune Raid Part 2 Under Level 50 Summoner (a2)
                        monst = gm.getValue("a2dea", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("a2dea", gm.getValue("a2dea", "") + "~" + url);
                        }
                    } else if (src.indexOf("raid_deathrune_b1.gif") >= 0) { // Deathrune Raid Part 1 Over Level 50 Summoner (b1)
                        monst = gm.getValue("b1dea", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("b1dea", gm.getValue("b1dea", "") + "~" + url);
                        }
                    } else if (src.indexOf("raid_deathrune_b2.gif") >= 0) { // Deathrune Raid Part 2 Over Level 50 Summoner (b2)
                        monst = gm.getValue("b2dea", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("b2dea", gm.getValue("b2dea", "") + "~" + url);
                        }
                    }
                } else if (src.indexOf("_dragon.gif") >= 0) { //Dragons
                    monst = gm.getValue("drags", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("drags", gm.getValue("drags", "") + "~" + url);
                    }

                    if (src.indexOf("cta_red_dragon.gif") >= 0) { // Red Dragon
                        monst = gm.getValue("rdrag", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("rdrag", gm.getValue("rdrag", "") + "~" + url);
                        }
                    } else if (src.indexOf("cta_yellow_dragon.gif") >= 0) {  // Gold Dragon
                        monst = gm.getValue("gdrag", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("gdrag", gm.getValue("gdrag", "") + "~" + url);
                        }
                    } else if (src.indexOf("cta_blue_dragon.gif") >= 0) { // Frost Dragon
                        monst = gm.getValue("fdrag", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("fdrag", gm.getValue("fdrag", "") + "~" + url);
                        }
                    } else if (src.indexOf("cta_green_dragon.gif") >= 0) { // Emerald Dragon
                        monst = gm.getValue("edrag", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("edrag", gm.getValue("edrag", "") + "~" + url);
                        }
                    }
                } else if (src.indexOf("twitter_seamonster_") >= 0 && src.indexOf("_1.jpg") >= 0) { // Sea Serpents
                    monst = gm.getValue("serps", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("serps", gm.getValue("serps", "") + "~" + url);
                    }

                    if (src.indexOf("twitter_seamonster_purple_1") >= 0) { // Amethyt Serpent
                        monst = gm.getValue("aserp", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("aserp", gm.getValue("aserp", "") + "~" + url);
                        }
                    } else if (src.indexOf("twitter_seamonster_red_1") >= 0) { // Ancient Serpent (red)
                        monst = gm.getValue("rserp", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("rserp", gm.getValue("rserp", "") + "~" + url);
                        }
                    } else if (src.indexOf("twitter_seamonster_blue_1") >= 0) { // Saphire Serpent
                        monst = gm.getValue("sserp", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("sserp", gm.getValue("sserp", "") + "~" + url);
                        }
                    } else if (src.indexOf("twitter_seamonster_green_1") >= 0) { // Emerald Serpent
                        monst = gm.getValue("eserp", "~");
                        if (monst.indexOf(url) == -1) {
                            gm.setValue("eserp", gm.getValue("eserp", "") + "~" + url);
                        }
                    }
                } else if (src.indexOf("cta_death") >= 0 && src.indexOf("cta_death_dead.gif") == -1) { // skaar
                    monst = gm.getValue("skaar", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("skaar", gm.getValue("skaar", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_lotus.gif") >= 0) { // Lotus
                    monst = gm.getValue("lotus", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("lotus", gm.getValue("lotus", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_keira.gif") >= 0) { // Keira
                    monst = gm.getValue("keira", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("keira", gm.getValue("keira", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_mephi.gif") >= 0) { // Mephisto
                    monst = gm.getValue("mephi", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("mephi", gm.getValue("mephi", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_sylvanas.gif") >= 0) { //Sylvanas
                    monst = gm.getValue("sylva", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("sylva", gm.getValue("sylva", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_stone.gif") >= 0) { //Colossus of Terra
                    monst = gm.getValue("colos", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("colos", gm.getValue("colos", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_orc_king.gif") >= 0) { //Gildamesh
                    monst = gm.getValue("gilda", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("gilda", gm.getValue("gilda", "") + "~" + url);
                    }
                } else if (src.indexOf("cta_orc_captain.gif") >= 0) { //Kull
                    monst = gm.getValue("kull", "~");
                    if (monst.indexOf(url) == -1) {
                        gm.setValue("kull", gm.getValue("kull", "") + "~" + url);
                    }
                }
            }

            var urlix = gm.getValue("urlix", "~");
            var doaid = gm.getValue("doaid", "~");
            if (fid && action) {
                if (action == "doObjective") {
                    if (urlixc.indexOf(url) == -1 && doaid.indexOf(url) == -1) {
                        doaid += "~" + url;
                        gm.setValue("doaid", doaid);
                    }
                }
            }

            if (fid && mpool) {
                if (urlixc.indexOf(url) == -1 && urlix.indexOf(url) == -1) {
                    urlix += "~" + url;
                    gm.setValue("urlix", urlix);
                }
            }
        }

        gm.log("Completed Url Handling");
        this.JustDidIt("checkedFeed");
    },

    /////////////////////////////////////////////////////////////////////
    //                          BANKING
    // Keep it safe!
    /////////////////////////////////////////////////////////////////////

    ImmediateBanking: function () {
        if (!gm.getValue("BankImmed")) {
            return false;
        }

        return this.Bank();
    },

    Bank: function () {
        var maxInCash = this.GetNumber('MaxInCash');
        var minInCash = this.GetNumber('MinInCash');
        if (minInCash === '') {
            minInCash = 0;
        }

        if (maxInCash === "" || this.stats.cash <= minInCash || this.stats.cash < maxInCash || this.stats.cash < 10) {
            return false;
        }

        if (this.SelectGeneral('BankingGeneral')) {
            return true;
        }

        var depositButton = this.CheckForImage('btn_stash.gif');
        if (!depositButton) {
            // Cannot find the link
            return this.NavigateTo('keep');
        }

        var depositForm = depositButton.form;
        var numberInput = nHtml.FindByAttrXPath(depositForm, 'input', "@type='' or @type='text'");
        if (numberInput) {
            numberInput.value = parseInt(numberInput.value, 10) - minInCash;
        } else {
            gm.log('Cannot find box to put in number for bank deposit.');
            return false;
        }

        gm.log('Depositing into bank');
        this.Click(depositButton);
        // added a true result by default until we can find a fix for the result check
        return true;

        /*
        var checkBanked = nHtml.FindByAttrContains(div, "div", "class", 'result');
        if (checkBanked && (checkBanked.firstChild.data.indexOf("You have stashed") < 0)) {
            gm.log('Banking succeeded!');
            return true;
        }

        gm.log('Banking failed! Cannot find result or not stashed!');
        return false;
        */
    },

    RetrieveFromBank: function (num) {
        if (num <= 0) {
            return false;
        }

        var minInStore = this.GetNumber('minInStore');
        var retrieveButton = this.CheckForImage('btn_retrieve.gif');
        if (!retrieveButton) {
            // Cannot find the link
            return this.NavigateTo('keep');
        }

        if (!(minInStore === '' || minInStore <= gm.getValue('inStore', 0) - num)) {
            return false;
        }

        var retrieveForm = retrieveButton.form;
        var numberInput = nHtml.FindByAttrXPath(retrieveForm, 'input', "@type='' or @type='text'");
        if (numberInput) {
            numberInput.value = num;
        } else {
            gm.log('Cannot find box to put in number for bank retrieve.');
            return false;
        }

        gm.log('Retrieving ' + num + ' from bank');
        gm.setValue('storeRetrieve', '');
        this.Click(retrieveButton);
        return true;
    },

    /////////////////////////////////////////////////////////////////////
    //                          HEAL
    /////////////////////////////////////////////////////////////////////

    Heal: function () {
        this.SetDivContent('heal_mess', '');
        var whenBattle = gm.getValue('WhenBattle', '');
        var minToHeal = this.GetNumber('MinToHeal');
        if (minToHeal === "") {
            return false;
        }

        var minStamToHeal = this.GetNumber('MinStamToHeal');
        if (minStamToHeal === "") {
            minStamToHeal = 0;
        }

        if (!this.stats.health) {
            return false;
        }

        if (whenBattle != 'Never') {
            if ((this.InLevelUpMode() || this.stats.stamina.num >= this.stats.stamina.max) && this.stats.health.num < 10) {
                gm.log('Heal');
                return this.NavigateTo('keep,heal_button.gif');
            }
        }

        if (this.stats.health.num >= this.stats.health.max || this.stats.health.num > minToHeal) {
            return false;
        }

        if (this.stats.stamina.num < minStamToHeal) {
            this.SetDivContent('heal_mess', 'Waiting for stamina to heal: ' + this.stats.stamina.num + '/' + minStamToHeal);
            return false;
        }

        gm.log('Heal');
        return this.NavigateTo('keep,heal_button.gif');
    },

    /////////////////////////////////////////////////////////////////////
    //                          ELITE GUARD
    /////////////////////////////////////////////////////////////////////

    AutoElite: function () {
        if (!gm.getValue('AutoElite', false) || !(this.WhileSinceDidIt('AutoEliteGetList', 6 * 60 * 60))) {
            return false;
        }

        if (String(window.location).indexOf('party.php')) {
            var res = nHtml.FindByAttrContains(document.body, 'span', 'class', 'result_body');
            if (res) {
                res = nHtml.GetText(res);
                if (res.match(/Your Elite Guard is FULL/i)) {
                    gm.setValue('MyEliteTodo', '');
                    gm.log('elite guard is full');
                    this.JustDidIt('AutoEliteGetList');
                    gm.setValue('AutoEliteEnd', 'Full');
                    return false;
                }
            }
        }

        var user = '';
        var eliteList = gm.getValue('MyEliteTodo', '').trim();
        if (eliteList === '') {
            if (this.CheckForImage('view_army_on.gif')) {
                gm.log('load auto elite list');
                var armyList = gm.getValue('EliteArmyList', '');
                if (/[^0-9,]/.test(armyList) && /\n/.test(armyList)) {
                    armyList = armyList.replace(/\n/gi, ',');
                }

                if (armyList !== '') {
                    armyList += ',';
                }

                var ss = document.evaluate(".//img[contains(@src,'view_friends_profile')]/ancestor::a[contains(@href,'keep.php?user')]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var s = 0; s < ss.snapshotLength; s++) {
                    var a = ss.snapshotItem(s);
                    user = a.href.match(/user=\d+/i);
                    if (user) {
                        armyList += String(user).substr(5) + ',';
                    }
                }

                if (armyList !== '' || (this.stats.army <= 1)) {
                    gm.setValue('MyEliteTodo', armyList);
                }

            } else {
                return this.NavigateTo('army,army_member');
            }
        } else if (this.WhileSinceDidIt('AutoEliteReqNext', 7)) {
            user = eliteList.substring(0, eliteList.indexOf(','));
            gm.log('add elite ' + user);
            this.VisitUrl("http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=" + user);
            eliteList = eliteList.substring(eliteList.indexOf(',') + 1);
            gm.setValue('MyEliteTodo', eliteList);
            this.JustDidIt('AutoEliteReqNext');
            if (eliteList === '') {
                this.JustDidIt('AutoEliteGetList');
                gm.setValue('AutoEliteEnd', 'NoArmy');
                gm.log('Army list exhausted');
            }
        }

        return true;
    },

    /////////////////////////////////////////////////////////////////////
    //                          Arena ELITE GUARD
    /////////////////////////////////////////////////////////////////////

    ArenaElite: function () {
        if (!gm.getValue('ArenaEliteNeeded',false)) {
            return false;
        }

        if (String(window.location).indexOf('arena.php?user=')) {
            var res = nHtml.FindByAttrContains(document.body, 'span', 'class', 'result_body');
            if (res) {
                res = nHtml.GetText(res);
                if (res.match(/You.+Arena Guard is FULL/i)) {
                    gm.setValue('ArenaEliteTodo', '');
                    gm.log('Arena guard is full');
                    gm.setValue('ArenaEliteNeeded', false);
                    gm.setValue('ArenaEliteEnd', 'Full');
                    return false;
                }
            }
        }

        var user = '';
        var eliteList = gm.getValue('ArenaEliteTodo', '').trim();
        if (eliteList === '') {
            if (this.CheckForImage('view_army_on.gif')) {
                gm.log('Load auto elite list');
                var armyList = gm.getValue('EliteArmyList', '');
                if (/[^0-9,]/.test(armyList) && /\n/.test(armyList)) {
                    armyList = armyList.replace(/\n/gi, ',');
                }

                if (armyList !== '') {
                    armyList += ',';
                }
				
                var ss = document.evaluate(".//img[contains(@src,'view_friends_profile')]/ancestor::a[contains(@href,'keep.php?user')]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var s = 0; s < ss.snapshotLength; s++) {
                    var a = ss.snapshotItem(s);
                    user = a.href.match(/user=\d+/i);
                    if (user) {
                        armyList += String(user).substr(5) + ',';
                    }
                }
				
                if (armyList !== '' || (this.stats.army <= 1)) {
                    gm.setValue('ArenaEliteTodo', armyList);
                }

            } else {
                return this.NavigateTo('army,army_member');
            }
        } else if (this.WhileSinceDidIt('ArenaEliteReqNext', 7)) {
            user = eliteList.substring(0, eliteList.indexOf(','));
            gm.log('add elite ' + user);
            this.VisitUrl("http://apps.facebook.com/castle_age/arena.php?user=" + user + "&lka=" + user + "&agtw=1&ref=nf");
            eliteList = eliteList.substring(eliteList.indexOf(',') + 1);
            gm.setValue('ArenaEliteTodo', eliteList);
            this.JustDidIt('ArenaEliteReqNext');
            if (eliteList == '') {
                gm.setValue('ArenaEliteNeeded', false);
                gm.setValue('ArenaEliteEnd', 'NoArmy');
                gm.log('Army list exhausted');
            }
        }

        return true;
    },
	
    /////////////////////////////////////////////////////////////////////
    //                          PASSIVE GENERALS
    /////////////////////////////////////////////////////////////////////

    PassiveGeneral: function () {
        return this.SelectGeneral('IdleGeneral');
    },

    /////////////////////////////////////////////////////////////////////
    //                          AUTOINCOME
    /////////////////////////////////////////////////////////////////////

    AutoIncome: function () {
        if (this.stats.payminute < 1 && this.stats.paytime.match(/\d/)) {
            this.SelectGeneral('IncomeGeneral');
            return true;
        }

        return false;
    },

    /////////////////////////////////////////////////////////////////////
    //                              IMMEDIATEAUTOSTAT
    /////////////////////////////////////////////////////////////////////

    ImmediateAutoStat: function () {
        if (!gm.getValue("StatImmed")) {
            return false;
        }

        return caap.AutoStat();
    },

    /////////////////////////////////////////////////////////////////////
    //                              AUTOGIFT
    /////////////////////////////////////////////////////////////////////

    CheckGiftResults: function (resultsText) {
        // Confirm gifts actually sent
        if (resultsText.match(/^\d+ requests? sent\.$/)) {
            gm.log('Confirmed gifts sent out.');
            gm.setValue('RandomGiftPic', '');
            gm.setValue('FBSendList', '');
            this.SetCheckResultsFunction('');
        }
    },

    AutoGift: function () {
        if (!gm.getValue('AutoGift')) {
            return false;
        }

        var giftNamePic = {};
        var giftEntry = nHtml.FindByAttrContains(document.body, 'div', 'id', '_gift1');
        if (giftEntry) {
            gm.setList('GiftList', []);
            var ss = document.evaluate(".//div[contains(@id,'_gift')]", giftEntry.parentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var s = 0; s < ss.snapshotLength; s++) {
                var giftDiv = ss.snapshotItem(s);
                var giftName = nHtml.GetText(giftDiv).trim().replace(/!/i, '');
                if (gm.getValue("GiftList").indexOf(giftName) >= 0) {
                    giftName += ' #2';
                }

                gm.listPush('GiftList', giftName);
                giftNamePic[giftName] = this.CheckForImage('mystery', giftDiv).src.match(/[\w_\.]+$/i).toString();
    //          gm.log('Gift name: ' + giftName + ' pic ' + giftNamePic[giftName] + ' hidden ' + giftExtraGiftTF[giftName]);
            }

    //      gm.log('Gift list: ' + gm.getList('GiftList'));
            if (gm.getValue('GiftChoice') == 'Get Gift List') {
                gm.setValue('GiftChoice', 'Same Gift As Received');
                this.SetControls(true);
            }
        }

        // Go to gifts page if asked to read in gift list
        if (gm.getValue('GiftChoice', false) == 'Get Gift List' || !gm.getList('GiftList')) {
            if (this.NavigateTo('army,gift', 'giftpage_title.jpg')) {
                return true;
            }
        }

        var giverId = [];
        // Gather the gifts
        if (gm.getValue('HaveGift', false)) {
            if (this.NavigateTo('army', 'invite_on.gif')) {
                return true;
            }

            var acceptDiv = nHtml.FindByAttrContains(document.body, 'a', 'href', 'reqs.php#confirm_');
            var ignoreDiv = nHtml.FindByAttrContains(document.body, 'a', 'href', 'act=ignore');
            if (ignoreDiv && acceptDiv) {
                giverId = this.userRe.exec(ignoreDiv.href);
                if (!giverId) {
                    gm.log('Unable to find giver ID');
                    return false;
                }

                var profDiv = nHtml.FindByAttrContains(acceptDiv.parentNode.parentNode, 'a', 'href', 'profile.php');
                if (!profDiv) {
                    profDiv = nHtml.FindByAttrContains(acceptDiv.parentNode.parentNode, 'div', 'style', 'overflow: hidden; text-align: center; width: 170px;');
                }

                var giverName = "Unknown"
                if (profDiv) {
                    giverName = nHtml.GetText(profDiv).trim();
                }

                gm.setValue('GiftEntry', giverId[2] + caapGlob.vs + giverName);
                gm.log('Giver ID = ' + giverId[2] + ' Name  = ' + giverName);
                this.JustDidIt('ClickedFacebookURL');
                if (caapGlob.is_chrome) {
                    acceptDiv.href = "http://apps.facebook.com/reqs.php#confirm_46755028429_0";
                }

                this.VisitUrl(acceptDiv.href);
                return true;
            }

            gm.setValue('HaveGift', false);
            return this.NavigateTo('gift');
        }

        var button = null;
        // Facebook pop-up on CA
        if (gm.getValue('FBSendList', '')) {
            button = nHtml.FindByAttrContains(document.body, 'input', 'name', 'sendit');
            if (button) {
                gm.log('Sending gifts to Facebook');
                this.Click(button);
                this.SetCheckResultsFunction('CheckGiftResults');
                return true;
            }

            gm.listAddBefore('ReceivedList', gm.getList('FBSendList'));
            gm.setList('FBSendList', []);
            button = nHtml.FindByAttrContains(document.body, 'input', 'name', 'ok');
            if (button) {
                gm.log('Over max gifts per day');
                this.JustDidIt('WaitForNextGiftSend');
                this.Click(button);
                return true;
            }

            gm.log('No Facebook pop up to send gifts');
            return false;
        }

        // CA send gift button
        if (gm.getValue('CASendList', '')) {
            var sendForm = nHtml.FindByAttrContains(document.body, 'form', 'id', 'req_form_');
            if (sendForm) {
                button = nHtml.FindByAttrContains(sendForm, 'input', 'id', 'send');
                if (button) {
                    gm.log('Clicked CA send gift button');
                    gm.listAddBefore('FBSendList', gm.getList('CASendList'));
                    gm.setList('CASendList', []);
                    caap.Click(button);
                    return true;
                }
            }

            gm.log('No CA button to send gifts');
            gm.listAddBefore('ReceivedList', gm.getList('CASendList'));
            gm.setList('CASendList', []);
            return false;
        }

        if (!this.WhileSinceDidIt('WaitForNextGiftSend', 3 * 60 * 60)) {
            return false;
        }

        if (this.WhileSinceDidIt('WaitForNotFoundIDs', 3 * 60 * 60) && gm.getList('NotFoundIDs')) {
            gm.listAddBefore('ReceivedList', gm.getList('NotFoundIDs'));
            gm.setList('NotFoundIDs', []);
        }

        if (gm.getValue('DisableGiftReturn', false) || caapGlob.is_chrome) {
            gm.setList('ReceivedList', []);
        }

        var giverList = gm.getList('ReceivedList');
        if (!giverList.length) {
            return false;
        }

        if (this.NavigateTo('army,gift', 'giftpage_title.jpg')) {
            return true;
        }

        // Get the gift to send out
        if (giftNamePic.length === 0) {
            gm.log('No list of pictures for gift choices');
            return false;
        }

        var givenGiftType = '';
        var giftPic = '';
        var giftChoice = gm.getValue('GiftChoice');
        //if (caapGlob.is_chrome) giftChoice = 'Random Gift';
        switch (giftChoice) {
        case 'Random Gift':
            giftPic = gm.getValue('RandomGiftPic');
            if (giftPic) {
                break;
            }

            var picNum = Math.floor(Math.random() * (gm.getList('GiftList').length));
            var n = 0;
            for (var picN in giftNamePic) {
                if (giftNamePic.hasOwnProperty(picN)) {
                    if (n++ == picNum) {
                        giftPic = giftNamePic[picN];
                        gm.setValue('RandomGiftPic', giftPic);
                        break;
                    }
                }
            }
            if (!giftPic) {
                gm.log('No gift type match. GiverList: ' + giverList);
                return false;
            }
            break;
        case 'Same Gift As Received':
            if (giverList[0].indexOf('Unknown Gift') >= 0) {
                givenGiftType = gm.getList('GiftList').shift();
            } else {
                givenGiftType = giverList[0].split(caapGlob.vs)[2];
            }
            gm.log('Looking for same gift as ' + givenGiftType);
            giftPic = giftNamePic[givenGiftType];
            if (!giftPic) {
                gm.log('No gift type match. GiverList: ' + giverList);
                return false;
            }
            break;
        default:
            giftPic = giftNamePic[gm.getValue('GiftChoice')];
            break;
        }

        // Move to gifts page
        var picDiv = this.CheckForImage(giftPic);
        if (!picDiv) {
            gm.log('Unable to find ' + giftPic);
            return false;
        } else {
            gm.log('GiftPic is ' + giftPic);
        }

        if (nHtml.FindByAttrContains(picDiv.parentNode.parentNode.parentNode.parentNode, 'div', 'style', 'giftpage_select')) {
            if (this.NavigateTo('giftpage_ca_friends_off.gif', 'giftpage_ca_friends_on.gif')) {
                return true;
            }
        } else {
            this.NavigateTo('gift_more_gifts.gif');
            return this.NavigateTo(giftPic);
        }

        // Click on names
        var giveDiv = nHtml.FindByAttrContains(document.body, 'div', 'class', 'unselected_list');
        var doneDiv = nHtml.FindByAttrContains(document.body, 'div', 'class', 'selected_list');
        gm.setList('ReceivedList', []);
        for (var p in giverList) {
            if (giverList.hasOwnProperty(p)) {
                if (p > 10) {
                    gm.listPush('ReceivedList', giverList[p]);
                    continue;
                }

                var giverData = giverList[p].split(caapGlob.vs);
                var giverID = giverData[0];
                var giftType = giverData[2];
                if (giftChoice == 'Same Gift As Received' && giftType != givenGiftType && giftType != 'Unknown Gift') {
                    gm.log('giftType ' + giftType + ' givenGiftType ' + givenGiftType);
                    gm.listPush('ReceivedList', giverList[p]);
                    continue;
                }

                var nameButton = nHtml.FindByAttrContains(giveDiv, 'input', 'value', giverID);
                if (!nameButton) {
                    gm.log('Unable to find giver ID ' + giverID);
                    gm.listPush('NotFoundIDs', giverList[p]);
                    this.JustDidIt('WaitForNotFoundIDs');
                    continue;
                } else {
                    gm.log('Clicking giver ID ' + giverID);
                    this.Click(nameButton);
                }

                //test actually clicked
                if (nHtml.FindByAttrContains(doneDiv, 'input', 'value', giverID)) {
                    gm.listPush('CASendList', giverList[p]);
                    gm.log('Moved ID ' + giverID);
                } else {
                    gm.log('NOT moved ID ' + giverID);
                    gm.listPush('NotFoundIDs', giverList[p]);
                    this.JustDidIt('WaitForNotFoundIDs');
                }
            }
        }

        return true;
    },

    AcceptGiftOnFB: function () {
        if (caapGlob.is_chrome) {
            if (window.location.href.indexOf('apps.facebook.com/reqs.php') < 0 && window.location.href.indexOf('apps.facebook.com/home.php') < 0) {
                return false;
            }
        } else {
            if (window.location.href.indexOf('www.facebook.com/reqs.php') < 0 && window.location.href.indexOf('www.facebook.com/home.php') < 0) {
                return false;
            }
        }

        var giftEntry = gm.getValue('GiftEntry', '');
        if (!giftEntry) {
            return false;
        }

        gm.log('On FB page with gift ready to go');
        if (window.location.href.indexOf('facebook.com/reqs.php') >= 0) {
            var ss = document.evaluate(".//input[contains(@name,'/castle/tracker.php')]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var s = 0; s < ss.snapshotLength; s++) {
                var giftDiv = ss.snapshotItem(s);
                var user = giftDiv.name.match(/uid%3D\d+/i);
                if (!user) {
                    continue;
                }

                user = String(user).substr(6);
                if (user != this.NumberOnly(giftEntry)) {
                    continue;
                }

                var giftType = giftDiv.value.replace(/^Accept /i, '').trim();
                if (gm.getList('GiftList').indexOf(giftType) < 0) {
                    gm.log('Unknown gift type.');
                    giftType = 'Unknown Gift';
                }

                if (gm.getValue('ReceivedList', ' ').indexOf(giftEntry) < 0) {
                    gm.listPush('ReceivedList', giftEntry + caapGlob.vs + giftType);
                }

                gm.log('This giver: ' + user + ' gave ' + giftType + ' Givers: ' + gm.getList('ReceivedList'));
                caap.Click(giftDiv);
                gm.setValue('GiftEntry', '');
                return true;
            }
        }

        if (!this.WhileSinceDidIt('ClickedFacebookURL', 10)) {
            return false;
        }

        gm.log('Error: unable to find gift');
        if (gm.getValue('ReceivedList', ' ').indexOf(giftEntry) < 0) {
            gm.listPush('ReceivedList', giftEntry + '\tUnknown Gift');
        }

        caap.VisitUrl("http://apps.facebook.com/castle_age/army.php?act=acpt&uid=" + this.NumberOnly(giftEntry));
        gm.setValue('GiftEntry', '');
        return true;
    },

    ////////////////////////////////////////////////////////////////////
    //                      Auto Stat
    ////////////////////////////////////////////////////////////////////

    IncreaseStat: function (attribute, attrAdjust, atributeSlice) {
        var button = '';
        switch (attribute) {
        case "energy" :
            button = nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'energy_max');
            break;
        case "stamina" :
            button = nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'stamina_max');
            break;
        case "attack" :
            button = nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'attack');
            break;
        case "defense" :
            button = nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'defense');
            break;
        case "health" :
            button = nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'health_max');
            break;
        default :
            gm.log("Unable to identify attribute " + attribute);
            return "Fail";
        }

        if (!button) {
            gm.log("Unable to locate upgrade button for " + attribute);
            return "Fail";
        }

        var attrCurrent = parseInt(button.parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g, ''), 10);
        var energy = parseInt(nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'energy_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g, ''), 10);
        var stamina = parseInt(nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'stamina_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g, ''), 10);
        var attack = parseInt(nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'attack').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g, ''), 10);
        var defense = parseInt(nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'defense').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g, ''), 10);
        var health = parseInt(nHtml.FindByAttrContains(atributeSlice, 'a', 'href', 'health_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g, ''), 10);
        var level = this.stats.level;
    //  gm.log("Energy ="+energy+" Stamina ="+stamina+" Attack ="+attack+" Defense ="+defense+" Heath ="+health);
        if (nHtml.FindByAttrContains(document.body, 'div', 'id', 'app46755028429_AjaxLoadIcon').style.display == 'none') {
            if (!gm.getValue('AutoStatAdv', false)) {
                if (attrAdjust > attrCurrent) {
                    if ((attribute == 'stamina') && (this.statsPoints < 2)) {
                        gm.setValue("SkillPointsNeed", 2);
                        return "Fail";
                    } else {
                        gm.setValue("SkillPointsNeed", 1);
                    }

                    gm.log("Status Before:  " + attribute + "=" + attrCurrent + " Adjusting To: " + attrAdjust);
                    this.Click(button);
                    return "Click";
                } else {
                    return "Next";
                }
            } else {
                //Using eval, so user can define formulas on menu, like energy = level + 50
                if (eval(attrAdjust) > attrCurrent) {
                    if ((attribute == 'stamina') && (this.statsPoints < 2)) {
                        gm.setValue("SkillPointsNeed", 2);
                        return "Fail";
                    } else {
                        gm.setValue("SkillPointsNeed", 1);
                    }

                    gm.log("Status Before:  " + attribute + "=" + attrCurrent + " Adjusting To: (" + attrAdjust + ")=" + eval(attrAdjust));
                    this.Click(button);
                    return "Click";
                } else {
                    return "Next";
                }
            }
        } else {
            gm.log("Unable to find AjaxLoadIcon?");
            return "Fail";
        }

    // Realy shouldn't make it here
        gm.log("Somethings not right.");
        return "Fail";
    },

    AutoStat: function () {
        if (!gm.getValue('AutoStat')) {
            return false;
        }

        var content = document.getElementById('app46755028429_main_bntp');
        if (!content) {
            return false;
        }

        var a = nHtml.FindByAttrContains(content, 'a', 'href', 'keep.php');
        this.statsPoints = a.firstChild.firstChild.data.replace(/[^0-9]/g, '');
        if (!this.statsPoints) {
            return false;
            //gm.log("Dont have any stats points");
        }

        if (this.statsPoints < gm.getValue("SkillPointsNeed", 1)) {
            return false;
        }

        var atributeSlice = nHtml.FindByAttrContains(document.body, "div", "class", 'keep_attribute_section');
        if (!atributeSlice) {
            this.NavigateTo('keep');
            return true;
        }

        for (var n = 1; n <= 5; n++) {
            if (gm.getValue('Attribute' + n, '') !== '') {
                switch (this.IncreaseStat(gm.getValue('Attribute' + n, ''), gm.getValue('AttrValue' + n, 0), atributeSlice)) {
                case "Next" :
                    continue;
                case "Click" :
                    return true;
                default :
                    return false;
                }
            } else {
                return false;
            }
        }

        return false;
    },

    Idle: function () {
        //Update Monster Finder
        if (caap.WhileSinceDidIt("clearedMonsterFinderLinks", 72 * 60 * 60)) {
            this.clearLinks(true);
        }

        try {
            //if we need to add some army member
            if (gm.getValue('FillArmy', false)) {
                if (!this.CheckForImage('invite_on.gif')) {
                    caap.SetDivContent('idle_mess', 'Filling Army');
                    this.NavigateTo('army');
                } else { //get not army members
                    var IdsListNotArmyAll = "//div[@class='unselected_list']//label[@class='clearfix']";
                    var results = document.evaluate(IdsListNotArmyAll, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    var i = 0;
                    IdsListNotArmyAll = [];
                    while (results.snapshotItem(i) !== null) {
                        var res = results.snapshotItem(i);
                        IdsListNotArmyAll[IdsListNotArmyAll.length] = res.firstChild.value;
                        i++;
                    }

                    var Ids = [];
                    var counter = 0;
                    if (!gm.getValue('waiting', false)) { //get CA friends
                        gm.log("Getting CA friend's list");
                        gm.setValue('waiting', true);
                        window.setTimeout(function () {
                            gm.setValue('waiting', false);
                        }, 10000);

                        GM_xmlhttpRequest({
                            url: 'http://apps.facebook.com/castle_age/gift.php?app_friends=false&giftSelection=1',
                            method: 'GET',
                            onload: function (response) {
                                var excludeMatch = response.responseText.match(/(exclude_ids=")[\-0-9,]*"/);
                                if (response.status == 200 && excludeMatch) { //if response == ok
                                    gm.deleteValue('waiting');
                                    gm.log(response.statusText);
                                    var IdsList = excludeMatch.toString().replace(/[^0-9,]/g, '').split(',');
                                    for (var x in IdsListNotArmyAll) { //search for CA friends not in army
                                        if (IdsListNotArmyAll.hasOwnProperty(x)) {
                                            for (var y in IdsList) {
                                                if (IdsList.hasOwnProperty(y)) {
                                                    if (IdsList[y] == IdsListNotArmyAll[x]) {
                                                        Ids[counter++] = IdsListNotArmyAll[x];
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // Add army members //
                                    var count = 0;
                                    var ID = gm.getValue("ArmyCount", 0);
                                    if (ID === 0) {
                                        gm.log("Adding " + Ids.length + " member");
                                    }

                                    caap.SetDivContent('idle_mess', 'Filling Army, Please wait...' + ID + "/" + Ids.length);
                                    for (ID; ID < Ids.length ; ID++) {
                                        if (count >= 5) { //don't spam requests
                                            this.waitMilliSecs = 1000;
                                            break;
                                        } else {
                                            count++;
                                            GM_xmlhttpRequest({
                                                url: 'http://apps.facebook.com/castle_age//index.php?tp=cht&lka=' + Ids[ID] + '&buf=1',
                                                method: "GET",
                                                onload: function (response) {
                                                    count--;
                                                    if (response.status != 200) {
                                                        GM_log([response.status, response.finalUrl].join("\n"));
                                                    }
                                                }
                                            });

                                            gm.setValue("ArmyCount", ID);
                                        }
                                    }

                                    if (ID >= Ids.length) {
                                        caap.SetDivContent('idle_mess', '<b>Fill Army Completed</b>');
                                        window.setTimeout(function () {
                                            caap.SetDivContent('idle_mess', '');
                                        }, 5000);

                                        gm.log("Fill Army Completed");
                                        gm.setValue('FillArmy', false);
                                        gm.deleteValue("ArmyCount");
                                    }
                                } else {//if response != ok
                                    caap.SetDivContent('idle_mess', '<b>Fill Army Failed</b>');
                                    window.setTimeout(function () {
                                        caap.SetDivContent('idle_mess', '');
                                    }, 5000);

                                    gm.log("Fill Army Not Completed, cant get CA friends list");
                                    gm.log("Response.status: " + response.statusText);
                                    gm.setValue('FillArmy', false);
                                    gm.deleteValue("ArmyCount");
                                    gm.deleteValue('waiting');
                                }
                            }
                        });
                    }

                }
                return true;
            }
        } catch (e) {
            gm.log("ERROR: " + e);
        }

        this.ReconPlayers();
        gm.setValue('ReleaseControl', true);
        return true;
    },

    /*-------------------------------------------------------------------------------------\
                                      RECON PLAYERS
    ReconPlayers is an idle background process that scans the battle page for viable
    targets that can later be attacked.
    \-------------------------------------------------------------------------------------*/
    ReconPlayers: function () {
        try {
    /*-------------------------------------------------------------------------------------\
    If recon is disabled or if we check our timer to make sure we are not running recon too
    often.
    \-------------------------------------------------------------------------------------*/
            if (!gm.getValue('DoPlayerRecon', false)) {
                return false;
            }

            if (this.stats.stamina.num <= 0) {
                return false;
            }

            if (!this.CheckTimer('PlayerReconTimer')) {
                return false;
            }

            this.SetDivContent('idle_mess', 'Player Recon: Starting');
    /*-------------------------------------------------------------------------------------\
    If we don't have our iframe then we open it up. We give an additional 30 seconds to get
    loaded.
    \-------------------------------------------------------------------------------------*/
            if (!document.getElementById("iframeRecon")) {
                nHtml.OpenInIFrame('http://apps.facebook.com/castle_age/battle.php#iframeRecon', 'iframeRecon');
                gm.log('Opening the recon iframe');
                this.SetTimer('PlayerReconTimer', 30);
                return true;
            }
    /*-------------------------------------------------------------------------------------\
    pageObj wil contain our iframe DOM content.  If we don't have any content yet we give
    it another 30 seconds.
    \-------------------------------------------------------------------------------------*/
            var pageObj = document.getElementById("iframeRecon").contentDocument;
            if (!pageObj) {
                gm.log('Recon HTML page not ready. waithing For 30 more secionds.');
                this.SetTimer('PlayerReconTimer', 30);
                return true;
            }

            this.SetDivContent('idle_mess', 'Player Recon: In Progress');
    /*-------------------------------------------------------------------------------------\
    We use the 'invade' button gif for our snapshot.  If we don't find any then we aren't
    in the right place or have a load problem
    \-------------------------------------------------------------------------------------*/
            var target = "//input[contains(@src,'battle_01.gif')]";
            var ss = pageObj.evaluate(target, pageObj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (ss.snapshotLength <= 0) {
                pageObj.location.reload(true);
                gm.log('Recon can not find battle page');
                caap.SetDivContent('idle_mess', '');
                return false;
            }
    //  gm.log("Found targets: "+ss.snapshotLength);
    /*-------------------------------------------------------------------------------------\
    Next we get our Recon Player settings for lowest rank, highest level, and army ratio
    base multiplier.
    \-------------------------------------------------------------------------------------*/
            var reconRank = this.GetNumber('ReconPlayerRank', 99);
            var reconLevel = this.GetNumber('ReconPlayerLevel', 999);
            var reconARBase = this.GetNumber('ReconPlayerARBase', 999);
            var found = 0;
    /*-------------------------------------------------------------------------------------\
    Now we step through our snapshot data which represents data within each 'tr' for each
    target on the battle page.  We step back through the parent objects until we have the
    entire 'tr'
    \-------------------------------------------------------------------------------------*/
            for (var s = 0; s < ss.snapshotLength; s++) {
                var obj = ss.snapshotItem(s);
                while (obj.tagName.toLowerCase() != "tr") {
                    obj = obj.parentNode;
                }

                var tr = obj;
    /*-------------------------------------------------------------------------------------\
    We get the deity number for the target
    \-------------------------------------------------------------------------------------*/
                var deityNum = this.NumberOnly(this.CheckForImage('symbol_', tr, pageObj).src.match(/\d+\.jpg/i).toString());
    /*-------------------------------------------------------------------------------------\
    We also get the targets actual name, level and rank from the text string
    \-------------------------------------------------------------------------------------*/
                var regex = new RegExp('(.+), Level ([0-9]+)\\s*([A-Za-z ]+)\\s*([0-9]+)', 'i');
                var txt = nHtml.GetText(tr).trim();
                var levelm = regex.exec(txt);
                if (!levelm) {
                    gm.log('Recon can not parse target text string' + txt);
                    continue;
                }

                var nameStr = levelm[1].trim();
                var levelNum = parseInt(levelm[2], 10);
                var rankStr = levelm[3].trim();
                var rankNum = this.rankTable[rankStr.toLowerCase()];
    /*-------------------------------------------------------------------------------------\
    Then we get the targets army count and userid.  We'll also save the current time we
    found the target alive.
    \-------------------------------------------------------------------------------------*/
                var armyNum = parseInt(levelm[4], 10);
                var userID = nHtml.FindByAttrXPath(tr, "input", "@name='target_id'", pageObj).value;
                var aliveTime = (new Date().getTime());
    //      gm.log('Player stats: '+userID+' '+nameStr+' '+deityNum+' '+rankStr+' '+rankNum+' '+levelNum+' '+armyNum+' '+aliveTime);
    /*-------------------------------------------------------------------------------------\
    We filter out targets that are above the recon max level or below the recon min rank
    \-------------------------------------------------------------------------------------*/
                if (levelNum - this.stats.level > reconLevel) {
                    continue;
                }

                if (this.stats.rank - rankNum  > reconRank) {
                    continue;
                }
    /*-------------------------------------------------------------------------------------\
    We adjust the army ratio base by our level multiplier and then apply this to our army
    size.  If the result is our adjusted army size is below the targets army size then
    we filter this taregt too.
    \-------------------------------------------------------------------------------------*/
                var levelMultiplier = this.stats.level / levelNum;
                var armyRatio = reconARBase * levelMultiplier;
                if (armyRatio <= 0) {
                    gm.log('Recon unable to calculate army ratio: ' + reconARBase + '/' + levelMultiplier);
                    continue;
                }

                if (armyNum > (this.stats.army * armyRatio)) {
                    continue;
                }
    //      gm.log('Target Found: '+userID+' '+nameStr+' '+deityNum+' '+rankStr+' '+rankNum+' '+levelNum+' '+armyNum+' '+aliveTime);
    /*-------------------------------------------------------------------------------------\
    Ok, recon has found a viable target. We get any existing values from the targetsOL
    database.
    \-------------------------------------------------------------------------------------*/
                found++;
                var invadewinsNum = gm.getListObjVal('targetsOl', userID, 'invadewinsNum', -1);
                var invadelossesNum = gm.getListObjVal('targetsOl', userID, 'invadelossesNum', -1);
                var duelwinsNum = gm.getListObjVal('targetsOl', userID, 'duelwinsNum', -1);
                var duellossesNum = gm.getListObjVal('targetsOl', userID, 'duellossesNum', -1);
                var defendwinsNum = gm.getListObjVal('targetsOl', userID, 'defendwinsNum', -1);
                var defendlossesNum = gm.getListObjVal('targetsOl', userID, 'defendlossesNum', -1);
                var goldNum = gm.getListObjVal('targetsOl', userID, 'goldNum', -1);
                var attackTime = gm.getListObjVal('targetsOl', userID, 'attackTime', 0);
                var selectTime = gm.getListObjVal('targetsOl', userID, 'selectTime', 0);
                var statswinsNum = gm.getListObjVal('targetsOl', userID, 'statswinsNum', -1);
                var statslossesNum = gm.getListObjVal('targetsOl', userID, 'statswinsNum', -1);
    /*-------------------------------------------------------------------------------------\
    And then we add/update targetsOL database with information on the target. We include
    the max value of the number of entries on the first update
    \-------------------------------------------------------------------------------------*/
                var entryLimit = gm.getValue('LimitTargets', 100);
                gm.setListObjVal('targetsOl', userID, 'nameStr', nameStr, entryLimit);          /* Target name */
                gm.setListObjVal('targetsOl', userID, 'rankStr', rankStr);                     /* Target rank */
                gm.setListObjVal('targetsOl', userID, 'rankNum', rankNum);                     /* Target rank number */
                gm.setListObjVal('targetsOl', userID, 'levelNum', levelNum);                   /* Traget level */
                gm.setListObjVal('targetsOl', userID, 'armyNum', armyNum);                     /* Target army size */
                gm.setListObjVal('targetsOl', userID, 'deityNum', deityNum);                   /* Target deity affiliation number */
                gm.setListObjVal('targetsOl', userID, 'invadewinsNum', invadewinsNum);         /* Tally of invade wins against target */
                gm.setListObjVal('targetsOl', userID, 'invadelossesNum', invadelossesNum);     /* Tally of invade losses against target */
                gm.setListObjVal('targetsOl', userID, 'duelwinsNum', duelwinsNum);             /* Tally of duel wins against target */
                gm.setListObjVal('targetsOl', userID, 'duellossesNum', duellossesNum);         /* Tally of duel losses against target */
                gm.setListObjVal('targetsOl', userID, 'defendwinsNum', defendwinsNum);         /* Tally of wins when target attacked us */
                gm.setListObjVal('targetsOl', userID, 'defendlossesNum', defendlossesNum);     /* Tally of losses when target attacked us */
                gm.setListObjVal('targetsOl', userID, 'statswinsNum', statswinsNum);           /* Targets win count from stats */
                gm.setListObjVal('targetsOl', userID, 'statslossesNum', statslossesNum);       /* Targets loss count from stats */
                gm.setListObjVal('targetsOl', userID, 'goldNum', goldNum);                     /* Tally of gold won from target */
                gm.setListObjVal('targetsOl', userID, 'aliveTime', aliveTime);                 /* Last time found alive */
                gm.setListObjVal('targetsOl', userID, 'attackTime', attackTime);               /* Last time attacked */
                gm.setListObjVal('targetsOl', userID, 'selectTime', selectTime);               /* Last time selected to attack */
            }
    /*-------------------------------------------------------------------------------------\
    We're done with recon.  Reload the battle page for next pass and set timer for the next
    recon to occur in 60 seconds
    \-------------------------------------------------------------------------------------*/
            pageObj.location.reload(true);
            var retrySecs = gm.getValue('PlayerReconRetry', 60);
            this.SetTimer('PlayerReconTimer', retrySecs);
            if (found > 0) {
                this.SetDivContent('idle_mess', 'Player Recon: Found:' + found + ' Total:' + gm.getList('targetsOl').length);
            } else {
                this.SetDivContent('idle_mess', 'Player Recon: No Targets Found');
            }

            window.setTimeout(function () {
                caap.SetDivContent('idle_mess', '');
            }, retrySecs * 1000);

            return false;
        } catch (e) {
            gm.log("ERROR in Recon :" + e);
            return false;
        }
    },

    currentPage: "",

    currentTab: "",

    waitMilliSecs: 5000,

    /////////////////////////////////////////////////////////////////////
    //                          MAIN LOOP
    // This function repeats continously.  In principle, functions should only make one
    // click before returning back here.
    /////////////////////////////////////////////////////////////////////

    actionDescTable: {'AutoIncome': 'Awaiting Income', 'AutoStat': 'Upgrade Skill Points', 'MaxEnergyQuest': 'At Max Energy Quest', 'PassiveGeneral': 'Setting Idle General', 'ImmediateBanking': 'Immediate Banking', 'Battle': 'Battling Players', 'MonsterReview': 'Reviewing Monsters/Raids'},

    CheckLastAction: function (thisAction) {
        var lastAction = gm.getValue('LastAction', 'none');
        if (this.actionDescTable[thisAction]) {
            this.SetDivContent('activity_mess', 'Current activity: ' + this.actionDescTable[thisAction]);
        } else {
            this.SetDivContent('activity_mess', 'Current activity: ' + thisAction);
        }

        if (lastAction != thisAction) {
            gm.log('Changed from doing ' + lastAction + ' to ' + thisAction);
            gm.setValue('LastAction', thisAction);
        }
    },

    MainLoop: function () {
        this.waitMilliSecs = 1000;
        // assorted errors...
        var href = location.href;
        if (href.indexOf('/common/error.html') >= 0) {
            gm.log('detected error page, waiting to go back to previous page.');
            window.setTimeout(function () {
                window.history.go(-1);
            }, 30 * 1000);

            return;
        }

        if (document.getElementById('try_again_button')) {
            gm.log('detected Try Again message, waiting to reload');
            // error
            window.setTimeout(function () {
                window.history.go(0);
            }, 30 * 1000);

            return;
        }

        if (gm.getValue("fbFilter", false) && (window.location.href.indexOf('apps.facebook.com/reqs.php') >= 0 || window.location.href.indexOf('apps.facebook.com/home.php') >= 0 ||  window.location.href.indexOf('filter=app_46755028429') >= 0)) {
            var css = "#contentArea div[id^=\"div_story_\"]:not([class*=\"46755028429\"]) {\ndisplay:none !important;\n}";
            if (typeof GM_addStyle != "undefined") {
                GM_addStyle(css);
            }
        }

        var locationFBMF = false;
        if (caapGlob.is_chrome) {
            if (window.location.href.indexOf('apps.facebook.com/reqs.php') >= 0 || window.location.href.indexOf('apps.facebook.com/home.php') >= 0 ||  window.location.href.indexOf('filter=app_46755028429') >= 0) {
                locationFBMF = true;
            }
        } else {
            if (window.location.href.indexOf('www.facebook.com/reqs.php') >= 0 || window.location.href.indexOf('www.facebook.com/home.php') >= 0 ||  window.location.href.indexOf('filter=app_46755028429') >= 0) {
                locationFBMF = true;
            }
        }

        if (locationFBMF) {
            if (gm.getValue("mfStatus", "") == "OpenMonster") {
                gm.log("Opening Monster " + gm.getValue("navLink"));
                this.CheckMonster();
            } else if (gm.getValue("mfStatus", "") == "CheckMonster") {
                gm.log("Scanning URL for new monster");
                this.selectMonst();
            }

            this.MonsterFinderOnFB();
            this.AcceptGiftOnFB();
            this.WaitMainLoop();
            return;
        }

        //We don't need to send out any notifications
        var button = nHtml.FindByAttrContains(document.body, "a", "class", 'undo_link');
        if (button) {
            this.Click(button);
            gm.log('Undoing notification');
        }

        this.SetupDivs();
    //  this.AddBattleLinks();
        if (gm.getValue('Disabled', false)) {
            if (caapGlob.is_chrome) {
                CE_message("disabled", null, gm.getValue('Disabled', false));
            }

            this.SetControls();
            this.WaitMainLoop();
            return;
        }

        if (!this.GetStats()) {
            var noWindowLoad = gm.getValue('NoWindowLoad', 0);
            if (noWindowLoad === 0) {
                this.JustDidIt('NoWindowLoadTimer');
                gm.setValue('NoWindowLoad', 1);
            } else if (this.WhileSinceDidIt('NoWindowLoadTimer', Math.min(Math.pow(2, noWindowLoad - 1) * 15, 60 * 60))) {
                this.JustDidIt('NoWindowLoadTimer');
                gm.setValue('NoWindowLoad', noWindowLoad + 1);
                this.ReloadCastleAge();
            }

            gm.log('Page no-load count: ' + noWindowLoad);
            this.WaitMainLoop();
            return;
        } else {
            gm.setValue('NoWindowLoad', 0);
        }

        this.DrawQuests(false);
        this.CheckResults();
        this.checkMonsterEngage();
        this.checkMonsterDamage();
        this.selectMonster();
        this.monsterDashboard();
        this.UpdateGeneralList();
        this.SetControls();
        this.DrawLands();

        if (!this.WhileSinceDidIt('newControlPanelLoaded', 3)) {
            this.WaitMainLoop();
            return;
        }

        if (gm.getValue('caapPause', 'none') != 'none') {
            var div = document.getElementById("caap_div");
            document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark', '#fee');
            document.getElementById("caap_div").style.opacity = div.style.transparency = gm.getValue('StyleOpacityDark', '1');
            this.WaitMainLoop();
            return;
        }

        if (this.AutoIncome()) {
            this.CheckLastAction('AutoIncome');
            this.WaitMainLoop();
            return;
        }

        var actionsList = ['AutoElite', 'ArenaElite', 'Heal', 'ImmediateBanking', 'ImmediateAutoStat', 'MaxEnergyQuest', 'DemiPoints', 'Monsters', 'Battle', 'MonsterFinder', 'Quests', 'PassiveGeneral', 'Lands', 'Bank', 'AutoBless', 'AutoStat', 'AutoGift', 'MonsterReview', 'Idle'];
        if (!gm.getValue('ReleaseControl', false)) {
            actionsList.unshift(gm.getValue('LastAction', 'Idle'));
        } else {
            gm.setValue('ReleaseControl', false);
        }
    //  gm.log('Action list: ' + actionsList);

        for (var action in actionsList) {
            if (actionsList.hasOwnProperty(action)) {
        //      gm.log('Action: ' + actionsList[action]);
                if (this[actionsList[action]]()) {
                    this.CheckLastAction(actionsList[action]);
                    break;
                }
            }
        }

        this.WaitMainLoop();
    },

    WaitMainLoop: function () {
        this.waitForPageChange = true;
        nHtml.setTimeout(function () {
            this.waitForPageChange = false;
            caap.MainLoop();
        }, caap.waitMilliSecs * (1 + Math.random() * 0.2));
    },

    ReloadCastleAge: function () {
        // better than reload... no prompt on forms!
        if (window.location.href.indexOf('castle_age') >= 0 && !gm.getValue('Disabled') && (gm.getValue('caapPause') == 'none')) {
            gm.setValue('ReleaseControl', true);
            gm.setValue('caapPause', 'none');
            if (caapGlob.is_chrome) {
                CE_message("paused", null, gm.getValue('caapPause', 'none'));
            }

            window.location = "http://apps.facebook.com/castle_age/index.php?bm=1";
        }
    },

    ReloadOccasionally: function () {
        nHtml.setTimeout(function () {
            caap.ReloadCastleAge();
            caap.ReloadOccasionally();
        }, 1000 * 60 * 8 + (8 * 60 * 1000 * Math.random()));
    }
};

if (gm.getValue('SetTitle')) {
    document.title = gm.getValue('PlayerName', 'CAAP');
}

if (gm.getValue('LastVersion', 0) != caapGlob.thisVersion) {
    // Put code to be run once to upgrade an old version's variables to new format or such here.
    if (parseInt(gm.getValue('LastVersion', 0), 10) < 121) {
        gm.setValue('WhenBattle', gm.getValue('WhenFight', 'Stamina Available'));
    }

    // This needs looking at, although not really used, need to check we are using caap keys
    if (parseInt(gm.getValue('LastVersion', 0), 10) < 126) {
        var storageKeys = GM_listValues();
        for (var key = 0; key < storageKeys.length; key++) {
            if (GM_getValue(storageKeys[key])) {
                GM_setValue(storageKeys[key], GM_getValue(storageKeys[key]).toString().replace('~', caapGlob.os).replace('`', caapGlob.vs));
            }
        }
    }

    if (parseInt(gm.getValue('LastVersion', 0), 10) < 130 && gm.getValue('MonsterGeneral')) {
        gm.setValue('AttackGeneral', gm.getValue('MonsterGeneral'));
        gm.deleteValue('MonsterGeneral');
    }

    if (parseInt(gm.getValue('LastVersion', 0), 10) < 133) {
        var clearList = ['FreshMeatMaxLevel', 'FreshMeatARMax', 'FreshMeatARMin'];
        clearList.forEach(function (gmVal) {
            gm.setValue(gmVal, '');
        });
    }

    gm.setValue('LastVersion', caapGlob.thisVersion);
}

$(function () {
    gm.log('Full page load completed');
    gm.setValue('caapPause', 'none');
    if (caapGlob.is_chrome) {
        CE_message("paused", null, gm.getValue('caapPause', 'none'));
    }

    gm.setValue('clickUrl', window.location.href);
    if (document.getElementById("app46755028429_battle_monster")) {
        caap.checkMonsterDamage();
    }

    caap.addExpDisplay();
    gm.setValue('ReleaseControl', true);
    caap.MainLoop();
});

caap.ReloadOccasionally();

/////////////////////////////////////////////////////////////////////
//                          style OBJECT
/////////////////////////////////////////////////////////////////////

var style = {
    CreateMenu: function () {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "ColorSelectorDiv");
        newDiv.setAttribute("style", "display: none; position: fixed; left: " + ((window.innerWidth / 2) - 290) + "px; top: " + ((window.innerHeight / 2) - 200) + "px; z-index: 1337; background: #fff; border: 2px solid #000; padding: 3px; width: 577px");
        newDiv.innerHTML += "<center><b><h1>Select Color<h1></b><div id='SelectColorType'></div></center><br/>";
        newDiv.innerHTML += '<div style="position:relative;height:286px;width:531px;border:1px solid black;">\n' +
        '  <div id="gradientBox" style="cursor:crosshair;top:15px;position:absolute;\n' +
        '                              left:15px;width:256px;height:256px;">\n' +
        '    <img id="gradientImg" style="display:block;width:256px;height:256px;"\n' +
        '        src="http://www.switchonthecode.com/sites/default/files/64/source/color_picker_gradient.png" />\n' +
        '   <img id="circle" style="position:absolute;height:11px;width:11px;"\n' +
        '        src="http://www.switchonthecode.com/sites/default/files/64/source/color_picker_circle.gif" />\n' +
        '  </div>\n' +
        '  <div id="hueBarDiv" style="position:absolute;left:310px;width:35px;\n' +
        '                            height:256px;top:15px;">\n' +
        '    <img style="position:absolute;height:256px; width:19px;left:8px;" \n' +
        '        src="http://www.switchonthecode.com/sites/default/files/64/source/color_picker_bar.png" />\n' +
        '    <img id="arrows" style="position:absolute;height:9px;width:35px;left:0px;" \n' +
        '        src="http://www.switchonthecode.com/sites/default/files/64/source/color_picker_arrows.gif" />\n' +
        '  </div>\n' +
        '  <div style="position:absolute;left:370px;width:145px;height:256px;top:15px;">\n' +
        '  <div style="position:absolute;border: 1px solid black;\n' +
        '             height:50px;width:145px;top:0px;left:0px;">\n' +
        '    <div id="quickColor" style="position:absolute;height:50px;width:73px;\n' +
        '                               top:0px;left:0px;">\n' +
        '    </div>\n' +
        '    <div id="staticColor" style="position:absolute;height:50px;width:72px;\n' +
        '                                top:0px;left:73px;">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <br />\n' +
        '  <table width="100%" style="position:absolute;top:55px;">\n' +
        '    <tr>\n' +
        '      <td>Hex: </td>\n' +
        '      <td>\n' +
        '        <input size="8" type="text" id="hexBox"  />\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '    <tr>\n' +
        '      <td>Red: </td>\n' +
        '      <td>\n' +
        '        <input size="8" type="text" id="redBox"  />\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '    <tr>\n' +
        '      <td>Green: </td>\n' +
        '      <td>\n' +
        '        <input size="8" type="text" id="greenBox"  />\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '    <tr>\n' +
        '      <td>Blue: </td>\n' +
        '      <td>\n' +
        '        <input size="8" type="text" id="blueBox"  />\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '    <tr>\n' +
        '      <td>Hue: </td>\n' +
        '      <td>\n' +
        '        <input size="8" type="text" id="hueBox"  />\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '    <tr>\n' +
        '      <td>Saturation: </td>\n' +
        '      <td>\n' +
        '        <input size="8" type="text" id="saturationBox"  />\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '    <tr>\n' +
        '      <td>Value: </td>\n' +
        '      <td>\n' +
        '        <input size="8" type="text" id="valueBox" />\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '  </table>\n' +
        '  </div>\n' +
        '</div>';
        newDiv.innerHTML += '<div style="float:right"><input type="button" value="Accept" id="ColorMenuAccept"><input type="button" value="Cancel" id="ColorMenuCancel"></div>';
        document.body.appendChild(newDiv);
        /////////////////Event Listeners\\\\\\\\\\\\\\\\\\\\\
        var state = gm.getValue('state', 'Start');
        var AddChangers = document.getElementById('ColorMenuAccept');
        AddChangers.addEventListener('click', function (e) {
            caapGlob.ColorDiv.style.display = 'none';
            style.ChangeBackGround();
            gm.deleteValue('state');
        }, false);

        AddChangers = document.getElementById('ColorMenuCancel');
        AddChangers.addEventListener('click', function (e) {
            caapGlob.ColorDiv.style.display = 'none';
            style.CancelChangeBackGround();
            gm.deleteValue('state');
        }, false);

        AddChangers = document.getElementById('hexBox');
        AddChangers.addEventListener('change', function (e) {
            //gm.log("StyleColorStoped: "+gm.getValue('StyleColorStoped'));
            //gm.log("document.getElementById(hexBox).value: "+document.getElementById("hexBox").value);
            style.ChangeBackGround();
            style.hexBoxChanged();
        }, false);

        AddChangers = document.getElementById('redBox');
        AddChangers.addEventListener('change', function (e) {
            style.ChangeBackGround();
            style.redBoxChanged();
        }, false);

        AddChangers = document.getElementById('greenBox');
        AddChangers.addEventListener('change', function (e) {
            style.ChangeBackGround();
            style.greenBoxChanged();
        }, false);

        AddChangers = document.getElementById('blueBox');
        AddChangers.addEventListener('change', function (e) {
            style.ChangeBackGround();
            style.blueBoxChanged();
        }, false);

        AddChangers = document.getElementById('hueBox');
        AddChangers.addEventListener('change', function (e) {
            style.ChangeBackGround();
            style.hueBoxChanged();
        }, false);

        AddChangers = document.getElementById('saturationBox');
        AddChangers.addEventListener('change', function (e) {
            style.ChangeBackGround();
            style.saturationBoxChanged();
        }, false);

        AddChangers = document.getElementById('valueBox');
        AddChangers.addEventListener('change', function (e) {
            style.ChangeBackGround();
            style.valueBoxChanged();
        }, false);

        this.pointerOffset = new style.Position(0, navigator.userAgent.indexOf("Firefox") >= 0 ? 1 : 0);
        this.circleOffset = new style.Position(5, 5);
        this.arrowsOffset = new style.Position(0, 4);
        this.arrowsLowBounds = new style.Position(0, -4);
        this.arrowsUpBounds = new style.Position(0, 251);
        this.circleLowBounds = new style.Position(-5, -5);
        this.circleUpBounds = new style.Position(250, 250);
        style.fixGradientImg();
    },

    LoadMenu: function (state) {
        style.colorChanged('box');
        var oldColor = 0;
        if (state == 'Start') {
            oldColor = document.getElementById("caap_StyleColorStarted").value;
        } else {
            oldColor = document.getElementById("caap_StyleColorStoped").value;
        }

        gm.setValue('oldColor', oldColor);
        //gm.log("oldColor:"+oldColor)
        //gm.log("state: "+state)
        gm.setValue('state', state);
        caapGlob.ColorDiv = document.getElementById('ColorSelectorDiv');
        document.getElementById('SelectColorType').innerHTML = state;
        caapGlob.ColorDiv.style.display = 'block';
    },

    ChangeBackGround: function () {
        var state = gm.getValue('state', 'Start');
        if (state == 'Start') {
            gm.setValue('StyleColorStarted', document.getElementById("hexBox").value.replace(/#/, ''));
            gm.setValue('StyleBackgroundLight', document.getElementById("hexBox").value);
            document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundLight', '#efe');
        } else {
            gm.setValue('StyleColorStoped', document.getElementById("hexBox").value.replace(/#/, ''));
            gm.setValue('StyleBackgroundDark', document.getElementById("hexBox").value);
            document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark', '#fee');
        }

        caap.SetControls(true);
    },

    CancelChangeBackGround: function () {
        var state = gm.getValue('state', 'Start');
        var oldColor = gm.getValue('oldColor', 'FFFFFF');
        if (state == 'Start') {
            gm.setValue('StyleColorStarted', oldColor);
            gm.setValue('StyleBackgroundLight', '#' + oldColor);
            document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundLight', '#efe');
        } else {
            gm.setValue('StyleColorStoped', oldColor);
            gm.setValue('StyleBackgroundDark', '#' + oldColor);
            document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark', '#fee');
        }

        caap.SetControls(true);
    },

    Colors: new function () {
        function Color() {
            //Stored as values between 0 and 1
            var red = 0;
            var green = 0;
            var blue = 0;
            //Stored as values between 0 and 360
            var hue = 0;
            //Strored as values between 0 and 1
            var saturation = 0;
            var value = 0;
            function calculateHSV() {
                var max = Math.max(Math.max(red, green), blue);
                var min = Math.min(Math.min(red, green), blue);
                value = max;

                saturation = 0;
                if (max !== 0) {
                    saturation = 1 - min / max;
                }

                hue = 0;
                if (min == max) {
                    return;
                }

                var delta = (max - min);
                if (red == max) {
                    hue = (green - blue) / delta;
                } else if (green == max) {
                    hue = 2 + ((blue - red) / delta);
                } else {
                    hue = 4 + ((red - green) / delta);
                }

                hue = hue * 60;
                if (hue < 0) {
                    hue += 360;
                }
            }

            this.SetRGB = function (r, g, b) {
                if (isNaN(r) || isNaN(g) || isNaN(b)) {
                    return false;
                }

                r = r / 255.0;
                red = r > 1 ? 1 : r < 0 ? 0 : r;
                g = g / 255.0;
                green = g > 1 ? 1 : g < 0 ? 0 : g;
                b = b / 255.0;
                blue = b > 1 ? 1 : b < 0 ? 0 : b;
                calculateHSV();
                return true;
            };

            this.Red = function () {
                return Math.round(red * 255);
            };

            this.Green = function () {
                return Math.round(green * 255);
            };

            this.Blue = function () {
                return Math.round(blue * 255);
            };

            function calculateRGB()
            {
                red = value;
                green = value;
                blue = value;

                if (value === 0 || saturation === 0) {
                    return;
                }

                var tHue = (hue / 60);
                var i = Math.floor(tHue);
                var f = tHue - i;
                var p = value * (1 - saturation);
                var q = value * (1 - saturation * f);
                var t = value * (1 - saturation * (1 - f));
                switch (i) {
                case 0:
                    red = value;
                    green = t;
                    blue = p;
                    break;
                case 1:
                    red = q;
                    green = value;
                    blue = p;
                    break;
                case 2:
                    red = p;
                    green = value;
                    blue = t;
                    break;
                case 3:
                    red = p;
                    green = q;
                    blue = value;
                    break;
                case 4:
                    red = t;
                    green = p;
                    blue = value;
                    break;
                default:
                    red = value;
                    green = p;
                    blue = q;
                    break;
                }
            }

            this.SetHSV = function (h, s, v) {
                if (isNaN(h) || isNaN(s) || isNaN(v)) {
                    return false;
                }

                hue = (h >= 360) ? 359.99 : (h < 0) ? 0 : h;
                saturation = (s > 1) ? 1 : (s < 0) ? 0 : s;
                value = (v > 1) ? 1 : (v < 0) ? 0 : v;
                calculateRGB();
                return true;
            };

            this.Hue = function () {
                return hue;
            };

            this.Saturation = function () {
                return saturation;
            };

            this.Value = function () {
                return value;
            };

            this.SetHexString = function (hexString) {
                if (hexString === null || typeof(hexString) != "string") {
                    return false;
                }

                if (hexString.substr(0, 1) == '#') {
                    hexString = hexString.substr(1);
                }

                if (hexString.length != 6) {
                    return false;
                }

                var r = parseInt(hexString.substr(0, 2), 16);
                var g = parseInt(hexString.substr(2, 2), 16);
                var b = parseInt(hexString.substr(4, 2), 16);

                return this.SetRGB(r, g, b);
            };

            this.HexString = function () {
                var rStr = this.Red().toString(16);
                if (rStr.length == 1) {
                    rStr = '0' + rStr;
                }

                var gStr = this.Green().toString(16);
                if (gStr.length == 1) {
                    gStr = '0' + gStr;
                }

                var bStr = this.Blue().toString(16);
                if (bStr.length == 1) {
                    bStr = '0' + bStr;
                }

                return ('#' + rStr + gStr + bStr).toUpperCase();
            };

            this.Complement = function () {
                var newHue = (hue >= 180) ? hue - 180 : hue + 180;
                var newVal = (value * (saturation - 1) + 1);
                var newSat = (value * saturation) / newVal;
                var newColor = new Color();
                newColor.SetHSV(newHue, newSat, newVal);
                return newColor;
            };
        }

        this.ColorFromHSV = function (hue, sat, val) {
            var color = new Color();
            color.SetHSV(hue, sat, val);
            return color;
        };

        this.ColorFromRGB = function (r, g, b) {
            var color = new Color();
            color.SetRGB(r, g, b);
            return color;
        };

        this.ColorFromHex = function (hexStr) {
            var color = new Color();
            color.SetHexString(hexStr);
            return color;
        };
    }(),

    Position: function (x, y) {
        this.X = x;
        this.Y = y;

        this.Add = function (val) {
            var newPos = new style.Position(this.X, this.Y);
            if (val !== null) {
                if (!isNaN(val.X)) {
                    newPos.X += val.X;
                }

                if (!isNaN(val.Y)) {
                    newPos.Y += val.Y;
                }
            }

            return newPos;
        };

        this.Subtract = function (val) {
            var newPos = new style.Position(this.X, this.Y);
            if (val !== null) {
                if (!isNaN(val.X)) {
                    newPos.X -= val.X;
                }

                if (!isNaN(val.Y)) {
                    newPos.Y -= val.Y;
                }
            }

            return newPos;
        };

        this.Min = function (val) {
            var newPos = new style.Position(this.X, this.Y);
            if (val === null) {
                return newPos;
            }

            if (!isNaN(val.X) && this.X > val.X) {
                newPos.X = val.X;
            }

            if (!isNaN(val.Y) && this.Y > val.Y) {
                newPos.Y = val.Y;
            }

            return newPos;
        };

        this.Max = function (val)
        {
            var newPos = new style.Position(this.X, this.Y);
            if (val === null) {
                return newPos;
            }

            if (!isNaN(val.X) && this.X < val.X) {
                newPos.X = val.X;
            }

            if (!isNaN(val.Y) && this.Y < val.Y) {
                newPos.Y = val.Y;
            }

            return newPos;
        };

        this.Bound = function (lower, upper) {
            var newPos = this.Max(lower);
            return newPos.Min(upper);
        };

        this.Check = function () {
            var newPos = new style.Position(this.X, this.Y);
            if (isNaN(newPos.X)) {
                newPos.X = 0;
            }

            if (isNaN(newPos.Y)) {
                newPos.Y = 0;
            }

            return newPos;
        };

        this.Apply = function (element) {
            if (typeof(element) == "string") {
                element = document.getElementById(element);
            }

            if (element === null) {
                return;
            }

            if (!isNaN(this.X)) {
                element.style.left = this.X + 'px';
            }

            if (!isNaN(this.Y)) {
                element.style.top = this.Y + 'px';
            }
        };
    },

    correctOffset: function (pos, offset, neg) {
        if (neg) {
            return pos.Subtract(offset);
        }

        return pos.Add(offset);
    },

    hookEvent: function (element, eventName, callback) {
        if (typeof(element) == "string") {
            element = document.getElementById(element);
        }

        if (element === null) {
            return;
        }

        if (element.addEventListener) {
            element.addEventListener(eventName, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, callback);
        }
    },

    unhookEvent: function (element, eventName, callback) {
        if (typeof(element) == "string") {
            element = document.getElementById(element);
        }

        if (element === null) {
            return;
        }

        if (element.removeEventListener) {
            element.removeEventListener(eventName, callback, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + eventName, callback);
        }
    },

    cancelEvent: function (e) {
        e = e ? e : window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (e.preventDefault) {
            e.preventDefault();
        }

        e.cancelBubble = true;
        e.cancel = true;
        e.returnValue = false;
        return false;
    },

    getMousePos: function (eventObj) {
        eventObj = eventObj ? eventObj : window.event;
        var pos;
        if (isNaN(eventObj.layerX)) {
            pos = new style.Position(eventObj.offsetX, eventObj.offsetY);
        } else {
            pos = new style.Position(eventObj.layerX, eventObj.layerY);
        }

        return style.correctOffset(pos, style.pointerOffset, true);
    },

    getEventTarget: function (e) {
        e = e ? e : window.event;
        return e.target ? e.target : e.srcElement;
    },

    absoluteCursorPostion: function (eventObj) {
        eventObj = eventObj ? eventObj : window.event;
        if (isNaN(window.scrollX)) {
            return new style.Position(eventObj.clientX + document.documentElement.scrollLeft + document.body.scrollLeft,
                                      eventObj.clientY + document.documentElement.scrollTop + document.body.scrollTop);
        } else {
            return new style.Position(eventObj.clientX + window.scrollX, eventObj.clientY + window.scrollY);
        }
    },

    dragObject: function (element, attachElement, lowerBound, upperBound, startCallback, moveCallback, endCallback, attachLater) {
        if (typeof(element) == "string") {
            element = document.getElementById(element);
        }

        if (element === null) {
            return;
        }

        if (lowerBound !== null && upperBound !== null) {
            var temp = lowerBound.Min(upperBound);
            upperBound = lowerBound.Max(upperBound);
            lowerBound = temp;
        }

        var cursorStartPos = null;
        var elementStartPos = null;
        var dragging = false;
        var listening = false;
        var disposed = false;

        function dragGo(eventObj) {
            if (!dragging || disposed) {
                return;
            }

            var newPos = style.absoluteCursorPostion(eventObj);
            newPos = newPos.Add(elementStartPos).Subtract(cursorStartPos);
            newPos = newPos.Bound(lowerBound, upperBound);
            newPos.Apply(element);
            if (moveCallback !== null) {
                moveCallback(newPos, element);
            }

            return style.cancelEvent(eventObj);
        }

        function dragStop() {
            if (!dragging || disposed) {
                return;
            }

            style.unhookEvent(document, "mousemove", dragGo);
            style.unhookEvent(document, "mouseup", dragStopHook);
            cursorStartPos = null;
            elementStartPos = null;
            if (endCallback !== null) {
                endCallback(element);
            }

            dragging = false;
        }

        function dragStopHook(eventObj) {
            dragStop();
            return style.cancelEvent(eventObj);
        }

        function dragStart(eventObj) {
            if (dragging || !listening || disposed) {
                return;
            }

            dragging = true;
            if (startCallback !== null) {
                startCallback(eventObj, element);
            }

            cursorStartPos = style.absoluteCursorPostion(eventObj);
            elementStartPos = new style.Position(parseInt(element.style.left, 10), parseInt(element.style.top, 10));
            elementStartPos = elementStartPos.Check();
            style.hookEvent(document, "mousemove", dragGo);
            style.hookEvent(document, "mouseup", dragStopHook);
            return style.cancelEvent(eventObj);
        }

        this.Dispose = function () {
            if (disposed) {
                return;
            }

            this.StopListening(true);
            element = null;
            attachElement = null;
            lowerBound = null;
            upperBound = null;
            startCallback = null;
            moveCallback = null;
            endCallback = null;
            disposed = true;
        };

        this.StartListening = function () {
            if (listening || disposed) {
                return;
            }

            listening = true;
            style.hookEvent(attachElement, "mousedown", dragStart);
        };

        this.StopListening = function (stopCurrentDragging) {
            if (!listening || disposed) {
                return;
            }

            style.unhookEvent(attachElement, "mousedown", dragStart);
            listening = false;
            if (stopCurrentDragging && dragging) {
                dragStop();
            }
        };

        this.IsDragging = function () {
            return dragging;
        };

        this.IsListening = function () {
            return listening;
        };

        this.IsDisposed = function () {
            return disposed;
        };

        if (typeof(attachElement) == "string") {
            attachElement = document.getElementById(attachElement);
        }

        if (attachElement === null) {
            attachElement = element;
        }

        if (!attachLater) {
            this.StartListening();
        }
    },

    arrowsDown: function (e, arrows) {
        var pos = style.getMousePos(e);
        if (style.getEventTarget(e) == arrows) {
            pos.Y += parseInt(arrows.style.top, 10);
        }

        pos = style.correctOffset(pos, style.arrowsOffset, true);
        pos = pos.Bound(style.arrowsLowBounds, style.arrowsUpBounds);
        pos.Apply(arrows);
        style.arrowsMoved(pos);
    },

    circleDown: function (e, circle) {
        var pos = style.getMousePos(e);
        if (style.getEventTarget(e) == circle) {
            pos.X += parseInt(circle.style.left, 10);
            pos.Y += parseInt(circle.style.top, 10);
        }

        pos = style.correctOffset(pos, style.circleOffset, true);
        pos = pos.Bound(style.circleLowBounds, style.circleUpBounds);
        pos.Apply(circle);
        style.circleMoved(pos);
    },

    arrowsMoved: function (pos, element) {
        pos = style.correctOffset(pos, style.arrowsOffset, false);
        caapGlob.currentColor.SetHSV((256 - pos.Y) * 359.99 / 255, caapGlob.currentColor.Saturation(), caapGlob.currentColor.Value());
        style.colorChanged("arrows");
    },

    circleMoved: function (pos, element) {
        pos = style.correctOffset(pos, style.circleOffset, false);
        caapGlob.currentColor.SetHSV(caapGlob.currentColor.Hue(), 1 - pos.Y / 255.0, pos.X / 255.0);
        style.colorChanged("circle");
    },

    colorChanged: function (source) {
        document.getElementById("hexBox").value = caapGlob.currentColor.HexString();
        document.getElementById("redBox").value = caapGlob.currentColor.Red();
        document.getElementById("greenBox").value = caapGlob.currentColor.Green();
        document.getElementById("blueBox").value = caapGlob.currentColor.Blue();
        document.getElementById("hueBox").value = Math.round(caapGlob.currentColor.Hue());
        var str = (caapGlob.currentColor.Saturation() * 100).toString();
        if (str.length > 4) {
            str = str.substr(0, 4);
        }

        document.getElementById("saturationBox").value = str;
        str = (caapGlob.currentColor.Value() * 100).toString();
        if (str.length > 4) {
            str = str.substr(0, 4);
        }

        document.getElementById("valueBox").value = str;
        if (source == "arrows" || source == "box") {
            document.getElementById("gradientBox").style.backgroundColor = style.Colors.ColorFromHSV(caapGlob.currentColor.Hue(), 1, 1).HexString();
        }

        if (source == "box") {
            var el = document.getElementById("arrows");
            el.style.top = (256 - caapGlob.currentColor.Hue() * 255 / 359.99 - style.arrowsOffset.Y) + 'px';
            var pos = new style.Position(caapGlob.currentColor.Value() * 255, (1 - caapGlob.currentColor.Saturation()) * 255);
            pos = style.correctOffset(pos, style.circleOffset, true);
            pos.Apply("circle");
            style.endMovement();
        }

        document.getElementById("quickColor").style.backgroundColor = caapGlob.currentColor.HexString();
    },

    endMovement: function () {
        if (document.getElementById("caap_div") && gm.getValue('state')) {
            style.ChangeBackGround(gm.getValue('state', 'Start'));
        }

        document.getElementById("staticColor").style.backgroundColor = caapGlob.currentColor.HexString();
    },

    hexBoxChanged: function (e) {
        caapGlob.currentColor.SetHexString(document.getElementById("hexBox").value);
        style.colorChanged("box");
    },

    redBoxChanged: function (e) {
        caapGlob.currentColor.SetRGB(parseInt(document.getElementById("redBox").value, 10), caapGlob.currentColor.Green(), caapGlob.currentColor.Blue());
        style.colorChanged("box");
    },

    greenBoxChanged: function (e) {
        caapGlob.currentColor.SetRGB(caapGlob.currentColor.Red(), parseInt(document.getElementById("greenBox").value, 10), caapGlob.currentColor.Blue());
        style.colorChanged("box");
    },

    blueBoxChanged: function (e) {
        caapGlob.currentColor.SetRGB(caapGlob.currentColor.Red(), caapGlob.currentColor.Green(), parseInt(document.getElementById("blueBox").value, 10));
        style.colorChanged("box");
    },

    hueBoxChanged: function (e) {
        caapGlob.currentColor.SetHSV(parseFloat(document.getElementById("hueBox").value), caapGlob.currentColor.Saturation(), caapGlob.currentColor.Value());
        style.colorChanged("box");
    },

    saturationBoxChanged: function (e) {
        caapGlob.currentColor.SetHSV(caapGlob.currentColor.Hue(), parseFloat(document.getElementById("saturationBox").value) / 100.0, caapGlob.currentColor.Value());
        style.colorChanged("box");
    },

    valueBoxChanged: function (e) {
        caapGlob.currentColor.SetHSV(caapGlob.currentColor.Hue(), caapGlob.currentColor.Saturation(), parseFloat(document.getElementById("valueBox").value) / 100.0);
        style.colorChanged("box");
    },

    fixPNG: function (myImage) {
        if (!document.body.filters) {
            return;
        }

        var arVersion = navigator.appVersion.split("MSIE");
        var version = parseFloat(arVersion[1]);
        if (version < 5.5 || version >= 7) {
            return;
        }

        var imgID = (myImage.id) ? "id='" + myImage.id + "' " : "";
        var imgStyle = "display:inline-block;" + myImage.style.cssText;
        var strNewHTML = "<span " + imgID +
                    " style=\"" + "width:" + myImage.width +
                    "px; height:" + myImage.height +
                    "px;" + imgStyle + ";" +
                    "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" +
                    "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>";
        myImage.outerHTML = strNewHTML;
    },

    fixGradientImg: function () {
        style.fixPNG(document.getElementById("gradientImg"));
    }
};

style.CreateMenu();
caapGlob.currentColor = style.Colors.ColorFromRGB(64, 128, 128);
caapGlob.arrows = new style.dragObject("arrows", "hueBarDiv", style.arrowsLowBounds, style.arrowsUpBounds, style.arrowsDown, style.arrowsMoved, style.endMovement);
caapGlob.circle = new style.dragObject("circle", "gradientBox", style.circleLowBounds, style.circleUpBounds, style.circleDown, style.circleMoved, style.endMovement);

// ENDOFSCRIPT
