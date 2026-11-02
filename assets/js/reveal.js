(function() {

	// Fade-up reveal for gallery items and price cards in the main content area.
	var items = document.querySelectorAll('#main .gallery-item, #main .price-card');

	if (!items.length
	||	!('IntersectionObserver' in window)
	||	window.matchMedia('(prefers-reduced-motion: reduce)').matches)
		return;

	var observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			var el = entry.target;

			if (!entry.isIntersecting)
				return;

			el.classList.add('is-visible');
			observer.unobserve(el);

			// The stagger delay is only for the entrance.
			window.setTimeout(function() {
				el.style.transitionDelay = '';
			}, 1400);
		});
	}, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

	Array.prototype.forEach.call(items, function(el, i) {
		el.classList.add('reveal');
		el.style.transitionDelay = (i % 3) * 0.08 + 's';
		observer.observe(el);
	});

})();
