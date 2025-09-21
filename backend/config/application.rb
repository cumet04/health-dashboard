require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_view/railtie'

Bundler.require(*Rails.groups)

module HealthDashboard # rubocop:disable Style/ClassAndModuleChildren
  # 通常environmentsに書かれるようなものもproduction相当を正としてここに記載し、それ以外のenvに対して差分を設定する
  class Application < Rails::Application
    config.load_defaults 8.0
    config.api_only = true

    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :utc # sqlite使ってる都合でutcを明示

    config.enable_reloading = false
    config.eager_load = true
    config.action_controller.perform_caching = true

    config.assume_ssl = true
    config.force_ssl = true

    config.logger   = ActiveSupport::TaggedLogging.logger($stdout)
    config.log_tags = [:request_id]
    config.log_level = ENV.fetch('RAILS_LOG_LEVEL', 'info')
    config.silence_healthcheck_path = '/up'

    config.consider_all_requests_local = false
    config.active_record.migration_error = :raise
    config.active_support.deprecation = :log
    config.active_support.disallowed_deprecation = :log
    config.active_support.disallowed_deprecation_warnings = []

    config.cache_store = :solid_cache_store
    config.active_job.queue_adapter = :solid_queue
    config.solid_queue.connects_to = { database: { writing: :queue } }

    config.active_record.dump_schema_after_migration = false
  end
end
