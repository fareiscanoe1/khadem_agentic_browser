diff --git a/chrome/browser/extensions/khadem_extension_constants.h b/chrome/browser/extensions/khadem_extension_constants.h
new file mode 100644
index 0000000000000..17b78fbb99a9f
--- /dev/null
+++ b/chrome/browser/extensions/khadem_extension_constants.h
@@ -0,0 +1,80 @@
+// Copyright 2024 The Chromium Authors
+// Use of this source code is governed by a BSD-style license that can be
+// found in the LICENSE file.
+
+#ifndef CHROME_BROWSER_EXTENSIONS_KHADEM_EXTENSION_CONSTANTS_H_
+#define CHROME_BROWSER_EXTENSIONS_KHADEM_EXTENSION_CONSTANTS_H_
+
+#include <optional>
+#include <string>
+#include <vector>
+
+namespace extensions {
+namespace khadem {
+
+// AI Agent Extension ID
+inline constexpr char kAISidePanelExtensionId[] =
+    "djhdjhlnljbjgejbndockeedocneiaei";
+
+// Bug Reporter Extension ID
+inline constexpr char kBugReporterExtensionId[] =
+    "adlpneommgkgeanpaekgoaolcpncohkf";
+
+// Controller Extension ID
+inline constexpr char kControllerExtensionId[] =
+    "nlnihljpboknmfagkikhkdblbedophja";
+
+// Khadem CDN update manifest URL
+// Used for extensions installed from local .crx files that don't have
+// an update_url in their manifest
+inline constexpr char kKhademUpdateUrl[] =
+    "https://cdn.khadem.com/extensions/update-manifest.xml";
+
+// Allowlist of Khadem extension IDs that are permitted to be installed
+// Only extensions with these IDs will be loaded from the config
+constexpr const char* kAllowedExtensions[] = {
+    kAISidePanelExtensionId,  // AI Side Panel extension
+    kBugReporterExtensionId,  // Bug Reporter extension
+    kControllerExtensionId,   // Controller extension
+};
+
+// Check if an extension is a Khadem extension
+inline bool IsKhademExtension(const std::string& extension_id) {
+  return extension_id == kAISidePanelExtensionId ||
+         extension_id == kBugReporterExtensionId ||
+         extension_id == kControllerExtensionId;
+}
+
+// Check if an extension can be uninstalled (false for Khadem extensions)
+inline bool CanUninstallExtension(const std::string& extension_id) {
+  return !IsKhademExtension(extension_id);
+}
+
+// Get all Khadem extension IDs
+inline std::vector<std::string> GetKhademExtensionIds() {
+  return {
+    kAISidePanelExtensionId,
+    kBugReporterExtensionId,
+    kControllerExtensionId
+  };
+}
+
+// Get display name for Khadem extensions in omnibox
+// Returns the display name if extension_id is a Khadem extension,
+// otherwise returns std::nullopt
+inline std::optional<std::string> GetExtensionDisplayName(
+    const std::string& extension_id) {
+  if (extension_id == kAISidePanelExtensionId) {
+    return "Khadem";
+  } else if (extension_id == kBugReporterExtensionId) {
+    return "Khadem/bug-reporter";
+  } else if (extension_id == kControllerExtensionId) {
+    return "Khadem/controller";
+  }
+  return std::nullopt;
+}
+
+}  // namespace khadem
+}  // namespace extensions
+
+#endif  // CHROME_BROWSER_EXTENSIONS_KHADEM_EXTENSION_CONSTANTS_H_
