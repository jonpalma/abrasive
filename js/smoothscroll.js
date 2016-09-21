/**
 * SmoothScroll
 * This helper script created by DWUser.com.  Copyright 2012 DWUser.com.  
 * Dual-licensed under the GPL and MIT licenses.  
 * All individual scripts remain property of their copyrighters.
 * Date: 10-Sep-2012
 * Version: 1.0.1
 */
if (!window['jQuery']) alert('The jQuery library must be included before the smoothscroll.js file.  The plugin will not work propery.');

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
/*!
 * jQuery.scrollTo
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Easy element scrolling using jQuery.
 * @author Ariel Flesler
 * @version 2.1.0
 */
;(function(define) {
	'use strict';

	define(['jquery'], function($) {
		var $scrollTo = $.scrollTo = function(target, duration, settings) {
			return $(window).scrollTo(target, duration, settings);
		};

		$scrollTo.defaults = {
			axis:'xy',
			duration: 0,
			limit:true
		};

		function isWin(elem) {
			return !elem.nodeName ||
				$.inArray(elem.nodeName.toLowerCase(), ['iframe','#document','html','body']) !== -1;
		}		

		$.fn.scrollTo = function(target, duration, settings) {
			if (typeof duration === 'object') {
				settings = duration;
				duration = 0;
			}
			if (typeof settings === 'function') {
				settings = { onAfter:settings };
			}
			if (target === 'max') {
				target = 9e9;
			}

			settings = $.extend({}, $scrollTo.defaults, settings);
			// Speed is still recognized for backwards compatibility
			duration = duration || settings.duration;
			// Make sure the settings are given right
			var queue = settings.queue && settings.axis.length > 1;
			if (queue) {
				// Let's keep the overall duration
				duration /= 2;
			}
			settings.offset = both(settings.offset);
			settings.over = both(settings.over);

			return this.each(function() {
				// Null target yields nothing, just like jQuery does
				if (target === null) return;

				var win = isWin(this),
					elem = win ? this.contentWindow || window : this,
					$elem = $(elem),
					targ = target, 
					attr = {},
					toff;

				switch (typeof targ) {
					// A number will pass the regex
					case 'number':
					case 'string':
						if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both(targ);
							// We are done
							break;
						}
						// Relative/Absolute selector
						targ = win ? $(targ) : $(targ, elem);
						if (!targ.length) return;
						/* falls through */
					case 'object':
						// DOMElement / jQuery
						if (targ.is || targ.style) {
							// Get the real position of the target
							toff = (targ = $(targ)).offset();
						}
				}

				var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

				$.each(settings.axis.split(''), function(i, axis) {
					var Pos	= axis === 'x' ? 'Left' : 'Top',
						pos = Pos.toLowerCase(),
						key = 'scroll' + Pos,
						prev = $elem[key](),
						max = $scrollTo.max(elem, axis);

					if (toff) {// jQuery / DOMElement
						attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]);

						// If it's a dom element, reduce the margin
						if (settings.margin) {
							attr[key] -= parseInt(targ.css('margin'+Pos), 10) || 0;
							attr[key] -= parseInt(targ.css('border'+Pos+'Width'), 10) || 0;
						}

						attr[key] += offset[pos] || 0;

						if (settings.over[pos]) {
							// Scroll to a fraction of its width/height
							attr[key] += targ[axis === 'x'?'width':'height']() * settings.over[pos];
						}
					} else {
						var val = targ[pos];
						// Handle percentage values
						attr[key] = val.slice && val.slice(-1) === '%' ?
							parseFloat(val) / 100 * max
							: val;
					}

					// Number or 'number'
					if (settings.limit && /^\d+$/.test(attr[key])) {
						// Check the limits
						attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
					}

					// Don't waste time animating, if there's no need.
					if (!i && settings.axis.length > 1) {
						if (prev === attr[key]) {
							// No animation needed
							attr = {};
						} else if (queue) {
							// Intermediate animation
							animate(settings.onAfterFirst);
							// Don't animate this axis again in the next iteration.
							attr = {};
						}
					}
				});

				animate(settings.onAfter);

				function animate(callback) {
					var opts = $.extend({}, settings, {
						// The queue setting conflicts with animate()
						// Force it to always be true
						queue: true,
						duration: duration,
						complete: callback && function() {
							callback.call(elem, targ, settings);
						}
					});
					$elem.animate(attr, opts);
				}
			});
		};

		// Max scrolling position, works on quirks mode
		// It only fails (not too badly) on IE, quirks mode.
		$scrollTo.max = function(elem, axis) {
			var Dim = axis === 'x' ? 'Width' : 'Height',
				scroll = 'scroll'+Dim;

			if (!isWin(elem))
				return elem[scroll] - $(elem)[Dim.toLowerCase()]();

			var size = 'client' + Dim,
				doc = elem.ownerDocument || elem.document,
				html = doc.documentElement,
				body = doc.body;

			return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
		};

		function both(val) {
			return $.isFunction(val) || $.isPlainObject(val) ? val : { top:val, left:val };
		}

		// Add special hooks so that window scroll properties can be animated
		$.Tween.propHooks.scrollLeft = 
		$.Tween.propHooks.scrollTop = {
			get: function(t) {
				return $(t.elem)[t.prop]();
			},
			set: function(t) {
				var curr = this.get(t);
				// If interrupt is true and user scrolled, stop animating
				if (t.options.interrupt && t._last && t._last !== curr) {
					return $(t.elem).stop();
				}
				var next = Math.round(t.now);
				// Don't waste CPU
				// Browsers don't render floating point scroll
				if (curr !== next) {
					$(t.elem)[t.prop](next);
					t._last = this.get(t);
				}
			}
		};

		// AMD requirement
		return $scrollTo;
	});
}(typeof define === 'function' && define.amd ? define : function(deps, factory) {
	'use strict';
	if (typeof module !== 'undefined' && module.exports) {
		// Node
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}));
/*!
 * jQuery.localScroll
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jquerylocalscroll-10.html
 * @author Ariel Flesler
 * @version 1.4.0
 */
 ;(function(plugin) {
    // AMD Support
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], plugin);
    } else {
        plugin(jQuery);
    }
}(function($) {
	var URI = location.href.replace(/#.*/, ''); // local url without hash

	var $localScroll = $.localScroll = function(settings) {
		$('body').localScroll(settings);
	},
		$offset = parseInt($('.navbar').css('height').substring(0 , $('.navbar').css('height').indexOf('p')));
	// Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
	// @see http://demos.flesler.com/jquery/scrollTo/
	// The defaults are public and can be overriden.
	$localScroll.defaults = {
		duration: 1000, // How long to animate.
		axis: 'y', // Which of top and left should be modified.
		event: 'click', // On which event to react.
		stop: true, // Avoid queuing animations 
		target: window, // What to scroll (selector or element). The whole window by default.
        offset: -$offset, //Change this to offset for fixed headers 
        hash: false
		/*
		lock: false, // ignore events if already animating
		lazy: false, // if true, links can be added later, and will still work.
		filter: null, // filter some anchors out of the matched elements.
		hash: false, // if true, the hash of the selected link, will appear on the address bar.
		onBefore: null // called before scrolling, "this" contains the settings and gets 3 arguments
		*/
	};

	$.fn.localScroll = function(settings) {
		settings = $.extend({}, $localScroll.defaults, settings);

		if (settings.hash && location.hash) {
			if (settings.target) window.scrollTo(0, 0);
			scroll(0, location, settings);
		}

		return settings.lazy ?
			// use event delegation, more links can be added later.		
			this.on(settings.event, 'a,area', function(e) {
				if (filter.call(this)) {
					scroll(e, this, settings); 
				}
			}) :
			// bind concretely, to each matching link
			this.find('a,area')
				.filter(filter).bind(settings.event, function(e) {
					scroll(e, this, settings);
				}).end()
			.end();

		function filter() {// is this a link that points to an anchor and passes a possible filter ? href is checked to avoid a bug in FF.
			return !!this.href && !!this.hash && this.href.replace(this.hash,'') === URI && (!settings.filter || $(this).is(settings.filter));
		}
	};

	// Not needed anymore, kept for backwards compatibility
	$localScroll.hash = function() {};

	function scroll(e, link, settings) {
		var id = link.hash.slice(1),
			elem = document.getElementById(id) || document.getElementsByName(id)[0];

		if (!elem) return;

		if (e) e.preventDefault();

		var $target = $(settings.target);

		if (settings.lock && $target.is(':animated') ||
			settings.onBefore && settings.onBefore(e, elem, $target) === false) 
			return;

		if (settings.stop) {
			$target.stop(true); // remove all its animations
		}

		if (settings.hash) {
			var attr = elem.id === id ? 'id' : 'name',
				$a = $('<a> </a>').attr(attr, id).css({
					position:'absolute',
					top: $(window).scrollTop(),
					left: $(window).scrollLeft()
				});

			elem[attr] = '';
			$('body').prepend($a);
			location.hash = link.hash;
			$a.remove();
			elem[attr] = id;
		}
			
		$target
			.scrollTo(elem, settings) // do scroll
			.trigger('notify.serialScroll',[elem]); // notify serialScroll about this change
	}

	// AMD requirement
	return $localScroll;

}));
// Initialize all .smoothScroll links
jQuery(function($){ $.localScroll({filter:'.smoothScroll'}); });
