(function() {

	// Lightbox for the work gallery. Without JS the links open the image file.
	var items = Array.prototype.slice.call(document.querySelectorAll('#main .gallery a.gallery-item'));

	if (!items.length)
		return;

	var box = document.createElement('div');
	box.className = 'lightbox';
	box.setAttribute('role', 'dialog');
	box.setAttribute('aria-modal', 'true');
	box.setAttribute('aria-label', '作品放大檢視');
	box.innerHTML =
		'<span class="lightbox-count"></span>' +
		'<button type="button" class="lightbox-btn lightbox-close" aria-label="關閉">&times;</button>' +
		'<button type="button" class="lightbox-btn lightbox-prev" aria-label="上一張">&#8249;</button>' +
		'<button type="button" class="lightbox-btn lightbox-next" aria-label="下一張">&#8250;</button>' +
		'<img alt="">' +
		'<p class="lightbox-caption"></p>';
	document.body.appendChild(box);

	var img = box.querySelector('img'),
		caption = box.querySelector('.lightbox-caption'),
		count = box.querySelector('.lightbox-count'),
		closeBtn = box.querySelector('.lightbox-close'),
		prevBtn = box.querySelector('.lightbox-prev'),
		nextBtn = box.querySelector('.lightbox-next'),
		buttons = [closeBtn, prevBtn, nextBtn],
		index = 0,
		lastFocus = null,
		touchX = null;

	function isOpen() {
		return box.classList.contains('is-open');
	}

	function show(i) {
		var link, thumb;

		index = (i + items.length) % items.length;
		link = items[index];
		thumb = link.querySelector('img');

		img.src = link.getAttribute('href');
		img.alt = thumb ? thumb.alt : '';
		caption.textContent = img.alt;
		count.textContent = (index + 1) + ' / ' + items.length;
	}

	function open(i) {
		lastFocus = document.activeElement;
		show(i);
		box.classList.add('is-open');
		document.documentElement.style.overflow = 'hidden';
		closeBtn.focus();
	}

	function close() {
		box.classList.remove('is-open');
		document.documentElement.style.overflow = '';
		if (lastFocus && lastFocus.focus)
			lastFocus.focus();
	}

	items.forEach(function(link, i) {
		link.addEventListener('click', function(event) {
			if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey)
				return;
			event.preventDefault();
			open(i);
		});
	});

	closeBtn.addEventListener('click', close);
	prevBtn.addEventListener('click', function() { show(index - 1); });
	nextBtn.addEventListener('click', function() { show(index + 1); });

	box.addEventListener('click', function(event) {
		if (event.target === box)
			close();
	});

	box.addEventListener('touchstart', function(event) {
		touchX = event.changedTouches[0].clientX;
	}, { passive: true });

	box.addEventListener('touchend', function(event) {
		var dx;

		if (touchX === null)
			return;

		dx = event.changedTouches[0].clientX - touchX;
		touchX = null;

		if (Math.abs(dx) > 50)
			show(index + (dx < 0 ? 1 : -1));
	}, { passive: true });

	document.addEventListener('keydown', function(event) {
		var pos;

		if (!isOpen())
			return;

		if (event.key === 'Escape')
			close();
		else if (event.key === 'ArrowLeft')
			show(index - 1);
		else if (event.key === 'ArrowRight')
			show(index + 1);
		else if (event.key === 'Tab') {
			// Keep focus inside the dialog.
			pos = buttons.indexOf(document.activeElement);
			event.preventDefault();
			buttons[(pos + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
		}
	});

})();
