// ==UserScript==
// @name        weasyl_blick
// @namespace   weasyl_blick
// @description many small enhancements for weasyl.com
// @match     https://www.weasyl.com/*
// @version     0.2
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
var settings=[];
var settingnames=["inlineflash","markdownbar"]
var imgformatbuttons="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABCCAYAAADt9OvrAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIUFiA3dMkaOAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAgAElEQVR42u2dd5Qcxbm3n568OQellbRKKwlFhESUhBDBgC8Z2YDBGIyvjT9jY%2FDlgi%2F4GhuDDThdG9sYMNHYCAQYcCCDMCCBco7LSitN2DQ5dKjvj57pmZ6wO7tgHxa2zuGg7al%2B%2BvfWW11VXV1dL4ykkTSSRtIwSVLqHy%2BtD9kry20ddofUbEn%2BIPo5KfM3DZATwh0IyS3L51XII8wR5lCZH1WlzqNTC4TkiuXzKiIjPhrmDdbf3gvaa2vsCasEdaUWqsstWCwSVsvAAFkR9IY0eiIaqoCe3oTjtAWV8ghzhDlYJoCmgSSBquXeklaLhBBgsYCqMVSdZactqIx8mn00nBssC4DTZevQNBhfZ6W%2ByorNKmGRQIiB%2F7NZJRqqrIyvs6Fp4HTZO4Yb02759Nr%2BcWIKoTdW%2Bv8lNA3jP0mS0DJ%2B%2FxA6g592Hw3nZNObLam5zKH3WuGYBkDHng3pYZgk0TJ5jj7WTI45M%2Fs%2FKXmszAFRWWouxEwNV6XkH6osc7B9KzabnTETZn4kTGDQOpurrB8581%2Bh85PGlCwZcxJZsxSqJlDU9MVtVoHVkplbVyIyNRWn0%2FKp99Fwb7ASqsBhlYwCAfB4PAghkCS9RGrHzBpwKsxhhYSiF1c%2BZvaTtr%2FHh9vtprKmiaqcfENjFjNll8202yAQ%2FmiZ%2FwqdnzSmwyblyaL%2FrqjgtEkIJCQglhBYLcK4L%2Fduexsh9Lwt0475SHWGwiH8%2Fj4ScgJN07DbbJSWlVNbXYvFYimaGQv7iYZ66Dm8l%2FLqRsqqm3A4S3GUVAxZZyIewe5wIUn9z2YJoSEnojic5TnMYd9gyQpEYgKLJIwW%2B%2FDhw6YR1riolls2WfVN1SChpp6fc5npbiH5PFrSSMuM5QAEI1rRzJ0b%2FsHY1rlUVDfkMDM636J1JmRBMKKx5pVHjDwLT7qENS8%2FYjTYQggWLrvEyGM6ftIlBW0fiAkY3IUnXcLaVx4dFDOTnTrXOLbsEta%2B%2BuigdaZ4QA4z87c1Lz%2FSLxNJz2NyRYbtDQ0Nxt8zFpyWdcMJErI%2BgkqdJ2X4sapxCh%2FsWosQgpqoNiS%2F56ufgWAfHQc%2FMFVZPfVSVRlk3NjxRTMP79vJpNF2KsfV0dfXx9a1W3CUVFBW1URN8yRcZTWD1rl%2F01sgBC0zFmO1O%2FLWeUWOc3DnW0iShfFHLM1hDvsGK64IQrHkgy8SSPoIKzMd6DjI7k0vEwn2UFZZz%2BTZS6msHUP2qFRW9b%2FyMTOHrfrN8BDhQBfzl1xEZW2zMcQfiLlnxyZ2b99IXXMrE6cfS3l1o8EUGUPhzr3rad%2F5DkITTJxxHHs2vYIQgiVnX2tixhKCQESl7eiLDH2BiKb%2FncEMRDXajrkoR2cgrBW0fSCmJKW5%2FrDG1EWfHxTTYCfPNR4DknqNY4Nkpkac2UwAf%2FK3tqMv6pcJEh6Ph5KyamYdcw6usireeOZnSR98ixJrjL1b3iARCxGJ68w9m14FAZPnnEgsIYxrO%2B3mu1py1uD3%2B3U7kxqydRZTl7Lr5%2FY9%2B4hGIkyYMJXqqlqisQg7d27Smyx%2FlMqacUUzd25czZjqBYxy1lBTUUPUuhORCOHvOMA7G1fTMH4OdWNnUFLRUDRTpozaMW1sWP0M5TVjsJeUZzTqoMQjBHs6GT%2FrZLoObjX8mMkc%2Fo%2BECvSFVNMAM%2FVImOrdXnz6HlQlkRx%2BHWLfnu0ce%2FrVlFU1mjqImNCnxfIxM%2B8xRYmzb%2FdWLFY7qq3OyJtnIJbDHD%2FnbNp3rGbbxnfYvukdGsfNZPKc5VRUN%2BoTtoCnYyvr33jcYHQe%2FMD4dyCsmpiBiIY%2FrPG3R2407M20PXOEceoltxWtM9P2fzx6k4l5ysU%2F5O%2FJ6wGcdslt%2FO2RG038wZTn3zP4hdJpl9xWkJmyPaUj0%2FbMY9l5%2BmMKwO12s%2FDkzxKngkRYM%2BpVIKxhqyyhZsxsdrz3vPHI09enN0LhmEYoOep%2B9anbaW5q5KiTrzTZ09vbq09XRFTD79l%2BGYyPJGDU2FlIgKwk2LZnL709XsLhkEGbEFaLZqq2Wtr3txNrCjLO1UCorwuEwAZ847rvsWZnlL%2FcdyNNrYtonHgkZdXNAzK7%2B0JYKlW8Xg%2F7dqzLqZ8AZdWjqRwfoy8QpSys5jCHfYMVU0CJa6aJzMxHQoAZi87HYrWy5Z9%2FMo698%2FozHHniFQgJpOQrHtmlM%2FIxkSQ9H%2BA9uBO3203d6Kn4IyDQUtMXev7%2BmCVjmDBvBY2Tu9m3%2BRW2bniDjWteYuyUozly2ZUgwduvPUWf1824qccy67jPs%2BXtP9Ox4029ooc0E7M3pNIbUll09q05OvXXUuka2hsahM4M248661YTsy%2BosejsHxg3VW9QY9FZP6AvqA2pPBeedatJp0hPBxk6e4NqQWbK9p6QxqKzbjXZ3hvStaaYKa0DMQ1dkkRfUDVNNfSGNGw2CZxNTDv2S%2FpIQIIxM880Rni9IZ3d2dmJ1WIhEDE%2F%2Bvl8Pr3BCmoD2j6Y8gwEeti%2B4z0S8VjODdMb1IpmUjGJ556%2Fj%2F%2B5%2Fovs6thHqNtrYj36ip%2FjKxL42l9he0%2BA1kUrBmRGlVJe%2F%2FNtxCO9BW9qn8dDZ8c%2Bphz9eXpCWg5z%2BDdYsiAeVIw%2BW0r2jJnzDgtGHYUmVNzunxvzDv7waiYsuAyQkq%2BbBS6rnUJMkVHZdmxdh9vtpnr88XQHVCRJr3FCpPvFgZiRvjhuXzeHDx9GlRO46oN0h%2FQbY8%2BODahyjLmfWU4g7qBu0kmsee0JJEmiO6CYmN4%2Bhe6gxpN3nw3AedeuYuVd%2Br%2FP%2F%2FYzpnmCoeh88u5zTL3g%2Bd9%2BhpV3nZUzr3Pet55m5d1ncf61zwy6PM3PQvDkT882MQEu%2BPYzBZkp2zN1SpLEedc%2BbbJ9ZZYt%2FTHz6UyNsLqDKhYpKTv5mv6lh79lXHf5JXfTE1RZ9YsL9YpqtfDnX18DwPJL7kYAhw4dQghBfTA9iji87z22vvUIwZ6DWO2ltM4%2BmZnHXozFYilK56HOveza%2BR4SgpraZsZPOIL1779o%2BKg7qBbt96ioxuf1oCYijG%2BupHrRPN7724sAPHDtCuZJEAZKBLz014eZ2%2BNnyvFX9MtUSiZy8IMd1E9YSMPkE9jx0k8RIv3iYPrya%2FDtfYdD7e8y7rgmegJqjs5PwBwWdAe09EIY0nNYqTeFYaUCTZNNc1uSpYuuoIqUMZdSp7%2BUyMsko6Jv2%2FAWXo%2BHttKJdAeSlSC7hyzA7DqwmR3vPs7BHa8DgnHTT2Tu4iuprB9Pt19neX09yLEAAbmEeFChtytgaO8OqCbmoT6VnoDC0iuf1H%2F3q5xo%2FFshZ8KoSJ0p25de%2BaTJ9m6%2FwolXPpXD7A4qLP3yk3QHlEGXZ%2FZD4tIrVpqYkoCugFKQmbI9m5kqzxR76ZUrTbb3x8ynM9URdvsVhAYiabsEjFv4n6x%2B4r%2F1%2Bter4A9rnHDZH%2FnTj5YghOCzVz%2BBQODpU0EI2tvbARib9NHBna%2BzeuWNTJxzBkdf9D3aN%2F2N1575KT3%2BODNP%2BGJROt9d8yaKkkCSJKbNOYuYKujqDaXLI6gU7XccLYjyKax9byPzZk%2BhrLKMtuMW8eOfPURbYznnX3o%2BNU1N%2BmBs2k5%2B8bsHqZl9WUFmLOgh3LUPn8dDOLGJQ50H8XvdtB73n1htDna%2F9nOUN58kHu4m0uNh9%2Fb3qBk1C1dVs4k57BusqCzw9SVHOcJcsVLJ61fQlITpuNVRSpdfRRLpmYCyhuTQNQ%2BT5NOVpqpsXfcqqhxFK2%2Bjy68YGURyLN8f89E79NHA6KlLmXvqN6lpnk5cQJdfRUgSkoCoWkaXexcvrbyLOad8kzWrfmpo7%2FKrJqbHIxOXNR65adqABXbJD3byyHf1fBf%2FcGfRtqfOyWZkp6EwL%2F7BTh79bnHaCzEzbb%2F4hzuNdjlbd8pHjybz98fM9juCDB9ohKKJZJak36UWtm%2FfjiRJzPLJJBJCf3nS2Ynf72eON2Fqm1N5pyX9%2Fo%2FHf0Cgy82xl32RvrCT0nHL8Hhu4O0XH6Jp1heK0tnVF0aW4wDs6zhEsM%2BLtyeYbnB74littqJ9VNa2gp89%2Fls%2Bf6Cd%2BTNbqRs9mnPPPYmHnniZy2sqUBIR3n1%2FG7fd%2FRAnXr%2BZrj61INO7Yz3eHS%2Fg83rAmx44OPbtQLI58Hk9%2BLwvpN82%2FnMVzTNkmtpONTE%2FEW8J%2FVHNmA8RQDAYNGX0eDwINWE6XtU02phXSHU4UQUKMVNzBD2dW%2Bjr8VLV1EZMKyMa0YwFbiLj6aYQs7RhNnNO%2FQ51LUeCJKXXUKVWSQOjZq9g%2F7Y3WPfSb1j30m9Mtvijmonp8atIQvDZG7ebdGYzRfLcVL7B2H7mTTuMv%2F1RjTNv3J4eD2XYPhRmIKLx2Zu2m3TmK8%2B%2BqFaQmWl7Znlm6vQnl7YI4LM3bR%2BQme13MuqVP6LSF8nVmZrj8vWqaT2BAIFAAHefaqx0R5KMvP6ops%2B7HtiBpsR58Ltzs9ZV7Shap6tyPH0HNwPw1ht%2F1jtmmxNV0Rsxt6%2BbisqG4ut8%2BTRKxi3j54%2F9jIsnvwHAihuuR0nEWX7W1wGom3Iyk8%2B5H39U7ZdpH7MUZyhGeN0z1LV9BjQVTZXp2PoiQlMpqZ%2BP1eHCYnXi2%2F4XRo8%2BHsfYE3NsH%2F4jLAUSCfNNn532rVuVc6xx8lLiyVfP%2BiQkxJTU5GAuU0p2O4f2rdEnS1sWEFeEaXWulPHaphDz%2BC8%2BDhLEZWEwBem30wCjZvwHsz%2FjY9fqexBCY9YpN%2FLeU%2FocSTwh8up88uZxhm3nff%2BA6e%2FMdO73DxSlM5%2FtAngqi3vu9w8UbXs%2BZn86M6917q0HCjILMTLLI6%2F2fpj5bE%2Bl%2FvwOum%2BTs4XpYwnNaH0zj8dkfQ6qrKaFoG83Z9ywCWdpjYkZl0VROse2Ho%2BqaPR270ETgvqmaTSPmcOmNfp6sg%2F2vsuUmWcMykdS6SiiPfuB0YbmH%2F32FSad8XNcNRMoa5oBQq%2BX%2FTF9W54CyUpJ3VQiXftxVIyievIyaqaeDhYrCOjZ%2BQKR3j04q1tQsXNw3Z9onHuRiTnsG6xIQndooXWXpdUtbHnxdjQ1PSS3OStoOeqK5HkiuSJZEE1%2BWpmPmfqUwNf%2BHgCVoxfoFVPk%2BcxgkMzMdVipXrhlwZdoOepL6R9SDZas5WWe%2BT8dBjOuCM78n44cpkTGiuEh6jSuk2QmZPGhbO9P55k3dxjMeEIUZGbanq88U43CmTd3mHT2x8zWGfLtSY%2FY2zdQNXqOye%2BR3oPpN10Ht1HZNB0AV%2BUoYoHDeNrXUTN2PkgQ7m5P5%2F1gE5WjZtF6zFfY%2BOx1bP77j5i27DtYrDZ2vnoXcrSPuef8okidDsZOWc7YKctN5TnvhGsMnYOt847GuTirJwJxTvqCvg4v1rsfa8V4bLXT9XOK8HvltPNQ5AjO9rfo2%2FUcqiojb3oCZ8MMfQTl3YKWCBHv%2B4CqyadS2nIiVkd5jo8%2BEW8JZQGaknaEqcGqm0TbqT9g1ys%2FJNLbTkXTLNpO%2BR4WV2OyIuvnWawWosneIB8zRe05sFafaBx9ZHKEZp74TDltMMz0q6xk15eHmUqyJuVlvnj7%2BH4L6%2BQb2j%2BUzmL4H8b2F2%2BfMCC%2FEDOfNt1eePFHE4bEzNb52j3LjPNW3%2FfZnPJ85ZfHGr%2B%2F8btTWX7DB0gIjrnyRXa9chvvPvYFqkbPZ%2F7nHuLVXy028r75%2BzM4%2Bb%2FbaZxxAdMTCh3v3cdLP12IzVlO47TPMGX5%2F5KQtQF1bn%2FnF0XdNNOP%2FkbRPoq519O98fcsbvADrvS8U9VELDWpxqr4uuR77z5q511NxeSz6HzlOhK9e4l4NqXnlV3VjPnMr3DVTuPwugepm3cVFovNxBz%2BI6y4QLLbiEfjRve6%2BNv7012fJBBCYv6lJ5jeSMVloY9fhZ6vtMRGJJ7sGfIwU33OoqveMZhxWcvqj4bGzNQpUYCZUu7Iz1z87fbc5YYGUxg961B1GvwM5kdRninmCd9uz2FmNuJxuTAzn%2B1xRdep14XBM7N1Lv52e7%2Flufi6%2FYbtkBp5CoRUzqSTbmPSST%2FUyymRWz9jCZDQaJi5goaZK0w6tSJ1Tjry63n9nm17QtGK8lHMsw7%2F5vs4zrGO8TV6Y%2FXyw4%2Bx4obruemry7jjj1dTNesKXE1zi%2FZ75ZyrEQhsZS2MveAfhHavIuZ%2BH4SGq%2BlIyqecjdVZhYagcs5X9dXtqpk57BusYFhxO6tdzf6%2BBJqqJZ%2B%2FU%2BtTRPYtTHrwmtEIWKGm2kUgqLg%2FrsxF39iPZAXnx1znp5WZGmWkX9rl5heZa7uGplP7d9ku1c2haskv2QJszVD8wtMAp1G9RL9G5mPk4MqzFNeUi3FOucTQqQCy3L%2FOYd9gHdofaKmbWJ2oGFNJwBcmHtK%2FOhWmb%2F8KDCctFlzlNiobSokh4W33t4wwR5hDYpL5OVRWfsn8NihvnuJ0VnzafTSck9GBHPHVffaqMZUdNqe1WUjp9b95HzGytrUQGihx1e3vDLRs%2FU2rPMIcYQ6JmXwqGih%2FepQ1KJ2avzNQsfU3rZERH42kkTSSRtJI%2BveNsDx7Y3Z7iaXDYpOaB7sJhQA0RbjlqNrSNKlEHmGOMIfK%2FFekpE5NjqoVTZNKIiM%2BGuYN1uHdUbuz3JqQJLA7JewuC5Kkb2E7UNJUkGMaclx%2Fro6HFMeoKaXyCHOEOVgmZHxVkGdaRrJkrDXThqyzbNSU0sin2UfDucGyAFgd1g6hQUmFBWepBYslY%2BXxAP9ZLOAstVBSYUVoYHXYOoYbU5KkT63tHyemsVoiORWTGVAh8xMpY4nd0HQGP%2B0%2BGvZvCZFottj0CqEk9FqxZft60xuZmW1z873nNa3QtthAVWkuxDTNCUogyzI792zBbrMzbcoRHwkzh1EE01kmfeTMf4XOTxozNUowTx0nFzYko%2BVkvPBKdq%2FmKWbTycXptHzqfTTcGywtObyW4%2BkCyQ5CMbVVDPiwLFn0YWghprmmgbdLD0LRUNeEnBAfCZOBHvLzMC0WSMQ%2BWua%2FQucnjWmxSKbds1N7bglAaAKLVTKyK4rAIqXfi72%2F8S1jX675s477SHX2BIIc7uklKstomobTZqO6vJxx9XVYMgMCDsAMBvsIBHo4eHAPtbVN1NU24XKVUVpWMWSdsWgYp7MEyWLp10eaphKPxygpKcthDv8GS0213oWDUMhxzViwlj6e0ZgL0ASomkQhpvFlZ7KMayqbOObIUwFBIhXCqAjm6nf%2Fzoxp86itbchh6vMgg9OpqpCIa6x6%2FiHjnHPOvJRVzz1kCppwzhmXGnkyj597xqUFbR%2BICRjcc8%2B8lFXPPzwoZiplnmtc74xLefqFhwetM6VVghxm6loATz33UL9MJFj1nJlbKAjFkuNOz5nMUhVza5e5Jfn4MdPYuPVdhBDIyU9OPor66enrZcO%2B%2FTlBKDo8Pfh6gsxpnVA0c%2F%2FenTQ12pgwro6%2Bvl7efnszpaUV1NU2M2bMZCoqagatc937qxEC5s5bgt3uyFvnZTnOxk2rkSSJI49clsMc9pPuB3bFhdVurpT3P3qn6e8zTv48%2F1z7Ev5ANzXVDRy9YBlN9WNyI34oEuOmOKV8zOz01HMP0NvXxX%2BcdgkN9aPyD23zMO9%2F9E6EEIwb08qCOSdQW9uYdyi8dec6Nmz6J0IIjpx7Am%2BvfQkhBFdccr2JWVlnIRxQ%2B3%2FVIg18bDC2f1qY9z96JxUV1Zy27Hwqyqq4%2F7G7dB9cfB2KiLBm3etEoiFOX75C39p67csAHHPUSahyupZabbmPOS%2B8pG%2FXvfyECz8y2%2F%2Bxbh3%2BcJhF09oYW19HXzjMyxv0GJ0Om42zjj6maOYTK3%2FKsiV6EAqAbVveQSDwRxX298aYPGkuEyceQXVVQ9HMbdvfYULLdNas%2FTsNDeMoLSk37XgRjUXw%2BQ6y8KhT2bd%2FMzNnHJPDHPYjLFUFRTG%2FlskOQvHQ479ClvXdGg4dOsTOXdv4wgXXUFvTmNUEWinEzOz%2FEokYO3bqQVTLSxqIR%2Fv5MDOLeeJx5%2FP%2Bhjd4f%2F07vL%2F%2BHaa0zuLYhadQX9No8Hfv28Kzf3vMQHQcSAehiEc1EzMRF8SjGnf9%2BjuGvYWCUHz7az8uWmdmuvue%2FzIxr%2F3qHcb1Uty7fv2dXH6R5ZnJL5QMdh5mSst1X%2Fsxd2aVQ0pbttaBmKBv2Lfk6LNxWCuJx4RRr%2BIxgau0jCkT5%2FLaW38xpgT8%2FoA%2BSogL%2Fe0W8NsHf0BTUyMXnvUVkz2pIBSJqEbRG6cMUJ5Lput7aUUTCdZs38sHHjddyT28JATxfPEWCzBLXfUDBqF47L4bmTH9GKZOXUBd7agBmUF%2FmFhUw%2Bf1sm1b%2FiAU9XVjCAdjhIMx832VZA77BktRQY5rplfL2UEoTj3xQiwWK399%2BY%2FGsb%2B%2BuIrzzvxy%2BqlMArtLf8bPxyT99Mbu%2Fbtwu91MaGkjES8UhCI%2Fs7ZyLCcvvoijZnfxzvsv8%2B7a13jjrX8w54hjOf%2FMq0CCF%2F6xErfbzdwjjufMUy7mhZceZ92m1wGIRTUTMxbRiEU1rr789hyd2ZOb0WjxOjNt%2F%2BoXf2RixiL69VIDgVhE4%2Bov3k4sog2pPL%2F2xR8NGIghFtEKMlO2R6K6jkzbjbJJMlNaB2Lqum437M2caohFNSSLRFX5KM469SriMV3s8UedBcmGIR7Tt1051NmJ1WrJaiwkIwhFNFpMEIriy%2FNQbzfPrX2HcCw3CEXKjmKYjfWTee753w0chGLnS6zpDbB06ecHZFoo5w8P3Eow1H8Qio72vZx00hfS9TWD%2BQlosASRrIgk2UEoprQejaoquN0%2FNeYd3o29yWeWXWEClicjCeVjZg4JNm7Wg1DMmr6ESDJiSs4rowGYwVACb1c3h92HkeU4fWOCRJI9ypatG4gnosy%2F6BRUxcmRs0%2FhhX%2F8CUmSiIQ1E1MJKUQiGt%2B8Ud%2BY7We3Pc81%2F63Pqfz8thcKx48qUuc3bzrD1Av%2B%2FLYXuObG03PmdX72w%2Be55sbT9WsOsjzNk3j6NTOZhi0FmCnbs4NQ%2FOy25022f%2FPGXFsGozM1wopENETy%2FXzqu8Cf%2FPLrxnWv%2B%2FoviEcE192ib4dtsVr4%2Fo%2F136%2F7%2Bi%2BMkb4QwlR%2Ftm5fy%2FMvPYjHewCXs5RjjjqN05d%2FwYjYPJDO9Xt38cI6fW6stXkUi2fM5YGXXzB8ZJxThN9ttpqig1Dcv%2BpB%2Bnr8nHrqVf0ya2pa2bd%2FB9OmHc3MGUtYteonpiAUZ59zLTu2v82OnW9TUtJMNCOiefnwj%2FKVbLAUdKdn3JPZQSgsUiUCxRSEwufrIhzRTIMQZ1myoPMwM3uzNe%2B9icfjob66Va%2B8eQY0hZh79m3ib688wvpNryGE4Kh5yznr9K8wunkC4bCup6urm3AkgCTKiEQ0urqDhvZIRDMxo2GNWETjhzf9BQn9Gj%2F67nP6iCOpLbudKkZnKv9tN%2F3FZHskonHbd5%2FLYaaOZ16z2PLMikbGD5PXzLxWylf5mCnbs5mp8kxdN5Uvda3%2BmPl0pjrCSFhD08w7xX72lP%2FH%2F917HQDhoEY8pvG97zzJVd88BiEEd9zytL55X0g%2FMRWEIlVe6za%2Bxq9%2Bfz3HHf1ZbrjmNt5e8wIPP%2F5jwqEEZ552RVE6H3v1NeKyHoTiP0%2B%2BQK9LGUEoMn0zkI8qKybQUN82iCAUD3D8CVcWZPb2unG7d%2BPzeEDbyKGDB%2FF53Zx62tU47E6effYuXn7pCULBbnxeD5s3v8fE8bOprh1lYg77BktWIRDU%2Bg1CEQiqqAnZdNzlLCMYMgehqKjVf8vHTAeh0Hj73VeIJyI01s8kaIRpyh%2BEIpv5jf%2FSRwPzZy%2Fjc%2BdfT8u46fqIK5gOQmGRynG7d3HfQ3dw4bnX88CjPzG0B4OqidnTraKqGisunzBggf3p%2FnZWfEnP9%2FgD7UXbnjonm5GdhsJ8%2FP52Pvel4rQXYmba%2FvgD7cYizmzdKR99Lpm%2FP2Z%2FQSiCQU1%2FlMvwe1nJBCOwRE%2BPgqYIhMViBKHo7VFMo8lU3pTf7%2Fn9%2F%2BJ2uzl58ZdREi5mti3H4%2Fk2Tz37AEuP%2B2JROvsCEULJR8Ft%2Bw9xwHfYFISipy%2BBzWYt2kcLFlzEn57%2BPzxFBKG4%2B6e7CCXvhXzMrVvXsX7dX5LBJtIDh317dmC3O5PHnzeOv%2F7qk4SOTDBv%2Fukm5vBvsBShbxTWTxCKwx4PimwOQlFdNYZoLLW7Ympb3mRB52GmghHsa99EV7eHlrHTkSzlhGMiuXpXZARNKMwcP24uF11wE1MmLwBJIhrNDBihf8l%2FwrEXs27D66x85tesfObXJlsicWFiBsL6Jv8P%2FHr%2FgEEoIvF0vsHYfv897cbfkbjg%2Fl%2FvzxswYijMaEzwwD37BwxCEY6LgsxM2zPLM1NnJC4MHz1wz%2F4Bmdl%2BJ6NeRWJaXp2pOa5gaqQiVCMIRSCkmZipvJG4QAjBvvZtyHKci7883eTvcHh70TpbGyfy9k79reCdq%2FR93EscLqIJvRFr9%2FgYU9dUtI%2Bq66czte1U7vvzT%2BiakD8IxazZp3HlVY8SiWv9MlunnEQoFOftf65izrwz0TQFRZFZt%2B4fqJrCuLELsDtd2G1O1r3%2FDJOmLGZy28k5tn8iRliJRLqSannmZ15b%2FWTOsdlHnEQ8uc27JoFFgKwKCjEtyW5n83Y9CMWUyYuIK7pnU32tJWO%2BoxDzv69bpU%2FkymmmlrxOalpx4YJzueTzPp776y8RmsbnL7iF39x3tf6WMJFf58Vfqk9PiN7fZfo7Mz18f1dROvPZrgFfyOI%2BfH9X0bbnY%2FanM%2FNaDz%2FQVZBZiJFZHnm198PMZ7vxprYfv6d8pEmmxe1EEgKrRTIxAaKynq%2BxYTydh3bx61%2FsoqK81sSMycWV52fmLUNWNLYd3IUmBHMmTOf4tiO569n7APj7%2Bre5ePHZg%2FJRWQNwZV0AABWdSURBVMVofN59MCEdhOKX973K5y69h%2FqGVsaOnZkMQtE%2Fc%2B2aJ5AkK83NbXjd%2B6isHsX0I05h1hwnFqsNBGza8Cy%2Brj3U1U9Aw8HqNx9j4XGXmpjDvsGKyRDpJwhFff14%2FrTyVhQlHYSipKSCJSd%2BJXleerfIuJKuIJECwQi273oXgPETFxIpIghFMcx8QSiWLL2KJSdelf4h2WBFZC0v897f%2BgxmRBHc%2B1tfDlMiI%2FrIEHUa10kyY%2F0EoSiG2Z%2FOe3%2FnM5jRZDCCgWzPV57hZBCKe3%2FnM%2Bnsj5mt8%2FDh3cbxrbvWMWHCPJPfu7sOGL%2Fv2r%2BFsWNnIoCamtH09h5i2673mNS6AAF6A5BMO%2FdsoKVlDief8nX%2B8Idv8Mc%2F38o559yI1WrnmWduJxzu5YorflOcTouDMxeezpkLTzeV5%2Fc%2Bf0M6WMYg63zD2PnU1bcCMSMIRZdvH5U1E6ltmqGfU4TfZ85bQTwRZueO1WzZ%2BDQJRWbtO3%2BkcfRMJOBw52bisSA93e1Mn3U6E6cux%2Bkqz%2FHRsG%2BwEoogLkiuLM4NQtHYNIULPvdjnn7qe3T59jN23GzOu%2BA2nGVNyYqsn2e1Wow92vMxU9Tde%2FQGa%2ByEBUQGCEJRLNOoIkUEoYhrUl7mNV9v7Lewfv5%2Fng%2Blsxj%2Bh7H9mq83DcgvxMynTbcXrrm6aUjMbJ0335IOMnHbj07JKc8bbpxv%2FP6%2Fty41rn%2FDTat5ZtUt%2FOznFzJh4gL%2B8%2Bo%2FcdP%2FLDLy%2FuCHy%2Fn5rzzMW%2FA5YnGZ1177Hdd%2FZzYuVwWz557B2effRlTWBtT5k5V3FHXTXH%2F%2BfxXto8Md77Pmzd8wv6aPzCAUNfWtVDamGqvi69Jbr%2F6OhUu%2BwbTZ5%2FD8ymvo9u2m88CG9ECitJqzL%2F49jU1tvPnGfSxa%2FDWsVpuJOZyTBPDkc2Hh8cQJBAvvPKFhHp7nS5UVdpqanJx3Zpn0cWTe8E39xvv1fT0fa50jzMHn%2FTja7j7wPuve%2Bi2T1bVGEIrUHNY%2F12zhD08fZP5xX6F53JFD0hmPh9i5YSWdHWtAaIwedxRtcy%2FAWVLZr85hP8LyRzV3SZW92eOXUdV0pBHInH%2BQTM7TyJxHkJCs0FRlpy%2BsuT%2BuzO%2F%2BxINkhZKPuc5PMzO1iKLfvJL4MDq1f5ft5aPmc%2Fx5v9PnojKYj7wPWM9l8Xk6MyQPsTwtZbTOv4wJ879o6JSBuNy%2FzmHfYO34INLSMr4sUT%2BqFG9XnGBYASH0yfciNrqvKrPSWO8kjMSejnDLCHOEORSmxSIVnzf1cmjwOis%2B7T4a9o%2BEAF%2B5zW0fM7q0w%2BmwDGmj%2B3hCcx88FGm596ZmeYQ5wvwwTCxF5h2cTu3goUjFvTc1R0Z8NJJG0kgaSSPp3zfCeuxuv712tKPDWSk1W8n9TI08bXkqqUA8INw9h%2BItF11bLY8wR5hDZRabdwg6tZ5D8YqLrq2OjPhomDdYD97eZ2%2Ba4kzYrILRYyw0jrNhsYLdPlCVQd8y5IDC4U4NRZXw7I46LruhVh5hjjAHZqYf7kBf76Sp%2BkoHRRE5C9hsNv0jaatNQpEFtqHpLLvshtrIp9lHw37SvaTa3iFkwcwFNkrLLUZd0rLn8kTmAke9cOwOGDvJRm2jYMPbMiXVzg5g1HBiuhwwbfan0%2FaPBzN9n0kWfd7FYtEbpVToVJs9ucJdAk0TWKxD1hkErJ9mHw37Bgubpbm6XqCqEPQn9y3q3phuuyWJUXWz07sCZI1HU8eq6yEYsjQXYmZ3CJoq4%2BndhtVip7FmxkfCTEVdGYzOCW3Wj5z5r9D5SWNarHkeCZMb0qkKpn3%2B7Q5J33XUmHJOf1CtiUHptHzqfTTcG6x4QqOkVCLQqxqVJzsIRallZt4tZ4WQjA9YXaUYm6zlY6bfbug1LRT14ul1U1bSiEtSPxJmTjSRIpgul5Ue70fL%2FFfo%2FKQxnS6LiSuSQSgAFFngKpGMz2MiYS35SKj%2F3tn1jvHvxopFH6nOmBYipPahCBlNaNgkGy5LGRW2GiySpWhmQvaTkHsJhPZR4mqkxNmIzVaK3Vo%2BZJ2KEsVmcwLWfn0khIaixLDby3KYw7%2FBiumtt8WW%2FowiOwhFrUszfV%2BWar0zR6OKIoglUs%2FPuczcKYxG6lzLQEBvt1Y0s6PrFZpqZlPqbMg%2FLTJInbGooLdHY1t7ekvlmRMuYmv7Y6agCaljqTLJPF7I9oGYADMmXMS29seYOfEitrX%2FcVBMg51xbirNmHAR2z%2F446B1prQikcNMXQtg6%2F7H%2BmVKYJRXZl1K6ckMQjFx1CmmfJqGvmtEcitQPXhoWofLMhl3z3sIIXAo2pD8nq9%2BhtU%2BvMqBPPs09lJmCdLoaCma2e3fTVubndqaOvr6%2Bti1Zws2WzkuezPlZRNx2GsGrdPd9RYADbXHY7U48tZ5TY3T1fdPkCw01i7JYQ77BisWEwQCWsY%2BsZg26gMotx7goPc1YnIPJc46xjYsocw52hiSpgorkdBH3PmY2ctEtn3wCLFEN9PGraCsRB%2BtCo0Bmfs%2F2MS%2B9o1UlU1kdN0xlLga0g5LXU4Cb%2B8G3D1rEEIwuu4YDnbpG%2F7Nm3KNiRmJCPq6FUZXrDD09fao%2Bt8ZzN4eldGVK3J09narBW0fiClJ0Jfk9vhUmssvHBTTYHepNJddaDBB5xrHBsns7dZHvNlMgB6fChKMrljRLxMkPB4PDnsVk0efjcNeyYY9v9R9MPkbVJbG6fS9iayGCZfru4Ye8L4GwLiGpUTD6S1oSsosGaMwQFTj9%2Fv1x8WYaipPY5RRRF3Krp8dcjsJEaHJNpkyqYa4iNCpbNXtJoLNPqZo5r4Dq5nQogehqKmoIWrdiRAh%2FP6DbGpfTVX5LCrLZ%2BCw1RfNDAdLqSidxvadz1LiHIPNVp7uUCQJVY0QjXfSWLucQGgrDqHmMD8RI6xun2KaT8gOQuH1%2FA5NpHZrOER7x3ZmTfwqLkeDqYeKRhwUYmbuJKCKOB8c2IYk2RhfXUsspBSMCZnNrHX%2BB%2B6et9jleZfd%2B9%2BlunwG4%2BqXUeJqMPg9wW3s7vyzwTh0OB2EordGMTH7ulV6ulTe3XGzaR4l%2B98AC9u%2BX7TOTNvX7rzFxDxq2v%2ByJnk9gEVt3%2BfdHTeb%2BIMpzzUZ%2FEJpUdv3CzJTti%2Ba%2Fn3e3W4uh5S2bK0DMQX6hn0zWk4n5C9DQjXqVW%2BNisPlwmWZhbfrrwQr9Iavr1cPQlHtVOnr0UdO63f%2FhOZRjUxvudz0%2BJYKQiHZlJw5%2FKH4SJKgTEynHIhKCQ6r%2BwlpPmKEDFq1TSmaGQ3VDBiE4i%2F33Uh1%2BVFUVczD5WgekNntDyGXK3i9XmKJ9XmDUDgdo7ApEQKRCJKs5DCHfYMVjUNPl2p6vZwdhGJC0zlIkpX97pXpNR7RvzB1zGXJDfn1ri%2Ba%2FCI8HzNzI7eekB6EorJ0Cj3dAoGaJ3BAIWYztc7zKJVO5FDPa%2Bzau5rtu1%2BmoXoh08ZcDhJs2Ps0oaibxupjmNR8AfvcT%2BLp04fT3fWqidnlVejuUphcf3OOzuy9h7u7BqMzbXtr3c0mZo9PZXL9LcZN1e1TmVx3Cz0%2BdUjlOanu5gEDMXT7lILMlO1dPpXJdTebbO%2Fu0rWmmCmtAzFTuuIRiURYMU01dNerOEssCBoZVX6Z0ThVOT6DhKCvR6XLq48OOjs7sdosNJentuPWDU0FoRA2tYggFMWXZ0T0cZB1KMRzbpiG5FxrMcx4eCLPPf%2BHgYNQhF9jry9AU%2F35AzKDoRL27r0DWenr57b2cPjQPkbVr0DIag5z%2BDdYUY1YUEb%2FNl03KjsIxcTaIxFCxe3%2BP2Peobd7NbX2i%2FTzpOQY3OWkEDOzIu33rsftceNoPJYujwqW5KelGkip7%2BQHYMYSMdy%2Bbtw9h%2FXRXzxIrUOvUPs%2F2IgmYoyvWkpPtwOXWIrb%2FSSSJNHVIJuYhztlurwar2%2B%2BAIDFs%2F7E65suBGDp7JXpHlgwJJ2vb15h6gWXzl7Ja5vOz5nXWXzEE7y%2B%2BXyWzlo56PJEsph0vr7lAhMzdd1CzJTt2UEoFs96wmT765tybRmMztQIy9eoYnfooWckSUJo8N7u643rHjn5DnwelTe3XKxXVLuFQ4euBeDIyXcgSAehoCQ9cd4TeJ%2F9nj8SiXVitZQwqvYkJjZ%2FDkmyFqWzl%2F0csmxAkgRlopEGbQb7La8aPvIpavH1M15ZdBCK1RseZdroPkbVX94vU1FaOHRoJxWlC6gsP45Dvl%2BaglCMafoagdBaguG1lNsbiIfUHJ2fgLeEEOhSAcXoprKDUPibyhCanDW31cWkOvOuYJXJDSnzMTNnBnftfYu%2BsIem0ha8Fhn6iSyXzfSHNtHh%2BzNdgdWAoKFqCRObLqfMOQ6fV2d5vd0oapCeehd2a4JQ1G9o9zYpJmZHu4zPKzO9SZ8g9nkVZjQ%2FBgK83gSFvtMaSGfKdp2btt3rTTCj%2BY85TJ8vwYzmx%2FD6EoMuT%2FPOexLTmx41MSFlS35myvZsZqo8U%2BwUN5X6Y%2BbTmeoIfd5E8nj6Wa5SuoLN7frobpRLpqdbZWr9g7y26WSEEBzT9ghIcKhTX%2FuYCkJhr9V95Ot7ky0f3EJzzWlMGXMj7t4XWbP5l3T54kxovqQondsd%2F0RD1l80xT9DAEGXMx2EwhdPFO13GEssNGkQQSgewapdXJCZkL0kEvvxeT34bZux2g4SjblprLkSyeLA0%2F0rIsGnkeUeEooHm3ifMudM7I4mE3PYN1iRmMDrUUDSCgah8DTLaJo5CIVFKsXrlUGkeyl7eXLf8jxMY8iuqeza9zqaiDK1fireaKoSWPT80C%2Fz5Q36aKCu8gQmjfo6FaXTCAcgHJCTKw8h2FuKP7Kbt%2BWfMWn01Ww%2F8At8fbp2b7NsYnYeThCNKry8fu6ABXbS3A28vEHPd9K8DUXbnjonm5HDHwKzP1629kLMTNt1Dfl1p3yUyt8fM9vvmQ2Wt1nNCD6SsneMEViiyR4nFtVASgehaLLH03kzglBUTtL9%2Fva224nE3Uyuu5hunwNJW4zH810CvY9QKq0oSmdXSQTVoj8KuqKHiVl8eJ3pOAa14SgWbEX7SJPP5fa77uPyCwcOQtE2cS1ej1yQGQhtIBD6O6GIB0gPHOToTiTJTm%2FAg4%2B%2Fpd94Bp%2BhujxOZflyE3P4j7BkgT%2BgGl9%2F5wtC0dXtQQhzEIoyVzMBvwakN89PLfzPxyT5hXkwsg1%2FwEuZayrRSAkRYxekzJBahZk2MZPW5mupLJuHJktJDal7QmdVOs%2FjoGc1O4L3sqP9XpMtgYBmYrrdMhKCo1rXmXSSNXErkuem8g3G9gWt642%2FAwGNBa3rcpbPDJWZqUnqZ9LZH9AKMjNtzyzPTJ2BQFrbUa3rBmRm%2B52MehUIKPgDuTpTc1yeBsXwZyoIRfqYzkzlDTRoCDR83TvQRIK%2FvnO0yd8hdhavMzGWsGsbANtZpbeNISfCqjdiXaFeXGrdIOr8FCRtCXf95ldcNj9%2FEIqykpOoqbqHQEDplynE8aBGCYf%2BQlnpKSBUhJDx%2Bl5GQ8Vpm4MkubBIDoKRv1LmOAZNXZxj%2B%2FBf1pAAWdVMN2h2OtTzbM6x6vLFJFRhqnDx5OrkfMyUI7tC7%2BnD4JL5pvMh9wuzfMyZEx4CIKGKrMqRPr%2B28gwmNnfR2XUvAo0JTdezu%2FO%2FjPPy6Vy9Zapx7eOP2GX6OzMdd8SuonTms10Ab2VxjztiV9G252P2pzPzWindA9meLx1%2FxK6C2gdjeyr153eAuCpyjscUDYskmZipvBLgdIwjGt%2FLwrZ3sdtqTOcmknkG0lkVWoQqVCLOdgQaZfHJVMVm0lmjv2zqcr5PY%2FDkwflIakZW2oF0EIpb73yZutqfYLeNx%2BloMzT2xwyGngHJit02hUSiHau1mZKSpZRITiMMfSTyd%2BLKPmzWcajY6Q2spLx8hYk5%2FCfdY5BQCjdYTvtY2j13IkS6ibZaymmovjR5XnpP6ljy6S4fMzXN4g%2B9D0CJaz4JVRswCEUxzHxBKBqqv0BDzRcymMkGS1HzMhe27UiHWVI1FrbtyGFKZFTKIeo0rpNkyor2oWzvT%2BfC6TsMZkLRCjIzbc9XnnFF76UXTt9h0tkfM1tnNJYOHNET2kiZa5bJ7%2FFEp%2FG7P7SNUlcbAnDYmkkobvpC6ykvmYsA4on0MpW%2B0GZKXTNprr2C%2FYdvZP%2FhOxnb%2BC0kyUan7xcoah%2Bto%2B8sUqeNKv9iqlhsKs8x7i8bOhNicHVess3Cah0PyEYQCkVpR5LGIVmnklC1ovzudJ2FKiJYbe8Qi%2F0VTSio4aew2dpAAjmxDSFCqOoBnK6TsNlOwGIpy%2FHRJ%2BCRUEMR%2Bkel%2BYJQOO2tjGm8hUO%2BHxOXOyh1zmBM400gNSR7N%2F08i2QhFlcpxExRg1H9ccLlmktC6T8IRbFMo4oUEYRC0aS8zA27p%2FdbWHOnbPtQOovhfxjbN%2ByeMSC%2FEDOfNt1e2LBrxpCY2To37z%2FdOG9b%2BwU55blx70nG71vazzauP238cxzy3cGOA1dS5ppL65h72bTvVCPv1vbzmDt1G1Xl5zCuUcHX9xAbdi%2FBYimjqvwURtffhKxqA%2BrsGvP7om6a%2Bs4ri%2FaRIm8kFnmQZa1BMoNQWKzjEdZp%2BkhzEHUpHH4IV8mXsTtOJxi8CVXdhyxvyXizW0VF1d3YrFPwhx6ltPRyJMlmYn4C1mEJJJsDORpJTmoKZrZuwdiCX9IQwsKksasyTrXoIw0pNUEOrhIH0eTSlXzM1K7YU1teNZiyqpqYqQnVwTIzdUoUYKacas%2FPnNm6LZkjH1PLGO4PTafBz2B%2BFOWZYs5o3ZbDzNQpq4WZ%2BWyXNV2nXhcGz8zWObN1W4HyJP17nutLuGiuv4Xm%2BlsAC4qaWz8TCkioVJafS2X5uSadokid1R2X5%2FV7tu2KpBblI0XeQCL2ICdO2GQEoXj54cdYccP13HL9cm6961s4XJdhs88q2u8O11VoaEi2cZRXP4scfxZFWQ9Cw2abi8P5WSRLFSoajpIrULRc5rBvsMLhhNtRXtYcisQQmpp0soS%2BZb4wTWabJ7dFupJboLK8jFAo4f64MqeO3wIWcHzMdX7SmaCa3g5k%2Fq6PhAtfP3Xuh9Cp%2Fdtstx6BrfRO3vTCam%2BKKfHo5QAnYC%2FVm%2Bd0gNPBlqcLi%2F1C7PYVhk5FgFD71znsG6wub3dLVWNjorS2jrDfj5yI5%2B5TUWije8mC3eGgrKqCOBK93u6WEeYIs39mnvUOkH9%2FlHzXLzZffp0Vn3YfDedkdCAt4zbby6rqOqxOW3P69XjxG92rsuIO93W3HDg4Sx5hjjA%2FDPNfEYRClRUt3NddceDgrMiIj0bSSBpJI2kkjaSRNJJG0kgaSSNpJI2kYZf%2BP00%2BIPJt2iY0AAAAAElFTkSuQmCC";

function defaultsettings(){	
	settings["markdownbar"]=true; //show formatting bar for quick markdown insertion.
	settings["inlineflash"]=true; //show flash above flash-link on submissions.
}
function loadsettings(){
	for(var i=0;i<settingnames.length;i++)
		if(typeof GM_getValue(settingnames[i]) != "undefined")settings[settingnames[i]]=GM_getValue(settingnames[i]);
}

function inlineflash(){
	var el=$("#detail_submission_flash");
	var link=el.find("a")[0];
	el.html(el.html()+" <a href='.blick_embed'>or scroll down</a> <br/><embed id='blick_embed' src='"+link.attr("href")+"' width='90%' height='"+window.innerHeight+"'/>");
}

function markdownbar(){
	var bar=$("<div class='blick_formatbar'></div>").html(
		"<div class='blick_button'><div class='blick_bold' title='bold'></div></div>"+
		"<div class='blick_button'><div class='blick_italic' title='italic'></div></div>"+
		"<div class='blick_button'><div class='blick_quote' title='quote'></div></div>"+
		"<div class='blick_button'><div class='blick_leftalign' title='align left'></div></div>"+
		"<div class='blick_button'><div class='blick_centeralign' title='align middle'></div></div>"+
		"<div class='blick_button'><div class='blick_rightalign' title='align right'></div></div>"+
		"<div class='blick_button'><div class='blick_justify' title='align jusified'></div></div>"+
		"<div class='blick_button blick_dbutton'><div class='blick_title' title='insert header or titles'></div></div>"+
		"<div class='blick_button'><div class='blick_link' title='insert a link'></div></div>"+
		"<div class='blick_button'><div class='blick_user' title='link to user'></div></div>"+
		"<div class='blick_button'><div class='blick_emoticons' title='insert unicode emoticons'></div></div>"+
		"");
	$(".markdown").before(bar);
	console.log($(".markdown"),bar);
	addstyle(".blick_formatbar{height:22px;}"+
	"div.blick_button{width:21px;height:22px;display:inline-block;cursor:pointer;overflow:hidden;}"+
	"div.blick_button.blick_dbutton{width:43px;}"+
	".blick_formatbar div.blick_button div{background-position:0 -1px; background-image:url("+imgformatbuttons+");background-repeat:none;height:22px;width:500px;position:relative;}"+
	".blick_formatbar div.blick_button div:hover{background-position:0px -21px;}"+
	".blick_formatbar div.blick_button div:active{background-position:0px -42px;}"+
	".blick_bold{left:0px;}"+
	".blick_italic{left:-21px;}"+
	".blick_quote{left:-42px;}"+
	".blick_leftalign{left:-63px;}"+
	".blick_centeralign{left:-84px;}"+
	".blick_rightalign{left:-105px;}"+
	".blick_justify{left:-126px;}"+
	".blick_title{left:-147px;}"+
	".blick_link{left:-190px;}"+
	".blick_user{left:-211px;}"+
	".blick_emoticons{left:-232px;}"+
	"div.blick_titlebox,div.blick_linkbox,div.blick_userbox,div.blick_emobox{background-color: #CCCCFF;border-radius: 15px;box-shadow: 3px 3px 2px #6666AA, 1px 1px 4px #6666AA inset;left: 0;padding: 10px;position: relative;top: -7px;width: 150px;}"+
	"div.blick_emobox{width:300px;}"+
	".blick_titlebox>div,.blick_link_submit,.blick_user_submit{margin:5px auto;text-align:center;border-radius: 15px;box-shadow: 3px 3px 2px #6666AA, 1px 1px 4px #6666AA inset;left: 0;padding: 5px;line-height:20px;position: relative;top: -7px;width: 80%;}"+
	".blick_emobox .blick_emo_submits{display:inline-block;text-align:center;border-radius: 5px;box-shadow: 1px 1px 1px #6666AA, 1px 1px 3px #6666AA inset;left: 0;padding: 5px;line-height:10px;width: 10px;height:10px;}"+
	".blick_titlebox>div:hover,.blick_emo_submits:hover,.blick_link_submit:hover,.blick_user_submit:hover"+
	"{cursor:pointer;border-radius: 15px;box-shadow:  1px 1px 1px #6666AA,2px 2px 3px #6666AA inset;}"+
	".blick_title_h1{background-color: #99c;}"+
	".blick_title_h2{background-color: #aad;}"+
	".blick_title_h3{background-color: #bbe;}"+
	".blick_title_h4{background-color: #ccf;}"+
	"div.blick_linkbox input, div.blick_userbox input{background-color: #aad;border-radius: 5px;box-shadow: 3px 3px 2px #6666AA, 1px 1px 4px #6666AA inset;padding:5px;margin:5px;text-align:center;width:134px;}"+
	"div.blick_userbox select{background-color: #aad;border-radius: 5px;box-shadow: 3px 3px 2px #6666AA, 1px 1px 4px #6666AA inset;padding:5px;margin:5px;text-align:center;width:146px;}"+
	"div.blick_linkbox>div,div.blick_userbox>div,.blick_emobox>div{margin:auto;z-index:99;position:relative;}"+
	"div.blick_linkbox div.blick_link_submit,div.blick_userbox div.blick_user_submit{margin-top:10px;background-color: #bbe;}"+
	"");
	
	$(".blick_bold").click(function(e){
		textsurround($(this),"**","**",/\*+$/," ",/^\*+/," ");
	});
	$(".blick_italic").click(function(e){
		textsurround($(this),"*","*",/\*+$/," ",/^\*+/," ");
	});
	$(".blick_quote").click(function(e){
		textsurround($(this),">","",/[^\n]$/,"\n",[/^\n[^\n]/,/^[^\n]/],["\n","\n\n"]);
	});
	$(".blick_leftalign").click(function(e){
		textsurround($(this),"<div class='align-left'>","</div>",null,"",null,"");
	});
	$(".blick_centeralign").click(function(e){
		textsurround($(this),"<div class='align-center'>","</div>",null,"",null,"");
	});
	$(".blick_rightalign").click(function(e){
		textsurround($(this),"<div class='align-right'>","</div>",null,"",null,"");
	});
	$(".blick_justify").click(function(e){
		textsurround($(this),"<div class='align-justify'>","</div>",null,"",null,"");
	});
	$(".blick_title").click(function(e){
		var titlebox=$(".blick_titlebox");
		if(titlebox.length!=0){titlebox.remove();return;}
		titlebox=$("<div class='blick_titlebox'></div>").html(
			"<div class='blick_title_h1 user-content'><h1>Title</h1></div>"+
			"<div class='blick_title_h2 user-content'><h2>Subtitle</h2></div>"+
			"<div class='blick_title_h3 user-content'><h3>Header</h3></div>"+
			"<div class='blick_title_h4 user-content'><h4>Subheader</h4></div>"+
			"");
		$(".blick_formatbar").append(titlebox);
		$(".blick_title_h1").click(function(e){
			textsurround($(this),"#","",/[^\n]$/,"\n",/^[^\n]/,"\n");
			$(".blick_titlebox").remove();
		});
		$(".blick_title_h2").click(function(e){
			textsurround($(this),"##","",/[^\n]$/,"\n",/^[^\n]/,"\n");
			$(".blick_titlebox").remove();
		});
		$(".blick_title_h3").click(function(e){
			textsurround($(this),"###","",/[^\n]$/,"\n",/^[^\n]/,"\n");
			$(".blick_titlebox").remove();
		});
		$(".blick_title_h4").click(function(e){
			textsurround($(this),"####","",/[^\n]$/,"\n",/^[^\n]/,"\n");
			$(".blick_titlebox").remove();
		});
	});
	$(".blick_link").click(function(e){
		var linkbox=$(".blick_linkbox");
		if(linkbox.length!=0){linkbox.remove();return;}
		
		var el=$(this).parents(".blick_formatbar").parent().find(".markdown").get(0);
		var selected=el.value.substring(el.selectionStart,el.selectionEnd);
		var sellink=""; var selltitle="";
		if(selected==""){}
		else if(selected.match(/(http:\/\/|https:\/\/)|(\.(de|com|net|at|ws|cz|art|org))/)!=null)sellink=selected;
		else selltitle=selected;
		
		linkbox=$("<div class='blick_linkbox'></div>").html(
			"<div><input type='text' value='"+selltitle+"' placeholder='title' class='blick_link_title'/></div>"+
			"<div><input type='text' value='"+sellink+"' placeholder='adress' class='blick_link_adress'/></div>"+
			"<div class='blick_link_submit'>Insert</div>"+
			"");
		$(".blick_formatbar").append(linkbox);
		$(".blick_linkbox input").keydown(function(e){
			if(e.keyCode==13){e.stopPropagation();e.preventDefault();}
		});
		$(".blick_link_submit").click(function(e){
			var el=$(this).parents(".blick_formatbar").parent().find(".markdown").get(0);
			var start=el.selectionStart; var end=el.selectionEnd
			var selected=el.value.substring(start,end);
			if(selected!="")el.value=el.value.substring(0,start)+" "+el.value.substring(end);
			el.setSelectionRange(start, start);
			
			var institle=$(this).siblings("div").find(".blick_link_title").val();
			var inslink=$(this).siblings("div").find(".blick_link_adress").val();
			if(institle=="")institle=inslink;
			if(inslink.match(/http:\/|https:\/|ftp:\//)==null)inslink="http://"+inslink;
			
			textsurround($(this),"","["+institle.trim()+"]("+inslink+")",null,"",null,"");
			$(".blick_linkbox").remove();
		});
	});
	$(".blick_user").click(function(e){
		var linkbox=$(".blick_userbox");
		if(linkbox.length!=0){linkbox.remove();return;}
		
		var el=$(this).parents(".blick_formatbar").parent().find(".markdown").get(0);
		var selected=el.value.substring(el.selectionStart,el.selectionEnd);
		var sellink=""; var selltitle="";
		if(selected!="")selltitle=selected;
		
		linkbox=$("<div class='blick_userbox'></div>").html(
			"<div><input type='text' value='"+selltitle+"' placeholder='username' class='blick_user_name'/></div>"+
			"<div><select class='blick_user_select'>"+
			"<option value=0>Link</option>"+
			"<option value=1>Icon</option>"+
			"<option value=2>Icon and Link</option>"+
			"<option value=3>deviantART-Link</option>"+
			"<option value=4>Fur-Affinity-Link</option>"+
			"<option value=5>Inkbunny-Link</option>"+
			"<option value=6>SoFurry-Link</option>"+
			"</select></div>"+
			"<div class='blick_user_submit'>Insert</div>"+
			"");
		$(".blick_formatbar").append(linkbox);
		$(".blick_userbox input").keydown(function(e){
			if(e.keyCode==13){e.stopPropagation();e.preventDefault();}
		});
		$(".blick_user_submit").click(function(e){
			var el=$(this).parents(".blick_formatbar").parent().find(".markdown").get(0);
			var insname=$(this).siblings("div").find(".blick_user_name").val().trim();
			var insmodus=$(this).siblings("div").find(".blick_user_select").val();
			var inswert="";
			switch(insmodus){
			case "0":
				inswert="<~"+insname+">";
			break;
			case "1":
				inswert="<!"+insname+">";
			break;
			case "2":
				inswert="<!~"+insname+">";
			break;
			case "3":
				inswert="<da:"+insname+">";
			break;
			case "4":
				inswert="<fa:"+insname+">";
			break;
			case "5":
				inswert="<ib:"+insname+">";
			break;
			case "6":
				inswert="<sf:"+insname+">";
			break;
			}
			var start=el.selectionStart; var end=el.selectionEnd;
			if(inswert!="")el.value=el.value.substring(0,start)+" "+el.value.substring(end);
			el.setSelectionRange(start, start);
			textsurround($(this),"",inswert,null,"",null,"");
			$(".blick_userbox").remove();
			
			
		});
	});
	$(".blick_emoticons").click(function(e){
		var linkbox=$(".blick_emobox");
		if(linkbox.length!=0){linkbox.remove();return;}
		
		var el=$(this).parents(".blick_formatbar").parent().find(".markdown").get(0);
		var insertwert="";
		for(var i=128512;i<128591&&(i<128577||i>128580);i++)insertwert+="<div title='&amp;#x"+i.toString(16)+";' class='blick_emo_submits'>&#x"+i.toString(16)+";</div>";
		linkbox=$("<div class='blick_emobox'></div>").html("<div>"+insertwert+"</div>");
		$(".blick_formatbar").append(linkbox);
		$(".blick_emobox input").keydown(function(e){
			if(e.keyCode==13){e.stopPropagation();e.preventDefault();}
		});
		$(".blick_emo_submits").click(function(e){
			var el=$(this).parents(".blick_formatbar").parent().find(".markdown").get(0);
			var insemo=$(this).html();
			var start=el.selectionStart; var end=el.selectionEnd;
			textsurround($(this),"",insemo,null,"",null,"");
			$(".blick_emobox").remove();
		});
	});
	
}
// function textsurround(anf,ende,panf,npanf,manf,eanf,pende,npende,mende,eende){
function textsurround(e,anf,ende,manf,eanf,mende,eende,buttonlevel){
		// var el=document.getElementsByClassName("markdown")[0];
		// console.log(e.target,e.target.parentNode);
		var el=e.parents(".blick_formatbar").parent().find(".markdown").get(0);
		console.log(e,e.parents(".blick_formatbar"),e.parents(".blick_formatbar").find(".markdown"));
		// console.log(el);
		var start=el.selectionStart;
		var end=el.selectionEnd;
		var selected=el.value.substring(start,end);
		var alttext="";
		var addedlength=0;
		alttext=el.value.substring(0,start);
		// if((panf==null||el.value.substr(start-1,1)==panf)&&(npanf==null||el.value.substr(start-1,1)!=npanf)&&(manf==null||el.value.substring(0,start).match(manf)==null)&&(npanf!=null||panf!=null||manf!=null)){alttext+=eanf;console.log(el.value.substr(start-1,1),el.value.substring(0,start).match(manf));}
		if(manf instanceof Array)
			for(var i=0;i<manf.length;i++){
				if(el.value.substring(0,start).match(manf[i])!=null)alttext+=eanf[i];
				// console.log(el.value.substring(start-1,start));
			}
		else
			if(manf!=null&&el.value.substring(0,start).match(manf)!=null)alttext+=eanf;
		alttext+=anf+selected+ende;
		if(mende instanceof Array)
			for(var i=0;i<mende.length;i++){
				if(el.value.substring(end).match(mende[i])!=null)alttext+=eende[i];
				// console.log(el.value.substr(end,1).charCodeAt(0));
			}
		else
			if(mende!=null&&el.value.substring(end).match(mende)!=null)alttext+=eende;
		// if((pende==null||el.value.substr(end,1)==pende)&& (npende==null||el.value.substr(end,1)!=npende)&& (mende==null||el.value.substring(end).match(mende)==null)&&(npende!=null||pende!=null||mende!=null)){alttext+=eende;console.log(el.value.substr(end,1),el.value.substring(end).match(mende));}
		alttext+=el.value.substring(end);
		addedlength=alttext.length-el.value.length;
		el.value=alttext;
		addscript(showPreview);
		el.focus();
		el.setSelectionRange(end+addedlength, end+addedlength);
		
		if(el.className.indexOf("input")==-1){
			el.style.height = el.scrollHeight + 'px';
			// el.style.height = el.scrollHeight/2 + 'px';
		}
}
function showPreview() {
		var input = $(".markdown");
		var preview = $(".markdown-preview");
		for(var i=0;i<input.length;i++){			
			var markdown = marked(input.get(i).value, markdownOptions);
			var fragment = document.createElement("div");
			fragment.innerHTML = markdown;

			while (preview.get(i).childNodes.length) {
				preview.get(i).removeChild(preview[i].firstChild);
			}

			weasylMarkdown(fragment);
			defang(fragment);

			while (fragment.childNodes.length) {
				preview.get(i).appendChild(fragment.firstChild);
			}
		}
	}
if (!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};}
function addscript(newscript){
	var altscript=$("#blick_script");
	if(altscript.length!=0)altscript.remove();
	altscript=$("<script id='blick_script' type='text/javascript'></script>").html("("+newscript.toString()+")();");
	$(document.body).append(altscript);
	altscript.remove();
}
function addstyle(newstyle){
	var altstyle=$("#blick_style");
	if(altstyle.length==0)
		altstyle=$("<style id='blick_style' type='text/css'></style>").appendTo(document.head);
	altstyle.html(altstyle.html()+"\n"+newstyle);
}

function onpageload(){
	// console.log($);
	// if(typeof $ == "undefined")return;
	// clearInterval(waitpageload);
	defaultsettings();
	loadsettings();
	
	if(settings["inlineflash"]==true && document.getElementById("detail_submission_flash") != null)inlineflash()
	if(settings["markdownbar"]==true && document.getElementsByClassName("markdown") != null)markdownbar();
}
// var waitpageload=setInterval(onpageload,500);
// window.addEventListener("load",onpageload,false);

onpageload();
