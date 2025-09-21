require 'active_support/core_ext/integer/time'

Rails.application.configure do
  # デプロイ用設定の解除
  config.assume_ssl = false
  config.force_ssl = false
  config.eager_load = false
  config.enable_reloading = true

  # warn/error関連
  config.consider_all_requests_local = true
  config.active_support.disallowed_deprecation = :raise
  config.active_record.migration_error = :page_load
  config.action_controller.raise_on_missing_callback_actions = true

  # 便利ログ・機能
  config.server_timing = true
  config.active_record.verbose_query_logs = true
  config.active_job.verbose_enqueue_logs = true
  config.active_record.query_log_tags_enabled = true

  config.active_record.dump_schema_after_migration = true
end
