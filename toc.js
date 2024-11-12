// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item affix "><a href="Introduction/Introduction.html">Introduction</a></li><li class="chapter-item "><a href="Kotlin/Lab_1/Kotlin_Intro.html"><strong aria-hidden="true">1.</strong> Introduction to Kotlin</a></li><li class="chapter-item "><a href="Kotlin/Lab_2/Android_Intro.html"><strong aria-hidden="true">2.</strong> Introduction to Android Studio</a></li><li class="chapter-item "><a href="Kotlin/Lab_3/Lab_3.html"><strong aria-hidden="true">3.</strong> Healthy Recipe App</a></li><li class="chapter-item "><a href="Kotlin/Lab_4/Lab_4.html"><strong aria-hidden="true">4.</strong> Concert Ticket App</a></li><li class="chapter-item "><a href="Kotlin/Lab_5/Lab_5.html"><strong aria-hidden="true">5.</strong> Mass Converter App</a></li><li class="chapter-item "><a href="Kotlin/Lab_6/Lab_6.html"><strong aria-hidden="true">6.</strong> Lists, Arrays and Web Browsers</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="Kotlin/Lab_6/Lab_6-1.html"><strong aria-hidden="true">6.1.</strong> Arrays in Kotlin</a></li><li class="chapter-item "><a href="Kotlin/Lab_6/Lab_6-2.html"><strong aria-hidden="true">6.2.</strong> City Guide App</a></li></ol></li><li class="chapter-item "><a href="Kotlin/Lab_7/Lab_7.html"><strong aria-hidden="true">7.</strong> Exception Handling</a></li><li class="chapter-item "><a href="Kotlin/Lab_8/Lab_8.html"><strong aria-hidden="true">8.</strong> Kotlin Object Orientated Programming</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="Kotlin/Lab_9/Lab_9.html"><strong aria-hidden="true">8.1.</strong> OOP with Data Storage</a></li></ol></li><li class="chapter-item "><div><strong aria-hidden="true">9.</strong> Permissions </div></li><li class="chapter-item "><div><strong aria-hidden="true">10.</strong> Sensors</div><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><div><strong aria-hidden="true">10.1.</strong> All of the Sensors</div></li><li class="chapter-item "><div><strong aria-hidden="true">10.2.</strong> Using the Sensors</div></li></ol></li><li class="chapter-item "><div><strong aria-hidden="true">11.</strong> Splash Screens </div></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="part-title">Assignments</li><li class="chapter-item "><div><strong aria-hidden="true">12.</strong> Assignment 1</div></li><li class="chapter-item "><div><strong aria-hidden="true">13.</strong> Assignment 2</div></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
