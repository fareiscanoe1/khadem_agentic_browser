diff --git a/components/metrics/khadem_metrics/khadem_metrics_service_factory.h b/components/metrics/khadem_metrics/khadem_metrics_service_factory.h
new file mode 100644
index 0000000000000..014eb17aba442
--- /dev/null
+++ b/components/metrics/khadem_metrics/khadem_metrics_service_factory.h
@@ -0,0 +1,48 @@
+// Copyright 2025 The Chromium Authors
+// Use of this source code is governed by a BSD-style license that can be
+// found in the LICENSE file.
+
+#ifndef COMPONENTS_METRICS_KHADEM_METRICS_KHADEM_METRICS_SERVICE_FACTORY_H_
+#define COMPONENTS_METRICS_KHADEM_METRICS_KHADEM_METRICS_SERVICE_FACTORY_H_
+
+#include "base/no_destructor.h"
+#include "components/keyed_service/content/browser_context_keyed_service_factory.h"
+
+namespace content {
+class BrowserContext;
+}  // namespace content
+
+namespace khadem_metrics {
+
+class KhademMetricsService;
+
+// Factory for creating KhademMetricsService instances per profile.
+class KhademMetricsServiceFactory
+    : public BrowserContextKeyedServiceFactory {
+ public:
+  KhademMetricsServiceFactory(const KhademMetricsServiceFactory&) =
+      delete;
+  KhademMetricsServiceFactory& operator=(
+      const KhademMetricsServiceFactory&) = delete;
+
+  // Returns the KhademMetricsService for |context|, creating one if needed.
+  static KhademMetricsService* GetForBrowserContext(
+      content::BrowserContext* context);
+
+  // Returns the singleton factory instance.
+  static KhademMetricsServiceFactory* GetInstance();
+
+ private:
+  friend base::NoDestructor<KhademMetricsServiceFactory>;
+
+  KhademMetricsServiceFactory();
+  ~KhademMetricsServiceFactory() override;
+
+  // BrowserContextKeyedServiceFactory:
+  std::unique_ptr<KeyedService> BuildServiceInstanceForBrowserContext(
+      content::BrowserContext* context) const override;
+};
+
+}  // namespace khadem_metrics
+
+#endif  // COMPONENTS_METRICS_KHADEM_METRICS_KHADEM_METRICS_SERVICE_FACTORY_H_
\ No newline at end of file
