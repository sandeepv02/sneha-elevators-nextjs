"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePreloader } from "@/components/PreloaderContext";

const API_BASE = "https://sneha-elevators-api.onrender.com";
const IMG_BASE = "https://sneha-elevators-api.onrender.com";
const PAGE_SIZE = 9;

const mockBlogs = [
  {
    _id: "1",
    slug: "getting-started-with-elevators",
    title: "Getting Started with Modern Elevators",
    excerpt: "Learn the basics of modern elevator systems and how they improve building efficiency.",
    category: "Technology",
    datePosted: "2024-03-15T10:30:00Z",
    featuredImage: "/img/image-20.png"
  },
  {
    _id: "2",
    slug: "safety-features-guide",
    title: "Essential Safety Features in Elevators",
    excerpt: "Discover the critical safety mechanisms that keep elevators secure and reliable.",
    category: "Safety",
    datePosted: "2024-03-10T14:20:00Z",
    featuredImage: "/img/image-20.png"
  },
  {
    _id: "3",
    slug: "maintenance-tips",
    title: "Elevator Maintenance Best Practices",
    excerpt: "Regular maintenance ensures your elevator system operates smoothly for years to come.",
    category: "Maintenance",
    datePosted: "2024-03-05T09:15:00Z",
    featuredImage: "/img/image-20.png"
  }
];

export default function BlogsPage() {
  const { isCompleted } = usePreloader();
  const containerRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch blogs based on page and search
  useEffect(() => {
    async function getBlogs() {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: PAGE_SIZE.toString(),
        });
        if (debouncedSearch) {
          queryParams.set("search", debouncedSearch);
        }

        const res = await fetch(`${API_BASE}/blogs?${queryParams}`, {
          signal: AbortSignal.timeout(5000)
        });

        if (!res.ok) throw new Error("API failure");
        const data = await res.json();

        const fetchedBlogs = data.blogs || [];
        setTotalPages(data.pagination?.pages || 1);

        if (page === 1) {
          setBlogs(fetchedBlogs);
        } else {
          setBlogs((prev) => [...prev, ...fetchedBlogs]);
        }
      } catch (err) {
        console.warn("API fetch failed, utilizing fallbacks", err);
        // Load mock blogs on fallback
        if (page === 1) {
          let filtered = mockBlogs;
          if (debouncedSearch) {
            filtered = mockBlogs.filter(
              (b) =>
                b.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                b.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
          }
          setBlogs(filtered);
          setTotalPages(1);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    getBlogs();
  }, [page, debouncedSearch]);

  // 1. Initial GSAP state setup (runs instantly on mount to prevent any flash/glitch)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tagline = document.querySelector(".section-2-tagline");
      const title = document.querySelector(".contact-title");

      if (tagline && title) {
        gsap.set([tagline, title], { opacity: 0, y: 30 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Play animations and register ScrollTriggers (runs once preloader is completed)
  useLayoutEffect(() => {
    if (!isCompleted) return;

    const ctx = gsap.context(() => {
      const tagline = document.querySelector(".section-2-tagline");
      const title = document.querySelector(".contact-title");

      if (tagline && title) {
        gsap.fromTo(
          [tagline, title],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isCompleted]);

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

  return (
    <div ref={containerRef} style={{ width: "100%", overflowX: "hidden" }}>
      <div className="page-width">
        <section className="resources-section">
          <div className="resources">
            <p className="section-2-tagline">
              <span className="section-2-dot" aria-hidden="true"></span> Our blogs
            </p>
            <h1 className="contact-title">Resources and insights</h1>

            {/* Search Box */}
            <div className="project-searchh">
              <div className="projects-search-box">
                <i className="fas fa-search" style={{ marginRight: "10px", color: "#888" }}></i>
                <input
                  type="text"
                  className="projects-search-input"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Blogs Grid */}
            {loading && page === 1 ? (
              <div className="resources-grid">
                {[...Array(6)].map((_, idx) => (
                  <article className="resource-card skeleton-card" key={idx}>
                    <div className="image-wrap" style={{ height: "220px", background: "#f0f0f0" }}></div>
                    <div className="skel-line short" style={{ height: "14px", width: "55%", marginTop: "10px", background: "#e0e0e0" }}></div>
                    <div className="skel-line medium" style={{ height: "14px", width: "80%", marginTop: "10px", background: "#e0e0e0" }}></div>
                    <div className="skel-line full" style={{ height: "14px", width: "100%", marginTop: "10px", background: "#e0e0e0" }}></div>
                    <div className="skel-line btn" style={{ height: "14px", width: "100px", marginTop: "14px", background: "#e0e0e0" }}></div>
                  </article>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="blogs-empty-state" style={{ textAlign: "center", padding: "60px 20px" }}>
                <i className="fas fa-newspaper" style={{ fontSize: "3rem", color: "#ccc", display: "block", marginBottom: "15px" }}></i>
                <p style={{ fontFamily: "DM Sans, sans-serif", color: "#888" }}>
                  No blogs found for "<strong>{search}</strong>".
                </p>
              </div>
            ) : (
              <div className="resources-grid">
                {blogs.map((blog) => {
                  const slug = blog.slug || blog.blogUrl || "";
                  return (
                    <article className="resource-card" key={blog._id || slug} style={{ cursor: "pointer" }}>
                      <Link href={`/blogs/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <div className="image-wrap">
                          <img
                            src={getImgSrc(blog.featuredImage)}
                            alt={blog.title}
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "/img/image-20.png";
                            }}
                          />
                        </div>
                        <p className="meta">
                          {blog.category || "Elevators"}&nbsp;&nbsp;{formatDate(blog.datePosted || blog.createdAt)}
                        </p>
                        <h3>{blog.title}</h3>
                        <p className="desc">{blog.excerpt}</p>
                        <span className="read-more" style={{ display: "inline-block", marginTop: "15px", color: "#dc3545", fontWeight: "bold" }}>
                          Read More <i className="fas fa-arrow-right" style={{ marginLeft: "5px" }}></i>
                        </span>
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Load More Spinner/Button */}
            {page < totalPages && (
              <div className="load-more-wrap" style={{ marginTop: "40px", textAlign: "center" }}>
                <button
                  className="load-more"
                  disabled={loadingMore}
                  onClick={() => setPage((prev) => prev + 1)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    padding: "10px 25px",
                    border: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontFamily: "DM Sans, sans-serif"
                  }}
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
