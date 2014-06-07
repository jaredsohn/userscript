// ==UserScript==
// @name           mobile me
// @namespace      gmail.com
// @include        @namespace url(http://www.w3.org/1999/xhtml);
// @include        @-moz-document domain("mail.google.com") {
// @include        /************************************/
// @include        /* PHOTO PICKER   *******************/
// @include        /************************************/
// @include        /* to do : http://mail.google.com/mail/contacts/ui/photopicker.PhotoPicker */
// @include        /************************************/
// @include        /* CONTACTS *******************/
// @include        /************************************/
// @include        #contact-view  div,#contact-edit-table div {color:#666!important}
// @include        #contact-view  a ,#contact-edit-table a{color:#1A3764!important}
// @include        /************************************/
// @include        /* ADS            *******************/
// @include        /************************************/
// @include        div[class^=rh],.u8, .u5{display: none !important;}
// @include        /************************************/
// @include        /* LOADING  *******************/
// @include        /************************************/
// @include        #loading{background:#2F3339 !important;color:#f2f2f2 !important;}
// @include        #stb, #stb * {background:#666 !important;color:#f2f2f2 !important;}
// @include        #lpt{background:#ccc !important;}
// @include        .lpb{border:1px solid #666 !important;}
// @include        /************************************/
// @include        /* GBAR / GUSER   *******************/
// @include        /************************************/
// @include        /* background 1 */
// @include        body.editable {background-image:none !important;}
// @include        body.editable {background-color:#fff !important;}
// @include        /*.cP*/
// @include        body {background:#e4e5e7 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAKYCAIAAAAwn3U7AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJiSURBVHja7JVBchwxCEX5Km4QXy27bHL3pFLl3KFJwwepXeNF9v52zbT6CSH4IA2+//hpL3/+/v73vEV9YB6RQ8AiX5MjbOVb5Jdxvr7dGteC6wqkrRertQi6viychrE3ywdWXNY00iU/zp2QC60CyXnnoKKaNWarV9kVjIy52RjbY9vObedF10kZLPJ5XTW9GE/9X7X8TiL9drCYGFCRMWCjq3t0pZIdPhfXiOpsAThCxltqU/L6WEy8le5jgY/8vb6sqUMuolhVqcyiYcSdl1Gl2q3XV8is2wp71GKE85G/HdtRkpneEx1zRXbM5uPdDt0T9ag+G232/B0Zkw1QAu6GtXUY4Y3dZ8+mYquuXjdtQse78rY78A5ivR6K1Mw++/siFJ/S+G8P+EiBKnbMVL67sQMwxnlLYKFt+ARn/R6wwYLHNSfYZ2crNktWsypantE9ee+GMQGrXueNBsdLuV9PBl4QSNu5ELcb7oaze2ZbuZXj3e/s2fbbflBJYjG3x4bgzcX4u7frZJa+Cy3OKm1yf1/oPt8DxmB5k1X/b5Hv3VYXkmmBN8ERp88xcNTJALDvHdrlQbpDqAsgbaewnUNtsvzIsH9aED7yg3rzuWpRva1TOK+AgNM5oA4lIHDqfmec3cPLYo1rejjVwfll6HsLO7jMbY1YvJ+qxD5N2irSwKkVeBfNDh9sMXXzijc627nbV4+my3kE/Bh076Ue/vb27fW84dfvP1/2jhIVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUV/QL0nwADACH2SIGi00J8AAAAAElFTkSuQmCC) repeat-x 0 0 !important}
// @include        #guser .e {background:none !important;}
// @include        /* text colors */
// @include        #gbar a, #guser a,#gbar, #guser, [id*="pa"], #guser span{/*color: #59636d !important;*/
// @include        color: #ccc !important; } 
// @include        #gbar a:hover,#guser a:hover,#guser span:hover{color: #fff !important;}
// @include        #gbi a ,#gbi a:hover{color:#40474D !important}
// @include        /* active application */
// @include        /*.gb1 {color: #DA3838 !important;}*/
// @include        .gb1 {color: #eee !important;}
// @include        /* profile*/ 
// @include        #guser b {/*background: url() no-repeat 0 3px !important;padding-left:16px !important;*/}
// @include        /* help */ 
// @include        [id*="p4"] {/*background: url() no-repeat 0 4px !important;padding-left:16px !important;*/}
// @include        /* top line */
// @include        .qp{border-bottom:1px solid #555c61 !important;}
// @include        /************************************/
// @include        /* LEFT MENU ************************/
// @include        /************************************/
// @include        /* selected menu item */
// @include        .pk .qk{border-bottom: 0px solid #c7ccd1 !important;}
// @include        .pk * {background:#8393A5 !important;}
// @include        .pk .p9 {color: #fff !important;}
// @include        /* sent mail */
// @include        [id*=":qw"] ,[id*=":p9"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI1SURBVHjajFJNi1JRGD5eHWzyih8wMpFaLhSqcZFMrgR/gERBixDSX9C2jQs3bQLbtIlhdrnIxchAEIKQgWBiUEib1E2Ghoqg4yfXz3t63su9g7WpAw/vOe85z3ue90PHOWf/u3Q6nRHmyo7LKfyDYABE4ABwwXWYy+WOhsPhs/l8fhaPxy2MFGjAooBXATtwHbhBttFo3F8sFi+32+3FdDrlIPNyuXyKuzu7ZFEluKLRqKvf7z8G4Q3u5gAfjUa83W7z2WzGl8vlT6fT+QRvbZfkRCJxt9frPcX5M7Dk6lqv17zZbCpk2tNKp9PPwblHXB02VJjbmUzGYzabN/j1WJIku8lkcg8Gg8NAIHDT4/EciKKo1GU8Hn+yWq2vsH2PAJKBZOfz+eNwOHy6Wq0YAiiAZIYfZaQi+P1+ra7bVCr1DvY7kRWP2+2+BcI3TTL2itxarbbudru8VCpxFFC5a7Va56A8BAxa7QxwXtPr9S+CwaCYTCZPNpuNMJlMmNfrNfh8PoY0FDUOh+MiFovlQK6CuNEkUaSP2qFSqTxAGhFKwWKxrAVB2LPb7ZQKq1ar58Vi8ReetXZn5Y9B6nQ6b+v1OisUCl/wc5Z8NpuNybJci0QiRRy/8r9GlyaNOrEH7CONImpyks1mXyOtR6FQiBmNRoYOZdHiMRURz82wK4B6KhOZsA+YVUuTSN0JqIP1A7ACH4A+IKkBtqRGC0AEvToTonqmQpFcmR6rJEn9+TKN3wIMAPjeWYzFv3IVAAAAAElFTkSuQmCC")  !important;}
// @include        /* compose */
// @include        [id*=":r3"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKPSURBVHjalFJtSFNRGH7unHPeOZuy/IK0QlPD9aMRSCoOdAkGSWFEFA1CsqRwidWPVlA/8k+/oy+hskLLH2IQaeY0WR+yEHShE7da2RLcnc2m5T7u6dyLGypqdeC55/De93ne57znZfAf63C5Hke12qSu4ZEeOR/kQn7fNSmNZ1Js/EeNWPOPmVd7crayqunv6KAQBFIJIYN/Y/6c/oZbd++T4hIdk5cBDNRfARMIqQUBmZBgs9nAcRzm5uaQlZUFl8sFlmVF8i5NLtqu16B8/3kmZ3sBnjzrwsfklPnnQyO1wv8SnudJOBwmoVAoCp/PJ8ZoZXKnoZhMjb4g4w/LSWvbY1JnbCTabdl6ypVKIxadTif8fj8SEhKgVCrF2OexYVifmrCv5hK4vpOQJMXBa7kRdLyfNXwYn+inKaGog0AgsAyerw7S3FhKpsa6yejNLWS0NY801xUEdudl7qWc+EjhqAOPxyPuXq8XCslvmFuMqDxuAmeupZVlePdGjqaOSdOE2/OSpgUiPInwoQ6gUqlEpKtZmB/Uo/LYRXj7T0GiomRLPDIrroKSrUvJyxy43W4E5zn03DuL6hoTvH11UKTG4rV1A9LLzqFQVyakBVc+r+iAzgFS1Cq0376M0qozGOs8DYY2bGAoCeqdRmiLdJDJZKvOhyRyGOjtxEHDCcxMDmKBl6HXmohfGUegTN0E2tQ1B0wUEBJaHrWDn7WBl8bg7WQGNpdcQNWBQ9BoNFAoFGAYZm0Bi8UCh/MTGpq6MfyFRXahAWxisjgXwvUiWG2JTbTb7SgqrYBer0d+fj7S0tLoiEX7u66A4CuXYgeFnGJeeNU1rrtA4RDqrRSIoYhb3Ndb4UWR8NLgHwEGAFhkJIrPDzveAAAAAElFTkSuQmCC")  !important;}
// @include        /* draft*/
// @include        .qk  [id*=":qu"] , .qk  [id*=":p5"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHvSURBVHjajFNNTxpRFD0zo6KICIwzFrTK6MqYNum2C1Ya/Rf8AfgJ/KSuumiN2lXj0miCXzGoDYIydAYQUJNh5vW+x+f4kfQmJ3n3vXsu5x7uSAA+4+1wCTLhnmAxxry3ir6wF+F5Hjs4PMnzs2mapVwut84bUYpRjNHl1Mtut9Um6o0nToCmaYlMJrNLx01Jks5GFYz10NVJ3a5LdTgdF4rEBs10XY9ns9k9Om6MNhgQO66H8z8WgpPjCIwriIYnfWpIwQdSsE/HLWrAR3IF+fHZwen1X+ixacTVEPJXFURmXk3DFcxTgx1FUbYpPeJ3qd/HRVauNoVZN3cNVijZrFAosPeCTLzrG4a15BxiJNMl6RW7hU8rGmr2E77//AXr/hbWwyO0SBCyLHNYjuP8SKfTXXKsN1/ZaiMUnMAUzS2rKjARQSqVxGWxJu7j6jQnq4ZhfBuQeXD7ipUG1o05kQcCAURUDYaxiJgWxwl5skxnuVveQm+DRJhWS8iaDQ1d9mguclaYRyahardFTsF85KtyHYt6yL+f7nAj+RuvGQ1Brj08o01/V0IL+x477nBR+Buv4bU+8kXRxtJ8eCij/8ue5yv8qIdFrY9s1lpYSURfLQV9H758dSEqavvBp/9KSBJm8H/RJNzQkhz8E2AACnQDyE9PPJgAAAAASUVORK5CYII=") no-repeat !important;}
// @include        /* chats */
// @include        [id*=":qy"] , [id*=":pb"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIqSURBVHjapJLBa9NwFMdf0l/atGtNf4GOVBwYJ8wMB1a2k7sY8WAPQ/DisKWHeqs7uUOhHvwndpFe9bjbehEidLIIkxapEA9ChSEJW0O6OW3aJo2vwmSI08K+P96PvB98X97v9z4MnFJmMSNRSovyZVmVJEmmCUpdlHlgOqZlNk3TfImp1nzfdE88zG/zjUxFWVCeFfPFH/PKPJ9MJjkgwIIHgdkxfaNlDHZ2dxL6O93AQk+Mj4Y29oXGm3JdqRZyhfVyuQxzytxULB7jWMKG2LEIywoXBDIrz0aEhABiUowN3MFjz/OOO52OHlKuKUX1jvq8UqlAOBxmR6MR/DVwTUvTYB/Y4ZSUGlimdY8Qsstim8X8w7w7HA5hklhaXIIj5yi8fGv5u+u5TwlPeEWkItfv92ESMRwDLMeCmBB59N4kWMWxbGsqmoiGJqrgAXQPu0B9OsLMITiWWv1NvZReTU/kb39uA3pgv7fPYboZSl9MN1ofWg/ElEhnLs2A7/tnhm3bsF3fDgRRYGpbNZ2P84VfHOAkZLxKNbOQUdW7KkT5aB/PIid/dY9dv/2l3e+5vViz1QT83uh9660jEy5zur0xgTiVLD5OduX+yhX1thrZ+7oHCFEX224gUBpC9Ep/q7f/eU/5qlzNreYOqy+qARLaKK2VkmdO5c8DpDIry/IWdgPaa01DpB9hq9ZEBdAsOV1Ho3FqYrphfDI2/8tFEARwHrFwTv0UYAB4XSGcAJFSYgAAAABJRU5ErkJggg==")  !important;
// @include        background-position:-20px -20px !important;
// @include        background-repeat:no-repeat !important;}
// @include        [id*=":qy"] .pV{display:none !important}
// @include        /* inbox */
// @include        .qk [id*=":r2"],.qk [id*=":pf"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIQSURBVHjalFPBbtNAEJ2112vXNk1ax4kdy4gkh6ZICFUChJDS/gYnPoITH8GF74hQCPmBFEXckMKp6gGpF9wkRZQmUOI4tpnd1CimBYmRxiuP5719b3ZN0jQFHoQQhss9TAn+HQnmR8QtxRsnuCIpDwaDV0EQpH8L/m04HL7G3u0MRzPadrvd8n3/iSzL8OxF+8atXz4/ANu2H3e73X18fcNr9Eo+7ff7O4Zh7J2eXYJrWTcSBGc/wXfMaqVS2UPMW1SQZAqK5XK5hrvLJ+MZ3K5vAWVKHo0uR9MI7ngylEqlu1gpYJ4Lgk6n03Jd9z6RZDj9FsGGoYIsX5/leLYQM7Ysq9nr9biNroRSJM/zHkqS5IzP58B0DXSdgaoqudQ0BZjGcIMQKKVVxDziWK7gFg6mpqqqH0xnoJsqPxqQaV5BvExAwdr4RwR1d3MbbTQ5luCjHobhe8ZYJWt+dxTANEpzBJsKgf3daq6GCupcgY2SjA8nX0XR1ChMvszAcwoQpUTUFJLC59EFHI+m8H2+uj+NonTI7w7F6VP0bzoF7TfzFnqOoxjmy5UKiRJRM1UqUhxbUT/gWDqZTIRZZW3qzZoNR59GML1YrAgKDHYbTq6HB8fS7O6ztaFtMA1aDxqgSCsLUZLCYhlDnKR/nqwgEF0qlfN/DDaHawD0CfT61SCcIMZpPsVVh/+LS479JcAALnm9g8fSnr0AAAAASUVORK5CYII=") no-repeat !important;}
// @include        /* all mail */
// @include        .qk [id*=":qs"] ,.qk [id*=":p3"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHKSURBVHjajFI9SwRBDE3m5q4XrlFExMpCQbQ69EAEbbUUK8XGyr8gWNj6D0R/gYrlgSgKV1nZi4WNYCF+3s3OJiazM+tqo4Hszkfy5uUlCGqTK4vt+bl1qNjVxfUh3J504A+z+tHkrdXlNV2zOCaQfwDgzObO3lCzOb80OzNaveh0b+6hApb+NSxWnhkeHp8u7XBzoLW7vdEC5hhCgGigPTUx6CkPnDICyJiAiYGIIBxjHfYPjlwo4fn1XfJ8BCiKIE2SM5QtMYITAFlAHpzAmEaIs95l/vVTAtGDiVyVTC6fmCPuBRblXBlwwcqLi1mhR16SjJeF1BeuWUM4JKNs5AoUTe9IgXUbHmK2uvXCnr0UFgXiiEIRpASUDac2GVJd2KpQL30PdSLgsokcX9OHRVTVJJ4ly4UV5oTCAI1zTtriSwkBfr6amlisiggyDnJj0AqSfcs81CgrA5GrQKK69h8qA6Hl1WrKsG71pc++BASlDahe2g1tY+iKKcAsQimwCYNUULI6Ha7fEw16OkLfKnDkExPpx5SIBlZjRMRe7+P99Oy4q6fmj7lPIKm+BtIbjrUWRu665y6Wmdz88kQiucqSj4xPN74EGADnqSFHPRNieAAAAABJRU5ErkJggg==")  no-repeat !important;}
// @include        /* spam */
// @include        .qk [id*=":qq"] ,.qk [id*=":p1"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJhSURBVHjajFJNSFRRFP7ue/e9uW/mPR0nx6mMCsRNJIKbLIgiCDcmtGnRMlyErloErSIqWrQIXEYtIoJoFVmbIjeBhLOwcBEISRgyOEM66jgzz/vuu6/jTSWkrAOH+3POd/6+w5IkwbYwxi5gDyHf17+/+W4QOYz/CUg+Q7v/+PblafH5+F5Zbwz3D8y9GS53DT4u7oA/3mGvHlw/l8I/pKc7Pzr1pTI6OTOocrL0aPDW9AiXyhnqyLrQfwG9+PDZnHb/bXPqqXtcq9Qluo5YpUq6KNfK+F+pLdeQgJlcfHJWXhs6tjDR8va+EO05FN+PYWO1iURG0EREgSWImwqaHlbaha1CLMw3n5gh9vZCjA20VoVfEKJwCJvMJUqDWWzTjCQmsNyA3ogAy8Lct/nS5YeLPcTKMr950u/O5PPCCbJwswFsLsB2iEgoWAxNVcj6GmRtGS05v/DsKqTxoPJOxFEDdmRRJx3gIkNZnW3WYZbIS2ALh2wcgWb2ev3AKTK+syyl+xCHVFYNOqaAzDblGmgcU8kNJDqm7xQs7sDzbMRanjWZU3bUx/2DcDMBUq1H4WQKJqNWEVRjibQGx28nxzZq2YNHFTqpxTMGTMGOO14b9bsfbksnRPYwZdKQ6yVE6xUanjRv7uXA/DRkxCnQ1yMGvKTbVCbOwHH2QWmXjDaUVIgaknoX4Ok8mJtFoxkjDFewUqkSKqga8N2X1dPDP2avdHaVzzM+TUPxaZ0AVacZhGEX04ngwoUTBKsR+Ey9IT99L9cmLm5NxiLNkvq7lim1M7lfEpOGW1onFsKfAgwAbiYCH9Ln95IAAAAASUVORK5CYII=")  no-repeat !important;}
// @include        /* trash*/
// @include        .qk [id*=":qo"] ,.qk [id*=":oz"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKKSURBVHjafFM7T9tQGL3Xj8Q2TkTsEB5xWhREtlai6lKpVFUXOrVDh05QqTNLOpSNf0B+QoeqFVLF0AHRpSMsRYKggkraqnk4RCYJSWwMSRzbl+9GELUC9Up+XZ/j833nfMaEEIQx5jOZzItOp/PE8/z7ptlSbdvmYZ9I0pCnKBEzHA7/hOeNxcXF98DpYUpcWcl8yOf/PO52uwz6zxIEwde0xNbS0tuXHN2o1WqPKMlxHNRoNJAkSaharSJVVZFpmigWi6Fer0ehTKvVfNC/oafR0Vi53e6QQqGAQqHQgAQfRJFIBBmGgQKBABoeHiZTU1PGgAjA9dnZh3hu7ikSRalPKpeP+sonJyckmUySRCKBJiZuY6jqC+X0e6RreXn5iOM4b2bmHta0OJRNUDg8BMYRf2dnxwd1H1YwnU5PUDx31Ti8cCcnbzn7+99xvV7FlnXKybLkWpbNgLLfbrcZ8GFg1N8unhtGlWNZljeMYzYej/eq1ToXjUZxs9mEFgMMjeEakef5FmTVqVQqnizLKJvN8pqmdXW9RERRdKlxkGP3GhGUGuAeNzY2RsvGqVTKzeVyUjAosKVSiVMUBbmua9+kWFeUaO/w8DcrCCFub++HyPMyLuR1dmRklKHRQLmVG4jB9sFBzg+HVZLPF7EoysiyLDwOEejlY+Q4uOP7+PQGcxgdJuRM1wueKMlesVREpnWGvm1vw9R0CTgNw6AMFAdxbG1tNtLpN+eVypG7u5sNMtgjqhrCd++kYCiGCPTOrK19al3hBwMAjk3Oz796vrDw+pltn46rakycnk4SQWCdjY2vtfX1z5urqx/fAf7XP8RL8jhcEnBE6c9w2QqNgCqVAFu8wl4IMADsPDp3O7RD4AAAAABJRU5ErkJggg==") no-repeat  !important;}
// @include        /* starred */
// @include        [id*=":r0"], [id*=":pd"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIBSURBVHjaYmTAAVYuLLjDyMDIyvDlp3ZY9rQv6PJM2DStWVwcKSQspSAoLCnDIsQViU0NVo1MjEzd2jqWzHr6tkwM/5ia9zc0sBDUuHxebggTM7OghLgEg5iYKAMLC4vAC+k3NujqGJfPy9/7//8/J2RBMwvbX8rK6mwg9t27t/6cOnEIxUagwUdZmJkZ9Q0NTRlUVFSR5dgY/n0DM5QVZViUFaPgEvfu3WM4e/a0Bsu/3/8crl65cuz1qxe8FmZGDIxMjLgCmuHipWsMDx8/+czKwuoCVrVqahYPpwjvAWZmJgM7W0Nmbi4OFA1fv/1gOHnq2t8v3749YGHksvEOa3iBYvz6ZcV3NNWkldVVpVA03rn3nOHy1cdPBe/wKTg2NPxBCdUls3Nl/vz+Ky8vK4LhRDlZUYa/f/9JvJR5p4ERHVwcLL1qqpJMHBxscFtu3HwGCSlWFqBmEWZ2DtaZ8OgAx938AgVGxv+3fNyNWFlZmRlOn73z5827zw+YmZi/cnCyaVuaqrL8/PmbYefei0Cr/mtGJU65Abbx//8/NkIC3C/evP3MsHXnuV/vP3ybxn+TV9M3vMvg9+9fpbv2Xfz57dtPBiFBnof//zFagPRAIvY/8wOgDVIfz965w8zKkg7UsA/mJK/grgmr5metOHXu7nqgrSZM//4/AIkDBBgAYcy2aUK6sSAAAAAASUVORK5CYII=") no-repeat !important ;
// @include        background-position:-20px -20px !important;
// @include        background-repeat:no-repeat !important;
// @include        }
// @include        [id*=":r0"] .pW ,[id*=":pd"] .pW {display:none !important}
// @include        /* contacts */
// @include        .qk [id*=":q5"] ,.qk [id*=":r1"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAMAAADDoWbgAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADAUExURcyNRs2aaf/SheOcULRzLKJ9Rv3BevutWnpVFPalTaFcAquHT6hjDf+9bOahWe3BlrR5OPLMqu/Cmf+1Yf/8rZpVALVyI49oL61qHpl0PdKHMv/Jdv/Tf69tIv/fjvyrUohjJv/EdfCjUdKSSee9lMiOUNypdoRdH/m9dciui9uvhd+xh5RvNVYwAM+gctOga+K2iuGnbeaqZ//1oP/KfMGJTVcxAFYyAJtVAM6EMf/Ff//9rlUxAM6EMs2EMVYxALG5JrQAAACjSURBVHjaLI7XDoJAEEVHQMEVpAlWwIK9IJZlkS3//1eOwfMwyc25k1xQVAlZCyHxSlBH1YyalhrogD8/LakAhanXomGzy9PDhsR2/NBqqDBBkhedt/0SUE3VgtyJwXZshe7C5wwmLisjB//G3Im2zGaG52BzeQ0973Y+FW6Ibq/M3CAJKYemBGqptR74gT/UM3QWzfp/JHBezX6TJU6XXwEGAC0WGyUhIhlLAAAAAElFTkSuQmCC") no-repeat !important;}
// @include        /* tasks*/
// @include        .qk [id*=":pd"] {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPCAMAAAAI/bVFAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADAUExURaDNh43GbmmTVTtvJKzSlT9zKKPOi6bPjqPOijhqHozFa53KhMzNy7rXqYrFaZDHckN8I5XJdzRfG1KYK02OKFahLmiXUYTDYq/TnGK0MsLds5rLfkR2LrbUo0d5MabPj7bQqFuMRIa0bqLAkqfQj22cVlyqMLTWn5rFgWKSSnKaX5bCfanRlFyqL2eXT5bKeIfEZq7TmD90IXSjXGCvMUmIJ63Tl8TetYXDYyA8Eb7Yrl2sMVyrMCE9EaLNiczMzN06+4gAAACZSURBVHjaNI7VFoNADESDVaDuLUXq7ka6m93//6sGCvdhTu6ZeQgQkZBSCMkpgQz6FrCNsa7+3ATQE4PcjiegNY6y29stedlHO7NZWOJll8qpPCzL466HoObbgxPGwPZC/2ytBtP47fOyRZfAdJyFrdrc3cmIPuZ+o1STrUpDVZmkH7hsHXKT5NpIGAmIlL/MAVrrmi74CTAAGgUj+UaxC68AAAAASUVORK5CYII=") no-repeat !important;font-weight:bold;}
// @include        /* no background, no padding */
// @include        .qk {padding-left:00px !important;}
// @include        .p5,[id*=":r3"],[id*=":q5"],[id*=":pd"],.qk [id*=":r1"] {background-position:top left !important;
// @include        background-repeat:no-repeat !important;padding-left:20px !important;}
// @include        /* links color */
// @include        .qk a, .p9  {color:#40474D !important}
// @include        /* border bottom */
// @include        .qk{padding: 3px 0 !important; border-bottom: 1px solid #c7ccd1 !important}
// @include        /************************************/
// @include        /* OTHERS    ************************/
// @include        /************************************/
// @include        /* active focus*/
// @include        .tz3lV,.mFwySd:focus, textarea:focus{border:2px solid #8393A5 !important;}
// @include        .css-np-clw-palette-cell-hover .css-np-clw-palette-colorswatch{border:1px solid #8393A5}
// @include        .dH86Yd,.GTx9Hd{background:#8393A5 ;border:1px solid #8393A5 !important}
// @include        .BUzdXc{border-color:#8393A5 !important;}
// @include        /************************************/
// @include        /* REFRESH ************************/
// @include        /************************************/
// @include        .AP {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIKSURBVHjalFJdixJRGH7GZoyWVmNJrIUWjYXIDATR1Ou2UegfFAhd9AsiumsvI/oB9gO2Cy+6bb3TXAW7CIJBRoIl0nHTUddRS2d2cHrP2V378GLZB57zzjnzvOd9znkPsAwX8Uo2m703Go0+zOfzw3q9/pLWrhNXcAa8yWTybrvdfmdZ1ozozGYzh8XJZKLmcrmHpFkjXvg/8TJxXVGUNyQcjcdjZzAYOL1ez+n3+zwahuFMp1O72Wy+D4VCt0m/yhIFZrdQKDyJx+PPNU3z67oO2gSCICzZkyQJfr8fgUBgWKvVtmVZ3mHrN6nCL1VVnXw+75wFpmk0GszhnHJvicyKx+O5VKlU0Gq1eKUXOwqNzonBP3j1KMw1brcbwWCQ/VwRj51JyGQyIFtceLCvwnttA4JLXGwx7H6nMYxIJIJUKsWPQxBdp2Vs20Y0GgVdFFLhdXz78hG6to/DfgdfPxcRvrEK6ggSiQSotf/0nOPIsmATWdy4OMTb7afY9EkQf2p4/ewx7qyZsExzoTkFqx6ju/nU63ZpJqBarUJOpzE2jBPF8SE8Xi8Ku7vcAevQVZ+PxfjCAT0WlEolPJBlsM1YNbZmkW1GvdPB/a0tlMtlmDRfOkJ5b49f5IGm8USTJS/iEf/+0W4jTQUq5PJvxKiyc14Ui0XW5xg74CbvD71InA9DovJbgAEA24Ndr+BWzIcAAAAASUVORK5CYII=) no-repeat 0 3px !important;padding-left:20px !important;margin-left:20px !important;font-weight:bold !important;color: #40474D !important}
// @include        /************************************/
// @include        /* BUTTONS   ************************/
// @include        /************************************/
// @include        /* global buttons */
// @include        .UHrcr, .Gjckbb, .GacLaf{color:#222 !important;padding:1px}
// @include        /* search buttons */
// @include        .bM .goog-imageless-button-outer-box *{ color:#f2f2f2 !important;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAXCAIAAADlZ9q2AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVHja1NWxCYBAEERR584CzkwQLMDAwJ4FwXa8LtQCdlewih/cNvCYmWC1rFtHnvbjRIH+qpUFIj4WcHcYiGg9gcGA0Qki6AR4RWYscD8vC+ScWSClRAOCK6IBqfUNhG8gOEEZCvv0x2lGgV+AAQAPSSNGaAT6LQAAAABJRU5ErkJggg==) !important; padding:3px;border:0 !important;}
// @include        .bM div {border-color:#666 !important; color:#fff !important; margin:0 !important;}
// @include        .bM * {border:0px !important; padding:0 !important;}
// @include        .bM .goog-imageless-button-content {padding: 2px 10px !important;}
// @include        .bM .goog-imageless-button-top-shadow{display:none !important;}
// @include        /* search input */
// @include        .EGSDee [id*="ra"] {background: #5F6469  !important;}
// @include        .ZRiJh {width:140px !important}
// @include        /* hide search the web */ 
// @include        .oF1kyb {margin-left:48px !important}
// @include        .bN .nr {background-color:#404347 !important; width:180px !important;color:#fff !important;}
// @include        .nn .d {margin-left:20px !important;margin-top:15px !important;}
// @include        [id*="r8"] {display: none !important;}
// @include        .tYBwhe {margin-left:8px;}
// @include        /************************************/
// @include        /* CHAT/LABELS/WIDGETS  *************/
// @include        /************************************/
// @include        .p9 , .gd-a, .HHshnc, table.gd-data-table a.gd-a{color:#40474D !important}
// @include        /* color : fff*/
// @include        h2.pw{color: #fff !important}
// @include        /* minus/plus */
// @include        .pv .pq{background:url(http://mail.google.com/mail/images/2/5/lightsoft/icons6.png) no-repeat -70px -30px !important;}
// @include        .v2dpPe .pq{background:url(http://mail.google.com/mail/images/2/5/lightsoft/icons6.png) no-repeat -60px -20px  !important;}
// @include        /* color : 8393A5 */
// @include        .vB{background-color:#8393A5 !important;}
// @include        .E4KNxe{border-top:1px solid #8393A5 !important}
// @include        .nfZEf{background-color:#8393A5 !important;}
// @include        .vXIXsc{color:#8393A5 !important;border:1px solid #8393A5 !important}
// @include        .r .p{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=4&h=4) no-repeat 0 0 !important}
// @include        .r .q{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=4&h=4) no-repeat -4px 0 !important}
// @include        .pS .l{background:#8393A5 !important}
// @include        .pS .i{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=3&h=3) no-repeat 0 -3px !important}
// @include        .pS .j{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=3&h=3) no-repeat -3px -3px !important}
// @include        .t .r .p{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=4&h=4) no-repeat 0 0 !important}
// @include        .t .r .q{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=4&h=4) no-repeat -4px 0 !important}
// @include        .t .i{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=3&h=3) no-repeat 0 -3px !important}
// @include        .t .j{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=3&h=3) no-repeat -3px -3px !important}
// @include        .s .l {background-color:#8393A5 !important}
// @include        .pY .l{background-color:#8393A5 !important}
// @include        /* labels */
// @include        .pu .m {background-color:#8393A5 !important}
// @include        .pu .n{background-color:#8393A5 !important}
// @include        .pu .l{background-color:#8393A5 !important}
// @include        .t .p9 {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHKSURBVHjajFI9SwRBDE3m5q4XrlFExMpCQbQ69EAEbbUUK8XGyr8gWNj6D0R/gYrlgSgKV1nZi4WNYCF+3s3OJiazM+tqo4Hszkfy5uUlCGqTK4vt+bl1qNjVxfUh3J504A+z+tHkrdXlNV2zOCaQfwDgzObO3lCzOb80OzNaveh0b+6hApb+NSxWnhkeHp8u7XBzoLW7vdEC5hhCgGigPTUx6CkPnDICyJiAiYGIIBxjHfYPjlwo4fn1XfJ8BCiKIE2SM5QtMYITAFlAHpzAmEaIs95l/vVTAtGDiVyVTC6fmCPuBRblXBlwwcqLi1mhR16SjJeF1BeuWUM4JKNs5AoUTe9IgXUbHmK2uvXCnr0UFgXiiEIRpASUDac2GVJd2KpQL30PdSLgsokcX9OHRVTVJJ4ly4UV5oTCAI1zTtriSwkBfr6amlisiggyDnJj0AqSfcs81CgrA5GrQKK69h8qA6Hl1WrKsG71pc++BASlDahe2g1tY+iKKcAsQimwCYNUULI6Ha7fEw16OkLfKnDkExPpx5SIBlZjRMRe7+P99Oy4q6fmj7lPIKm+BtIbjrUWRu665y6Wmdz88kQiucqSj4xPN74EGADnqSFHPRNieAAAAABJRU5ErkJggg==")  no-repeat  !important;padding-left:20px;}
// @include        .t .p5{padding-left:0 !important;}
// @include        /* google calendar */
// @include        #remote_iframe_0 {background: #fff !important;}
// @include        .pS *{border-color:#8393A5 !important}
// @include        .s .r .p{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=4&h=4) no-repeat 0 0 !important}
// @include        .s .r .q{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=4&h=4) no-repeat -4px 0 !important}
// @include        .s .i{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=3&h=3) no-repeat 0 -3px !important}
// @include        .s .j{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=3&h=3) no-repeat -3px -3px !important}
// @include        .pY .r .p{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=4&h=4) no-repeat 0 0 !important}
// @include        .pY .r .q{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=4&h=4) no-repeat -4px 0 !important}
// @include        .pY .i{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=3&h=3) no-repeat 0 -3px !important}
// @include        .pY .j{background:url(http://mail.google.com/mail/rc?a=af&c=8393A5&w=3&h=3) no-repeat -3px -3px !important}
// @include        .O2qWKd .l{background-color:#8393A5 !important}
// @include        .dI{border:1px solid #8393A5 !important;}
// @include        .r .l,.r .k{background:#8393A5 !important}
// @include        .r .o{background:#8393A5 !important;}
// @include        .r .m{background:#8393A5 !important}
// @include        .r .n{background:#8393A5 !important}
// @include        .t .r .l,.t .r .k{background:#8393A5 !important}
// @include        .t .r .o{background:#8393A5 !important;}
// @include        .t .r .m{background:#8393A5 !important}
// @include        .t .r .n{background:#8393A5 !important}
// @include        .s .r .l,.s .r .k{background:#8393A5 !important}
// @include        .s .r .o{background:#8393A5 !important;}
// @include        .s .r .m{background:#8393A5 !important;}
// @include        .s .r .n{background:#8393A5 !important;}
// @include        .t .E4KNxe{border-top-color:#8393A5 !important}
// @include        .s .pt{border-color:#8393A5 !important}
// @include        .t .pt{border-color:#8393A5 !important}
// @include        .qk7aib,.d28clf{background-color:#EEF1F3 !important;border-top:1px solid #8393A5 !important;border-bottom:1px solid #8393A5 !important}
// @include        .FdWzub{border:1px solid #8393A5 !important;color:#8393A5 !important}
// @include        .FdWzub{border:1px solid #8393A5 !important;color:#8393A5 !important}
// @include        .Y6AKrf{border:#8393A5 solid 1px !important;}
// @include        input.uG{border:#8393A5 solid 1px !important;}
// @include        .dI{border:solid 1px #8393A5 !important}
// @include        .lpcd{border:2px solid #8393A5 !important;}
// @include        /************************************/
// @include        /* FOOTER  *************/
// @include        /************************************/
// @include        .mn, .md, .l6,  .mp, .l3, .mj{color:#222 !important}
// @include        .mp a, .l3 a, .mn a, .md a, .l6 a, .ma a{color:#444 !important}
// @include        /************************************/
// @include        /* HIGHLIGHTING by MrFreeze (http://userstyles.org/users/8458) *************/
// @include        /************************************/
// @include        /* Hovering read messages */
// @include        table.cf tr.yO:hover, table.tlc tr.rr:hover { background-color: rgb(226,242,255) !important;}
// @include        /* Hovering unread messages */
// @include        table.cf tr.zE:hover, table.tlc tr.ur:hover{ background-color: rgb(230,244,212) !important;}
// @include        /* Hovering selected messages */
// @include        table.cf tr.x7:hover, table.tlc tr.ur:hover { background-color: rgb(255,241,168) !important;}
// @include        /* Hovering left labels */
// @include        .WnjAod:hover { background-color: rgb(226,242,255) !important;}
// @include        /*.p7  { padding: 0 !important;}*/
// @include        /*.pO  { padding:2px !important; width: 18px !important;}*/
// @include        /*.WnjAod .p5 { margin: 2px 0px -2px 5px !important;}*/
// @include        /* Hovering chat list */
// @include        .vD:hover { background-color: rgb(230,244,212) !important;}
// @include        }
// @include        @-moz-document url-prefix("https://docs.google.com/API/") {
// @include        /************************************/
// @include        /* DOCS GADGET    *******************/
// @include        /************************************/
// @include        #gd-content{background-color:#fff !important;}
// @include        #query {background:none !important;border:1px #ccc solid !important; color:#666 !important;}
// @include        .gd-menu-button{color:#1A3764 !important;}
// @include        .gd-a {color:#40474D !important;}
// @include        body {background-color:#fff !important;}
// @include        body {background-image:none !important;}
// @include        div.gd-menu {
// @include        border: 1px solid #ccc !important;
// @include        }
// @include        }
// @include        @-moz-document url-prefix("https://www.google.com/calendar/mgadget") {
// @include        /************************************/
// @include        /* CALENDAR GADGET  *****************/
// @include        /************************************/
// @include        .event-time,.date-content{color:#40474D !important;}
// @include        .menu-link, .quickedit-link, .menu-arrow{color:#1A3764 !important;}
// @include        }
// @include        @-moz-document url-prefix("http://mail.google.com/mail/?ui=2"),url-prefix("https://mail.google.com/mail/?ui=2") {
// @include        /************************************/
// @include        /* ATTACHMENT     *******************/
// @include        /************************************/
// @include        body {background:none !important;}
// @include        }
// ==/UserScript==