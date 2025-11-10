diff --git a/chrome/browser/khadem_server/khadem_server_prefs.h b/chrome/browser/khadem_server/khadem_server_prefs.h
new file mode 100644
index 0000000000000..03719e252a15a
--- /dev/null
+++ b/chrome/browser/khadem_server/khadem_server_prefs.h
@@ -0,0 +1,31 @@
+// Copyright 2024 The Chromium Authors
+// Use of this source code is governed by a BSD-style license that can be
+// found in the LICENSE file.
+
+#ifndef CHROME_BROWSER_KHADEM_SERVER_KHADEM_SERVER_PREFS_H_
+#define CHROME_BROWSER_KHADEM_SERVER_KHADEM_SERVER_PREFS_H_
+
+class PrefRegistrySimple;
+
+namespace khadem_server {
+
+// Default port values for Khadem server (10-port spacing)
+inline constexpr int kDefaultCDPPort = 9000;
+inline constexpr int kDefaultMCPPort = 9100;
+inline constexpr int kDefaultAgentPort = 9200;
+inline constexpr int kDefaultExtensionPort = 9300;
+
+// Preference keys for Khadem server configuration
+extern const char kCDPServerPort[];
+extern const char kMCPServerPort[];
+extern const char kAgentServerPort[];
+extern const char kExtensionServerPort[];
+extern const char kMCPServerEnabled[];
+extern const char kRestartServerRequested[];
+
+// Registers Khadem server preferences in Local State (browser-wide prefs)
+void RegisterLocalStatePrefs(PrefRegistrySimple* registry);
+
+}  // namespace khadem_server
+
+#endif  // CHROME_BROWSER_KHADEM_SERVER_KHADEM_SERVER_PREFS_H_
