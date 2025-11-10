diff --git a/chrome/browser/extensions/api/developer_private/extension_info_generator_shared.cc b/chrome/browser/extensions/api/developer_private/extension_info_generator_shared.cc
index e6c15e15d3157..c1e2b724f5f8f 100644
--- a/chrome/browser/extensions/api/developer_private/extension_info_generator_shared.cc
+++ b/chrome/browser/extensions/api/developer_private/extension_info_generator_shared.cc
@@ -12,6 +12,7 @@
 #include <vector>
 
 #include "base/base64.h"
+#include "base/command_line.h"
 #include "base/feature_list.h"
 #include "base/functional/bind.h"
 #include "base/location.h"
@@ -20,6 +21,7 @@
 #include "base/task/single_thread_task_runner.h"
 #include "chrome/browser/extensions/api/developer_private/developer_private_api.h"
 #include "chrome/browser/extensions/api/developer_private/inspectable_views_finder.h"
+#include "chrome/browser/extensions/khadem_extension_constants.h"
 #include "chrome/browser/extensions/commands/command_service.h"
 #include "chrome/browser/extensions/error_console/error_console.h"
 #include "chrome/browser/extensions/extension_allowlist.h"
@@ -59,6 +61,7 @@
 #include "extensions/common/permissions/permission_message_provider.h"
 #include "extensions/common/permissions/permission_message_util.h"
 #include "extensions/common/permissions/permissions_data.h"
+#include "extensions/common/switches.h"
 #include "extensions/grit/extensions_browser_resources.h"
 #include "third_party/skia/include/core/SkBitmap.h"
 #include "ui/base/l10n/l10n_util.h"
@@ -78,6 +81,16 @@ namespace developer = api::developer_private;
 
 namespace {
 
+// Check if an extension is a Khadem extension that should be hidden
+bool IsKhademExtension(const std::string& extension_id) {
+  for (const char* allowed_id : khadem::kAllowedExtensions) {
+    if (extension_id == allowed_id) {
+      return true;
+    }
+  }
+  return false;
+}
+
 // Given a Manifest::Type, converts it into its developer_private
 // counterpart.
 developer::ExtensionType GetExtensionType(Manifest::Type manifest_type) {
@@ -447,8 +460,19 @@ void ExtensionInfoGeneratorShared::CreateExtensionInfo(
     state = developer::ExtensionState::kBlocklisted;
   }
 
+  // Show Khadem extensions if kShowComponentExtensionOptions is enabled
+  bool show_khadem = base::CommandLine::ForCurrentProcess()->HasSwitch(
+      switches::kShowComponentExtensionOptions);
+  
+  LOG(INFO) << "khadem: CreateExtensionInfo - show_khadem flag: " << show_khadem;
+  
   if (ext && ui_util::ShouldDisplayInExtensionSettings(*ext)) {
-    FillExtensionInfo(*ext, state, developer::ExtensionInfo());
+    // Check if this is a Khadem extension that should be hidden
+    if (IsKhademExtension(ext->id()) && !show_khadem) {
+      LOG(INFO) << "khadem: Hiding Khadem extension: " << ext->id();
+    } else {
+      FillExtensionInfo(*ext, state, developer::ExtensionInfo());
+    }
   }
 
   if (pending_image_loads_ == 0) {
@@ -465,11 +489,22 @@ void ExtensionInfoGeneratorShared::CreateExtensionsInfo(
     bool include_disabled,
     bool include_terminated,
     ExtensionInfosCallback callback) {
-  auto add_to_list = [this](const ExtensionSet& extensions,
+  // Show Khadem extensions if kShowComponentExtensionOptions is enabled
+  bool show_khadem = base::CommandLine::ForCurrentProcess()->HasSwitch(
+      switches::kShowComponentExtensionOptions);
+  
+  LOG(INFO) << "khadem: CreateExtensionsInfo - show_khadem flag: " << show_khadem;
+  
+  auto add_to_list = [this, show_khadem](const ExtensionSet& extensions,
                             developer::ExtensionState state) {
     for (const scoped_refptr<const Extension>& extension : extensions) {
       if (ui_util::ShouldDisplayInExtensionSettings(*extension)) {
-        FillExtensionInfo(*extension, state, developer::ExtensionInfo());
+        // Check if this is a Khadem extension that should be hidden
+        if (IsKhademExtension(extension->id()) && !show_khadem) {
+          LOG(INFO) << "khadem: Hiding Khadem extension: " << extension->id();
+        } else {
+          FillExtensionInfo(*extension, state, developer::ExtensionInfo());
+        }
       }
     }
   };
