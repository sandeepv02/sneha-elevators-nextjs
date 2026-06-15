/**
 * blogsdetail-dynamic.js
 * Drop this at the bottom of Blogsdetail.html (or include via <script src="js/blogsdetail-dynamic.js">)
 * Reads ?slug= from the URL, fetches the blog from the API, and renders all detail content.
 */

(function () {
  const API_BASE  = 'https://sneha.dev.redmattertech.com/api';
  const IMG_BASE  = 'https://sneha.dev.redmattertech.com';
  const RELATED_COUNT = 3;

  // ── DOM refs ─────────────────────────────────────────────────────────────────
  const titleEl      = document.querySelector('.blog-detail-title');
  const categoryEl   = document.querySelector('.blog-detail-category');
  const dateEl       = document.querySelector('.blog-detail-date');
  const imageEl      = document.querySelector('.blog-detail-image');
  const excerptEl    = document.querySelector('.blog-detail-excerpt-box p');
  const contentWrap  = document.querySelector('.blog-detail-content') // optional wrapper
                    || document.querySelector('.blog-detail');        // fallback
  const exploreGrid  = document.querySelector('.explore-blogs-grid');

  // ── Helpers ──────────────────────────────────────────────────────────────────
  function imgSrc(path) {
    if (!path) return 'img/image-23.jpg';
    return path.startsWith('http') ? path : IMG_BASE + path;
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  function getSlug() {
    return new URLSearchParams(window.location.search).get('slug') || '';
  }

  // ── Render detail ─────────────────────────────────────────────────────────────
  function renderDetail(blog) {
    document.title = `${blog.title} - My Website`;

    if (titleEl)    titleEl.textContent  = blog.title;
    if (categoryEl) categoryEl.textContent = blog.category || '';
    if (dateEl)     dateEl.textContent   = blog.datePosted ? formatDate(blog.datePosted) : '';
    if (imageEl) {
      imageEl.src = imgSrc(blog.featuredImage);
      imageEl.alt = blog.title;
    }
    if (excerptEl)  excerptEl.textContent = blog.excerpt || '';

    // --- Render rich body content ---
    // Find the content section (the <div> after excerpt that holds h6/p/ul blocks)
    // We target it by a stable class; add class="blog-detail-body" to that div in HTML.
    // Fallback: inject after excerpt box.
    let bodyTarget = document.querySelector('.blog-detail-body');

    if (!bodyTarget) {
      // Create and inject after the excerpt box
      bodyTarget = document.createElement('div');
      bodyTarget.className = 'blog-detail-body';
      const excerptBox = document.querySelector('.blog-detail-excerpt-box');
      if (excerptBox) {
        excerptBox.insertAdjacentElement('afterend', bodyTarget);
      }
    }

    // Build HTML from blog content fields
    let bodyHTML = '';

    // Support common API shapes: blog.content (HTML string) or blog.sections (array)
    if (blog.content) {
      // If API returns raw HTML content string
      bodyHTML = blog.content;
    } else if (Array.isArray(blog.sections)) {
      // If API returns structured sections array: [{heading, body, listItems}]
      blog.sections.forEach(section => {
        if (section.heading) {
          bodyHTML += `<h6 class="section-titlee">${section.heading}</h6>`;
        }
        if (section.body) {
          bodyHTML += `<p class="blog-detail-content-p">${section.body}</p>`;
        }
        if (Array.isArray(section.listItems) && section.listItems.length) {
          bodyHTML += '<ul class="job-list">' +
            section.listItems.map(item => `<li>${item}</li>`).join('') +
            '</ul>';
        }
      });
    }

    // FAQ section
    if (Array.isArray(blog.frequentlyAskedQuestions) && blog.frequentlyAskedQuestions.length) {
      bodyHTML += `<h6 class="section-titlee">Frequently Asked Questions</h6>`;
      blog.frequentlyAskedQuestions.forEach(faq => {
        bodyHTML += `
          <p class="blog-detail-content-p"><strong>${faq.question}</strong></p>
          <p class="blog-detail-content-p">${faq.answer}</p>`;
      });
    }

    bodyTarget.innerHTML = bodyHTML || '<p class="blog-detail-content-p">Content coming soon.</p>';
  }

  // ── Render related blogs ──────────────────────────────────────────────────────
  function renderRelated(blogs, currentSlug) {
    if (!exploreGrid) return;

    const related = blogs
      .filter(b => (b.slug || b.blogUrl) !== currentSlug)
      .slice(0, RELATED_COUNT);

    if (!related.length) {
      document.querySelector('.explore-blogs-section')?.style.setProperty('display', 'none');
      return;
    }

    exploreGrid.innerHTML = related.map(blog => `
      <div class="col-lg-4 col-md-6">
        <article class="explore-blog-card">
          <a href="Blogsdetail.html?slug=${blog.slug || blog.blogUrl}" class="explore-blog-link">
            <div class="explore-blog-image-wrap">
              <img src="${imgSrc(blog.featuredImage)}" alt="${blog.title}" class="explore-blog-image" loading="lazy">
            </div>
            <div class="explore-blog-content">
              <div class="explore-blog-meta">
                <span>${blog.category || ''}</span>
                <span>${blog.datePosted ? formatDate(blog.datePosted) : ''}</span>
              </div>
              <h3 class="explore-blog-title">${blog.title}</h3>
              <p class="explore-blog-desc">${blog.excerpt || ''}</p>
              <span class="explore-blog-read">Read More...</span>
            </div>
          </a>
        </article>
      </div>`).join('');
  }

  // ── Fetch single blog by slug ─────────────────────────────────────────────────
  async function fetchBlogDetail(slug) {
    // Try slug-based endpoint first, then fall back to filtering list
    let blog = null;

    try {
      // Attempt: GET /blogs/:slug
      const res = await fetch(`${API_BASE}/blogs/${slug}`);
      if (res.ok) {
        const data = await res.json();
        blog = data.blog || data; // handle {blog: {...}} or direct object
      }
    } catch (_) { /* ignore, try fallback */ }

    if (!blog) {
      // Fallback: fetch list and find by slug/blogUrl
      const res  = await fetch(`${API_BASE}/blogs?limit=100`);
      const data = await res.json();
      const list = data.blogs || [];
      blog = list.find(b => b.slug === slug || b.blogUrl === slug);

      // Also use list for related blogs
      renderRelated(list, slug);
    } else {
      // Fetch list separately for related
      fetch(`${API_BASE}/blogs?limit=10`)
        .then(r => r.json())
        .then(d => renderRelated(d.blogs || [], slug))
        .catch(() => {});
    }

    if (!blog) {
      titleEl && (titleEl.textContent = 'Blog not found.');
      return;
    }

    renderDetail(blog);
  }

  // ── Init ──────────────────────────────────────────────────────────────────────
  const slug = getSlug();
  if (slug) {
    fetchBlogDetail(slug);
  } else {
    // No slug → redirect back to blogs list
    window.location.href = 'blogs.html';
  }
})();
