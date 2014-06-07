// ==UserScript==
// @name				Tails Emoticons on the Sega Forums
// @version				2012 Nov 24th
// @author				XFox Prower
// @namespace			http://www.TailsArchive.net/
// @description			Replaces regular emoticons with Tails emoticons on the Sega Forums.
// @include				http://forums.sega.com/*
// ==/UserScript==

//Angry
CSS='img[src*="mad.gif"],img[src*="mad.png"],img[src="images/icons/icon8.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAABAQEACA/7hQEHBwcOiIIPi4IKjI2Pj4+P///wAAAAAAAAAAAAAAAAAAAAAAACH5BAkZAAIALAAAAAAVABUAAARuUMhJq704az06H9ZgGAUYGoFRpcjYFeWQFulqHIg47kOJWoGDbsdDkVYFotJHWw2VpIAU+FwGMAFRiji7XmijrTGKIRBoUoNMWjBbAIj4AcYu4OKAdyDO7yMSeVgEfggEAIEaUgFmiBuOj5CRExEAOw==") no-repeat}\n';

//Cheesy
CSS+='img[src*="biggrin.gif"],img[src*="biggrin.png"],img[src="images/icons/icon10.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAABAQEKgAACBA+PggIACA/7hQEHBwcACY+OiIIPi4IKjI2Pj4+AAAAAAAAAAAAAAAACH5BAkZAAQALAAAAAAVABUAAASEkMhJq704a1kAqEVYYEWCfBSQmCGYlGsyqUuNIGKpeygBIIkFLBYbVlQwz0rJKqVuCUBtVVP9Xkdg7bA62DyII6BULQs/vRl5IQAoBLWC4SJdKBC1/AK/mFvcNQGCgjUKaRMGegEDjAF6fikeCguLjXY8GDyUhJgbHgYKCgaHG6Wmp6gRADs=") no-repeat}\n';

//Confused
CSS+='img[src*="question.gif"],img[src*="confused.gif"],img[src*="confused.png"],img[src="images/icons/icon5.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAABAQECBA+ACA/7hQEHBwcACY+OiIIPi4IKjI2Pj4+AAAAAAAAAAAAAAAAAAAACH5BAkZAAMALAAAAAAVABUAAAR/cMhJq704E5LHDhaBbJd4gNWGjOmIoNPqjptKKC+FnIHsjwocbHBaiX5GIaW3ORB6yN3w9ToEV4CsbDjoBQJWXFhx5Hq6N8POECxbUAFF7xQ8jAoFTFxQIAjqN0FcXwoJXwl1QQkFZhIFQZCRgnoBiJCLhI1wX5xwHZ+goaIXEQA7") no-repeat}\n';

//Cool
CSS+='img[src*="cool.gif"],img[src*="cool.png"],img[src="images/icons/icon6.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVALMAAAAAABAQEKgAAPggIACA/7hQEHBwcOiIIPi4IKjI2Pj4+AAAAAAAAAAAAAAAAAAAACH5BAEAAAQALAAAAAAVABUAAASCkMhJq70416JzQRwVBNeBIIEZSl9BUscYoMhR3F/9TnNdmKcaQvHZSVCjoLJARFUCrdMBeLo5KyiAdsv9GSUkAEKrUGhPgBjGtDUvv7wbV2qoGyyjRKKg/RzKCnAEAIBlU2UJBoJgCgMDAoUKCYsEAQYJj4iKgRoyl4pgHaKjpKUTEQA7") no-repeat}\n';

//Cry
CSS+='img[src*="icon_cry.gif"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAABAQEIAA/wCA/7hQEHBwcOiIIPi4IKjI2Pj4+AAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAlkAAEALAAAAAAVABUAAARxMMhJq704yzE0BoXRWdwnilw5hMAFGMdqzMUwG631Ioh9GzVArgLq/Y4jCkBGK4SAQhHRB6SKWAbi83SMDiWgm3XW+koIBCfuxrqgeTyBQAgamJWDA0KAcPLoH3CCcAcaQgEAem8Edx+JgB6RkpOUFBEAOw==") no-repeat}\n';

//Embarass
CSS+='img[src*="redface.gif"],img[src*="smile_tears.gif"],img[src="images/icons/icon11.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAAACA/7hQEHBwcOiIIPi4IKjI2P/A//j4+AAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkZAAEALAAAAAAVABUAAARxMMhJq704SwA0BkXRWYIwVqAglpMqXqChEgVBuCdKIEjoFwJayALY/Y4mgICiFB5DwkBO+fSBqChXlVBUTgZgcDXEIaAMvMMBCIJKzVmEGkcewHh43A1g+PDxgBw5EyMAA2iABoMfBgZgHB6RkpOUFREAOw==") no-repeat}\n';

//Evil
CSS+='img[src*="twisted.gif"],img[src*="evil.gif"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAAP///6jI2Pi4IOiIILhQENwAAIoBAfj4+HBwcBAQEAAAAAAAAAAAAAAAAAAAACH5BAkZAAsALAAAAAAVABUAAASMcMlJq70Yq1IyV5YyEJ1VDANYiQhZnUOhUmxLcgVBoig9IDAeT6dQEAYTY1DIg80kxgGAKU3JkLRjADCVAgJW2eqIKKPKiNQmREYYUAYz6AltGwkK+SXBJ5QPAgIHZQR8FgJoAWVFZYoIAntoAGgIkwgJGV8BW1yaABkLRYgIjpd0F0UJgUWnoK6voBEAOw==") no-repeat}\n';

//Puzzled
CSS+='img[src*="exclaim.gif"],img[src="images/icons/icon4.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAABAQEKgAAIAA//ggILhQEHBwcACY+OiIIPi4IKjI2Pj4+AAAAAAAAAAAAAAAAAAAACH5BAkZAAIALAAAAAAVABUAAARxUMhJq704ZwI0JkiHAQRRgWFpVgCCmOpxoO46tSDtvkBv4YqES7ar/V7Cl0JxQDBxrFxoaWgaAAfRaQdYYkMC7IXWVRie2p9Mlli6E+lb201fwkfZ+XIQUPhGdXx3Gl09CQkFBXEXfz0ACR6RkpOUFxEAOw==") no-repeat}\n';

//Rolls
CSS+='img[src*="rolleyes.gif"],img[src*="rolleyes.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAABAQEHBwcCBA+ACY+LhQEOiIIPi4IKjI2Pj4+P///wCA/wAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwH+/wAh+QQJHgALACwAAAAAFQAVAAAEiXDJSau9GIdSMg9WcBidVRwHWIkJWZ1HoVJsS3KFQaIofSQwHk8XCBgOEyMMAEAVUbCZxJhSKFBW0Ua0OlqvB2siRZIuqFaCTkEYFw0hryLwDbjP8bBiwNy7BRYAQAZfhSQJCYA0AoiIhY0CZhIIjQlWfYgIiiEBAgiFCEUZSQKempKjqaqrrBURACH5BAkeAAsALAAAAAAVABUAAASHcMlJq70Yh1IyD1ZwGJ1VHAdYiQlZnUehUmxLcoVBoih9JDAeTxcIGA4TIwwAQBVRsJnEmFIoUFbRRrQ6WglYQiJFki6oWZ0iMC4aQl7FwCpvn+EHOtPaFlgAQAZ0gyQJCX40AoaGg4sCZhIIiwlWe4YIiCEBAgiDCEUZSQKcmJChp6ipqhURACH5BAkeAAsALAAAAAAVABUAAASJcMlJq70Yh1IyD1ZwGJ1VHAdYiQlZnUehUmxLcoVBoih9JDAeTxcIGA4TIwwAQBVRsJnEmFIoUFbRRrQ6KgjXAziRIkkXVEVAQVSQi4aQd2BV0N9o+aHOtL4FFgBABnWFJAkJgDQCiIiFjQJnEgiNCVZ9iAiKIQECCIUIRRlJAp6akqOpqqusFREAOw==") no-repeat}\n';

//Sad
CSS+='img[src*="frown.gif"],img[src*="frown.png"],img[src="images/icons/icon9.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAABAQECBA+ACA/7hQEHBwcACY+OiIIPi4IKjI2Pj4+AAAAAAAAAAAAAAAAAAAAAAAACH5BAkZAAIALAAAAAAVABUAAAR6UMhJq7046y3BANYwZMBxgNRwjFe5Ap6orpg6JINhGvZelbeEaXjQwYoUoI44nJUmniJzaNQll0QDwNi7YosA3CGxtWwNS1FCTGZd1zrDuqAKoH4iRAK9jt7Na3pyCQEiBBoAenCDMH9miWuRCIccAAQIkwSOHJydFhEAOw==") no-repeat}\n';

//Sealed
CSS+='img[src*="neutral.gif"],img[src*="uhoh.gif"],img[src*="sick.gif"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAAP///yBA+ACY+KjI2Pi4IOiIILhQEPj4+HBwcEVFRRAQEAAAAAAAAAAAAAAAACH5BAlkAAMALAAAAAAVABUAAASKcMhJq70Yr3MyX9ZSGJ11FAVYiQhZncWhUmxLcodBoihdIDAeT7dYGAoTI6yIYsaaq+MCgUBRRRtR9Ee1dpUziZE76H2NoeOV+B0A0lwBVV5dJCwAoIGKKFJJVHc0CXwKClSGgWETBAF8CIl8BIIVAAGXkYaXbxp2l58BRRkTAAkJBJOco6usrRIRADs=") no-repeat}\n';

//Shocked
CSS+='img[src*="eek.gif"],img[src*="eek.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAABAQEKgAACBA+PggIACA/7hQEHBwcACY+OiIIPi4IKjI2Pj4+AAAAAAAAAAAACH5BAkZAAUALAAAAAAVABUAAASDsMhJq70YB2MyD1agJJ1lKApYiQxZnYqhUmxLckZCoiitMDAeTxcIJBQTI6yIYsaaq2OAwUBRRRtR9Ee1dpUziZGLQCG+xtDxSvwWwuI1Y0ClVwMHCwCYoDKKVCRUeTQHfoeHB3ASC4gCBIcLhCF4jQQCDAtFGUkHBwuSi5yjpKWmFREAOw==") no-repeat}\n';

//Smile
CSS+='img[src*="smile.gif"],img[src*="smile.png"],img[src="images/icons/icon7.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAABAQECBA+ACA/7hQEHBwcACY+OiIIPi4IKjI2Pj4+P///wAAAAAAAAAAAAAAACH5BAkZAAMALAAAAAAVABUAAASOcMhJq70YB0IyD1aAHJ1FIAhYiQpZnQihUmxLcsRBoiiNKDAeTxcIHBATY1DIg80kRlRRKkrJkLRjQKFAcUUb2erI7f64qU2IrDCgDGjQE8o2HrbduaTAP3AFCQkCXAd8FgllC194igoJFwVlAGUKkwoFGQALmwCdmgsAGQNFiAqNl3ohAQWBRamisLEZEQA7") no-repeat}\n';

//Tongue
CSS+='img[src*="tongue.gif"],img[src*="razz.gif"],img[src*="tongue.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAAAAAABAQEKgAACBA+PggIACA/7hQEHBwcACY+OiIIPi4IKjI2Pj4+P///wAAAAAAACH5BAkZAAUALAAAAAAVABUAAASNsMhJq73YGKt3Vh5lKEkoKkrAKUxZjWCgnkzbaUmJolTAwrtdzuBTTHwwDUoJQs0kgVyqhqr5AkRjL8GqcWuMVOkJ/TIQXARVlrBEu+/AukAuAN61QX4NqBxqBzlWC14JgH6EDA2LjA2ABxcAYACUlI59GHQBCwIEngILMplHnZ91o6UEAqMXnaussBcRADs=") no-repeat}\n';

//Winking
CSS+='img[src*="idea.gif"],img[src*="wink.gif"],img[src*="wink.png"],img[src="images/icons/icon3.png"],img[src="images/icons/icon12.png"]{width:0;height:21px !important;padding-left:21px;background:url("data:image/gif;base64,R0lGODlhFQAVANMAABAQEKgAAPggIACA/7hQEHBwcACY+OiIIPi4IKjI2Pj4+AAAAAAAAAAAAAAAAAAAACH5BAkZAAMALAAAAAAVABUAAAR2cMhJq704a0nAvgTifVTYfUSaIiGCUEAcp4drI0f3SkDttraYqzYaAHAKxQ2pOPYqPYLydkgqZdDc8mBIioyWHkt8ACRzmZ6z3FVUi9BO1WpNwCeABD3AD1jveAV6CgKFAkmAeHuFAXYaZjF6fI4bI5EkmJkZEQA7") no-repeat}\n';

CSS+='.cke_hand{padding-left:21px !important}';
Style=document.createElement('style');
Style.type='text/css';
Style.appendChild(document.createTextNode(CSS));
document.getElementsByTagName('head').item(0).appendChild(Style);