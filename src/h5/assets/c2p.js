var CoreApi = {
    ajaxObjs: {},
    ajaxAbort: function () {
        $.each(c2p.ajaxObjs, function (key, xhr) {
            xhr && xhr.abort();
        });

        c2p.ajaxObjs = {};
    },
    // 统一Ajax入口
    doAjax: function (options) {
        if (!options || !options.api) return false;

        var opts = $.extend({
                type: 'POST',
                dataType: 'json',
                show404: false, // 是否页面变成404
                showLoading: false, // 是否显示loading
                showTips: false, // 是否显示操作返回提示
                params: {}, // ajax 参数
                tipOpts: {
                    doneMsg: "", // 成功返回提示
                    doneBack: function () {
                    }, // 成功提示回调
                    failMsg: "", // 失败返回提示
                    failBack: function () {
                    } // 失败提示回调
                },
                done: function () {
                }, // 成功回调
                fail: function () {
                }, // 失败回调
                error: function () {
                } // ajax失败回调
            }, options),
            timeStamp = +new Date();

        if (opts.showLoading) {
            // todo show loading
        }

        if (opts.dataType == 'jsonp') {
            if (opts.type == "POST") {
                return console.error('jsonp type should be GET not POST')
            }
            if (!!opts.jsonpCallback) {
                // return console.warn('no jsonpcallback')
            }

        }

        c2p.ajaxObjs[timeStamp] = $.ajax({
            url: opts.api,
            type: opts.type,
            cache: false,
            dataType: opts.dataType,
            data: opts.params,
            complete: function () {
                delete(c2p.ajaxObjs[timeStamp]);

                if (opts.showLoading) {
                    // todo hide loading
                }
            },
            success: function (json, status, xhr) {
                if (!json || !$.isPlainObject(json)) {
                    json = {
                        code: '404'
                    }
                }
                ;

                // 统一失败回调
                var fail = function () {
                    opts.fail(json);
                };

                if (json.code == '100000') {
                    opts.done(json);

                    setTimeout(function () {
                        typeof(layzr) !== "undefined" && layzr.update().check();
                    }, 100);
                } else if (json.code == '100002') {
                    window.location.href = json.data.url;
                } else {
                    if (json.msg == "") {
                        json.msg = '系统繁忙(F)'//解决php系统框架报错无msg问题
                    }
                    fail(json);
                }
            },
            error: function (xhr, errorType, error) {
                opts.error();
            }
        })
    },
    // 补零
    pad: function (number, length) {
        return new Array(Math.max((length || 2) + 1 - String(number).length, 0)).join(0) + number;
    },
    // 检测时间戳
    checkTimeStamp: function (timer) {
        var _timeStamp = parseInt(timer, 10) + "",
            timeStamp = "";

        if (_timeStamp.length === 10) {
            timeStamp = _timeStamp * 1000;
        } else if (_timeStamp.length === 13) {
            timeStamp = parseInt(_timeStamp, 10);
        }

        return timeStamp;
    },
    // 日期格式化
    dateFormat: function (timer, formatStr) {
        var timeStamp = c2p.checkTimeStamp(timer);

        if (!timeStamp) return timer;

        var getDateObj = function (date) {
                return {
                    y: date.getFullYear(),
                    m: c2p.pad(date.getUTCMonth() + 1),
                    d: c2p.pad(date.getDate()),
                    H: c2p.pad(date.getHours()),
                    M: c2p.pad(date.getMinutes()),
                    S: c2p.pad(date.getSeconds())
                }
            },
            formatStr = formatStr || "%y-%m-%d %H:%M:%S",
            _date = new Date(timeStamp),
            _dateObj = getDateObj(_date),
            key;

        for (key in _dateObj) {
            while (formatStr.indexOf('%' + key) !== -1) {
                formatStr = formatStr.replace('%' + key, _dateObj[key]);
            }
        }

        return formatStr;
    },
    // 倒计时
    countdown: function (timer, callback) {
        return new countdown(timer, callback);
    },
    // Native 打开
    gotoNative: function (nativeUrl) {
        if (!nativeUrl) return;

        var doc = document,
            body = doc.body,
            iframe = doc.createElement('iframe');
        iframe.id = 'J_redirectNativeFrame';
        iframe.style.display = 'none';
        iframe.src = nativeUrl;

        //运行在head中
        if (!body) {
            setTimeout(function () {
                doc.body.appendChild(iframe);
            }, 0);
        } else {
            body.appendChild(iframe);
        }

        setTimeout(function () {
            doc.body.removeChild(iframe);
        }, 1000);
    },
    suda: function (key, value) {
        var home = sessionStorage.getItem('sudahome'),
            value = value || ""

        if (home) {
            value = home + ":" + value
        }

        SUDA.uaTrack('zhuawawa', key, {ext: value});
    },
    //是否微博client
    isWebView: function () {
        var ua = navigator.userAgent;
        //是否是在微博客户端内

        // User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G36 ChannelId(3) Nebula PSDType(1) AlipayDefined(nt:WIFI,ws:414|672|3.0) AliApp(AP/9.9.6.110312) AlipayClient/9.9.6.110312 Language/zh-Hans
        return {
            weibo: /__weibo__/.test(ua),
            alipay: /AlipayClient/.test(ua)
        }
    },

    protocol: function () {
        return window.location.protocol == 'http:' ? 'http:' : 'https:'
    },

    //超体的native版本 811
    isNativeVersion: function () {
        let version = this.weiboVersion().toString();
        let ua = navigator.userAgent;
        return (this.versionGt(version, '8.1.1') && !/Android/.test(ua)) || (this.versionGt(version, '8.1.1') && /Android/.test(ua));
    },

    isNewKK: function () {
        let version = this.weiboVersion().toString();
        let ua = navigator.userAgent;
        return this.versionGt(version, '8.4.3') && /Android/.test(ua);
    },

    //卓达盛的native版本 820
    isNativeVersionZDS: function () {
        let version = this.weiboVersion().toString();
        let ua = navigator.userAgent;
        return (this.versionGt(version, '8.2.0') && !/Android/.test(ua)) || (this.versionGt(version, '8.2.0') && /Android/.test(ua));
    },

    //客户端版本号
    weiboVersion: function () {
        let ua = navigator.userAgent;
        var versionMatched = ua.match(/__weibo__(.*?)_/);

        versionMatched = versionMatched ? versionMatched[1] : '';
        return versionMatched.replace(/^([^\.]+?\.)(.*)$/, function (_, $1, $2) {
            return $1 + $2;
        }) || 0;
    },

    versionGt: function(a,b){
        var subA = a.split('.'),
            subB = b.split('.'),
            flag = true

        if(subA[0] < subB[0]){
            flag = false
        }else if(subA[0] == subB[0]){
            if(subA[1] < subB[1]){
                flag = false
            }else if(subA[1] == subB[1]){
                if(subA[2] < subB[2]){
                    flag = false
                }
            }
        }

        return flag
    }
}
window.c2p = CoreApi;
