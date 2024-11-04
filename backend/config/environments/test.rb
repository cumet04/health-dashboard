Rails.application.configure do
  # デプロイ用設定の解除
  config.assume_ssl = false
  config.force_ssl = false
  config.action_controller.perform_caching = false
  config.eager_load = ENV["CI"].present?

  # warn/error関連
  config.consider_all_requests_local = true
  config.active_support.deprecation = :stderr
  config.active_support.disallowed_deprecation = :raise
  config.action_controller.raise_on_missing_callback_actions = true
  config.action_dispatch.show_exceptions = :rescuable

  config.action_controller.allow_forgery_protection = false
end
