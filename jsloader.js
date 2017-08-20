// copy from xiuno bbs 2.1.0
// http://bbs.xiuno.com/
// modified by 杨永全
// usage:
// jsloader.load('a.js','b.js','c.js',function() { alert('all js has loaded.'); });

(function(window) {
	var jsloader = {};
	jsloader.loaded = []; // 已经加载的JS
	jsloader.load = function() {
		var args = null;
		if (typeof arguments[0] == 'object') {
			args = arguments[0];
			if (arguments[1]) args.push(arguments[1]);
		} else {
			args = arguments;
		}

		// 去除重复
		//args; // 参数列表
		this.load = function(args, i) {
			if (typeof args[i] == 'string') {
				var js = args[i];
				if (jsloader.loaded.indexOf && jsloader.loaded.indexOf(js) != -1) {
					if (i < args.length) {
						this.load(args, i + 1);
					}
					return;
				}
				jsloader.loaded.push(js);

				var script = document.createElement("script");
				script.src = js;
				// recall next
				if (i < args.length) {
					var _this = this;
					if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
						script.onreadystatechange = function() {
							if (script.readyState == 'loaded' || script.readyState == 'complete') {
								_this.load(args, i + 1);
								script.onreadystatechange = null;
							}
						};
						script.onerror = function() {
							alert('script load error:' + js);
						}
					} else {
						script.onload = function() {
							_this.load(args, i + 1);
						};
					}
				}
				document.getElementsByTagName('head')[0].appendChild(script);

			} else if (typeof args[i] == 'function') {
				var f = args[i];
				f();
				if (i < args.length) {
					this.load(args, i + 1);
				}
			} else {}
		};
		this.load(args, 0);
	}
	window.jsloader = jsloader;
	//end
})(window);