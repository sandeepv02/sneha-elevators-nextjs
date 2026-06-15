document.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById('siteLoader');
    if (!loader) return;
    // ensure a visible "Loading" label is present for accessibility/UX
    if (!loader.querySelector('.loader-text')) {
        var text = document.createElement('div');
        text.className = 'loader-text';
        text.textContent = 'Loading';
        // place the text after the spinner if present, otherwise append
        var spinner = loader.querySelector('.spinner');
        if (spinner && spinner.parentNode) {
            spinner.parentNode.insertBefore(text, spinner.nextSibling);
        } else {
            loader.appendChild(text);
        }
    }
    // Ensure loader remains visible until all resources are loaded
    window.addEventListener('load', function () {
        loader.classList.add('site-loader--hidden');
        // remove from DOM after transition
        setTimeout(function () {
            if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
        }, 500);
    });
    // as a safety fallback hide after 10s
    setTimeout(function () {
        if (loader) {
            loader.classList.add('site-loader--hidden');
            setTimeout(function () {
                if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
            }, 500);
        }
    }, 10000);
});
