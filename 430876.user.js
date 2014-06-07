
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
// ==UserScript==
// @name           Fleet Logs Trade Summarizer
// @namespace      by Kramagon trustux and rudolph
// @description    Resources in a trade
// @include        http://*.ogame.*/game/admin2/flottenlog.php?session=*&uid=*&list=*&touser=*
// ==/UserScript==

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;

if (is_chrome || is_opera) {
    this.GM_getValue = function(key, def) {
        return localStorage[key] || def;
    };
    this.GM_setValue = function(key, value) {
        return localStorage[key] = value;
    };
}

var op = function() {
    this.set = function(key, value) {
        return GM_setValue(key, value);
    }

    this.get = function(key) {
        return GM_getValue(key)
    }
}
var options = new op();

function createcookie() {

    for ( i = 1; i < 7; i++) {
        options.set("FleetLogsTrade_ratio" + i, document.getElementById("textrates" + i).value);
    }
    comercio123456789();
}

function readcookie2() {

    if ( typeof options.get("FleetLogsTrade_ratio1") == 'undefined') {
        options.set("FleetLogsTrade_ratio1", "5");
        options.set("FleetLogsTrade_ratio2", "3");
        options.set("FleetLogsTrade_ratio3", "1");
        options.set("FleetLogsTrade_ratio4", "2");
        options.set("FleetLogsTrade_ratio5", "1.5");
        options.set("FleetLogsTrade_ratio6", "1");
    }

    for ( i = 1; i < 7; i++) {
        document.getElementById("textrates" + i).value = options.get("FleetLogsTrade_ratio" + i);
    }

}

function datefleetreturn() {
    var i = 0;
    var fechasalida;
    var fechallegada;
    var fechavuelta;
    var anosal;
    var anolleg;
    var anovue;
    var messal;
    var meslleg;
    var mesvue;
    var diasal;
    var dialleg;
    var diavue;
    var horasal;
    var horalleg;
    var horavue;
    var minsal;
    var minlleg;
    var minvue;
    var segsal;
    var seglleg;
    var segvue;
    var paso;

    while (document.getElementsByTagName("TD")[0 + i * 12] != undefined) {
        fechasalida = document.getElementsByTagName("TD")[10 + i * 12].innerHTML;
        fechallegada = document.getElementsByTagName("TD")[11 + i * 12].innerHTML;
        anosal = fechasalida.substr(0, 4);
        anolleg = fechallegada.substr(0, 4);
        messal = fechasalida.substr(5, 2);
        meslleg = fechallegada.substr(5, 2);
        diasal = fechasalida.substr(8, 2);
        dialleg = fechallegada.substr(8, 2);
        horasal = fechasalida.substr(11, 2);
        horalleg = fechallegada.substr(11, 2);
        minsal = fechasalida.substr(14, 2);
        minlleg = fechallegada.substr(14, 2);
        segsal = fechasalida.substr(17, 2);
        seglleg = fechallegada.substr(17, 2);
        fechasalida = new Date(anosal, messal, diasal, horasal, minsal, segsal);
        fechallegada = new Date(anolleg, meslleg, dialleg, horalleg, minlleg, seglleg);
        paso = fechallegada.getTime() - fechasalida.getTime();
        paso = paso + fechallegada.getTime();
        fechavuelta = new Date(paso);
        anovue = fechavuelta.getFullYear();
        mesvue = fechavuelta.getMonth();
        diavue = fechavuelta.getDate();
        horavue = fechavuelta.getHours();
        minvue = fechavuelta.getMinutes();
        segvue = fechavuelta.getSeconds();
        paso = anovue + "-";
        if (mesvue < 10) {
            paso = paso + "0" + mesvue + "-";
        } else {
            paso = paso + mesvue + "-";
        }
        if (diavue < 10) {
            paso = paso + "0" + diavue + " ";
        } else {
            paso = paso + diavue + " ";
        }
        if (horavue < 10) {
            paso = paso + "0" + horavue + ":";
        } else {
            paso = paso + horavue + ":";
        }
        if (minvue < 10) {
            paso = paso + "0" + minvue + ":";
        } else {
            paso = paso + minvue + ":";
        }
        if (segvue < 10) {
            paso = paso + "0" + segvue;
        } else {
            paso = paso + segvue;
        }
        document.getElementsByTagName("TD")[7 + i * 12].innerHTML = paso;
        i = i + 1;
    }
}

function withoutdot(number) {
    var step = "";
    for ( i = 0; i < number.length; i++) {
        if (number[i] != '.' && number[i] != ' ') {
            step = step + number[i];
        }
    }
    return step;
}

function comercio123456789() {
    var URLnotall = document.URL;
    var nummis = URLnotall.split('&');
    URLnotall = URLnotall.substr(URLnotall.length - 1);
    if (URLnotall != '=' && (nummis[2] == "list=0" || nummis[2] == "list=3")) {
        var checks;
        var t = 0;
        var mission;
        var gohome;

        while (document.getElementsByTagName("TD")[0 + t * 12] != undefined && document.getElementsByName("checktransports"+t)[0] == undefined) {
            mission = document.getElementsByTagName("TD")[0 + t * 12].innerHTML;
            //mission = mission.substr(mission.length - 9, 1);
            mission = mission.split(")").shift();
            mission = mission.split("(").pop();
            gohome = document.getElementsByTagName("TD")[3 + t * 12].innerHTML;
            gohome = gohome.substr(0, 8);
            if (mission == 3 && (gohome == "Flota en" || gohome == "Fleet Ar" || gohome == "Flotte auf")) {
                checks = document.createElement("INPUT");
                checks.name = "checktransports" + t;
                checks.value = t;
                checks.type = "checkbox";
                checks.checked = 1;
                document.getElementsByTagName("TABLE")[t].appendChild(checks);
            }
            t++;
        }

        var mission;
        var gohome;
        var quantity;
        var sw = 0;
        var j = 0;
        var patron = /[0-9.]/;
        var i = 0;
        var qws;
        var step = "";
        var deusend = 0;
        var crisend = 0;
        var metsend = 0;
        var deurecv = 0;
        var crirecv = 0;
        var metrecv = 0;
        var mindeusend = 0;
        var mindeurecv = 0;
        var maxdeusend = 0;
        var maxdeurecv = 0;
        var mincrisend = 0;
        var mincrirecv = 0;
        var maxcrisend = 0;
        var maxcrirecv = 0;
        var minmetsend = 0;
        var maxmetsend = 0;
        var minmetrecv = 0;
        var maxmetrecv = 0;
        var playersend;
        var playerrecv;
        var play1 = "";
        var play2 = "";
        var pointplay1 = "";
        var pointplay2 = "";

        while (document.getElementsByTagName("TD")[0 + i * 12] != undefined) {
            mission = document.getElementsByTagName("TD")[0 + i * 12].innerHTML;
            //mission = mission.substr(mission.length - 9, 1);
            mission = mission.split(")").shift();
            mission = mission.split("(").pop();
            gohome = document.getElementsByTagName("TD")[3 + i * 12].innerHTML;
            gohome = gohome.substr(0, 8);
            if (mission == 3 && (gohome == "Flota en" || gohome == "Fleet Ar" || gohome == "Flotte auf")) {
                if (sw == 0) {
                    play1 = document.getElementsByTagName("TD")[1+i*12].childNodes[0].innerHTML;
                    play2 = document.getElementsByTagName("TD")[2+i*12].childNodes[0].innerHTML;
                    pointplay1 = document.getElementsByTagName("TD")[1 + i * 12].innerHTML.substr(document.getElementsByTagName("TD")[1 + i * 12].innerHTML.length - 36);
                    pointplay2 = document.getElementsByTagName("TD")[2 + i * 12].innerHTML.substr(document.getElementsByTagName("TD")[2 + i * 12].innerHTML.length - 36);
                    pointplay1 = pointplay1.split(')');
                    pointplay1 = pointplay1[1].split('(');
                    pointplay2 = pointplay2.split(')');
                    pointplay2 = pointplay2[1].split('(');
                    pointplay1 = parseInt(withoutdot(pointplay1[1]));
                    pointplay2 = parseInt(withoutdot(pointplay2[1]));
                    sw = 1;
                }
                qws = "";
                playersend = document.getElementsByTagName("TD")[1+i*12].childNodes[0].innerHTML;
                playerrecv = document.getElementsByTagName("TD")[2+i*12].childNodes[0].innerHTML;
                quantity = document.getElementsByTagName("TD")[9 + i * 12].innerHTML;

                for ( j = 0; j < quantity.length; j++) {
                    if (quantity.charAt(j) == ' ' || quantity.charAt(j) == '<' || quantity.charAt(j) == '>' || quantity.charAt(j) == 'b' || quantity.charAt(j) == 'r' || quantity.charAt(j) == 'm' || quantity.charAt(j) == '\t' || quantity.charAt(j) == '\n') {
                    } else {
                        qws = qws + quantity.charAt(j);
                    }
                }
                for ( j = 0; j < qws.length; j++) {
                    if (qws.charAt(j) == 'M') {
                        j = j + 6;
                        while (patron.test(qws.charAt(j))) {
                            if (qws.charAt(j) == '.') {
                                j++;
                            }
                            step = step + qws.charAt(j);
                            j++;
                        }
                        if (play1 == playersend && document.getElementsByName("checktransports"+i)[0].checked) {
                            metsend = metsend + parseInt(step);
                        } else {
                            if (document.getElementsByName("checktransports"+i)[0].checked) {
                                metrecv = metrecv + parseInt(step);
                            }
                        }
                        step = "";
                    }
                    if (qws.charAt(j) == 'C') {
                        j = j + 7;
                        while (patron.test(qws.charAt(j))) {
                            if (qws.charAt(j) == '.') {
                                j++;
                            }
                            step = step + qws.charAt(j);
                            j++;
                        }
                        if (play1 == playersend && document.getElementsByName("checktransports"+i)[0].checked) {
                            crisend = crisend + parseInt(step);
                        } else {
                            if (document.getElementsByName("checktransports"+i)[0].checked) {
                                crirecv = crirecv + parseInt(step);
                            }
                        }
                        step = "";
                    }
                    if (qws.charAt(j) == 'D') {
                        j = j + 8;
                        while (patron.test(qws.charAt(j))) {
                            if (qws.charAt(j) == '.') {
                                j++;
                            }
                            step = step + qws.charAt(j);
                            j++;
                        }
                        if (play1 == playersend && document.getElementsByName("checktransports"+i)[0].checked) {
                            deusend = deusend + parseInt(step);
                        } else {
                            if (document.getElementsByName("checktransports"+i)[0].checked) {
                                deurecv = deurecv + parseInt(step);
                            }
                        }
                        step = "";
                    }
                }
            }
            i = i + 1;
        }
        if (sw == 1) {
            mindeusend = parseInt(metsend / document.getElementById("textrates1").value + crisend / document.getElementById("textrates2").value + deusend);
            maxdeusend = parseInt(metsend / document.getElementById("textrates4").value + crisend / document.getElementById("textrates5").value + deusend);
            mindeurecv = parseInt(metrecv / document.getElementById("textrates1").value + crirecv / document.getElementById("textrates2").value + deurecv);
            maxdeurecv = parseInt(metrecv / document.getElementById("textrates4").value + crirecv / document.getElementById("textrates5").value + deurecv);

            mincrisend = parseInt(metsend / document.getElementById("textrates1").value * document.getElementById("textrates2").value + crisend + deusend * document.getElementById("textrates5").value);
            mincrirecv = parseInt(metrecv / document.getElementById("textrates1").value * document.getElementById("textrates2").value + crirecv + deurecv * document.getElementById("textrates5").value);
            maxcrisend = parseInt(metsend / document.getElementById("textrates4").value * document.getElementById("textrates5").value + crisend + deusend * document.getElementById("textrates2").value);
            maxcrirecv = parseInt(metrecv / document.getElementById("textrates4").value * document.getElementById("textrates5").value + crirecv + deurecv * document.getElementById("textrates2").value);

            minmetsend = parseInt(metsend + document.getElementById("textrates4").value / document.getElementById("textrates5").value * crisend + deusend * document.getElementById("textrates4").value);
            maxmetsend = parseInt(metsend + document.getElementById("textrates1").value / document.getElementById("textrates2").value * crisend + deusend * document.getElementById("textrates1").value);
            minmetrecv = parseInt(metrecv + document.getElementById("textrates4").value / document.getElementById("textrates5").value * crirecv + deurecv * document.getElementById("textrates4").value);
            maxmetrecv = parseInt(metrecv + document.getElementById("textrates1").value / document.getElementById("textrates2").value * crirecv + deurecv * document.getElementById("textrates1").value);

            step = String(minmetsend);
            minmetsend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                minmetsend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + minmetsend;
            }

            step = String(maxmetsend);
            maxmetsend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxmetsend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxmetsend;
            }

            step = String(minmetrecv);
            minmetrecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                minmetrecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + minmetrecv;
            }

            step = String(maxmetrecv);
            maxmetrecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxmetrecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxmetrecv;
            }

            step = String(deusend);
            deusend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                deusend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + deusend;
            }

            step = String(crisend);
            crisend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                crisend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + crisend;
            }

            step = String(metsend);
            metsend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                metsend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + metsend;
            }

            step = String(deurecv);
            deurecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                deurecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + deurecv;
            }

            step = String(crirecv);
            crirecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                crirecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + crirecv;
            }

            step = String(metrecv);
            metrecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                metrecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + metrecv;
            }

            step = String(maxdeusend);
            maxdeusend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxdeusend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxdeusend;
            }

            step = String(maxdeurecv);
            maxdeurecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxdeurecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxdeurecv;
            }

            step = String(mindeurecv);
            mindeurecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                mindeurecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + mindeurecv;
            }

            step = String(mindeusend);
            mindeusend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                mindeusend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + mindeusend;
            }

            step = String(mincrisend);
            mincrisend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                mincrisend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + mincrisend;
            }

            step = String(maxcrisend);
            maxcrisend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxcrisend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxcrisend;
            }

            step = String(mincrirecv);
            mincrirecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                mincrirecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + mincrirecv;
            }

            step = String(maxcrirecv);
            maxcrirecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxcrirecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxcrirecv;
            }

            var divinfo = document.createElement("DIV");
            divinfo.name = "divinformation";
            if (pointplay1 >= pointplay2) {
                divinfo.innerHTML = "<span style=\"color: orange\">" + play1 + "</span>: Metal=<span style=\"color: red\">" + metsend + "</span> Crystal=<span style=\"color: red\">" + crisend + "</span> Deuterium=<span style=\"color: red\">" + deusend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Deu: <span style=\"color: green\">" + maxdeusend + "</span> Min.Deu: <span style=\"color: green\">" + mindeusend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Cry: <span style=\"color: gray\">" + maxcrisend + "</span> Min.Cry: <span style=\"color: gray\">" + mincrisend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Met: <span style=\"color: yellow\">" + maxmetsend + "</span> Min.Met: <span style=\"color: yellow\">" + minmetsend + "</span><br><br><br><span style=\"color: #00FFFF\">" + play2 + "</span>: Metal=<span style=\"color: red\">" + metrecv + "</span> Crystal=<span style=\"color: red\">" + crirecv + "</span> Deuterium=<span style=\"color: red\">" + deurecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Deu: <span style=\"color: green\">" + maxdeurecv + "</span> Min.Deu: <span style=\"color: green\">" + mindeurecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Cry: <span style=\"color: gray\">" + maxcrirecv + "</span> Min.Cry: <span style=\"color: gray\">" + mincrirecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Met: <span style=\"color: yellow\">" + maxmetrecv + "</span> Min.Met: <span style=\"color: yellow\">" + minmetrecv + "</span>";
            } else {
                divinfo.innerHTML = "<span style=\"color: orange\">" + play2 + "</span>: Metal=<span style=\"color: red\">" + metrecv + "</span> Crystal=<span style=\"color: red\">" + crirecv + "</span> Deuterium=<span style=\"color: red\">" + deurecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Deu: <span style=\"color: green\">" + maxdeurecv + "</span> Min.Deu: <span style=\"color: green\">" + mindeurecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Cry: <span style=\"color: gray\">" + maxcrirecv + "</span> Min.Cry: <span style=\"color: gray\">" + mincrirecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Met: <span style=\"color: yellow\">" + maxmetrecv + "</span> Min.Met: <span style=\"color: yellow\">" + minmetrecv + "</span><br><br><br><span style=\"color: #00FFFF\">" + play1 + "</span>: Metal=<span style=\"color: red\">" + metsend + "</span> Crystal=<span style=\"color: red\">" + crisend + "</span> Deuterium=<span style=\"color: red\">" + deusend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Deu: <span style=\"color: green\">" + maxdeusend + "</span> Min.Deu: <span style=\"color: green\">" + mindeusend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Cry: <span style=\"color: gray\">" + maxcrisend + "</span> Min.Cry: <span style=\"color: gray\">" + mincrisend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Met: <span style=\"color: yellow\">" + maxmetsend + "</span> Min.Met: <span style=\"color: yellow\">" + minmetsend + "</span>";
            }

            if (document.getElementById("divinformation") != undefined) {
                document.body.removeChild(document.getElementById("divinformation"));
            }
            divinfo.setAttribute("style", "position:absolute; top:170px; left: 480px; z-index:151;");
            divinfo.id = "divinformation";
            document.body.appendChild(divinfo);
        }
    } else {

        var checks;
        var t = 0;
        var mission;
        var gohome;

        while (document.getElementsByTagName("TD")[0 + t * 12] != undefined && document.getElementsByName("checktransports"+t)[0] == undefined) {
            mission = document.getElementsByTagName("TD")[0 + t * 12].innerHTML;
            mission = mission.substr(mission.length - 9, 1);
            gohome = document.getElementsByTagName("TD")[3 + t * 12].innerHTML;
            gohome = gohome.substr(0, 8);
            if (mission == 1 && (gohome == "Volver a" || gohome == "Fleet Re" || == "Rückkehr zu")) {
                checks = document.createElement("INPUT");
                checks.name = "checktransports" + t;
                checks.value = t;
                checks.type = "checkbox";
                checks.checked = 1;
                document.getElementsByTagName("TABLE")[t].appendChild(checks);
            }
            t++;
        }

        var mission;
        var gohome;
        var quantity;
        var sw = 0;
        var j = 0;
        var patron = /[0-9.]/;
        var i = 0;
        var qws;
        var step = "";
        var deusend = 0;
        var crisend = 0;
        var metsend = 0;
        var deurecv = 0;
        var crirecv = 0;
        var metrecv = 0;
        var mindeusend = 0;
        var mindeurecv = 0;
        var maxdeusend = 0;
        var maxdeurecv = 0;
        var mincrisend = 0;
        var mincrirecv = 0;
        var maxcrisend = 0;
        var maxcrirecv = 0;
        var minmetsend = 0;
        var maxmetsend = 0;
        var minmetrecv = 0;
        var maxmetrecv = 0;
        var playersend;
        var playerrecv;
        var play1 = "";
        var play2 = "";
        var pointplay1 = "";
        var pointplay2 = "";

        while (document.getElementsByTagName("TD")[0 + i * 12] != undefined) {
            /*mission= document.getElementsByTagName("TD")[0+i*12].innerHTML;
             mission=mission.substr(mission.length-9,1);*/
            if (document.getElementsByTagName("TD")[0 + i * 12].innerHTML.indexOf('1') > -1) {
                mission = 1;
            }
            gohome = document.getElementsByTagName("TD")[3 + i * 12].innerHTML;
            gohome = gohome.substr(0, 8);
            if (mission == 1 && (gohome == "Volver a" || gohome == "Fleet Re" || gohome == "Rückkehr zu")) {
                if (sw == 0) {
                    play1 = document.getElementsByTagName("TD")[1+i*12].childNodes[0].innerHTML;
                    play2 = document.getElementsByTagName("TD")[2+i*12].childNodes[0].innerHTML;
                    pointplay1 = document.getElementsByTagName("TD")[1 + i * 12].innerHTML.substr(document.getElementsByTagName("TD")[1 + i * 12].innerHTML.length - 36);
                    pointplay2 = document.getElementsByTagName("TD")[2 + i * 12].innerHTML.substr(document.getElementsByTagName("TD")[2 + i * 12].innerHTML.length - 36);
                    pointplay1 = pointplay1.split(')');
                    pointplay1 = pointplay1[1].split('(');
                    pointplay2 = pointplay2.split(')');
                    pointplay2 = pointplay2[1].split('(');
                    pointplay1 = parseInt(pointplay1[1]);
                    pointplay2 = parseInt(pointplay2[1]);
                    sw = 1;
                }
                qws = "";
                playersend = document.getElementsByTagName("TD")[1+i*12].childNodes[0].innerHTML;
                playerrecv = document.getElementsByTagName("TD")[2+i*12].childNodes[0].innerHTML;
                quantity = document.getElementsByTagName("TD")[9 + i * 12].innerHTML;

                for ( j = 0; j < quantity.length; j++) {
                    if (quantity.charAt(j) == ' ' || quantity.charAt(j) == '<' || quantity.charAt(j) == '>' || quantity.charAt(j) == 'b' || quantity.charAt(j) == 'r' || quantity.charAt(j) == 'm' || quantity.charAt(j) == '\t' || quantity.charAt(j) == '\n') {
                    } else {
                        qws = qws + quantity.charAt(j);
                    }
                }
                for ( j = 0; j < qws.length; j++) {
                    if (qws.charAt(j) == 'M') {
                        j = j + 6;
                        while (patron.test(qws.charAt(j))) {
                            if (qws.charAt(j) == '.') {
                                j++;
                            }
                            step = step + qws.charAt(j);
                            j++;
                        }
                        if (play1 == playersend && document.getElementsByName("checktransports"+i)[0].checked) {
                            metsend = metsend + parseInt(step);
                        } else {
                            if (document.getElementsByName("checktransports"+i)[0].checked) {
                                metrecv = metrecv + parseInt(step);
                            }
                        }
                        step = "";
                    }
                    if (qws.charAt(j) == 'C') {
                        j = j + 7;
                        while (patron.test(qws.charAt(j))) {
                            if (qws.charAt(j) == '.') {
                                j++;
                            }
                            step = step + qws.charAt(j);
                            j++;
                        }
                        if (play1 == playersend && document.getElementsByName("checktransports"+i)[0].checked) {
                            crisend = crisend + parseInt(step);
                        } else {
                            if (document.getElementsByName("checktransports"+i)[0].checked) {
                                crirecv = crirecv + parseInt(step);
                            }
                        }
                        step = "";
                    }
                    if (qws.charAt(j) == 'D') {
                        j = j + 8;
                        while (patron.test(qws.charAt(j))) {
                            if (qws.charAt(j) == '.') {
                                j++;
                            }
                            step = step + qws.charAt(j);
                            j++;
                        }
                        if (play1 == playersend && document.getElementsByName("checktransports"+i)[0].checked) {
                            deusend = deusend + parseInt(step);
                        } else {
                            if (document.getElementsByName("checktransports"+i)[0].checked) {
                                deurecv = deurecv + parseInt(step);
                            }
                        }
                        step = "";
                    }
                }
            }
            i = i + 1;
        }
        if (sw == 1) {
            mindeusend = parseInt(metsend / document.getElementById("textrates1").value + crisend / document.getElementById("textrates2").value + deusend);
            maxdeusend = parseInt(metsend / document.getElementById("textrates4").value + crisend / document.getElementById("textrates5").value + deusend);
            mindeurecv = parseInt(metrecv / document.getElementById("textrates1").value + crirecv / document.getElementById("textrates2").value + deurecv);
            maxdeurecv = parseInt(metrecv / document.getElementById("textrates4").value + crirecv / document.getElementById("textrates5").value + deurecv);

            mincrisend = parseInt(metsend / document.getElementById("textrates1").value * document.getElementById("textrates2").value + crisend + deusend * document.getElementById("textrates5").value);
            mincrirecv = parseInt(metrecv / document.getElementById("textrates1").value * document.getElementById("textrates2").value + crirecv + deurecv * document.getElementById("textrates5").value);
            maxcrisend = parseInt(metsend / document.getElementById("textrates4").value * document.getElementById("textrates5").value + crisend + deusend * document.getElementById("textrates2").value);
            maxcrirecv = parseInt(metrecv / document.getElementById("textrates4").value * document.getElementById("textrates5").value + crirecv + deurecv * document.getElementById("textrates2").value);

            minmetsend = parseInt(metsend + document.getElementById("textrates4").value / document.getElementById("textrates5").value * crisend + deusend * document.getElementById("textrates4").value);
            maxmetsend = parseInt(metsend + document.getElementById("textrates1").value / document.getElementById("textrates2").value * crisend + deusend * document.getElementById("textrates1").value);
            minmetrecv = parseInt(metrecv + document.getElementById("textrates4").value / document.getElementById("textrates5").value * crirecv + deurecv * document.getElementById("textrates4").value);
            maxmetrecv = parseInt(metrecv + document.getElementById("textrates1").value / document.getElementById("textrates2").value * crirecv + deurecv * document.getElementById("textrates1").value);

            step = String(minmetsend);
            minmetsend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                minmetsend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + minmetsend;
            }

            step = String(maxmetsend);
            maxmetsend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxmetsend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxmetsend;
            }

            step = String(minmetrecv);
            minmetrecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                minmetrecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + minmetrecv;
            }

            step = String(maxmetrecv);
            maxmetrecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxmetrecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxmetrecv;
            }

            step = String(deusend);
            deusend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                deusend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + deusend;
            }

            step = String(crisend);
            crisend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                crisend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + crisend;
            }

            step = String(metsend);
            metsend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                metsend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + metsend;
            }

            step = String(deurecv);
            deurecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                deurecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + deurecv;
            }

            step = String(crirecv);
            crirecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                crirecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + crirecv;
            }

            step = String(metrecv);
            metrecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                metrecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + metrecv;
            }

            step = String(maxdeusend);
            maxdeusend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxdeusend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxdeusend;
            }

            step = String(maxdeurecv);
            maxdeurecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxdeurecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxdeurecv;
            }

            step = String(mindeurecv);
            mindeurecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                mindeurecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + mindeurecv;
            }

            step = String(mindeusend);
            mindeusend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                mindeusend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + mindeusend;
            }

            step = String(mincrisend);
            mincrisend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                mincrisend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + mincrisend;
            }

            step = String(maxcrisend);
            maxcrisend = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxcrisend = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxcrisend;
            }

            step = String(mincrirecv);
            mincrirecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                mincrirecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + mincrirecv;
            }

            step = String(maxcrirecv);
            maxcrirecv = "";
            for ( j = 0, i = step.length - 1; i >= 0; i--, j++) {
                maxcrirecv = step.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + maxcrirecv;
            }

            var divinfo = document.createElement("DIV");
            divinfo.name = "divinformation";
            if (pointplay1 >= pointplay2) {
                divinfo.innerHTML = "<span style=\"color: orange\">" + play1 + "</span>: Metal=<span style=\"color: red\">" + metsend + "</span> Crystal=<span style=\"color: red\">" + crisend + "</span> Deuterium=<span style=\"color: red\">" + deusend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Deu: <span style=\"color: green\">" + maxdeusend + "</span> Min.Deu: <span style=\"color: green\">" + mindeusend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Cry: <span style=\"color: gray\">" + maxcrisend + "</span> Min.Cry: <span style=\"color: gray\">" + mincrisend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Met: <span style=\"color: yellow\">" + maxmetsend + "</span> Min.Met: <span style=\"color: yellow\">" + minmetsend + "</span><br><br><br><span style=\"color: #00FFFF\">" + play2 + "</span>: Metal=<span style=\"color: red\">" + metrecv + "</span> Crystal=<span style=\"color: red\">" + crirecv + "</span> Deuterium=<span style=\"color: red\">" + deurecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Deu: <span style=\"color: green\">" + maxdeurecv + "</span> Min.Deu: <span style=\"color: green\">" + mindeurecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Cry: <span style=\"color: gray\">" + maxcrirecv + "</span> Min.Cry: <span style=\"color: gray\">" + mincrirecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Met: <span style=\"color: yellow\">" + maxmetrecv + "</span> Min.Met: <span style=\"color: yellow\">" + minmetrecv + "</span>";
            } else {
                divinfo.innerHTML = "<span style=\"color: orange\">" + play2 + "</span>: Metal=<span style=\"color: red\">" + metrecv + "</span> Crystal=<span style=\"color: red\">" + crirecv + "</span> Deuterium=<span style=\"color: red\">" + deurecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Deu: <span style=\"color: green\">" + maxdeurecv + "</span> Min.Deu: <span style=\"color: green\">" + mindeurecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Cry: <span style=\"color: gray\">" + maxcrirecv + "</span> Min.Cry: <span style=\"color: gray\">" + mincrirecv + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Met: <span style=\"color: yellow\">" + maxmetrecv + "</span> Min.Met: <span style=\"color: yellow\">" + minmetrecv + "</span><br><br><br><span style=\"color: #00FFFF\">" + play1 + "</span>: Metal=<span style=\"color: red\">" + metsend + "</span> Crystal=<span style=\"color: red\">" + crisend + "</span> Deuterium=<span style=\"color: red\">" + deusend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Deu: <span style=\"color: green\">" + maxdeusend + "</span> Min.Deu: <span style=\"color: green\">" + mindeusend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Cry: <span style=\"color: gray\">" + maxcrisend + "</span> Min.Cry: <span style=\"color: gray\">" + mincrisend + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max.Met: <span style=\"color: yellow\">" + maxmetsend + "</span> Min.Met: <span style=\"color: yellow\">" + minmetsend + "</span>";
            }

            if (document.getElementById("divinformation") != undefined) {
                document.body.removeChild(document.getElementById("divinformation"));
            }
            divinfo.setAttribute("style", "position:absolute; top:170px; left: 480px; z-index:151;");
            divinfo.id = "divinformation";
            document.body.appendChild(divinfo);
        }

    }
}

var suma = 0;
var link = document.createElement("input");
link.type = "button";
link.value = "Recalculate";
link.id = "benviar";
link.setAttribute("style", "position:fixed; top:2px; width: 120px; height: 50px ; left: 89%; ");
document.body.appendChild(link);
document.getElementById('benviar').addEventListener('click', comercio123456789, false);

var i = 1;
var link2 = document.createElement("div");
link2.id = "divrates0";
link2.innerHTML = "Trade Rates";
link2.setAttribute("style", "position:fixed; top:75px; left: 91%; z-index:149;");
document.body.appendChild(link2);

while (i < 7) {
    link = document.createElement("input");
    link.type = "Text";
    link.id = "textrates" + i;
    suma = i * 40 + 80;
    link.setAttribute("style", "position:fixed; top:" + suma + "px; width: 50px ; left: 95%; z-index:150;");
    document.body.appendChild(link);

    link2 = document.createElement("div");
    link2.id = "divrates" + i;
    switch (i) {
        case 1:
            link2.innerHTML = "Max Met:";
            break;
        case 2:
            link2.innerHTML = "Max Cry:";
            break;
        case 3:
            link2.innerHTML = "Max Deu:";
            break;
        case 4:
            link2.innerHTML = "Min Met:";
            break;
        case 5:
            link2.innerHTML = "Min Cry:";
            break;
        case 6:
            link2.innerHTML = "Min Deu:";
            break;
        default:
            break;
    }
    link2.setAttribute("style", "position:fixed; top:" + suma + "px; left: 89%; z-index:149;");
    document.body.appendChild(link2);
    i = i + 1;
}

link = document.createElement("input");
link.type = "button";
link.id = "buttoncreatecookie";
link.value = "Save Rates";
link.setAttribute("style", "position:fixed; top:360px; width: 84px ; left: 92%; z-index:150;");
link.addEventListener('click', createcookie, false);
document.body.appendChild(link);

readcookie2();
comercio123456789();
datefleetreturn();
document.getElementById('textrates3').disabled = true;
document.getElementById('textrates6').disabled = true;
