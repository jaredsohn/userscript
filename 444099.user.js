// ==UserScript==
// @name         No Coub Force Login
// @description  Want to watch that coub your friend just suddenly messaged you without logging in? No coub force login anymore.
// @version      0.2
// @license      MIT License; http://opensource.org/licenses/mit-license.php
// @copyright    2014+, vipaware
// @namespace    http://userscripts.org/users/vipaware
// @include      http://coub.com/view/*
// @include      http://coub.com/explore*
// @match        http://coub.com/view/*
// @match        http://coub.com/explore*
// @run-at       document-end
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABXdJREFUeNqkV3tQVGUUP5ddEBbSQnfJePkWFGQTX5j2BJ1qmsZppj8iq3EyhAUbq5mcaib9I+sfRtNdIbPHjMFkpc44U5mBJmmSSjA4vvgrTSceWRLsgrC7p993H/Cx3GUXO8OPvfd8555z7v2+8/vOpzBFLenACuAhIB+wA3frYz1AJ3ARqAd+Adqi8sqRUQAcALoAjhK9wA/A6kj+xxqcAOwCAuMIbIYaYHK4OEqYKcgB9gFOWXklPovcjgo6m7iE/rLa6ZZFm4G7Aj1k93eS09dMZV0e9TdErgPrgSOhA2YJ5OmG9xqK00nLyZVRRecTFkQ1rZP9N2lTRyW92f5+6FAJsGesBGYCZ4BkQ/HS9H1Uk/w83Ym4r5VRSVdVqHo1cNQsgQnAKX2FU0Cx0JOzjlD9xMIhA78f/24D/eJGhywWIE7z5OrxkPtGuVleYjpygVvixioNVBrBhRTNOUY/Jz1IioJkAkTBm1Da8IlmoQ5hlYPfdEySJUbyjEJsvkSUcdBDW8yDC0nT19dTchk65ZW7btrnbM1njl2E23lAKnP+c8w13zJ7+3hscbtNq6HaURqqe0Iuw6+MgY/sG9TgVhF8JpDDvP0Ljk7CBN88281KNvPbqdtkfaORQBrQYwzkzr+gvXkWc9wC5m/qzWM1X2Y+UIfxH4GjzBdfMw8ukiosw+VU5inOf3hAiZXHnSKBFw1Fi82pvr2CwDSd+eu60YEP/cS8ohg2TtikAA5mV1L44CfOYSqzNJ/Ct8dRLttsEQnsNRSvZH7MFhhROvNjJaOD79qPsdl64Hmaw40Z5sHr1rrVZ4rfwm0abBdr9qvm1Ml29SKBc4ZiSTYu83CJ+ar9fmTwk81aYiIBMUXCWUWY4C6Hm2kO89K1zLZlzJb7NXuB1AXtsm27VS8LVW7E4nKQKAk09EBeCKl8KcgBdQv25SBRKSh357XRpYYvQntSXKTAz68noJhEFBuvPSPEa0mUzROtWnVr4ouxqasyIRZ7bfKwlbeP6EQTLiYCEYJX2V2qjcWib9g0HFzlKg7IjwRiTKlCUf9MJWLwcYpIwGfc2II+VeMF3d7olL5TgsZ+rj+jC67ARwBvjQ2S/Le1+6FXViwjyDtG52ZVUgevq+Ts+5voZMvIIO8p4Pbu6N58EP0Re4lWYhuZhDUTHBweSwj2yaZ9IoFW4y63r5WsYlX0En12WDLzeGjGB+bBqx0udb9QNys859dfZ+vrRA2fEj27Cm/doX9rPYYkrWLNvWyURZMtXyMiUYozQDrHw9NrRZpb44Opw0hayrwarFd/Zrh8T7Uwx4MzlFytDHc6XpX9bBUJZAA+Q5mV06ZRMep407TwDNfSBgoGp+wGOW3fx3zwGPOVq+a0vfZdPHYfEnT62Btjk33lG5vRIUO5I2XTmCSjfpFxSON55tyn8QVAYG+kVcq+muTdcLEcZO+U9abBG0vc/G9v5KD+gLZZvfAOHpursecj2Q2h/taENqWfAOvC1Wv5PW7yYMFNxeng4UXIeD7mDg1JjFRivVjgl38nOo6mrukC0UCnRl5J8f3024U8mt0/dFQQZ4fC0JYM1U7oZygzXKmpLdmA3pYNmLRkohpi9eYOsMSJqg7Q2UsL5dXfrbdkf5g1pY8D38kKNChUnlF1R03pyt4G8lwtpez+i7L6GeDgWG35+tDWuTGxgFyZVdSakBdVYLu/izZ27KDN7dtCh4qB2kjnAiFrgA/18+CQNNsWYirK0CkXUbdl0ogH4oP99GhPPW3o2k3Le0+F+gO3Uhmwfzxnw2SgGvD/z6NZLZB5J2dDA0uAw4B3HEGDwHGgKJJ/ZRzH87lAgb5Ql2mtxggRx5Wz+iI+DbRE4/Q/AQYA5n/xh2a2KaIAAAAASUVORK5CYII=
// ==/UserScript==

document.getElementById("authPopupContainer").style.display = 'none';
