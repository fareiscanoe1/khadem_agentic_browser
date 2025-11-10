diff --git a/chrome/browser/extensions/api/browser_os/browser_os_api.h b/chrome/browser/extensions/api/browser_os/browser_os_api.h
new file mode 100644
index 0000000000000..e4b1c5f821342
--- /dev/null
+++ b/chrome/browser/extensions/api/browser_os/browser_os_api.h
@@ -0,0 +1,331 @@
+// Copyright 2024 The Chromium Authors
+// Use of this source code is governed by a BSD-style license that can be
+// found in the LICENSE file.
+
+#ifndef CHROME_BROWSER_EXTENSIONS_API_BROWSER_OS_BROWSER_OS_API_H_
+#define CHROME_BROWSER_EXTENSIONS_API_BROWSER_OS_BROWSER_OS_API_H_
+
+#include <cstdint>
+
+#include "base/memory/raw_ptr.h"
+#include "base/values.h"
+#include "chrome/browser/extensions/api/browser_os/browser_os_api_utils.h"
+#include "chrome/browser/extensions/api/browser_os/browser_os_content_processor.h"
+#include "chrome/browser/extensions/api/browser_os/browser_os_snapshot_processor.h"
+#include "extensions/browser/extension_function.h"
+#include "third_party/skia/include/core/SkBitmap.h"
+
+namespace content {
+class WebContents;
+}
+
+namespace ui {
+struct AXTreeUpdate;
+}
+
+namespace extensions {
+namespace api {
+
+
+class KhademGetAccessibilityTreeFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.getAccessibilityTree",
+                             BROWSER_OS_GETACCESSIBILITYTREE)
+
+  KhademGetAccessibilityTreeFunction() = default;
+
+ protected:
+  ~KhademGetAccessibilityTreeFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+
+ private:
+  void OnAccessibilityTreeReceived(ui::AXTreeUpdate& tree_update);
+};
+
+class KhademGetInteractiveSnapshotFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.getInteractiveSnapshot",
+                             BROWSER_OS_GETINTERACTIVESNAPSHOT)
+
+  KhademGetInteractiveSnapshotFunction();
+
+ protected:
+  ~KhademGetInteractiveSnapshotFunction() override;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+
+ private:
+  void OnAccessibilityTreeReceived(ui::AXTreeUpdate& tree_update);
+  void OnSnapshotProcessed(SnapshotProcessingResult result);
+  
+  // Counter for snapshot IDs
+  static uint32_t next_snapshot_id_;
+  
+  // Tab ID for storing mappings
+  int tab_id_ = -1;
+  
+  // Web contents for processing and drawing
+  raw_ptr<content::WebContents> web_contents_ = nullptr;
+};
+
+class KhademClickFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.click", BROWSER_OS_CLICK)
+
+  KhademClickFunction() = default;
+
+ protected:
+  ~KhademClickFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademInputTextFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.inputText", BROWSER_OS_INPUTTEXT)
+
+  KhademInputTextFunction() = default;
+
+ protected:
+  ~KhademInputTextFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademClearFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.clear", BROWSER_OS_CLEAR)
+
+  KhademClearFunction() = default;
+
+ protected:
+  ~KhademClearFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademGetPageLoadStatusFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.getPageLoadStatus", 
+                             BROWSER_OS_GETPAGELOADSTATUS)
+
+  KhademGetPageLoadStatusFunction() = default;
+
+ protected:
+  ~KhademGetPageLoadStatusFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademScrollUpFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.scrollUp", BROWSER_OS_SCROLLUP)
+
+  KhademScrollUpFunction() = default;
+
+ protected:
+  ~KhademScrollUpFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademScrollDownFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.scrollDown", BROWSER_OS_SCROLLDOWN)
+
+  KhademScrollDownFunction() = default;
+
+ protected:
+  ~KhademScrollDownFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademScrollToNodeFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.scrollToNode", BROWSER_OS_SCROLLTONODE)
+
+  KhademScrollToNodeFunction() = default;
+
+ protected:
+  ~KhademScrollToNodeFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademSendKeysFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.sendKeys", BROWSER_OS_SENDKEYS)
+
+  KhademSendKeysFunction() = default;
+
+ protected:
+  ~KhademSendKeysFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademCaptureScreenshotFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.captureScreenshot", BROWSER_OS_CAPTURESCREENSHOT)
+
+  KhademCaptureScreenshotFunction();
+
+ protected:
+  ~KhademCaptureScreenshotFunction() override;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+  
+ private:
+  void DrawHighlightsAndCapture();
+  void CaptureScreenshotNow();
+  void OnScreenshotCaptured(const SkBitmap& bitmap);
+  
+  // Store web contents and tab id for highlight operations
+  raw_ptr<content::WebContents> web_contents_ = nullptr;
+  int tab_id_ = -1;
+  gfx::Size target_size_;
+  bool show_highlights_ = false;
+  bool use_exact_dimensions_ = false;
+};
+
+class KhademGetSnapshotFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.getSnapshot", BROWSER_OS_GETSNAPSHOT)
+
+  KhademGetSnapshotFunction() = default;
+
+ protected:
+  ~KhademGetSnapshotFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+
+ private:
+  void OnAccessibilityTreeReceived(ui::AXTreeUpdate& tree_update);
+};
+
+// Settings API functions
+class KhademGetPrefFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.getPref", BROWSER_OS_GETPREF)
+
+  KhademGetPrefFunction() = default;
+
+ protected:
+  ~KhademGetPrefFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademSetPrefFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.setPref", BROWSER_OS_SETPREF)
+
+  KhademSetPrefFunction() = default;
+
+ protected:
+  ~KhademSetPrefFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademGetAllPrefsFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.getAllPrefs", BROWSER_OS_GETALLPREFS)
+
+  KhademGetAllPrefsFunction() = default;
+
+ protected:
+  ~KhademGetAllPrefsFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademLogMetricFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.logMetric", BROWSER_OS_LOGMETRIC)
+
+  KhademLogMetricFunction() = default;
+
+ protected:
+  ~KhademLogMetricFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademGetVersionNumberFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.getVersionNumber", BROWSER_OS_GETVERSIONNUMBER)
+
+  KhademGetVersionNumberFunction() = default;
+
+ protected:
+  ~KhademGetVersionNumberFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademExecuteJavaScriptFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.executeJavaScript", BROWSER_OS_EXECUTEJAVASCRIPT)
+
+  KhademExecuteJavaScriptFunction() = default;
+
+ protected:
+  ~KhademExecuteJavaScriptFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+  
+ private:
+  void OnJavaScriptExecuted(base::Value result);
+};
+
+class KhademClickCoordinatesFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.clickCoordinates", BROWSER_OS_CLICKCOORDINATES)
+
+  KhademClickCoordinatesFunction() = default;
+
+ protected:
+  ~KhademClickCoordinatesFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+class KhademTypeAtCoordinatesFunction : public ExtensionFunction {
+ public:
+  DECLARE_EXTENSION_FUNCTION("browserOS.typeAtCoordinates", BROWSER_OS_TYPEATCOORDINATES)
+
+  KhademTypeAtCoordinatesFunction() = default;
+
+ protected:
+  ~KhademTypeAtCoordinatesFunction() override = default;
+
+  // ExtensionFunction:
+  ResponseAction Run() override;
+};
+
+}  // namespace api
+}  // namespace extensions
+
+#endif  // CHROME_BROWSER_EXTENSIONS_API_BROWSER_OS_BROWSER_OS_API_H_
\ No newline at end of file
