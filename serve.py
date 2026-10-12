"""Local preview server for both sites.

Run:  python3 serve.py
Then open http://localhost:4321

Pages are never cached, so a browser refresh always shows the latest edit.
"""
import functools
import http.server
import os
import socket
import threading

PORT = 4321
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


class IPv6Server(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6


if __name__ == "__main__":
    handler = functools.partial(Handler, directory=ROOT)
    # Browsers may look up "localhost" as either 127.0.0.1 or ::1, so answer on both.
    try:
        v6 = IPv6Server(("::1", PORT), handler)
        threading.Thread(target=v6.serve_forever, daemon=True).start()
    except OSError:
        pass
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as server:
        print(f"Preview running at http://localhost:{PORT}  (Ctrl+C to stop)")
        server.serve_forever()
