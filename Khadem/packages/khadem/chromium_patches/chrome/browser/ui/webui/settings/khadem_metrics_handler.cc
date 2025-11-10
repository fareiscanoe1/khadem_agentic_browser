diff --git a/chrome/browser/ui/webui/settings/khadem_metrics_handler.cc b/chrome/browser/ui/webui/settings/khadem_metrics_handler.cc
new file mode 100644
index 0000000000000..a213967b46676
--- /dev/null
+++ b/chrome/browser/ui/webui/settings/khadem_metrics_handler.cc
@@ -0,0 +1,56 @@
+// Copyright 2025 The Chromium Authors
+// Use of this source code is governed by a BSD-style license that can be
+// found in the LICENSE file.
+
+#include "chrome/browser/ui/webui/settings/khadem_metrics_handler.h"
+
+#include "base/logging.h"
+#include "base/values.h"
+#include "components/metrics/khadem_metrics/khadem_metrics.h"
+
+namespace settings {
+
+KhademMetricsHandler::KhademMetricsHandler() = default;
+
+KhademMetricsHandler::~KhademMetricsHandler() = default;
+
+void KhademMetricsHandler::RegisterMessages() {
+  web_ui()->RegisterMessageCallback(
+      "logKhademMetric",
+      base::BindRepeating(&KhademMetricsHandler::HandleLogKhademMetric,
+                         base::Unretained(this)));
+}
+
+void KhademMetricsHandler::HandleLogKhademMetric(
+    const base::Value::List& args) {
+  if (args.size() < 1 || !args[0].is_string()) {
+    LOG(WARNING) << "khadem: Invalid metric event name";
+    return;
+  }
+
+  const std::string& event_name = args[0].GetString();
+  
+  if (args.size() > 1) {
+    // Has properties
+    if (args[1].is_dict()) {
+      base::Value::Dict properties = args[1].GetDict().Clone();
+      khadem_metrics::KhademMetrics::Log(event_name, std::move(properties));
+    } else {
+      LOG(WARNING) << "khadem: Invalid metric properties format";
+      khadem_metrics::KhademMetrics::Log(event_name);
+    }
+  } else {
+    // No properties
+    khadem_metrics::KhademMetrics::Log(event_name);
+  }
+}
+
+void KhademMetricsHandler::OnJavascriptAllowed() {
+  // No special setup needed
+}
+
+void KhademMetricsHandler::OnJavascriptDisallowed() {
+  // No cleanup needed
+}
+
+}  // namespace settings
\ No newline at end of file
