// ==UserScript==
// @name           LPF: Benachrichtigung bei Abonnements
// @version        0.5
// @copyright      2012, DerET
// @namespace      LPF
// @include        http://letsplayforum.de/*
// @exclude        http://letsplayforum.de/
// @exclude        http://letsplayforum.de/index.php?page=Home*
// @exclude        http://letsplayforum.de/index.php?form=ThreadAdd*
// @exclude        http://letsplayforum.de/index.php?form=ThreadAdd*
// @exclude        http://letsplayforum.de/index.php?form=PostAdd*
// @exclude        http://letsplayforum.de/index.php?form=PostEdit*
// ==/UserScript==

/*----------------------------------------------------------------------------*/
/*                         Nicht in iFrames ausführen                         */
/*----------------------------------------------------------------------------*/
if (window.top != window.self) return;


/*----------------------------------------------------------------------------*/
/*                         Base64 encodierte Dateien                          */
/*----------------------------------------------------------------------------*/
// Lade Symbol
var lpfladen = 'R0lGODlhMAAwAOf/ACFcWyxZXxteYT1abCFpZBprdDBnZDZlbChqbSRvgiBzbzVsdyF0djNxbh13fy1zfB13hUBvc01rekttdSR8fSp8d0B5dUJ4hkh6fhOKkBuJgymJijCJgzmHgz+Fk0qEiFeDikyIhCaVfWGCjB2VmziQlGCGhleKflqJiCmXjyyWlUuQk0iSiz2Vj0iSnlKQoFePo2uMlSKkoSmjmjSgny6iqTygmVCcmDmkllmaqzWqfFqbpF6bnx2wnmaaq3OYmRWzqHeXoCutrDSsnCmvpmeemjGvklWmmkGrqjyupj+ts0qspXSgp3Ojln+eqBe7vWSltS24p26kryW6r2qmqjW2rF+rpm2luT61pkW1rC+6wSy8t4OkpkG3tIOmrz68sn2qvUy6sSTExTXDpFe4r3Kwumi0sHSvxjLEv2S2t5WotDXFuW6zxI+rtH+vvDzEs126unmzrWi5rVa9xHyyxFDAvl+7xYSwz4Cyy0jDyErEuVjCp4e0sHi4u1XDulvCtIi0uyPR0o+zwTPPyWHDuzrNzz7OwJ6yvnq/s4u30pu1uZO4tlnIxXu90Ym6x5q2wHHB0nnAyYW80Y66zoq+u1POw2rHx1rNvZe7xF/Mwyfb1pe8ymjJ12/Kuk7SzVLQ2nHJ0Jm90j3Z11nR1J6+20zYzIXIzEvY2nzK2WnQ2KTAyp3B1oTLwJnGzY/J04XM1WbWzovK25nG2mLYyoDPzXHVxpXJ2aPH0I/OyabG1qDI1qnHyDrm3XbXzzbo5njV4HvW1Z3Ozkvm51Xl3oXX5Vzl2a3O3n/d0pHX4K/Q03jf4nLi1qnS05rV4mrk4KbT2pXY26DU5Ifc37TQ2mLn6KHW3K7T27HU5LzT5Zbg2Jbg6bba3Vn08qbf553i5YTp6n/s4r7a5a/e7Lbd5ZXo6qnl48Xd4rPk5Mnd6Xn19aXq77Pp8MPn77zp8JL39s3m8tPl66T2+L3x88bw+OTp7LL3+rr59s/z9dry99n29Mj7++b09df7/Ov8/Pb7/f///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQD/ACwAAAAAMAAwAAAI/gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjwRzYRLkSJAgTNNAGlSEEh28l+jQTcOkSOU/TC1j6owJD104mh/b5Io5bVouXZtyJc0VDhu2XDU5CpW5adKdK1KuMGFyhc6kXUVvtdnoJZfZSVd8eDHoRYoUR7ew7VqL0YuiW5vSMlGY1RGmW4roWrQrKO0VhlRySME09+IPL16u5NjbkEkON7v4CJ4Yw8sOHy8g8uAB+UdFRTGC7HCxGbGLIo+jSoyBwoVtiStCoAgRg+KEFSVcrJAYYgUKCxMoWqDRhUQG4hQshAhAMQONOUqeR6TAQIEF6hOv5/9SQkMig+7eKc4BJg9aGvMMOlgwPXGXNnXybgGCSEUDhw4K8FERNPrkAw8luzykggo0dECARbrIk08+2wjY0A0y0ECDBihYBI02BcpDy3sLLSFDF13IoAFGr6ijjz7k9JKFQlQQoUcXSKRwQ0bKuFNPPN+cskUWlBRkRRZ6eOLJGhlu9Ak36biTzjBLTkHEFFgmqYwng2xBREeiCMPNmOk4Y6YysJjpzDCDoPGlR6doMiaU6dQJDjhrtqmHStl4EiaddTojChp72jRQL3qgscUaa+hBi6GQRirppJRWaumlmGaqqUMBAQAh+QQFBQD/ACwAAAAAMAAwAAAI/gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjwSNkUpEMlEoYyANhsoVDh28l/DQodMVKuU/XaSuydzJE104UqQ+nvQZzpguXauS3jK201hNjpuMFdU1KRGeq1jxhNLF1NimjY9yGctlFc8kg5Po0Jmky1yuRxnVbMoVCs8ZPArV0rl1a5MajGpaTTpzBe9COlfoYFLU5mIZR64asaHjkA6UMorU/K1YJlIkNmwgQpEihcuPiq5AIUPFBhJERzt+yFZEERIycq8YQYvI4wMKFDEo2vEmrxoqiS4YYMAwgSIoefmguZLogEKDDwMoorrXz9wq6gga6DTIPhHZPX/wblFnIL55+fP7boWLWL0BgeATtcnrl69aK4hlOLABAwBsll898ZCDijYPqbCBDRQAYBEy38TjzjKfOJRFEjZwQAEKFmnjizvpDCPKIAxdkkQWS2ygAEafUMMNNyaimNAleoThhw0p8JCRKL7MOIwng3iSTUGXfKHHJX5UMYMNG2kSJI1DDmKIIWhk6YknsHiyBhFJdOQJL0EO48wyaKaJZimDoFHFR55IOcww6YATDzjgrOnJFpeklI0noghDJ55rouGHTQQdQ+QWUaxxyTGIRirppJRWaumlmGaq6aYOBQQAIfkEBQUA/wAsAAAAADAAMAAACP4A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48EjYVKhAdPolDGQBoMteoaOngw4aHDtiqUyn8sXaLbyZMntlw2PYaahi4cNmO5VtVclctYuKciO4a6Fu6arkklS9LJOqnpUUwbbV0Tdy3W1kkGsZrMNS3Xo4yxmrVrFusMHYVuzrjJpQpTm4v+Ys1ThwxSI4Z0oODB5PdirHb32sU63JBODjeP2vyt2A1fZF3iHkKB4iZIkIpy++ELpwuimxw/QMQ4RDHWPX/7poWL6ILDB9kUifHzR2+aRA8PMGAYQBHVvXvsckmE4CBCBOYTIdWr187V9AIIEOhgl/jJXTp1lr6HHx/xEzduyvL8ikgdgYARFGEJ4+arUCGIUHBAAQUCbDZRIL5wI4oYEKmggoACWLQGL774osl/DYVBgw0cKIBfRdmIUuEwhTDCECFLhLGEBgpgRIgmvgwzTCVrKORHGDjOoMEPGRnCyzDFzLiGiQX5UUUYflxShQotbDSIJkAuM0slYrxh5RtrrHHJLJdMQcQMHRkC5TDKLAPLLGjWoiaaaxBRxUeXaPJjMeDUCc4yZs6yRhSE3JTHIKKQaaeZb/hxE0HHXLIGEEBM4Qcrh0Yq6aSUVmrppZhmqummDgUEACH5BAUFAP8ALAAAAAAwADAAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePBI2tSkQy0SpjIA2uynUNHbyX8NBdy7Uq5T9Zssa9Q7cTnc+f11Z+tDVu3rxxM1etCrXSmDGfxkJ1jMaO37x2zSTh2coVj0mnxgRtjIaP3z12sRpJMpho66RcxnI9yhhtXr9986I1UojnzCRBqgS1uahtXD9/+67JYjjpDB5Bj7xcbIbPn793KBviuXKlTRsnFrXxuzsN3cMrL64ECVKxmbp69cblgkjnRRAnQeZO5MQtnjZb1iK6gAECBOuJeYS5W8ZJogcHCy5MoCjGF7dTWiRCgH4hAMUnvnzlBcoe8UGBBQu8T5ziS1igJ9rPBzhA8Y0mTe+PlX+QHgTFTobgpwUaEJWxHQIBDEbRGKWIIgZ8D82wAQcICGDRGwE6uIVDe8xgQwUK+GfRGqVo4skglzDUSRIsgogRgJoUU4ohKSYURhY32qDBcRehMUgxMl6yxh8G+VFFFn/88UUKLWxEIpDFwLLGGlFEMcYYUbxxSSedVDHEDB2tEWAxyywzCyyX1KKmmpe8MUQSH1ViSCllLnPMnXhecskYftgkpCfF4HnMLHvuYRNBtBhZZRR+0HLoo5BGKumklFZq6aWYZupQQAAh+QQFBQD/ACwAAAAAMAAwAAAI/gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjwSj2Up0506iUMZAFhTXLBo7dvBiwkN3LVcolf+iiWOHr+fLd+iA0lx106M4fP367cMnTpwtW6tyGbsWLpyxohuP+lPKblyzRo0k4cFjUqoxY4I2IkPqbx+8a7aaFZw0NpExVbnSYpQ2Lx+/fVbDJcRzBs8mVYLaXEQmrV4+fOFyMcRz5cwmQV4ucvpWrx4yWw7PXBGE2YnFVNTqKeOE7OEVH2CcBKnIahQ1aqM4QQTzwkeMGIoo/hF1O09riC4ugAARg2IVUacKaZHo4YLyCRSNDBKl5YlECA8W8SwIkB2NdCESHRRAcID8RCNoxGhBHxHC+gMHKGaZIuYJfYj2IRBAcxMhEsUa/oUBkRkUVPCAAJllNwUaT2wB0QwtcMCAexQREQUag0yhYEN/YKihCxd9OAgaa+jBEBlEhJFFBQxg9McWg5QyyBqXKBRGFTLO4AAPGf2xRo6lXPLHHwYR8kYVSxKRQgsbvbFGKbPMcokebxgRhRFvRBHGH5dcEgYOM3RkZSmwZHkJLLCUeUkttZQZBREfXXJlKcf06ecxtWgZBZMq/fHGJbP8qeQbhOIkECt/VBFFFFUQwoqjmGaq6aacdurpp6CGKqpDAQEAIfkEBQUA/wAsAAAAADAAMAAACP4A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48ExUWLFUuSJFnGQBbUFo0dvn0w8eF7d23VKpX/kLn0x9NfP3737r0LV/OmR2Ly+vXjuQ+fuKfRxF0Lh85YqI7E6vHjpw8fPHTXRqKSFEuWLmPGcgnaiEydvnry2IUzFo5gNEln6EzKZUzVo4yoyNWrp46YLXEJ6eQNpbYNxmPxvn37xImh4jOTHjm2yEpaZMoOz1wB46SNE86plFFG9hBKDidOglRklUk1o8oP6eTwESPG34lyGH3SMsdWRBceRoyIQXGInjxalEj04OHChAnNu0QXIhFCgQURAvRQTKG9Rg2JCb4vED+xhQwh5tEzOECf4pEZQoTM6M4AQYARFLUxRH41wAFRGhpwgIAAm00kggxd5AeRDSlQwAB7FBmBX4RfOBRGCilwwAAIF6UgRBddVBEGQ3IIYcMRKSiAkRUzbKEHGl34odAfKoYxgwY8ZJREFWtUcskbYRBiECFRYOHHH1ik0MJGWEShRyWzXFJlFDMAEcUUYfhBSCZvzLAfR1NMUeQstdTSyZuEtDlLJW9EkcRHfqiJZS3HZHPMMW1eskYUSqr0xxpvZFKLn7XQGcUfOBHEyh9RDFFDFXDgEummnHbq6aeghirqqKSW6lBAACH5BAUFAP8ALAAAAAAwADAAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePBJGJJBZLJDKQBbsh03Zvn7+X/vbdi+YK5T9k2eT129nv5U58+Njp0vUxmzp9/PTpywdzH7557e6xuzapY7Z6+urVI6euW7iv4a4h6wZtXNhQG2mV00ru1y9U1whei9UoVixd1nIJysjqqjplqThFS9ioER1duR61waiWnDJQnBjSOQNGkOKLlLKRAzYKlEM6Oa4IauPFYqdj5EblgQjFhw8vMSpSIgRKteeHdHzEcBLjEUU5cODkmSPRxQUQI2JPNIJESRUkEj08uLBgAkURSLJDjwihwIIFAa7y05AhA47E7gjAX1cxfolEBgwQHDhAkYUG9ikkbniAQMAIinzcR0MK5j3UxwYUMBDAYhQJSB5ENKggQn8W2UcDDTh04RAZKtigAgMgXKRBCkJ8QQQhDMExRBI2bKAARlakkEUYX1RBhkJkzBBGjhrwkJENQ3yhhx5ffNGJQZ0U6YcfWKSgwkZLRCFkJn58EUUUPQwRhY1+ZJLJFzjM0BEZU7xxSS21XELIJWpmguYlb0QxxEedRPFGJbXA0ksvx/QCyzGVxPmHTX6UeYmevdRSiR5T+GETQbj8EYURRlQBBy6PZqrpppx26umnoIYq6qgOBQQAIfkEBQUA/wAsAAAAADAAMAAACP4A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48Eq8VChepVrGbdQBYsB63Zunv4+snch49dtJQgXTWbd4+fT34y/QnFJy7aR1cv78mzZ08eT3xC/clsZ6sjUqXqvGlDxjXaNXTw8OG7N4/qRlzr1qnTJo1kM4LhjIVDx7NdOUcZTVVb5w0ZJ0jaEIazFetVt2etBGGkxJIWp0gMSaJy1crLRUS4oEl77LARFEeCuDixiIgSNEtzIEKBwsRJkIqUzJiBU8MSxDIvdsSIoYhiEStmlCiR+OIFCBAxKKKwgoRECYkeHlyYMIHiAxYtVJCQCKHAggUBKO4iqMBhgw3u3sFTjKBgw4YbEh0UQCDgAEUQCsi3iL+BPgiKXBCwAQctmAGRGe4hEAAXFRFQQXYzQKTCBi3QZxEKD85AAxkOLTFDCy0ogMJFCsywhBAywMFQGDIgcUOFGBWhgYlhEBGGQmFUkQUZNrTAQ0YtpJCFH2FkkQUhBhFiZBh+ZPHhRjMAoYcfVH4RBRA99ADEFFVQ6ccXRETIERZRTFFJJbBkouaasFTixxpRYPERIVGsgSYsveTZCyyw6LHGFEiqlKMelRxzzJ6V6FHFjSoRhMsfUWQZxR+4NGrppZhmqummnHbq6aegahQQACH5BAUFAP8ALAAAAAAwADAAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePBKu9GokKVSxkIA2+itbuHr+X/O7N69asW0pb1VrGvKdPH8x+/MTZ9Khr3D2Z69SV06ZNnTx+/aLiG7rRVbt58tRBg9as2a9fxIiJm9fPnz984zZSyukN2itIpqoRbGbr2juz/u5FywgomNa3kKAhDGcMHT6g4l5hXFvNFKRGDI2Fazkv1sU4lIKZsgPJoS1k3bxV61yRDyVKadI87AYp0itcZSouahInjhVCECHZiVRmxyOKP3jYriFxR5odLkZQtGCBxQYVEl14eHBhAsUADVhwoCBxg4MHDwLxXG+ggIIGiQ4KIFggfuIAAwo4QI9IwQGCAwcojgAQn4VEChQgAIByE6nBHwcbmAGRGQAiIEAbFQHQAAcp2AARDRtQUAEAFn0Qnw0yIOEQEjLYsIECH1ykQIUg4rZQGEJ0UQIHCmDEA4VddCEEHArBmOMMGvCQUQspzBBGHVlk4SJBhCTphx9JpNDCRjbMEIUfmfjxRRVRREFEFFN8gWUmWRAxQ0dYELFGJZm06SYhblayRhRJfEQImJVU0ksv5ezZCyyVTBHFkh/5UYUelcCyJ6B6TEFoSv/gcqcRRgyKC6SYZqrpppx26umnoIYqqkYBAQAh+QQFBQD/ACwAAAAAMAAwAAAI/gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjwR1uRrpCtWrZyANuoo27h4+fPdirkMWq1tKV89axrw3r6fPmcg+utLZbl23bsiQaetWr54+fuu0dWzVsl03aLFeodqKKhYxbU77zZOqEdO0c+eQRYqEkyAyVJyIqevX755NjItaMWMWiU2khNpQIZtHF99di4D29m3EUNY4fP76WbXYhlKwPmXoODT2LvK9aBabUAKE+SG6cfD64RNXcVGTOE2KEIJorKXRoBObvC7iIqI1V928abND8cQJFiE8SLQDClkqJBQJnKigAILEGjTmzCFBMYAFBQoc70gkUQNJCQoULQRQQEGDxAwkaGSIQBEEAOob3mfIoAAExTYANMCBCmZA1EcGG1AgQBsVAUBACzbYABEJKmygAAAWgaCACi3MkIVDWahQoQIoXESABkskMcNsCxEiBA0qcEAARjxU4GEWQoShUBhCJNHFBhrwkJEKKSQRRhhZZMEiQYQk6QcZWaTQwkYzeJhJJnp8UQUQMwABBBZf+OEHLVlU2VESQHyhx5WEXOlmL5n48QUQSXzkR5p+ZNLLnnxmUskUQPiR0j96TLEmn3DqUYWOgw6Eix9YDDEEFoTg0uilmGaq6aacdurpp6CG6lBAACH5BAUFAP8ALAAAAAAwADAAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePBJk9syVpkyRdz0AavPUs3Dt8MN+9a9cMmTWVz1rKlMlu3jx27+atQ9bs4yZr8OC1E9cNGVFk4tatmydvaEdM28aNO9cslqtGjVCJjUVMXT156qRtVHNrnLVgkRrZSjmwGSpIxL7V20sso5pdIl1FipQQGaRfeuupQ4axza5WkaAQXsjpl7e93sRZ5NIGEyAodBxyIqavdNGKMbjwKVPmobhY7fj1W1dRzY8iRaTwgfisHb5++LpR/IEC946I4bb97td3ookTISp4kHhrX79+sShaMFGhQgKJu+D03eOHiqIBCxUYfI9oa9y6cuUnWjCggAEEiYRoeStnhyIIAA10J5EQjDAizRwUqQFgCSX0AdEcQswxhxauVLRgCktAJEQXHKpgkQkEtGDDDFk4FMaGWahQwkUEVGBDEjOQwRAZQmSRRQoVYFQEBy2EkYUQMiZEBhYcCsEBDxm1kEIWfoTxRRiEGESIjXOQcWMLG80gxBeZZOLHF1UAIQQQQFTxhR9efjHDDB0lAcQUaHYp55xf9pDER5m8mUkvvcDCJ5+ZVDIFEFGqREYVenTJJyyZ6FFFkCoNhAshWAwxBBaZ4BLpppx26umnoIYq6qiklqpRQAAh+QQFBQD/ACwAAAAAMAAwAAAI/gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjwSt6dp0R1IrXdZAGrx1y5w5eDDhsROnS5fKf7d0jYNn7h08n+yCsmun69bHTdZcjhunK5rTaOLUtZvaLVZHpOaYtpJ0p5HXRpJQEVOnTt46ZBsfWVu7VZKkZwTFSYIktqw6XBnbIL1Vho6khMgacRqrjhzei2qsPXKUxhFDSJx+fVMnLZtFJ4+4AIJCxyGnVN/cfTN1uc0PKFAeIkulLLSyio9M/GCyAxDEVLBCf0M7cYQJFDx2RIyVSl09d6koSgjBPIRESOT01eOk3ALzChJ1rdPHj/rEAxYq8SjAHlEXO379iCmPYEEBBIm34PVLTzEEgQYV3kM0Z00+P94SPQIAfhWkAdEtz5zHDoASAaBABzYsAREowMgjj3oVmfDgDEuQ4ZAennwTzzfeVaTABhEmYeBCeeQxijLKfAKXRT+gmEUWWHiYUBhbFAILLGJYkpENKSThRxhVZEGIQYRU8YUnUD7RxUYzEPGFH5n48QUWRMyAxZdXZlIJGltMyVESRExRCSGZsJnJm5nA8uYaQFTxESFA6FFJJr306ScsldC5pEp+TKFHnH5moscUYdxEEC6ZYNFDD1j4cZijmGaq6aacdurpp6CGKipDAQEAIfkEBQUA/wAsAAAAADAAMAAACP4A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48Ew5EitekOKV3hQBrUNc0cuncwYYbTpUvlP5rh0OncGZPdzGkfMRkzR9SYLlKykl4T164du2s1OWJKFm4mqTt38NxphEdSrGbN1rVbFzWjomnJppHCg8dRQWO2YqFq5m0sLrNnkzkq4xbhs0aogHk794wVRi6YFDmCgodhI0vSvHmDdtEJF0BldtBxCAkUuc+GK1r+IQUKxDzAPmeqqCjGDyY7+jq0BOobtW+hJTqJEGPFjoi68pyiRq0TxQkmLHz4IFGLKGHUwlAcYMFCBwfNTwlLt+V4dQUVsvGnSyeGYgQDDRRgj5iHnLt0hSiaIJBeQcRqtL7ZcweKoiIADVSggRkQTbNOPvy4I01FABDQQQu/OYSOLvfww483FkXQAAct2ACHQ7qckw+CC1pEQApLZGEDIQzhAo09+egj2UU/aDBDilhIl1AesJBjjz7qIJNRCy1U4UcYXWRhXEGZiOHJN9+4802JGdkwwxd+HPkFFljMwGUVaHjiDJSnONPREkBgmcmabGYCCyzOwCKMKJ98REiafsDSi5699OmMJ4WIUadKfmzhh5t9wpIJGobaRBAufmDRQw9Y+HGXo5hmqummnHbq6aeghipqQwEBACH5BAUFAP8ALAAAAAAwADAAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePBNEZy7WqpDF4IA1OM3YNHbyX8NBds2Ys5b+RLdHp1PnO5btxxsJ9NDZN58pcspLqGjcu3LufsjpiKjpNVyI8WLE2mpQU2rl206BtvJVrWq5JeOhMKjhNVqNIrry1s4YrY5uprejQwaOwESRQ5c6Vu4Wxza1bUqQ0YggK0itv5epa9OLlERModBxCsiTNmzRWk70wyQEFIiNLwIDBqtgmSJAdOdY+jMQIWK9a1ih6iRDDhYuI5eDkgQWLEEUJEUxU+B1xyxPicihGiPCBwQaJzmGdMkIxgIEGDFrxSHxS6JQvPdIjNEBAAfsgX76eUDRhwACD9hClFYLvqxbFWwQ0wAEFcECknTPc8OJfdxW0sIEND6lTiDPpcKOJRSYo0IIKM2ThkDTKuFPhIBcpwIENNiSxoELQeGOPiMKocxETFcixRBZV+JEQPN6cI0898bijTEYcVhGGHllk0UtB5EgDjTr6RCnkRjN0qIcfflTxxBN6bEkclPboE482HSUBxJWZEFILIZlk8s037tgDpDrEfEQIEE/40cueb8Lpzp/K1JlSlnpk0subzjhDzSmf2GPTQLhkOUQPW+QBzKOYZqrpppx26umnoIYqqkMBAQAh+QQFBQD/ACwAAAAAMAAwAAAI/gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjwTRqVo1UpUqdCANGlMVDh28ly/DjUz5z9iqluhy6swJD93Nj6qMoQtnzOaqo6uKhgsHT2bHoERXJZp65w6eTaEmydJlLZw1VRsVsZRqdVLBcJPo4HFVjZ01RRnFqtp0R8odhXjomKq2zSRGsYLuXDG7EE8kWtWqUbroxYsiKVDuNoxkxxS0VosreokhxccViHAs4aIFqKKiGDF8wBAEkbIfWp3ATvQyAUMMGBKVhGZkhWKECBgggJAoZEsmPzx8T4jwAIJEIFsqZTJCMcABBA86SOwRXQ8WihOs6SugIHEMmkqVqE+MAQABBfIQq6FZM2hQ74mKArinAAdiJjSieGJIZhMBQEEHKrQAkRiDiKLJGBbFoEAHHciAhEODBOKLLw9eNF4LWQxBYEKVaCiML548c5ETGliYRRb9IQRPKrBQww03vnSSUQspZBGGH1l0oWNIiZHjjjs4BrLREEQI4UcmldC3RiW/QJNNOeXY4046wojSURZE6CEdLLA4Q0425+ijpj5bfvJRJ0SsoUeZ38QTjz1ruvPNLzSFcV6ZdsajTz3k/FIOTQPhUokYWuTxyS/aICrppJRWaumlmGaq6aacOhQQACH5BAUFAP8ALAAAAAAwADAAAAj+AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePBK/lCiUo1KNc6EAazIUSHbyX8NCJzKXyX65H6HLq3JnzkbWPj4zlNGYs16pVLIlay2ntUceg6IyFCnXnDp5JWLFuamUtXNONinJJTXTnTKKC1iadmWSK2TZrijK2UWRs050rdxTSiQQoGLNHcS86efToyhk8DOn0MdUqWOCKTtq0uWLYYaRIiEwpamMxRpsYlCGm6RMHUZyKj1DEeJFDEMRIoxEBehzRyYQYF15IREIGkZwjFCdMWLBAd0QkSNL8phjgwIECECTayLKHjA7mARAUWCBxxpQtW67sT5yQvYADiWSmfPkiXiKK8twjTlmzZgvwiYqyM6AgB+KeLYasEQUiFWVHgQoqQAQgfWNYNAECDKhAAxIOjYKGKJ4YssdFBDCARBZIbLhQIYWIIsowa7BykQ8aqIDEF1swolAhgQgjjC+lvJGRCilkwcgohYjByDYEMTOKiTb6woshG6kwwxajOOOMMtBAw4wu0CjjDDXccOMLjh1lsYYozrjjjj326KMPmu506WUpHzFSIjVm6sMPP2m6k46XotT0iSjfxGMnP2u6I8wp0NQ0kDKppMIJJ7/8ooyilFZq6aWYZqrpppx26qlDAQEAIfkEBQUA/wAsAAAAADAAMAAACP4A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48E0akaSRIeSIPTVKFDB69lS5GqTv4zphLeyps3bara9lHVNXThroUaGkoVTWPmVl6LyRGTMXTGQiWaimdSIqt3NsnaZi7lxkeqUia6gyeRwUl46GxKti3Zo4xgR+I5Q0chnT6Okt3CxNRiG1WYwNBl6AgMn1uq3lp04uQRmCt1G9KBEgfTozaLnQS5cgUiFCh8FjmpqGpCkBg7MEHsQ8UKHyd9IzqZMMHDC4k3jliJ84Mi7QsMPEi0cUR3CIoHaBdIIBEH8SMTKAYIUAAB84hHZuDAEX3ihAAICukwkEhlxpAhFCiCoM5gfEQZVYbg6D3xUQAKFBhAgQhKBpH4fFQUAAMbbDADRFUkuMYQFo3AAAU0bFGHQ2g84ckaVexxEQNE0NAFGowwhMYaaBSyRg8YxSGDJ4yMwggoJiFUYiGiiLJGGBl1scYo7pBDDjTbxCgQNKOUKIowvgxSxUZ5FMKjPvKoAw00ytRYozBY+hLIGh2NQo07+oRpjzvqgANOOulww40vmqDx0S/K1FNPmPW4Ew+aavoiyignafMLOXLWE487aerpiUwEkfPLKIV8UkghyiAq6aSUVmrppZhmqummnDoUEAAh+QQBBQD/ACwAAAAAMAAwAAAI/gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjwTDqVIVKtRIdCANjgyHDp5LeOhEqkr5byW6mzhxwlRl7aOqayyvGVtFdFUuY8bCsTQ2k+OjpNdWTbpzJ1GoSYnwJJqUy1o4Y482KlI1NBQerQYn4aHTKpdIRRnHjjxz5o7CtZN2qVIE96ITVY/A1GVIB4obTLf6VnQiyAkYH3gcFgbE14tFJ15i+PABEQoVPl6cVFR0IYiPHIkgliny2YniiE4mXADxQuINFkWaxKA4YcKICx5s42YxgeKBAw0gQLCtgQOLABQDHHhQ4IJEFc1ZHOB9wEGBDBJZ2zTnUHziiAI1VJCQmEFDCw4/KCrK0EWIkDkQwaRQoaLFoookCJFHHvg9FIUQXajAgUVwFCINOamk4hAcW3SRIAsXFULON+pA09NCdWyxRYgpYASKMurYI483t8CTUB1oFFLIFkQskdGD9vCjjzquSAMNQdDkEaMnnswYxUbS1KOPPvZ8880pgchYSJTOVCmKGFt09GA88dgTTzrUUFNllWKKUggaH0nzTTruuJPOm3BSI4yZeaSkzifCcAPnm3JGSRNBzkApxqCF9PLnoYgmquiijDbq6KOQRupQQAA7';

// Benachrichtigungston
var lpffbpopbase64 = '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';

// Zahnrad Icon
var lpfsiconbase64 = 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH3AUPEicfccQhXAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACFElEQVQoz22RTUjUURTFf/fNR6mUjs6IZqhRFLiIQsUKo6ioXdEiIrKNmwqCdmKrWkQFitBGQSKwoqJoE4KrNmEFYURtirIEUUTm/96MOo466v+2mI+0PJvHPfe88867V1iHqZLwEY1SFnxfNgIakFX+hZpUFXgn3Ixdsb69Be6SveO15Psme8xU2HuLD7wWSasvAZDaxH6u0WkGbMeLQMHNq/H6rW99N+R6XdqpU5d0H63v1KkbTEYAggBmJ2cR0FOoZN8opVkA5vRJaXI2utUzAOVvtZsVEMnJ/iZ3ErHdmQF7SOJbzHlSZlG72MVGmNdi0B5xrQxSpHOUiwCoMirTup26bJ1z/mG0QUsIS0VB1uufTp30z8lz1ZxImWLYSAw/TwFflnti32sXYiP0MZ3jfmr72JXg0tPwKK16WUIAxGcns93waCZJFYDU68X63cHqMS9DtVkgBCB1ZQ18Bsg0ajQXMixtXBDvgOnSZtmUz6PPTL//K9DkX5ejaz4zK/YgryW6hlI8kkQlkq9lglLGZSS046G0aYakVG44x2G9airFBJuW3Utd5Z0fMrfzLut20yjHI/dBACaLty0k7mrH2hFndyICTK6eiX0yADXpxF7aREBXGNI0AON6kzeAR1/0a+HyeJG7Yb9ZP/EoVW0/OHXqJmb2xI/Zx177f2niza7THR7b7F7ZJTtvfyf2QbKQ+g+Z7/LwXf1suQAAAABJRU5ErkJggg==';


/*----------------------------------------------------------------------------*/
/*                           Cookie Werte auslesen                            */
/*----------------------------------------------------------------------------*/
// Letzter Wert für neue Beiträge
var lpfalte = GM_getValue('lpfalte', null);
if (!lpfalte) {
  lpfalte = 0;
  GM_setValue('lpfalte', 0);
}

// Einstellung für Sound
var lpfsound = GM_getValue('lpfsound', null);
if (lpfsound != 0 && lpfsound != 1) {
  lpfsound = 1;
  GM_setValue('lpfsound', 1);
}

// Einstellung für Tickrate
var lpftickrate = GM_getValue('lpftickrate', null);
if (!lpftickrate) {
  lpftickrate = 7500;
  GM_setValue('lpftickrate', 7500);
}


/*----------------------------------------------------------------------------*/
/*                        Aktuelle Informationen holen                        */
/*----------------------------------------------------------------------------*/
function lpfcheck() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://letsplayforum.de/index.php?page=Index',
    onload: function(responseDetails) {
      main(responseDetails.responseText);
    }
  });
}


/*----------------------------------------------------------------------------*/
/*                               Hauptfunktion                                */
/*----------------------------------------------------------------------------*/
function main(requesttext) {
  // Anzahl der ungelesenen Beiträge heraussuchen
  var neue = requesttext.split('<a href="index.php?page=SubscriptionsList">')[3].split('&nbsp;')[0];
  
  // Nur auf der Forums-Übersicht Top 5 Box aktualisieren und Beitragszahl darunter eintragen
  if (window.location.search.substring(0,11) == '?page=Index') {
    document.getElementById('top5').getElementsByTagName('table')[0].innerHTML = requesttext.split('<div id="top5">')[1].split('<table class="tableList">')[1].split('</table>')[0];
    
    if (neue == 1) {
      document.getElementById('top5').getElementsByClassName('top5')[0].getElementsByTagName('a')[2].innerHTML = '1 neuer Beitrag in Abonnements';
    }
    
    else {
      document.getElementById('top5').getElementsByClassName('top5')[0].getElementsByTagName('a')[2].innerHTML = neue + ' neue Beitr&auml;ge in Abonnements';
    }
  }
  
  // Zahl im Header eintragen
  document.getElementById('userMenuSubscriptions').getElementsByTagName('span')[1].innerHTML = neue;
  
  if (neue > 0) {
    document.getElementById('mainMenuItemAdditionalDropDown2').setAttribute('class', 'dropDownMenuLink newMenuNotification');
	document.getElementById('mainMenuItemAdditionalDropDown2').appendChild(lpfheaderneu);
	
    document.getElementById('userMenuSubscriptions').getElementsByTagName('span')[1].setAttribute('class', 'upNotification');
  }
  
  else {
    document.getElementById('mainMenuItemAdditionalDropDown2').setAttribute('class', 'dropDownMenuLink');
	
    document.getElementById('userMenuSubscriptions').getElementsByTagName('span')[1].setAttribute('class', 'upNotificationDisabled');
  }
  
  // Anzeige unten rechts ergänzen
  if (neue == 1) {
    lpftext.innerHTML = '<a href="http://letsplayforum.de/index.php?page=SubscriptionsList">1 neuer Beitrag in Abonnements</a>';
  }
  
  else {
    lpftext.innerHTML = '<a href="http://letsplayforum.de/index.php?page=SubscriptionsList">' + neue + ' neue Beitr&auml;ge in Abonnements</a>';
  }
  
  // Sound abspielen
  if (neue > lpfalte && lpfsound == 1) {
    lpfaudioel.play();
  }
  
  GM_setValue('lpfalte', neue);
  lpfalte = neue;
  
  setTimeout(lpfcheck, lpftickrate);
}


/*----------------------------------------------------------------------------*/
/*                        Funktionen für die Optionen                         */
/*----------------------------------------------------------------------------*/
// Zeige Optionen und setze Input Felder auf aktuelle Werte
function zlpfoptionen() {
  if (lpfsound == 1) lpfsoundcheckbox.checked = true;
  else if (lpfsound == 0) lpfsoundcheckbox.checked = false;
  
  lpftickrateinput.value = 60000 / lpftickrate;
  
  document.getElementsByTagName('body')[0].appendChild(lpfoverlay);
}

// Speichere gewählte Einstellungen
function blpfoptionen() {
  if (lpfsoundcheckbox.checked == true) {
    lpfsound = 1;
	GM_setValue('lpfsound', 1);
  }
  
  else if (lpfsoundcheckbox.checked == false) {
    lpfsound = 0;
	GM_setValue('lpfsound', 0);
  }
  
  lpftickrate = 60000 / parseFloat(lpftickrateinput.value);
  GM_setValue('lpftickrate', lpftickrate);
  
  vlpfoptionen();
}

// Verstecke Optionen
function vlpfoptionen() {
  document.getElementsByTagName('body')[0].removeChild(lpfoverlay);
}


/*----------------------------------------------------------------------------*/
/*                               HTML Elemente                                */
/*----------------------------------------------------------------------------*/
// Neu Anmerkung für Header
document.getElementById('mainMenuItemAdditionalDropDown2').innerHTML = 'Nachrichten';

var lpfheaderneu = document.createElement('span');
lpfheaderneu.innerHTML = 'Neu';

// Audio Element
var lpfaudioel = document.createElement('audio');
lpfaudioel.src = 'data:audio/ogg;base64,' + lpffbpopbase64;
lpfaudioel.preload = 'auto';
document.getElementsByTagName('body')[0].appendChild(lpfaudioel);

// Anzeige (unten rechts)
var lpfanzeige = document.createElement('div');
lpfanzeige.style.position = 'fixed';
lpfanzeige.style.right = '0px';
lpfanzeige.style.bottom = '0px';
lpfanzeige.style.width = 'auto';
lpfanzeige.style.height = '13px';
lpfanzeige.style.padding = '7px 10px 10px 10px';
lpfanzeige.style.backgroundColor = 'rgb(0, 0, 0)';
lpfanzeige.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
lpfanzeige.style.borderTopLeftRadius = '10px';
document.getElementsByTagName('body')[0].appendChild(lpfanzeige);

// Text-Container an für Anzeige
var lpftext = document.createElement('span');
lpftext.innerHTML = '<img style="width: 32px; height: 32px; margin-top: -9px" src="data:image/gif;base64,' + lpfladen + '" />';
lpfanzeige.appendChild(lpftext);

// Zahnrad
var lpficon = document.createElement('img');
lpficon.src = 'data:image/jpeg;base64,' + lpfsiconbase64;
lpficon.onclick = zlpfoptionen;
lpficon.style.marginLeft = '8px';
lpficon.style.marginTop = '-8px';
lpfanzeige.appendChild(lpficon);

// Dunkles Overlay (für Optionen)
var lpfoverlay = document.createElement('div');
lpfoverlay.style.width = '100%';
lpfoverlay.style.height = '100%';
lpfoverlay.style.position = 'fixed';
lpfoverlay.style.top = '0px';
lpfoverlay.style.left = '0px';
lpfoverlay.style.zIndex = '9998';
lpfoverlay.style.backgroundColor = 'rgba(30, 30, 30, 0.7)';

// Optionsfenster
var lpfoptionen = document.createElement('div');
lpfoptionen.style.width = '300px';
lpfoptionen.style.height = '100px';
lpfoptionen.style.position = 'fixed';
lpfoptionen.style.top = '50%';
lpfoptionen.style.left = '50%';
lpfoptionen.style.textAlign = 'center';
lpfoptionen.style.margin = '-50px 0px 0px -150px';
lpfoptionen.style.padding = '20px 0px 0px 0px';
lpfoptionen.style.backgroundColor = '#ffffff';
lpfoptionen.style.borderRadius = '5px';
lpfoverlay.appendChild(lpfoptionen);

// Checkbox für den Sound
var lpfsoundcheckbox = document.createElement('input');
lpfsoundcheckbox.type = 'checkbox';
lpfoptionen.appendChild(lpfsoundcheckbox);

// Beschreibung für Sound Checkbox
var lpfotext = document.createElement('span');
lpfotext.innerHTML = 'Alarm Ton';
lpfoptionen.appendChild(lpfotext);

// Zeilenumbruch
lpfoptionen.appendChild(document.createElement('br'));

// Input für Tickrate
var lpftickrateinput = document.createElement('input');
lpftickrateinput.type = 'number';
lpftickrateinput.min = '1';
lpftickrateinput.max = '60';
lpftickrateinput.style.width = '33px';
lpfoptionen.appendChild(lpftickrateinput);

// Beschreibung für Tickrate Input
var lpfotext = document.createElement('span');
lpfotext.innerHTML = ' mal pro Minute aktualisieren';
lpfoptionen.appendChild(lpfotext);

// Zeilenumbruch
lpfoptionen.appendChild(document.createElement('br'));

// Bestätigen-Button
var lpfbbutton = document.createElement('button');
lpfbbutton.innerHTML = 'Bestätigen';
lpfbbutton.onclick = blpfoptionen;
lpfoptionen.appendChild(lpfbbutton);

// Schließen-Button
var lpfvbutton = document.createElement('button');
lpfvbutton.innerHTML = 'Schließen';
lpfvbutton.onclick = vlpfoptionen;
lpfoptionen.appendChild(lpfvbutton);


/*----------------------------------------------------------------------------*/
/*                               Initialisieren                               */
/*----------------------------------------------------------------------------*/
lpfcheck();
