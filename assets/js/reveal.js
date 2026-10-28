(function() {

	// Fade-up reveal for images in the main content area.
	var imgs = document.querySelectorAll('#main img');

	if (!imgs.length
	||	!('IntersectionObserver' in window)
	||	window.matchMedia('(prefers-reduced-motion: reduce)').matches)
		return;

	var observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			if (!entry.isIntersecting)
				return;
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

	Array.prototype.forEach.call(imgs, function(img, i) {
		img.classList.add('reveal');
		img.style.transitionDelay = (i % 3) * 0.08 + 's';
		observer.observe(img);
	});

})();
