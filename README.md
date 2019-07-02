# BTC Clocks
dual time-zone digital clocks + BTC ticker

### To get started

Clone / download the repository and open index.html in your browser.

### Clocks

The app shows local time (using your bowser's time-zone) in the top display,
and an offset time in the lower clock display.

To edit the clock titles, edit the contents of the appropriate <code>\<h3\></code> elements in index.html.

To edit the offset (in hours) of the lower clock display, edit the line in main.js which is commented <code>// Offset (hours) from local time</code>.

NOTE: Relative summer / winter time changes may not be correctly reflected in the second clock display (if any such change occurs on a different date to the local time &/or the second display refers to a time zone in a different hemisphere to that of the first clock - in such cases, manual editing of the offset is required).

### BTC Ticker

Uses the Coindesk API.

% change is calculated using current price and price at previous day's close (06:00 UTC).

Current and previous day's close price are requested from the API and displayed at app startup, and following this:

  Current price is requested every minute, at 5 seconds before the clock minute completes (every h/m/55), and is displayed as the clock minute completes (every h/m/00).

  Close price is requested at 50 seconds past each clock hour (every h/00/50). This avoids needing to 'know' when a previous day 'close' occurs on Coindesk (which would require establishing the local timezone of the browser - not complex to do, but unnecessary).
