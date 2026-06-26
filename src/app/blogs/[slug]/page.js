import Link from "next/link";

const API_BASE = "https://sneha-elevators-api.onrender.com";
const IMG_BASE = "https://sneha-elevators-api.onrender.com";

const mockBlogsDetail = {
  "getting-started-with-elevators": {
    title: "Getting Started with Modern Elevators",
    category: "Technology",
    datePosted: "2024-03-15T10:30:00Z",
    featuredImage: "/img/image-20.png",
    excerpt: "Learn the basics of modern elevator systems and how they improve building efficiency.",
    content: `<p>Modern elevator systems are much more than just simple pulleys and cabins. They are complex machines driven by microprocessors, advanced motors, and high-tech safety mechanisms.</p><h6 class="section-titlee">Understanding the Gearless Drive</h6><p>Traditional elevators relied heavily on geared systems, which were noisy and oil-intensive. Modern home and passenger elevators use gearless drive systems which operate quietly and require minimal maintenance, making them highly eco-friendly.</p>`,
    frequentlyAskedQuestions: [
      {
        question: "How long does a typical installation take?",
        answer: "A standard residential installation takes between 2 to 4 weeks depending on the civil preparation and structural requirements."
      }
    ]
  },
  "safety-features-guide": {
    title: "Essential Safety Features in Elevators",
    category: "Safety",
    datePosted: "2024-03-10T14:20:00Z",
    featuredImage: "/img/image-20.png",
    excerpt: "Discover the critical safety mechanisms that keep elevators secure and reliable.",
    content: `<p>Safety is the single most important aspect of lift engineering. Every modern elevator system must meet rigorous national and international safety codes before carrying passengers.</p><h6 class="section-titlee">Sensor-Based Automatic Doors</h6><p>Light curtains and infrared sensors prevent elevator doors from closing when someone is entering or exiting the cabin, preventing accidents.</p><h6 class="section-titlee">Automatic Rescue Device (ARD)</h6><p>In case of a sudden power outage, the ARD automatically moves the elevator to the nearest floor and opens the doors, ensuring passenger safety.</p>`,
    frequentlyAskedQuestions: []
  },
  "maintenance-tips": {
    title: "Elevator Maintenance Best Practices",
    category: "Maintenance",
    datePosted: "2024-03-05T09:15:00Z",
    featuredImage: "/img/image-20.png",
    excerpt: "Regular maintenance ensures your elevator system operates smoothly for years to come.",
    content: `<p>To avoid unexpected breakdowns and ensure high performance, regular preventative maintenance is essential. Here are some of the key best practices followed by professional engineers.</p><h6 class="section-titlee">Monthly Inspections</h6><p>Technicians check physical components, safety links, speed limiters, and door functions to catch potential faults early.</p>`,
    frequentlyAskedQuestions: []
  }
};

const mockBlogsList = [
  {
    slug: "getting-started-with-elevators",
    title: "Getting Started with Modern Elevators",
    excerpt: "Learn the basics of modern elevator systems and how they improve building efficiency.",
    category: "Technology",
    datePosted: "2024-03-15T10:30:00Z",
    featuredImage: "/img/image-20.png"
  },
  {
    slug: "safety-features-guide",
    title: "Essential Safety Features in Elevators",
    excerpt: "Discover the critical safety mechanisms that keep elevators secure and reliable.",
    category: "Safety",
    datePosted: "2024-03-10T14:20:00Z",
    featuredImage: "/img/image-20.png"
  },
  {
    slug: "maintenance-tips",
    title: "Elevator Maintenance Best Practices",
    excerpt: "Regular maintenance ensures your elevator system operates smoothly for years to come.",
    category: "Maintenance",
    datePosted: "2024-03-05T09:15:00Z",
    featuredImage: "/img/image-20.png"
  }
];

// Helper to fetch details
async function fetchBlogData(slug) {
  let blog = null;

  // Strategy 1: Fetch directly by slug
  try {
    const res = await fetch(`${API_BASE}/blogs/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      blog = data.blog || (data._id ? data : null);
    }
  } catch (e) {
    console.warn("Direct details fetch failed, trying full listing fallback");
  }

  // Strategy 2: Fetch list and search
  if (!blog) {
    try {
      const res = await fetch(`${API_BASE}/blogs?limit=100`, { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        const allBlogs = data.blogs || [];
        blog = allBlogs.find((b) => b.slug === slug || b.blogUrl === slug);
      }
    } catch (e) {
      console.warn("Full list fallback fetch failed");
    }
  }

  // Strategy 3: Mock details fallback
  if (!blog) {
    blog = mockBlogsDetail[slug];
  }

  return blog;
}

// Helper to fetch related blogs
async function fetchRelatedBlogs(currentSlug) {
  try {
    const res = await fetch(`${API_BASE}/blogs?limit=10`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const list = data.blogs || [];
      return list.filter((b) => (b.slug || b.blogUrl) !== currentSlug).slice(0, 3);
    }
  } catch (e) {
    console.warn("Related blogs fetch failed");
  }
  return mockBlogsList.filter((b) => b.slug !== currentSlug).slice(0, 3);
}

// Generate dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogData(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Sneha Elev8r",
      description: "The requested elevator article was not found.",
    };
  }

  return {
    title: `${blog.title} | Sneha Elev8r Blog`,
    description: blog.excerpt || blog.meta?.description || `Read about ${blog.title} on the Sneha Elev8r blog.`,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogData(slug);

  if (!blog) {
    return (
      <div className="page-width">
        <section className="container-fluid blogs-detail" style={{ padding: "100px 0" }}>
          <div className="detail-error" style={{ textAlign: "center" }}>
            <i className="fas fa-exclamation-circle" style={{ fontSize: "3rem", color: "#ccc", display: "block", marginBottom: "15px" }}></i>
            <p style={{ fontFamily: "DM Sans, sans-serif", color: "#888" }}>Blog not found. It may have been moved or deleted.</p>
            <Link href="/blogs" style={{ color: "#dc3545", textDecoration: "none", fontWeight: "bold" }}>
              ← Back to Blogs
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const relatedBlogs = await fetchRelatedBlogs(slug);

  const getImgSrc = (path) => {
    if (!path) return "/img/image-20.png";
    if (path.startsWith("http")) return path;
    const slash = path.startsWith("/") ? "" : "/";
    return `${IMG_BASE}${slash}${path}`;
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Build body HTML exactly like original script
  const buildBodyHTML = () => {
    if (blog.content && typeof blog.content === "string") {
      return blog.content;
    }

    if (Array.isArray(blog.sections) && blog.sections.length) {
      return blog.sections
        .map((s) => {
          let out = "";
          if (s.heading) out += `<h6 class="section-titlee">${s.heading}</h6>`;
          if (s.body) out += `<p class="blog-detail-content-p">${s.body}</p>`;
          if (Array.isArray(s.listItems) && s.listItems.length) {
            out += '<ul class="job-list">' + s.listItems.map((li) => `<li>${li}</li>`).join("") + "</ul>";
          }
          return out;
        })
        .join("");
    }

    if (blog.body && typeof blog.body === "string") {
      return `<p class="blog-detail-content-p">${blog.body}</p>`;
    }

    return "";
  };

  const bodyHTML = buildBodyHTML();
  const faqs = blog.frequentlyAskedQuestions || [];

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div className="page-width">
        <section className="container-fluid blogs-detail" style={{ paddingTop: "90px", paddingBottom: "40px" }}>
          <div className="blog-detail" id="blogDetailRoot">
            <h1 className="blog-detail-title">{blog.title}</h1>

            <div className="blog-detail-meta-row" style={{ display: "flex", gap: "20px", margin: "15px 0", color: "#888" }}>
              <span className="blog-detail-category" style={{ textTransform: "uppercase" }}>
                {blog.category || "Elevators"}
              </span>
              <span className="blog-detail-date">{formatDate(blog.datePosted || blog.createdAt)}</span>
            </div>

            <div className="blog-detail-image-wrap" style={{ margin: "25px 0", borderRadius: "12px", overflow: "hidden" }}>
              <img
                src={getImgSrc(blog.featuredImage)}
                alt={blog.title}
                className="blog-detail-image"
                style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
              />
            </div>

            {blog.excerpt && (
              <div className="blog-detail-excerpt-box" style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #dc3545", marginBottom: "30px" }}>
                <p style={{ margin: 0, fontStyle: "italic", color: "#555" }}>{blog.excerpt}</p>
              </div>
            )}

            {bodyHTML && (
              <div className="blog-detail-body" dangerouslySetInnerHTML={{ __html: bodyHTML }} />
            )}

            {/* FAQs rendering */}
            {faqs.length > 0 && (
              <div className="blog-detail-body" style={{ marginTop: "40px" }}>
                <h6 className="section-titlee">Frequently Asked Questions</h6>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ marginBottom: "20px" }}>
                    <p className="blog-detail-content-p" style={{ fontWeight: "bold", margin: "5px 0" }}>{faq.question}</p>
                    <p className="blog-detail-content-p" style={{ margin: "5px 0" }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Explore Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="explore-blogs-section container-fluid" id="exploreSection" style={{ padding: "60px 0", borderTop: "1px solid #eee", background: "#fdfdfd" }}>
          <div className="page-width">
            <div className="explore-blogs-header" style={{ marginBottom: "40px" }}>
              <p className="explore-blogs-tagline">
                <span className="section-2-dot" aria-hidden="true" style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "#dc3545", borderRadius: "50%", marginRight: "8px" }}></span>
                Explore More Blogs
              </p>
              <h2 className="explore-blogs-heading">Expert Views on Elevators</h2>
            </div>

            <div className="row g-4 explore-blogs-grid" id="relatedBlogsGrid">
              {relatedBlogs.map((b) => {
                const bSlug = b.slug || b.blogUrl || "";
                return (
                  <div className="col-lg-4 col-md-6" key={b._id || bSlug}>
                    <article className="explore-blog-card" style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", height: "100%" }}>
                      <Link href={`/blogs/${bSlug}`} className="explore-blog-link" style={{ textDecoration: "none", color: "inherit" }}>
                        <div className="explore-blog-image-wrap" style={{ height: "200px", overflow: "hidden", borderRadius: "6px", marginBottom: "15px" }}>
                          <img
                            src={getImgSrc(b.featuredImage)}
                            alt={b.title}
                            className="explore-blog-image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            loading="lazy"
                          />
                        </div>
                        <div className="explore-blog-content">
                          <div className="explore-blog-meta" style={{ display: "flex", gap: "15px", fontSize: "0.85rem", color: "#888", marginBottom: "10px" }}>
                            <span>{b.category || "Elevators"}</span>
                            <span>{formatDate(b.datePosted || b.createdAt)}</span>
                          </div>
                          <h3 className="explore-blog-title" style={{ fontSize: "1.2rem", margin: "10px 0" }}>{b.title}</h3>
                          <p className="explore-blog-desc" style={{ color: "#666", fontSize: "0.95rem" }}>{b.excerpt}</p>
                          <span className="explore-blog-read" style={{ color: "#dc3545", fontWeight: "bold" }}>Read More...</span>
                        </div>
                      </Link>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
