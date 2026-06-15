/**
 * blogs-dynamic.js
 * Drop this at the bottom of blogs.html (or include via <script src="js/blogs-dynamic.js">)
 * Replaces the static .resources-grid cards with live API data.
 */

(function () {
  const API_BASE   = 'https://sneha.dev.redmattertech.com/api';
  const IMG_BASE   = 'https://sneha.dev.redmattertech.com'; // prepend to relative image paths
  const PAGE_SIZE  = 9;

  let currentPage  = 1;
  let totalPages   = 1;
  let currentQuery = '';
  let searchTimer  = null;

  // ── DOM refs ────────────────────────────────────────────────────────────────
  const grid        = document.querySelector('.resources-grid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const searchInput = document.querySelector('.projects-search-input');

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function imgSrc(path) {
    if (!path) return 'img/image-20.png';
    return path.startsWith('http') ? path : IMG_BASE + path;
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  function cardHTML(blog) {
    return `
      <article class="resource-card" data-aos="fade-up" data-slug="${blog.slug || blog.blogUrl}">
        <div class="image-wrap">
          <img src="${imgSrc(blog.featuredImage)}" alt="${blog.title}" loading="lazy" />
        </div>
        <p class="meta">${blog.category || ''}${blog.datePosted ? '&nbsp;&nbsp;' + formatDate(blog.datePosted) : ''}</p>
        <h3>${blog.title}</h3>
        <p class="desc">${blog.excerpt || ''}</p>
        <a href="Blogsdetail.html?slug=${blog.slug || blog.blogUrl}" class="read-more">
          Read More <i class="fas fa-arrow-right"></i>
        </a>
      </article>`;
  }

  function showSkeleton(count = 3) {
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `
        <article class="resource-card skeleton-card">
          <div class="image-wrap" style="background:#e9e9e9;height:220px;border-radius:8px;"></div>
          <p class="meta" style="background:#e9e9e9;height:14px;width:60%;margin-top:12px;border-radius:4px;"></p>
          <h3 style="background:#e9e9e9;height:18px;width:85%;margin-top:8px;border-radius:4px;"></h3>
          <p class="desc" style="background:#e9e9e9;height:40px;margin-top:8px;border-radius:4px;"></p>
        </article>`;
    }
    grid.insertAdjacentHTML('beforeend', html);
  }

  function removeSkeleton() {
    document.querySelectorAll('.skeleton-card').forEach(el => el.remove());
  }

  // ── Fetch ────────────────────────────────────────────────────────────────────
  async function fetchBlogs(page = 1, append = false) {
    if (!append) { grid.innerHTML = ''; }

    showSkeleton(3);

    const params = new URLSearchParams({
      page,
      limit: PAGE_SIZE,
      ...(currentQuery && { search: currentQuery })
    });

    try {
      const res  = await fetch(`${API_BASE}/blogs?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      removeSkeleton();

      const blogs = data.blogs || [];
      totalPages  = data.pagination?.pages || 1;

      if (!blogs.length && page === 1) {
        grid.innerHTML = '<p style="text-align:center;color:#888;padding:40px 0;">No blogs found.</p>';
        loadMoreBtn.style.display = 'none';
        return;
      }

      grid.insertAdjacentHTML('beforeend', blogs.map(cardHTML).join(''));

      // Refresh AOS for newly added cards
      if (typeof AOS !== 'undefined') AOS.refreshHard();

      loadMoreBtn.style.display = currentPage >= totalPages ? 'none' : 'inline-block';

    } catch (err) {
      removeSkeleton();
      console.error('Blog fetch error:', err);
      if (!append) {
        grid.innerHTML = '<p style="text-align:center;color:#888;padding:40px 0;">Failed to load blogs. Please try again.</p>';
      }
      loadMoreBtn.style.display = 'none';
    }
  }

  // ── Events ───────────────────────────────────────────────────────────────────
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        fetchBlogs(currentPage, true);
      }
    });
  }

  // Debounced search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        currentQuery = searchInput.value.trim();
        currentPage  = 1;
        fetchBlogs(1, false);
      }, 400);
    });
  }

  // Card click → detail page (delegate, skip "Read More" anchor)
  grid.addEventListener('click', (e) => {
    if (e.target.closest('.read-more')) return;
    const card = e.target.closest('.resource-card');
    if (card && card.dataset.slug) {
      window.location.href = `Blogsdetail.html?slug=${card.dataset.slug}`;
    }
  });

  // ── Init ─────────────────────────────────────────────────────────────────────
  fetchBlogs(1, false);
})();
