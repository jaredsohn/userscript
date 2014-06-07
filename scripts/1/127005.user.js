// ==UserScript==
// @name          GooglePluz
// @description	  Enhace Google Plus
// @author        JuanCarlosPaco
// @include       https://plus.google.com/*
// @include       https://ssl.gstatic.com/*
// @include       http://plus.google.com/*
// @match         http://plus.google.com/*
// @match         https://plus.google.com/*
// @include       data:*
// @icon          https://ssl.gstatic.com/s2/oz/images/faviconr2.ico
// ==/UserScript==

// Try to add HTML5 PlaceHolder and WebkitSpeech features

// Search field on the Top Bar
try {
    search = document.getElementById("gbqfq");
    search.title = "Search Google+";
    search.setAttribute('x-webkit-speech','');
}catch(e){};

// Google Plus Logo on the Top Bar
try {
    logo = document.getElementById("gbqld");
    logo.title = "Google Plus";
    logo.width = "75";
    logo.height = "75";
    logo.style.width = "75px";
    logo.style.height = "75px";
    logo.setAttribute('src','data:image/svg+xml;base64,PHN2ZyB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgNTAgMTkwIDgwIiB3aWR0aD0iNzUiIGhlaWd0aD0iMSIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj48bWV0YWRhdGE+PHJkZjpSREY+PGNjOldvcmsgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz48ZGM6dGl0bGUvPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXBQYXRoMTYiPjxwYXRoIGQ9Ik0wLDE1MCwxNTAsMTUwLDE1MCwwLDAsMCwwLDE1MHoiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcFBhdGgyNCI+PHBhdGggZD0iTTAsMTUwLDE1MCwxNTAsMTUwLDAsMCwwLDAsMTUweiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjbGlwUGF0aDI4Ij48cGF0aCBkPSJNMCwxNTAsMTUwLDE1MCwxNTAsMCwwLDAsMCwxNTB6Ii8+PC9jbGlwUGF0aD48bWFzayBpZD0ibWFzazMyIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGgyNCkiPjxwYXRoIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iIzAwMCIgZD0iTTAsMTUwLDE1MCwxNTAsMTUwLDAsMCwwLDAsMTUweiIvPjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwUGF0aDI4KSI+PHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjRkZGIiBkPSJNMCwxMzAsMTUwLDEzMCwxNTAsMCwwLDAsMCwxMzB6Ii8+PC9nPjwvZz48L21hc2s+PGNsaXBQYXRoIGlkPSJjbGlwUGF0aDU0Ij48cGF0aCBkPSJNMCwxNTAsMTUwLDE1MCwxNTAsMCwwLDAsMCwxNTB6Ii8+PC9jbGlwUGF0aD48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhckdyYWRpZW50NjIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAsLTEyOC41MzA3NiwtMTI4LjUzMDc2LDAsNzQuOTk5NTEyLDEyNy45NDg3MykiPjxzdG9wIHN0b3AtY29sb3I9IiM1MjRlNGUiIG9mZnNldD0iMCIvPjxzdG9wIHN0b3AtY29sb3I9IiMxYTE4MTgiIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoIGlkPSJjbGlwUGF0aDY4Ij48cGF0aCBkPSJtLTIsMTUwLDE1MCwwLDAtMTUwLTE1MCwwLDAsMTUweiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjbGlwUGF0aDcyIj48cGF0aCBkPSJtLTMsMTUwLDE2MCwwLDAtMTYwLTE2MCwwLDAsMTYweiIvPjwvY2xpcFBhdGg+PG1hc2sgaWQ9Im1hc2s3NiI+PGcgb3BhY2l0eT0iMC4zOTk5OTQwMiIgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoNjgpIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGg3MikiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDE1NCwwLDAsMTU0LC0yLC0yKSI+PGltYWdlIHdpZHRoPSIxIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUpvQUFBQ2FDQVlBQUFCUi8xRVhBQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFISnBKUkVGVWVKenRYZEZ5NDdvT1U1TCsveGMzNlgyNHd4NFVCVWpJY1hhNzV5eG5QSlpsVzVZb0NLQmtONzJzdFQ3V1gvdHJMN2JyNzY3QVgvdHYyTnZaQlY0dWw3T0wvSzMyYkhzK1B2NXN3VGlyL3BlMUtaM084U3EvNjZTMEE1L3Q2TE9CUDVWM05yQ09scGZjNTY1UitaeTNXNitZMGREQmxlYTl1dFpkbHdBMkJlOE8rSTljOHlyN2xXQ1l5dUc5U3g4RjNBZzA3dmphOEp6S2MvblQva2g2cmJXdTErL2g1aG1NZXZUNjNSRy9BNmpINDJHdm1jQ2hnT1hTbU1mSGw4c2xBbkpaQ3pRR2tqcm1UWjNIUEU0WFFCTGdwYUNianFmOG85ZXhwV0E3SWxVcHVOUytnS29BdExQaE14bDRiQlpvSGFnS0hOZnI5VnUrdXpZQlg1ZW42c1Y1WFZvZFQvbTcxNkFkbGNWZFFHRzYyM2RwM0I2UGh6em1QWjZ2c2pxd3ljbUFBMWtCeWUwdmw4dTYzVzR0NDNYc2g4ZGNEN1ZuTmt6VHUzbG4yalBzcGNDRkhjMzdTZjdjaG1DNjMrK2ZlYmp4ZFpWMmJXd1pUWUdzZ0hTOVhqODN6cDlZcmdNY002QktKL3MwM2VVbDV6cnJXTzJJTkQ3RFhNeEVFOEFxZmIxZXY0SHM4WGlzKy8zK3BleTZ6clg1RzlBVTB5Q29lTHZkYmhIVDhiRUNJRC9YQWUwSTJCZ3NQSGw0SmJzbExJWUIvcXRrTVFHVzJpdUFyZlYvLzl6dmQrbGpicDlrTkNlWENLemFNN054MmtucXhIUmNEd1cwS2dNYmVZVGgxTEhMTzJKSFk3Rmt6NEY5QWpRWGh5bVo3UG9HcmE2dFoxOHVYK08xTDBCVG5WUWdZWkFwb0RISWxKenVTQ3NEYVdJNnpuTnQ0blB1Mk9YdDJBN0lVckNsRE9iazBqSFo5WHI5Qkp5VHkvSUhNaHZYZ1VHMmxwRk9sa3htdEk3VmxKd21rcHJFY283dDhMalMzUjVsODVWZ20wQ0dhU1dkdStCU2VZcTluRHh5dkhXLzN6L0I1ZVFSdDdwT3RUdGEzdWhBeG1CejRGTkFRem5kQVpvQzJZNk1IbVczWit4WnFaems4a2dzNW1hU3lGN1g2M1c5djc5TGY3am5IV1kweDFoT1NqSGRsVFBKYW5lZTYrcVlMUUZYQnppWGwxakthSnlYTUpwaXNvcXhITkFjazZGVW9qOFJjTy92NzkvYWNidmR2cFRGZllFV0xXOTB6RlVnTzB0T0dWaTd5eU1PWEtsOG5zMXNDWk94YkRxZ2RXRDcrUGhZYjI5djN4Z013YWVZaTZWU3hXTWRtOTF1dC9YeDhjOHlDTjZEYlcwWmpRR2d3RE1CN2UzdHpjNU1uWlJPTERlQlRqRWZ0bzJkNXh6YWdjdzVYNWtEMnhISjNKWEtBb0tTU3Q0S0xDV1ZGZkJqV3hYQWl0blVRSy82MjFrbmJtcVIxckVaQW8xQjV1U3pXNHZyd05hQmtOdkI3VlA3THEzOE5BRks1YWV4V1NLVnlGQkhwZExOTEpWVUltc1d5SkRKcnRmcmw5a29XaXVkcXJPN3VLMEFVd0RyNU5URmNRNXM2dFVXQTYzcTdmSlVlcTFjUnRrLzNCSE9ITkRjeTIzTW0rVHlMS2xFa0Rtd1ZEMlF6WmcwUnVsMFVxSmlxeTVHZTN0N0cyZW15SFJPU2xVREdGaU8wYXJ1ZUEzbWNSdGQrOTF4YWtsODFyRllNcnZrR1NWS3BYdFA2YVJ5YWl0THNadlVxVEtpVjFETU9CMkFucFZTbHVsSlJydUdKdXltOXNyaHUyQjdGbVNZbnNEbEpMTmlwMDR1VVNvN05uTk01Z1k4Vy94U25RR1hBRWJKYVNLbFRrS1Z6SGJzcHRwUmVYZ084N28wR3NydFd0OC9Sc1FPNnRLN0lIT3gyUFNPVXNrbFN1VUVNbzdMQ3NRSnlOWUtKd1BZdVc1aWdHeVd5S2xpUENlaFRsNVZIVk9nRlZCZXdXcTdiTGJXK3NKTWxiOGptWjFFVGpQTGxNbFFMbDIvT01DMUw5VmRwL0tEV0JJVnlMcEYzdTRGL2RFWmFRSStCRThIT0hVOG1RTmJ0M2R4bWdOWXgycnB6UEtJWEdJSWhhK29Za1pURHQyUlRoV1RxU1VRbnBXNnNsSXBkWEtxTm15VFNpcy83SUlNTzhxbE82Q3BQTGRrNFdhWFNpcVZYUEl5UmhsT0xGQXFlUkxBMkhBMmZpYUVtL3JVeDRGRlNla2tvMTE1aWtrZHdJN0dhN2hIcDUwQk5KeEI4djVJWFBieDhmV3pIaWVkQ0xpZG1Leld5d3BzaXRXNndjMjJOZXRNV0UxSnFRS2ZBbGNhczdsWUxXRTBISGtKNE5ndnFTWFNpZWxwS1VQRlpOZnJOWTdOcXQyVFhLbzZzdEt3WEtyd2hNMHlXdTBud0hYZ1F6WnpNcHE4SjJYV20yVFV5U20zQ1krNTNiaG52MHkyRTU5MWJOYkZaMmxzaHFDWTVMTHE0ZUt5aE5IWXAyWGJ5eHNUbzZuNHk4bW9pOWZjQy94SlFwM0VUektLSUZJZ1V3RGpQQVlYNXlXVEFBUWVnd3lsMHNsbCtZRy9JeXZBdWJaZ0habkZjQmtqVlJGbDM1WTNYSWU0V01nQm9zdERrSFZ2RVRCdmtrNEVWeXFoMkQ3c0JNZG9KYm1UOFpyYTdrelRzVmhKWllFT1l6QUZPTFhxbjh3dytma0prM1ZzdHRhQlB5QldyTkZKbmR1bWVHMTZpMUIxZUNaV3EvYlY5ZGhtYnY4UlkyQlZtbGtMODVQWWpJTjhCVFprdEpKSzF3NEVHVE5ZSGRkekhMTjFiTFpXRTZPNXpsSnhHWitiR002OXFrcmpOU1dsS2RpbW1PSlhTR2VYWm1BaGk2a2xEZ1FjdDVXL0tWTnNwdXJBcS81T3pickJ5eGIvOWtiM2tFN2VwamNCanZGVUdidXhtcVA0WjRIV01ZTTdQaUtiSEpNVnFHcVBFc2xTT1lVQjljemI3ZmFaN2hTa1pwdktueFZTZE0vYVdrZFRIY2lkN3RoTUFZNmxWSUVxWFYvRGZScXZZVnRWdWdQV21Zem10bUl6dFM2R2NzbnRjbDlqdkwyOWZYbXVBbG14V2NkcWJnQ3Y1ZVBZNkdlckZLdXBqdTFHeE1Sb0tuMjk1aDlQT3ZDbEc3ZVRuZVpZekJtQ1RDM1dwbUJEVUJYTElhTzV0cmhaWnNWaStPenlNODg0MmFlSlh4RW5hUEZmcW5mc3h0ZTQyR3hpdFM1bW13RGN5ZWZrbUxwR09XbGl0Z2xrR0dnejJOeGtnR2VhaXNsVVRKWktKdGNyWFRlNzNXNmZiT2tZelQwdldyREY5QVEySjZWSFpiV1R6UzVtNjBEV09Va0I2MW5wZFBFWkx5ZW9GWDhFMitYeS82OVdxNTRPY0ZpLzZaTnNCQm5QT0NmLzRRQjFmaW9iLzY2ejBoUGdPdjEyUU9GMXRJN2hKckJ5NDFVZE9uQTVKbURuVGF6bUpnU0piQmJBbEdSV201Ums4aC81c3IyL3YwdHcxL01tSm5NaFNZY0h0dmJyallRTm1FSFNyV09wYm4ydGs5S09YU2VabVdSbkFwZ0NsMHJ2VGdScTVzbHN4bHV5K3M5Z0sxYnJmRG5KcFFOWDVWVjcyOS9lWUZPZzYrUnFBZ1lEREJsT2dhdWJHQ2lnZDFMNVNxQlZwM0s2QTlwYStyVlRkVmE5Q1VnN211dkNNcDJ3R2ZkelJ6cm9SMlhiN3pyZE9WZXhqclVjdTAyelQ3NmVRYTNxc3dPMDY3WC9nYi9FRk5DbU53RUZLcFJQWkRLM25ERXhtSkpOOVNaQUtVS25ZTTQvcWo3eDhrYXljUnprUm9GcVRCZUg3WHdveWM2YW5JVDUyTmJVZ2E2RE9ZMHNVc2VLd1JUd0dGeTdkYWhqWkxDT3pXcHhGdnNWRjRJbm9sSFdMdGhXV3AzcmdPU1liQUtVMnFhdk94aGdFOWdtMEhHN1ZmdDNPcGZUS0pYVjRRcDBCUzdlMThZelRtVnFFbEFNeHU4emNkWGZzVm0zVFRaT0JtcS9zem41bWlSMUY1VHB6SE1DSGJhUjI2MzhrdGh1aklic2hWTEorK2w1aWtGZFhJYmdUVlJneDMvc3IwUHZPdmw0QWx1bi8rbUNyQUtaWWpQM3JHUkVPaVpQV1cyWDBkeHNFMk14QmxuS0pOMEVRSzJYc1Z3bVlZZnloNnZUK0s1VDNad0FqanRZQWNpQmJ3S2dlMlBBejAzZWVhcjJxSDNuUk81Z2RhejJYV3hXRE1jZ1MxbU5KWlBmTGpoNVBDcWJFL0JIUnJ0ZS81bUJkUS92S3VqdVMxYjhVNUE1V1o3cW5ZQ3RMQUVhZHJoS0owQmo2YXhuTzVCTklDNWZJR01pZzNXZ2M2U1JNbXZaNFpmcWZPeUE1UmdyWWJVZEFES1RUWTc1MVVERE9LeU9jVnZyK3pvYTN6ODlyMGpCQVEzWmpEL1AzbVd1em5mS1Q5RkxkY3pINnliQUphekdZSnNrc1FNbGYwWHlMTkN3ODlnL1U2ZVhxUzgzYXE4QThRelE4TDBsemw3UlI5MXNVODArbmIrVWZ6cmZTRVp6emsyQU0zVTBzNU1DRzVlaFFPVFlUcFhYMVJYYmhXMUhwNlZNeHRkV2pGVHB0ZGFYV2VVa24zaWZBMW9CQzUrSGNSNUtKb0xORGZSMGNDWXNobmI0M3loMnpPY2FvU3J2R0FyUFR5dzNyYVc1WjFkOUdWd2RpeWRXb0tqckVWZ1luSGRndzgrNDExcWZ4L3djQkJtQ1NwWGxpQ0FCRS9mdHJvL0dQMDdwa09zQXRyc2xzWm82M3pGcHdtWjFEaDJrSExqRGFIVTlNbEFkNDc3U0NuQUlNZ1FZTDlvcWtGMHVsMjlnTGhiRHhkclVSdzUweWk4T2ZHdUZud2x4SWE3RDBtdjRPN0xLVTQzdTVGQ3huUUtpS3hQcjZoeTFDeks4VDhrZDVqUGd5aGhraXMzS0hKTlZPN21jcmw5MlFkZUJrRzNyZjZxN3dseW43YkNaU25lTXh0ZDByTlk1a3V2TjdUd0t0TG9YUWFWWXJxeFlDUDlTQ1VIbVFNSVRDVHpIakRiNVB3RlNDaXcyKzZ2Y1hhRTc2RTRhTnJHWXlsTkxHQjJMNGVLdGF0c3JnRllkUHhtQ0R1VnRyZlVOTUd3b3N4eWJLWUJWK1Ntb2tQMzUrZE9BUlpQZm96bG5KQ04vb3VJMHR1cEdYM0tOQTZCenpBU3VIY0R4WktEeVhMa3NzUmlUMVRXT2xYaEpRN1ZkTVZ2Q1pOaUdqa3dTLzhReEdwL3JLbkRXbGtpanU2WUR0aHVCRTloUzQzdFRaa05Ec0hYU3QrUExJL0paN1hIMVQ5c1Z2VlR2UnI3cW5LbkN5YWErOForYzA4bmxORnAzSGJkaldDYlBQanNRRmt1aDczQ21pZTFrTm50bVUzM0ZlV3JHanUzbHZPaTNOL2hZQVV4MTNobUE0NFk5TXl0U2RYQnRmWlVwY0hWZ1UvVXRQeVRnY2dNU3k1ek9ZejI2ZG5YWGJNMDYrWUVkZ0Z4RkVrZWNzYVdTK2FzQXhyNVk2eXZBRk5oVVFGLzNxL1lla1Zjc0Qrdm4rcm03RDl2R3R2VlN2UXhwVTFWdTZ2enVtalBBNTU2ajZ2azc3WEs1dEdDck5MSlg1VDhMS0Q2WG5PZTZxN1F6dVFxb2JsVGdVdm1ZN3Rhc25nSFFyb094Ymo4RlpHVVRPK3llVDN5UjNLZWVNNEd2TS92TGNxNURYTU1ucDZneU94Qk94Njd4VS95aDJ2UzdUZm1SNjVzTU1yZU1rOHdxY1kwc0JkV09UNzhCTGVtRTZlR3FzcnRzTTQwcXprdU8wL2I5TG5PRHMvTXAzbmZrbkNNTFZhOEpXSjF2dDJhZDZqeVBLSFdmNm1nM0F0M29jKzhuc1Z3MVcwcmI4cnZ0Y3ZGTEhTNCs2NDdWT1RUSC9GMGUxcFhyUGxuMG82dzd6SkE2WUNwM2QvVHVsUDFUYmZLcGV3WEVhWGV1QTA5WEIvZENmOGUyUzBncWx6SWFYek9CSlRsTzZ2UFRiV2VBOFRsVUJIZGZsNi9xZ0hsOFh0VmRBWE1FV2dlc2JrUjE1eWVuN1pUMTJSQWoyMTA3ZnFKTi9qN2ozRzUrY3M5a3ozTmlXS0hrdktOLzk3cGpaOVQvNlhhMDNSMGpkV1c1Wjd0ckpqc010TzVoejRDbEszOWl6K20rUDhtY2RLazREZmZ1WFBKYUNZL2R1bWxYMzg1aW9IWHNjQlpZV1A1MjQ0US9FVkNKVGUzcWZIQWtsSGlGVHorQmxoWjRSa09TOHJzWWpjOVBIK1Q5YVRheDhqU3dYZHNUZjB4a29nTDlwTnp4ellBcWFGZW1IRWhjTExVemdwTTYvWnZzYUY5TUEzalhiK3A2Sit0ckRlODZuMldsTGozZFY4ZlB5dU8vSFhpSjdZQXp1WC9LVjNiNnJCT3RHMlZ1RVRCdDFCa2cvTlBzN0RDbEsrZlpNci9GMzkzSjMyazdNY1pQcXZmWmRvVEIrUVg1cjNwMlo2Y3gycTlzMEw4WldHaXZiR2M2Nnp6TFRnR2Ewdnp1L2RnVXBQNVhnUFJmc3BmR2FIL3Q1MXIzNjBTdnNMOUErOEYyRkF6ZHIwTHVQUGRNTVA0RjJnKzNwTFB4R3I3K1Z6T1hlKzZwUU1QQ2s5OWF4WFRuckwvMmYzdTFYMTdaQjZjQURYODQ3dWo5TzlmOUJXSm16bCs3ZmxUWHFUN3Z5T1VMMEg1U0IwNTErYTh5SUxjN0JRMy9rdVNVNzJ3bi9zTXlYeHFqdVpHd2xxK3dBMUF5cXJybi9VazJ0Y01CZzM4MTBwVjFOSC8zSGpRSnRHY2xhZ2NzN2o3TWU3YU1QOTJPZ3NhZFR5WDEyWkFJelRKYU1wTkpHY1NCUlkxQVY4Yk9jLzhOc1p5VE5GUUNacTZPOWZDbjVYZWZvK3FXNUtGOUF1MW9ZUGdNblhiM1RlQkRCeW1uL0trZ1MvelorV1ozMENiNVovZ3lqdEVtalhhalJWM3J5dVBmNUZmWGRZMCtHL1EveFJJbTd4aU5sU09WVGxXK2tsY3VRdzM4dzVPQnRNT1JkVnhEMGdZb3A2cjdkMks2bjJnZEtDYkFvSi81SEQrRHkxTjFtT3FaMnVtenppaytTa2RuN1htRVRIS0s2VDhOWkpQUEZJZzYxanJDYUozU1RQWHNiQVJhU3RmVHFOZ2RuYzV4YmxPeU83WGpKMW9DaW83UlhWbWNqLzdxK2k1OXptVGJQOFNYUEdoaW10cFBjdWllMHpuMWN1bC8zLytuZm9MVWRWYktUT2s1ZGEzNmgyZGQzYnIrVXhaSnA2ckF4QndUbFUvM3FESzY4dGZ5VS9pdXZqL0JFaGFmL3Y5NmQ0M0t4K2RPZGVGcmovanlHOUNlQVZNaVgzaXZHa1dLMGxOSGQzV2IydlM3TEdGcFR2UDV4Q2ZwcHVxU3NsWm5MNTBNUE52b0k1dVRnR2trL3c1TEJrY3l5TlM5N2pxODF0M0grVmhIVjhaazQ1dUJDZDN1bjVsT0ZVdk9IOW02Wi8wa3NFMGdVLzVOcjl2eGtldUg5QjdWRG1YdHUwNDh4cWwxOTBJY0s4Sk9TcDNtR3RqRkd1eDBsWTk1blA2VmxvTHNHVEIxOTNUbHJLWDdsLzNVWGFOOGVuald5YWhPbkpjNmxmK05ZTTBZcDJ0VlBkaDRWdm9yWjZPT0NZNEFDOC9kNy9kdEFENHo0RlZmZDIxZGF3RGFOTnFaRVhaSDZKRlJxb0NsbkhLLzN6Ly8reThiZ2d2M2RlNU1ZeDhtQTdMelMvMURzalA5dXl1N3FoMlRqWXpHRHVtY3c5ZGhHZWtvU29EVXNSei9JOVdkbjhWVWEzQkhnTmVOOEFSbzFmRzhWMXV4V1NLUnFyd3BISm5TWFp2UkxOQmNJYTdBRGtoOG5JNHlCbHdCRFA5RGlMdG5yWC9paUNPL3dWb0FTMGVzOHdtbko2RHRySVVwSVBIRzErM0lMUHF3MGlrZzJiWml0RzRVVnY0RUl1V2MrLzMrQlZRTU1nUVdzaGtIcEJqWDhiOGlWUCtzNjZqaHZSMFFKNkJ4ZW1LY0JFZzdnL25JNXRvMzJSZWdLZUE0UjAzM0pTTlVBUXJCY3IvZnZ6RFh4R2hZQm9PdEFJYnNWbms3cHVUVk9Ud0IydVFqOUpYem9ic21BYU9UMTQ1TXVtUG5qeWhHNjV3MG5VczNCb2c2anlCelN5eFlSbDJMNE1MeVVSNTU5dWxBbUk3aUJHUlZId2N3bGE0Tll6TUcxUDErbDJWVVBnUHNDUHNwWDNTK2lXSTA1YVJkRUUwakZ4a09HUXRaalVHbVlyUzF2djk3YUN3UEFZV0Eyd0hiWkJQSTF0SUE2M3pHSUZOc3BVQ1hUQ2gyd05iaFFlR21iRnplbUFyWkhSRVlrekc0a0xsUVFqbEdXMnRKVnF0eTZ2ejByd1VSU0FwMDNPWU9kTjNvUm5DeFh4Tm1jM0haZEt3R01rOE0zSFU3ekpaWVBCbHdqS2J5SEZ0MTExeXYxeStUQWpVQndGOGVjdExKdjA1VTkvSE1zOERFekZtbWZtTXNjU3hlZzNWVS9sSytVNUxXVFFLbXZPNGF4NTQ3TEZmWFRQNlJRT05PVkU3aFN1RDVUaUlWQ0ZWY3hSdDJlUExiWGd3MFRIZkh0Yi9mNytPem5EbUpZUi95Y1FjMEZaUHh4akZZQ2tUWFp5Nk80d0drMnNmMkRXaWRROVMxQ2RvVlBUTjdGY2d3Sm1NZ29DdzZjMEQ3K1BpUS83NW1Bdkt2QkpwakZCV1RQUU95RHRCVG56cFc1bmF6UmRMcFJsL2lwTnJVV2huR1gwNHFFUWdUeXhTWTF0TC92ZTNqUS84UGNyeU95OThGbWdJWittN3lvL0xQTTB5bVpwb0toRzRXdXdPOHprYWdGWXRNaUovMG54MklNVmszMDNRQVVCMk1pN0wxck52dFppY0RIY2lPZ2kxaE0weXJEVmZ2RXlZck1ER29IQUJWL3JNc3g4QmprMERyYUxKem1KTElialRpekpNQndHQlRIWTdQUnBBVmMrSk1rZ0ZYNVhVZzQrZDFUT3J5SE5pVUQvbjFrSk04QmJJalc5SlhIZGhjK3hYZzRwZnF5a2tUOWF0R0tHZTVmd1piQUp3NkZjOHh5S3JzQWx6M2Y5NHJqWHRPNy9xTDk5TUFUUWVzWXkvSGJvbk1Pc21jV0cydC91ODExbW9tQThwQjdLajcvYjdlM3Q2K1ZXb2FpUVVpVEN1Z1ZVem1PclNBZEx2ZExNZ0tZQ3IrYy8vVitLekpRTGVmT3M4Tnp2SzdBazZsMzkvZll4bFZST0RpdWdsc25iWFNpZWxrcTIvQXBwSElrdm4rL2k1anA2NFRPYStlaSt6RklIT01XYzlULy9TTVRlVXA2ZUIwK1NMMXFXSzFia09Rc2JRaXk2VUFuTlNwQTV6cW8rMFBINVZEbE9aM0RxcjRDenY2L2YwOTZsUlZEMlF3QmJoa0t6RHdjN2tPdlBCYjl6aS9NYmlVRHllZzRRcCtCN1lDbVFQVURzZzYwRG1XNC9haWZmdDZ3emtvM2JpaXpHQ1l4d0UvSHJ2T2M4OHRZRlZheWVidXpGTUJyWk56VlZlM1Qvem81Tk1OWGhXbjNlLzNiMUxheFhHZHhEb0dVL2poWXhtamRRNXhEOFNLM202MzFpbklaanNkOS83Ky9vVzFGTkFlajY5dkd0eEU0eFdUQWVmb1hWWnpJRk5nNnlZRkNaQzZtU3YzZHlxYjdJZTFOci9lY0xTT2NabHpCcS84cTdqTXlhanFIQVJiZ1FvQlYyQkdvTzNPT00rTTBWUWI4TmpKVVFlMERrZzhNV0JBWVN3M0FTNWhOZ2V3TWpzWllLZDBveTZsZDJZekZaZVYxYm1PQllxeDFLdXNBbFU5UzIzZHYzOW1RQ1dzcGdDbS9MbFcvcG5Ram04WllBZ2czUEJjVXBaajEybERpOTUxcGs1UkRJWjVhdGxpaXNtUXVSU0w4WVpnUzVoTU1kdGErdXVOeE5EQmo4ZlhuNGhJQnZEa1crNzRTVGFaelpEaDFQbEVRa3ZKTUgreStBdmJqdFhTa1ZZVGdPbzhCTjNiMjV0OUxnTE1zVmlCcWVKREJKbGlOYXlEU2gvOWVtT1NUVzZiOG5IWHFSTzdNV2dZWkFwYzNUSklQWXZaelRHY0E5N1dLeWdsbXhPd2tNMHdMbE9UZ1BvN1RBWlhBY3d4bXBOS0JsMEt0RHBXNmNuT0FCcUNTM1dvOHIrYVNXS2Vra3ZGWnErSzB5eWpxY0ljblRxNVJKQWgyRndIc2VPWnlRcFF0OXZ0Mjh4U1NTYURUTDBKU0NjQ1o4ZG8zREdLRmRReCt6OTUxZFRKcFFPZ1NxczZKQ0JiYTVnTXNFT1MyQUczWWpBRTI5UkpIeDhmWDE1cklaTWhtQ29mMlV3dFpYVGZvRldlZXlQZ3dGWDV6ckVkcTZHMGRLd3dBUzNkMUNJdXI2OHg4Nm4xT01Wb0REWnNFMXU3WUx2YjJFNHVKNUFWbVBDOUpRT09XYXllaDE5bVRPdG1SNWMyem1JMDlxM3l0Zk03QitBdWhIRnl5RXltWnFRN0VxckE1dGpOTHRnK3cyU3BYQ0xJOE5rc21TV1Z5RnlZTHNBaDJCemdGTURPQUJtRHlxVTdnRldlazFFVnNuQjZrc0FPWk14d0NyVHFtVTlMNXdReUZaZnR5aVUraTcvRVlCWXI1bUtwN0JabHArV05TcXQ5MmF1QmhtbkZFQW5ZcGppdG0ya21Nb3JsZElNaGtrN2xrQjBtZXp5K2ZvMlJ5R1dsVVNyVitwaVN5Z2xnazJ5bXNkblpRSHM4dnY3Wm5mSjNBclprMmNPdHJibFl6VW5wSktFVHE0M0xHOXd3L3U2ZjQ3THFtRFFtUTJBcHFWUnlXV3lKYTJlN0lGUHBPc1k5V2djNGRyQURHZTlUb0NsQUpRVFFTZWtrb3lxdVUrekdkVlBXeG1oZHJGRHN4WEZaS3BjSU5wYk1ra3JlbkZ6aXN5ZDJLOEIwTE9iU3FUMHJuMGtmS0pCeFdOTUJiM3BGbGJBYVA3dGp0bkhXeVExRkJpdWdwVkxKVFBaNFBPU2FtQUpZWGFmQWxNam1Xa3V1bzFXNkxBRVo1cnNSbkRKYTdkSFA2QzhIT3NWcUJRckhjRWRrVk1WckRMNVRwVk5WT3AxWlBoNlB6MWRNeFZyTVhpeVhMSms0czFTelNnVzJBc1dSU1FDKzZ5emJrYzVxTjU5L1ZqNWR2K3pLNkU2c3hsL3Q0bDdWUS9raW5nd3dMUmViUFJ1UHFmV3hSQzY3L0FSczNaN1RhSnlmTUJyN1ZmbVpmVDcxUWNkc0RENGxmNWpIYkhWRVJybE9iSjlBKy9qNCtzTW1uVlJXWGdld0trY3R4TmFLUHM0ZUZiaWVuVjFPVXRrQlRSM3ZXQktub2E4NTdlS2VUazRuUmxQQVUwc2VMSmNxMzdFcHQ2OXNTenFSeGZqRFJWV0crdXNrZmkvWkxjVFdGN1VWb3prZ09mYmFBUmxLcFdwUEFqbzFrakd2cEhSaXQxMHBkZktwemprSjVMeGtOcXJBNXZ4Z2YvRlJqUXdFR3NkbFBHcFJLdFVpTEsrTE9abXNQUUxiU1dZQm9nUFo3Z1RnQ0tzNTJjVDBycFE2Rmt2WXJaTlFCVDQzSTJXUXFYak5NWG43S1RlRHJZdkgwRG51SmJpTHdURFFuOTViSml5R0xQVnNYUFlxb0xIUGFzL1NpZmxIcEZReG1wUFhEa2pxelFIZU0wMEl4blUwak11Y1ZINTgvUFBGeGZRS3lja2t5dVV6Y1ZtQkl3WFl4R0JxOXRsWnlRZjdwMHVuY2R1dWpEcmdPUmwxMHRwOU1Na0FjemJHYUZWSVozV3RrMGlXU21hMG84RHFndjFubU95WlNRRDd4UjJuektiU0dBc2wwdXBZTGdHZVlqa0hPSHdtbTF5d3ZWeSsvamFzZTdYRUFFTzVUTmlyMjZlc2xRTE5CZnVUZEhiNWJHNUVKNEI3MVVRQis1Q0IxOG1vbXlRNEtlWG5zWTFmYjVRRDBOa0tZTXhVSmJ2dWk0c09WQVVLZDAyZGM4elZzZFpSSmt2QTFrbkh4R2FZM3BGVWRmek1aR0VDbm1JMExsdjVvdjJSbDJJblpEVnMxT1B4aUZiMEdXZzdNVmZDWUFqTWJ0K2x1N3hucldNMFBwN0FwaVlKbU40QkgwdW55bE9UQmNWNENteG80eDhRVndIVkFXcWt1RStxazlkRUtuK3QvTlhSRWZZNm04bWM3NUp6ejdCYjdWTjUzV1U2WmpzR0dVdHkxKzdMV2t1ZXhjNVNjdWZpcnlOQmZUMm5BOVlaclBWcWdMRTV4ei9EY0p5SFRNZDVFL0Ftd0hYc3BxN3YybXlCdHRaMzV1aFlxQVBWR1hIV3E0Q1ZBQ3BkNHBobTUyV3FNMTdCZExVL3duaGRQS2Z1Y2UwcWE0RzJsdS84Q1RnVFF6RmdmaFZqdlpyRmxIVWQ0TTRmQlo3SzI0M3ZlS3RyM0xKSzBzWVJhSjhYYnNSSFNkeDBOS2Fhd09UQWNpWno3VnJDZEtuTXFyeGQ5cXQwS3NzVFN5WVdBMjJ0bVNIT1pwU2pVcGVVZldZWnFiTW5PMXJPVHN3MzVhY2c3c3BWdGdVMFc4aUxKT2RWNWU3YVRqM09BdDJ6ZG5ZOW5pM3ZGS0Q5dGI4MjJXdUNrci8yMThqK0J6Y3ROY04weC84TUFBQUFBRWxGVGtTdVFtQ0MiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLC0xLDAsMSkiIGhlaWdodD0iMSIvPjwvZz48L2c+PC9nPjwvbWFzaz48Y2xpcFBhdGggaWQ9ImNsaXBQYXRoOTYiPjxwYXRoIGQ9Ik0wLDE1MCwxNTAsMTUwLDE1MCwwLDAsMCwwLDE1MHoiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcFBhdGgxNDYiPjxwYXRoIGQ9Im0wLDEzMCwxNTAsMCwwLTItMTUwLDAsMCwyeiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjbGlwUGF0aDE2MCI+PHBhdGggZD0ibTAsMTUwLDE1MCwwLDAtMjItMTUwLDAsMCwyMnoiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcFBhdGgxNjQiPjxwYXRoIGQ9Im0xNDAsMTUwLTIzLDAtMzcsMC0zOCwwLTIyLDBjLTE2LDAtMjMtMTAtMjMtMTB2LTdoMzcsMzgsMzcsMzh2N2MwLDguMy02LjcsMTUtMTUsMTUiLz48L2NsaXBQYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyR3JhZGllbnQxNzIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAsLTI4LjY4NDQ3OSwtMjguNjg0NDc5LDAsNzQuOTk5NTEyLDEzNy42NjY1KSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBvZmZzZXQ9IjAuOTkiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxtYXNrIGlkPSJtYXNrMTgwIj48cGF0aCBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50MTcyKSIgZD0ibS0zMzAwMCwzMzAwMCw2NjAwMCwwLDAtNjYwMDAtNjYwMDAsMCwwLDY2MDAweiIvPjwvbWFzaz48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhckdyYWRpZW50MTkyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLC0yOC42ODQ0NzksLTI4LjY4NDQ3OSwwLDc0Ljk5OTUxMiwxMzcuNjY2NSkiPjxzdG9wIHN0b3AtY29sb3I9IiMwMDAiIG9mZnNldD0iMCIvPjxzdG9wIHN0b3AtY29sb3I9IiMwMDAiIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoIGlkPSJjbGlwUGF0aDIyMCI+PHBhdGggZD0ibTAsMTUwLDE1MCwwLDAtMjItMTUwLDAsMCwyMnoiLz48L2NsaXBQYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyR3JhZGllbnQyMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAsLTIzLjM5MzAzNiwtMjMuMzkzMDM2LDAsNzQuOTk5NTEyLDE1MC4zMzM1KSI+PHN0b3Agc3RvcC1jb2xvcj0iI2Y5ZjlmOSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzAwMCIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggaWQ9ImNsaXBQYXRoMjUyIj48cGF0aCBkPSJtMCwxNTAsMTUwLDAsMC0xNi0xNTAsMCwwLDE2eiIvPjwvY2xpcFBhdGg+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXJHcmFkaWVudDI4MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMCwtMzYuMjA2MDU1LC0zNi4yMDYwNTUsMCwxMDYsMTAzLjk1MjY0KSI+PHN0b3Agc3RvcC1jb2xvcj0iI2Y5ZjlmOSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2QxZDFkMyIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggaWQ9ImNsaXBQYXRoMjkyIj48cGF0aCBkPSJNMCwxNTAsMTUwLDE1MCwxNTAsMCwwLDAsMCwxNTB6Ii8+PC9jbGlwUGF0aD48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhckdyYWRpZW50MzEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLC04Mi4zMDQyMywtODIuMzA0MjMsMCw1NS4yOTYzODcsMTA0LjM3NTk4KSI+PHN0b3Agc3RvcC1jb2xvcj0iI2Y5ZjlmOSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2QxZDFkMyIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yNSwwLDAsLTEuMjUsMCwxODcuNSkiPjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwUGF0aDE2KSI+PGcgbWFzaz0idXJsKCNtYXNrMzIpIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGg1NCkiPjxwYXRoIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQ2MikiIGQ9Ik0xNTAsMTVjMC04LjMtMTAtMTUtMTAtMTVoLTEyMGMtOC4zLDAtMTUsNi43LTE1LDE1djEyMGMwLDguMyw2LjcsMTUsMTUsMTVoMTIwYzguMywwLDE1LTYuNywxNS0xNXYtMTIweiIvPjxnIG1hc2s9InVybCgjbWFzazc2KSI+PGcgb3BhY2l0eT0iMC4zOTk5OTQwMiIgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoOTYpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTAsMTUpIj48cGF0aCBmaWxsLXJ1bGU9Im5vbnplcm8iIGZpbGw9IiMyZDJkMmQiIGQ9Im0wLDBjMC04LjMtNi43LTE1LTE1LTE1aC0xMjBjLTguMywwLTE1LDYuNy0xNSwxNXYxMjBjMCw4LjMsNi43LDE1LDE1LDE1aDEyMGM4LjMsMCwxNS02LjcsMTUtMTVsNS0xMjB6Ii8+PC9nPjwvZz48L2c+PC9nPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzUsMTUwKSI+PHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjZWZiMzAyIiBkPSJtMCwwLTIzLDAsMC0yMiwzOCwwLDAsN2MwLDguMy02LjcsMTUtMTUsMTUiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjMDA5YTE5IiBkPSJtNzUsMTMwLDM3LDAsMCwyMi0zNywwLDAtMjJ6Ii8+PHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjMmU2NWVjIiBkPSJtMzcsMTMwLDM4LDAsMCwyMi0zOCwwLDAtMjJ6Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzcsMTUwKSI+PHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjZDcwNTAxIiBkPSJtMCwwLTIyLDBjLTguMywwLTE1LTYuNy0xNS0xNXYtN2gzN3YyMnoiLz48L2c+PGcgb3BhY2l0eT0iMC41IiBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGgxNDYpIj48cGF0aCBmaWxsLXJ1bGU9Im5vbnplcm8iIGZpbGw9IiMxYTE4MTgiIGQ9Im0xNTAsMTMwLTE1MCwwLDAsMiwxNTAsMCwwLTJ6Ii8+PC9nPjxnIG9wYWNpdHk9IjAuMTAwMDA1OTgiIGNsaXAtcGF0aD0idXJsKCNjbGlwUGF0aDE2MCkiPjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwUGF0aDE2NCkiPjxnIG1hc2s9InVybCgjbWFzazE4MCkiPjxwYXRoIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQxOTIpIiBkPSJtMTQwLDE1MC0yMywwLTM3LDAtMzgsMC0yMiwwYy0xNiwwLTIzLTEwLTIzLTEwdi03aDM3LDM4LDM3LDM4djdjMCw4LjMtNi43LDE1LTE1LDE1Ii8+PC9nPjwvZz48L2c+PGcgb3BhY2l0eT0iMC4yNSIgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoMjIwKSI+PHBhdGggZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudDIyOCkiIGQ9Im0xNDAsMTUwLTIzLDAtMzcsMC0zOCwwLTIyLDBjLTE2LDAtMjMtMTAtMjMtMTB2LTdoMzcsMzgsMzcsMzh2N2MwLDguMy02LjcsMTUtMTUsMTUiLz48L2c+PGcgb3BhY2l0eT0iMC4xNDk5OTQwMiIgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoMjUyKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM1LDE1MCkiPjxwYXRoIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iI0ZGRiIgZD0ibTAsMC0yMywwLTM3LDAtMzgsMC0yMiwwYy04LjMsMC0xNS02LjctMTUtMTV2LTFjMCw4LjMsNi43LDE1LDE1LDE1aDIyLDM4LDM3LDIzYzguMywwLDE1LTYuNywxNS0xNXYxYzAsOC4zLTYuNywxNS0xNSwxNSIvPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI0LDg3KSI+PHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjMDAwIiBkPSJtMCwwLTE2LDAsMCwxNi00LDAsMC0xNi0xNiwwLDAtNCwxNiwwLDAtMTYsNCwwLDAsMTYsMTYsMCwwLDR6Ii8+PC9nPjwvZz48cGF0aCBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50MjgwKSIgZD0ibTEwMCwxMDAsMC0xNi0xNiwwLDAtNCwxNiwwLDAtMTYsNCwwLDAsMTYsMTYsMCwwLDQtMTYsMCwwLDE2LTQsMHoiLz48ZyBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGgyOTIpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NC43NjYxLDI3LjEwNDUpIj48cGF0aCBmaWxsLXJ1bGU9Im5vbnplcm8iIGZpbGw9IiMwMDAiIGQ9Im0wLDBjLTkuNSwwLTE2LDYtMTYsMTMsMCw3LjEsOC41LDEzLDE4LDEzLDIuMi0wLjAyMyw0LjMtMC4zOCw2LjItMC45OSw1LjItMy42LDguOC01LjYsOS45LTkuNywwLjItMC44MywwLjMtMS43LDAuMy0yLjYsMC02LjQtNS0xMi0xOC0xMm0yLjUsNDJjLTYuNCwwLjE5LTEyLDcuMS0xNCwxNS0xLjEsOC40LDMuMiwxNSw5LjUsMTUsNy40LDAsMTQtNywxNC0xNSwxLTgtMy4xLTE1LTkuNS0xNW0xNC0xMmMtMi4yLDEuNi02LjUsNS40LTYuNSw3LjcsMCwyLjYsMC43Niw0LDQuNyw3LjEsNC4xLDMuMiw3LDcuNyw3LDEzLDAsNi4yLTIuOCwxMi04LDE0aDcuOGw1LjUsNGgtMjVjLTExLDAtMjItOC40LTIyLTE4LDAtOS45LDcuNi0xOCwxOS0xOCwwLjc4LDAsMS41LDAuMDE1LDIuMywwLjA2OS0wLjczLTEuNC0xLjMtMy0xLjMtNC42LDAtMi44LDEuNS01LDMuNC02LjgtMS40LDAtMi44LTAuMDQxLTQuMy0wLjA0MS0xNCwwLTI0LTguNy0yNC0xOCwwLTguOSwxMi0xNSwyNS0xNSwxNiwwLDI0LDguOSwyNCwxOCwwLDcuMi0yLjEsMTEtOC42LDE2Ii8+PC9nPjwvZz48cGF0aCBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50MzEyKSIgZD0iTTU2LDEwMGMtMTEsMC0yMS00LTIxLTE0LDAtOS45LDcuNi0xOCwxOS0xOCwwLjc4LDAsMS41LDAuMDE1LDIuMywwLjA2OS0xLTEtMS0zLTEtNSwwLTIuOCwxLjUtNSwzLjQtNi44LTEuNCwwLTIuOC0wLjA0LTQuMy0wLjA0LTE0LDAtMjQtOC43LTI0LTE4LDAtOC45LDEyLTE1LDI1LTE1LDE2LDAsMjQsOC45LDI0LDE4LDAsNy4yLTIuMSwxMS04LjYsMTYtMi4yLDEuNi02LjUsNS40LTYuNSw3LjcsMCwyLjYsMC43Niw0LDQuNyw3LjEsNC4xLDMuMiw3LDcuNyw3LDEzLDAsNi4yLTIuOCwxMi04LDE0aDcuOGw1LjUsNGgtMjV6bTEtMzBjLTYsMS0xMiw4LTEzLDE2LTEuMSw4LjQsMy4yLDE1LDkuNSwxNSw2LjQtMC4xOSwxMi02LjksMTQtMTUsMC04LTQtMTUtMTAtMTUtMC4wODksMC0wLjE4LDAuMDAxLTAuMjcsMC4wMDRtLTE5LTI5YzAsNy4xLDguNSwxMywxOCwxMywyLjItMC4wMjMsNC4zLTAuMzgsNi4yLTAuOTksNS4yLTMuNiw4LjgtNS42LDkuOS05LjcsMC4yLTAuODMsMC4zLTEuNywwLjMtMi41LDAtNy4yLTQuNy0xMy0xOC0xMy05LjUsMC0xNiw2LTE2LDEzIi8+PC9nPjwvc3ZnPgo=');
}catch(e){};

// Insert new CSS into html Header, not visible
myNode = document.createElement('style');
myNode.innerHTML = '@import url(http://fonts.googleapis.com/css?family=Ubuntu); *{font-family:ubuntu;} ' +
  'h1, h2, h3, h4 { text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15); /* IE */ filter: progid:DXImageTransform.Microsoft.Glow(Color=#000000,Strength=1); -ms-filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=-1, OffY=-1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=-1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=1, OffY=-1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=1, OffY=0, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=1, OffY=1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=-1, OffY=1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=-1, OffY=0, Color=#000000)"; } ' +
  '@-webkit-keyframes particle-size { from { background-size: 6px 6px, 12px 12px; } to { background-size: 12px 12px, 24px 24px; } } @-moz-keyframes particle-size { from { background-size: 6px 6px, 12px 12px; } to { background-size: 12px 12px, 24px 24px; } } @-o-keyframes particle-size { from { background-size: 6px 6px, 12px 12px; } to { background-size: 12px 12px, 24px 24px; } } @keyframes particle-size { from { background-size: 6px 6px, 12px 12px; } to { background-size: 12px 12px, 24px 24px; } } @-webkit-keyframes particle-positon { from { background-position: 60px, 60px; } to { background-position: 140px, 140px; } } @-moz-keyframes particle-positon { from { background-position: 60px, 60px; } to { background-position: 140px, 140px; } } @-o-keyframes particle-positon { from { background-position: 60px, 60px; } to { background-position: 140px, 140px; } } @keyframes particle-positon { from { background-position: 60px, 60px; } to { background-position: 140px, 140px; } } ' +
  'body, #content{background-color:transparent;background:-webkit-radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px;-webkit-background-size: 50px 50px;background:-moz-radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px;-moz-background-size: 50px 50px;background:-o-radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px;-o-background-size: 50px 50px;background:-ktml-radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px;-khtml-background-size: 50px 50px;background:-ms-radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px;-ms-background-size: 50px 50px;background-size: 50px 50px;    -webkit-animation: particle-positon 5s linear infinite alternate; -moz-animation: particle-positon 5s linear infinite alternate; -o-animation: particle-positon 5s linear infinite alternate; -khtml-animation: particle-positon 5s linear infinite alternate; } ';
document.getElementsByTagName("head")[0].appendChild(myNode);

// Central DIV container inside #content
try {
    eles = document.getElementById('k-B-fa-nb k-fa k-B-fa-wf-mf');
    eles.style.width = '100%';
}catch(e){};

// Right Panel fix
try {
    eles = document.getElementById('k-Qf-IH-nb k-IH-nb c-wa-Da');
    eles.style.width = '100px';
}catch(e){};

// Chat iFrame fix 1
try {
    eles = document.getElementById('shiv_gtn051851347694173460');
    eles.style.background = 'transparent';
}catch(e){};

// Chat iFrame fix 2
try {
    eles = document.getElementById('gtn051851347694173460_m');
    eles.style.background = 'transparent';
}catch(e){};


// Try to remove Junks

// Games Button on Top Bar
try {
    elements = new Array();
    elements = document.getElementsByClassName('c-C k-Qf-C-RySO6d Pb c-wa-Da xgINEf sH');
    for(i in elements ){
         elements[i].style.display = "none";
    }
}catch(e){};

// Games AD on Right Bar, usually Games Icons
try {
    elements = new Array();
    elements = document.getElementsByClassName('o1uJLe');
    for(i in elements ){ elements[i].style.display = "none"; }
}catch(e){};

// Games AD on Right Bar, usually Games Icons
try {
    elements = new Array();
    elements = document.getElementsByClassName('Om8HKf');
    for(i in elements ){
         elements[i].style.display = "none";
    }
}catch(e){};

// Whats Hot Side Bar Link on Left panel
try {
    elements = new Array();
    elements = document.getElementsByClassName('c-C k-Qf-C-RySO6d Ku qQWXrb g2Lc3b dfrbjb');
    for(i in elements ){
         elements[i].style.display = "none";
    }
}catch(e){};

// Stream Title, usually " Stream "
try {
    elements = new Array();
   elements = document.getElementsByClassName('cH twXV2b');
    for(i in elements ){
       elements[i].style.display = "none";
    }
}catch(e){};

// Hangout Description on right Panel, usually " have fun with your circles "
try {
    elements = new Array();
    elements = document.getElementsByClassName('k-ldzwdb-Kqlefe-E');
    for(i in elements ){
        elements[i].style.display = "none";
    }
}catch(e){};

// Div containing tiny-thubnails of photos of celebritys on hte Right Panel
try {
    elements = new Array();
    elements = document.getElementsByClassName('ToduEe cFQJ1');
    for(i in elements ){
        elements[i].style.display = "none";
    }
}catch(e){};



// Footer crap at the bottom
try {
    elements = new Array();
    elements = document.getElementsByClassName('k-vc-nb k-Qf-vc-nb');
    for(i in elements ){
        elements[i].style.display = "none";
    }
}catch(e){};

// Send Feedback Button, externo
try {
    elements = new Array();
    elements = document.getElementsByClassName('k-Dj-zj');
    for(i in elements ){
        elements[i].style.background = "transparent";
    }
}catch(e){};

// Send Feedback Button, interno
try {
    elements = new Array();
    elements = document.getElementsByClassName('c-wa-Da b-a b-a-G k-Dj-zj-a');
    for(i in elements ){
        elements[i].style.background = "transparent";
    }
}catch(e){};



// Try to add the IMAGE Zoom Pop Up !
//
// TO DO
//
//


// Extra Awesome Sidebar with Transparent Buttons
zNode = document.createElement('div');
zNode.setAttribute('id', 'myContainer');
zNode.innerHTML = '<style>.customz{position:absolute;right:0;background:transparent;border:1px solid grey;z-index:99;cursor:pointer;color:grey;font:normal 10px ubuntu condensed;text-align:justify;width:75px;}</style><button id="myButton" type="button" title="One-Click Quick Sign Out" style="top:100px;" class="customz">SIGN OUT!</button><button id="myButton2" type="button" title="Invert all Colors for better reading" style="top:150px;" class="customz">Invert all Colors</button><button id="myButton3" type="button" title="Kill CSS, kill all Styles, Printer friendly" style="top:200px;" class="customz">Kill all Styles</button><button id="myButton4" type="button" title="Quick Hide All Images, ideal for NSFW images" style="top:250px;" class="customz">Hide all Images</button><button id="myButton5" type="button" title="Full Screen" style="top:300px;" class="customz">Full Screen</button><button id="myButton6" type="button" title="Hide Right Panel" style="top:350px;" class="customz">Hide Right Panel</button><button id="myButton7" type="button" title="Hide Left Panel" style="top:400px;" class="customz">Hide Left Panel</button><button id="myButton8" type="button" title="Full-Wide Stream" style="top:450px;" class="customz">Full-Wide Stream</button><button id="myButton9" type="button" title="Hide Top Bars and Title" style="top:500px;" class="customz">Hide Top Bar</button><button id="myButton10" type="button" title="+1 ALL Current Posts" style="top:550px;" class="customz">+1 Current Posts</button>';
document.getElementById("content").appendChild(zNode);
document.getElementById ("myButton").addEventListener ("click", ButtonClickAction, false);
document.getElementById ("myButton2").addEventListener ("click", ButtonClickAction2, false);
document.getElementById ("myButton3").addEventListener ("click", ButtonClickAction3, false);
document.getElementById ("myButton4").addEventListener ("click", ButtonClickAction4, false);
document.getElementById ("myButton5").addEventListener ("click", ButtonClickAction5, false);
document.getElementById ("myButton6").addEventListener ("click", ButtonClickAction6, false);
document.getElementById ("myButton7").addEventListener ("click", ButtonClickAction7, false);
document.getElementById ("myButton8").addEventListener ("click", ButtonClickAction8, false);
document.getElementById ("myButton9").addEventListener ("click", ButtonClickAction9, false);
document.getElementById ("myButton10").addEventListener ("click", ButtonClickAction10, false);

function ButtonClickAction (zEvent) {
    window.location = 'https://accounts.google.com/Logout?service=profiles&continue=https://plus.google.com';
};

function ButtonClickAction2(){(function(){function RGBtoHSL(RGBColor){with(Math){
       var R,G,B;
       var cMax,cMin;
       var sum,diff;
       var Rdelta,Gdelta,Bdelta;
       var H,L,S;
       R=RGBColor[0];
       G=RGBColor[1];
       B=RGBColor[2];
       cMax=max(max(R,G),B);
       cMin=min(min(R,G),B);
       sum=cMax+cMin;
       diff=cMax-cMin;
       L=sum/2;
       if(cMax==cMin)
       {
         S=0;H=0;
       }
       else
       {
         if(L<=(1/2))
           S=diff/sum;
         else 
           S=diff/(2-sum);
         Rdelta=R/6/diff;
         Gdelta=G/6/diff;
         Bdelta=B/6/diff;
         if(R==cMax)
           H=Gdelta-Bdelta;
         else 
           if(G==cMax)H=(1/3)+Bdelta-Rdelta;
         else H=(2/3)+Rdelta-Gdelta;
         if(H<0)H+=1;
         if(H>1)H-=1;
       }return[H,S,L];
     }
   }
   function getRGBColor(node,prop){
     var rgb=getComputedStyle(node,null).getPropertyValue(prop);
     var r,g,b;
     if(/rgb\((\d+),\s(\d+),\s(\d+)\)/.exec(rgb))
     {
       r=parseInt(RegExp.$1,10);
       g=parseInt(RegExp.$2,10);
       b=parseInt(RegExp.$3,10);
       return[r/255,g/255,b/255];
     }
     return rgb;
   }
   function hslToCSS(hsl){
     return "hsl("+Math.round(hsl[0]*360)+", "+Math.round(hsl[1]*100)+"%, "+Math.round(hsl[2]*100)+"%)";
   }
   var props=["color","background-color","border-left-color","border-right-color","border-top-color","border-bottom-color"];
   var props2=["color","backgroundColor","borderLeftColor","borderRightColor","borderTopColor","borderBottomColor"];
   if(typeof getRGBColor(document.documentElement,"background-color")=="string")document.documentElement.style.backgroundColor="white";
   revl(document.documentElement);
   function revl(n){
     var i,x,color,hsl;
     if(n.nodeType==Node.ELEMENT_NODE)
     {
       for(i=0;x=n.childNodes[i];++i)
         revl(x);
       for(i=0;x=props[i];++i)
       {
         color=getRGBColor(n,x);
         if(typeof(color)!="string")
         {
           hsl=RGBtoHSL(color);
           hsl[2]=1-hsl[2];
           n.style[props2[i]]=hslToCSS(hsl);
         }
       }
     }
   }
})()};

function ButtonClickAction3(){
    for(i=0;i<document.styleSheets.length;i++)(document.styleSheets.item(i).disabled=true);el=document.getElementsByTagName('*');for(i=0;i<el.length;i++)(el[i].style.cssText='');
};

function ButtonClickAction4 () {
    try {
    elements = new Array();
    elements = document.getElementsByTagName('img');
    for(i in elements ){
        elements[i].style.display = "none";
    }
}catch(e){};
};

function ButtonClickAction5(){
    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    document.documentElement.mozRequestFullScreen();
    document.documentElement.requestFullScreen();
};

function ButtonClickAction6(){
    elements = new Array();
    elements = document.getElementsByClassName('k-Qf-IH-nb k-IH-nb c-wa-Da');
    for(i in elements ){
         elements[i].style.display = "none";
    }
};

function ButtonClickAction7(){
    elements = new Array();
    elements = document.getElementsByClassName('k-B-TB-nb c-wa-Da k-Qf-B-TB-nb');
    for(i in elements ){
         elements[i].style.display = "none";
    }
};

function ButtonClickAction8(){
    barr = document.getElementById("contentPane");
    barr.style.width = "75%";
//    el = new Array();
//    el = document.getElementsByClassName('k-B-TB-nb c-wa-Da k-Qf-B-TB-nb');
//    for(i in el ){
//         el[i].style.display = "none";
//    }
//    eee = new Array();
//    eee = document.getElementsByClassName('k-Qf-IH-nb k-IH-nb c-wa-Da');
//    for(i in eee ){
//         eee[i].style.display = "none";
//    }
    elements = new Array();
    elements = document.getElementsByClassName('k-B-fa-nb k-fa k-B-fa-wf-mf');
    for(i in elements ){
         elements[i].style.width = "100%";
    }
    element = new Array();
    element = document.getElementsByClassName('k-B-yd-nb k-B-yd-nb-NH-wf');
    for(i in element ){
         element[i].style.width = "100%";
    }
    eleme = new Array();
    eleme = document.getElementsByClassName('k-B-yd tNsA5e-yd');
    for(i in eleme ){
         eleme[i].style.width = "100%";
    }
    ele = new Array();
    ele = document.getElementsByClassName('Cw4PGf SG');
    for(i in ele ){
         ele[i].style.width = "100%";
    }
};

function ButtonClickAction9(){
    document.title = '';
    elements = new Array();
    elements = document.getElementsByClassName('k-YB-nb k-Qf-YB-nb k-YB-nb-sUUURc');
    for(i in elements ){
         elements[i].style.display = "none";
    }
};

try{
    ba = document.getElementById("gbq");
    ba.style.heigth = "30px";
}catch(e){};

// The Big Ol'non-Spammy-Semi-Auto-Clicker for +1 buttons
function ButtonClickAction10(){
    aryClassElemeng = new Array();
    aryClassElemeng = document.getElementsByClassName( "esw eswd BRowJd Jt" );
    if( aryClassElemeng.length > 0 ) {
        alert('Please dont Spamm! || Por favor no Spamm!');
        for ( i = 0; i < aryClassElemeng.length; i++ ) { aryClassElemeng[i].click(); }
    }
}
// Full-Auto mode, disabled to avoid Notification Spamming
// window.addEventListener("load", doSomething, true);
// rnd = Math.floor(Math.random() * 101) + "000";
// console.log('GOOGLE PLUS +1 AUTOCLICKER: ' + rnd + ' seconds.');
// setInterval(doSomething, rnd);




//