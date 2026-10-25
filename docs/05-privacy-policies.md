# 05 · Privacy policies (draft text)

These drafts are based on the apps' manifests and source code as of 2026-10-25:
- the only dependencies are Compose, Media3 and coroutines, so there are no analytics, ads, crash-reporting or cloud SDKs
- `allowBackup=false`
- the DVR password is encrypted with an Android Keystore key
- snapshots are saved to `Pictures/CamDeck`
- the DeckTV ADB client connects only to `127.0.0.1:5555`

**If the apps add any SDK or server later, these policies and the Play Data safety form must be updated.**

The pages are `/privacy/decktv` and `/privacy/deckcam`, and these are the URLs to enter in the Play Console. This is not legal advice. Have the owner review it before publishing.

---

## DeckTV privacy policy

**Effective date:** 25 October 2026
**Developer:** WaygoSquad · **Contact:** thisisprabhatk@gmail.com
**App:** DeckTV (`com.waygosquad.decktv`)

### Summary
DeckTV does not collect, sell or share any personal data. It has no account, no analytics, no ads and no servers. Everything the app does happens on your TV and on your local network.

### What DeckTV stores, on your TV only
- **DVR connection settings:** brand, address, ports, username and RTSP paths. Your DVR **password is encrypted** with a key kept in the Android Keystore on your TV.
- **Your preferences:** layouts, camera order, hidden cameras and apps, dock, start-up input, motion and sleep settings.
- **Snapshots** you take are saved as PNG images in your TV's `Pictures/CamDeck` folder. You can delete them in the app's gallery.
- **"Last played":** the name of the app and the title of the media last playing, so it can be shown on the home screen.

This data never leaves your device. It is excluded from Android cloud backup. Clearing the app's data or uninstalling DeckTV removes it, except snapshots you have saved to Pictures.

### Network connections
- DeckTV connects **only to the DVR/NVR or cameras at the address you enter**, to show their video (RTSP) and read their channel list (HTTP/HTTPS).
- To grant its own permissions without a computer, DeckTV may connect to your **TV's own debugging service on the device itself (127.0.0.1)**. This happens only when you choose "Allow everything" in Permissions & setup.
- DeckTV does not contact WaygoSquad or any third-party server.

### Permissions and why they're needed
All of the following are used only on your TV. Nothing obtained through them is transmitted.

| Permission | Why |
|---|---|
| Internet, network & Wi-Fi state | Connect to your DVR on your local network; show the Wi-Fi status. |
| See all installed apps (`QUERY_ALL_PACKAGES`) | DeckTV is a home-screen launcher, so it has to list and open your apps. |
| Usage access (`PACKAGE_USAGE_STATS`) | Optional. Shows your recent and frequently used apps on the home screen. |
| Notification access (media) | Optional. Android requires it before a launcher can read "Now playing" from other apps. DeckTV reads only media playback info and does not read your notifications' content. |
| Run at start-up (`RECEIVE_BOOT_COMPLETED`) | Open your chosen start-up input (for example Camera) when the TV turns on. |
| Display over other apps (`SYSTEM_ALERT_WINDOW`), reorder tasks | Come back to the front when the TV wakes up. |
| System settings (`WRITE_SECURE_SETTINGS`, granted only through adb) | Optional. Used for "Never sleep" (turning off the TV's sleep timer and screensaver) and for keeping the TV's power-on input in step with your choice. Your original settings are restored when you turn the option off. |

You can revoke the optional permissions at any time in Android TV settings. DeckTV keeps working without them.

### Children
DeckTV is not directed to children under 13 and knowingly collects no data from anyone.

### Security
Credentials are encrypted at rest with the Android Keystore. Connections to your DVR use HTTP or HTTPS as you configure. Many DVRs only support unencrypted RTSP on the local network, so keep your DVR on a trusted network.

### Changes
If this policy changes, we will update this page and its effective date. Significant changes will also be noted in the app's release notes.

### Contact
Questions: **thisisprabhatk@gmail.com**

---

## DeckCam privacy policy

**Effective date:** 25 October 2026
**Developer:** WaygoSquad · **Contact:** thisisprabhatk@gmail.com
**App:** DeckCam (`com.waygosquad.deckcam`)

### Summary
DeckCam does not collect, sell or share any personal data. It has no account, no analytics, no ads and no servers. It talks only to the cameras or DVR you set up.

### What DeckCam stores, on your device only
- **DVR/camera connection settings:** brand, address, ports, username and stream paths. The **password is encrypted** with a key kept in the Android Keystore.
- **Preferences:** layouts, camera order and visibility, aspect ratios, display and motion settings.
- **Snapshots** you take, saved as PNG images in `Pictures/CamDeck`. You can delete them in the gallery.

This data never leaves your device and is excluded from Android cloud backup. Uninstalling the app removes it, except snapshots saved to Pictures.

### Network connections
DeckCam connects **only to the DVR/NVR or camera addresses you enter**, for video (RTSP) and the channel list (HTTP/HTTPS). It does not contact WaygoSquad or any third party.

### Permissions
| Permission | Why |
|---|---|
| Internet, network & Wi-Fi state | Connect to your cameras on your network and show the connection status. |

DeckCam asks for no other permissions. It does not access your contacts, location, microphone or camera hardware.

### Children
DeckCam is not directed to children under 13 and knowingly collects no data from anyone.

### Security
Credentials are encrypted at rest with the Android Keystore. Keep your DVR on a trusted network, because many DVRs only offer unencrypted RTSP.

### Changes
Updates will be posted on this page with a new effective date.

### Contact
Questions: **thisisprabhatk@gmail.com**

---

## Play Console: Data safety answers (both apps)
- Does the app collect or share any of the required user data types? **No.**
- Is all user data encrypted in transit? Not applicable, because no data is collected. The owner should still answer honestly in the form.
- Can users request data deletion? Not applicable, because no data is collected. Uninstalling the app removes local data.
- Privacy policy URL: `https://decktv.waygosquad.tech/privacy/decktv` and `https://decktv.waygosquad.tech/privacy/deckcam`.
