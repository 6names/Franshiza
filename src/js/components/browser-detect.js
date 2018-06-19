function browsers() {
    var pageHtml = document.querySelector('html');
    
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    iOS && pageHtml.classList.add('ios');
    
    var browserDetect = {
        matchGroups: [
            [
                {uaString: 'win', className: 'win'},
                {uaString: 'mac', className: 'mac'},
                {uaString: 'android', className: 'android'},
                {uaString: 'linux', className: 'linux'}
            ],
            [
                {uaString: 'msie', className: 'trident'},
                {uaString: 'applewebkit', className: 'webkit'},
                {uaString: 'gecko', className: 'gecko'},
                {uaString: 'opera', className: 'presto'}
            ],
            [
                {uaString: 'msie 10.0', className: 'ie10'},
                {uaString: 'firefox', className: 'firefox'},
                {uaString: 'opera', className: 'opera'},
                {uaString: 'chrome', className: 'chrome'},
                {uaString: 'safari', className: 'safari'},
                {uaString: 'unknown', className: 'unknown'}
            ]
        ],
        
        init: function () {
            
            return {
                det: this.detect(),
                ts: this
            }
        },
        addClass: function (a) {
            this.pageHolder = {
                doc: document.documentElement,
                cl: document.documentElement.className += ' ' + a
            }
        },
        detect: function () {
            var a, s = 0;
            for (; s < this.matchGroups.length; s++) {
                a = this.matchGroups[s];
                var e, i = 0;
                for (; i < a.length; i++) {
                    
                    if (e = a[i] || 'string' === typeof e.uaString) {
                        if (this.uaMatch(e.uaString)) {
                            this.addClass(e.className);
                            break
                        }
                    } else {
                        for (var t = 0, r = !0; t < e.uaString.length; t++) if (!this.uaMatch(e.uaString[t])) {
                            r = !1;
                            break
                        }
                        if (r) {
                            this.addClass(e.className);
                            break
                        }
                    }
                }
            }
        },
        uaMatch: function (a) {
            
            return this.ua || (this.ua = navigator.userAgent.toLowerCase()), -1 !== this.ua.indexOf(a)
        }
    };
    browserDetect.init();
    
    
    // pixel ratio
    var retina = window.devicePixelRatio > 1 ? 'retina' : 'no-retina';
    pageHtml.classList.add(retina);
    
    if (pageHtml.classList.contains('ios') || pageHtml.classList.contains('android')) {
        pageHtml.classList.add('mobile');
    } else {
        pageHtml.classList.add('desktop');
    }
}