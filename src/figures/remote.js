/**
 * Custom Hairline-styled Interactive Android TV Remote figure
 * Follows the { update, destroy } lifecycle contract of @lucasmarkes/hairline
 */

export function remote(container, options = {}) {
  const {
    intensity = 0.5,
    onKey = null,
    play = false,
  } = options;

  container.innerHTML = `
    <div class="remote-figure" style="position: relative; width: 100%; max-width: 280px; margin: 0 auto; aspect-ratio: 1 / 2.2;">
      <svg viewBox="0 0 200 440" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.6));">
        <!-- Remote Chassis Body -->
        <rect x="20" y="10" width="160" height="420" rx="36" fill="var(--hairline-plate, #0B0D10)" stroke="var(--hairline-edge, rgba(242, 244, 247, 0.4))" stroke-width="1.5"/>
        <rect x="25" y="15" width="150" height="410" rx="32" fill="var(--surface, #171A1F)" stroke="var(--hairline-lo, rgba(242, 244, 247, 0.1))" stroke-width="1"/>

        <!-- Top IR Sensor & LED -->
        <rect x="85" y="18" width="30" height="4" rx="2" fill="var(--hairline-mid, rgba(242, 244, 247, 0.3))"/>
        <circle cx="100" cy="36" r="4" fill="var(--accent, #5AC8FA)" class="remote-power-led"/>

        <!-- Power Button -->
        <g class="remote-btn" data-key="POWER" data-desc="Power / Standby" style="cursor: pointer;">
          <circle cx="50" cy="50" r="14" fill="#242830" stroke="rgba(255, 69, 58, 0.6)" stroke-width="1.2"/>
          <path d="M50 43v6M45 46a7 7 0 1 0 10 0" stroke="#FF453A" stroke-width="1.5" stroke-linecap="round"/>
        </g>

        <!-- Live CCTV Quick Button -->
        <g class="remote-btn" data-key="LIVE" data-desc="Instant Camera Wall Jump" style="cursor: pointer;">
          <circle cx="150" cy="50" r="14" fill="#242830" stroke="rgba(90, 200, 250, 0.6)" stroke-width="1.2"/>
          <circle cx="150" cy="50" r="4" fill="#5AC8FA"/>
          <path d="M142 50h16M150 42v16" stroke="#5AC8FA" stroke-width="1" stroke-dasharray="2 2"/>
        </g>

        <!-- D-Pad Ring -->
        <g class="remote-dpad">
          <circle cx="100" cy="130" r="50" fill="#1C2027" stroke="var(--hairline-mid, rgba(242, 244, 247, 0.25))" stroke-width="1.5"/>
          
          <!-- D-pad Up -->
          <g class="remote-btn" data-key="UP" data-desc="Navigate Up / Previous Row" style="cursor: pointer;">
            <path d="M85 92h30l-15-12z" fill="var(--hairline-edge, #F2F4F7)"/>
          </g>
          <!-- D-pad Down -->
          <g class="remote-btn" data-key="DOWN" data-desc="Navigate Down / Next Row" style="cursor: pointer;">
            <path d="M85 168h30l-15 12z" fill="var(--hairline-edge, #F2F4F7)"/>
          </g>
          <!-- D-pad Left -->
          <g class="remote-btn" data-key="LEFT" data-desc="Navigate Left / Previous Camera" style="cursor: pointer;">
            <path d="M62 115v30l-12-15z" fill="var(--hairline-edge, #F2F4F7)"/>
          </g>
          <!-- D-pad Right -->
          <g class="remote-btn" data-key="RIGHT" data-desc="Navigate Right / Next Camera" style="cursor: pointer;">
            <path d="M138 115v30l12-15z" fill="var(--hairline-edge, #F2F4F7)"/>
          </g>

          <!-- Center OK Button -->
          <g class="remote-btn" data-key="OK" data-desc="Full Screen View · Hold for Camera Menu" style="cursor: pointer;">
            <circle cx="100" cy="130" r="24" fill="#282D37" stroke="var(--hairline-hi, #5AC8FA)" stroke-width="1.5"/>
            <text x="100" y="135" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">OK</text>
          </g>
        </g>

        <!-- Back & Home Buttons -->
        <g class="remote-btn" data-key="BACK" data-desc="Show Controls · Full View → Grid" style="cursor: pointer;">
          <circle cx="60" cy="202" r="14" fill="#20242D" stroke="rgba(242, 244, 247, 0.2)" stroke-width="1"/>
          <path d="M65 198l-7 4 7 4" stroke="#F2F4F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g class="remote-btn" data-key="HOME" data-desc="DeckTV Home Screen (Triple Back)" style="cursor: pointer;">
          <circle cx="140" cy="202" r="14" fill="#20242D" stroke="rgba(242, 244, 247, 0.2)" stroke-width="1"/>
          <path d="M134 204v-4l6-5 6 5v4h-4v-3h-4v3z" fill="#F2F4F7"/>
        </g>

        <!-- Color Function Keys -->
        <g transform="translate(38, 228)">
          <!-- Red: Snapshot All -->
          <g class="remote-btn" data-key="RED" data-desc="Red Key: Instant Snapshot All Cameras" style="cursor: pointer;">
            <rect x="0" y="0" width="26" height="8" rx="4" fill="#FF453A"/>
          </g>
          <!-- Green: Reconnect Feeds -->
          <g class="remote-btn" data-key="GREEN" data-desc="Green Key: Reconnect / Refresh All RTSP Feeds" style="cursor: pointer;">
            <rect x="33" y="0" width="26" height="8" rx="4" fill="#32D74B"/>
          </g>
          <!-- Yellow: Layout Cycle -->
          <g class="remote-btn" data-key="YELLOW" data-desc="Yellow Key: Next Layout (Mine → 9-Up → All)" style="cursor: pointer;">
            <rect x="66" y="0" width="26" height="8" rx="4" fill="#FF9F0A"/>
          </g>
          <!-- Blue: Audio Listen -->
          <g class="remote-btn" data-key="BLUE" data-desc="Blue Key: Toggle Camera Microphone Audio" style="cursor: pointer;">
            <rect x="99" y="0" width="26" height="8" rx="4" fill="#5AC8FA"/>
          </g>
        </g>

        <!-- Numeric Keypad 1–9 and 0 -->
        <g transform="translate(42, 252)">
          <!-- Row 1: 1 2 3 -->
          <g class="remote-btn" data-key="1" data-desc="Camera 1 Full View" style="cursor: pointer;">
            <circle cx="16" cy="16" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="16" y="21" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">1</text>
          </g>
          <g class="remote-btn" data-key="2" data-desc="Camera 2 Full View" style="cursor: pointer;">
            <circle cx="58" cy="16" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="58" y="21" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">2</text>
          </g>
          <g class="remote-btn" data-key="3" data-desc="Camera 3 Full View" style="cursor: pointer;">
            <circle cx="100" cy="16" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="100" y="21" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">3</text>
          </g>

          <!-- Row 2: 4 5 6 -->
          <g class="remote-btn" data-key="4" data-desc="Camera 4 Full View" style="cursor: pointer;">
            <circle cx="16" cy="50" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="16" y="55" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">4</text>
          </g>
          <g class="remote-btn" data-key="5" data-desc="Camera 5 Full View" style="cursor: pointer;">
            <circle cx="58" cy="50" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="58" y="55" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">5</text>
          </g>
          <g class="remote-btn" data-key="6" data-desc="Camera 6 Full View" style="cursor: pointer;">
            <circle cx="100" cy="50" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="100" y="55" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">6</text>
          </g>

          <!-- Row 3: 7 8 9 -->
          <g class="remote-btn" data-key="7" data-desc="Camera 7 Full View" style="cursor: pointer;">
            <circle cx="16" cy="84" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="16" y="89" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">7</text>
          </g>
          <g class="remote-btn" data-key="8" data-desc="Camera 8 Full View" style="cursor: pointer;">
            <circle cx="58" cy="84" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="58" y="89" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">8</text>
          </g>
          <g class="remote-btn" data-key="9" data-desc="Camera 9 Full View" style="cursor: pointer;">
            <circle cx="100" cy="84" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="100" y="89" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">9</text>
          </g>

          <!-- Row 4: 0 -->
          <g class="remote-btn" data-key="0" data-desc="Return to Camera Grid" style="cursor: pointer;">
            <circle cx="58" cy="118" r="14" fill="#20242D" stroke="rgba(242,244,247,0.15)" stroke-width="1"/>
            <text x="58" y="123" fill="#F2F4F7" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">0</text>
          </g>
        </g>

        <!-- Brand Wordmark at Base -->
        <text x="100" y="416" fill="rgba(242,244,247,0.3)" font-family="'Outfit', sans-serif" font-size="10" font-weight="600" letter-spacing="1" text-anchor="middle">DECKTV REMOTE</text>
      </svg>
    </div>
  `;

  const buttons = container.querySelectorAll('.remote-btn');
  const listeners = [];

  buttons.forEach((btn) => {
    const key = btn.getAttribute('data-key');
    const desc = btn.getAttribute('data-desc');

    const onEnter = () => {
      btn.style.transform = 'scale(1.08)';
      btn.style.transition = 'transform 0.15s ease';
      const shape = btn.querySelector('circle, rect, path');
      if (shape && !shape.getAttribute('data-orig-stroke')) {
        shape.setAttribute('data-orig-stroke', shape.getAttribute('stroke') || '');
        shape.setAttribute('stroke', '#5AC8FA');
      }
      if (onKey) onKey({ key, desc });
    };

    const onLeave = () => {
      btn.style.transform = 'scale(1)';
      const shape = btn.querySelector('circle, rect, path');
      if (shape && shape.hasAttribute('data-orig-stroke')) {
        shape.setAttribute('stroke', shape.getAttribute('data-orig-stroke'));
        shape.removeAttribute('data-orig-stroke');
      }
    };

    const onClick = () => {
      // Simulate button press animation
      btn.style.transform = 'scale(0.92)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 120);
      if (onKey) onKey({ key, desc, clicked: true });
    };

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    btn.addEventListener('click', onClick);

    listeners.push({ btn, onEnter, onLeave, onClick });
  });

  return {
    update(newOpts) {
      if (newOpts.intensity !== undefined) {
        // update intensity
      }
    },
    destroy() {
      listeners.forEach(({ btn, onEnter, onLeave, onClick }) => {
        btn.removeEventListener('mouseenter', onEnter);
        btn.removeEventListener('mouseleave', onLeave);
        btn.removeEventListener('click', onClick);
      });
      container.innerHTML = '';
    }
  };
}
