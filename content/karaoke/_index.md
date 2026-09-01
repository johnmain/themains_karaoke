---
title: "Karaoke Song Library | Maintec Entertainment"
description: "Browse Maintec Entertainment's extensive Karaoke song library — thousands of songs across country, rock, 80s, metal, and pop. Perfect for local Parkland Event Services."
keywords: ["Karaoke", "Manitoba Wedding DJ", "Parkland Event Services", "karaoke library", "karaoke songs", "Karaoke with John"]
author: "John Main"
images: ["/images/karaoke.png"]
---

## Browse Our Karaoke Song Library

Looking for that perfect song? Our **Karaoke** song library (formerly *Karaoke with John*) has something for everyone — from country classics and classic rock anthems to 80s power ballads and current pop hits.

Search the library below to find your favourite tracks and add them to your event playlist. We've got thousands of songs spanning every genre:

- **🎸 Classic Rock** — Led Zeppelin, AC/DC, Deep Purple, The Rolling Stones, and more
- **🕺 80s Power Anthems** — Bon Jovi, Guns N' Roses, A-ha, Duran Duran, and more
- **🤘 Hard Rock & Metal** — Iron Maiden, Metallica, Black Sabbath, and more
- **🤠 Country Classics** — Alan Jackson, George Strait, Brooks & Dunn, and more
- **🎤 Modern Pop** — The latest chart-toppers and crowd favourites
- **🇨🇦 Canadian Classics** — The Tragically Hip, Neil Young, Leonard Cohen, and more

---
<!-- Songbook Search Partial (Shown by default) -->
<div id="search-container">
<h2>Offline Song Search</h2>
{{< search "karaoke" >}}

</div>

<div id="openkj-container" style="display: none;">
<h2>Request Your Songs Live</h2>

Skip the paper request slips! Use our real-time request portal to search our song catalog and submit your choices directly from your phone. Your selections go straight into our digital queue.

* **Fast Search:** Find your favorite tracks instantly.
* **Instant Queueing:** Send requests directly to the DJ booth.
* **No Waiting:** Keep track of your turn without leaving your table.

<!-- Button injected here dynamically when live -->

</div>

---

## Book Karaoke for Your Event

Whether you are planning a wedding and need a **Manitoba Wedding DJ** with karaoke additions, a private party, or custom **Parkland Event Services** at local community centers, our professional karaoke setup ensures a flawless experience:

- Multiple microphones available for group singing
- **Large song display** — Clear lyrics on screen for easy singing
- Crystal-clear sound system
- **Song requests** — We can add songs to the library before your event

**[Contact us](/contact/) today** to book a karaoke night for your event in Ethelbert, Dauphin, or anywhere in the Parkland Region.

<style>
/* Pop-out button styling matching Tailwind button theme */
#btn-open-new-window {
  display: inline-block !important;
  margin-top: 8px !important;
  margin-bottom: 16px !important;
  background-color: #2563eb !important;
  color: #ffffff !important;
  padding: 0.65rem 1.25rem !important;
  border-radius: 0.5rem !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  font-size: 0.95rem !important;
  transition: background-color 0.15s ease-in-out !important;
}

#btn-open-new-window:hover {
  background-color: #1d4ed8 !important;
}
</style>

<script>
async function checkOpenKJStatus() {
  const openkjContainer = document.getElementById('openkj-container');
  const searchContainer = document.getElementById('search-container');
  const statusEndpoint = 'https://requests.eu1.netbird.services/status.php';
  const openkjUrl = 'https://requests.eu1.netbird.services/index.php';

  try {
    const response = await fetch(statusEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ action: 'get_venue_status' })
    });

    if (!response.ok) throw new Error('Server unreachable');

    const data = await response.json();

    if (data && (data.active === 1 || data.active === true || data.active === "1")) {
      openkjContainer.style.display = 'block';
      searchContainer.style.display = 'none';

      // Inject the pop-out button above the iframe if it doesn't already exist
      if (!document.getElementById('btn-open-new-window')) {
        const popoutBtn = document.createElement('a');
        popoutBtn.id = 'btn-open-new-window';
        popoutBtn.href = openkjUrl;
        popoutBtn.target = '_blank';
        popoutBtn.rel = 'noopener noreferrer';
        popoutBtn.className = 'button';
        popoutBtn.innerHTML = 'Open Search in New Window ↗';

        const iframe = openkjContainer.querySelector('iframe');
        openkjContainer.insertBefore(popoutBtn, iframe);
      }
    } else {
      openkjContainer.style.display = 'none';
      searchContainer.style.display = 'block';
    }
  } catch (err) {
    // If OpenKJ is offline or requests are disabled, default to the search partial
    openkjContainer.style.display = 'none';
    searchContainer.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', checkOpenKJStatus);
</script>
